import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  provider: 'claude' | 'openai' | 'gemini' | 'grok' | 'ollama';
  messages: ChatMessage[];
  token?: string;
}

// Wspólny system prompt dla WSZYSTKICH dostawców. Bot jest asystentem CV
// Przemysława Kamińskiego — odpowiada wyłącznie na jego temat, grzecznie
// odmawiając reszty. Fakty pochodzą z src/features/CvInteractivePage/.
const CV_SYSTEM_PROMPT = `You are "Custom AI by PK", the CV assistant on Przemysław Kamiński's site kaminski.consulting. You ONLY talk about Przemysław.

RULES:
- Answer questions about his experience, skills, domains (AI/LLM, finance, DevOps, a language/framework), projects, background and contact — always in scope, answer from the profile.
- Refuse everything else: trivia, general knowledge, other people, opinions, AND any task (write/debug code, translate, summarise, calculate) — even if easy and you know the answer. You are not a coding or general assistant.
- To refuse: ONE short polite sentence declining + invite a question about Przemysław. Reply ONLY in Polish or English matching the user's language — NEVER Chinese or any other language.
- Never invent facts beyond the profile. If unknown, say so and give his contact.
- If asked who you are: "Custom AI by PK", created by Przemysław Kamiński. Never mention your underlying model.

Refusal examples:
User: Jaka jest stolica Francji? → Przepraszam, odpowiadam wyłącznie na pytania o Przemysława Kamińskiego i jego doświadczenie zawodowe. Chętnie opowiem o jego umiejętnościach lub projektach.
User: Napisz funkcję w Pythonie. → Przepraszam, nie jestem asystentem programistycznym — odpowiadam tylko o Przemysławie. Chętnie opowiem o jego doświadczeniu z Pythonem.

PROFILE — Przemysław Kamiński:
- Forward-Deployed Engineer: applied LLM & agentic systems + regulated finance. 11+ years, remote-first.
- Domain: regulated finance (FRTB, Basel III, CVA, repo trading) + production AI (RAG, multi-agent, MCP). Clients: Point72, Credit Suisse, BNY Mellon, BIS, Danske Bank. Owns delivery end to end.
- Danske Bank (11.2019–now), Consultant: eDoc (doc-management automation), Digital Signing/AML (digital credit/mortgage, Azure/AWS), Onboarding for special customers.
- AI/LLM: RAG, semantic search, agentic/multi-agent, function calling, embeddings, fine-tuning, prompt engineering; LangChain, LangGraph, Semantic Kernel, MCP/FastMCP; OpenAI, Anthropic, Azure OpenAI; pgvector, Azure AI Search.
- Stack: C#/.NET (ASP.NET, EF, gRPC, SignalR, CQRS, Blazor, microservices), Python (FastAPI, asyncio, Celery, Django), Java/Spring; React, Angular, Next.js, TypeScript, Tailwind.
- Cloud/DevOps: Azure, AWS, Docker, Kubernetes/OpenShift, Terraform, CI/CD. Data: SQL Server, PostgreSQL, MongoDB, Kafka, RabbitMQ, Redis, Elasticsearch.
- Education: Wrocław University of Technology (2012–2017), BSc Teleinformatics + MSc Informatics.
- Languages: Polish (native), English (C1+), Spanish (A2).
- Contact: kaminski.przemyslaw@hotmail.com, +48 730 441 993, github.com/przemo098, Wrocław (remote).`;

async function callClaude(messages: ChatMessage[], token: string): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': token,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-5',
      max_tokens: 1024,
      system: CV_SYSTEM_PROMPT,
      messages,
    }),
  });
  if (!res.ok) throw new Error(`Claude API error (${res.status}): ${await res.text()}`);
  const data = await res.json();
  return data.content?.[0]?.text ?? 'No response.';
}

async function callOpenAI(messages: ChatMessage[], token: string): Promise<string> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: CV_SYSTEM_PROMPT }, ...messages],
    }),
  });
  if (!res.ok) throw new Error(`OpenAI API error (${res.status}): ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? 'No response.';
}

async function callGrok(messages: ChatMessage[], token: string): Promise<string> {
  const res = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      model: 'grok-3-mini-fast',
      messages: [{ role: 'system', content: CV_SYSTEM_PROMPT }, ...messages],
    }),
  });
  if (!res.ok) throw new Error(`Grok API error (${res.status}): ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? 'No response.';
}

async function callGemini(messages: ChatMessage[], token: string): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${token}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: CV_SYSTEM_PROMPT }] },
        contents: messages.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
      }),
    }
  );
  if (!res.ok) throw new Error(`Gemini API error (${res.status}): ${await res.text()}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response.';
}

// Zwraca surową odpowiedź strumieniową z Ollamy (NDJSON). Strumieniowanie jest
// kluczowe: tunel Cloudflare zrywa połączenie (błąd 524), jeśli origin milczy
// >100s do pierwszego bajtu. Przy streamingu pierwszy token przychodzi po kilku
// sekundach, więc większe modele (np. qwen2.5:7b) działają mimo wolnego CPU.
async function fetchOllama(messages: ChatMessage[]): Promise<Response> {
  const host = process.env.OLLAMA_HOST || 'http://localhost:11434';
  const model = process.env.OLLAMA_MODEL || 'qwen2.5:7b';
  const allMessages: ChatMessage[] = [
    { role: 'system', content: CV_SYSTEM_PROMPT },
    ...messages,
  ];
  return fetch(`${host}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: allMessages,
      stream: true,
      keep_alive: '30m',
      options: { temperature: 0.2, num_predict: 512 },
    }),
  });
}

const STREAM_HEADERS = {
  'Content-Type': 'text/plain; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Accel-Buffering': 'no',
};

// Owija pełny tekst (dostawcy chmurowi zwracają całość naraz) w jednoelementowy
// strumień, żeby front miał jednolity kontrakt: zawsze czyta strumień tekstu.
function textStream(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
}

export async function POST(req: NextRequest) {
  const { provider, messages, token } = (await req.json()) as ChatRequest;

  if (provider !== 'ollama' && !token) {
    return NextResponse.json({ error: 'API token is required' }, { status: 401 });
  }

  // Dostawcy chmurowi: pobierz całość, obsłuż błąd jako JSON, potem oddaj jako strumień.
  if (provider !== 'ollama') {
    try {
      let reply: string;
      switch (provider) {
      case 'claude':  reply = await callClaude(messages, token!); break;
      case 'openai':  reply = await callOpenAI(messages, token!); break;
      case 'grok':    reply = await callGrok(messages, token!); break;
      case 'gemini':  reply = await callGemini(messages, token!); break;
      default:
        return NextResponse.json({ error: 'Unknown provider' }, { status: 400 });
      }
      return new Response(textStream(reply), { headers: STREAM_HEADERS });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return NextResponse.json({ error: message }, { status: 502 });
    }
  }

  // Ollama: strumieniuj tokeny na bieżąco. WAŻNE: fetch do Ollamy odbywa się
  // WEWNĄTRZ strumienia, a na starcie od razu flushujemy jeden bajt (spację).
  // Dzięki temu Cloudflare natychmiast dostaje odpowiedź 200 i nie zrywa
  // połączenia (524), nawet gdy model ładuje się / ewaluuje prompt kilkadziesiąt
  // sekund. Front obcina wiodącą spację. Prefix promptu jest cache'owany przez
  // Ollamę (keep_alive), więc kolejne zapytania są znacznie szybsze.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(encoder.encode(' ')); // wczesny flush — commit odpowiedzi u Cloudflare

      let upstream: Response;
      try {
        upstream = await fetchOllama(messages);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        controller.enqueue(encoder.encode(`Error: Ollama connection failed (${message})`));
        controller.close();
        return;
      }
      if (!upstream.ok || !upstream.body) {
        const detail = await upstream.text().catch(() => '');
        controller.enqueue(encoder.encode(`Error: Ollama returned ${upstream.status} ${detail}`));
        controller.close();
        return;
      }

      const reader = upstream.body.getReader();
      let buffer = '';
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let nl: number;
          while ((nl = buffer.indexOf('\n')) >= 0) {
            const line = buffer.slice(0, nl).trim();
            buffer = buffer.slice(nl + 1);
            if (!line) continue;
            try {
              const obj = JSON.parse(line);
              const chunk: string | undefined = obj.message?.content;
              if (chunk) controller.enqueue(encoder.encode(chunk));
              if (obj.done) { controller.close(); return; }
            } catch {
              // niekompletna linia NDJSON — pomiń
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(stream, { headers: STREAM_HEADERS });
}
