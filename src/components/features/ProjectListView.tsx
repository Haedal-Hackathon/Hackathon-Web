import React from "react";
import { ChevronRight } from "lucide-react";
import { Project } from "../../types";
import { getProjectTotal } from "../../services/projectService";

interface ProjectListViewProps {
  projects: Project[];
  onSelectProject: (id: string) => void;
  getPastelBg: (cat: string) => string;
  getPastelTagColor: (cat: string) => string;
  getStatusColor: (stat: "완료" | "진행 중" | "대기") => string;
}

export const ProjectListView: React.FC<ProjectListViewProps> = ({
  projects,
  onSelectProject,
  getPastelBg,
  getPastelTagColor,
  getStatusColor,
}) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {projects.map((p) => (
        <div key={p.id} className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col text-left justify-between min-h-[240px]">
          {/* Header */}
          <div className={`h-24 p-5 flex flex-col justify-between ${getPastelBg(p.category)} border-b border-inherit`}>
            <div className="flex justify-between items-center">
              <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold tracking-wider ${getPastelTagColor(p.category)}`}>
                {p.category}
              </span>
              <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-extrabold tracking-tight ${getStatusColor(p.status)}`}>
                {p.status}
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="font-extrabold text-slate-800 text-base tracking-tight mb-1">{p.name}</h3>
              <p className="text-slate-400 font-medium text-xs leading-relaxed">{p.description}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              {p.status === "완료" ? (
                <div className="flex justify-between items-center w-full">
                  <span className="text-slate-400 font-bold text-[10px]">최종 심사 완료</span>
                  <span className="text-emerald-500 font-extrabold text-sm flex items-center gap-0.5">
                    ★ {(getProjectTotal(p) / 10).toFixed(1)} <span className="text-[10px] text-slate-400">/ 10</span>
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => onSelectProject(p.id)}
                  className="text-emerald-500 hover:text-emerald-600 font-bold text-xs tracking-tight flex items-center justify-between w-full"
                >
                  <span>평가하기</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
