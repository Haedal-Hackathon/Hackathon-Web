import React from "react";
import { LayoutDashboard, Plus } from "lucide-react";

export const CriteriaView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 1. Web/App/Game Box */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 text-left shadow-sm">
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-md tracking-tight">웹 / 앱 / 게임</h3>
            <span className="text-slate-400 font-semibold text-[10px] uppercase">Web / App / Game</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="py-3 text-left w-1/4">분류 (Category)</th>
                <th className="py-3 text-left w-1/4">반영 비율 (Weight)</th>
                <th className="py-3 text-left w-1/2">세부사항 (Details)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="text-slate-700">
                <td className="py-4.5 font-bold">개발<br/><span className="text-[10px] text-slate-400 uppercase font-semibold">Development</span></td>
                <td className="py-4.5"><span className="px-3 py-1 bg-teal-50 text-teal-600 font-extrabold text-sm rounded-xl">40%</span></td>
                <td className="py-4.5">
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">배포 여부 40%</span>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">시연 영상 60%</span>
                  </div>
                </td>
              </tr>
              <tr className="text-slate-700">
                <td className="py-4.5 font-bold">아이디어<br/><span className="text-[10px] text-slate-400 uppercase font-semibold">Ideation</span></td>
                <td className="py-4.5"><span className="px-3 py-1 bg-teal-50 text-teal-600 font-extrabold text-sm rounded-xl">40%</span></td>
                <td className="py-4.5">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">주제의 혁신성 25%</span>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">창의성 25%</span>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">효과성(실용성) 20%</span>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">발전성 20%</span>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">상업성 10%</span>
                  </div>
                </td>
              </tr>
              <tr className="text-slate-700">
                <td className="py-4.5 font-bold">문서<br/><span className="text-[10px] text-slate-400 uppercase font-semibold">Documentation</span></td>
                <td className="py-4.5"><span className="px-3 py-1 bg-slate-50 text-slate-500 font-extrabold text-sm rounded-xl">10%</span></td>
                <td className="py-4.5">
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">가독성 40%</span>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">기능 명세서 60%</span>
                  </div>
                </td>
              </tr>
              <tr className="text-slate-700">
                <td className="py-4.5 font-bold">발표<br/><span className="text-[10px] text-slate-400 uppercase font-semibold">Presentation</span></td>
                <td className="py-4.5"><span className="px-3 py-1 bg-slate-50 text-slate-500 font-extrabold text-sm rounded-xl">10%</span></td>
                <td className="py-4.5">
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">발표 유창성 50%</span>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">시간 준수(팀당 7분) 50%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Embedded Box */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 text-left shadow-sm">
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <Plus className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-md tracking-tight">임베디드</h3>
            <span className="text-slate-400 font-semibold text-[10px] uppercase">Embedded · Arduino</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="py-3 text-left w-1/4">분류 (Category)</th>
                <th className="py-3 text-left w-1/4">반영 비율 (Weight)</th>
                <th className="py-3 text-left w-1/2">세부사항 (Details)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="text-slate-700">
                <td className="py-4.5 font-bold">개발<br/><span className="text-[10px] text-slate-400 uppercase font-semibold">Development</span></td>
                <td className="py-4.5"><span className="px-3 py-1 bg-amber-50 text-amber-600 font-extrabold text-sm rounded-xl">30%</span></td>
                <td className="py-4.5">
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">완성도 40%</span>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">시연 영상 60%</span>
                  </div>
                </td>
              </tr>
              <tr className="text-slate-700">
                <td className="py-4.5 font-bold">기능<br/><span className="text-[10px] text-slate-400 uppercase font-semibold">Functionality</span></td>
                <td className="py-4.5"><span className="px-3 py-1 bg-slate-50 text-slate-500 font-extrabold text-sm rounded-xl">10%</span></td>
                <td className="py-4.5">
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">메모리 효율 100%</span>
                  </div>
                </td>
              </tr>
              <tr className="text-slate-700">
                <td className="py-4.5 font-bold">아이디어<br/><span className="text-[10px] text-slate-400 uppercase font-semibold">Ideation</span></td>
                <td className="py-4.5"><span className="px-3 py-1 bg-teal-50 text-teal-600 font-extrabold text-sm rounded-xl">40%</span></td>
                <td className="py-4.5">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">주제의 혁신성 25%</span>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">창의성 25%</span>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">효과성(실용성) 25%</span>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">발전성 25%</span>
                  </div>
                </td>
              </tr>
              <tr className="text-slate-700">
                <td className="py-4.5 font-bold">문서<br/><span className="text-[10px] text-slate-400 uppercase font-semibold">Documentation</span></td>
                <td className="py-4.5"><span className="px-3 py-1 bg-slate-50 text-slate-500 font-extrabold text-sm rounded-xl">10%</span></td>
                <td className="py-4.5">
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">가독성 40%</span>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">기능 명세서 60%</span>
                  </div>
                </td>
              </tr>
              <tr className="text-slate-700">
                <td className="py-4.5 font-bold">발표<br/><span className="text-[10px] text-slate-400 uppercase font-semibold">Presentation</span></td>
                <td className="py-4.5"><span className="px-3 py-1 bg-slate-50 text-slate-500 font-extrabold text-sm rounded-xl">10%</span></td>
                <td className="py-4.5">
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">발표 유창성 50%</span>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg">시간 준수(팀당 7분) 50%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-[10px] text-slate-400 font-semibold text-center mt-6">
        위 심사 기준은 모든 참가 팀의 공정하고 엄격한 평가를 위해 해달 기술위원회가 수립하였습니다.<br/>
        심사위원은 평가 세션 전반에 걸쳐 일관성을 유지합니다.
      </p>
    </div>
  );
};
