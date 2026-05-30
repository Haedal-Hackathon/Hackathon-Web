"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { LoginView } from "@/components/features/LoginView";
import { DashboardView } from "@/components/features/DashboardView";
import { ProjectListView } from "@/components/features/ProjectListView";
import { CriteriaView } from "@/components/features/CriteriaView";
import { GradingView } from "@/components/features/GradingView";
import { LeaderboardView } from "@/components/features/LeaderboardView";
import { Schedule } from "@/components/features/Schedule";
import { QuickScore } from "@/components/features/QuickScore";
import { Toast } from "@/components/ui/Toast";
import { FinalSubmitModal } from "@/components/ui/FinalSubmitModal";
import { Project } from "@/types";
import {
  INITIAL_PROJECTS,
  calculateMetrics,
  rankProjects,
} from "@/services/projectService";

export default function Home() {
  const [judgeName, setJudgeName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"dashboard" | "projects" | "criteria" | "grading" | "leaderboard">("dashboard");
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("4"); // Default to "Stitch"
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
    const proj = projects.find((p) => p.id === selectedProjectId);
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
    const updated = projects.map((p) => {
      if (p.id === selectedProjectId) {
        return {
          ...p,
          status: "완료" as const,
          score: {
            dev: gradingDev,
            func: p.type === "embedded" ? gradingFunc : undefined,
            idea: gradingIdea,
            doc: gradingDoc,
            pres: gradingPres,
          },
          comment: gradingComment,
        };
      }
      return p;
    });
    setProjects(updated);
    localStorage.setItem("haedal_projects", JSON.stringify(updated));
    showToast("리더보드가 갱신되었습니다. 2초 전 최신 점수가 반영되었습니다.");
    setActiveTab("projects");
  };

  // Quick Score Submit
  const handleQuickScoreSubmit = () => {
    const updated = projects.map((p) => {
      if (p.id === "6") {
        return {
          ...p,
          status: "완료" as const,
          score: {
            ...p.score,
            dev: quickScoreFeas * 3, // map 0-10 to max 30
            idea: quickScoreDev * 4, // map 0-10 to max 40
          },
        };
      }
      return p;
    });
    setProjects(updated);
    localStorage.setItem("haedal_projects", JSON.stringify(updated));
    showToast("퀵 스코어가 성공적으로 임시 저장되었습니다.");
  };

  // Calculate Metrics
  const { completedProjectsCount, progressPercent, averageScore } =
    calculateMetrics(projects);

  // Filter projects by query
  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate sorted list for leaderboard
  const rankedProjectsList = rankProjects(projects);

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

  // Render Login Screen if no judgeName
  if (!judgeName) {
    return <LoginView onLogin={handleLogin} />;
  }

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex relative text-slate-800 font-sans">
      
      {/* Toast Message */}
      {toastMessage && <Toast message={toastMessage} />}

      {/* 1. SIDEBAR */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onFinalSubmitClick={() => setIsFinalSubmitModalOpen(true)}
        onSupportClick={() => showToast("해달 동아리 학술회에 개발 지원이 요청되었습니다.")}
        onLogout={handleLogout}
      />

      {/* 2. MAIN CONTAINER */}
      <div className="flex-1 flex flex-col overflow-hidden max-h-screen">
        
        {/* TOP NAVBAR */}
        <Header
          activeTab={activeTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          judgeName={judgeName}
          onNotificationClick={() => showToast("최신 해커톤 소식이 반영되었습니다.")}
        />

        {/* 3. SCROLLABLE TAB WORKSPACE */}
        <main className="flex-1 overflow-y-auto p-8 flex gap-8">
          
          {/* TAB AREA LEFT (Varying contents) */}
          <div className="flex-1 space-y-8">
            
            {/* A. DASHBOARD VIEW */}
            {activeTab === "dashboard" && (
              <DashboardView
                progressPercent={progressPercent}
                completedProjectsCount={completedProjectsCount}
                totalProjectsCount={projects.length}
                averageScore={averageScore}
                projects={filteredProjects}
                onSelectProject={(id) => {
                  setSelectedProjectId(id);
                  setActiveTab("grading");
                }}
                onRequestNewProject={() =>
                  showToast("해당 기능을 사용하기 위해 동아리 임원단 채널로 새 세션이 요청되었습니다.")
                }
                getPastelBg={getPastelBg}
                getPastelTagColor={getPastelTagColor}
                getStatusColor={getStatusColor}
              />
            )}

            {/* B. PROJECT LIST VIEW */}
            {activeTab === "projects" && (
              <ProjectListView
                projects={filteredProjects}
                onSelectProject={(id) => {
                  setSelectedProjectId(id);
                  setActiveTab("grading");
                }}
                getPastelBg={getPastelBg}
                getPastelTagColor={getPastelTagColor}
                getStatusColor={getStatusColor}
              />
            )}

            {/* C. EVALUATION CRITERIA VIEW */}
            {activeTab === "criteria" && <CriteriaView />}

            {/* D. PROJECT GRADING VIEW */}
            {activeTab === "grading" && selectedProject && (
              <GradingView
                project={selectedProject}
                onBackToList={() => setActiveTab("projects")}
                gradingDev={gradingDev}
                setGradingDev={setGradingDev}
                gradingFunc={gradingFunc}
                setGradingFunc={setGradingFunc}
                gradingIdea={gradingIdea}
                setGradingIdea={setGradingIdea}
                gradingDoc={gradingDoc}
                setGradingDoc={setGradingDoc}
                gradingPres={gradingPres}
                setGradingPres={setGradingPres}
                gradingComment={gradingComment}
                setGradingComment={setGradingComment}
                onSubmit={handleScoreSubmit}
                onVideoPlay={() => showToast(`${selectedProject.name} 팀의 데모 시연 영상 재생을 요청했습니다.`)}
              />
            )}

            {/* E. LEADERBOARD VIEW */}
            {activeTab === "leaderboard" && (
              <LeaderboardView
                progressPercent={progressPercent}
                averageScore={averageScore}
                rankedProjects={rankedProjectsList}
                getStatusColor={getStatusColor}
                onMoreClick={() => showToast("실시간 점수 동기화가 완료되었습니다.")}
              />
            )}
          </div>

          {/* TAB AREA RIGHT (Persistent panels) */}
          <aside className="w-80 space-y-6 shrink-0 text-left">
            <Schedule />

            <QuickScore
              quickScoreDev={quickScoreDev}
              setQuickScoreDev={setQuickScoreDev}
              quickScoreFeas={quickScoreFeas}
              setQuickScoreFeas={setQuickScoreFeas}
              onSubmit={handleQuickScoreSubmit}
            />
          </aside>
        </main>
      </div>

      {/* 3. FINAL SUBMISSION MODAL */}
      <FinalSubmitModal
        isOpen={isFinalSubmitModalOpen}
        onClose={() => setIsFinalSubmitModalOpen(false)}
        onSubmit={() => {
          setIsFinalSubmitModalOpen(false);
          showToast("최종 심사 평가서 전송이 성공적으로 완료되었습니다.");
        }}
      />
    </div>
  );
}
