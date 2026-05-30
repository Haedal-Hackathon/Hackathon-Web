import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Manually parse .env.local file to read Supabase environment variables in Node.js ESM environment
function loadEnv() {
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      content.split("\n").forEach(line => {
        const match = line.trim().match(/^([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let value = match[2] || "";
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
          }
          if (value.startsWith("'") && value.endsWith("'")) {
            value = value.slice(1, -1);
          }
          process.env[key] = value;
        }
      });
      console.log("⚙️ Loaded .env.local variables successfully.");
    } else {
      console.error("❌ .env.local file not found. Please create one with Supabase credentials first.");
    }
  } catch (e) {
    console.warn("⚠️ Warning: Failed to parse .env.local manually:", e.message);
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const TEAM_SEED_DATA = [
  {
    team_number: "0조",
    team_name: "팀 옥수수",
    project_name: "Popcorn",
    description: "[개발 주제 작성]",
    keywords: ["과잉", "꿈", "경계", "연결", "불편"],
    members: ["최연우", "허진수", "이채민", "하수연", "김태희", "신지원", "홍한희", "곽상원", "김수완", "김성현"],
    category: "web_app_game",
    status: "대기"
  },
  {
    team_number: "1조",
    team_name: "폼폼푸린",
    project_name: "폼폼푸린",
    description: "공동구매 플랫폼",
    keywords: ["연결", "불편"],
    members: ["김승은", "서다은", "이서영"],
    category: "web_app_game",
    status: "대기"
  },
  {
    team_number: "2조",
    team_name: "아자자",
    project_name: "아자자 (머리 비우기 앱)",
    description: "머리를 비우고 싶을 때 찾는 멍때리기 앱",
    keywords: ["연결", "과잉", "불편"],
    members: ["김여진", "박태준", "이예원", "홍은지"],
    category: "web_app_game",
    status: "대기"
  },
  {
    team_number: "3조",
    team_name: "라스트댄스",
    project_name: "Free Tier Sleep",
    description: "무료 수면 요금제",
    keywords: ["과잉", "꿈", "경계", "연결", "불편"],
    members: ["김수연", "김태희", "박민준", "이유진"],
    category: "web_app_game",
    status: "대기"
  },
  {
    team_number: "4조",
    team_name: "모수",
    project_name: "넛지",
    description: "취향과 도전을 아우르는 경험을 추천받고, 사진 인증으로 나만의 공간을 꾸미는 아카이빙 앱",
    keywords: ["과잉", "꿈", "경계", "연결", "불편"],
    members: ["노경민", "이태헌", "최유빈", "황동규"],
    category: "web_app_game",
    status: "대기"
  },
  {
    team_number: "5조",
    team_name: "PKHB",
    project_name: "Dream Achiever",
    description: "목표와 감정을 기록하고, 성장 과정을 미래의 나에게 전하는 감성 목표 관리 앱",
    keywords: ["불편", "연결", "경계", "꿈"],
    members: ["권종성", "박정원", "배서진", "홍지유"],
    category: "web_app_game",
    status: "대기"
  },
  {
    team_number: "6조",
    team_name: "파티파티",
    project_name: "자취파티",
    description: "광고보다 현실적인 자취방 정보를 공유하는 대학생 후기 플랫폼",
    keywords: ["연결", "불편"],
    members: ["김선명", "도아연", "양세훈", "정한희"],
    category: "web_app_game",
    status: "대기"
  },
  {
    team_number: "7조",
    team_name: "해달야호",
    project_name: "기래프",
    description: "나만의 기분 그래프",
    keywords: ["연결", "경계", "과잉"],
    members: ["오윤성", "이태영", "전성호", "한동재"],
    category: "web_app_game",
    status: "대기"
  },
  {
    team_number: "8조",
    team_name: "혜성",
    project_name: "혜성 (우주 파편 관측 앱)",
    description: "혜성 및 우주 파편 관측 프로젝트",
    keywords: ["꿈", "경계"],
    members: ["송윤정", "이해창", "임현우", "최성호"],
    category: "web_app_game",
    status: "대기"
  },
  {
    team_number: "9조",
    team_name: "OVERFLOW",
    project_name: "오버플로우",
    description: "빛 세기에 따라 조절 가능한 스마트 커튼 시스템",
    keywords: ["경계", "불편"],
    members: ["이선희", "한상훈", "김재엽"],
    category: "embedded",
    status: "대기"
  },
  {
    team_number: "10조",
    team_name: "본석이와 친구들",
    project_name: "본석이와 친구들 - LeanLink",
    description: "실시간 대소변 감지 스마트 기저귀 시스템",
    keywords: ["불편", "연결", "꿈", "과잉", "경계"],
    members: ["강민지", "구본석", "이승현", "황서현"],
    category: "embedded",
    status: "대기"
  },
  {
    team_number: "11조",
    team_name: "언발란스",
    project_name: "Interesthub",
    description: "지루한 학업을 흥미로운 모험으로 바꾸는 관심사 솔루션",
    keywords: ["과잉", "꿈", "경계", "연결", "불편"],
    members: ["김동연", "배효진", "서정민"],
    category: "web_app_game",
    status: "대기"
  },
  {
    team_number: "12조",
    team_name: "굿잡",
    project_name: "All in One",
    description: "진료 탐색과 성장을 위한 맞춤형 통합 플랫폼",
    keywords: ["꿈", "연결", "경계", "불편", "과잉"],
    members: ["김동현(1학년)", "우효정", "유서진", "최단비"],
    category: "web_app_game",
    status: "대기"
  },
  {
    team_number: "13조",
    team_name: "최고",
    project_name: "꿈조각",
    description: "꿈 로드맵(꿈 조각)",
    keywords: ["꿈", "연결", "불편"],
    members: ["김동현(2학년)", "김보민", "은종범", "조서영"],
    category: "web_app_game",
    status: "대기"
  }
];

async function runSeeder() {
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("your-project") || supabaseAnonKey.includes("your-anon-key")) {
    console.error("❌ Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are not correctly set in .env.local.");
    process.exit(1);
  }

  console.log("🔌 Connecting to Supabase at:", supabaseUrl);
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    console.log("🧹 Clearing existing data from 'teams' table...");
    const { error: deleteError } = await supabase
      .from("teams")
      .delete()
      .neq("team_number", "TEMPLATE_DEL_GUARD");

    if (deleteError) {
      console.warn("⚠️ Warning: Delete failed (this is fine if table is empty):", deleteError.message);
    }

    console.log("🚀 Inserting 14 teams into Supabase...");
    const { data, error } = await supabase
      .from("teams")
      .insert(TEAM_SEED_DATA)
      .select();

    if (error) {
      throw error;
    }

    console.log(`\n✅ Success! Loaded ${data.length} teams into your 'teams' table successfully.`);
    console.log("-----------------------------------------------------------------");
    data.forEach(t => {
      console.log(`- [${t.team_number}] ${t.team_name} (Project: ${t.project_name})`);
    });
    console.log("-----------------------------------------------------------------");
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    console.error("\n💡 Troubleshooting Checklist:");
    console.error("1. Did you run the SQL script in your Supabase SQL Editor to create the 'teams' table first?");
    console.error("2. Are your Supabase API credentials in '.env.local' correct?");
    process.exit(1);
  }
}

runSeeder();
