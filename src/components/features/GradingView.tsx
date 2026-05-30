import React from "react";
import { Award, Play, Send, MessageSquare } from "lucide-react";
import { Project } from "../../types";

interface GradingViewProps {
  project: Project;
  onBackToList: () => void;
  gradingDev: number;
  setGradingDev: (val: number) => void;
  gradingFunc: number;
  setGradingFunc: (val: number) => void;
  gradingIdea: number;
  setGradingIdea: (val: number) => void;
  gradingDoc: number;
  setGradingDoc: (val: number) => void;
  gradingPres: number;
  setGradingPres: (val: number) => void;
  gradingComment: string;
  setGradingComment: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onVideoPlay: () => void;
}

export const GradingView: React.FC<GradingViewProps> = ({
  project,
  onBackToList,
  gradingDev,
  setGradingDev,
  gradingFunc,
  setGradingFunc,
  gradingIdea,
  setGradingIdea,
  gradingDoc,
  setGradingDoc,
  gradingPres,
  setGradingPres,
  gradingComment,
  setGradingComment,
  onSubmit,
  onVideoPlay,
}) => {
  const currentSum = gradingDev + (project.type === "embedded" ? gradingFunc : 0) + gradingIdea + gradingDoc + gradingPres;

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-12 gap-8 w-full text-left">
      {/* Left Details Grid (Col-6) */}
      <div className="col-span-6 space-y-6">
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm space-y-6">
          <button
            type="button"
            onClick={onBackToList}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 font-bold transition-all"
          >
            <span>← 목록으로</span>
          </button>

          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Team &apos;{project.name}&apos;</h2>
            <p className="text-slate-500 text-sm font-bold mt-1 tracking-tight">{project.description}</p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-0.5">피치 요약</span>
            <blockquote className="bg-slate-50/70 border border-slate-100 rounded-2xl p-4 text-xs font-medium text-slate-600 leading-relaxed">
              &ldquo;{project.pitchSummary}&rdquo;
            </blockquote>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-0.5">기술 스택</span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-100 border border-slate-100/70 text-[10px] font-bold text-slate-500 rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Video Mock Panel */}
          <div className="relative aspect-video w-full bg-slate-100 border border-slate-200/50 rounded-2xl flex items-center justify-center overflow-hidden group cursor-pointer shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-0" />
            <button
              type="button"
              onClick={onVideoPlay}
              className="w-14 h-14 bg-white hover:bg-emerald-500 text-emerald-500 hover:text-white rounded-full flex items-center justify-center shadow-lg transform transition-all group-hover:scale-110 z-10"
            >
              <Play className="w-6 h-6 fill-current pl-1 animate-in zoom-in-50" />
            </button>
          </div>

          {/* Overall feedback comments */}
          <div className="space-y-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-0.5">종합 의견</span>
            <div className="relative">
              <textarea
                value={gradingComment}
                onChange={(e) => setGradingComment(e.target.value)}
                placeholder={`팀 '${project.name}'에 대한 피드백을 입력하세요...`}
                rows={4}
                className="w-full bg-slate-50 border border-[#E2E8F0] rounded-2xl p-4 text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-all resize-none"
              />
              <MessageSquare className="w-4 h-4 text-slate-300 absolute right-4 bottom-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Grading Sliders (Col-6) */}
      <div className="col-span-6 space-y-6">
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-500" />
              <h3 className="font-extrabold text-slate-800 text-md tracking-tight">상세 심사 기준</h3>
            </div>
            <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold text-emerald-600 bg-emerald-50 tracking-wider">
              {project.type === "embedded" ? "EMBEDDED" : "WEB / APP / GAME"}
            </span>
          </div>

          {/* Sliders Container */}
          <div className="space-y-6">
            {/* Slider 1: 개발 (Development) */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">개발 (Development)</span>
                <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                  {gradingDev} <span className="text-[10px] text-slate-400 font-bold">/ {project.type === "embedded" ? 30 : 40}</span>
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={project.type === "embedded" ? 30 : 40}
                value={gradingDev}
                onChange={(e) => setGradingDev(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none"
              />
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium pl-0.5">
                <span>
                  {project.type === "embedded" ? "완성도 (40%) · 시연 영상 (60%)" : "배포 여부 (40%) · 시연 영상 (60%)"}
                </span>
              </div>
            </div>

            {/* Slider 1-2: 기능 (Functionality) - Embedded only */}
            {project.type === "embedded" && (
              <div className="space-y-2.5 animate-in fade-in duration-300">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">기능 (Functionality)</span>
                  <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                    {gradingFunc} <span className="text-[10px] text-slate-400 font-bold">/ 10</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={gradingFunc}
                  onChange={(e) => setGradingFunc(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none"
                />
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium pl-0.5">
                  <span>메모리 효율 (100%)</span>
                </div>
              </div>
            )}

            {/* Slider 2: 아이디어 (Ideation) */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">아이디어 (Idea)</span>
                <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                  {gradingIdea} <span className="text-[10px] text-slate-400 font-bold">/ 40</span>
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={gradingIdea}
                onChange={(e) => setGradingIdea(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none"
              />
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium pl-0.5">
                <span>
                  {project.type === "embedded"
                    ? "주제의 혁신성 (25%) · 창의성 (25%) · 효과성 (25%) · 발전성 (25%)"
                    : "주제의 혁신성 (25%) · 창의성 (25%) · 효과성 (20%) · 발전성 (20%) · 상업성 (10%)"}
                </span>
              </div>
            </div>

            {/* Slider 3: 문서 (Documentation) */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">문서 (Documentation)</span>
                <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                  {gradingDoc} <span className="text-[10px] text-slate-400 font-bold">/ 10</span>
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={gradingDoc}
                onChange={(e) => setGradingDoc(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none"
              />
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium pl-0.5">
                <span>가독성 (40%) · 기능 명세서 (60%)</span>
              </div>
            </div>

            {/* Slider 4: 발표 (Presentation) */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">발표 (Presentation)</span>
                <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                  {gradingPres} <span className="text-[10px] text-slate-400 font-bold">/ 10</span>
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={gradingPres}
                onChange={(e) => setGradingPres(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none"
              />
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium pl-0.5">
                <span>발표 유창성 (50%) · 시간 준수 (50%)</span>
              </div>
            </div>
          </div>

          {/* Submission Panel */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex flex-col items-start leading-none text-left">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">현재 총점</span>
              <span className="text-3xl font-extrabold text-[#00A896] tracking-tight mt-1">
                {currentSum} <span className="text-sm font-bold text-slate-400">/ 100</span>
              </span>
            </div>

            <button
              type="submit"
              className="py-3 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 transition-all text-sm flex items-center gap-2"
            >
              <span>점수 제출하기</span>
              <Send className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
