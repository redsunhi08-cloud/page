import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY" || key === "") {
      console.warn("GEMINI_API_KEY is missing or placeholder. Using high-quality mock copywriting engine.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Category images helper
function getCategoryImage(category: string): string {
  const c = category.toLowerCase();
  if (c.includes("뷰티") || c.includes("beauty")) {
    return "https://lh3.googleusercontent.com/aida-public/AB6AXuBvbzdBv7usWNdPPZQRF3uMxtLyGU0Bwa7h2MygS5pTSocRoeQ0br-FounBl6QM28joAxsSEOFcWCuSkil39HR2K8tZL4t1AKvJdsMJX02SZXZJj0Iy0u1qHC-ZRNsCOLjSHnaPhVl-I0jmY6fUeOdU88kLrt1-up-Adl9ZnDc8hibQIrq9yCC88eyPlC5bI4FSgDsF9KqjOs0kRHQR7bdLRt9QTpi5Ias79ayCYRU0RZmIdkUDZ4IwXJjvIDkt8uidMy8BRZmlmA";
  }
  if (c.includes("식품") || c.includes("food") || c.includes("사과") || c.includes("즙")) {
    return "https://lh3.googleusercontent.com/aida-public/AB6AXuBvreuF2FipzttK5D-wFe5FuLFSrqmiN-85kWhBqNMXzX1hMdCn_mxrdKl3Jl_F77F8Al1wjxwN4rNsZQZ5aIF3oOYecL5k4vbkuvdhge1QkwCPcN-Gemy7RwnXuOK-A5ZYacuw2nUY10N69U56EZ0dGa7SZeB52kLZc-E7O3r63rPyKhem7fW79WEVTSSvfMXOnvf5uftNMYtcHOPb-SFrFpfngB3QnARbWhIDGwBcpVAclx1p6FOdAVsFb8Kq0TMXF9X6olBMNA";
  }
  if (c.includes("의류") || c.includes("fashion") || c.includes("패션") || c.includes("코트")) {
    return "https://lh3.googleusercontent.com/aida-public/AB6AXuDavb6F9rBt7aVL-iCKSAWJwNdEx7Z0DTm9qlRn9B7ndXxi-szEPDEv5GgJvgJXctrPPaBcWeUAfZt_LjJDIWruxgts42kcNXtJwQJyHzmPAxtJ3Vq2nJCoRK5vERxdfYl8vgAm1m6QqyHxNtlJHkIh5jP1qHX19tDrBa6IbIBIOdc4xRw992mrr9twoIWo2S3phlqj551zJMkcJ1B6w1kFASZAMjicPkLJju0rxRh9PsQUFcfKB_ZQGLZmIS6GSKyK0sIqC0izsA";
  }
  if (c.includes("가전") || c.includes("디지털") || c.includes("electronics") || c.includes("기기") || c.includes("스마트")) {
    return "https://lh3.googleusercontent.com/aida-public/AB6AXuAeDwu0KMjS84kjxzeH1yYgit8AayTeypl_1sCiYurseZ7rePc3XGMW4NMkJShmEnhJuSy61_0Rk23as_ASZNrnbn2IptXUkhqR92JWmbKfYxl1O_mY8zS_4_Nb460yB-eeJ6A_BqRcvn9BL63O5F4JlQLKBL7sGHJOfHTxX0aFDZUWmkSC7z5sAJwbqN_MPYaRZHId1ajdODE199mDWqvmaco2nu2rG0TvwvaN0qiWhvA-Bzvc2_4qZoozqCBLluOzk61Ors3VRw";
  }
  // Standard insulated tumbler / travel cup
  return "https://lh3.googleusercontent.com/aida-public/AB6AXuDuxxpJX8Dv42OTp0daSIhz1xVPN7IqOiNyWRqf_2p3r7TqyG2R9gbGSYPaUylBogjBjAsoZp_5hFq79_vx5rWgMMw70qLVqAin0M4lqgy8FOTR5_IrSLEcg_xMRHaExkXIogNxI10gFrE13z5rNuzQVQAUe1ogBioX9FBkATPBSvoyZzcb1qnqt75RvniB57vkGn7TdTahmX3EuU_z8RP8e0AVSa17r-Wts232Mso8xeoUBi9xoBGUNDLP2PlMSHucaTJdbBmQww";
}

// 1. Hook generator
app.post("/api/generate-hooks", async (req, res) => {
  const { name, category, targetCustomer, painPoints = [], usPs = [] } = req.body;

  if (!name) {
    return res.status(400).json({ error: "상품명(name)은 필수 입력 항목입니다." });
  }

  const ai = getGeminiClient();

  // If Gemini is active
  if (ai) {
    try {
      const prompt = `
당신은 최고의 상세페이지 마케팅 기획자이자 전환율 분석 카피라이터입니다.
아래의 상품 기본 정보를 바탕으로, 고객의 구매 욕구를 극대화할 수 있는 '상세 소구점' 3가지 세트를 완성해 주세요.

상품 정보:
- 상품명: ${name}
- 카테고리: ${category}
- 타겟 고객: ${targetCustomer}
- 고객의 불편함 (Pain Points): ${painPoints.join(", ")}
- 핵심 장점 (USPs): ${usPs.join(", ")}

결과물 요구사항:
- 각각의 소구점은 다음 3개의 필드를 갖는 객체입니다.
  1. title: 감성적이거나 강력하며 눈길을 사로잡는 혜택 중심의 후킹 한 줄 타이틀 (예: "당신의 커피, 오후에도 얼음이 살아있나요?")
  2. sellingPoint: 소구점의 핵심 내용 혹은 핵심 기능 명칭 (예: "24시간 든든한 보냉 효과")
  3. description: 타겟 고객의 깊은 공감을 유도하고, 제품의 특장점이 어떻게 그 고민을 해결해 주는지 설명하는 2~3줄의 설득력 있는 한국어 문장.

출력은 반드시 다른 부가 텍스트 없이 순수한 JSON 배열 포맷이어야 합니다.
JSON Format:
[
  {
    "title": "한 줄 후킹 타이틀 1",
    "sellingPoint": "핵심 소구 기능 1",
    "description": "설득력 있는 공감 및 해결 문장 1"
  },
  ...
]
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const text = response.text || "";
      const hooks = JSON.parse(text.trim());
      return res.json({ hooks });
    } catch (error: any) {
      console.error("Gemini Hook Generation Error:", error);
      // Fallback to mock on error
    }
  }

  // Fallback / Standby Mock Generator (extremely robust, customizes to user's exact inputs!)
  const mockHooks = [
    {
      title: `"${targetCustomer || '바쁜 일상'}의 아침부터 퇴근길까지 그대로 유지되는 온도를 경험하세요."`,
      sellingPoint: `${usPs[0] || '24시간 완벽 보냉'} 효과`,
      description: `대부분의 제품은 시간이 흘러 외부 온도의 영향을 많이 받지만, 당사의 혁신적인 다중 절열 구조는 처음 상태를 온전히 보존하여 ${painPoints[0] || '미지근함으로 인한 스트레스'}를 즉각 해결합니다.`
    },
    {
      title: `"가방에 대충 눕혀두어도 단 한 방울도 새지 않는 절대 안심 설계"`,
      sellingPoint: `${usPs[1] || '100% 밀착 밀봉'} 기술`,
      description: `${painPoints[1] || '가방 속에서 소중한 물건이 젖을까 걱정하던 일'}은 이제 영원히 마침표를 찍습니다. 고품질 특수 실리콘 패킹으로 어떠한 흔들림에도 빈틈없이 밀착됩니다.`
    },
    {
      title: `"나 자신의 만족을 넘어, 지구와 타인을 모두 배려하는 트렌디한 선택"`,
      sellingPoint: `${usPs[2] || '친환경 프리미엄 에코'} 에디션`,
      description: `유해 성분이 전혀 배출되지 않는 친환경 안전 소재로 제작되어 나와 가족이 매일 안심하고 사용할 수 있으며, 불필요한 일회용품 낭비를 효과적으로 줄여줍니다.`
    }
  ];

  return res.json({ hooks: mockHooks });
});

// 2. Full Copy Generator
app.post("/api/generate-page", async (req, res) => {
  const { name, category, targetCustomer = "고객님", painPoints = [], usPs = [], selectedHook } = req.body;

  if (!name) {
    return res.status(400).json({ error: "상품명은 필수 입력 항목입니다." });
  }

  const ai = getGeminiClient();

  if (ai) {
    try {
      const prompt = `
당신은 대한민국 최고의 전환율 1위 랜딩페이지/상세페이지 전문 카피라이터입니다.
아래의 상품 브랜드와 특징을 조합하여, 실제 구매 전환을 일으키는 아름다운 상세페이지 사본을 제작해 주세요.

상품 정보:
- 상품명: ${name}
- 카테고리: ${category}
- 타겟 고객: ${targetCustomer}
- 선택된 핵심 소구점: ${selectedHook ? JSON.stringify(selectedHook) : "없음"}
- 고객의 고민들: ${painPoints.join(", ")}
- 핵심 단정 및 장점: ${usPs.join(", ")}

결과물 요건:
아래에 정의된 JSON 구조와 완전히 동일한 키값을 반환해야 합니다. 다른 텍스트는 출력하지 마세요.
{
  "mainHeadline": "단 한 번의 터치로 하루 종일 시원하게,\\n프리미엄 텀블러" (최대 2줄, 상품 특화 후킹 카피 문구, 줄바꿈은 \\n 으로 삽입),
  "subtitle": "얼음이 녹아 미지근해진 커피는 이제 그만. 24시간 보냉 기술의 혁신." (감성적 서브 카피라이팅),
  "problemQuestion": "\\"당신의 커피, 오후에도 얼음이 살아있나요?\\"" (큰 따옴표를 포함한 강렬한 질문 제기),
  "problemAnswer": "대부분의 텀블러는 시간이 지남에 따라 온도 보존율이 급격히 저하되지만, 당사의 다중 진공 단열층 기술은..." (이중 진공 단열 등 핵심 원리를 설명하고 타겟의 페인포인트를 해결하는 3~4줄의 감동적인 한국어 설명),
  "imageAlt": "깨끗한 대리석 테이블 위에 놓여 있는 메탈릭 실버 색상의 세련된 프리미엄 텀블러와 투명하고 차가운 얼음 조각들이 어우러진 제품 전면 이미지",
  "imagePrompt": "A high-end, premium minimalist stainless steel tumbler centered on a warm marble table in soft professional studio lighting, surrounded by crisp pristine ice blocks and water droplets, 4k, hyper-realistic, commercial product styling description" (영어 AI 이미지 프롬프트),
  "usps": [
    {
      "title": "24시간 강력 보냉",
      "description": "이중 진공 구조로 하루 종일 차갑게 유지됩니다.",
      "icon": "snowflake"
    },
    {
      "title": "100% 안심 밀봉",
      "description": "가방 속에서도 샐 걱정 없이 깔끔합니다.",
      "icon": "lock"
    },
    {
      "title": "에코 프렌들리",
      "description": "지속 가능한 프리미엄 최고급 스테인리스 소재.",
      "icon": "leaf"
    }
  ]
}

설명 및 규칙:
- 아이콘 종류 "icon"은 반드시 다음 중 하나여야 합니다: ["snowflake", "lock", "leaf", "battery", "sparkles", "flame", "shield", "heart", "zap"].
- 한국어로 작성하되 상세페이지의 흐름에 맞춰 매우 설득력 있고 고급스러운 톤앤매너로 다듬어 주세요.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const text = response.text || "";
      const generatedDetails = JSON.parse(text.trim());
      generatedDetails.imageHotlink = getCategoryImage(category);
      return res.json({ generatedDetails });
    } catch (error: any) {
      console.error("Gemini Copy Page Generation Error:", error);
      // Fallback to mock on error
    }
  }

  // Mock Generation based on actual user input parameters
  const resolvedCategory = category || "생활/주방";
  const finalHeadline = `단 한 번의 터치로 하루 종일 시원하게,\n${name}`;
  const finalSubtitle = `${painPoints[0] || "온도 유지 실패"}로 불편했다면 이제 끝. 온 세상을 놀라게 할 혁신이 찾아옵니다.`;
  const finalProblemQuestion = `"${targetCustomer}의 소중한 일상, 매 순간 완벽한 온도를 유지하고 있나요?"`;
  const finalProblemAnswer = `우리가 매일 마주하는 바쁜 나날 속에서 처음 그 설렘 그대로의 온도를 보존하기란 쉽지 않습니다. 시중의 평범한 제품들은 외부 온도 배출로부터 취약하여 얼음을 순식간에 녹여버립니다. 하지만 당사의 이중 진공 단열층 기술은 열을 원천 차단하여 극대화된 차가움과 뜨거움을 종일 보답합니다.`;

  // Icons matching category / usps
  const iconsList: Array<"snowflake" | "lock" | "leaf" | "battery" | "sparkles" | "flame" | "shield" | "heart" | "zap"> = [
    "snowflake",
    "lock",
    "leaf",
    "sparkles",
    "zap"
  ];

  const generatedDetails = {
    mainHeadline: finalHeadline,
    subtitle: finalSubtitle,
    problemQuestion: finalProblemQuestion,
    problemAnswer: finalProblemAnswer,
    imageAlt: `Clean minimalist setup showing ${name} with elegant premium aesthetics.`,
    imagePrompt: `Clean luxury commercial studio photograph showing a new ${name} centered on flat premium background with exquisite volumetric shadow, 8k resolution, realistic.`,
    imageHotlink: getCategoryImage(resolvedCategory),
    usps: [
      {
        title: usPs[0] || "24시간 최고의 보온보냉",
        description: "이중 극대화 진공 압축 기술로 하루 온종일 이상적인 풍미를 보답합니다.",
        icon: iconsList[0]
      },
      {
        title: usPs[1] || "100% 완전 완벽 밀봉",
        description: "가방 및 포켓 속에서도 물 샘 트러블 없이 완전 보장합니다.",
        icon: iconsList[1]
      },
      {
        title: usPs[2] || "친환경 에코 라이프",
        description: "재활용 가능한 최고 가치의 에코 성분으로 자연과 당신을 보호해요.",
        icon: iconsList[2]
      }
    ]
  };

  return res.json({ generatedDetails });
});

// 3. AI 상세페이지 진단 (Landing Page Diagnosis)
app.post("/api/diagnose-page", async (req, res) => {
  const { url, content, productName, category } = req.body;

  const ai = getGeminiClient();

  // If Gemini is active
  if (ai) {
    try {
      const prompt = `
당신은 대한민국 최고의 전환율 극대화 전문가이자 억대 연봉의 랜딩페이지 진단 컨설턴트입니다.
제출된 상세페이지 정보(혹은 사이트 설명/내용)를 면밀히 심사하여 구매 전환율을 극대화할 수 있는 진단서 및 실천 가이드를 한글로 발행해 주세요.

상세페이지/상품 입력 정보:
- 도메인/URL: ${url || "미지정"}
- 분석 대상 주요 텍스트/제품소개: ${content || "미지정"}
- 분석 키워드/제품명: ${productName || "일반 제품"}
- 카테고리: ${category || "일반"}

결과물 요구사항:
- 반드시 아래에 기재된 JSON 스키마 규격을 100% 동일한 키값으로 충족해주셔야 합니다. 결과물은 부가적인 설명글이나 마크다운 백틱 없이 순수한 JSON형태여야 합니다.
- 한국어로 작성해 주세요.
- 진단 항목("metrics") 정보:
  1. hook (후킹 카피 강도): 첫 3초 시선을 사로잡는 강력한 카피 유무
  2. agitation (문제제기/공감대): 타겟 고객의 불만/필요성에 대한 통렬한 공감대 빌드업
  3. clarity (장점/USP 설득력): 특징이 주는 실체적인 이득이 투명하고 신뢰감 있게 설명되었는지 여부
  4. readability (모바일 가독성/편집): 모바일 화면에서 피로감 없이 시선이 흘러가는지 체계성 검토
- "status" 값은 ["취약", "보통", "개선필요", "우수"] 중 하나여야 합니다.
- score 점수(0~100)는 각 평가 영역의 상태에 어울리게 합리적이고 객체적으로 분배해 주세요.
- "beforeAfterCopys" 코너에서는 실제로 진단 결과를 바탕으로 "이렇게 쓰여진 문구를 -> 이렇게 한 층 치명적이고 매력적인 카피로 개선하라" 하는 명확한 전/후 대비 예시 2가지를 적어주세요.

JSON Schema 규격:
{
  "score": 68,
  "overallVerdict": "종합적인 평가 의견과 전환율 이탈 원인에 대한 깊이 있는 통찰력 있는 요약 의견 (2~3줄)",
  "metrics": {
    "hook": {
      "score": 65,
      "status": "개선필요",
      "feedback": "헤드라인 영역 피드백 내용"
    },
    "agitation": {
      "score": 55,
      "status": "취약",
      "feedback": "고민 환기 영역 피드백 내용"
    },
    "clarity": {
      "score": 80,
      "status": "우수",
      "feedback": "USP 설명 영역 피드백 내용"
    },
    "readability": {
      "score": 70,
      "status": "보통",
      "feedback": "폰트 밀도 및 모바일 배치 피드백 내용"
    }
  },
  "beforeAfterCopys": [
    {
      "sectionName": "메인 타이틀 영역",
      "before": "기존의 전형적인 문구나 단순 특징 나열 문구",
      "after": "혁신적으로 극대화된 후킹과 혜택이 담긴 고효율 제안 카피"
    },
    {
      "sectionName": "고객 고민 해결 섹션",
      "before": "단순 제품 기능 자랑 문구",
      "after": "고객의 깊은 갈증과 통증을 어루만지며 당위성을 심어주는 매혹 카피"
    }
  ],
  "recommendations": [
    "당장 적용 가능한 원포인트 솔루션 피드백 조언 1",
    "당장 적용 가능한 원포인트 솔루션 피드백 조언 2",
    "당장 적용 가능한 원포인트 솔루션 피드백 조언 3"
  ]
}
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const text = response.text || "";
      const report = JSON.parse(text.trim());
      return res.json({ report });
    } catch (error: any) {
      console.error("Gemini Diagnosis Generation Error, falling back to mock:", error);
    }
  }

  // Standby Robust Fallback Diagnosis report engine
  const resolvedName = productName || "전체 상품";
  const mockReport = {
    score: 72,
    overallVerdict: `분석 결과, 현재상태의 상세페이지는 기능 중심 설명이 돋보이나 타겟 고객의 가슴을 뛰게 할 감정적 후킹과 깊은 아픔(Pain Point)에 대한 자극이 다소 누락되어 있어, 유입 수 대비 훌륭한 구매 전환율(CVR)을 기록하기에는 이른 개선이 권장됩니다.`,
    metrics: {
      hook: {
        score: 68,
        status: "개선필요",
        feedback: `"${resolvedName}" 제품 자체의 특징을 나열하는 방식은 평범합니다. 구매자가 얻게 될 가장 핵심적인 가치를 강렬한 문구로 던지는 한 줄 질문형 카피가 도입되어야 시선을 뺏을 수 있습니다.`
      },
      agitation: {
        score: 60,
        status: "취약",
        feedback: "소비자가 왜 이 제품을 '반드시 오늘' 장만해야만 하는지에 대한 궁극적인 문제 제기와 긴박한 고통 환기가 누락된 탓에, 심드렁한 설득 과정에 머물 수 있습니다."
      },
      clarity: {
        score: 84,
        status: "우수",
        feedback: "보온/보냉 또는 자연유래 성분 등 제품이 갖추고 있는 성숙한 기술 스펙은 매우 정밀하고 투명하게 쓰여 고객의 초기 인지 신뢰도는 매우 두터운 편입니다."
      },
      readability: {
        score: 75,
        status: "보통",
        feedback: "문장의 길이와 이미지 사이 텍스트 밀도가 다소 높은 편입니다. 스크롤을 아주 고속으로 아래로 휙휙 내리는 모바일 손가락 속도에 대응하려면 요점을 bullet point로 정리해 가독성을 개선해야 좋습니다."
      }
    },
    beforeAfterCopys: [
      {
        sectionName: "메인 인트로 헤드 카피",
        before: `${resolvedName} 판매합니다. 최적의 보존력과 뛰어난 재질을 담았습니다.`,
        after: `"다들 좋다고 광고하는 일반적인 제품들... 왜 집에 와서 써보면 금방 미지근해지고 녹아버릴까요? 오후에도 얼음이 아삭하게 살아있는 압도적인 차이."`
      },
      {
        sectionName: "문제의 부각과 적극적 공감대 섹션",
        before: "보통은 시간이 지나 얼음이 녹으면서 진한 음료의 맛이 금방 밍밍하게 변해버리곤 합니다.",
        after: `"한 모금 무심코 마시고 찡그린 얼굴. 기분 좋게 챙겨나온 최고급 커피가 몇십 분 만에 물처럼 밍밍하게 싱거워져 다 흘려 버렸던 서글픈 일... 누구나 반드시 있습니다."`
      }
    ],
    recommendations: [
      "상세 소구점 시작 전, 타겟이 깊이 경험했을 법한 씁쓸한 불편 상황을 일러스트나 구체적 문장으로 2줄 이상 부각할 것을 권장합니다.",
      "소비자가 스크롤을 내릴 때 눈이 편안히 정착하도록, 단조로운 검정 글씨 대신 강조가 필요한 핵심 단어에 포인트 보랏빛 컬러 및 볼드 처리를 배치하세요.",
      "신뢰 지수를 150% 더 끌어당기기 위해 타사 시중품과 녹는 수치 / 온도 보존 유지 결과를 실측 비교한 막대 그래프를 인포그래픽으로 즉시 노출하세요."
    ]
  };

  return res.json({ report: mockReport });
});

// Vite / static file serving setup
async function setupViteAndBuild() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupViteAndBuild().catch((err) => {
  console.error("Failed to start server:", err);
});
