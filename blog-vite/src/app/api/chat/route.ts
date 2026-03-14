import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  provider: 'claude' | 'openai' | 'gemini' | 'grok' | 'ollama';
  messages: ChatMessage[];
  token?: string;
}

async function callClaude(messages: ChatMessage[], token: string): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': token,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
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
      messages,
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
      messages,
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
  const res = await fetch(`${host}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'qwen2.5:0.5b',
      messages,
      stream: false,
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
