'use client';

import { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type Provider = 'claude' | 'openai' | 'gemini' | 'grok' | 'ollama' | 'none';

const DUMMY_RESPONSE =
  'This is a demo chatbot. To enable real AI responses, click the settings icon and select a provider.';

const TOKEN_PLACEHOLDERS: Record<string, string> = {
  claude: 'sk-ant-...',
  openai: 'sk-...',
  gemini: 'AI...',
  grok: 'xai-...',
};

// Strumieniuje odpowiedź z /api/chat. onChunk dostaje narastający pełny tekst
// (nie deltę), więc renderowanie sprowadza się do podmiany treści wiadomości.
async function streamApi(
  provider: string,
  messages: Message[],
  token: string,
  onChunk: (accumulated: string) => void
): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider, messages, token: token || undefined }),
  });
  if (!res.ok || !res.body) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `API error (${res.status})`);
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let acc = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    acc += decoder.decode(value, { stream: true });
    onChunk(acc);
  }
  return acc;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [provider, setProvider] = useState<Provider>('ollama');
  const [token, setToken] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      if (provider !== 'none' && (provider === 'ollama' || token)) {
        let started = false;
        await streamApi(provider, newMessages, token, (acc) => {
          // Backend flushuje wiodącą spację (obejście 524) — obcinamy ją.
          const text = acc.replace(/^\s+/, '');
          if (!text) return;
          setMessages((prev) => {
            const copy = [...prev];
            if (started) {
              copy[copy.length - 1] = { role: 'assistant', content: text };
            } else {
              copy.push({ role: 'assistant', content: text });
            }
            return copy;
          });
          started = true;
        });
        if (!started) {
          setMessages((prev) => [...prev, { role: 'assistant', content: 'No response.' }]);
        }
      } else {
        await new Promise((r) => setTimeout(r, 600));
        setMessages((prev) => [...prev, { role: 'assistant', content: DUMMY_RESPONSE }]);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Error: ${message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-96px)] sm:min-h-[calc(100vh-112px)] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-[700px] bg-white rounded-xl sm:rounded-2xl shadow-xl flex flex-col h-[calc(100vh-112px)] sm:h-[75vh]">
        {/* Chat header */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-slate-900 rounded-t-xl sm:rounded-t-2xl">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <SmartToyIcon className="text-slate-300" fontSize="small" />
            <h1 className="text-base sm:text-lg font-semibold text-white">Chat Bot</h1>
            {provider !== 'none' && (provider === 'ollama' || token) && (
              <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full ml-2">
                {provider === 'ollama' ? 'Custom AI by PK' : `${provider} connected`}
              </span>
            )}
            {(provider === 'none' || (provider !== 'ollama' && !token)) && (
              <span className="text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded-full ml-2">
                Demo mode
              </span>
            )}
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-slate-700"
          >
            <SettingsIcon fontSize="small" />
          </button>
        </div>

        {/* Settings panel */}
        {showSettings && (
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Provider</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as Provider)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <option value="none">None (Demo)</option>
                <option value="claude">Claude (Anthropic)</option>
                <option value="openai">ChatGPT (OpenAI)</option>
                <option value="gemini">Gemini (Google)</option>
                <option value="grok">Grok (xAI)</option>
                <option value="ollama">Custom AI by PK (Free)</option>
              </select>
            </div>
            {provider !== 'none' && provider !== 'ollama' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">API Token</label>
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder={TOKEN_PLACEHOLDERS[provider] || 'Enter token...'}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Your token is sent to the server only to proxy the request. It is never stored.
                </p>
              </div>
            )}
            {provider === 'ollama' && (
              <p className="text-xs text-slate-500">
                Custom AI by PK — runs locally, no API token needed.
              </p>
            )}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <SmartToyIcon style={{ fontSize: 48 }} />
              <p className="mt-2 text-sm">Send a message to start chatting</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 sm:gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <SmartToyIcon style={{ fontSize: 14, color: 'white' }} />
                </div>
              )}
              <div
                className={`max-w-[85%] sm:max-w-[80%] px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-slate-800 text-white rounded-br-md'
                    : 'bg-slate-100 text-slate-800 rounded-bl-md'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
                  <PersonIcon style={{ fontSize: 14, color: 'white' }} />
                </div>
              )}
            </div>
          ))}
          {loading && messages[messages.length - 1]?.role !== 'assistant' && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                <SmartToyIcon style={{ fontSize: 16, color: 'white' }} />
              </div>
              <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-2 sm:px-4 py-2 sm:py-3 border-t border-slate-200">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-1 border border-slate-300 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-slate-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <SendIcon fontSize="small" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
