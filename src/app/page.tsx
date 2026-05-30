"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Award,
  PenTool,
  Trophy,
  LogOut,
  HelpCircle,
  Send,
  Play,
  Search,
  Bell,
  CheckCircle2,
  Clock,
  ChevronRight,
  Plus,
  Activity,
  RefreshCw,
  Sparkles,
  User,
  ExternalLink,
  MessageSquare
} from "lucide-react";

// Define TypeScript structures for our app
interface Project {
  id: string;
  name: string;
  category: string;
  type: "web_app_game" | "embedded";
  description: string;
  pitchSummary: string;
  techStack: string[];
  status: "완료" | "진행 중" | "대기";
  timeAssigned?: string;
  score: {
    dev: number;  // max 40 (web) or 30 (embedded)
    func?: number; // max 10 (embedded only)
    idea: number; // max 40 (web) or 40 (embedded)
    doc: number;  // max 10
    pres: number; // max 10
  };
  comment: string;
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Quantum Ledger",
    category: "FINTECH",
    type: "web_app_game",
    description: "블록체인 기술과 AI를 활용한 실시간 리스크 관리 플랫폼.",
    pitchSummary: "Quantum Ledger는 탈중앙화 금융 및 핀테크 서비스를 위해 온체인 트랜잭션을 실시간 분석하고 AI를 활용해 이상 거래 및 재정 위험 요소를 탐지하는 고성능 리스크 관리 대시보드입니다.",
    techStack: ["Next.js", "Python", "Supabase", "Solidity"],
    status: "완료",
    timeAssigned: "배정됨 · 5시간 전",
    score: { dev: 36, idea: 38, doc: 9, pres: 9 },
    comment: "블록체인 실시간 트랜잭션 시각화 수준이 매우 높고 리스크 평가 모델의 창의성이 우수함."
  },
  {
    id: "2",
    name: "EcoFlow Grid",
    category: "IOT · SMART CITY",
    type: "embedded",
    description: "도시 에너지 소비를 최적화하는 스마트 그리드 모니터링 시스템.",
    pitchSummary: "EcoFlow Grid는 아두이노 및 스마트 센서 모듈로부터 수집된 실시간 전력 데이터를 분석하여 도시 내 전력 분배를 자동화하고 비효율적인 에너지 누수를 모니터링하는 친환경 스마트 에너지 솔루션입니다.",
    techStack: ["React", "Next.js", "Arduino", "Tailwind CSS"],
    status: "진행 중",
    timeAssigned: "배정됨 · 1시간 전",
    score: { dev: 0, func: 0, idea: 0, doc: 0, pres: 0 },
    comment: ""
  },
  {
    id: "3",
    name: "Shield AI",
    category: "CYBERSECURITY",
    type: "web_app_game",
    description: "실시간 위협 탐지 및 자동 대응 엔터프라이즈 보안 솔루션.",
    pitchSummary: "Shield AI는 대규모 엔터프라이즈 네트워크 트래픽을 기계 학습 기반 모델로 정밀 모니터링하여 이상 징후 및 외부 침입을 자동 차단하고 취약점을 즉각 예방하는 보안 자동화 플랫폼입니다.",
    techStack: ["Next.js", "FastAPI", "Tensorflow", "Docker"],
    status: "대기",
    timeAssigned: "배정됨 · 2시간 전",
    score: { dev: 0, idea: 0, doc: 0, pres: 0 },
    comment: ""
  },
  {
    id: "4",
    name: "Stitch",
    category: "AI · FASHION",
    type: "web_app_game",
    description: "AI 기반 스마트 의류 수선 및 커스터마이징 플랫폼.",
    pitchSummary: "Stitch는 생성형 AI를 활용하여 사용자가 낡은 옷의 수선 부위를 촬영하면 최적의 수선 디자인과 패치워크 스타일을 제안하고, 근처 전문 수선사를 연결해주는 모바일 퍼스트 솔루션입니다.",
    techStack: ["Next.js", "Python", "OpenAI GPT-4V", "Tailwind CSS"],
    status: "진행 중",
    timeAssigned: "배정됨 · 40분 전",
    score: { dev: 0, idea: 0, doc: 0, pres: 0 },
    comment: ""
  },
  {
    id: "5",
    name: "Artemis VR",
    category: "EDU · VR",
    type: "web_app_game",
    description: "몰입형 3D 공간 교육 플랫폼.",
    pitchSummary: "Artemis VR은 물리적인 교실 공간의 제약을 뛰어넘어 역사, 우주 과학 등을 입체적인 3D 가상 공간에서 직접 상호작용하며 학습할 수 있는 메타버스 가상 교육 솔루션입니다.",
    techStack: ["Unity", "React", "Next.js", "Three.js"],
    status: "대기",
    timeAssigned: "배정됨 · 3시간 전",
    score: { dev: 0, idea: 0, doc: 0, pres: 0 },
    comment: ""
  },
  {
    id: "6",
    name: "BioSense",
    category: "HEALTH",
    type: "embedded",
    description: "웨어러블 바이오 센서 기반 실시간 건강 데이터 분석 솔루션.",
    pitchSummary: "BioSense Wearable은 사용자의 바이오 센서 데이터를 실시간으로 모니터링하여 만성 질환 징후를 예측하고 맞춤형 식단 및 운동 제안을 생성하는 AI 비서 연동 헬스케어 제품입니다.",
    techStack: ["React Native", "Next.js", "Arduino", "Supabase"],
    status: "완료",
    timeAssigned: "배정됨 · 4시간 전",
    score: { dev: 26, func: 8, idea: 36, doc: 9, pres: 9 }, // dev max 30, func max 10
    comment: "실제 하드웨어 센서 프로토타입 완성도가 우수하며 모바일 앱과의 실시간 블루투스 연동이 잘 구현됨."
  }
];

export default function Home() {
  const [judgeName, setJudgeName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"dashboard" | "projects" | "criteria" | "grading" | "leaderboard">("dashboard");
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("4"); // Default to "Stitch" as shown in PNG
  const [isFinalSubmitModalOpen, setIsFinalSubmitModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quick Score state for Sidebar (BioSense is active team in Dashboard image)
  const [quickScoreDev, setQuickScoreDev] = useState(8);
  const [quickScoreFeas, setQuickScoreFeas] = useState(7);

  // Current grading state values
  const [gradingDev, setGradingDev] = useState(0);
  const [gradingFunc, setGradingFunc] = useState(0);
  const [gradingIdea, setGradingIdea] = useState(0);
  const [gradingDoc, setGradingDoc] = useState(0);
  const [gradingPres, setGradingPres] = useState(0);
  const [gradingComment, setGradingComment] = useState("");

  // Load persistence from localStorage
  useEffect(() => {
    const savedJudge = localStorage.getItem("haedal_judge_name");
    const savedProjects = localStorage.getItem("haedal_projects");
    if (savedJudge) setJudgeName(savedJudge);
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
  }, []);

  // Sync grading state whenever selected project changes
  useEffect(() => {
    const proj = projects.find(p => p.id === selectedProjectId);
    if (proj) {
      setGradingDev(proj.score.dev);
      setGradingFunc(proj.score.func || 0);
      setGradingIdea(proj.score.idea);
      setGradingDoc(proj.score.doc);
      setGradingPres(proj.score.pres);
      setGradingComment(proj.comment);
    }
  }, [selectedProjectId, projects]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLogin = (name: string) => {
    if (!name.trim()) return;
    const cleanName = name.trim();
    setJudgeName(cleanName);
    localStorage.setItem("haedal_judge_name", cleanName);
    showToast(`${cleanName} 심사위원님, 환영합니다!`);
  };

  const handleLogout = () => {
    localStorage.removeItem("haedal_judge_name");
    setJudgeName(null);
    setActiveTab("dashboard");
  };

  // Grading Submit Action
  const handleScoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = projects.map(p => {
      if (p.id === selectedProjectId) {
        return {
          ...p,
          status: "완료" as const,
          score: {
            dev: gradingDev,
            func: p.type === "embedded" ? gradingFunc : undefined,
            idea: gradingIdea,
            doc: gradingDoc,
            pres: gradingPres
          },
          comment: gradingComment
        };
      }
      return p;
    });
    setProjects(updated);
    localStorage.setItem("haedal_projects", JSON.stringify(updated));
    showToast("리더보드가 갱신되었습니다. 2초 전 최신 점수가 반영되었습니다.");
    // Return to project list
    setActiveTab("projects");
  };

  // Quick Score Submit
  const handleQuickScoreSubmit = () => {
    // BioSense ID is "6"
    const updated = projects.map(p => {
      if (p.id === "6") {
        // Quick score updates Dev & Idea
        // Note: For quick score, Innovation corresponds to Idea (max 40) and Feasibility to Dev (max 30)
        // Values from slider (1-10) scaled appropriately
        return {
          ...p,
          status: "완료" as const,
          score: {
            ...p.score,
            dev: quickScoreFeas * 3, // map 0-10 to max 30
            idea: quickScoreDev * 4  // map 0-10 to max 40
          }
        };
      }
      return p;
    });
    setProjects(updated);
    localStorage.setItem("haedal_projects", JSON.stringify(updated));
    showToast("퀵 스코어가 성공적으로 임시 저장되었습니다.");
  };

  // Calculate Metrics
  const completedProjectsCount = projects.filter(p => p.status === "완료").length;
  const progressPercent = Math.round((completedProjectsCount / projects.length) * 100);

  // Dynamic calculations for averages
  const getProjectTotal = (p: Project) => {
    return p.score.dev + (p.score.func || 0) + p.score.idea + p.score.doc + p.score.pres;
  };

  const completedProjects = projects.filter(p => p.status === "완료");
  const averageScore = completedProjects.length > 0
    ? (completedProjects.reduce((sum, p) => sum + getProjectTotal(p), 0) / completedProjects.length).toFixed(1)
    : "0.0";

  // Filter projects by query
  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate sorted list for leaderboard
  const rankedProjects = [...projects].sort((a, b) => {
    // completed first, then sort by score
    if (a.status === "완료" && b.status !== "완료") return -1;
    if (a.status !== "완료" && b.status === "완료") return 1;
    return getProjectTotal(b) - getProjectTotal(a);
  });

  const getPastelBg = (category: string) => {
    switch (category) {
      case "FINTECH": return "bg-rose-50 border-rose-100";
      case "IOT · SMART CITY": return "bg-teal-50 border-teal-100";
      case "CYBERSECURITY": return "bg-amber-50 border-amber-100";
      case "AI · FASHION": return "bg-emerald-50 border-emerald-100";
      case "EDU · VR": return "bg-amber-50 border-amber-100";
      case "HEALTH": return "bg-rose-50 border-rose-100";
      default: return "bg-sky-50 border-sky-100";
    }
  };

  const getPastelTagColor = (category: string) => {
    switch (category) {
      case "FINTECH": return "text-rose-600 bg-rose-100/60";
      case "IOT · SMART CITY": return "text-teal-600 bg-teal-100/60";
      case "CYBERSECURITY": return "text-amber-600 bg-amber-100/60";
      case "AI · FASHION": return "text-emerald-600 bg-emerald-100/60";
      case "EDU · VR": return "text-amber-600 bg-amber-100/60";
      case "HEALTH": return "text-rose-600 bg-rose-100/60";
      default: return "text-sky-600 bg-sky-100/60";
    }
  };

  const getStatusColor = (status: "완료" | "진행 중" | "대기") => {
    switch (status) {
      case "완료": return "bg-emerald-100 text-emerald-700";
      case "진행 중": return "bg-sky-100 text-sky-700";
      case "대기": return "bg-amber-100 text-amber-700";
    }
  };

  // Main Return - Render Login Screen if no judgeName
  if (!judgeName) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">
        {/* Colorful dynamic background lights */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
        
        {/* Main Glassmorphic Login Card */}
        <div className="w-full max-w-md bg-slate-800/60 border border-slate-700/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl flex flex-col items-center relative z-10 transition-all duration-300">
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
              handleLogin(input);
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
  }

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex relative text-slate-800 font-sans">
      
      {/* Dynamic Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/90 border border-slate-800 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-bottom duration-300">
          <div className="bg-emerald-500 p-1.5 rounded-lg flex items-center justify-center">
            <RefreshCw className="w-4 h-4 text-white animate-spin" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm text-white">리더보드가 갱신되었습니다</span>
            <span className="text-slate-400 text-xs">2초 전 최신 점수가 반영되었습니다.</span>
          </div>
        </div>
      )}

      {/* 1. SIDEBAR */}
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
              onClick={() => {
                setActiveTab("grading");
              }}
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
            onClick={() => setIsFinalSubmitModalOpen(true)}
            className="w-full py-3.5 bg-[#10B981] hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all text-sm flex items-center justify-center gap-2"
          >
            <span>최종 점수 제출</span>
          </button>

          <div className="space-y-1">
            <button
              onClick={() => showToast("해달 동아리 학술회에 개발 지원이 요청되었습니다.")}
              className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-all"
            >
              <HelpCircle className="w-4 h-4" />
              <span>지원</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>로그아웃</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTAINER */}
      <div className="flex-1 flex flex-col overflow-hidden max-h-screen">
        
        {/* TOP NAVBAR */}
        <header className="h-20 bg-white border-b border-[#E2E8F0] shrink-0 px-8 flex items-center justify-between z-10">
          {/* Header Title (Dynamic depending on tab) */}
          <div className="text-left">
            {activeTab === "dashboard" && (
              <>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
                  심사 <span className="text-[#00A896]">대시보드</span>
                </h1>
                <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-wider">
                  2026 상반기 해달 해커톤 · 5/30(토) · IT1호관 203호
                </p>
              </>
            )}
            {activeTab === "projects" && (
              <>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
                  프로젝트 <span className="text-[#00A896]">목록</span>
                </h1>
                <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-wider">
                  배정된 전체 프로젝트를 확인합니다.
                </p>
              </>
            )}
            {activeTab === "criteria" && (
              <>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
                  심사 <span className="text-[#00A896]">기준</span>
                </h1>
                <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-wider">
                  분야별 반영 비율과 세부 평가 항목.
                </p>
              </>
            )}
            {activeTab === "grading" && (
              <>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
                  프로젝트 <span className="text-[#00A896]">채점</span>
                </h1>
                <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-wider">
                  항목별 점수를 입력하고 제출합니다.
                </p>
              </>
            )}
            {activeTab === "leaderboard" && (
              <>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
                  리얼타임 <span className="text-[#00A896]">리더보드</span>
                </h1>
                <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-wider">
                  실시간 종합 순위 · 자동 갱신.
                </p>
              </>
            )}
          </div>

          {/* Right Header Panel */}
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

            {/* Notifications */}
            <button
              onClick={() => showToast("최신 해커톤 소식이 반영되었습니다.")}
              className="relative p-2.5 hover:bg-slate-50 border border-[#E2E8F0] rounded-xl text-slate-500 hover:text-slate-800 transition-all"
            >
              <Bell className="w-4.5 h-4.5" />
              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full absolute top-2 right-2" />
            </button>

            {/* Profile Avatar Card */}
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

        {/* 3. SCROLLABLE TAB WORKSPACE */}
        <main className="flex-1 overflow-y-auto p-8 flex gap-8">
          
          {/* TAB AREA LEFT (Varying contents) */}
          <div className="flex-1 space-y-8">
            
            {/* A. DASHBOARD VIEW */}
            {activeTab === "dashboard" && (
              <>
                {/* Stats row */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Progress Card */}
                  <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 flex flex-col justify-between text-left shadow-sm shadow-[#F1F5F9]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">심사 진행 현황</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-4xl font-extrabold text-slate-800 tracking-tight">{progressPercent}%</span>
                      {/* Custom styled progress bar */}
                      <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                      </div>
                      <p className="text-slate-400 font-semibold text-xs mt-3.5">
                        전체 {projects.length}개 프로젝트 중 {completedProjectsCount}개 완료 · 진행 예정 {projects.length - completedProjectsCount}
                      </p>
                    </div>
                  </div>

                  {/* Avg Score Card */}
                  <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 flex flex-col justify-between text-left shadow-sm shadow-[#F1F5F9]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-cyan-50 text-cyan-600 p-2.5 rounded-xl flex items-center justify-center">
                          <Activity className="w-5 h-5" />
                        </div>
                        <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">평균 부여 점수</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-4xl font-extrabold text-slate-800 tracking-tight">{(parseFloat(averageScore) / 10).toFixed(1)} <span className="text-lg text-slate-400 font-bold">/ 10</span></span>
                      {/* Custom styled score progress bar */}
                      <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500" style={{ width: `${parseFloat(averageScore)}%` }} />
                      </div>
                      <p className="text-slate-400 font-semibold text-xs mt-3.5">
                        남은 심사 대상 · {projects.length - completedProjectsCount} Projects
                      </p>
                    </div>
                  </div>
                </div>

                {/* Assigned Projects Block */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-md font-extrabold text-slate-700 tracking-tight">배정 프로젝트</h2>
                    <button onClick={() => setActiveTab("projects")} className="text-emerald-500 hover:text-emerald-600 font-bold text-xs">
                      전체 보기
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {/* Render filtered projects in Dashboard */}
                    {filteredProjects.slice(0, 3).map((p) => (
                      <div key={p.id} className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col text-left justify-between">
                        {/* Header color matching design */}
                        <div className={`h-24 p-5 flex flex-col justify-between ${getPastelBg(p.category)} border-b border-inherit`}>
                          <div className="flex justify-between items-center">
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold tracking-wider ${getPastelTagColor(p.category)}`}>
                              {p.category}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-extrabold tracking-tight ${getStatusColor(p.status)}`}>
                              {p.status}
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <h3 className="font-extrabold text-slate-800 text-base tracking-tight mb-1">{p.name}</h3>
                            <p className="text-slate-400 font-medium text-xs leading-relaxed">{p.description}</p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            {/* Virtual Team Member Icons */}
                            <div className="flex -space-x-1.5 overflow-hidden">
                              <div className={`w-6 h-6 rounded-full border border-white flex items-center justify-center font-bold text-[9px] text-white ${
                                p.id === "1" ? "bg-rose-400" : p.id === "2" ? "bg-teal-400" : "bg-amber-400"
                              }`}>
                                {p.name.substring(0, 1)}
                              </div>
                              <div className="w-6 h-6 bg-slate-300 rounded-full border border-white flex items-center justify-center font-bold text-[9px] text-white">L</div>
                              <div className="w-6 h-6 bg-slate-200 text-slate-500 rounded-full border border-white flex items-center justify-center font-bold text-[8px]">+2</div>
                            </div>

                            {/* Score or CTA Link */}
                            {p.status === "완료" ? (
                              <span className="text-emerald-500 font-extrabold text-xs flex items-center gap-1">
                                ★ {(getProjectTotal(p) / 10).toFixed(1)}
                              </span>
                            ) : (
                              <button
                                onClick={() => {
                                  setSelectedProjectId(p.id);
                                  setActiveTab("grading");
                                }}
                                className="text-emerald-500 hover:text-emerald-600 font-bold text-xs tracking-tight flex items-center gap-0.5"
                              >
                                <span>상세 보기</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Dotted "+" Card */}
                    <button
                      onClick={() => showToast("해당 기능을 사용하기 위해 동아리 임원단 채널로 새 세션이 요청되었습니다.")}
                      className="bg-transparent border border-dashed border-[#CBD5E1] rounded-3xl p-6 min-h-[220px] flex flex-col items-center justify-center hover:bg-white/40 hover:border-slate-400 transition-all gap-2.5 text-slate-400"
                    >
                      <Plus className="w-8 h-8" />
                      <span className="font-extrabold text-sm tracking-tight text-slate-500">새 프로젝트 배정 요청</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* B. PROJECT LIST VIEW */}
            {activeTab === "projects" && (
              <div className="grid grid-cols-3 gap-6">
                {filteredProjects.map((p) => (
                  <div key={p.id} className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col text-left justify-between min-h-[240px]">
                    {/* Header color matching design */}
                    <div className={`h-24 p-5 flex flex-col justify-between ${getPastelBg(p.category)} border-b border-inherit`}>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold tracking-wider ${getPastelTagColor(p.category)}`}>
                          {p.category}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-extrabold tracking-tight ${getStatusColor(p.status)}`}>
                          {p.status}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-extrabold text-slate-800 text-base tracking-tight mb-1">{p.name}</h3>
                        <p className="text-slate-400 font-medium text-xs leading-relaxed">{p.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        {/* Score or CTA Link */}
                        {p.status === "완료" ? (
                          <div className="flex justify-between items-center w-full">
                            <span className="text-slate-400 font-bold text-[10px]">최종 심사 완료</span>
                            <span className="text-emerald-500 font-extrabold text-sm flex items-center gap-0.5">
                              ★ {(getProjectTotal(p) / 10).toFixed(1)} <span className="text-[10px] text-slate-400">/ 10</span>
                            </span>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedProjectId(p.id);
                              setActiveTab("grading");
                            }}
                            className="text-emerald-500 hover:text-emerald-600 font-bold text-xs tracking-tight flex items-center justify-between w-full"
                          >
                            <span>평가하기</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* C. EVALUATION CRITERIA VIEW */}
            {activeTab === "criteria" && (
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
            )}

            {/* D. PROJECT GRADING VIEW */}
            {activeTab === "grading" && (
              (() => {
                const p = projects.find(p => p.id === selectedProjectId);
                if (!p) {
                  return (
                    <div className="bg-white border border-[#E2E8F0] rounded-3xl p-12 text-center text-slate-400 space-y-4">
                      <FolderKanban className="w-12 h-12 mx-auto" />
                      <p className="font-extrabold text-base">선택된 프로젝트가 없습니다.</p>
                      <p className="text-xs">프로젝트 목록에서 평가할 대상을 먼저 선택해 주세요.</p>
                      <button onClick={() => setActiveTab("projects")} className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all">
                        프로젝트 목록 가기
                      </button>
                    </div>
                  );
                }

                const currentSum = gradingDev + (p.type === "embedded" ? gradingFunc : 0) + gradingIdea + gradingDoc + gradingPres;

                return (
                  <form onSubmit={handleScoreSubmit} className="grid grid-cols-12 gap-8">
                    {/* Left Details Grid (Col-6) */}
                    <div className="col-span-6 space-y-6">
                      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 text-left shadow-sm space-y-6">
                        <button
                          type="button"
                          onClick={() => setActiveTab("projects")}
                          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 font-bold transition-all"
                        >
                          <span>← 목록으로</span>
                        </button>

                        <div>
                          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Team &apos;{p.name}&apos;</h2>
                          <p className="text-slate-500 text-sm font-bold mt-1 tracking-tight">{p.description}</p>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-0.5">피치 요약</span>
                          <blockquote className="bg-slate-50/70 border border-slate-100 rounded-2xl p-4 text-xs font-medium text-slate-600 leading-relaxed">
                            &ldquo;{p.pitchSummary}&rdquo;
                          </blockquote>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-0.5">기술 스택</span>
                          <div className="flex flex-wrap gap-2">
                            {p.techStack.map(tag => (
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
                            onClick={() => showToast(`${p.name} 팀의 데모 시연 영상 재생을 요청했습니다.`)}
                            className="w-14 h-14 bg-white hover:bg-emerald-500 text-emerald-500 hover:text-white rounded-full flex items-center justify-center shadow-lg transform transition-all group-hover:scale-110 z-10"
                          >
                            <Play className="w-6 h-6 fill-current pl-1" />
                          </button>
                        </div>

                        {/* Overall feedback comments */}
                        <div className="space-y-2">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-0.5">종합 의견</span>
                          <div className="relative">
                            <textarea
                              value={gradingComment}
                              onChange={(e) => setGradingComment(e.target.value)}
                              placeholder={`팀 '${p.name}'에 대한 피드백을 입력하세요...`}
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
                      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 text-left shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                          <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-emerald-500" />
                            <h3 className="font-extrabold text-slate-800 text-md tracking-tight">상세 심사 기준</h3>
                          </div>
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold text-emerald-600 bg-emerald-50 tracking-wider">
                            {p.type === "embedded" ? "EMBEDDED" : "WEB / APP / GAME"}
                          </span>
                        </div>

                        {/* Sliders Container */}
                        <div className="space-y-6">
                          {/* Slider 1: 개발 (Development) */}
                          <div className="space-y-2.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-bold text-slate-700">개발 (Development)</span>
                              <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                                {gradingDev} <span className="text-[10px] text-slate-400 font-bold">/ {p.type === "embedded" ? 30 : 40}</span>
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max={p.type === "embedded" ? 30 : 40}
                              value={gradingDev}
                              onChange={(e) => setGradingDev(parseInt(e.target.value))}
                              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none"
                            />
                            <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium pl-0.5">
                              <span>
                                {p.type === "embedded" ? "완성도 (40%) · 시연 영상 (60%)" : "배포 여부 (40%) · 시연 영상 (60%)"}
                              </span>
                            </div>
                          </div>

                          {/* Slider 1-2: 기능 (Functionality) - Embedded only */}
                          {p.type === "embedded" && (
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
                                {p.type === "embedded"
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
              })()
            )}

            {/* E. LEADERBOARD VIEW */}
            {activeTab === "leaderboard" && (
              <div className="space-y-6">
                {/* Dynamic Leaderboard Stats row */}
                <div className="grid grid-cols-3 gap-6">
                  {/* Total Teams */}
                  <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 text-left shadow-sm">
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block mb-2">총 참가 팀</span>
                    <span className="text-3xl font-extrabold text-slate-800 tracking-tight">128 <span className="text-sm font-bold text-slate-400">Teams</span></span>
                    <span className="inline-block mt-3 px-2 py-0.5 bg-emerald-50 text-[9px] font-extrabold text-emerald-600 rounded-md">
                      {progressPercent}% 심사 완료
                    </span>
                  </div>

                  {/* Avg Score */}
                  <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 text-left shadow-sm">
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block mb-2">평균 점수</span>
                    <span className="text-3xl font-extrabold text-[#00A896] tracking-tight">
                      {(parseFloat(averageScore) / 10).toFixed(1)} <span className="text-sm font-bold text-slate-400">/ 10</span>
                    </span>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden">
                      <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${parseFloat(averageScore)}%` }} />
                    </div>
                  </div>

                  {/* Time Remaining */}
                  <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 text-left shadow-sm">
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block mb-2">남은 심사 시간</span>
                    <span className="text-3xl font-extrabold text-rose-500 tracking-tight font-mono">02:45:12</span>
                    <span className="block mt-3 text-[9px] text-slate-400 font-semibold uppercase">
                      최종 스코어 산출 중...
                    </span>
                  </div>
                </div>

                {/* Scoreboard table */}
                <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 text-left shadow-sm">
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

                      // Calculate breakdown bar ratios
                      const devWeight = (p.score.dev / (p.type === "embedded" ? 30 : 40)) * 40;
                      const ideaWeight = (p.score.idea / 40) * 30;
                      const docWeight = ((p.score.doc + p.score.pres) / 20) * 30;

                      return (
                        <div key={p.id} className="flex items-center justify-between p-4 border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50/80 rounded-2xl transition-all">
                          {/* Rank indicator & Profile */}
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

                          {/* Dynamic breakdown progress bar */}
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
                    onClick={() => showToast("실시간 점수 동기화가 완료되었습니다.")}
                    className="w-full mt-6 py-3 bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>더 보기 ∨</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* TAB AREA RIGHT (Persistent components matching dashboard screenshots) */}
          <aside className="w-80 space-y-6 shrink-0 text-left">
            
            {/* 1. Schedule Card (오늘의 발표 일정) */}
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

            {/* 2. Quick Score Panel (퀵 스코어 입력) */}
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
                  onClick={handleQuickScoreSubmit}
                  className="w-full py-3 bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-slate-50 rounded-2xl text-slate-600 font-extrabold text-xs transition-all tracking-tight"
                >
                  임시 저장
                </button>
              </div>
            </div>
          </aside>
        </main>
      </div>

      {/* 3. FINAL SUBMISSION MODAL */}
      {isFinalSubmitModalOpen && (
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
                onClick={() => setIsFinalSubmitModalOpen(false)}
                className="py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold rounded-2xl transition-all text-xs"
              >
                취소
              </button>
              <button
                onClick={() => {
                  setIsFinalSubmitModalOpen(false);
                  showToast("최종 심사 평가서 전송이 성공적으로 완료되었습니다.");
                }}
                className="py-3.5 bg-[#10B981] hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-md transition-all text-xs"
              >
                제출 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
