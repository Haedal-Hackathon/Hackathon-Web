import { Project } from "../types";

export const INITIAL_PROJECTS: Project[] = [
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
    pitchSummary: "Stitch는 생성형 AI를 활용하여 사용자가 낡은 옷의 수선 부위를 촬영하면 최적의 수선 디자인과 패치워크 스타일을 제안하고, 근처 전문 수선사를 연결해주는 모바일 퍼스트 솔루션이다.",
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

export function getProjectTotal(p: Project): number {
  return p.score.dev + (p.score.func || 0) + p.score.idea + p.score.doc + p.score.pres;
}

export function calculateMetrics(projects: Project[]) {
  const completedProjectsCount = projects.filter(p => p.status === "완료").length;
  const progressPercent = projects.length > 0
    ? Math.round((completedProjectsCount / projects.length) * 100)
    : 0;

  const completed = projects.filter(p => p.status === "완료");
  const averageScore = completed.length > 0
    ? (completed.reduce((sum, p) => sum + getProjectTotal(p), 0) / completed.length).toFixed(1)
    : "0.0";

  return {
    completedProjectsCount,
    progressPercent,
    averageScore
  };
}

export function rankProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (a.status === "완료" && b.status !== "완료") return -1;
    if (a.status !== "완료" && b.status === "완료") return 1;
    return getProjectTotal(b) - getProjectTotal(a);
  });
}
