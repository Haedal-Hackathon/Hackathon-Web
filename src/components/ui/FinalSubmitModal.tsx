import React from "react";
import { CheckCircle2 } from "lucide-react";

interface FinalSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const FinalSubmitModal: React.FC<FinalSubmitModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl mx-auto flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="font-extrabold text-slate-800 text-lg tracking-tight">심사 결과를 최종 제출하시겠습니까?</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-semibold">
            최종 제출 후에는 점수 수정이 불가능하며,<br/>
            해달 해커톤 집계 위원회 서버로 암호화 전송됩니다.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onClose}
            className="py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold rounded-2xl transition-all text-xs"
          >
            취소
          </button>
          <button
            onClick={onSubmit}
            className="py-3.5 bg-[#10B981] hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-md transition-all text-xs"
          >
            제출 완료
          </button>
        </div>
      </div>
    </div>
  );
};
