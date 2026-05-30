import React from "react";
import { Activity } from "lucide-react";

interface QuickScoreProps {
  quickScoreDev: number;
  setQuickScoreDev: (val: number) => void;
  quickScoreFeas: number;
  setQuickScoreFeas: (val: number) => void;
  onSubmit: () => void;
}

export const QuickScore: React.FC<QuickScoreProps> = ({
  quickScoreDev,
  setQuickScoreDev,
  quickScoreFeas,
  setQuickScoreFeas,
  onSubmit,
}) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
        <Activity className="w-5 h-5 text-emerald-500" />
        <span className="font-extrabold text-slate-800 text-sm tracking-tight">⚡ 퀵 스코어 입력 · BioSense</span>
      </div>

      <div className="space-y-5">
        {/* Innovation */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-600">혁신성 (Innovation)</span>
            <span className="text-emerald-500 font-extrabold">{quickScoreDev}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={quickScoreDev}
            onChange={(e) => setQuickScoreDev(parseInt(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
          />
        </div>

        {/* Feasibility */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-600">실용성 (Feasibility)</span>
            <span className="text-emerald-500 font-extrabold">{quickScoreFeas}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={quickScoreFeas}
            onChange={(e) => setQuickScoreFeas(parseInt(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
          />
        </div>

        <button
          onClick={onSubmit}
          className="w-full py-3 bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-slate-50 rounded-2xl text-slate-600 font-extrabold text-xs transition-all tracking-tight"
        >
          임시 저장
        </button>
      </div>
    </div>
  );
};
