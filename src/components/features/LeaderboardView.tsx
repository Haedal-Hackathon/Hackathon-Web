import React from "react";
import { Project } from "../../types";
import { getProjectTotal } from "../../services/projectService";

interface LeaderboardViewProps {
  progressPercent: number;
  averageScore: string;
  rankedProjects: Project[];
  getStatusColor: (stat: "완료" | "진행 중" | "대기") => string;
  onMoreClick: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  progressPercent,
  averageScore,
  rankedProjects,
  getStatusColor,
  onMoreClick,
}) => {
  return (
    <div className="space-y-6 w-full text-left">
      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Total Teams */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm">
          <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block mb-2">총 참가 팀</span>
          <span className="text-3xl font-extrabold text-slate-800 tracking-tight">128 <span className="text-sm font-bold text-slate-400">Teams</span></span>
          <span className="inline-block mt-3 px-2 py-0.5 bg-emerald-50 text-[9px] font-extrabold text-emerald-600 rounded-md">
            {progressPercent}% 심사 완료
          </span>
        </div>

        {/* Avg Score */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm">
          <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block mb-2">평균 점수</span>
          <span className="text-3xl font-extrabold text-[#00A896] tracking-tight">
            {(parseFloat(averageScore) / 10).toFixed(1)} <span className="text-sm font-bold text-slate-400">/ 10</span>
          </span>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${parseFloat(averageScore)}%` }} />
          </div>
        </div>

        {/* Time Remaining */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm">
          <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block mb-2">남은 심사 시간</span>
          <span className="text-3xl font-extrabold text-rose-500 tracking-tight font-mono">02:45:12</span>
          <span className="block mt-3 text-[9px] text-slate-400 font-semibold uppercase">
            최종 스코어 산출 중...
          </span>
        </div>
      </div>

      {/* Scoreboard block */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-5">
          <div className="flex items-center gap-2.5">
            <h3 className="font-extrabold text-slate-800 text-base tracking-tight">종합 순위</h3>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md font-extrabold text-[9px] tracking-wider animate-pulse">LIVE</span>
          </div>

          <div className="flex gap-4 text-[10px] text-slate-400 font-bold">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-teal-400 rounded-full"/> 기술성 40%</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-400 rounded-full"/> 혁신성 30%</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-amber-400 rounded-full"/> 디자인 30%</span>
          </div>
        </div>

        <div className="space-y-4">
          {rankedProjects.map((p, idx) => {
            const total = getProjectTotal(p);
            const displayScore = (total / 10).toFixed(1);

            // Ratios
            const devWeight = (p.score.dev / (p.type === "embedded" ? 30 : 40)) * 40;
            const ideaWeight = (p.score.idea / 40) * 30;
            const docWeight = ((p.score.doc + p.score.pres) / 20) * 30;

            return (
              <div key={p.id} className="flex items-center justify-between p-4 border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50/80 rounded-2xl transition-all">
                {/* Profile */}
                <div className="flex items-center gap-4.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs shadow-sm ${
                    idx === 0
                      ? "bg-amber-400 text-white"
                      : idx === 1
                      ? "bg-slate-300 text-white"
                      : idx === 2
                      ? "bg-amber-600/70 text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}>
                    {idx + 1}
                  </div>

                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm text-white ${
                    p.id === "1" ? "bg-teal-500" : p.id === "2" ? "bg-cyan-500" : p.id === "3" ? "bg-amber-500" : p.id === "4" ? "bg-emerald-500" : "bg-indigo-500"
                  }`}>
                    {p.name.substring(0, 2).toUpperCase()}
                  </div>

                  <div className="text-left leading-tight">
                    <h4 className="font-extrabold text-slate-800 text-sm tracking-tight">{p.name}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold">{p.description}</span>
                  </div>
                </div>

                {/* Breakdown Progress Bars */}
                <div className="w-1/3 flex flex-col space-y-1.5 text-left">
                  <div className="w-full h-1.5 bg-slate-200/60 rounded-full flex overflow-hidden">
                    <div className="h-full bg-teal-400 transition-all duration-500" style={{ width: `${p.status === "완료" ? devWeight : 0}%` }} />
                    <div className="h-full bg-emerald-400 transition-all duration-500" style={{ width: `${p.status === "완료" ? ideaWeight : 0}%` }} />
                    <div className="h-full bg-amber-400 transition-all duration-500" style={{ width: `${p.status === "완료" ? docWeight : 0}%` }} />
                  </div>
                  {p.status === "완료" ? (
                    <span className="text-[9px] text-slate-400 font-mono font-semibold">
                      T {(p.score.dev / 10).toFixed(1)} &nbsp;I {(p.score.idea / 10).toFixed(1)} &nbsp;D {((p.score.doc + p.score.pres) / 20).toFixed(1)}
                    </span>
                  ) : (
                    <span className="text-[9px] text-slate-400 font-bold italic tracking-tight">심사 진행 전 또는 심사 중...</span>
                  )}
                </div>

                {/* Status and final score */}
                <div className="flex items-center gap-6">
                  <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-extrabold tracking-tight ${getStatusColor(p.status)}`}>
                    {p.status === "완료" ? "심사 완료" : p.status === "진행 중" ? "심사 중..." : "대기"}
                  </span>

                  <span className="font-extrabold text-slate-800 text-base tracking-tight w-12 text-right">
                    {p.status === "완료" ? displayScore : "-.-"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onMoreClick}
          className="w-full mt-6 py-3 bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
        >
          <span>더 보기 ∨</span>
        </button>
      </div>
    </div>
  );
};
