import React from "react";
import { Sparkles, User, ChevronRight } from "lucide-react";

interface LoginViewProps {
  onLogin: (name: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">
      {/* Dynamic background lighting */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      
      {/* Glassmorphic Login Card */}
      <div className="w-full max-w-md bg-slate-800/60 border border-slate-700/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl flex flex-col items-center relative z-10">
        <div className="w-20 h-20 bg-gradient-to-tr from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-6">
          <Sparkles className="w-10 h-10 text-white animate-pulse" />
        </div>

        <h2 className="text-3xl font-extrabold text-white text-center tracking-tight mb-2">
          Haedal Hack
        </h2>
        <p className="text-slate-400 text-sm text-center mb-8 font-medium">
          2026학년도 상반기 해달 해커톤 심사 포탈
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value;
            onLogin(input);
          }}
          className="w-full space-y-5"
        >
          <div className="space-y-2">
            <label htmlFor="name" className="text-slate-300 text-xs font-semibold uppercase tracking-wider pl-1">
              심사위원 성함 입력
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                required
                placeholder="성함을 입력하세요 (예: 김해달)"
                className="w-full bg-slate-900/80 border border-slate-700/80 rounded-2xl px-5 py-4 pl-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm font-medium"
              />
              <User className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-sm flex items-center justify-center gap-2"
          >
            <span>심사 콘솔 시작하기</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-700/40 w-full text-center">
          <span className="text-slate-500 text-xs font-medium">
            경북대학교 IT대학 전자공학부 IT 학술 동아리 해달
          </span>
        </div>
      </div>
    </div>
  );
};
