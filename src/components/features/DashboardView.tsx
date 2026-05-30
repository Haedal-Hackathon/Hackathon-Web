import React from "react";
import { CheckCircle2, Activity, Plus, ChevronRight } from "lucide-react";
import { Project } from "../../types";
import { getProjectTotal } from "../../services/projectService";

interface DashboardViewProps {
  progressPercent: number;
  completedProjectsCount: number;
  totalProjectsCount: number;
  averageScore: string;
  projects: Project[];
  onSelectProject: (id: string) => void;
  onRequestNewProject: () => void;
  getPastelBg: (cat: string) => string;
  getPastelTagColor: (cat: string) => string;
  getStatusColor: (stat: "완료" | "진행 중" | "대기") => string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  progressPercent,
  completedProjectsCount,
  totalProjectsCount,
  averageScore,
  projects,
  onSelectProject,
  onRequestNewProject,
  getPastelBg,
  getPastelTagColor,
  getStatusColor,
}) => {
  return (
    <>
      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Progress Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 flex flex-col justify-between text-left shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">심사 진행 현황</span>
            </div>
          </div>
          <div>
            <span className="text-4xl font-extrabold text-slate-800 tracking-tight">{progressPercent}%</span>
            <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="text-slate-400 font-semibold text-xs mt-3.5">
              전체 {totalProjectsCount}개 프로젝트 중 {completedProjectsCount}개 완료 · 진행 예정 {totalProjectsCount - completedProjectsCount}
            </p>
          </div>
        </div>

        {/* Avg Score Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 flex flex-col justify-between text-left shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-cyan-50 text-cyan-600 p-2.5 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">평균 부여 점수</span>
            </div>
          </div>
          <div>
            <span className="text-4xl font-extrabold text-slate-800 tracking-tight">
              {(parseFloat(averageScore) / 10).toFixed(1)} <span className="text-lg text-slate-400 font-bold">/ 10</span>
            </span>
            <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500" style={{ width: `${parseFloat(averageScore)}%` }} />
            </div>
            <p className="text-slate-400 font-semibold text-xs mt-3.5">
              남은 심사 대상 · {totalProjectsCount - completedProjectsCount} Projects
            </p>
          </div>
        </div>
      </div>

      {/* Assigned Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-left">
          <h2 className="text-md font-extrabold text-slate-700 tracking-tight">배정 프로젝트</h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {projects.slice(0, 3).map((p) => (
            <div key={p.id} className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col text-left justify-between">
              {/* Header color matching category */}
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
                  {/* Virtual Team Member Avatars */}
                  <div className="flex -space-x-1.5 overflow-hidden">
                    <div className={`w-6 h-6 rounded-full border border-white flex items-center justify-center font-bold text-[9px] text-white ${
                      p.id === "1" ? "bg-rose-400" : p.id === "2" ? "bg-teal-400" : "bg-amber-400"
                    }`}>
                      {p.name.substring(0, 1)}
                    </div>
                    <div className="w-6 h-6 bg-slate-300 rounded-full border border-white flex items-center justify-center font-bold text-[9px] text-white">L</div>
                    <div className="w-6 h-6 bg-slate-200 text-slate-500 rounded-full border border-white flex items-center justify-center font-bold text-[8px]">+2</div>
                  </div>

                  {/* Score or CTA Link */}
                  {p.status === "완료" ? (
                    <span className="text-emerald-500 font-extrabold text-xs flex items-center gap-1">
                      ★ {(getProjectTotal(p) / 10).toFixed(1)}
                    </span>
                  ) : (
                    <button
                      onClick={() => onSelectProject(p.id)}
                      className="text-emerald-500 hover:text-emerald-600 font-bold text-xs tracking-tight flex items-center gap-0.5"
                    >
                      <span>상세 보기</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Dotted "+" Card */}
          <button
            onClick={onRequestNewProject}
            className="bg-transparent border border-dashed border-[#CBD5E1] rounded-3xl p-6 min-h-[220px] flex flex-col items-center justify-center hover:bg-white/40 hover:border-slate-400 transition-all gap-2.5 text-slate-400"
          >
            <Plus className="w-8 h-8" />
            <span className="font-extrabold text-sm tracking-tight text-slate-500">새 프로젝트 배정 요청</span>
          </button>
        </div>
      </div>
    </>
  );
};
