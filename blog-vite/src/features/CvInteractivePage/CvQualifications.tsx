'use client';

import CvParagraph from './CvParagraph';

interface SkillGroupProps {
  title: string;
  skills: string[];
}

function SkillGroup({ title, skills }: SkillGroupProps) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-700 mb-2 m-0">{title}</h4>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-sm font-semibold text-slate-700 shrink-0">{label}:</span>
      <span className="text-sm text-slate-600">{value}</span>
    </div>
  );
}

export default function CvQualifications() {
  return (
    <div>
      <CvParagraph text="Qualifications" />
      <div className="space-y-5">
        <SkillGroup
          title="AI / LLM"
          skills={[
            'LLM application engineering', 'RAG', 'semantic search', 'agentic / multi-agent',
            'tool / function calling', 'structured outputs', 'embeddings', 'fine-tuning', 'prompt engineering',
            'LangChain', 'LangGraph', 'Semantic Kernel', 'Claude Code agents', 'MCP / FastMCP',
            'OpenAI', 'Anthropic (Claude)', 'Azure OpenAI', 'pgvector', 'Azure AI Search',
            'Azure AI Document Intelligence', 'Azure AI Vision (OCR)', 'LangSmith', 'Arize Phoenix',
          ]}
        />
        <SkillGroup
          title="Languages"
          skills={['C#', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'Java', 'HTML', 'CSS', 'YAML']}
        />
        <SkillGroup
          title="Python"
          skills={['FastAPI', 'Pydantic', 'async / asyncio', 'Celery', 'Django', 'Jupyter', 'Sentry']}
        />
        <SkillGroup
          title="Backend (.NET)"
          skills={[
            '.NET 10 / .NET Core', 'ASP.NET Web API', 'Entity Framework', 'Dapper', 'LINQ', 'gRPC', 'SignalR',
            'CQRS / MediatR', 'MassTransit', 'Serilog', 'Blazor', 'Azure Functions / Service Bus',
            'microservices', 'REST', 'OAuth2 / OpenID',
          ]}
        />
        <SkillGroup
          title="Backend (JVM)"
          skills={['Java', 'Java EE', 'Spring / Spring Boot', 'Hibernate', 'microservices', 'REST']}
        />
        <SkillGroup
          title="Frontend"
          skills={[
            'React', 'Hooks', 'Redux', 'Redux-Saga', 'NgRx', 'RxJS', 'MobX', 'Angular', 'Next.js',
            'TypeScript', 'Tailwind', 'Webpack', 'Three.js', 'WPF',
          ]}
        />
        <SkillGroup
          title="Cloud & DevOps"
          skills={[
            'Azure', 'AWS', 'Docker', 'Kubernetes / OpenShift', 'Terraform',
            'Azure DevOps (CI/CD, YAML)', 'GitLab CI', 'Jenkins', 'Nginx', 'n8n', 'PowerShell',
          ]}
        />
        <SkillGroup
          title="Data & messaging"
          skills={[
            'SQL Server', 'PostgreSQL', 'TimescaleDB', 'MongoDB', 'Elasticsearch', 'Redis', 'Kafka', 'RabbitMQ',
          ]}
        />
        <SkillGroup
          title="Testing"
          skills={[
            'Cypress', 'Playwright', 'Jest', 'Jasmine', 'Karma', 'xUnit', 'NUnit', 'Moq', 'NSubstitute', 'SpecFlow',
          ]}
        />
        <SkillGroup
          title="Practices"
          skills={[
            'OOP', 'DDD', 'TDD', 'BDD', 'Event Sourcing', 'MVVM / MVC', 'Agile (Scrum, Kanban)',
            'CI/CD', 'code review', 'technical leadership',
          ]}
        />
        <SkillGroup
          title="Finance domain"
          skills={[
            'Capital markets', 'fintech', 'accounting systems', 'risk (FRTB, Basel III, CVA)', 'repo trading',
            'regulated, mission-critical delivery',
          ]}
        />

        <div className="border-t border-slate-100 pt-4 space-y-2">
          <InfoRow label="Languages" value="Polish (native) • English (C1+) • Spanish (A2)" />
          <InfoRow label="Interests" value="Markets / stock trading • Macroeconomics • Cooking • Guitar" />
          <InfoRow label="Other" value="Driving licence (B) • Yacht skipper" />
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-amber-800 m-0 mb-1">Achievement</h4>
          <p className="text-sm text-amber-700 m-0">
            Architect / Developer / Team leader in University project for Capgemini.
            Project won main prize in &ldquo;Team engineering competition&rdquo; at Wrocław University of Technology
            (Web multiplayer game - Ships). Used: ASP.NET MVC, Entity Framework, LINQ, SignalR, JavaScript.
          </p>
        </div>
      </div>
    </div>
  );
}
