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
    <div data-cv-block className="relative pl-6 pb-6 border-l-2 border-slate-200 last:pb-0">
      {/* Timeline dot - aligned with company name */}
      <div className="absolute -left-[7px] top-5 w-3 h-3 rounded-full bg-slate-800 border-2 border-white" />

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
