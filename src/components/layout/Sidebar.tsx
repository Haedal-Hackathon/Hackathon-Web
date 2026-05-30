import React from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Award,
  PenTool,
  Trophy,
  HelpCircle,
  LogOut,
  Sparkles
} from "lucide-react";

interface SidebarProps {
  activeTab: "dashboard" | "projects" | "criteria" | "grading" | "leaderboard";
  setActiveTab: (tab: "dashboard" | "projects" | "criteria" | "grading" | "leaderboard") => void;
  onFinalSubmitClick: () => void;
  onSupportClick: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onFinalSubmitClick,
  onSupportClick,
  onLogout
}) => {
  return (
    <aside className="w-64 bg-white border-r border-[#E2E8F0] flex flex-col justify-between p-6 shrink-0 relative z-20">
      <div className="space-y-8">
        {/* Logo / Brand Header */}
        <div className="flex items-center gap-3 pl-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-md shadow-cyan-500/10">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="font-extrabold text-slate-800 text-md tracking-tight">Haedal Hack</span>
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mt-0.5">Judge Console 2026</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-4.5 px-4 py-3.5 rounded-2xl text-sm font-semibold tracking-tight transition-all relative ${
              activeTab === "dashboard"
                ? "bg-[#F4F7FC] text-emerald-600"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            {activeTab === "dashboard" && (
              <div className="absolute left-0 top-1/3 bottom-1/3 w-1.5 bg-[#10B981] rounded-r-lg" />
            )}
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            <span>대시보드</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-4.5 px-4 py-3.5 rounded-2xl text-sm font-semibold tracking-tight transition-all relative ${
              activeTab === "projects"
                ? "bg-[#F4F7FC] text-emerald-600"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            {activeTab === "projects" && (
              <div className="absolute left-0 top-1/3 bottom-1/3 w-1.5 bg-[#10B981] rounded-r-lg" />
            )}
            <FolderKanban className="w-5 h-5 shrink-0" />
            <span>프로젝트 목록</span>
          </button>

          <button
            onClick={() => setActiveTab("criteria")}
            className={`w-full flex items-center gap-4.5 px-4 py-3.5 rounded-2xl text-sm font-semibold tracking-tight transition-all relative ${
              activeTab === "criteria"
                ? "bg-[#F4F7FC] text-emerald-600"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            {activeTab === "criteria" && (
              <div className="absolute left-0 top-1/3 bottom-1/3 w-1.5 bg-[#10B981] rounded-r-lg" />
            )}
            <Award className="w-5 h-5 shrink-0" />
            <span>심사 기준</span>
          </button>

          <button
            onClick={() => setActiveTab("grading")}
            className={`w-full flex items-center gap-4.5 px-4 py-3.5 rounded-2xl text-sm font-semibold tracking-tight transition-all relative ${
              activeTab === "grading"
                ? "bg-[#F4F7FC] text-emerald-600"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            {activeTab === "grading" && (
              <div className="absolute left-0 top-1/3 bottom-1/3 w-1.5 bg-[#10B981] rounded-r-lg" />
            )}
            <PenTool className="w-5 h-5 shrink-0" />
            <span>프로젝트 채점</span>
          </button>

          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`w-full flex items-center gap-4.5 px-4 py-3.5 rounded-2xl text-sm font-semibold tracking-tight transition-all relative ${
              activeTab === "leaderboard"
                ? "bg-[#F4F7FC] text-emerald-600"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            {activeTab === "leaderboard" && (
              <div className="absolute left-0 top-1/3 bottom-1/3 w-1.5 bg-[#10B981] rounded-r-lg" />
            )}
            <Trophy className="w-5 h-5 shrink-0" />
            <span>리더보드</span>
          </button>
        </nav>
      </div>

      {/* Sidebar Footer Controls */}
      <div className="space-y-4 pt-6 border-t border-slate-100">
        <button
          onClick={onFinalSubmitClick}
          className="w-full py-3.5 bg-[#10B981] hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all text-sm flex items-center justify-center gap-2"
        >
          <span>최종 점수 제출</span>
        </button>

        <div className="space-y-1">
          <button
            onClick={onSupportClick}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-all"
          >
            <HelpCircle className="w-4 h-4" />
            <span>지원</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>로그아웃</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
