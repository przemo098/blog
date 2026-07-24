import { CvData, IWorkUnit } from './data';

// Wylicza lata doświadczenia dla technologii AUTOMATYCZNIE z zakresów dat w CvData.
// Dla każdej technologii bierzemy rozpiętość: od pierwszego użycia do ostatniego
// (lub do teraz, jeśli występuje w pozycji trwającej „present”).
//
// Nazwy w techStack są niespójne ("TypeScript"/"Typescript", ".NET"/"ASP.NET"),
// dlatego mapujemy warianty na kanoniczne technologie przez wyrażenia regularne.

// Zakres dat wewnątrz nawiasu: (MM.YYYY – MM.YYYY) lub (MM.YYYY – present)
const RANGE = /\((\d{2})\.(\d{4})\s*[–—-]\s*(present|\d{2}\.\d{4})\)/i;

const toMonths = (year: number, month: number) => year * 12 + (month - 1);

const now = new Date();
const NOW_M = toMonths(now.getFullYear(), now.getMonth() + 1);

interface Span {
  start: number;
  end: number;
}

function parseSpan(placeWithDate: string): Span | null {
  const m = placeWithDate.match(RANGE);
  if (!m) return null;
  const start = toMonths(parseInt(m[2], 10), parseInt(m[1], 10));
  if (/present/i.test(m[3])) return { start, end: NOW_M };
  const end = m[3].match(/(\d{2})\.(\d{4})/)!;
  return { start, end: toMonths(parseInt(end[2], 10), parseInt(end[1], 10)) };
}

// Kanoniczne technologie + matcher po (zlowercase'owanym) tekście techStack.
// Kolejność ma znaczenie: przy dopasowaniu chipa zwracamy pierwszy trafiony wpis.
const TECHS: { name: string; re: RegExp }[] = [
  { name: 'React', re: /\breact\b/ },
  { name: 'Angular', re: /\bangular\b/ },
  { name: 'TypeScript', re: /\btypescript\b/ },
  // JavaScript rzadko jest wypisany wprost, ale występuje wszędzie tam, gdzie
  // technologia z ekosystemu JS — dlatego liczymy go z całej kariery frontendowej.
  { name: 'JavaScript', re: /\b(javascript|typescript|react|angular|vue|jquery|ext js)\b/ },
  { name: 'C#', re: /c#/ },
  { name: '.NET', re: /\.net|asp\.net/ },
  { name: 'Python', re: /\b(python|fastapi|pydantic|celery|django)\b/ },
  { name: 'Java', re: /\bjava\b(?!script)/ },
  { name: 'Spring', re: /\bspring\b/ },
  { name: 'Entity Framework', re: /entity framework|ef core|\bef\b/ },
  { name: 'Redux', re: /\bredux\b/ },
  { name: 'RxJS', re: /rxjs/ },
  { name: 'Three.js', re: /three\.js/ },
  { name: 'SQL Server', re: /sql server|ssms/ },
  { name: 'PostgreSQL', re: /postgre/ },
  { name: 'MongoDB', re: /mongodb/ },
  { name: 'Elasticsearch', re: /elasticsearch/ },
  { name: 'Redis', re: /\bredis\b/ },
  { name: 'Kafka', re: /kafka/ },
  { name: 'RabbitMQ', re: /rabbitmq/ },
  { name: 'Docker', re: /docker/ },
  { name: 'Kubernetes', re: /kubernetes|openshift/ },
  { name: 'Terraform', re: /terraform/ },
  // „Azure" ogólne (DevOps, Functions, platform) — ale NIE usługi „Azure AI …",
  // które są znacznie młodsze i nie powinny dziedziczyć 9-letniego stażu Azure.
  { name: 'Azure', re: /\bazure\b(?!\s+(ai|openai))/ },
  { name: 'AWS', re: /\baws\b/ },
  { name: 'Cypress', re: /cypress/ },
  // AI / LLM
  { name: 'LangChain', re: /langchain/ },
  { name: 'LangGraph', re: /langgraph/ },
  { name: 'RAG', re: /\brag\b/ },
  { name: 'Semantic Kernel', re: /semantic kernel/ },
  { name: 'MCP', re: /\bmcp\b|fastmcp/ },
  { name: 'embeddings', re: /embeddings/ },
  { name: 'pgvector', re: /pgvector/ },
  { name: 'Azure AI Search', re: /azure ai search/ },
  { name: 'OpenAI', re: /openai/ },
  { name: 'Anthropic', re: /anthropic|claude/ },
];

const techBlob = (u: IWorkUnit): string =>
  [u.frontend, u.backend, u.devops, u.ai]
    .map((s) => s?.techStack ?? '')
    .join(' , ')
    .toLowerCase();

// Precompute: kanoniczna technologia -> liczba lat (rozpiętość użycia).
const YEARS: Record<string, number> = (() => {
  const acc: Record<string, { min: number; max: number }> = {};
  for (const u of CvData) {
    const span = parseSpan(u.placeWithDate);
    if (!span) continue;
    const blob = techBlob(u);
    for (const t of TECHS) {
      if (!t.re.test(blob)) continue;
      const cur = acc[t.name];
      acc[t.name] = cur
        ? { min: Math.min(cur.min, span.start), max: Math.max(cur.max, span.end) }
        : { min: span.start, max: span.end };
    }
  }
  const out: Record<string, number> = {};
  for (const [name, s] of Object.entries(acc)) {
    out[name] = Math.max(1, Math.round((s.max - s.min) / 12));
  }
  return out;
})();

/**
 * Dla tokenu z techStack zwraca liczbę lat doświadczenia (rozpiętość z dat pracy),
 * albo null, jeśli tokenu nie rozpoznajemy jako kanonicznej technologii.
 */
export function getTechYears(token: string): number | null {
  const lc = token.toLowerCase();
  // Wybieramy najbardziej szczegółowe dopasowanie (najdłuższe trafienie), żeby
  // np. "Azure AI Search" wygrało z ogólnym "Azure".
  let best: { name: string; len: number } | null = null;
  for (const t of TECHS) {
    const m = lc.match(t.re);
    if (m && YEARS[t.name] != null && (!best || m[0].length > best.len)) {
      best = { name: t.name, len: m[0].length };
    }
  }
  return best ? YEARS[best.name] : null;
}
