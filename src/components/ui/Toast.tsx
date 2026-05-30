import React from "react";
import { RefreshCw } from "lucide-react";

interface ToastProps {
  message: string;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-900/90 border border-slate-800 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-bottom duration-300">
      <div className="bg-emerald-500 p-1.5 rounded-lg flex items-center justify-center">
        <RefreshCw className="w-4 h-4 text-white animate-spin" />
      </div>
      <div className="flex flex-col text-left">
        <span className="font-bold text-sm text-white">{message}</span>
        <span className="text-slate-400 text-xs">2초 전 최신 점수가 반영되었습니다.</span>
      </div>
    </div>
  );
};
