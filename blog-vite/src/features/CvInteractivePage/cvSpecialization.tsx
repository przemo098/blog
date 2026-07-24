import { ISpecialization } from './data';
import { getTechYears } from './techExperience';

interface IProps {
  specialization?: ISpecialization;
  position: string;
  shouldDisplay: boolean;
}

const colorMap: Record<string, { bg: string; border: string; badge: string }> = {
  FE: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-600' },
  BE: { bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-600' },
  DevOps: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-600' },
  AI: { bg: 'bg-violet-50', border: 'border-violet-200', badge: 'bg-violet-600' },
};

export const Specialization = ({
  position,
  specialization,
  shouldDisplay,
}: IProps) => {
  if (!specialization) return null;

  const colors = colorMap[position] || colorMap.FE;

  return (
    <div>
      {shouldDisplay && (
        <div className={`mt-2 p-3 rounded-lg border ${colors.bg} ${colors.border}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold text-white px-2 py-0.5 rounded ${colors.badge}`}>
              {position}
            </span>
            {specialization.description && (
              <span className="text-sm text-slate-600">{specialization.description}</span>
            )}
          </div>
          {specialization.techStack && (
            <div className="flex flex-wrap gap-1 mt-2">
              {specialization.techStack.split(',').map((tech, i) => {
                const name = tech.trim();
                const years = getTechYears(name);
                return (
                  <span
                    key={i}
                    className={`inline-flex items-center gap-1 text-xs py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 ${
                      years != null ? 'pl-2 pr-0.5' : 'px-2'
                    }`}
                  >
                    {name}
                    {years != null && (
                      <span
                        className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full ${colors.badge}`}
                        title={`~${years} years of experience`}
                      >
                        {years}y
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
