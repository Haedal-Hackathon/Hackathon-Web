-- 🦄 2026학년도 상반기 해달 해커톤 심사 데이터베이스 스키마 및 초기 데이터 시드

-- 1. 팀 정보 테이블 (teams) 생성
CREATE TABLE IF NOT EXISTS teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_number TEXT NOT NULL,
  team_name TEXT NOT NULL,
  project_name TEXT NOT NULL,
  description TEXT,
  keywords TEXT[] DEFAULT '{}',
  members TEXT[] DEFAULT '{}',
  category TEXT DEFAULT 'web_app_game', -- 'web_app_game' or 'embedded'
  status TEXT DEFAULT '대기', -- '대기', '진행 중', '완료'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. 심사위원 평가 데이터 테이블 (evaluations) 생성
CREATE TABLE IF NOT EXISTS evaluations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  judge_name TEXT NOT NULL,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  score_dev INTEGER DEFAULT 0,
  score_func INTEGER DEFAULT 0, -- 임베디드 전용 (메모리 효율)
  score_idea INTEGER DEFAULT 0,
  score_doc INTEGER DEFAULT 0,
  score_pres INTEGER DEFAULT 0,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_judge_team UNIQUE (judge_name, team_id)
);

-- RLS (Row Level Security) 설정 - 해커톤 특성상 심사위원들이 실시간 조회/등록하므로 퍼블릭 접근 허용
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to teams" ON teams FOR SELECT USING (true);
CREATE POLICY "Allow public write access to teams" ON teams FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to teams" ON teams FOR UPDATE USING (true);

CREATE POLICY "Allow public read access to evaluations" ON evaluations FOR SELECT USING (true);
CREATE POLICY "Allow public write access to evaluations" ON evaluations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to evaluations" ON evaluations FOR UPDATE USING (true);
