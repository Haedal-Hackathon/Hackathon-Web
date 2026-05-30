export interface Project {
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
