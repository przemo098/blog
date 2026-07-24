'use client';

import CvParagraph from './CvParagraph';

export default function CvSummary() {
  return (
    <div>
      <CvParagraph text="Summary" />
      <div className="bg-slate-50 rounded-xl p-4 space-y-3">
        <p className="text-sm font-semibold text-slate-700 m-0">
          Forward-Deployed Engineer — building software and integrating applied LLM &amp; agentic systems
          directly with clients (US, remote-first).
        </p>
        <p className="text-sm text-slate-600 m-0 leading-relaxed">
          Full-stack engineer with a deep .NET / C# / React / Python background, now focused on applied AI —
          integrating LLM and agentic systems (RAG, multi-agent orchestration, MCP) into production software,
          most recently a vertical ERP. Delivered across the financial-services domains I&apos;ve shipped in —
          mortgage &amp; credit, trading and risk reporting — and vertical SaaS/ERP, often in regulated,
          mission-critical environments.
        </p>
        <p className="text-sm text-slate-600 m-0 leading-relaxed">
          11+ years across financial services, fintech and vertical SaaS/ERP (Point72, Credit Suisse,
          BNY Mellon, BIS, Danske Bank). Owns delivery end to end — gathering requirements directly with
          clients, designing the architecture, implementing, and presenting to management — as a self-sufficient
          engineer without separate analysts.
        </p>
      </div>
    </div>
  );
}
