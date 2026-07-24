'use client';

import CvParagraph from './CvParagraph';

export default function CvSummary() {
  return (
    <div>
      <CvParagraph text="Summary" />
      <div className="bg-slate-50 rounded-xl p-4 space-y-3">
        <p className="text-sm font-semibold text-slate-700 m-0">
          Forward-Deployed Engineer — applied LLM &amp; agentic systems, delivering directly with clients
          (US, remote-first).
        </p>
        <p className="text-sm text-slate-600 m-0 leading-relaxed">
          Engineer at the intersection of regulated finance and applied AI — pairing deep domain knowledge
          (FRTB, Basel III, CVA, repo trading) with production-grade LLM and agentic systems (RAG,
          multi-agent orchestration, MCP), on a deep .NET / C# / React / Python stack.
        </p>
        <p className="text-sm text-slate-600 m-0 leading-relaxed">
          11+ years across financial services, fintech and vertical SaaS/ERP, much of it in highly regulated,
          mission-critical environments (Point72, Credit Suisse, BNY Mellon, BIS, Danske Bank). Owns delivery
          end to end — gathering requirements directly with clients, designing the architecture, implementing,
          and presenting to management — as a self-sufficient “one-man army” without separate analysts.
        </p>
      </div>
    </div>
  );
}
