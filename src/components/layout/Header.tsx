import React from "react";
import { Search, Bell } from "lucide-react";

interface HeaderProps {
  activeTab: "dashboard" | "projects" | "criteria" | "grading" | "leaderboard";
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  judgeName: string;
  onNotificationClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  searchQuery,
  setSearchQuery,
  judgeName,
  onNotificationClick
}) => {
  const getTitles = () => {
    switch (activeTab) {
      case "dashboard":
        return {
          title: <>심사 <span className="text-[#00A896]">대시보드</span></>,
          subtitle: "2026 상반기 해달 해커톤 · 5/30(토) · IT1호관 203호"
        };
      case "projects":
        return {
          title: <>프로젝트 <span className="text-[#00A896]">목록</span></>,
          subtitle: "배정된 전체 프로젝트를 확인합니다."
        };
      case "criteria":
        return {
          title: <>심사 <span className="text-[#00A896]">기준</span></>,
          subtitle: "분야별 반영 비율과 세부 평가 항목."
        };
      case "grading":
        return {
          title: <>프로젝트 <span className="text-[#00A896]">채점</span></>,
          subtitle: "항목별 점수를 입력하고 제출합니다."
        };
      case "leaderboard":
        return {
          title: <>리얼타임 <span className="text-[#00A896]">리더보드</span></>,
          subtitle: "실시간 종합 순위 · 자동 갱신."
        };
    }
  };

  const { title, subtitle } = getTitles();

  return (
    <header className="h-20 bg-white border-b border-[#E2E8F0] shrink-0 px-8 flex items-center justify-between z-10">
      {/* Title block */}
      <div className="text-left">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
          {title}
        </h1>
        <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-wider">
          {subtitle}
        </p>
      </div>

      {/* Control panel */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="프로젝트 또는 팀 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F4F7FC] border border-[#E2E8F0] rounded-2xl py-2 pl-10 pr-4 text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Notification Button */}
        <button
          onClick={onNotificationClick}
          className="relative p-2.5 hover:bg-slate-50 border border-[#E2E8F0] rounded-xl text-slate-500 hover:text-slate-800 transition-all"
        >
          <Bell className="w-4.5 h-4.5" />
          <div className="w-1.5 h-1.5 bg-rose-500 rounded-full absolute top-2 right-2" />
        </button>

        {/* User Profile Card */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-100">
          <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-500/10">
            {judgeName.substring(0, 1)}
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="font-extrabold text-slate-700 text-xs tracking-tight">{judgeName} 심사위원</span>
            <span className="text-[9px] font-bold text-[#10B981] tracking-wider uppercase mt-0.5">Lead Mentor · Tech Lead</span>
          </div>
        </div>
      </div>
    </header>
  );
};
