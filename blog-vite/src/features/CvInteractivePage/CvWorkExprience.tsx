'use client';

import CvParagraph from './CvParagraph';
import { CvData, IWorkUnit } from './data';
import { Specialization } from './cvSpecialization';
import { useUnwrap } from "@/utils/hooks";
import { CvState } from "./slice-CV";

const Block = (props: IWorkUnit) => {
  const cvFilters = useUnwrap(CvState);

  // Extract company name and date from placeWithDate
  const parts = props.placeWithDate.match(/^(.+?)(?:\s*\((.+)\)\s*)?$/);
  const company = parts?.[1]?.trim() || props.placeWithDate;
  const dateRange = parts?.[2]?.trim();

  return (
    <div data-cv-block className="group relative pl-7 pb-6 last:pb-0">
      {/* Timeline line — trimmed to start/end at the dot for the first/last item */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-300 group-first:top-6 group-last:bottom-[calc(100%-1.5rem)]" />
      {/* Timeline dot */}
      <div className="absolute -left-[3px] top-6 w-2 h-2 rounded-full bg-slate-800" />

      <div className="bg-slate-50 rounded-xl p-4 hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <h3 className="text-base font-bold text-slate-800 m-0">{company}</h3>
          {dateRange && (
            <span className="text-xs font-medium text-slate-400 whitespace-nowrap">{dateRange}</span>
          )}
        </div>
        <div className="text-sm font-semibold text-slate-600 mt-0.5">{props.jobTitle}</div>

        {props.description && (
          <p className="text-sm text-slate-500 mt-2 mb-0 leading-relaxed">
            {props.description}
          </p>
        )}

        {props.highlights && props.highlights.length > 0 && (
          <ul className="mt-2 mb-0 space-y-1 list-none pl-0">
            {props.highlights.map((highlight, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-800" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <Specialization
          specialization={props.ai}
          position="AI"
          shouldDisplay={cvFilters.isAiSelected}
        />
        <Specialization
          specialization={props.frontend}
          position="FE"
          shouldDisplay={cvFilters.isFeSelected}
        />
        <Specialization
          specialization={props.backend}
          position="BE"
          shouldDisplay={cvFilters.isBeSelected}
        />
        <Specialization
          specialization={props.devops}
          position="DevOps"
          shouldDisplay={cvFilters.isDevOpsSelected}
        />
      </div>
    </div>
  );
};

export default function CvWorkExprience() {
  return (
    <div>
      <CvParagraph text="Work Experience" />
      <div className="mt-4">
        {CvData.map((x, i) => (
          <Block key={i} {...x} />
        ))}
      </div>
    </div>
  );
}
