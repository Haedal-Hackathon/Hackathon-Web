import React from "react";
import { Clock } from "lucide-react";

export const Schedule: React.FC = () => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <span className="font-extrabold text-slate-800 text-sm tracking-tight">오늘의 발표 일정</span>
        <Clock className="w-4 h-4 text-slate-400" />
      </div>

      <div className="space-y-4">
        {/* Slot 1: BioSense (Active) */}
        <div className="p-3.5 bg-teal-50/50 border border-teal-100/50 rounded-2xl flex items-start gap-4 transition-all">
          <span className="font-bold text-emerald-500 text-xs mt-0.5 shrink-0">14:00</span>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-slate-800 text-xs tracking-tight leading-none">BioSense Wearable</h4>
              <span className="px-1.5 py-0.5 bg-rose-500 text-white rounded text-[8px] font-extrabold tracking-wider leading-none animate-pulse">LIVE</span>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold leading-none">Room A · Main Hall</p>
            <span className="inline-block text-[9px] font-bold text-[#10B981] leading-none mt-1">Team &quot;HealthTech&quot;</span>
          </div>
        </div>

        {/* Slot 2: EcoFlow Grid */}
        <div className="p-3.5 bg-transparent border border-transparent rounded-2xl flex items-start gap-4 transition-all">
          <span className="font-bold text-slate-400 text-xs mt-0.5 shrink-0">14:30</span>
          <div className="space-y-1 text-left">
            <h4 className="font-extrabold text-slate-600 text-xs tracking-tight leading-none">EcoFlow Grid</h4>
            <p className="text-[10px] text-slate-400 font-semibold leading-none">Room C · 2nd Floor</p>
            <span className="inline-block text-[9px] font-bold text-slate-400 leading-none mt-1">Team &quot;GreenGrid&quot;</span>
          </div>
        </div>

        {/* Slot 3: Artemis VR Edu */}
        <div className="p-3.5 bg-transparent border border-transparent rounded-2xl flex items-start gap-4 transition-all">
          <span className="font-bold text-slate-400 text-xs mt-0.5 shrink-0">15:15</span>
          <div className="space-y-1 text-left">
            <h4 className="font-extrabold text-slate-600 text-xs tracking-tight leading-none">Artemis VR Edu</h4>
            <p className="text-[10px] text-slate-400 font-semibold leading-none">Room B · Main Hall</p>
            <span className="inline-block text-[9px] font-bold text-slate-400 leading-none mt-1">Team &quot;NovaX&quot;</span>
          </div>
        </div>

        {/* Slot 4: SecurePay Protocol */}
        <div className="p-3.5 bg-transparent border border-transparent rounded-2xl flex items-start gap-4 transition-all">
          <span className="font-bold text-slate-400 text-xs mt-0.5 shrink-0">16:00</span>
          <div className="space-y-1 text-left">
            <h4 className="font-extrabold text-slate-600 text-xs tracking-tight leading-none">SecurePay Protocol</h4>
            <p className="text-[10px] text-slate-400 font-semibold leading-none">Room A · Main Hall</p>
            <span className="inline-block text-[9px] font-bold text-slate-400 leading-none mt-1">Team &quot;SafeBlock&quot;</span>
          </div>
        </div>
      </div>
    </div>
  );
};
