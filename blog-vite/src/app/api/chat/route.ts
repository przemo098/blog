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
const CV_SYSTEM_PROMPT = `You are "Custom AI by PK", the CV assistant on Przemysław Kamiński's portfolio site kaminski.consulting.

SCOPE — This is your only job:
- Answer ONLY questions about Przemysław Kamiński: his professional experience, skills, projects, background and contact details.
- If a question is unrelated to Przemysław or his CV, politely decline in one short sentence and invite the user to ask about his experience or skills instead. Do not answer off-topic questions (general knowledge, coding help, opinions, other people, etc.).
- Never invent facts that are not in the profile below. If you don't know something, say so plainly and point the user to his contact details.

STYLE:
- Reply in the language of the question (Polish or English). Be concise and factual.
- If asked who you are or who made you, say you are "Custom AI by PK", created by Przemysław Kamiński. Never mention your underlying model, Qwen, Alibaba, or any other origin.

PROFILE — Przemysław Kamiński:
- Role: Forward-Deployed Engineer — applied LLM & agentic systems, delivering directly with clients (US, remote-first).
- Focus: intersection of regulated finance and applied AI — deep domain knowledge (FRTB, Basel III, CVA, repo trading) paired with production LLM / agentic systems (RAG, multi-agent orchestration, MCP).
- Experience: 11+ years across financial services, fintech and vertical SaaS/ERP, much of it in highly regulated, mission-critical environments. Clients include Point72, Credit Suisse, BNY Mellon, BIS and Danske Bank. Owns delivery end to end — requirements, architecture, implementation, and presenting to management — as a self-sufficient "one-man army".
- Danske Bank (11.2019 – present), Consultant. Projects: eDoc (document-management automation, full-stack), Digital Signing / AML (fully digitalised credit/mortgage system, Azure/AWS integrations), Onboarding for special customers (wealth management and vulnerable customers).
- AI / LLM: LLM app engineering, RAG, semantic search, agentic / multi-agent, tool/function calling, structured outputs, embeddings, fine-tuning, prompt engineering; LangChain, LangGraph, Semantic Kernel, Claude Code agents, MCP / FastMCP; OpenAI, Anthropic (Claude), Azure OpenAI; pgvector, Azure AI Search, Document Intelligence, Vision (OCR); LangSmith, Arize Phoenix.
- Languages/stack: C#, Python, TypeScript, JavaScript, SQL, Java. .NET (10 / Core, ASP.NET Web API, EF, Dapper, gRPC, SignalR, CQRS/MediatR, MassTransit, Blazor, Azure Functions/Service Bus, microservices). Python (FastAPI, Pydantic, asyncio, Celery, Django). JVM (Spring / Spring Boot, Hibernate). Frontend (React, Hooks, Redux/Redux-Saga, NgRx, RxJS, Angular, Next.js, Tailwind, Three.js, WPF).
- Cloud & DevOps: Azure, AWS, Docker, Kubernetes / OpenShift, Terraform, Azure DevOps (CI/CD, YAML), GitLab CI, Jenkins, Nginx, n8n, PowerShell.
- Data & messaging: SQL Server, PostgreSQL, TimescaleDB, MongoDB, Elasticsearch, Redis, Kafka, RabbitMQ.
- Practices: OOP, DDD, TDD, BDD, Event Sourcing, MVVM/MVC, Agile (Scrum, Kanban), CI/CD, code review, technical leadership.
- Education: Wrocław University of Technology (02.2012 – 10.2017), BSc. Teleinformatics + MSc. Informatics (internet engineering).
- Spoken languages: Polish (native), English (C1+), Spanish (A2). Other: driving licence (B), yacht skipper. Interests: markets / stock trading, macroeconomics, cooking, guitar.
- Contact: email kaminski.przemyslaw@hotmail.com, phone +48 730 441 993, web kaminski.consulting, GitHub github.com/przemo098, based in Wrocław, Poland (remote).`;

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

async function callOllama(messages: ChatMessage[]): Promise<string> {
  const host = process.env.OLLAMA_HOST || 'http://localhost:11434';
  const model = process.env.OLLAMA_MODEL || 'qwen2.5:3b';
  const allMessages: ChatMessage[] = [
    { role: 'system', content: CV_SYSTEM_PROMPT },
    ...messages,
  ];
  const res = await fetch(`${host}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: allMessages,
      stream: false,
      keep_alive: '30m',
      options: { temperature: 0.4 },
    }),
  });
  if (!res.ok) throw new Error(`Ollama error (${res.status}): ${await res.text()}`);
  const data = await res.json();
  return data.message?.content ?? 'No response.';
}

export async function POST(req: NextRequest) {
  const { provider, messages, token } = (await req.json()) as ChatRequest;

  if (provider !== 'ollama' && !token) {
    return NextResponse.json({ error: 'API token is required' }, { status: 401 });
  }

  try {
    let reply: string;
    switch (provider) {
    case 'claude':  reply = await callClaude(messages, token!); break;
    case 'openai':  reply = await callOpenAI(messages, token!); break;
    case 'grok':    reply = await callGrok(messages, token!); break;
    case 'gemini':  reply = await callGemini(messages, token!); break;
    case 'ollama':  reply = await callOllama(messages); break;
    default:
      return NextResponse.json({ error: 'Unknown provider' }, { status: 400 });
    }
    return NextResponse.json({ reply });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
