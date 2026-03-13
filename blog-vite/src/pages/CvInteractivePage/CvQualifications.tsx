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
          title="Core Languages"
          skills={['C#', 'TypeScript', 'JavaScript', 'SQL', 'HTML', 'CSS', 'YAML', 'Python', 'Java']}
        />
        <SkillGroup
          title="Frameworks & Libraries"
          skills={[
            'ASP.NET Core / 5', 'LINQ', 'SignalR', 'Entity Framework', 'ADO.NET',
            'React', 'Angular', 'jQuery', 'Docker', 'RabbitMQ', 'Kafka',
            'OpenID', 'OAuth2', 'WPF', 'UWP',
          ]}
        />
        <SkillGroup
          title="Testing"
          skills={['Jest', 'Jasmine', 'Karma', 'NUnit', 'Moq', 'SpecFlow', 'xUnit']}
        />
        <SkillGroup
          title="Databases"
          skills={['SQL Server', 'ElasticSearch', 'MongoDB', 'PostgreSQL', 'Oracle', 'Redis']}
        />
        <SkillGroup
          title="Tools"
          skills={[
            'Visual Studio / Code', 'Rider', 'Jira', 'Jenkins', 'Git',
            'TeamCity', 'npm', 'Webpack', 'Terraform',
          ]}
        />
        <SkillGroup
          title="Cloud & DevOps"
          skills={['Azure', 'AWS', 'Docker', 'Kubernetes', 'OpenShift', 'Azure DevOps CI/CD']}
        />
        <SkillGroup
          title="Methodologies"
          skills={['OOP', 'BDD', 'TDD', 'DDD', 'MVC', 'MVVM', 'Event Sourcing', 'Agile (Scrum, Kanban)', 'CI/CD']}
        />

        <div className="border-t border-slate-100 pt-4 space-y-2">
          <InfoRow label="Languages" value="Polish (Native) • English (C1+) • Spanish (A2)" />
          <InfoRow label="Interests" value="Market / Stock trading • Mobile Phones • Bachata / Salsa" />
          <InfoRow label="Other" value="Driver license (B) • Yacht skipper • Foosball player" />
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
