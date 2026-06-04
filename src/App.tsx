import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  Check, 
  FileText, 
  BarChart2, 
  Eye, 
  EyeOff,
  Mail,
  Edit3, 
  Save, 
  ArrowLeft, 
  X, 
  HelpCircle, 
  User, 
  Clock, 
  Snowflake, 
  Lock, 
  Leaf, 
  Battery, 
  Flame, 
  Shield, 
  Heart, 
  Zap, 
  Menu,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Search,
  RefreshCw,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Activity,
  Smartphone,
  Monitor
} from "lucide-react";
import { 
  ProductInfo, 
  DetailHook, 
  USPDetails, 
  GeneratedDetails, 
  Project,
  DiagnosisReport
} from "./types";

// Static Premium Templates for detailed customization and generation pre-fills
const PREMIUM_TEMPLATES = [
  {
    title: "시카 리페어 세럼",
    desc: "예고 없이 찾아오는 붉은기/건조 고민 피부의 밸런스 회복 솔루션",
    img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600",
    productName: "천연 시카 펩타이드 장벽 보호 리페어 세럼",
    category: "뷰티/화장품",
    targetCustomer: "민감성 피부와 극심한 속건조로 고생하는 2030 여성 직장인",
    painPoints: [
      "사무실의 찬 에어컨이나 히터 바람에 피부가 찢어질 듯 건조해요",
      "화장품을 조금만 바꿔도 자극이 오고 가렵고 붉어집니다",
      "여러 개 덧발라도 피부 겉에서만 겉돌고 속은 여전히 당겨요"
    ],
    usps: [
      "특허 고효율 오가닉 시카펩타이드 장벽 회복 주입",
      "단 1회 도포만으로 72시간 지속 깊은 속건조 해결",
      "전성분 EWG 그린 등급의 예민성 피부 맞춤 안심 포뮬러"
    ]
  },
  {
    title: "하루 영풍 사과즙",
    desc: "물 한방울 없이 통째로 착즙한 영풍 사과 100% 한 포의 아침 활력",
    img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=600",
    productName: "물 한 방울 안 섞인 유기농 100% 영풍 사과즙",
    category: "식품",
    targetCustomer: "사과 깎아 먹을 시간 없이 영양분 가득한 건강 한 팩을 찾는 우리가족",
    painPoints: [
      "정제수나 설탕을 탄 밍밍하고 끈적한 사과즙이 너무 많습니다",
      "아이들이 가짜 첨가물이 들어간 시중 탄산 음료에만 길들여졌어요",
      "아침 시간 바빠서 신선한 과일 섭취율이 0%에 가깝습니다"
    ],
    usps: [
      "물 일절 없이 저온에서 햇사과를 그대로 눌러 짠 순수 원액 공법",
      "국내산 무설탕, 무색소, 무방부제 3無 안심 위생 보증",
      "GAP 친환경 국가공인 우수농산물 원과 만을 엄선하여 사용"
    ]
  },
  {
    title: "수피마 베이직 티",
    desc: "하루종일 입어도 자극 없고, 수십 번 세탁도 거뜬한 수피마 코튼 티셔츠",
    img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
    productName: "세탁 가동에도 끄떡없는 럭셔리 수피마 코튼 백합 화이트 티셔츠",
    category: "의류/패션",
    targetCustomer: "실크 같은 촉감과 오래 입어도 변함없는 미니멀웨어 소지 희망자",
    painPoints: [
      "세탁기에 한번 돌리면 목 부분이 우글우글 늘어나 금방 잠옷이 돼요",
      "두께가 얇거나 비쳐서 단독으로 외출할 때 불안하고 후줄근해 보여요",
      "겉감이 거칠어 목뒷부분 피부에 자꾸 마찰 가렵거나 따갑습니다"
    ],
    usps: [
      "실크에 견줄 만한 100% 미국산 최고급 수피마 코튼 라이트 원사",
      "넥 보강 더블 스티치 라이크라 밴드 공정 편직으로 수선 없음",
      "원단 수축률 1% 미만의 완벽 복원 프레임 세공 완료"
    ]
  },
  {
    title: "저소음 핸디 청소기",
    desc: "깃털처럼 가볍고 조용하게 고강도 강력 진공 흡입을 수행하는 무선 청소기",
    img: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=600",
    productName: "손목이 먼저 아는 560g 무소음 터보 무선 핸디 청소기",
    category: "가전/디지털",
    targetCustomer: "차량 및 원룸 틈새 먼지를 언제든지 조용히 고성능으로 지우고픈 가구",
    painPoints: [
      "청소기가 과도하게 무거워 조금만 밀어도 손목 관절에 피로가 납니다",
      "밤늦게 원룸이나 야간 차 안에서 켜기엔 모터 굉음이 너무 민망해요",
      "틈새 먼지나 카펫 과자부스러기는 잘 흡입하지 못하고 털어내는 수준입니다"
    ],
    usps: [
      "생수 500ml 무게 수준의 560g 놀라운 콤팩트 프레임 설계",
      "52dB 미만 도서관 급 저주파 소음 억제 최속 BLDC 모터 지지",
      "터보 가동 단계 기준 최대 18,000Pa의 강력 고밀도 진공 흡입"
    ]
  },
  {
    title: "탄화 대나무 항균도마",
    desc: "칼집 흠집의 미세 플라스틱이나 곰팡이 침입 걱정 없는 천연 압축 도마",
    img: "https://images.unsplash.com/photo-1594385208974-2e75f9d3ab48?auto=format&fit=crop&q=80&w=600",
    productName: "세균번식 및 미세플라스틱 100% 차단 저탄화 친환경 도마",
    category: "생활/주방",
    targetCustomer: "음식물이 도마의 칼집에 스며드는 위생문제를 고민하는 건강한 주부",
    painPoints: [
      "플라스틱 도마에 가해진 칼집 때문에 미세 플라스틱이 은연 중 섞일까 무서워요",
      "유리 도마는 칼질할 때 소름끼치는 마찰 소리에 고막 통증이 옵니다",
      "일반 원목 도마는 습한 여름철이 되면 물이 베여 쉽게 곰팡이가 번집니다"
    ],
    usps: [
      "고압 저산소 탄화 가공으로 빈틈없는 밀도를 실현한 친환경 대나무 원목",
      "수분 흡수량이 제로에 수렴해 김치물 배임 및 냄새를 선제 차단",
      "작업대 밀착 미끄러짐을 원천 상쇄하는 밀착 논슬립 실리콘 모서리"
    ]
  }
];

// Static Initial Projects for high visual fidelity on direct mount
const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj_tumbler",
    productInfo: {
      name: "프리미엄 텀블러",
      category: "생활/주방",
      targetCustomer: "2030 직장인, 환경 보호에 관심 많은 분",
      painPoints: ["얼음이 금방 녹아요", "가방에서 물이 새요"],
      usPs: ["24시간 보냉", "100% 밀봉", "에코 프렌들리"]
    },
    generatedDetails: {
      mainHeadline: "단 한 번의 터치로 하루 종일 시원하게,\n프리미엄 텀블러",
      subtitle: "얼음이 녹아 미지근해진 커피는 이제 그만. 24시간 보냉 기술 of 혁신.",
      problemQuestion: "\"당신의 커피, 오후에도 얼음이 살아있나요?\"",
      problemAnswer: "대부분의 텀블러는 시간이 지나면 외부 온도의 영향을 받습니다. 하지만 우리의 24시간 보냉 기술은 진공 단열층을 극대화하여 처음의 온도를 그대로 유지합니다. 퇴근길에도 아침의 시원함을 느껴보세요.",
      imageAlt: "메탈릭 텀블러 스튜디오 사진",
      imagePrompt: "Premium minimalist stainless steel tumbler in high-key modern studio lighting with ice cubes around. Catalog commercial design, highly realistic.",
      imageHotlink: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&q=80&w=600",
      usps: [
        { title: "24시간 보냉", description: "이중 진공 구조로 하루 종일 차갑게 유지됩니다.", icon: "snowflake" },
        { title: "100% 밀봉", description: "가방 속에서도 안심하세요.", icon: "lock" },
        { title: "에코 프렌들리", description: "지속 가능한 프리미엄 최고급 스테인리스 소재.", icon: "leaf" }
      ]
    },
    updatedAt: "2시간 전 수정"
  },
  {
    id: "proj_apple",
    productInfo: {
      name: "유기농 사과즙",
      category: "식품",
      targetCustomer: "건강한 아침을 챙기고 싶은 전 연령대",
      painPoints: ["설탕 가득한 음료가 걱정돼요", "바쁜 아침 간편한 영양이 필요해요"],
      usPs: ["100% NFC 착즙", "무설탕/무합성 첨가물", "국산 친환경 사과"]
    },
    generatedDetails: {
      mainHeadline: "설탕 한 방울 없이 자연을 그대로 담은\n순수 100% 유기농 사과즙",
      subtitle: "물 탄 사과 음료는 이제 그만. 사과 그대로를 온전히 눌러 짜낸 신선한 아침 영양.",
      problemQuestion: "\"매일 아침 마시는 사과즙, 진짜 사과가 맞나요?\"",
      problemAnswer: "어려운 농가에서 선별한 최상급 국산 유기농 사과만을 고집합니다. 영양소를 파괴하는 고열 압착 방식이 아닌 저온 NFC 착즙 공법으로 사과 본연의 진한 풍미와 식이섬유를 온전히 보존했습니다.",
      imageAlt: "fresh organic apples sliced beautifully",
      imagePrompt: "Fresh organic sliced apples on white surface with bright beautiful morning sunlight, beverage packaging mockup, extreme detail.",
      imageHotlink: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=600",
      usps: [
        { title: "100% NFC 착즙", description: "물 한방울 없이 사과 생즙만 그대로 짜냈습니다.", icon: "zap" },
        { title: "첨가물 zero", description: "무설탕 무항생제 안심 먹거리 보증.", icon: "shield" },
        { title: "국산 명품 유기농", description: "엄선된 경북 명품 사과 농장 갓 수확 원료.", icon: "leaf" }
      ]
    },
    updatedAt: "어제 수정"
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<"intro" | "dashboard" | "form-step-1" | "form-step-2" | "form-loading" | "result" | "diagnosis-input" | "diagnosis-loading" | "diagnosis-result" | "login" | "signup">("intro");
  
  // User authentication State
  const [user, setUser] = useState<{ email: string; name: string } | null>(() => {
    const saved = localStorage.getItem("selling_page_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        return null;
      }
    }
    return null;
  });

  const [loginEmail, setLoginEmail] = useState("redsunhi08@gmail.com");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // All Users list state for Admin panel
  const [allUsers, setAllUsers] = useState<{ email: string; name: string; date: string; role: string; projectsCount: number }[]>(() => {
    const saved = localStorage.getItem("selling_page_all_users");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (err) {}
    }
    return [
      { email: "redsunhi08@gmail.com", name: "김사장님", date: "2026-05-12", role: "우수회원", projectsCount: 14 },
      { email: "admin@sellingpage.co.kr", name: "관리자", date: "2026-01-01", role: "마스터", projectsCount: 8 },
      { email: "apple_farm@naver.com", name: "사과청년", date: "2026-05-28", role: "일반회원", projectsCount: 3 },
      { email: "gildong@gildong.com", name: "홍길동", date: "2026-06-01", role: "일반회원", projectsCount: 1 }
    ];
  });

  // Diagnostics history list state for Admin panel
  const [diagnosisHistory, setDiagnosisHistory] = useState<{ id: string; email: string; prdName: string; category: string; score: number; status: string; date: string }[]>(() => {
    const saved = localStorage.getItem("selling_page_diagnosis_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (err) {}
    }
    return [
      { id: "diag_1", email: "apple_farm@naver.com", prdName: "유기농 착즙 사과즙", category: "식품", score: 84, status: "개선필요", date: "2026-06-02 14:15" },
      { id: "diag_2", email: "gildong@gildong.com", prdName: "미니 휴대용 무소음 선풍기", category: "디지털/가전", score: 58, status: "취약", date: "2026-06-03 09:40" },
      { id: "diag_3", email: "redsunhi08@gmail.com", prdName: "피톤치드 수면 탈취제", category: "생활/주방", score: 92, status: "최적", date: "2026-06-03 11:10" }
    ];
  });

  // Desktop spacious layout toggle switcher (Defaults to true, can toggle on desktop browser size)
  const [isDesktopLayout, setIsDesktopLayout] = useState(true);
  
  // Sidebar open state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Track broken/failed image URLs
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const handleImageError = (imgSrc: string) => {
    setBrokenImages(prev => ({ ...prev, [imgSrc]: true }));
  };

  // Dashboard navigation sub-tabs
  const [dashboardTab, setDashboardTab] = useState<"home" | "projects" | "templates" | "my" | "admin">("home");
  const [adminActiveSubTab, setAdminActiveSubTab] = useState<"users" | "logs">("users");
  const [adminUserSearch, setAdminUserSearch] = useState("");
  const [adminLogSearch, setAdminLogSearch] = useState("");
  const [projectSearchQuery, setProjectSearchQuery] = useState("");
  const [templateCategoryFilter, setTemplateCategoryFilter] = useState("전체");
  const [projectCategoryFilter, setProjectCategoryFilter] = useState("전체");
  
  // Diagnosis states
  const [diagnosisUrl, setDiagnosisUrl] = useState("");
  const [diagnosisContent, setDiagnosisContent] = useState("");
  const [diagnosisPrdName, setDiagnosisPrdName] = useState("");
  const [diagnosisCategory, setDiagnosisCategory] = useState("생활/주방");
  const [diagnosisReport, setDiagnosisReport] = useState<DiagnosisReport | null>(null);
  const [diagnosisLoadingText, setDiagnosisLoadingText] = useState("페이지 구조를 분석하고 있습니다...");

  // Projects List State (loaded from localStorage or default initialized)
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("selling_page_projects");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Keep only valid projects matching types, filtering out any broken/old structure
          return parsed.filter(p => 
            p && 
            typeof p === "object" && 
            p.id && 
            p.productInfo && 
            p.generatedDetails && 
            p.generatedDetails.mainHeadline &&
            Array.isArray(p.generatedDetails.usps)
          );
        }
      } catch (e) {
        return INITIAL_PROJECTS;
      }
    }
    return INITIAL_PROJECTS;
  });

  // Current Working Product & Generation Info State
  const [name, setName] = useState("프리미엄 스테인리스 텀블러");
  const [category, setCategory] = useState("생활/주방");
  const [targetCustomer, setTargetCustomer] = useState("2030 직장인, 환경 보호에 관심 많은 분");
  const [painPoints, setPainPoints] = useState<string[]>(["얼음이 금방 녹아요", "가방에서 물이 새요"]);
  const [usPs, setUsPs] = useState<string[]>(["24시간 보냉", "완전 밀봉", "친환경 소재"]);
  
  // Custom inputs for adding elements in Step 1
  const [tempPainPoint, setTempPainPoint] = useState("");
  const [tempUSP, setTempUSP] = useState("");
  
  // Generated Hooks State (Step 2)
  const [generatedHooks, setGeneratedHooks] = useState<DetailHook[]>([]);
  const [selectedHookIndex, setSelectedHookIndex] = useState<number>(0);
  const [isHooksLoading, setIsHooksLoading] = useState(false);

  // Loading animation state messages (Step 3)
  const [loadingStepText, setLoadingStepText] = useState("AI가 카피라이팅을 정교하게 다듬고 있어요...");
  
  // Generated Final Details (Screen 4)
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  
  // Inline editing states for the generated project
  const [editableHeadline, setEditableHeadline] = useState("");
  const [editableSubtitle, setEditableSubtitle] = useState("");
  const [editableProblemQuestion, setEditableProblemQuestion] = useState("");
  const [editableProblemAnswer, setEditableProblemAnswer] = useState("");
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [showAiImageGuide, setShowAiImageGuide] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Sync projects to localStorage on change
  useEffect(() => {
    localStorage.setItem("selling_page_projects", JSON.stringify(projects));
  }, [projects]);

  // Loading animation simulation loop when generating page
  useEffect(() => {
    if (currentView === "form-loading") {
      const messages = [
        "AI가 타겟 고객 맞춤 레이아웃을 구성하는 중입니다...",
        "최적의 구매 전환(CRO) 문구를 문장에 적용하고 있습니다...",
        "상세페이지의 비주얼 톤앤매너를 일치시키고 있습니다...",
        "완성 직전! 상세페이지 시각 가이드를 구축 중입니다..."
      ];
      let idx = 0;
      const interval = setInterval(() => {
        if (idx < messages.length) {
          setLoadingStepText(messages[idx]);
          idx++;
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [currentView]);

  // Loading animation simulation for AI diagnosis
  useEffect(() => {
    if (currentView === "diagnosis-loading") {
      const messages = [
        "기존 상세페이지의 흐름과 요소를 확보하여 분석하고 있습니다...",
        "이탈률을 높이는 상단 헤드라인의 후킹 등급 검증 중...",
        "타겟 고객 페르소나 및 페인 포인트 소거 정합성 점검 중...",
        "핵심 소구점(USP)과 모바일 기기 기준의 가독성 계산 중...",
        "비포 & 애프터 혁신 카피 기획안을 도출하는 중..."
      ];
      let idx = 0;
      const interval = setInterval(() => {
        if (idx < messages.length) {
          setDiagnosisLoadingText(messages[idx]);
          idx++;
        }
      }, 1300);

      return () => clearInterval(interval);
    }
  }, [currentView]);

  // Handle API Hook Generation
  const handleGenerateHooks = async () => {
    setIsHooksLoading(true);
    setCurrentView("form-step-2");
    
    try {
      const response = await fetch("/api/generate-hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, targetCustomer, painPoints, usPs }),
      });
      
      const data = await response.json();
      if (data.hooks && data.hooks.length > 0) {
        setGeneratedHooks(data.hooks);
        setSelectedHookIndex(0);
      } else {
        throw new Error("No hooks returned");
      }
    } catch (err) {
      console.error("Failed to generate hooks via endpoint. Falling back to structured local mock parser...", err);
      // Fallback is also responsive to user customized inputs!
      const fallbackHooks: DetailHook[] = [
        {
          title: `"${targetCustomer || '바쁜 직장인'}을 사로잡을 가장 쾌적하고 세련된 일상의 완성"`,
          sellingPoint: `${usPs[0] || '최상의 상태 조절'} 혁신`,
          description: `사소하지만 매일 마주치는 불편함이었던 ${painPoints[0] || '금방 식는 문제'}를 완벽히 종결시킵니다. 스마트한 열차단 특허 필터로 가장 깨끗한 순간을 배달합니다.`
        },
        {
          title: `"가방이나 가구 위, 어디든 안심하고 내려두는 일상의 완벽한 신뢰"`,
          sellingPoint: `${usPs[1] || '극대화된 안정'} 공학`,
          description: `가장 완벽한 원천 차단 설계로 ${painPoints[1] || '가방 등에서 물이 배어 나오는 고통'}을 말끔히 정복했습니다. 한 방울의 빈틈조차 허용치 않는 퀄리티를 누려보세요.`
        },
        {
          title: `"나 자신과 소중한 생태계를 모조리 지키는 최상급 프리미엄 에디션"`,
          sellingPoint: `${usPs[2] || '친환경 가치 소산'} 소재`,
          description: `자연에 대한 리스펙트가 담긴 최고급 에코 마크 기준 소재로 타겟 품격을 격상시킴과 동시에 한 차원 다른 일상 에센스를 선사합니다.`
        }
      ];
      setGeneratedHooks(fallbackHooks);
      setSelectedHookIndex(0);
    } finally {
      setIsHooksLoading(false);
    }
  };

  // Handle Final Landing Page Copy Generation
  const handleGeneratePage = async () => {
    setCurrentView("form-loading");
    setLoadingStepText("AI가 카피라이팅을 정교하게 다듬고 있어요...");

    const selectedHook = generatedHooks[selectedHookIndex] || null;

    try {
      const response = await fetch("/api/generate-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, targetCustomer, painPoints, usPs, selectedHook }),
      });

      const data = await response.json();
      if (data.generatedDetails) {
        const newProj: Project = {
          id: "proj_" + Date.now(),
          productInfo: { name, category, targetCustomer, painPoints, usPs },
          generatedDetails: data.generatedDetails,
          updatedAt: "방금 수정"
        };
        
        setActiveProject(newProj);
        setProjects(prev => [newProj, ...prev]);
        setEditableHeadline(newProj.generatedDetails.mainHeadline);
        setEditableSubtitle(newProj.generatedDetails.subtitle);
        setEditableProblemQuestion(newProj.generatedDetails.problemQuestion);
        setEditableProblemAnswer(newProj.generatedDetails.problemAnswer);
        
        // Wait 1.0s more to let user admire the animation, then state-switch
        setTimeout(() => {
          setCurrentView("result");
        }, 1000);
      } else {
        throw new Error("No landing page details returned");
      }
    } catch (err) {
      console.error("Failed to generate page. Running high-quality local generator...", err);
      // Fallback
      setTimeout(() => {
        const fallbackDetails: GeneratedDetails = {
          mainHeadline: `단 한 번의 터치로 하루 종일 시원하게,\n${name}`,
          subtitle: `${painPoints[0] || '쉽게 흐트러지는 온도'}로 스트레스받던 일상은 이제 끝. 매 순간 새것 같은 사용성을 드리겠습니다.`,
          problemQuestion: `"${targetCustomer}들의 소중한 매일, 온전히 지켜지고 있을까요?"`,
          problemAnswer: `지속되는 불쾌함을 막기 위해 당사 R&D 부서에서 설계한 독장적인 에코 다용도 배리어 기술을 탑재했습니다. 흘러내림 걱정 없이 오직 당신의 리듬에 완벽하게 일체화됩니다.`,
          imageAlt: "Stunning professional display image fit for high CRO details page.",
          imagePrompt: `A gorgeous minimalist modern layout of ${name} with elegant ambient lights, water drop studio macro style.`,
          imageHotlink: category.includes("뷰티") 
            ? "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600" 
            : category.includes("식품") 
            ? "https://images.unsplash.com/photo-1610970881699-44a5587caa9a?q=80&w=600"
            : category.includes("의류") 
            ? "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=600"
            : category.includes("가전") 
            ? "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600"
            : "https://images.unsplash.com/photo-1514156673643-cdfefc440a7a?q=80&w=600",
          usps: [
            { title: usPs[0] || "24시간 극대화 밀착", description: "새로운 스마트 이중 진공 캡으로 강력 보정 유지합니다.", icon: "snowflake" },
            { title: usPs[1] || "100% 한방울 차단 밀봉", description: "언제 어디서 흔들든지 절대로 새어나오거나 이물질이 침투할 수 없습니다.", icon: "lock" },
            { title: usPs[2] || "지속가능 하이엔드 마크", description: "그 자체로 빛나는 최상의 내구성 및 친환경 안전 공법.", icon: "leaf" }
          ]
        };

        const newProj: Project = {
          id: "proj_" + Date.now(),
          productInfo: { name, category, targetCustomer, painPoints, usPs },
          generatedDetails: fallbackDetails,
          updatedAt: "방금 수정"
        };
        
        setActiveProject(newProj);
        setProjects(prev => [newProj, ...prev]);
        setEditableHeadline(newProj.generatedDetails.mainHeadline);
        setEditableSubtitle(newProj.generatedDetails.subtitle);
        setEditableProblemQuestion(newProj.generatedDetails.problemQuestion);
        setEditableProblemAnswer(newProj.generatedDetails.problemAnswer);
        setCurrentView("result");
      }, 1500);
    }
  };

  // Handle AI Landing Page Diagnosis
  const handleDiagnosePage = async () => {
    if (!diagnosisContent.trim() && !diagnosisUrl.trim()) {
      showToast("분석할 상세페이지 내용이나 URL을 입력해 주세요!");
      return;
    }

    setCurrentView("diagnosis-loading");
    setDiagnosisLoadingText("기존 상세페이지의 흐름과 요소를 확보하여 분석하고 있습니다...");

    const logDiagResult = (score: number) => {
      const diagStatus = score >= 90 ? "최적" : (score >= 70 ? "개선필요" : "취약");
      const newLog = {
        id: "diag_" + Date.now(),
        email: user ? user.email : "guest@sellingpage.co.kr",
        prdName: diagnosisPrdName || "임시 상품 상세 페이지",
        category: diagnosisCategory,
        score: score,
        status: diagStatus,
        date: new Date().toISOString().replace("T", " ").substring(0, 16)
      };
      const updatedHistory = [newLog, ...diagnosisHistory];
      setDiagnosisHistory(updatedHistory);
      localStorage.setItem("selling_page_diagnosis_history", JSON.stringify(updatedHistory));
    };

    try {
      const response = await fetch("/api/diagnose-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          url: diagnosisUrl, 
          content: diagnosisContent, 
          productName: diagnosisPrdName, 
          category: diagnosisCategory 
        }),
      });

      const data = await response.json();
      if (data.report) {
        setDiagnosisReport(data.report);
        logDiagResult(data.report.score || 80);
        // Add a slight delay for better experience
        setTimeout(() => {
          setCurrentView("diagnosis-result");
        }, 1200);
      } else {
        throw new Error("No report returned");
      }
    } catch (err) {
      console.error("Diagnosis call failed, creating elegant auto-diagnosis", err);
      // Nice auto fallback
      setTimeout(() => {
        const fallbackReport: DiagnosisReport = {
          score: 75,
          overallVerdict: `분석 결과, 현재 "${diagnosisPrdName || "입력하신 상품"}" 상세페이지는 성실한 정보 전달력이 매우 우수하나, 고객과의 정서적 교감이나 첫 눈에 압도하는 후킹 카피 밀도가 다소 부족해 구매 전환율이 정체될 우려가 있습니다.`,
          metrics: {
            hook: { score: 68, status: "개선필요", feedback: "상단 비주얼 영역에 즉각적인 효용성을 각인해 줄 '초강력 자극 카피'를 배치하여 초반 이탈을 막아내야 합니다." },
            agitation: { score: 62, status: "취약", feedback: "문제를 지적하는 공감 영역이 너무 짧거나 사실 나열에 가깝습니다. 고객의 마음을 아프게 건들 자극 기법을 써보세요." },
            clarity: { score: 85, status: "우수", feedback: "실체적인 USP 구성과 기술 설명은 대단히 완성도가 높고 직관적입니다." },
            readability: { score: 78, status: "보통", feedback: "줄글을 살짝 더 끊어주고, 핵심 문구에 하이라이트 처리를 입히면 모바일 엄지 스크롤 피로도를 확 낮출 수 있습니다." }
          },
          beforeAfterCopys: [
            {
              sectionName: "메인 인트로 헤드 카피",
              before: diagnosisContent ? diagnosisContent.substring(0, 40) + "..." : "평범한 제품 명칭 및 기능 단순 서술 문장",
              after: `"집에서 쓰는 일반적인 제품들이 금방 실망을 주는 이유, 한 분 한 분의 소중한 의견을 모아 완벽하게 리모델링했습니다."`
            },
            {
              sectionName: "고객 고민 공감 섹션",
              before: "해당 제품군을 쓰면서 겪게 되는 일반적인 단점 설명",
              after: `"출근해서 맛본 한 모금의 짜릿함이 퇴근시간까지 이어지지 못하고 싱겁게 변해버린 씁쓸함... 당신도 겪어보지 않았나요?"`
            }
          ],
          recommendations: [
            "첫 화면 헤드라인 부분에 평서문 대신 3초 안에 생각에 잠기도록 유도하는 '질문형 카피'를 적용하십시오.",
            "고품격 패키지와 디테일한 NFC 공정 컷을 크고 시원하게 배치해 심미적 만족도를 보완하세요.",
            "고객 실사용 리뷰와 실측 비교표를 중반 최적의 흐름에 삽입하여 구매 확신을 불어넣으세요."
          ]
        };
        setDiagnosisReport(fallbackReport);
        logDiagResult(75);
        setCurrentView("diagnosis-result");
      }, 1500);
    }
  };

  // Add USP
  const handleAddUSP = () => {
    if (tempUSP.trim()) {
      setUsPs([...usPs, tempUSP.trim()]);
      setTempUSP("");
    }
  };

  // Remove USP
  const handleRemoveUSP = (index: number) => {
    setUsPs(usPs.filter((_, i) => i !== index));
  };

  // Add Pain Point
  const handleAddPainPoint = () => {
    if (tempPainPoint.trim()) {
      setPainPoints([...painPoints, tempPainPoint.trim()]);
      setTempPainPoint("");
    }
  };

  // Remove Pain Point
  const handleRemovePainPoint = (index: number) => {
    setPainPoints(painPoints.filter((_, i) => i !== index));
  };

  // Select project to view
  const handleSelectProject = (project: Project) => {
    setActiveProject(project);
    setEditableHeadline(project.generatedDetails.mainHeadline);
    setEditableSubtitle(project.generatedDetails.subtitle);
    setEditableProblemQuestion(project.generatedDetails.problemQuestion);
    setEditableProblemAnswer(project.generatedDetails.problemAnswer);
    setCurrentView("result");
  };

  // Delete project
  const handleDeleteProject = (id: string, e: any) => {
    e.stopPropagation();
    setProjects(projects.filter(p => p.id !== id));
  };

  // Load template content and navigate to Step 1
  const handleLoadTemplate = (temp: any) => {
    setName(temp.productName);
    setCategory(temp.category);
    setTargetCustomer(temp.targetCustomer);
    setPainPoints(temp.painPoints);
    setUsPs(temp.usps);
    setCurrentView("form-step-1");
    showToast(`"${temp.title}" 템플릿 정보가 완벽히 연동되었습니다! 수정 및 추가 입력이 가능합니다.`);
  };

  // Save edits on the result detail page
  const handleSaveEdits = () => {
    if (!activeProject) return;

    const updatedProj: Project = {
      ...activeProject,
      generatedDetails: {
        ...activeProject.generatedDetails,
        mainHeadline: editableHeadline,
        subtitle: editableSubtitle,
        problemQuestion: editableProblemQuestion,
        problemAnswer: editableProblemAnswer
      },
      updatedAt: "방금 수정"
    };

    setActiveProject(updatedProj);
    
    // Update in projects list
    setProjects(prev => {
      const idx = prev.findIndex(p => p.id === activeProject.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = updatedProj;
        return copy;
      } else {
        return [updatedProj, ...prev];
      }
    });

    setIsEditingMode(false);
  };

  // Custom icon renderer
  const getUspIcon = (iconName: string) => {
    switch (iconName) {
      case "snowflake": return <Snowflake className="w-6 h-6 text-primary" />;
      case "lock": return <Lock className="w-6 h-6 text-primary" />;
      case "leaf": return <Leaf className="w-6 h-6 text-primary" />;
      case "battery": return <Battery className="w-6 h-6 text-primary" />;
      case "flame": return <Flame className="w-6 h-6 text-primary" />;
      case "shield": return <Shield className="w-6 h-6 text-primary" />;
      case "heart": return <Heart className="w-6 h-6 text-primary" />;
      case "zap": return <Zap className="w-6 h-6 text-primary" />;
      default: return <Sparkles className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <div 
      id="selling_page_app" 
      className={`flex justify-center items-start min-h-screen bg-[#f3f4f8] transition-all duration-300 ${
        isDesktopLayout ? "md:p-0" : "md:p-6"
      }`}
    >
      
      {/* Dynamic Desktop Layout Switcher Toolbar (Only visible on Desktop Screens) */}
      <div className="hidden md:flex fixed top-4 right-6 z-[99] bg-white/95 backdrop-blur-md border border-gray-200/90 p-1.5 rounded-2xl shadow-lg items-center gap-1.5 font-sans">
        <span className="text-[10px] font-bold text-gray-500 pl-2.5 pr-1 select-none">화면 모드:</span>
        <button
          onClick={() => {
            setIsDesktopLayout(false);
            showToast("모바일 시뮬레이터 뷰로 전환완료!");
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            !isDesktopLayout 
              ? "bg-[#7000bf] text-white shadow-sm" 
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>모바일 화면</span>
        </button>
        <button
          onClick={() => {
            setIsDesktopLayout(true);
            showToast("데스크톱 와이드 에디터/대시보드로 전환완료!");
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            isDesktopLayout 
              ? "bg-[#7000bf] text-white shadow-sm" 
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>데스크톱 모드</span>
        </button>
      </div>

      {/* Wrapper to look like a premium app container on desktop, fluid on mobile */}
      <div 
        className={`w-full bg-[#f9f9ff] relative flex flex-col transition-all duration-300 ${
          isDesktopLayout 
            ? "max-w-md md:max-w-full md:min-h-screen md:rounded-none md:shadow-none md:border-none" 
            : "max-w-md min-h-screen shadow-2xl border-x border-[#eee] bg-white"
        }`}
      >
        
        {/* VIEW 1: INTRO LANDING SCREEN */}
        {currentView === "intro" && (
          <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#f9f9ff] to-[#f3f0fc] w-full font-sans">
            
            {/* Global Header (Displays as premium wide bar on Desktop, default branding on Mobile) */}
            <header className="w-full bg-white/80 backdrop-blur-md border-b border-[#f0f0f5] px-6 py-4 md:px-10 md:py-4 flex items-center justify-between sticky top-0 z-40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5300b7] to-[#800cf2] flex items-center justify-center text-white shrink-0 shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h1 className="text-lg md:text-xl font-display font-black text-primary tracking-tight">팔리는페이지</h1>
                <span className="hidden md:inline-block bg-primary/10 text-primary text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ml-1.5 leading-none">
                  v2.8
                </span>
              </div>



              {/* Header Right Action Corner */}
              <div className="flex items-center gap-3">
                {user ? (
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block text-xs text-gray-500 font-bold">
                      <strong>{user.name}</strong> 사장님
                    </span>
                    <button
                      onClick={() => {
                        setCurrentView("dashboard");
                        showToast("대시보드로 편리하게 이동했습니다!");
                      }}
                      className="bg-primary hover:bg-[#410091] text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>대시보드</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setCurrentView("login")} 
                      className="text-xs font-extrabold text-[#5300b7] hover:bg-primary/5 px-4 py-2 rounded-xl transition-all cursor-pointer"
                    >
                      로그인
                    </button>
                    <button 
                      onClick={() => setCurrentView("signup")} 
                      className="hidden sm:inline-block bg-primary hover:bg-[#410091] text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
                    >
                      무료 체험 가입
                    </button>
                  </div>
                )}
                <HelpCircle className="w-5 h-5 text-gray-400 md:hidden" />
              </div>
            </header>

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col justify-between ${
              isDesktopLayout 
                ? "md:grid md:grid-cols-2 md:gap-14 md:items-start md:px-14 md:py-12 w-full max-w-7xl mx-auto" 
                : "px-6 py-6"
            }`}>
              
              {/* Left Column (Core Messaging / Headlines & CTA) */}
              <div className={`flex flex-col justify-center ${
                isDesktopLayout ? "space-y-8 md:pt-6 text-left" : "space-y-6 pt-2 text-center"
              }`}>
                
                {/* Visual Label Banner */}
                <div className={`flex ${isDesktopLayout ? "justify-start" : "justify-center"}`}>
                  <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest leading-none">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    <span>국내 최초 CRO기반 상세 카피 라이터</span>
                  </span>
                </div>

                {/* Hook display typography */}
                <div className="space-y-3.5">
                  <h2 className="text-2xl md:text-3.5xl font-display font-extrabold text-gray-900 leading-snug md:leading-tight tracking-tight">
                    상품 정보만 입력하세요.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#800cf2]">AI가 팔리는 상세페이지</span>를 만듭니다.
                  </h2>
                  <p className="text-xs md:text-base text-gray-500 font-sans leading-relaxed md:max-w-md">
                    스마트스토어, 쿠팡, 자사몰 판매자를 위해 이탈율을 철저히 분석하고 잠재고객의 가치를 일깨우는 1:1 맞춤형 구매전환율 최적화(CRO) 솔루션입니다.
                  </p>
                </div>

                {/* USP Grid Cards */}
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto md:mx-0">
                  <div className="bg-white border border-[#f0f0f5] rounded-2xl p-3.5 flex items-center gap-3 shadow-xs hover:shadow-md transition-all">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-lg font-bold">bolt</span>
                    </div>
                    <div className="text-left">
                      <span className="text-[11px] font-black text-gray-800 block">5분 완성</span>
                      <span className="text-[8px] text-gray-400 block">초고속 즉시 생성</span>
                    </div>
                  </div>
                  <div className="bg-white border border-[#f0f0f5] rounded-2xl p-3.5 flex items-center gap-3 shadow-xs hover:shadow-md transition-all">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-[#10b981] shrink-0">
                      <span className="material-symbols-outlined text-lg font-bold">verified</span>
                    </div>
                    <div className="text-left">
                      <span className="text-[11px] font-black text-gray-800 block">검증된 공식</span>
                      <span className="text-[8px] text-gray-400 block">매출 극대화 이탈방지</span>
                    </div>
                  </div>
                </div>

                {/* Launch CTA buttons */}
                <div className="space-y-3 max-w-md mx-auto md:mx-0 w-full">
                  <button 
                    id="btn_start"
                    onClick={() => {
                      setCurrentView("dashboard");
                      showToast("체험 모드로 입장완료! 상세페이지 제작 및 실시간 자가진단을 자유롭게 이용해 보세요.");
                    }}
                    className="w-full bg-primary hover:bg-[#410091] text-white font-extrabold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:shadow-[0_10px_20px_rgba(83,0,183,0.25)] transition-all duration-300 active:scale-[98%] cursor-pointer"
                  >
                    <span>매출 폭발 상세페이지 만들기</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  
                  <div className={`${isDesktopLayout ? "text-left pl-1" : "text-center"} text-xs text-gray-400`}>
                    이미 계정이 가입되어 있으신가요?{" "}
                    <span onClick={() => setCurrentView("login")} className="font-bold text-primary cursor-pointer hover:underline">
                      지금 바로 로그인하기
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Column (Phone interactive preview mockup aligned perfectly next to content) */}
              <div className={`flex flex-col items-center justify-center py-6 md:py-0 shrink-0 ${
                isDesktopLayout ? "md:pt-6" : ""
              }`}>
                <div className="relative w-64 h-96 md:w-72 md:h-[450px] bg-[#1d1236] rounded-[36px] p-3 shadow-2xl border-4 border-gray-800/90 overflow-hidden transform hover:scale-[1.03] hover:rotate-1 transition-all duration-300">
                  {/* Speaker slot styling inside device notch */}
                  <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-gray-900 rounded-full z-20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
                  </div>

                  {/* Floating tags with subtle animation */}
                  <div className="absolute top-12 -left-3 bg-white text-primary text-[10px] md:text-xs font-black py-2 px-3 rounded-xl shadow-md border border-gray-100 z-10 animate-bounce" style={{ animationDuration: '3s' }}>
                    ✨ AI 문구 생성
                  </div>
                  <div className="absolute bottom-20 -right-3 bg-white text-primary text-[10px] md:text-xs font-black py-2 px-3 rounded-xl shadow-md border border-gray-100 z-10 animate-bounce" style={{ animationDuration: '4s' }}>
                    🎯 구매 최적화 (CRO)
                  </div>

                  {/* Simulated real-time detail page layout inside screen */}
                  <div className="w-full h-full bg-[#f9f9ff] rounded-[28px] p-4 flex flex-col justify-between border border-gray-100/30 relative overflow-hidden">
                    <div className="h-1.5 w-10 bg-gray-300 rounded-full mx-auto mb-3" />
                    
                    {/* Simulated Logo brand */}
                    <div className="space-y-1">
                      <div className="h-5 w-5 bg-primary/10 rounded-full mx-auto" />
                      <div className="h-2 w-14 bg-gray-300 rounded-full mx-auto" />
                    </div>

                    {/* Headline wireframe */}
                    <div className="space-y-1 mt-2">
                      <div className="h-3 w-5/6 bg-[#7000bf]/20 rounded mx-auto" />
                      <div className="h-3 w-2/3 bg-[#7000bf]/25 rounded mx-auto" />
                    </div>

                    {/* Image wireframe */}
                    <div className="w-full h-2/5 bg-gradient-to-tr from-[#ebddff] to-[#f4ebff] rounded-2xl flex items-center justify-center my-3 shadow-xs">
                      <Sparkles className="w-7 h-7 text-primary opacity-60 animate-pulse" />
                    </div>

                    {/* Subtext wireframe */}
                    <div className="space-y-1.5">
                      <div className="h-1.5 w-11/12 bg-gray-200 rounded mx-auto" />
                      <div className="h-1.5 w-4/5 bg-gray-200 rounded mx-auto" />
                    </div>

                    {/* Button wireframe clickable feedback */}
                    <div 
                      onClick={() => {
                        setCurrentView("dashboard");
                        showToast("무료 체험 모드로 진단 및 제작 페이지로 편리하게 안내해 드립니다!");
                      }}
                      className="w-full h-10 bg-primary hover:bg-[#410091] rounded-xl flex items-center justify-center text-[10px] text-white font-extrabold mt-2 cursor-pointer shadow-sm active:scale-95 transition-transform"
                    >
                      무료 분석 체험하기 &gt;
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* VIEW 1.5: LOGIN SCREEN */}
        {currentView === "login" && (
          <div className="flex flex-col min-h-screen bg-[#f9f9ff] font-sans w-full">
            {isDesktopLayout && (
              <header className="w-full bg-white border-b border-[#f0f0f5] px-8 py-4 flex items-center justify-between sticky top-0 z-40 bg-white/80 backdrop-blur-md">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView("intro")}>
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5300b7] to-[#800cf2] flex items-center justify-center text-white shrink-0 shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h1 className="text-lg md:text-xl font-display font-black text-primary tracking-tight">팔리는페이지</h1>
                </div>
                <button onClick={() => setCurrentView("intro")} className="text-xs font-bold text-gray-500 hover:text-primary flex items-center gap-1 cursor-pointer">
                  <ArrowLeft className="w-4 h-4" />
                  <span>소개 화면으로 돌아가기</span>
                </button>
              </header>
            )}
            <div className="flex-grow flex justify-center items-center p-6 md:bg-gradient-to-b md:from-[#f9f9ff] md:to-[#f3f0fc] w-full">
              <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 shadow-xl p-8 relative space-y-6">
              
              {/* Back to intro button */}
              <button 
                onClick={() => {
                  setCurrentView("intro");
                  setLoginPassword("");
                }}
                className="absolute top-6 left-6 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="text-center space-y-1 pt-4">
                <span className="bg-primary/10 text-primary text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">AI 상세페이지 메이커</span>
                <h2 className="text-xl font-display font-extrabold text-gray-900 tracking-tight mt-2">로그인</h2>
                <p className="text-[11px] text-gray-400">계정에 로그인하고 판매전략을 이어서 관리하세요</p>
              </div>

              {/* Login fields */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!loginEmail.trim() || !loginEmail.includes("@")) {
                    showToast("올바른 이메일 형식을 입력하세요.");
                    return;
                  }
                  if (!loginPassword || loginPassword.length < 4) {
                    showToast("비밀번호는 4자 이상 입력해야 합니다.");
                    return;
                  }
                  
                  // Login success
                  const username = loginEmail.split("@")[0] || "김사장님";
                  const authenticatedUser = { email: loginEmail, name: username };
                  setUser(authenticatedUser);
                  localStorage.setItem("selling_page_user", JSON.stringify(authenticatedUser));

                  // Ensure user is in the list of all registered users
                  if (!allUsers.some(u => u.email === loginEmail)) {
                    const newUserObj = {
                      email: loginEmail,
                      name: username,
                      date: new Date().toISOString().split("T")[0],
                      role: loginEmail === "redsunhi08@gmail.com" ? "우수회원" : "일반회원",
                      projectsCount: projects.length || 3
                    };
                    const updatedAllUsers = [newUserObj, ...allUsers];
                    setAllUsers(updatedAllUsers);
                    localStorage.setItem("selling_page_all_users", JSON.stringify(updatedAllUsers));
                  }

                  showToast(`반가워요, ${username} 사장님! 로그인되었습니다.`);
                  setCurrentView("dashboard");
                  setLoginPassword("");
                }}
                className="space-y-4 text-left"
              >
                {/* Email field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 block pl-1">이메일 주소</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-gray-400" />
                    </div>
                    <input 
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="example@yourstore.com"
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 block pl-1">비밀번호</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-4 h-4 text-gray-400" />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="비밀번호를 입력하세요"
                      className="w-full pl-9 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Info Tip Banner */}
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-[10px] text-primary/80 font-sans leading-relaxed flex items-start gap-1.5 select-none">
                  <span className="material-symbols-outlined text-[13px] shrink-0 mt-0.5">info</span>
                  <span>
                    <strong>데모 로그인 팁:</strong> 사용자 편의를 위해 사장님의 이메일(<strong>redsunhi08@gmail.com</strong>)이 입력되어 있습니다. 비밀번호(4자 이상)를 적어주시면 즉시 접속됩니다.
                  </span>
                </div>

                {/* Form buttons */}
                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-[#410091] text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all active:scale-[98%] cursor-pointer"
                >
                  로그인 <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Link to sign up */}
              <div className="text-center text-[11px] text-gray-400 pt-2 border-t border-gray-100">
                아직 계정이 없으신가요?{" "}
                <button 
                  onClick={() => {
                    setCurrentView("signup");
                    setLoginPassword("");
                    setSignupPassword("");
                  }}
                  className="font-bold text-primary hover:underline cursor-pointer"
                >
                  무료 회원가입
                </button>
              </div>

            </div>
          </div>
          </div>
        )}

        {/* VIEW 1.6: SIGNUP SCREEN */}
        {currentView === "signup" && (
          <div className="flex flex-col min-h-screen bg-[#f9f9ff] font-sans w-full">
            {isDesktopLayout && (
              <header className="w-full bg-white border-b border-[#f0f0f5] px-8 py-4 flex items-center justify-between sticky top-0 z-40 bg-white/80 backdrop-blur-md">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView("intro")}>
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5300b7] to-[#800cf2] flex items-center justify-center text-white shrink-0 shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h1 className="text-lg md:text-xl font-display font-black text-primary tracking-tight">팔리는페이지</h1>
                </div>
                <button onClick={() => setCurrentView("intro")} className="text-xs font-bold text-gray-500 hover:text-primary flex items-center gap-1 cursor-pointer">
                  <ArrowLeft className="w-4 h-4" />
                  <span>소개 화면으로 돌아가기</span>
                </button>
              </header>
            )}
            <div className="flex-grow flex justify-center items-center p-6 md:bg-gradient-to-b md:from-[#f9f9ff] md:to-[#f3f0fc] w-full">
              <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 shadow-xl p-8 relative space-y-6">
              
              {/* Back to login button */}
              <button 
                onClick={() => {
                  setCurrentView("login");
                  setSignupPassword("");
                }}
                className="absolute top-6 left-6 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="text-center space-y-1 pt-4">
                <span className="bg-[#10b981]/10 text-[#10b981] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">회원가입</span>
                <h2 className="text-xl font-display font-extrabold text-[#111] tracking-tight mt-2">무료 계정 생성</h2>
                <p className="text-[11px] text-gray-400">단 5초만에 가입하고 바로 AI 상세페이지를 빌드하세요</p>
              </div>

              {/* Signup form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!signupName.trim()) {
                    showToast("이름(상호명)을 입력해 주세요.");
                    return;
                  }
                  if (!signupEmail.trim() || !signupEmail.includes("@")) {
                    showToast("올바른 이메일 형식을 작성하세요.");
                    return;
                  }
                  if (!signupPassword || signupPassword.length < 4) {
                    showToast("비밀번호는 4자 이상 입력해 주세요.");
                    return;
                  }
                  
                  // Signup & Auto login success
                  const authenticatedUser = { email: signupEmail, name: signupName };
                  setUser(authenticatedUser);
                  localStorage.setItem("selling_page_user", JSON.stringify(authenticatedUser));
                  
                  // Save user to the list of all registered users
                  const newUserObj = {
                    email: signupEmail,
                    name: signupName,
                    date: new Date().toISOString().split("T")[0],
                    role: "일반회원",
                    projectsCount: 1
                  };
                  const updatedAllUsers = [newUserObj, ...allUsers.filter(u => u.email !== signupEmail)];
                  setAllUsers(updatedAllUsers);
                  localStorage.setItem("selling_page_all_users", JSON.stringify(updatedAllUsers));

                  showToast(`회원가입 완료! 반가워요, ${signupName} 사장님.`);
                  setCurrentView("dashboard");
                  setSignupPassword("");
                }}
                className="space-y-4 text-left"
              >
                {/* Name/Store field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 block pl-1">이름 또는 스토어명</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                    <input 
                      type="text"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder="김사장 (또는 상점명)"
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 block pl-1">이메일 주소</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-gray-400" />
                    </div>
                    <input 
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="yourstore@example.com"
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 block pl-1">비밀번호 설정</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-4 h-4 text-gray-400" />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="4자 이상의 비밀번호 지정"
                      className="w-full pl-9 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] transition-all font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <button 
                  type="submit"
                  className="w-full bg-[#10b981] hover:bg-[#0d9466] text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all active:scale-[98%] cursor-pointer"
                >
                  가입 및 즉시 시작 <Check className="w-4 h-4" />
                </button>
              </form>

              {/* Link to login */}
              <div className="text-center text-[11px] text-gray-400 pt-2 border-t border-gray-100">
                이미 가입된 계정이 있으신가요?{" "}
                <button 
                  onClick={() => {
                    setCurrentView("login");
                    setSignupPassword("");
                    setLoginPassword("");
                  }}
                  className="font-bold text-primary hover:underline cursor-pointer"
                >
                  로그인하기
                </button>
              </div>

            </div>
          </div>
          </div>
        )}

        {/* VIEW 2: DASHBOARD SCREEN */}
        {currentView === "dashboard" && (
          <div className="flex flex-col min-h-screen bg-[#f9f9ff] relative overflow-hidden w-full">
            {/* Widescreen Global Header for Dashboard when on Desktop Layout Mode */}
            {isDesktopLayout ? (
              <header className="w-full bg-white border-b border-[#f0f0f5] px-8 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-xs shrink-0 select-none font-sans">
                {/* Brand Logo */}
                <div 
                  className="flex items-center gap-2 cursor-pointer" 
                  onClick={() => setCurrentView("intro")}
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5300b7] to-[#800cf2] flex items-center justify-center text-white shrink-0 shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h1 className="text-lg md:text-xl font-display font-black text-primary tracking-tight">팔리는페이지</h1>
                  <span className="bg-primary/10 text-primary text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ml-1.5 leading-none">
                    v2.8
                  </span>
                </div>

                {/* Horizontal Desktop Menu Links */}
                <div className="flex items-center gap-6 text-xs font-bold text-gray-500">
                  {[
                    { key: "home", label: "실시간 홈 대시보드" },
                    { key: "projects", label: "프로젝트 보관함" },
                    { key: "templates", label: "매출 검증 공식" },
                    { key: "my", label: "AI 상세 자가진단" },
                    ...(user ? [{ key: "admin", label: "종합 관제 센터" }] : [])
                  ].map((tab) => {
                    const isActive = dashboardTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => {
                          setDashboardTab(tab.key as any);
                          showToast(`"${tab.label}"(으)로 이동했습니다!`);
                        }}
                        className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer font-extrabold ${
                          isActive 
                            ? "bg-primary/10 text-primary font-black scale-102 font-bold" 
                            : "hover:text-primary hover:bg-gray-50 text-gray-400"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Right Area Welcome & CTA */}
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400 font-bold hidden lg:inline-block">
                    <strong className="text-gray-700">{user ? user.name : "김사장님"}</strong> 사장님
                  </span>
                  
                  <button 
                    onClick={() => {
                      setName("프리미엄 스테인리스 텀블러");
                      setCategory("생활/주방");
                      setTargetCustomer("2030 직장인, 환경 보호에 관심 많은 분");
                      setPainPoints(["얼음이 금방 녹아요", "가방에서 물이 새요"]);
                      setUsPs(["24시간 보냉", "완전 밀봉", "친환경 소재"]);
                      setCurrentView("form-step-1");
                    }}
                    className="bg-primary hover:bg-[#410091] text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>새 상세페이지 제작</span>
                  </button>

                  {user ? (
                    <button 
                      onClick={() => {
                        setUser(null);
                        localStorage.removeItem("selling_page_user");
                        setCurrentView("intro");
                        showToast("성공적으로 로그아웃 되었습니다.");
                      }}
                      className="text-gray-400 hover:text-red-500 text-xs font-bold transition-all cursor-pointer hover:underline"
                    >
                      로그아웃
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        setCurrentView("login");
                      }}
                      className="text-primary hover:underline text-xs font-bold transition-all cursor-pointer"
                    >
                      로그인/가입
                    </button>
                  )}
                </div>
              </header>
            ) : null}

            <div className={`bg-[#f9f9ff] relative overflow-hidden flex w-full flex-1 min-h-0 ${
              isDesktopLayout ? "flex-col md:flex-row h-[calc(100vh-64px)]" : "flex-col min-h-screen justify-between"
            }`}>
              
              {/* Desktop Left Sidebar Panel (Always visible on widescreen when in Desktop Layout Mode) */}
              {isDesktopLayout && (
                <div className="hidden md:flex w-64 bg-white flex-col border-r border-gray-100 font-sans flex-shrink-0 h-full">
                {/* Header profile area with premium gradient background */}
                <div className="bg-gradient-to-br from-[#7000bf] to-[#5300b7] text-white p-5 pt-7 pb-6 relative">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center p-0.5 border border-white/30 shadow-inner">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-extrabold text-xs tracking-tight">{user ? user.name : "김사장님"}</span>
                        <span className="bg-[#fad02c] text-[#7000bf] text-[8px] font-black px-1.5 py-0.5 rounded-full">우수회원</span>
                      </div>
                      <span className="text-[9px] text-white/75 mt-0.5 block truncate max-w-[130px]">{user ? user.email : "redsunhi08@gmail.com"}</span>
                    </div>
                  </div>

                  {/* Small Quick Status */}
                  <div className="mt-4 bg-white/10 border border-white/10 rounded-xl p-2.5 flex items-center justify-between text-[9px]">
                    <span className="text-white/80">CRO 최적화 진단 상태</span>
                    <span className="text-[#a4ffb6] font-extrabold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3aff60] animate-pulse"></span>
                      실시간 최상
                    </span>
                  </div>
                </div>

                {/* Navigation Menu Links */}
                <div className="flex-grow overflow-y-auto py-5 px-3 space-y-5">
                  <div className="space-y-1">
                    <span className="text-[9px] font-extrabold text-gray-400 opacity-80 uppercase tracking-widest pl-3 block mb-1">메인 네비게이션</span>
                    
                    {[
                      { key: "home", label: "실시간 홈 대시보드", icon: <Sparkles className="w-4 h-4" />, desc: "AI 추천 전략 및 요약 정보" },
                      { key: "projects", label: "프로젝트 보관함", icon: <FileText className="w-4 h-4" />, desc: "내가 생성한 상품 카피 목록" },
                      { key: "templates", label: "매출 검증 템플릿", icon: <TrendingUp className="w-4 h-4" />, desc: "대표적인 성공 사례 모음" },
                      { key: "my", label: "상세페이지 자가진단", icon: <CheckCircle2 className="w-4 h-4" />, desc: "필수 이탈 방지 체크리스트" },
                      ...(user ? [{ key: "admin", label: "종합 관리자 데스크", icon: <Shield className="w-4 h-4" />, desc: "고객 및 생성 데이터 통계 확인" }] : [])
                    ].map((item) => {
                      const isActive = dashboardTab === item.key;
                      return (
                        <button
                          key={item.key}
                          onClick={() => {
                            setDashboardTab(item.key as any);
                            showToast(`"${item.label}"(으)로 이동했습니다!`);
                          }}
                          className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                            isActive 
                              ? "bg-primary/10 text-primary border border-primary/10" 
                              : "hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-transparent"
                          }`}
                        >
                          <div className={`p-1 rounded-lg transition-colors ${
                            isActive ? "bg-[#7000bf] text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                          }`}>
                            {item.icon}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold font-sans">{item.label}</h4>
                            <p className="text-[8px] text-gray-400 mt-0.5 truncate">{item.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[9px] font-extrabold text-gray-400 opacity-80 uppercase tracking-widest pl-3 block mb-1">AI 원클릭 생산 팩토리</span>
                    
                    {/* 새 상세페이지 만들기 */}
                    <button 
                      onClick={() => {
                        setName("프리미엄 스테인리스 텀블러");
                        setCategory("생활/주방");
                        setTargetCustomer("2030 직장인, 환경 보호에 관심 많은 분");
                        setPainPoints(["얼음이 금방 녹아요", "가방에서 물이 새요"]);
                        setUsPs(["24시간 보냉", "완전 밀봉", "친환경 소재"]);
                        setCurrentView("form-step-1");
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 text-gray-700 text-left border border-transparent hover:border-gray-100 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1 px-1.5 rounded-lg bg-purple-50 text-purple-600">
                          <Plus className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold font-sans text-gray-800">새 상세페이지 제작</span>
                      </div>
                    </button>

                    {/* AI 상세페이지 진단 */}
                    <button 
                      onClick={() => {
                        setDiagnosisUrl("");
                        setDiagnosisContent("");
                        setDiagnosisPrdName("유기농 사과즙");
                        setDiagnosisCategory("식품");
                        setDiagnosisReport(null);
                        setCurrentView("diagnosis-input");
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 text-gray-700 text-left border border-transparent hover:border-gray-100 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1 px-1.5 rounded-lg bg-orange-50 text-orange-600">
                          <BarChart2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold font-sans text-gray-800">AI 상세 실시간 진단</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Footer region */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 text-[10px] text-gray-400 flex items-center justify-between mt-auto">
                  <span>버전 v1.3.4 (최신버전)</span>
                  {user ? (
                    <button 
                      onClick={() => {
                        setUser(null);
                        localStorage.removeItem("selling_page_user");
                        setCurrentView("intro");
                        showToast("성공적으로 로그아웃 되었습니다.");
                      }}
                      className="text-red-500 hover:underline font-bold"
                    >
                      로그아웃
                    </button>
                  ) : (
                    <button 
                      onClick={() => setCurrentView("login")}
                      className="text-primary hover:underline font-bold"
                    >
                      로그인/가입
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Right Pane Wrap representing the central panel contents */}
            <div className={`flex-grow flex-1 flex flex-col justify-between min-w-0 ${isDesktopLayout ? "md:max-h-[88vh] md:overflow-y-auto" : ""}`}>
            {/* Sidebar menu drawer */}
            <AnimatePresence>
              {isSidebarOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    key="sidebar-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute inset-0 bg-black z-40 transition-opacity"
                  />

                  {/* Sidebar Panel Drawer */}
                  <motion.div
                    key="sidebar-panel"
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 240 }}
                    className="absolute inset-y-0 left-0 w-72 bg-white z-50 shadow-2xl flex flex-col border-r border-gray-100 font-sans"
                  >
                    {/* Header profile area with premium gradient background */}
                    <div className="bg-gradient-to-br from-[#7000bf] to-[#5300b7] text-white p-5 pt-7 pb-6 relative">
                      <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-1 rounded-full transition-colors cursor-pointer flex items-center justify-center"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center p-0.5 border border-white/30 shadow-inner">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-sm tracking-tight">{user ? user.name : "김사장님"}</span>
                            <span className="bg-[#fad02c] text-[#7000bf] text-[9px] font-black px-1.5 py-0.5 rounded-full">우수회원</span>
                          </div>
                          <span className="text-[10px] text-white/75 mt-0.5 block truncate max-w-[150px]">{user ? user.email : "redsunhi08@gmail.com"}</span>
                        </div>
                      </div>

                      {/* Small Quick Status */}
                      <div className="mt-5 bg-white/10 border border-white/10 rounded-xl p-2.5 flex items-center justify-between text-[10px]">
                        <span className="text-white/80">CRO 최적화 진단 상태</span>
                        <span className="text-[#a4ffb6] font-extrabold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3aff60] animate-pulse"></span>
                          실시간 최상
                        </span>
                      </div>
                    </div>

                    {/* Navigation Menu Links */}
                    <div className="flex-grow overflow-y-auto py-5 px-3 space-y-6">
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest pl-3 block mb-2">메인 네비게이션</span>
                        
                        {[
                          { key: "home", label: "실시간 홈 대시보드", icon: <Sparkles className="w-4 h-4" />, desc: "AI 추천 전략 및 요약 정보" },
                          { key: "projects", label: "프로젝트 보관함", icon: <FileText className="w-4 h-4" />, desc: "내가 생성한 상품 카피 목록" },
                          { key: "templates", label: "매출 검증 템플릿", icon: <TrendingUp className="w-4 h-4" />, desc: "대표적인 성공 사례 모음" },
                          { key: "my", label: "상세페이지 자가진단", icon: <CheckCircle2 className="w-4 h-4" />, desc: "필수 이탈 방지 체크리스트" },
                          ...(user ? [{ key: "admin", label: "종합 관리자 데스크", icon: <Shield className="w-4 h-4" />, desc: "고객 및 생성 데이터 통계 확인" }] : [])
                        ].map((item) => {
                          const isActive = dashboardTab === item.key;
                          return (
                            <button
                              key={item.key}
                              onClick={() => {
                                setDashboardTab(item.key as any);
                                setIsSidebarOpen(false);
                                showToast(`"${item.label}"(으)로 이동했습니다!`);
                              }}
                              className={`w-full flex items-start gap-3 p-3 rounded-2xl text-left transition-all cursor-pointer group ${
                                isActive 
                                  ? "bg-primary/10 text-primary border border-primary/10" 
                                  : "hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-transparent"
                              }`}
                            >
                              <div className={`p-1.5 rounded-xl transition-colors ${
                                isActive ? "bg-[#7000bf] text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                              }`}>
                                {item.icon}
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-xs font-bold font-sans">{item.label}</h4>
                                <p className="text-[9px] text-gray-400 mt-0.5 truncate">{item.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest pl-3 block mb-2">AI 원클릭 생산 팩토리</span>
                        
                        {/* 새 상세페이지 만들기 */}
                        <button 
                          onClick={() => {
                            setName("프리미엄 스테인리스 텀블러");
                            setCategory("생활/주방");
                            setTargetCustomer("2030 직장인, 환경 보호에 관심 많은 분");
                            setPainPoints(["얼음이 금방 녹아요", "가방에서 물이 새요"]);
                            setUsPs(["24시간 보냉", "완전 밀봉", "친환경 소재"]);
                            setCurrentView("form-step-1");
                            setIsSidebarOpen(false);
                          }}
                          className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 text-gray-700 text-left border border-transparent hover:border-gray-100 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-xl bg-purple-50 text-purple-600">
                              <Plus className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold font-sans text-gray-800">새 상세페이지 제작</span>
                          </div>
                          <span className="bg-[#ff4b4b]/10 text-[#ff3a3a] text-[8px] font-black px-1.5 py-0.5 rounded-md">추천</span>
                        </button>

                        {/* AI 상세페이지 진단 */}
                        <button 
                          onClick={() => {
                            setDiagnosisUrl("");
                            setDiagnosisContent("");
                            setDiagnosisPrdName("유기농 사과즙");
                            setDiagnosisCategory("식품");
                            setDiagnosisReport(null);
                            setCurrentView("diagnosis-input");
                            setIsSidebarOpen(false);
                          }}
                          className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 text-gray-700 text-left border border-transparent hover:border-gray-100 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-xl bg-orange-50 text-orange-600">
                              <BarChart2 className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold font-sans text-gray-800">AI 상세 실시간 진단</span>
                          </div>
                          <span className="bg-primary/10 text-primary text-[8px] font-black px-1.5 py-0.5 rounded-md">프로</span>
                        </button>
                      </div>

                      {/* Portal & Return to Intro */}
                      <div className="space-y-1.5 pt-2 border-t border-gray-100">
                        <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest pl-3 block mb-1">안내 및 뒤로가기</span>
                        <button 
                          onClick={() => {
                            setCurrentView("intro");
                            setIsSidebarOpen(false);
                            showToast("첫 화면(소개 페이지)으로 이동했습니다.");
                          }}
                          className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 text-gray-700 text-left border border-transparent hover:border-gray-100 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                              <ArrowLeft className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold font-sans text-gray-800">인트로 첫화면으로</span>
                          </div>
                          <span className="bg-blue-50 text-blue-600 text-[8px] font-bold px-1.5 py-0.5 rounded-md">이동</span>
                        </button>
                      </div>
                    </div>

                    {/* Footer region */}
                    <div className="p-4 border-t border-gray-100 bg-gray-50 text-[10px] text-gray-400 flex items-center justify-between">
                      <span>버전 v1.3.4 (안심 최신버전)</span>
                      {user ? (
                        <button 
                          onClick={() => {
                            setIsSidebarOpen(false);
                            setUser(null);
                            localStorage.removeItem("selling_page_user");
                            setCurrentView("intro");
                            showToast("성공적으로 로그아웃 되었습니다.");
                          }}
                          className="text-red-500 hover:underline font-bold"
                        >
                          로그아웃
                        </button>
                      ) : (
                        <button 
                          onClick={() => {
                            setIsSidebarOpen(false);
                            setCurrentView("login");
                          }}
                          className="text-primary hover:underline font-bold"
                        >
                          로그인/가입
                        </button>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Header bar */}
            {!isDesktopLayout && (
              <header className="sticky top-0 bg-white border-b border-[#eee] h-16 px-5 flex items-center justify-between z-10 shadow-sm">
                <div className="flex items-center gap-3">
                  <Menu onClick={() => setIsSidebarOpen(true)} className="w-6 h-6 text-primary cursor-pointer hover:scale-105 active:scale-95 transition-transform" />
                  <div 
                    className="flex items-center gap-1.5 cursor-pointer group" 
                    onClick={() => { 
                      if (dashboardTab === "home") { 
                        setCurrentView("intro"); 
                        showToast("첫 화면(소개 페이지)으로 이동했습니다."); 
                      } else { 
                        setDashboardTab("home"); 
                      } 
                    }}
                    title={dashboardTab === "home" ? "첫 화면으로 가기" : "홈 대시보드로 가기"}
                  >
                    <span className="text-base font-display font-extrabold text-primary group-hover:opacity-85 transition-opacity">
                      {dashboardTab === "home" && "팔리는페이지"}
                      {dashboardTab === "projects" && "프로젝트 보관함"}
                      {dashboardTab === "templates" && "매출 폭발 템플릿"}
                      {dashboardTab === "my" && "마이 상세진단"}
                      {dashboardTab === "admin" && "종합 관리자 데스크"}
                    </span>
                    {dashboardTab === "home" && (
                      <span className="text-[9px] bg-gray-100 text-gray-500 font-bold px-1.5 py-0.5 rounded-lg opacity-80 group-hover:bg-[#7000bf] group-hover:text-white transition-all ml-1 shrink-0">
                        첫화면가기
                      </span>
                    )}
                  </div>
                </div>
                <div 
                  onClick={() => { setDashboardTab("my"); showToast("마이 상세페이지 탭으로 이동했습니다!"); }}
                  className="bg-[#ebddff] p-1.5 rounded-full cursor-pointer hover:opacity-85"
                >
                  <User className="w-5 h-5 text-primary" />
                </div>
              </header>
            )}

            {/* Dashboard contents based on sub-tab */}
            <main className="flex-1 px-5 py-6 space-y-6 overflow-y-auto hide-scrollbar pb-24">
              
              {/* TAB 1: HOME TAB */}
              {dashboardTab === "home" && (
                <>
                  {/* Greetings */}
                  <div className="space-y-1">
                    <h2 className="text-2xl font-display font-extrabold text-gray-900 leading-tight">
                      안녕하세요, {user ? user.name : "김사장님"}!<br />
                      오늘 어떤 상품을 팔아볼까요?
                    </h2>
                    <p className="text-sm text-gray-500 font-sans">AI가 당신의 브랜드 상품을 베스트셀러로 만들어드려요.</p>
                  </div>

                  {/* Main Quick Action Cards */}
                  <div className="grid grid-cols-1 gap-3.5">
                    {/* 1. Create New details page */}
                    <button 
                      id="card_create_new"
                      onClick={() => {
                        // Reset to initial states to allow fresh input
                        setName("프리미엄 스테인리스 텀블러");
                        setCategory("생활/주방");
                        setTargetCustomer("2030 직장인, 환경 보호에 관심 많은 분");
                        setPainPoints(["얼음이 금방 녹아요", "가방에서 물이 새요"]);
                        setUsPs(["24시간 보냉", "완전 밀봉", "친환경 소재"]);
                        setCurrentView("form-step-1");
                      }}
                      className="flex flex-col items-start p-5 bg-gradient-to-r from-primary-container to-[#5300b7] text-white rounded-2xl shadow-md text-left w-full relative overflow-hidden group hover:shadow-lg transition-transform active:scale-[98%] cursor-pointer"
                    >
                      <div className="z-10 space-y-1.5">
                        <div className="bg-white/20 p-2 rounded-xl inline-block mb-1">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-display font-bold">새 상세페이지 만들기</h3>
                        <p className="text-xs text-white/80 font-sans">AI가 1분 만에 구매율을 극대화한 카피 초안을 작성합니다</p>
                      </div>
                      <div className="absolute right-[-14px] bottom-[-14px] opacity-10 group-hover:scale-110 transition-transform">
                        <Sparkles className="w-24 h-24 text-white" />
                      </div>
                    </button>

                    {/* 2. Page Diagnosis */}
                    <button 
                      onClick={() => {
                        setDiagnosisUrl("");
                        setDiagnosisContent("");
                        setDiagnosisPrdName("유기농 사과즙");
                        setDiagnosisCategory("식품");
                        setDiagnosisReport(null);
                        setCurrentView("diagnosis-input");
                      }}
                      className="flex flex-col items-start p-5 bg-white border border-[#e2e8f0] hover:bg-[#f8fafc] text-primary rounded-2xl shadow-sm text-left w-full relative overflow-hidden group transition-transform active:scale-[98%] cursor-pointer"
                    >
                      <div className="z-10 space-y-1.5">
                        <div className="bg-[#f1f3ff] p-2 rounded-xl inline-block mb-1">
                          <BarChart2 className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-display font-bold text-gray-900">AI 상세페이지 진단</h3>
                        <p className="text-xs text-gray-500 font-sans">기존 페이지 데이터를 분석하여 저조한 전환율 원인 파악!</p>
                      </div>
                      <div className="absolute right-[-14px] bottom-[-14px] opacity-5 group-hover:scale-110 transition-transform">
                        <BarChart2 className="w-24 h-24 text-primary" />
                      </div>
                    </button>
                  </div>

                  {/* Template Category cards list */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <h3 className="text-lg font-display font-bold text-gray-900">템플릿 추천</h3>
                      <span 
                        onClick={() => { setDashboardTab("templates"); showToast("템플릿 탐색 페이지로 이동했습니다!"); }} 
                        className="text-xs font-bold text-primary cursor-pointer hover:underline"
                      >
                        모두 보기
                      </span>
                    </div>

                    {/* Horizontal slider container */}
                    <div className="flex gap-3.5 overflow-x-auto hide-scrollbar -mx-5 px-5">
                      {PREMIUM_TEMPLATES.map((temp, i) => (
                        <div 
                          key={i} 
                          onClick={() => handleLoadTemplate(temp)}
                          className="flex-shrink-0 w-36 cursor-pointer group space-y-1.5"
                        >
                          <div className="w-full aspect-[3/4] bg-[#eae9f0] rounded-xl overflow-hidden relative border border-[#e2e8f0] shadow-sm transform group-hover:scale-[102%] transition-transform duration-300">
                            {!brokenImages[temp.img] ? (
                              <img 
                                src={temp.img} 
                                alt={temp.title} 
                                className="w-full h-full object-cover" 
                                referrerPolicy="no-referrer"
                                onError={() => handleImageError(temp.img)}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-3 text-center">
                                <Sparkles className="w-6 h-6 text-primary opacity-60 mb-1" />
                                <span className="text-[10px] font-bold text-primary truncate w-full">{temp.title}</span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            <span className="absolute bottom-2.5 left-2.5 text-white font-bold text-xs tracking-tight pointer-events-none">{temp.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent projects list */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <h3 className="text-lg font-display font-bold text-gray-900">최근 작업한 프로젝트</h3>
                      <span 
                        onClick={() => { setDashboardTab("projects"); showToast("전체 프로젝트 보관함으로 이동했습니다!"); }} 
                        className="text-xs font-bold text-primary cursor-pointer hover:underline"
                      >
                        전체 보기
                      </span>
                    </div>

                    <div className="space-y-3.5">
                      {projects.slice(0, 3).map((proj) => (
                        <div 
                          key={proj.id}
                          onClick={() => handleSelectProject(proj)}
                          className="p-4 bg-white border border-[#e2e8f0] rounded-2xl shadow-xs hover:shadow-md hover:border-primary/25 transition-all flex flex-col sm:flex-row gap-4 cursor-pointer active:bg-[#f1f3ff]/40 group"
                        >
                          {/* Left: Enlarged premium product cover image frame */}
                          <div className="w-full sm:w-28 h-28 sm:h-28 bg-[#f8fafc] rounded-xl flex-shrink-0 overflow-hidden relative border border-[#edf2f7] shadow-sm flex items-center justify-center">
                            {!brokenImages[proj.generatedDetails.imageHotlink] ? (
                              <img 
                                src={proj.generatedDetails.imageHotlink} 
                                alt={proj.productInfo.name} 
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                referrerPolicy="no-referrer"
                                onError={() => handleImageError(proj.generatedDetails.imageHotlink)}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-indigo-50/50 to-purple-50/50 flex flex-col items-center justify-center p-2 text-center">
                                <Sparkles className="w-5 h-5 text-primary opacity-50" />
                              </div>
                            )}
                            {/* Category badge anchored in top-left */}
                            <span className="absolute top-1.5 left-1.5 text-[9px] font-extrabold bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded-full z-10">
                              {proj.productInfo.category}
                            </span>
                          </div>

                          {/* Right: Rich structured info */}
                          <div className="flex-grow min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="font-extrabold text-gray-900 group-hover:text-primary transition-colors text-sm truncate">
                                  {proj.productInfo.name}
                                </h4>
                                <button 
                                  onClick={(e) => handleDeleteProject(proj.id, e)}
                                  title="삭제하기"
                                  className="p-1 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="flex items-center gap-1.5 text-gray-400 text-[10px] mt-0.5 font-sans">
                                <Clock className="w-3 h-3" />
                                <span>{proj.updatedAt}</span>
                              </div>

                              {proj.generatedDetails.mainHeadline && (
                                <div className="mt-2.5 bg-[#f8fbff] border border-blue-50/50 p-2.5 rounded-xl">
                                  <p className="text-xs text-gray-800 line-clamp-2 leading-relaxed font-sans font-medium italic">
                                    "{proj.generatedDetails.mainHeadline}"
                                  </p>
                                </div>
                              )}
                            </div>

                            <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap gap-1.5 items-center justify-between font-sans">
                              {proj.productInfo.targetCustomer && (
                                <span className="text-[10px] text-gray-500 font-medium truncate max-w-[180px]">
                                  🎯 {proj.productInfo.targetCustomer}
                                </span>
                              )}
                              <div className="flex gap-1 flex-wrap">
                                {(proj.generatedDetails.usps || []).slice(0, 2).map((u, uIdx) => (
                                  <span key={uIdx} className="text-[9px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded-md">
                                    {u.title}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: PROJECTS TAB */}
              {dashboardTab === "projects" && (
                <div className="space-y-4">
                  {/* Search and Category Filter section */}
                  <div className="bg-white p-4 border border-[#e2e8f0] rounded-2xl shadow-sm space-y-3 font-sans">
                    <div className="relative">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input 
                        type="text" 
                        placeholder="프로젝트 상품명으로 검색해보세요..."
                        value={projectSearchQuery}
                        onChange={(e) => setProjectSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-14 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white text-xs text-gray-900 outline-none"
                      />
                      {projectSearchQuery && (
                        <button 
                          onClick={() => setProjectSearchQuery("")}
                          className="absolute right-3 top-2 text-xs font-bold text-gray-400 hover:text-gray-600 bg-gray-200/50 hover:bg-gray-200 px-1.5 py-1 rounded-md"
                        >
                          지우기
                        </button>
                      )}
                    </div>

                    {/* Category quick selectors */}
                    <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pt-1">
                      {["전체", "식품", "뷰티/화장품", "의류/패션", "가전/디지털", "생활/주방"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setProjectCategoryFilter(cat)}
                          className={`text-[11px] font-bold px-3 py-1.5 rounded-xl cursor-pointer flex-shrink-0 transition-all ${
                            projectCategoryFilter === cat 
                              ? "bg-primary text-white shadow-xs" 
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filtered Projects listing */}
                  <div className="space-y-4 font-sans">
                    <div className="flex items-center justify-between ml-1 pb-1">
                      <span className="text-xs font-bold text-gray-500">
                        총 {projects.filter(p => {
                          const matchesSearch = p.productInfo.name.toLowerCase().includes(projectSearchQuery.toLowerCase());
                          const matchesCategory = projectCategoryFilter === "전체" || p.productInfo.category === projectCategoryFilter;
                          return matchesSearch && matchesCategory;
                        }).length}개의 페이지 발견됨
                      </span>
                    </div>

                    <div className="space-y-3.5">
                      {projects.filter(p => {
                        const matchesSearch = p.productInfo.name.toLowerCase().includes(projectSearchQuery.toLowerCase());
                        const matchesCategory = projectCategoryFilter === "전체" || p.productInfo.category === projectCategoryFilter;
                        return matchesSearch && matchesCategory;
                      }).length === 0 ? (
                        /* Empty project fallback */
                        <div className="bg-white border border-dashed border-gray-300 p-8 rounded-3xl text-center space-y-4 max-w-sm mx-auto">
                          <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400">
                            <span className="material-symbols-outlined text-[28px]">folder_off</span>
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-gray-800">일치하는 프로젝트가 없습니다</h4>
                            <p className="text-xs text-gray-400 mt-1 leading-relaxed">새 상세페이지 만들기 기능을 통해 매출을 불러오는 파워풀한 카피라이팅 기안을 작성해보세요.</p>
                          </div>
                          <button 
                            onClick={() => setCurrentView("form-step-1")}
                            className="text-xs font-bold bg-primary text-white px-4 py-2.5 rounded-xl shadow-xs inline-flex items-center gap-1.5 cursor-pointer hover:bg-[#410091]"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>첫 프로젝트 빌드하기</span>
                          </button>
                        </div>
                      ) : (
                        projects.filter(p => {
                          const matchesSearch = p.productInfo.name.toLowerCase().includes(projectSearchQuery.toLowerCase());
                          const matchesCategory = projectCategoryFilter === "전체" || p.productInfo.category === projectCategoryFilter;
                          return matchesSearch && matchesCategory;
                        }).map((proj) => (
                          <div 
                            key={proj.id}
                            onClick={() => handleSelectProject(proj)}
                            className="bg-white border p-4 border-gray-200 rounded-3xl relative overflow-hidden shadow-xs hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group flex flex-col sm:flex-row gap-4"
                          >
                            {/* Product cover image frame */}
                            <div className="w-full sm:w-28 h-28 sm:h-28 bg-[#f8fafc] rounded-2xl overflow-hidden relative border border-[#edf2f7] shadow-sm flex-shrink-0 flex items-center justify-center">
                              {!brokenImages[proj.generatedDetails.imageHotlink] ? (
                                <img 
                                  src={proj.generatedDetails.imageHotlink} 
                                  alt={proj.productInfo.name} 
                                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                  referrerPolicy="no-referrer"
                                  onError={() => handleImageError(proj.generatedDetails.imageHotlink)}
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-indigo-50/50 to-purple-50/50 flex flex-col items-center justify-center p-2 text-center">
                                  <Sparkles className="w-5 h-5 text-primary opacity-50" />
                                </div>
                              )}
                              <span className="absolute top-2 left-2 text-[9px] font-extrabold bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded-full z-10">
                                {proj.productInfo.category}
                              </span>
                            </div>

                            {/* Details text panel */}
                            <div className="flex-grow min-w-0 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start gap-3">
                                  <h4 className="font-extrabold text-gray-900 group-hover:text-primary transition-colors text-sm truncate">
                                    {proj.productInfo.name}
                                  </h4>
                                  <button 
                                    onClick={(e) => handleDeleteProject(proj.id, e)}
                                    title="삭제하기"
                                    className="p-1 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>

                                <div className="flex items-center gap-1.5 text-gray-400 text-[10px] mt-0.5">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>{proj.updatedAt}</span>
                                </div>

                                {proj.generatedDetails.mainHeadline && (
                                  <div className="mt-2 bg-[#f8fbff] border border-blue-50/50 p-2.5 rounded-xl">
                                    <p className="text-xs text-gray-800 line-clamp-2 leading-relaxed font-sans font-medium italic">
                                      "{proj.generatedDetails.mainHeadline}"
                                    </p>
                                  </div>
                                )}
                              </div>

                              <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap gap-1.5 items-center justify-between font-sans">
                                {proj.productInfo.targetCustomer && (
                                  <span className="text-[10px] text-gray-500 font-medium truncate max-w-[180px]">
                                    🎯 {proj.productInfo.targetCustomer}
                                  </span>
                                )}
                                <div className="flex gap-1 flex-wrap">
                                  {(proj.generatedDetails.usps || []).slice(0, 2).map((u, uIdx) => (
                                    <span key={uIdx} className="text-[9px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded-md">
                                      {u.title}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: TEMPLATES TAB */}
              {dashboardTab === "templates" && (
                <div className="space-y-4 font-sans">
                  {/* Category Header */}
                  <div className="bg-gradient-to-r from-primary to-[#7012ff] text-white p-5 rounded-3xl shadow-sm relative overflow-hidden">
                    <h4 className="text-base font-display font-extrabold">매출 검증 특화 템플릿 라이브러리</h4>
                    <p className="text-xs text-white/85 mt-1 leading-relaxed">수많은 기업 데이터를 기반으로 AI가 설계한 베스트 레이아웃입니다. 브랜드를 선택해서 복제본을 작성하세요.</p>
                    <Sparkles className="w-16 h-16 absolute right-[-14px] bottom-[-14px] text-white/10" />
                  </div>

                  {/* Horizontal Category selectors */}
                  <div className="flex gap-1.5 overflow-x-auto hide-scrollbar py-1">
                    {["전체", "식품", "뷰티/화장품", "의류/패션", "가전/디지털", "생활/주방"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setTemplateCategoryFilter(cat)}
                        className={`text-[11px] font-bold px-3 py-1.5 rounded-xl cursor-pointer flex-shrink-0 transition-all ${
                          templateCategoryFilter === cat 
                            ? "bg-primary text-white shadow-xs" 
                            : "bg-white border border-[#cbd5e1] text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Template grid list */}
                  <div className="grid grid-cols-1 gap-4">
                    {PREMIUM_TEMPLATES.filter(t => templateCategoryFilter === "전체" || t.category === templateCategoryFilter).map((temp, index) => (
                      <div 
                        key={index}
                        onClick={() => handleLoadTemplate(temp)}
                        className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer"
                      >
                        {/* cover element */}
                        <div className="w-full h-44 relative bg-gray-100 overflow-hidden flex items-center justify-center">
                          {!brokenImages[temp.img] ? (
                            <img 
                              src={temp.img} 
                              alt={temp.title} 
                              className="w-full h-full object-cover transform group-hover:scale-[103%] transition-transform duration-500"
                              referrerPolicy="no-referrer"
                              onError={() => handleImageError(temp.img)}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-indigo-50/50 to-purple-50/50 flex flex-col items-center justify-center p-4 text-center">
                              <Sparkles className="w-8 h-8 text-primary opacity-40 mb-2 z-10" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                            <span className="text-[9px] font-bold uppercase tracking-wider bg-primary px-2 py-0.5 rounded-md text-white z-10">
                              {temp.category}
                            </span>
                            <h3 className="text-base font-extrabold mt-1.5 z-10">{temp.title}</h3>
                          </div>
                        </div>

                        {/* info area */}
                        <div className="p-4.5 space-y-3.5">
                          <p className="text-xs text-gray-500 leading-relaxed">
                            {temp.desc}
                          </p>

                          <div className="bg-[#f8fbff] p-3 rounded-2xl space-y-1.5">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700">
                              <span className="material-symbols-outlined text-[14px] text-primary">target</span>
                              <span className="truncate">추천 타겟: {temp.targetCustomer}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700">
                              <span className="material-symbols-outlined text-[14px] text-teal-600">verified</span>
                              <span className="truncate">대표 강점: {temp.usps[0]}</span>
                            </div>
                          </div>

                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLoadTemplate(temp);
                            }}
                            className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold py-3 text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Sparkles className="w-4 h-4" />
                            <span>이 템플릿 사용하기 (AI 매칭 자동입력)</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: MY TAB */}
              {dashboardTab === "my" && (
                <div className="space-y-6">
                  {/* Account overview card */}
                  <div className="bg-white border border-[#e2e8f0] p-5 rounded-3xl shadow-xs flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#111] font-display">{user ? user.name : "김사장님"} (우수 등급)</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 font-sans">내 상세페이지는 이탈을 사전에 방어하고 있습니다!</p>
                    </div>
                  </div>

                  {/* Statistics Counters in Grid */}
                  <div className="grid grid-cols-3 gap-2.5 font-mono">
                    <div className="bg-white p-3.5 border border-[#e2e8f0] rounded-2xl text-center space-y-1">
                      <span className="text-[10px] text-gray-400 block font-bold font-sans">생성 페이지</span>
                      <span className="text-lg font-black text-primary block">{projects.length}개</span>
                    </div>
                    <div className="bg-white p-3.5 border border-[#e2e8f0] rounded-2xl text-center space-y-1">
                      <span className="text-[10px] text-gray-400 block font-bold font-sans">평균 CRO 점수</span>
                      <span className="text-lg font-black text-teal-600 block">89점</span>
                    </div>
                    <div className="bg-white p-3.5 border border-[#e2e8f0] rounded-2xl text-center space-y-1">
                      <span className="text-[10px] text-gray-400 block font-bold font-sans">원 클릭 진단</span>
                      <span className="text-lg font-black text-purple-600 block">무제한</span>
                    </div>
                  </div>

                  {/* Interactively Toggleable Premium CRO Checklist */}
                  <div className="bg-white p-5 rounded-3xl border border-gray-200 space-y-3.5">
                    <div className="flex items-center gap-2 border-b border-[#f1f5f9] pb-3">
                      <CheckCircle2 className="w-4.5 h-4.5 text-primary" />
                      <span className="text-xs font-display font-extrabold text-[#111]">상세페이지 배포 전 핵심 자가 점검 리스트</span>
                    </div>

                    <ul className="space-y-3">
                      {[
                        "첫 3초 후킹 초반 타이틀이 소비자의 아킬레스건을 제대로 가격하는가?",
                        "경쟁사와 정면 비교했을 때 변별할 수 있는 3개 필수 USP가 정직하게 표기되었는가?",
                        "소비자의 결제 직전 심리 장벽을 누그러뜨리는 객관적 시험성적서/허가증 완비!",
                        "PC 뿐 아니라 주력 결제 경로인 모바일 한 손가락 휠 스크롤에서 눈 피로가 극히 적은가?",
                        "구매 이탈 구덩이를 막는 완벽 보상 및 사후 관리 혜택이 친절하게 포함되었는가?"
                      ].map((chk, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <input 
                            type="checkbox" 
                            defaultChecked={i < 3}
                            className="mt-1 accent-primary w-3.5 h-3.5 flex-shrink-0"
                            id={`chk_list_${i}`}
                          />
                          <label htmlFor={`chk_list_${i}`} className="text-xs text-gray-600 font-sans leading-relaxed cursor-pointer select-none">
                            {chk}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Top Copywriter Insights */}
                  <div className="bg-white p-5 rounded-3xl border border-gray-200 space-y-3 font-sans">
                    <div className="flex items-center gap-1.5 text-xs text-primary font-bold">
                      <Sparkles className="w-4 h-4" />
                      <span>이주의 억대 매출 카피 패러다임</span>
                    </div>
                    <div className="space-y-2 text-xs font-medium text-gray-600 leading-relaxed bg-[#f8fbff] p-4 rounded-2xl space-y-3">
                      <div>
                        <span className="text-primary font-bold">🔥 [공감 비익 효과 (Pain-Benefit)]</span>
                        <p className="text-[11px] text-gray-500 mt-0.5">단순히 스펙만 기재되어 있을 땐 뒤돌아서 이탈합니다. 소비자가 기꺼이 돈을 내는 것은 스펙이 아닌 '기존에 겪던 처절한 아픔'의 완전 해결 과정입니다.</p>
                      </div>
                      <div className="border-t border-[#ebf2fb] pt-2">
                        <span className="text-primary font-bold">📊 [지표 실증주의 (Hard Proofs)]</span>
                        <p className="text-[11px] text-gray-500 mt-0.5">\"정말 세정력이 우수합니다\" 대신 \"미세 먼지 인입 저감 시험성적 99.8% 달성 정식 통과\"처럼 정량적 스펙을 명료히 늘어놓을 때 구매 전환율이 폭발합니다.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: ADMIN TAB */}
              {dashboardTab === "admin" && (
                <div className="space-y-6 font-sans">
                  
                  {/* Administrative Master Header Intro */}
                  <div className="bg-gradient-to-br from-[#1e1b4b] to-[#4338ca] text-white p-5 rounded-3xl shadow-lg relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-10 shrink-0 pointer-events-none select-none">
                      <Shield className="w-44 h-44 text-white" />
                    </div>
                    <div className="z-10 space-y-1.5 position-relative">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-yellow-400 text-black text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">SYSTEM ADMIN</span>
                        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                      </div>
                      <h3 className="text-lg font-display font-extrabold tracking-tight">종합 관리자 통계 데스크</h3>
                      <p className="text-[11px] text-indigo-100 opacity-90 leading-relaxed">
                        실시간으로 가입한 사장님들의 가입 흐름과 상품 상세지 지표 진단 상세 기록을 관제합니다.
                      </p>
                    </div>
                  </div>

                  {/* Summary Metric Bento Grid */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-gray-400">
                        <span className="text-[10px] font-bold uppercase tracking-wider">누적 활성 회원</span>
                        <User className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xl font-mono font-black text-gray-900">{allUsers.length}명</span>
                        <span className="text-[8px] text-gray-400 block">데모 기본 계정 포함</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-gray-400">
                        <span className="text-[10px] font-bold uppercase tracking-wider">총 생성 상세페이지</span>
                        <FileText className="w-3.5 h-3.5 text-[#10b981]" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xl font-mono font-black text-gray-900">
                          {projects.length + allUsers.reduce((sum, u) => sum + (u.projectsCount || 0), 0)}개
                        </span>
                        <span className="text-[8px] text-gray-400 block">회원 생성물 및 기본값 통합</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 border border-[#eee] rounded-2xl shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-gray-400">
                        <span className="text-[10px] font-bold uppercase tracking-wider">누적 AI 진단 수행</span>
                        <Activity className="w-3.5 h-3.5 text-purple-600" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xl font-mono font-black text-gray-900">{diagnosisHistory.length}회</span>
                        <span className="text-[8px] text-indigo-500 block font-bold">진단율 100% 정상 작동</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 border border-[#eee] rounded-2xl shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-gray-400">
                        <span className="text-[10px] font-bold uppercase tracking-wider">평균 컨설팅 점수</span>
                        <span className="material-symbols-outlined text-sm text-yellow-500">star</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xl font-mono font-black text-gray-900">
                          {Math.round(diagnosisHistory.reduce((acc, c) => acc + c.score, 0) / (diagnosisHistory.length || 1))}점
                        </span>
                        <span className="text-[8px] text-green-500 block font-bold">합격 안정권 (80점 이상)</span>
                      </div>
                    </div>
                  </div>

                  {/* Inner Page Tabs Header */}
                  <div className="flex p-1 bg-gray-100 rounded-xl">
                    <button
                      onClick={() => setAdminActiveSubTab("users")}
                      className={`flex-1 text-center py-2 text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                        adminActiveSubTab === "users" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>회원 가입 명단 ({allUsers.length})</span>
                    </button>
                    <button
                      onClick={() => setAdminActiveSubTab("logs")}
                      className={`flex-1 text-center py-2 text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                        adminActiveSubTab === "logs" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5" />
                      <span>CRO 정밀진단 로그 ({diagnosisHistory.length})</span>
                    </button>
                  </div>

                  {/* SUB TAB 1: USER LIST */}
                  {adminActiveSubTab === "users" && (
                    <div className="space-y-4">
                      
                      {/* Search Bar */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={adminUserSearch}
                          onChange={(e) => setAdminUserSearch(e.target.value)}
                          placeholder="사장님 성함 또는 이메일로 검색..."
                          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-sans"
                        />
                        {adminUserSearch && (
                          <button 
                            onClick={() => setAdminUserSearch("")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Users Card List */}
                      <div className="space-y-2.5">
                        {allUsers
                          .filter(u => 
                            u.name.toLowerCase().includes(adminUserSearch.toLowerCase()) || 
                            u.email.toLowerCase().includes(adminUserSearch.toLowerCase())
                          )
                          .map((u, index) => (
                            <div key={index} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-3 relative hover:border-indigo-100 transition-all">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-extrabold text-gray-900 font-display">{u.name}</span>
                                    {/* Action role switcher button toggle */}
                                    <button 
                                      onClick={() => {
                                        const newRole = u.role === "우수회원" ? "일반회원" : u.role === "일반회원" ? "마스터" : "우수회원";
                                        const updated = allUsers.map(usr => usr.email === u.email ? { ...usr, role: newRole } : usr);
                                        setAllUsers(updated);
                                        localStorage.setItem("selling_page_all_users", JSON.stringify(updated));
                                        showToast(`"${u.name}" 사장님의 등급이 [${newRole}] 등급으로 변경되었습니다.`);
                                      }}
                                      title="클릭하여 등급 전환"
                                      className={`text-[9px] font-black px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
                                        u.role === "마스터" 
                                          ? "bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-100" 
                                          : u.role === "우수회원" 
                                            ? "bg-purple-100 border border-purple-200 text-primary hover:bg-purple-200"
                                            : "bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200"
                                      }`}
                                    >
                                      {u.role} ⇆
                                    </button>
                                  </div>
                                  <p className="text-[10px] text-gray-400 font-mono">{u.email}</p>
                                </div>

                                {/* Custom Registered Users Delete action (Prevent deleting baseline account admin) */}
                                {u.email !== "admin@sellingpage.co.kr" && u.email !== "redsunhi08@gmail.com" && (
                                  <button
                                    onClick={() => {
                                      if (confirm(`진짜 "${u.name}" 사장님 계정을 폐쇄 및 제거하시겠습니까?`)) {
                                        const updated = allUsers.filter(usr => usr.email !== u.email);
                                        setAllUsers(updated);
                                        localStorage.setItem("selling_page_all_users", JSON.stringify(updated));
                                        showToast(`"${u.name}" 사장님 계정이 안전하게 정삭 삭제되었습니다.`);
                                      }
                                    }}
                                    className="text-gray-300 hover:text-rose-500 p-1.5 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                    title="계정 삭제"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>

                              <div className="flex items-center justify-between pt-2.5 border-t border-gray-50 text-[10px] text-gray-500 font-sans">
                                <div>
                                  가입일: <span className="font-mono text-gray-900">{u.date}</span>
                                </div>
                                <div className="flex items-center gap-1 bg-indigo-50/50 text-indigo-700 px-2 py-0.5 rounded-md">
                                  <span>상세 제작:</span> 
                                  <span className="font-bold text-gray-900 font-mono">{u.projectsCount || 0}개</span>
                                </div>
                              </div>
                            </div>
                          ))}

                        {allUsers.filter(u => 
                          u.name.toLowerCase().includes(adminUserSearch.toLowerCase()) || 
                          u.email.toLowerCase().includes(adminUserSearch.toLowerCase())
                        ).length === 0 && (
                          <div className="text-center py-8 text-gray-400 bg-white rounded-2xl border border-gray-100">
                            검색어와 마칭되는 사장님이 안 계십니다.
                          </div>
                        )}
                      </div>

                      {/* Demo User generation utility */}
                      <button 
                        onClick={() => {
                          const names = ["홍사장", "이대표", "최스토어", "블랙카우", "오가닉스타"];
                          const emails = ["hong@naver.com", "lee_ceo@daum.net", "choi_store@gmail.com", "blackcow@kakao.com", "organic_star@outlook.com"];
                          const randomIndex = Math.floor(Math.random() * names.length);
                          
                          const randomUser = {
                            email: emails[randomIndex] || `gildong_${Date.now()}@test.com`,
                            name: names[randomIndex] || "가상사장님",
                            date: new Date().toISOString().split("T")[0],
                            role: "일반회원",
                            projectsCount: Math.floor(Math.random() * 5) + 1
                          };

                          if (allUsers.some(u => u.email === randomUser.email)) {
                            showToast("이미 가입 기록이 존재하여 다른 데모를 한번 더 클릭해주세요!");
                            return;
                          }

                          const updated = [randomUser, ...allUsers];
                          setAllUsers(updated);
                          localStorage.setItem("selling_page_all_users", JSON.stringify(updated));
                          showToast(`관리자 도구로 가상의 가입자 [${randomUser.name}] 님을 한명 등록했습니다.`);
                        }}
                        className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer border border-dashed border-gray-300 text-center"
                      >
                         ➕ 테스트용 가상 회원 가입 데이터 추가 (기능 검증)
                      </button>

                    </div>
                  )}

                  {/* SUB TAB 2: DIAGNOSTIC LOGS */}
                  {adminActiveSubTab === "logs" && (
                    <div className="space-y-4 font-sans">
                      
                      {/* Search Bar */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={adminLogSearch}
                          onChange={(e) => setAdminLogSearch(e.target.value)}
                          placeholder="검색 (제품명, 계정 이메일 등)..."
                          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-sans"
                        />
                        {adminLogSearch && (
                          <button 
                            onClick={() => setAdminLogSearch("")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Actions toolbar */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400">실시간 유입 순위 정렬</span>
                        <button
                          onClick={() => {
                            if (confirm("정말 모든 진단 로그 데이터를 초기화(리셋) 하시겠습니까?")) {
                              localStorage.removeItem("selling_page_diagnosis_history");
                              setDiagnosisHistory([
                                { id: "diag_3", email: "redsunhi08@gmail.com", prdName: "피톤치드 수면 탈취제", category: "생활/주방", score: 92, status: "최적", date: "2026-06-03 11:10" }
                              ]);
                              showToast("의도적인 시뮬레이션을 위해 진단용 데이터 로그를 성공적으로 리셋 완료했습니다.");
                            }
                          }}
                          className="text-[10px] text-rose-500 font-bold hover:underline cursor-pointer"
                        >
                          로그 전체 비우기 
                        </button>
                      </div>

                      {/* Log cards */}
                      <div className="space-y-2.5">
                        {diagnosisHistory
                          .filter(log => 
                            log.prdName.toLowerCase().includes(adminLogSearch.toLowerCase()) || 
                            log.email.toLowerCase().includes(adminLogSearch.toLowerCase()) ||
                            log.category.toLowerCase().includes(adminLogSearch.toLowerCase())
                          )
                          .map((log) => (
                            <div key={log.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-3 hover:border-purple-100 transition-all text-left">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="bg-light-primary text-primary text-[9px] font-black px-2 py-0.5 rounded-md">
                                      {log.category}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-sans block">{log.date}</span>
                                  </div>
                                  <h4 className="text-xs font-extrabold text-gray-900 mt-1 font-sans">{log.prdName}</h4>
                                  <p className="text-[10px] text-gray-400 font-mono mt-0.5 select-none">{log.email}</p>
                                </div>

                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                  {/* Score indicator badge */}
                                  <div className="text-right space-y-0.5">
                                    <span className={`text-xs font-black px-2.5 py-1 rounded-full font-mono block ${
                                      log.score >= 90 
                                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                                        : log.score >= 70 
                                          ? "bg-amber-50 text-amber-600 border border-amber-100" 
                                          : "bg-rose-50 text-rose-600 border border-rose-100"
                                    }`}>
                                      {log.score}점
                                    </span>
                                    <span className="text-[8px] text-gray-400 block font-bold tracking-tight text-center">{log.status}</span>
                                  </div>

                                  <button
                                    onClick={() => {
                                      const updated = diagnosisHistory.filter(h => h.id !== log.id);
                                      setDiagnosisHistory(updated);
                                      localStorage.setItem("selling_page_diagnosis_history", JSON.stringify(updated));
                                      showToast("해당 진단 가짜 로그를 목록에서 성공적으로 제외했습니다.");
                                    }}
                                    className="text-gray-300 hover:text-rose-500 p-1.5 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                    title="로그 영구 삭제"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}

                        {diagnosisHistory.filter(log => 
                          log.prdName.toLowerCase().includes(adminLogSearch.toLowerCase()) || 
                          log.email.toLowerCase().includes(adminLogSearch.toLowerCase()) ||
                          log.category.toLowerCase().includes(adminLogSearch.toLowerCase())
                        ).length === 0 && (
                          <div className="text-center py-8 text-gray-400 bg-white rounded-2xl border border-gray-100">
                            검색 필터와 일치하는 진단 수행 로그가 비어있습니다.
                          </div>
                        )}
                      </div>

                      {/* Interactive Add Simulated Log Button */}
                      <button
                        onClick={() => {
                          const samplePrds = [
                            { name: "초강력 하이라이트 휴대 보조배터리", cat: "디지털/가전", minScore: 52, maxScore: 82 },
                            { name: "유기농 착즙 도라지 배즙", cat: "식품", minScore: 65, maxScore: 94 },
                            { name: "저진동 저소음 헤어드라이어", cat: "디지털/가전", minScore: 78, maxScore: 98 },
                            { name: "어깨 등 마사지 기계", cat: "생활/주방", minScore: 40, maxScore: 85 },
                            { name: "친환경 생분해 수세미 세트", cat: "생활/주방", minScore: 82, maxScore: 98 }
                          ];
                          const randomPrdObj = samplePrds[Math.floor(Math.random() * samplePrds.length)] || samplePrds[0]!;
                          const randomScore = Math.floor(Math.random() * (randomPrdObj.maxScore - randomPrdObj.minScore + 1)) + randomPrdObj.minScore;
                          const calculatedStatus = randomScore >= 90 ? "최적" : randomScore >= 70 ? "개선필요" : "취약";
                          
                          const newMockLog = {
                            id: "diag_mock_" + Date.now(),
                            email: allUsers[Math.floor(Math.random() * allUsers.length)]?.email || "apple_farm@naver.com",
                            prdName: randomPrdObj.name,
                            category: randomPrdObj.cat,
                            score: randomScore,
                            status: calculatedStatus,
                            date: new Date().toISOString().replace("T", " ").substring(0, 16)
                          };

                          const updated = [newMockLog, ...diagnosisHistory];
                          setDiagnosisHistory(updated);
                          localStorage.setItem("selling_page_diagnosis_history", JSON.stringify(updated));
                          showToast(`"${randomPrdObj.name}" 상세페이지에 대한 가상 자가진단 수행 로그를 즉각 합성했습니다.`);
                        }}
                        className="w-full py-2.5 bg-[#f5f3ff] hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
                      >
                         ⚙️ 통계 검증용 시뮬레이션 진단 로그 즉시 생성 (CRO 시뮬레이터)
                      </button>

                    </div>
                  )}

                  {/* Informational Tip */}
                  <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-[11px] text-gray-500 leading-relaxed font-sans max-w-sm mx-auto">
                    <strong>💡 통합 관제 센터 운영 안내</strong>
                    <p className="mt-1">
                      이 페이지는 로그인한 파트너 사장님 전원에게 실시간 판매 전술 자가 진단 및 회원 정보 정렬 테스트를 편안하게 해볼 기회를 부여하도록 제작된 <strong>전체공개 관리 데스크</strong>입니다. 가상의 데이터를 주입하고 지표 흐름을 체감해 보십시오.
                    </p>
                  </div>

                </div>
              )}

            </main>

            {/* Sticky Bottom Navigation matching UI exactly */}
            {!isDesktopLayout && (
              <>
                <nav className="fixed bottom-0 max-w-md w-full bg-white border-t border-[#eee] min-h-16 px-4 flex items-center justify-around shadow-xl z-20">
                  <button 
                    onClick={() => setDashboardTab("home")}
                    className={`flex flex-col items-center gap-1 focus:outline-none cursor-pointer transition-colors ${
                      dashboardTab === "home" ? "text-primary" : "text-gray-400 hover:text-primary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[23px]" style={dashboardTab === "home" ? { fontVariationSettings: "'FILL' 1" } : {}}>home</span>
                    <span className="text-[10px] font-bold">홈</span>
                  </button>
                  
                  <button 
                    onClick={() => setDashboardTab("projects")}
                    className={`flex flex-col items-center gap-1 focus:outline-none cursor-pointer transition-colors ${
                      dashboardTab === "projects" ? "text-primary" : "text-gray-400 hover:text-primary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[23px]" style={dashboardTab === "projects" ? { fontVariationSettings: "'FILL' 1" } : {}}>folder_open</span>
                    <span className="text-[10px] font-bold">프로젝트</span>
                  </button>

                  <button 
                    onClick={() => setDashboardTab("templates")}
                    className={`flex flex-col items-center gap-1 focus:outline-none cursor-pointer transition-colors ${
                      dashboardTab === "templates" ? "text-primary" : "text-gray-400 hover:text-primary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[23px]" style={dashboardTab === "templates" ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard_customize</span>
                    <span className="text-[10px] font-bold">템플릿</span>
                  </button>

                  <button 
                    onClick={() => setDashboardTab("my")}
                    className={`flex flex-col items-center gap-1 focus:outline-none cursor-pointer transition-colors ${
                      dashboardTab === "my" ? "text-[#7000bf]" : "text-gray-400 hover:text-primary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[23px]" style={dashboardTab === "my" ? { fontVariationSettings: "'FILL' 1" } : {}}>person</span>
                    <span className="text-[10px] font-bold">마이</span>
                  </button>

                  {user && (
                    <button 
                      onClick={() => setDashboardTab("admin")}
                      className={`flex flex-col items-center gap-1 focus:outline-none cursor-pointer transition-colors ${
                        dashboardTab === "admin" ? "text-[#7000bf]" : "text-gray-400 hover:text-primary"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[23px]" style={dashboardTab === "admin" ? { fontVariationSettings: "'FILL' 1" } : {}}>shield</span>
                      <span className="text-[10px] font-bold">관리자</span>
                    </button>
                  )}
                </nav>

                {/* Floating Action Button */}
                <div className="fixed bottom-20 max-w-md w-full flex justify-end pr-5 z-10 pointer-events-none">
                  <button 
                    onClick={() => setCurrentView("form-step-1")}
                    className="bg-primary hover:bg-[#410091] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform cursor-pointer pointer-events-auto"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </>
            )}
            </div>
            </div>
          </div>
        )}

        {/* VIEW 3: MULTI-STEP CREATION FORM */}
        
        {/* STEP 1: 상품 기본 정보 */}
        {currentView === "form-step-1" && (
          <div className="flex flex-col min-h-screen bg-[#f9f9ff] font-sans w-full">
            {isDesktopLayout ? (
              /* Desktop Widescreen Stepper Header */
              <header className="w-full bg-white border-b border-[#f0f0f5] px-8 py-4 flex items-center justify-between sticky top-0 z-40 shadow-xs shrink-0 select-none">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView("dashboard")}>
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5300b7] to-[#800cf2] flex items-center justify-center text-white shrink-0 shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h1 className="text-lg font-display font-black text-primary tracking-tight">팔리는페이지</h1>
                </div>

                {/* Center progress stepper */}
                <div className="flex items-center gap-8 text-xs font-bold font-sans">
                  <div className="flex items-center gap-2 text-primary font-black">
                    <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">1</span>
                    <span>상세 상품 정보 입력</span>
                  </div>
                  <div className="h-[1px] w-8 bg-gray-300"></div>
                  <div className="flex items-center gap-2 text-gray-400 font-bold">
                    <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[10px]">2</span>
                    <span>성공 소구포인트 전술화</span>
                  </div>
                  <div className="h-[1px] w-8 bg-gray-300"></div>
                  <div className="flex items-center gap-2 text-gray-400 font-bold">
                    <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[10px]">3</span>
                    <span>상세페이지 자동 카피생성</span>
                  </div>
                </div>

                <button 
                  onClick={() => setCurrentView("dashboard")} 
                  className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1.5 font-bold cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>대시보드로 나가기</span>
                </button>
              </header>
            ) : (
              /* Mobile Header */
              <header className="sticky top-0 bg-white border-b border-[#eee] h-16 px-4 flex items-center justify-between z-10 shadow-sm">
                <button onClick={() => setCurrentView("dashboard")} className="p-1 hover:bg-gray-100 rounded-lg">
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <h2 className="text-base font-bold text-gray-900">상품 정보 입력</h2>
                <button onClick={() => setCurrentView("dashboard")} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </header>
            )}

            {/* Stepper indicator inside layout (Mobile only) */}
            {!isDesktopLayout && (
              <div className="bg-white px-5 py-4 border-b border-[#eee] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mb-1">1</div>
                    <span className="text-[10px] font-bold text-primary">상품 기본 정보</span>
                  </div>
                  <div className="h-[2px] bg-gray-200 flex-1 -mt-4" />
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-xs font-bold flex items-center justify-center mb-1">2</div>
                    <span className="text-[10px] font-bold text-gray-400">상세 소구점</span>
                  </div>
                  <div className="h-[2px] bg-gray-200 flex-1 -mt-4" />
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-xs font-bold flex items-center justify-center mb-1">3</div>
                    <span className="text-[10px] font-bold text-gray-400">생성 완료</span>
                  </div>
                </div>
              </div>
            )}

            {/* Fields input form container */}
            <main className="flex-1 overflow-y-auto hide-scrollbar pb-24 select-none">
              <div className={`${isDesktopLayout ? "md:grid md:grid-cols-12 md:gap-8 md:items-start max-w-7xl mx-auto w-full px-8 py-8" : "px-5 py-5 space-y-5"}`}>
                
                {/* Left side Guide panel (Only on desktop) */}
                {isDesktopLayout && (
                  <div className="md:col-span-5 bg-gradient-to-br from-[#f1eaff] to-[#e6dfff] border border-primary/10 rounded-3xl p-8 space-y-6 shadow-sm sticky top-24">
                    <div className="space-y-2">
                      <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1.5 rounded-full tracking-wide">CRO 전략 툴킷</span>
                      <h3 className="text-xl font-display font-black text-gray-900 leading-tight">상품의 본질을 찾는 AI 빌더 가이드</h3>
                      <p className="text-xs text-gray-500 leading-relaxed font-sans">
                        잠재 고객을 베스트셀러의 팬으로 전환시키는 첫 관문입니다. AI가 최적의 문장력을 발휘하도록 정보를 구체적으로 기입해 보세요.
                      </p>
                    </div>

                    <div className="space-y-4 pt-2 font-sans">
                      <div className="flex gap-3 items-start">
                        <div className="w-8 h-8 rounded-xl bg-white border border-primary/20 flex items-center justify-center text-primary font-bold shadow-xs shrink-0 text-sm">💡</div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-800">명확한 타겟의 한 사람 정의</h4>
                          <p className="text-[11px] text-gray-500 leading-relaxed font-sans mt-0.5">모두를 위한 메시지는 누구도 설득할 수 없습니다. 텀블러라면 '회사 정수기 물 뜨러 가기 귀찮은 직장인'처럼 사소한 불편을 짚어보세요.</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start">
                        <div className="w-8 h-8 rounded-xl bg-white border border-primary/20 flex items-center justify-center text-primary font-bold shadow-xs shrink-0 text-sm">🔥</div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-800">고객 고통점(Pain Points) 체감</h4>
                          <p className="text-[11px] text-gray-500 leading-relaxed font-sans mt-0.5">'얼음이 금방 녹는다', '가방 안에서 샌다' 같은 구어체 고민을 작성해줄 때 카피라이팅이 진가를 발휘합니다.</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start">
                        <div className="w-8 h-8 rounded-xl bg-white border border-primary/20 flex items-center justify-center text-primary font-bold shadow-xs shrink-0 text-sm">✨</div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-800">대체 불가능한 독창성(USPs)</h4>
                          <p className="text-[11px] text-gray-500 leading-relaxed font-sans mt-0.5">단순히 예쁜 것 외에 '특허 이중 차단 캡', '24시간 무부식 진공 단열' 등 강력한 신뢰 보증 지표를 추가하세요.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Right side form card */}
                <div className={`${isDesktopLayout ? "md:col-span-7 bg-white border border-gray-200/80 p-8 rounded-3xl space-y-6 shadow-sm" : "space-y-5"}`}>
                  
                  {/* Title block inside Form for mobile or desktop inside wrap */}
                  {!isDesktopLayout && (
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-gray-800">판매하실 상품에 대해 알려주세요</h3>
                      <p className="text-xs text-gray-500 font-sans">AI가 효과적인 카피라이팅, 상세페이지 구성을 도와드립니다.</p>
                    </div>
                  )}

                  {isDesktopLayout && (
                    <div className="border-b border-gray-100 pb-4 mb-2">
                      <h3 className="text-base font-extrabold text-[#111] font-display">의뢰 상품 명세 작성</h3>
                      <p className="text-[11px] text-gray-400 mt-1">상세페이지의 기반이 되는 원형질 정보입니다.</p>
                    </div>
                  )}

                  {/* 1. Product Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 block">상품명</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#f1f3f9] border border-[#e2e8f0] focus:border-primary focus:bg-white focus:outline-none p-3.5 rounded-xl text-sm transition-all"
                      placeholder="예: 프리미엄 스테인리스 텀블러"
                    />
                  </div>

                  {/* 2. Category selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 block">카테고리</label>
                    <select 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#f1f3f9] border border-[#e2e8f0] focus:border-primary focus:bg-white focus:outline-none p-3.5 rounded-xl text-sm transition-all appearance-none cursor-pointer"
                    >
                      <option value="생활/주방">생활/주방</option>
                      <option value="뷰티">뷰티 / 화장품</option>
                      <option value="식품">식품 / 신선직송</option>
                      <option value="의류/패션">의류 / 패션잡화</option>
                      <option value="디지털/가전">디지털 / 소형가전</option>
                    </select>
                  </div>

                  {/* 3. Target Customer */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 block">타겟 고객</label>
                    <textarea 
                      value={targetCustomer} 
                      onChange={(e) => setTargetCustomer(e.target.value)}
                      className="w-full bg-[#f1f3f9] border border-[#e2e8f0] focus:border-primary focus:bg-white focus:outline-none p-3.5 rounded-xl text-xs transition-all min-h-[70px] resize-none"
                      placeholder="예: 2030 직장인, 환경 보호에 관심 많은 분"
                    />
                  </div>

                  {/* 4. Pain Points list */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 block">고객의 고민 (Pain Points)</label>
                    
                    {/* Dynamically created and removable elements */}
                    <div className="space-y-2 mb-2">
                      {painPoints.map((point, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-[#f1f3f9] border border-[#e2e8f0] px-3.5 py-2.5 rounded-xl text-sm">
                          <span className="flex-grow text-gray-700">{point}</span>
                          <button 
                            onClick={() => handleRemovePainPoint(idx)}
                            className="text-gray-400 hover:text-red-500 focus:outline-none cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Adding element box */}
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={tempPainPoint}
                        onChange={(e) => setTempPainPoint(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddPainPoint())}
                        className="flex-grow bg-[#f1f3f9] border border-[#e2e8f0] focus:border-primary focus:bg-white focus:outline-none px-3.5 py-2.5 rounded-xl text-xs transition-all"
                        placeholder="고민 요소를 직접 추가하세요"
                      />
                      <button 
                        onClick={handleAddPainPoint}
                        className="bg-primary text-white px-4 py-2.5 rounded-xl hover:bg-[#410091] cursor-pointer flex items-center justify-center font-bold text-xs"
                      >
                        추가
                      </button>
                    </div>
                  </div>

                  {/* 5. USPs Tags list */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 block">핵심 장점 (USPs)</label>
                    
                    {/* Tag chips */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {usPs.map((usp, idx) => (
                        <div key={idx} className="bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                          <span>{usp}</span>
                          <span className="cursor-pointer font-black text-gray-400 hover:text-primary" onClick={() => handleRemoveUSP(idx)}>
                            &times;
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Add Tag Box */}
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={tempUSP}
                        onChange={(e) => setTempUSP(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddUSP())}
                        className="flex-grow bg-[#f1f3f9] border border-[#e2e8f0] focus:border-primary focus:bg-white focus:outline-none px-3.5 py-2.5 rounded-xl text-xs transition-all"
                        placeholder="새로운 특장점 키워드 추가"
                      />
                      <button 
                        onClick={handleAddUSP}
                        className="bg-primary text-white px-4 py-2.5 rounded-xl hover:bg-[#410091] cursor-pointer flex items-center justify-center font-bold text-xs"
                      >
                        추가
                      </button>
                    </div>
                  </div>

                  {/* 6. AI Tip box */}
                  <div className="bg-[#f0ebff] text-primary-container rounded-xl p-4 flex gap-3 border border-primary/15 shadow-2xs font-sans">
                    <Sparkles className="w-5 h-5 flex-shrink-0 text-primary mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-primary block">AI 팁</span>
                      <p className="text-[11px] text-[#4a4455] leading-relaxed">
                        고객의 고민을 구체적이고 구어체로 직접 적을수록 훨씬 더 구매 욕구를 자극하는 설득력 높은 카피 문안들과 특수 후킹 타이틀이 안전하게 생성됩니다.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </main>

            {/* Form footer actions */}
            <div className={`sticky bottom-0 bg-white border-t border-[#eee] p-4 ${isDesktopLayout ? "flex justify-end max-w-7xl mx-auto w-full px-8" : ""}`}>
              <button 
                id="btn_next_step"
                onClick={handleGenerateHooks}
                className={`bg-primary hover:bg-[#410091] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-transform active:scale-[98%] cursor-pointer ${isDesktopLayout ? "px-10" : "w-full"}`}
              >
                다음 단계로 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: 상세 소구점 (SELLING ANGLE) SELECTION */}
        {currentView === "form-step-2" && (
          <div className="flex flex-col min-h-screen bg-[#f9f9ff] font-sans w-full">
            {isDesktopLayout ? (
              /* Desktop Widescreen Stepper Header */
              <header className="w-full bg-white border-b border-[#f0f0f5] px-8 py-4 flex items-center justify-between sticky top-0 z-40 shadow-xs shrink-0 select-none">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView("dashboard")}>
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5300b7] to-[#800cf2] flex items-center justify-center text-white shrink-0 shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h1 className="text-lg font-display font-black text-primary tracking-tight">팔리는페이지</h1>
                </div>

                {/* Center progress stepper */}
                <div className="flex items-center gap-8 text-xs font-bold font-sans">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">✓</span>
                    <span>상세 상품 정보 입력</span>
                  </div>
                  <div className="h-[1px] w-8 bg-[#800cf2]"></div>
                  <div className="flex items-center gap-2 text-[#800cf2] font-black font-bold">
                    <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">2</span>
                    <span>성공 소구포인트 전술화</span>
                  </div>
                  <div className="h-[1px] w-8 bg-gray-300"></div>
                  <div className="flex items-center gap-2 text-gray-400 font-bold">
                    <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[10px]">3</span>
                    <span>상세페이지 자동 카피생성</span>
                  </div>
                </div>

                <button 
                  onClick={() => setCurrentView("dashboard")} 
                  className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1.5 font-bold cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>대시보드로 나가기</span>
                </button>
              </header>
            ) : (
              /* Mobile Header */
              <header className="sticky top-0 bg-white border-b border-[#eee] h-16 px-4 flex items-center justify-between z-10 shadow-sm">
                <button onClick={() => setCurrentView("form-step-1")} className="p-1 hover:bg-gray-100 rounded-lg">
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <h2 className="text-base font-bold text-gray-900 font-display">소구포인트 선택</h2>
                <button onClick={() => setCurrentView("dashboard")} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </header>
            )}

            {/* Stepper bar indicator (Mobile only) */}
            {!isDesktopLayout && (
              <div className="bg-white px-5 py-4 border-b border-[#eee] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="w-6 h-6 rounded-full bg-[#f1f3ff] text-primary text-xs font-bold flex items-center justify-center mb-1">✓</div>
                    <span className="text-[10px] font-bold text-gray-400">상품 기본 정보</span>
                  </div>
                  <div className="h-[2px] bg-primary flex-1 -mt-4" />
                  
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mb-1">2</div>
                    <span className="text-[10px] font-bold text-primary">상세 소구점</span>
                  </div>
                  <div className="h-[2px] bg-gray-200 flex-1 -mt-4" />
                  
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-xs font-bold flex items-center justify-center mb-1">3</div>
                    <span className="text-[10px] font-bold text-gray-400">생성 완료</span>
                  </div>
                </div>
              </div>
            )}

            {/* Hook selector body */}
            <main className="flex-1 overflow-y-auto hide-scrollbar pb-24 select-none">
              <div className={`${isDesktopLayout ? "md:grid md:grid-cols-12 md:gap-8 md:items-start max-w-7xl mx-auto w-full px-8 py-8" : "px-5 py-5 space-y-5"}`}>
                
                {/* Left side Guide panel (Only on desktop) */}
                {isDesktopLayout && (
                  <div className="md:col-span-5 bg-gradient-to-br from-[#ebf3ff] to-[#e4e9fe] border border-primary/10 rounded-3xl p-8 space-y-6 shadow-sm sticky top-24">
                    <div className="space-y-2 font-sans">
                      <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1.5 rounded-full tracking-wide">CRO 심리학</span>
                      <h3 className="text-xl font-display font-black text-gray-900 leading-tight">고객 지갑을 여는 핵심 앵글 설정</h3>
                      <p className="text-xs text-gray-500 leading-relaxed font-sans mt-2">
                        AI가 사장님이 제공해 주신 상품 가치 명세를 분석하여 최장점들을 도출했습니다. 이 중 가징 설득력 높은 스토리 라인 축을 선택하세요.
                      </p>
                    </div>

                    <div className="space-y-4 pt-2 font-sans">
                      <div className="flex gap-3 items-start">
                        <div className="w-8 h-8 rounded-xl bg-white border border-primary/20 flex items-center justify-center text-primary font-bold shadow-xs shrink-0 text-sm">🧠</div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-800">이탈을 막는 3초 후킹 공식</h4>
                          <p className="text-[11px] text-gray-500 leading-relaxed font-sans mt-0.5">상세페이지 최상단 헤드라인은 이 상품이 나에게 주는 즉각적인 이익(Benefit)을 단방에 선사해야 이탈이 일어나지 않습니다.</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start">
                        <div className="w-8 h-8 rounded-xl bg-white border border-primary/20 flex items-center justify-center text-primary font-bold shadow-xs shrink-0 text-sm">🎯</div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-800">소구 축 결정의 중요성</h4>
                          <p className="text-[11px] text-gray-500 leading-relaxed font-sans mt-0.5">선택한 후킹 앵글을 골격 삼아 전체 설득 논리 단계(문제 제기 {"->"} 대안 제시 {"->"} 효능 입증 {"->"} 혜택 트리거)가 세워집니다.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Right side hook selection cards container */}
                <div className={`${isDesktopLayout ? "md:col-span-7 bg-white border border-gray-200/80 p-8 rounded-3xl space-y-6 shadow-sm" : "space-y-5"}`}>
                  
                  {!isDesktopLayout && (
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-gray-800">상세페이지 중심 축이 될 소구점을 정해주세요</h3>
                      <p className="text-xs text-gray-500 font-sans">고객 설득을 유도할 최고의 핵심 앵글을 선택하세요.</p>
                    </div>
                  )}

                  {isDesktopLayout && (
                    <div className="border-b border-gray-100 pb-4 mb-2">
                      <h3 className="text-base font-extrabold text-[#111] font-display">추천 소구 전술 슬롯</h3>
                      <p className="text-[11px] text-gray-400 mt-1">원하시는 셀링 플롯 궤적 중 단 하나를 활성화하십시오.</p>
                    </div>
                  )}

                  {isHooksLoading ? (
                    <div className="py-16 flex flex-col items-center justify-center space-y-4 font-sans">
                      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs font-bold text-primary">AI가 최적화된 소구 앵글을 계산하고 있어요...</span>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {generatedHooks.map((h, i) => (
                        <div 
                          key={i}
                          onClick={() => setSelectedHookIndex(i)}
                          className={`p-4 border-[2px] rounded-2xl cursor-pointer transition-all flex gap-3 relative ${
                            selectedHookIndex === i 
                              ? "border-primary bg-primary/5 shadow-md" 
                              : "border-[#e2e8f0] bg-white text-gray-800 hover:border-gray-300"
                          }`}
                        >
                          {/* Check icon top-right if active */}
                          {selectedHookIndex === i && (
                            <div className="absolute top-3.5 right-3.5 bg-primary text-white rounded-full p-0.5">
                              <Check className="w-4 h-4" />
                            </div>
                          )}

                          <div className="flex-1 space-y-2">
                            <div className="inline-block bg-primary-container text-white text-[10px] font-bold py-1 px-2 rounded-md">
                              후킹 앵글 {i + 1} ({h.sellingPoint})
                            </div>
                            <h4 className="font-extrabold text-[15px] leading-snug text-gray-900 pr-5 font-display">
                              {h.title}
                            </h4>
                            <p className="text-xs text-gray-600 leading-relaxed font-sans">{h.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

              </div>
            </main>

            {/* Stepper Footer actions */}
            <div className={`sticky bottom-0 bg-white border-t border-[#eee] p-4 ${isDesktopLayout ? "flex justify-end max-w-7xl mx-auto w-full px-8" : ""}`}>
              <button 
                id="btn_complete_generation"
                disabled={isHooksLoading || generatedHooks.length === 0}
                onClick={handleGeneratePage}
                className={`bg-primary hover:bg-[#410091] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer ${isDesktopLayout ? "px-10" : "w-full"}`}
              >
                상세페이지 자동 생성하기 <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: LOADING GENERATION STREAM */}
        {currentView === "form-loading" && (
          <div className="flex flex-col min-h-screen justify-center items-center px-6 bg-gradient-to-b from-[#f9f9ff] to-[#f3f0fc]">
            <div className="space-y-6 text-center max-w-sm">
              
              {/* Spinner & Glow */}
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 bg-primary/15 rounded-full filter blur-md transform scale-110"></div>
              </div>

              {/* Loader explanation text */}
              <div className="space-y-2.5">
                <h3 className="text-lg font-display font-extrabold text-gray-900 text-center animate-pulse">
                  팔리는 상세페이지 기획 중
                </h3>
                <p className="text-sm text-gray-500 min-h-[40px] leading-relaxed transition-all duration-300">
                  {loadingStepText}
                </p>
              </div>

              {/* Progress visual mock */}
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-[shimmer_15s_infinite] w-[88%] rounded-full"></div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: GENERATED RESULTS (LATEST MOCKUP PREVIEW) */}
        {currentView === "result" && activeProject && (
          <div className="flex flex-col min-h-screen bg-[#f8f9fc] w-full">
            {/* Professional Global Top Header for Desktop, Mobile header for mobile */}
            {isDesktopLayout ? (
              <header className="w-full bg-white border-b border-[#f0f0f5] px-8 py-4 flex items-center justify-between sticky top-0 z-40 bg-white/80 backdrop-blur-md select-none">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView("dashboard")}>
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5300b7] to-[#800cf2] flex items-center justify-center text-white shrink-0 shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h1 className="text-lg md:text-xl font-display font-black text-primary tracking-tight">팔리는페이지</h1>
                  <span className="bg-primary/10 text-primary text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ml-1.5 leading-none">AI 상세 에디터</span>
                </div>
                
                {/* Center visual tab state */}
                <div className="flex gap-1.5 bg-gray-100 p-1.5 rounded-xl">
                  <button 
                    onClick={() => setIsEditingMode(false)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${!isEditingMode ? "bg-white text-primary shadow-xs" : "text-gray-500 hover:text-gray-800"}`}
                  >
                    실시간 지식형 미리보기
                  </button>
                  <button 
                    onClick={() => setIsEditingMode(true)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${isEditingMode ? "bg-white text-primary shadow-xs" : "text-gray-500 hover:text-gray-800"}`}
                  >
                    카피 즉시 편집하기
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleSaveEdits}
                    className="bg-primary hover:bg-[#410091] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>편집본 저장</span>
                  </button>
                  <button 
                    onClick={() => setCurrentView("dashboard")} 
                    className="text-xs font-bold text-gray-500 hover:text-primary flex items-center gap-1 cursor-pointer bg-white border border-gray-200/80 px-4 py-2.5 rounded-xl transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>대시보드 가기</span>
                  </button>
                </div>
              </header>
            ) : (
              <header className="sticky top-0 bg-white border-b border-[#eee] px-4 py-3 z-30 shadow-sm flex items-center justify-between">
                <button 
                  onClick={() => setCurrentView("dashboard")} 
                  className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"
                  title="대시보드로 가기"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="font-display font-black text-primary text-base">AI 생성 결과</span>
                <div className="bg-[#ebddff] p-1 rounded-full cursor-pointer hover:opacity-85">
                  <User className="w-5 h-5 text-primary" />
                </div>
              </header>
            )}

            {/* Mobile Header Tabs (hidden on Desktop layout mode) */}
            {!isDesktopLayout && (
              <div className="bg-white border-b border-[#eee] py-3.5 px-4 sticky top-[53px] z-20 shadow-xs flex items-center justify-center">
                <div className="flex items-center gap-2 bg-[#f1f3ff] p-1.5 rounded-2xl w-full max-w-sm justify-between">
                  <button 
                    onClick={() => setIsEditingMode(false)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${!isEditingMode ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-primary"}`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>미리보기</span>
                  </button>
                  <button 
                    onClick={() => setIsEditingMode(true)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${isEditingMode ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-primary"}`}
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>편집하기</span>
                  </button>
                  <button 
                    onClick={handleSaveEdits}
                    className="bg-primary text-white flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>저장</span>
                  </button>
                </div>
              </div>
            )}

            {/* Main content body */}
            {isDesktopLayout ? (
              <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-8 md:grid md:grid-cols-12 md:gap-8 md:items-start overflow-y-auto">
                {/* 
                  LEFT COLUMN: EDIT CONTROLS OR METADATA SUMMARY 
                */}
                <div className="md:col-span-5 space-y-6 sticky top-24">
                  {isEditingMode ? (
                    <div className="bg-white border border-gray-200/80 p-6 rounded-3xl space-y-5 shadow-xs">
                      <div className="border-b border-gray-100 pb-3">
                        <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">카피 라이팅 편집 중</span>
                        <h3 className="text-base font-extrabold text-gray-900 mt-2 font-display">실시간 앵글 라이터</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">아래 문구를 수정하면 오른쪽 프리뷰 화면에 즉각 렌더링됩니다.</p>
                      </div>

                      {/* Headline Textarea */}
                      <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold text-gray-700">메인 훅 헤드라인 수정</label>
                        <textarea 
                          value={editableHeadline} 
                          onChange={(e) => setEditableHeadline(e.target.value)}
                          className="w-full font-display font-bold text-gray-800 text-sm bg-yellow-50/30 border border-yellow-200 focus:border-amber-400 focus:outline-none p-3.5 rounded-xl min-h-[100px] leading-relaxed"
                        />
                      </div>

                      {/* Subtitle Textarea */}
                      <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold text-gray-700">태그라인 / 소제목 문구</label>
                        <textarea 
                          value={editableSubtitle} 
                          onChange={(e) => setEditableSubtitle(e.target.value)}
                          className="w-full font-sans text-xs text-gray-600 bg-yellow-50/30 border border-yellow-200 focus:border-amber-400 focus:outline-none p-3 rounded-xl min-h-[80px]"
                        />
                      </div>

                      {/* Problem Question */}
                      <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold text-gray-700">문제제기 질문 카피</label>
                        <textarea 
                          value={editableProblemQuestion} 
                          onChange={(e) => setEditableProblemQuestion(e.target.value)}
                          className="w-full text-xs font-bold text-primary bg-yellow-50/30 border border-yellow-200 focus:border-amber-400 focus:outline-none p-3 rounded-xl min-h-[60px]"
                        />
                      </div>

                      {/* Problem Answer */}
                      <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold text-gray-700">대안 제시와 문제 해결 본문</label>
                        <textarea 
                          value={editableProblemAnswer} 
                          onChange={(e) => setEditableProblemAnswer(e.target.value)}
                          className="w-full text-xs text-gray-600 bg-yellow-50/30 border border-yellow-200 focus:border-amber-400 focus:outline-none p-3 rounded-xl min-h-[140px] leading-relaxed"
                        />
                      </div>

                      <button 
                        onClick={handleSaveEdits}
                        className="w-full bg-primary hover:bg-[#410091] text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>수정본 저장하기</span>
                      </button>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-[#ebf3ff] to-[#e4e9fe] border border-primary/10 rounded-3xl p-8 space-y-6 shadow-xs select-none">
                      <div className="space-y-2 font-display">
                        <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1.5 rounded-full tracking-wide">CRO 기획 레포트</span>
                        <h3 className="text-xl font-black text-gray-900 leading-tight">선택한 소구 앵글 분석 요약</h3>
                        <p className="text-xs text-gray-500 leading-relaxed font-sans">
                          AI가 설계한 상품의 설득 구조도입니다. 사장님 비즈니스의 평생 고객을 맞이하기 위해 마련된 설계 기법을 확인해 보세요.
                        </p>
                      </div>

                      <div className="space-y-4 pt-2 text-xs font-sans">
                        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-primary/5 space-y-1">
                          <span className="text-[10px] font-bold text-primary">분석 대상 상품명</span>
                          <p className="font-extrabold text-gray-800">{activeProject.productInfo?.name || activeProject.name || "상품"}</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-primary/5 space-y-1">
                          <span className="text-[10px] font-bold text-primary">설정된 대표 카테고리</span>
                          <p className="font-extrabold text-gray-800">{activeProject.productInfo?.category || activeProject.category || "기본"}</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-primary/5 space-y-1">
                          <span className="text-[10px] font-bold text-primary">특화 고객 페르소나</span>
                          <p className="font-extrabold text-gray-800">{activeProject.productInfo?.targetCustomer || activeProject.targetCustomer || "잠재 고객"}</p>
                        </div>
                      </div>

                      {/* Hint info */}
                      <div className="flex gap-3 items-start text-xs text-gray-500 leading-relaxed font-sans bg-white/40 p-4 rounded-2xl border border-white/50">
                        <span className="material-symbols-outlined text-[17px] text-primary mt-0.5">info</span>
                        <span>전환 강도가 극강으로 배정되어 있습니다. 상단의 '카피 편집하기'를 활성화하면 세부 피드백 앵커를 자유롭게 수정해 영구 저장 가능합니다.</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 
                  RIGHT COLUMN: DEVICE PREVIEW SIMULATOR 
                */}
                <div className="md:col-span-7 space-y-6">
                  <div className="bg-white border border-gray-200/95 p-8 rounded-3xl shadow-sm space-y-6">
                    {/* Top title */}
                    <div className="border-b border-gray-100 pb-4 flex justify-between items-center select-none">
                      <div className="space-y-0.5">
                        <h3 className="text-sm font-extrabold text-gray-900 font-display">상세페이지 시뮬레이션 미리보기</h3>
                        <p className="text-[10px] text-gray-400">네이버 스마트스토어 및 모바일 최적화 웹 뷰 규격</p>
                      </div>
                      <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>실시간 동기화 완료</span>
                      </span>
                    </div>

                    {/* Simulated Mobile View block container (Centered inside the web container) */}
                    <div className="max-w-md mx-auto border border-gray-150 rounded-3xl overflow-hidden bg-[#f9f9ff] shadow-inner pb-8">
                      {/* Top wireframe line */}
                      <div className="h-4 bg-gray-200/40 flex justify-center items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                        <div className="w-16 h-1 rounded-full bg-gray-300" />
                      </div>

                      {/* Header block in card */}
                      <div className="p-4 flex justify-between items-center bg-white border-b border-gray-100">
                        <span className="text-[10px] font-display font-extrabold text-primary">브랜드 공식 파트너</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-primary/20" />
                          <div className="w-2 h-2 rounded-full bg-primary/20" />
                        </div>
                      </div>

                      {/* Mobile Body scroll block simulation */}
                      <div className="p-5 space-y-6">
                        
                        {/* 1. Main Headline section */}
                        <div className="p-5 bg-white border border-[#e2e8f0] rounded-2xl shadow-xs space-y-4 text-center">
                          <div className="text-center">
                            <span className="bg-[#ebddff] text-primary text-[9px] font-black py-1 px-3.5 rounded-full tracking-wider select-none">
                              메인 헤드라인
                            </span>
                          </div>
                          
                          <h3 className="font-display font-extrabold text-[#111] text-base md:text-lg tracking-tight leading-snug whitespace-pre-line">
                            {editableHeadline}
                          </h3>

                          {/* Image inside mockup */}
                          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-purple-50 flex items-center justify-center">
                            {!brokenImages[activeProject.generatedDetails.imageHotlink] ? (
                              <img 
                                src={activeProject.generatedDetails.imageHotlink} 
                                alt={activeProject.generatedDetails.imageAlt}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                                onError={() => handleImageError(activeProject.generatedDetails.imageHotlink)}
                              />
                            ) : (
                              <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
                                <Sparkles className="w-8 h-8 text-primary/30 mb-1" />
                                <span className="text-[10px] font-bold text-gray-400">이미지 분석 가이드 대체</span>
                              </div>
                            )}
                          </div>

                          <p className="font-sans text-gray-500 text-[11px] leading-relaxed whitespace-pre-line">
                            {editableSubtitle}
                          </p>
                        </div>

                        {/* 2. Problem Question block */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-primary font-display font-extrabold text-xs pl-1">
                            <span className="material-symbols-outlined text-[15px]">forum</span>
                            <span>문제 제기 후 설득 앵글</span>
                          </div>

                          <div className="p-5 bg-[#f1f3ff] border border-primary/10 rounded-2xl space-y-2">
                            <h4 className="font-extrabold text-xs text-primary leading-snug">
                              {editableProblemQuestion}
                            </h4>
                            <p className="font-sans text-[11px] leading-relaxed text-gray-600 whitespace-pre-line">
                              {editableProblemAnswer}
                            </p>
                          </div>
                        </div>

                        {/* 3. USP Grid boxes inside mockup */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-1.5 text-gray-800 font-display font-extrabold text-xs pl-1">
                            <span className="material-symbols-outlined text-[15px]">verified</span>
                            <span>구매 보증 USPs</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {activeProject.generatedDetails.usps.map((usp, i) => (
                              <div key={i} className="p-3 bg-white border border-[#e2e8f0] rounded-xl flex flex-col items-center justify-center text-center space-y-1.5">
                                <div className="bg-[#ebddff] p-1.5 rounded-full">
                                  {getUspIcon(usp.icon)}
                                </div>
                                <h5 className="font-sans font-bold text-[10px] text-[#111]">
                                  {usp.title}
                                </h5>
                                <p className="font-sans text-[9px] text-gray-400 leading-normal line-clamp-2">
                                  {usp.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Prompt controller in mockup */}
                        <div className="bg-white border border-gray-150 rounded-2xl p-4 space-y-2 shadow-xs">
                          <button 
                            onClick={() => setShowAiImageGuide(!showAiImageGuide)}
                            className="w-full bg-[#f1f3ff] border-2 border-dashed border-primary/25 rounded-xl p-2.5 flex flex-col items-center justify-center text-center space-y-1 hover:border-primary/50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-1 text-primary text-[10px] font-extrabold">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>AI 상세 이미지 구호법 보기</span>
                            </div>
                          </button>
                          {showAiImageGuide && (
                            <div className="p-2.5 bg-gray-50 rounded-xl space-y-1.5 text-[10px] font-sans">
                              <span className="font-bold text-gray-700 block">영어 생성 프롬프트:</span>
                              <p className="text-gray-500 bg-white p-2 rounded-lg border border-gray-100 font-mono select-all text-[9.5px]">
                                {activeProject.generatedDetails.imagePrompt}
                              </p>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </main>
            ) : (
              /* Mobile Results scroll view */
              <>
                <main id="result_page_preview" className="flex-1 overflow-y-auto hide-scrollbar pb-24 space-y-6">
                  {/* Card wrapper representing the generated details catalog template */}
                  <div className="mx-4 mt-5 p-5 bg-white border border-[#e2e8f0] rounded-2xl shadow-sm space-y-5">
                    
                    {/* Floating header tag */}
                    <div className="text-center">
                      <span className="bg-[#ebddff] text-primary text-[10px] font-black py-1.5 px-4 rounded-full tracking-wider select-none">
                        메인 헤드라인
                      </span>
                    </div>

                    {/* Main Headline */}
                    <div className="text-center space-y-1.5">
                      {isEditingMode ? (
                        <textarea 
                          value={editableHeadline} 
                          onChange={(e) => setEditableHeadline(e.target.value)}
                          className="w-full font-display font-extrabold text-[#111] text-lg text-center bg-yellow-50 border border-yellow-300 focus:outline-none p-2 rounded-xl min-h-[60px]"
                        />
                      ) : (
                        <h3 className="font-display font-extrabold text-[#111] text-xl tracking-tight leading-snug whitespace-pre-line">
                          {editableHeadline}
                        </h3>
                      )}
                    </div>

                    {/* Image Container */}
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#ebddff]/20 border border-gray-100 flex items-center justify-center">
                      {!brokenImages[activeProject.generatedDetails.imageHotlink] ? (
                        <img 
                          src={activeProject.generatedDetails.imageHotlink} 
                          alt={activeProject.generatedDetails.imageAlt}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={() => handleImageError(activeProject.generatedDetails.imageHotlink)}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                          <Sparkles className="w-10 h-10 text-primary/30 mb-2" />
                          <p className="text-xs font-bold text-gray-400">이미지가 로드되지 않았습니다</p>
                          <p className="text-[10px] text-gray-400/80 mt-1">상세페이지 카피라이팅 편집에 집중하여 확인할 수 있습니다.</p>
                        </div>
                      )}
                    </div>

                    {/* Tagline / Subtitle section */}
                    <div className="text-center px-2">
                      {isEditingMode ? (
                        <textarea 
                          value={editableSubtitle} 
                          onChange={(e) => setEditableSubtitle(e.target.value)}
                          className="w-full font-sans text-xs text-center text-gray-500 bg-yellow-50 border border-yellow-300 focus:outline-none p-2 rounded-xl min-h-[40px] leading-relaxed"
                        />
                      ) : (
                        <p className="font-sans text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                          {editableSubtitle}
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Section 2: "문제 해결 전략" (Problem Solving Strategy) from Mockup */}
                  <div className="px-4 space-y-3.5">
                    <div className="flex items-center gap-2 text-primary font-display font-extrabold text-base">
                      <span className="material-symbols-outlined text-primary text-xl">forum</span>
                      <span>문제 해결 전략</span>
                    </div>

                    <div className="p-5 bg-[#f1f3ff] border border-primary/10 rounded-2xl space-y-3">
                      {/* Problem Question */}
                      {isEditingMode ? (
                        <textarea 
                          value={editableProblemQuestion} 
                          onChange={(e) => setEditableProblemQuestion(e.target.value)}
                          className="w-full font-extrabold text-[15px] leading-snug text-primary bg-yellow-50 border border-yellow-300 focus:outline-none p-2 rounded-xl min-h-[40px]"
                        />
                      ) : (
                        <h4 className="font-extrabold text-base leading-snug text-primary font-sans">
                          {editableProblemQuestion}
                        </h4>
                      )}

                      {/* Problem Answer */}
                      {isEditingMode ? (
                        <textarea 
                          value={editableProblemAnswer} 
                          onChange={(e) => setEditableProblemAnswer(e.target.value)}
                          className="w-full font-sans text-xs leading-relaxed text-gray-600 bg-yellow-50 border border-yellow-300 focus:outline-none p-2 rounded-xl min-h-[100px]"
                        />
                      ) : (
                        <p className="font-sans text-[13px] leading-relaxed text-gray-600 whitespace-pre-line">
                          {editableProblemAnswer}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Section 3: High conversion USPs boxes layout from mockup */}
                  <div className="px-4 space-y-3.5">
                    {activeProject.generatedDetails.usps.map((usp, i) => (
                      <div key={i} className="p-4 bg-white border border-[#e2e8f0] rounded-2xl flex flex-col items-center justify-center text-center space-y-2 mt-2">
                        {/* Circle icon */}
                        <div className="bg-[#ebddff] p-3 rounded-full flex items-center justify-center">
                          {getUspIcon(usp.icon)}
                        </div>
                        <h5 className="font-sans font-extrabold text-sm text-[#111]">
                          {usp.title}
                        </h5>
                        <p className="font-sans text-[11px] text-gray-500 leading-normal">
                          {usp.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* EXTRA: "AI 이미지 가이드 확인하기" Button (Opens prompt modal) */}
                  <div className="px-4 pb-12">
                    <button 
                      onClick={() => setShowAiImageGuide(!showAiImageGuide)}
                      className="w-full bg-[#f1f3ff] border-2 border-dashed border-primary/25 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-1 hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 text-primary text-xs font-extrabold">
                        <Sparkles className="w-4 h-4" />
                        <span>AI 이미지 가이드 확인하기</span>
                      </div>
                      <p className="text-[10px] text-gray-400">이 카피에 가장 잘 어울리는 이미지 프롬프트를 확인하세요.</p>
                    </button>

                    {showAiImageGuide && (
                      <div className="mt-3 p-4 bg-white border border-[#e2e8f0] rounded-2xl space-y-2.5 shadow-sm transform transition-all">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-bold text-gray-800">추천 이미지 Alt/기획</span>
                          <span className="text-[9px] bg-primary/10 text-primary py-0.5 px-2 rounded font-bold font-mono">Suggested</span>
                        </div>
                        <p className="text-xs text-gray-600 font-sans italic leading-relaxed">
                          "{activeProject.generatedDetails.imageAlt}"
                        </p>
                        <div className="h-[1px] bg-[#eee]" />
                        <span className="text-[11px] font-bold text-gray-800 block">AI 생성용 프롬프트 (English)</span>
                        <div className="bg-[#f1f3f9] p-3 rounded-xl">
                          <p className="text-[10px] text-gray-600 font-mono select-all leading-normal">
                            {activeProject.generatedDetails.imagePrompt}
                          </p>
                        </div>
                        <span className="text-[9px] text-gray-400 leading-normal block">💡 이 프롬프트를 복사하여 Midjourney 혹은 Imagen에 대입하면 최적의 제품 컷을 생성해냅니다.</span>
                      </div>
                    )}
                  </div>
                </main>

                {/* Bottom Nav on Result page to quickly return Home */}
                <div className="sticky bottom-0 max-w-md w-full bg-white border-t border-[#eee] min-h-16 px-4 flex items-center justify-around shadow-xl z-20">
                  <button 
                    onClick={() => setCurrentView("dashboard")}
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary focus:outline-none cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[23px]">home</span>
                    <span className="text-[10px] font-bold">홈</span>
                  </button>
                  
                  <button 
                    onClick={() => showToast("전체 프로젝트 페이지 준비 중입니다!")}
                    className="flex flex-col items-center gap-1 text-[#5300b7] font-bold focus:outline-none cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[23px]" style={{ fontVariationSettings: "'FILL' 1" }}>folder_open</span>
                    <span className="text-[10px] font-bold">프로젝트</span>
                  </button>

                  <button 
                    onClick={() => showToast("템플릿 탐색 페이지 준비 중입니다!")}
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary focus:outline-none cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[23px]">dashboard_customize</span>
                    <span className="text-[10px] font-bold">템플릿</span>
                  </button>

                  <button 
                    onClick={() => showToast("마이 페이지 준비 중입니다!")}
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary focus:outline-none cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[23px]">person</span>
                    <span className="text-[10px] font-bold">마이</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* VIEW: DIAGNOSIS INPUT VIEW */}
        {currentView === "diagnosis-input" && (
          <div className="flex flex-col min-h-screen bg-[#f8f9fc] w-full">
            {/* Global Header adapted for Desktop and Mobile */}
            {isDesktopLayout ? (
              <header className="w-full bg-white border-b border-[#f0f0f5] px-8 py-4 flex items-center justify-between sticky top-0 z-40 bg-white/80 backdrop-blur-md select-none">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView("dashboard")}>
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5300b7] to-[#800cf2] flex items-center justify-center text-white shrink-0 shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h1 className="text-lg md:text-xl font-display font-black text-primary tracking-tight">팔리는페이지</h1>
                  <span className="bg-primary/10 text-primary text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ml-1.5 leading-none">AI 정밀 진단닥터</span>
                </div>
                
                <span className="font-display font-extrabold text-[#111] text-xs bg-gray-50 border border-gray-100 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
                  <span>상세페이지 심화 CRO 자가 분석 진단서 신청</span>
                </span>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentView("dashboard")} 
                    className="text-xs font-bold text-gray-500 hover:text-primary flex items-center gap-1 cursor-pointer bg-white border border-gray-200/80 px-4 py-2.5 rounded-xl transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>대시보드로 가기</span>
                  </button>
                </div>
              </header>
            ) : (
              <header className="sticky top-0 bg-white border-b border-[#eee] min-h-16 px-4 flex items-center justify-between z-10 shadow-sm">
                <button 
                  onClick={() => setCurrentView("dashboard")} 
                  className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 focus:outline-none cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h3 className="text-base font-display font-extrabold text-gray-800">상세페이지 AI 정밀 진단</h3>
                <div className="w-8 h-8" />
              </header>
            )}

            {/* Main content area */}
            {isDesktopLayout ? (
              <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-8 md:grid md:grid-cols-12 md:gap-8 md:items-start overflow-y-auto">
                
                {/* LEFT INFOCUS SUMMARY CARD COLUMN */}
                <div className="md:col-span-5 space-y-6">
                  <div className="bg-gradient-to-br from-[#ebf3ff] to-[#e4e9fe] border border-primary/10 rounded-3xl p-8 space-y-6 shadow-xs select-none">
                    <div className="space-y-2 font-display">
                      <span className="text-[10px] bg-primary/20 text-primary py-1 px-3 rounded-full font-bold uppercase tracking-wider">Premium CRO Doctor</span>
                      <h3 className="text-xl font-black text-gray-900 mt-2">이탈률 대폭 저하 및 전환 기법</h3>
                      <p className="text-xs text-gray-500 leading-relaxed font-sans mt-1">
                        어려운 데이터 애널리틱스 분석 없이, 카피라이팅과 기획적 구조의 핵심 허점을 찾아 1:1 진단 처방안을 도출해냅니다.
                      </p>
                    </div>

                    <div className="space-y-4 pt-2 text-xs font-sans">
                      <div className="flex gap-3.5 bg-white p-4 rounded-2xl border border-primary/5">
                        <div className="w-9 h-9 rounded-xl bg-[#ebddff] flex items-center justify-center text-primary shrink-0">
                          <Eye className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-gray-800 text-xs">고객 시선의 3초 이탈 구간 개량</h4>
                          <p className="text-gray-400 text-[10.5px] mt-0.5">핵심 훅 문장의 명확성과 흡인력을 정량 평가합니다.</p>
                        </div>
                      </div>

                      <div className="flex gap-3.5 bg-white p-4 rounded-2xl border border-primary/5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-gray-800 text-xs">해결 전략의 구체성 채점</h4>
                          <p className="text-gray-400 text-[10.5px] mt-0.5">문제 제기와 대안 제시가 매끄러운 설득력을 구비 중인지 확인합니다.</p>
                        </div>
                      </div>

                      <div className="flex gap-3.5 bg-white p-4 rounded-2xl border border-primary/5">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-gray-800 text-xs">즉각적인 Before & After 개량카피 제시</h4>
                          <p className="text-gray-400 text-[10.5px] mt-0.5">진단 즉시 현장에서 대입해볼 수 있는 직관적인 리라이팅 예시를 수혈합니다.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT DIAGNOSIS INPUT FORM COLUMN */}
                <div className="md:col-span-7">
                  <div className="bg-white border border-gray-200 p-8 rounded-3xl space-y-6 shadow-sm">
                    <div className="border-b border-gray-100 pb-3 flex justify-between items-center select-none">
                      <h3 className="text-base font-extrabold text-gray-900 font-display">상품 정보 입력 양식</h3>
                      <span className="text-[10px] text-gray-400">필수 항목은 꼼꼼하게 작성해 주세요</span>
                    </div>

                    {/* 1. Product Title */}
                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        <span>진단 대상 상품명</span>
                      </label>
                      <input 
                        type="text" 
                        placeholder="예: 최상급 청송 유기농 사과즙"
                        value={diagnosisPrdName}
                        onChange={(e) => setDiagnosisPrdName(e.target.value)}
                        className="w-full text-xs font-sans border border-[#cbd5e1] focus:border-primary focus:outline-none p-3.5 rounded-xl bg-gray-50/20 text-gray-900"
                      />
                    </div>

                    {/* 2. Category selection */}
                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-primary">category</span>
                        <span>상품 카테고리</span>
                      </label>
                      <select 
                        value={diagnosisCategory}
                        onChange={(e) => setDiagnosisCategory(e.target.value)}
                        className="w-full text-xs font-sans border border-[#cbd5e1] focus:border-primary focus:outline-none p-3.5 rounded-xl bg-white text-gray-900"
                      >
                        <option value="식품">식품</option>
                        <option value="생활/주방">생활/주방</option>
                        <option value="의류/패션">의류/패션</option>
                        <option value="가전/디지털">가전/디지털</option>
                        <option value="뷰티/화장품">뷰티/화장품</option>
                      </select>
                    </div>

                    {/* 3. URL input */}
                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-primary">link</span>
                        <span>상세페이지 URL (선택)</span>
                      </label>
                      <input 
                        type="text" 
                        placeholder="예: https://smartstore.naver.com/my-shop/products/123"
                        value={diagnosisUrl}
                        onChange={(e) => setDiagnosisUrl(e.target.value)}
                        className="w-full text-xs font-sans border border-[#cbd5e1] focus:border-primary focus:outline-none p-3.5 rounded-xl bg-gray-50/20 text-gray-900"
                      />
                    </div>

                    {/* 4. Text Content input */}
                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-primary">description</span>
                        <span>상세페이지 기존 카피 직접 작성 (권장)</span>
                      </label>
                      <textarea 
                        placeholder="현재 판매 중이거나 작성 중인 상세페이지 카피 문구나 특징 설명글을 적어 주시면, AI가 카피 전환율을 점검하고 개성 넘치는 비포&애프터 대안을 제안합니다."
                        value={diagnosisContent}
                        onChange={(e) => setDiagnosisContent(e.target.value)}
                        className="w-full text-xs font-sans border border-[#cbd5e1] focus:border-primary focus:outline-none p-3.5 rounded-xl bg-gray-50/20 min-h-[160px] leading-relaxed text-gray-900"
                      />
                      <p className="text-[10px] text-gray-400">💡 문장이나 특징적인 소구 포인트가 구체적일수록 정교하고 완성도 높은 진단 리포트가 완성됩니다.</p>
                    </div>

                    <button 
                      onClick={handleDiagnosePage}
                      className="w-full bg-primary hover:bg-[#410091] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[98%] cursor-pointer"
                    >
                      <Activity className="w-5 h-5 text-white animate-pulse" />
                      <span>상세페이지 AI 정밀 진단 시작</span>
                    </button>
                  </div>
                </div>
              </main>
            ) : (
              /* Mobile Diagnosis input flow container */
              <>
                <main className="flex-1 p-5 space-y-6 pb-28">
                  {/* Top Banner */}
                  <div className="bg-gradient-to-r from-primary to-[#7012ff] text-white p-5 rounded-2xl shadow-sm space-y-1.5 relative overflow-hidden">
                    <div className="z-10 relative">
                      <span className="text-[10px] bg-white/20 py-0.5 px-2 rounded-full font-bold">Premium CRO Doctor</span>
                      <h4 className="text-base font-display font-bold mt-1.5">이탈 고객의 90%를 막는 진단 기법</h4>
                      <p className="text-xs text-white/85">판매 부진 원인과 카피 부족 처방전을 즉시 받아보세요.</p>
                    </div>
                    <BarChart2 className="w-20 h-20 absolute right-[-15px] bottom-[-15px] text-white/10" />
                  </div>

                  {/* Form inputs */}
                  <div className="bg-white border border-[#e2e8f0] p-5 rounded-3xl space-y-4 shadow-xs">
                    
                    {/* 1. Product Title */}
                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        <span>진단 대상 상품명</span>
                      </label>
                      <input 
                        type="text" 
                        placeholder="예: 최상급 청송 유기농 사과즙"
                        value={diagnosisPrdName}
                        onChange={(e) => setDiagnosisPrdName(e.target.value)}
                        className="w-full text-xs font-sans border border-[#cbd5e1] focus:border-primary focus:outline-none p-3.5 rounded-xl bg-gray-50/50 text-gray-900"
                      />
                    </div>

                    {/* 2. Category selection */}
                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-primary">category</span>
                        <span>상품 카테고리</span>
                      </label>
                      <select 
                        value={diagnosisCategory}
                        onChange={(e) => setDiagnosisCategory(e.target.value)}
                        className="w-full text-xs font-sans border border-[#cbd5e1] focus:border-primary focus:outline-none p-3.5 rounded-xl bg-white text-gray-900"
                      >
                        <option value="식품">식품</option>
                        <option value="생활/주방">생활/주방</option>
                        <option value="의류/패션">의류/패션</option>
                        <option value="가전/디지털">가전/디지털</option>
                        <option value="뷰티/화장품">뷰티/화장품</option>
                      </select>
                    </div>

                    {/* 3. URL input */}
                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-primary">link</span>
                        <span>상세페이지 URL (선택)</span>
                      </label>
                      <input 
                        type="text" 
                        placeholder="예: https://smartstore.naver.com/my-shop/products/123"
                        value={diagnosisUrl}
                        onChange={(e) => setDiagnosisUrl(e.target.value)}
                        className="w-full text-xs font-sans border border-[#cbd5e1] focus:border-primary focus:outline-none p-3.5 rounded-xl bg-gray-50/50 text-gray-900"
                      />
                    </div>

                    {/* 4. Text Content input */}
                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary">description</span>
                        <span>상세페이지 기존 카피 직접 작성 (권장)</span>
                      </label>
                      <textarea 
                        placeholder="현재 판매 중이거나 작성 중인 상세페이지 카피 문구나 특징 설명글을 적어 주시면, AI가 카피 전환율을 점검하고 개성 넘치는 비포&애프터 대안을 제안합니다."
                        value={diagnosisContent}
                        onChange={(e) => setDiagnosisContent(e.target.value)}
                        className="w-full text-xs font-sans border border-[#cbd5e1] focus:border-primary focus:outline-none p-3.5 rounded-xl bg-gray-50/50 min-h-[140px] leading-relaxed text-gray-900"
                      />
                      <p className="text-[10px] text-gray-400">💡 문장이나 문구가 많을수록 AI가 더 상세하고 날카로운 피드백과 대안을 제시할 수 있습니다.</p>
                    </div>

                  </div>
                </main>

                {/* Bottom Sticky Action Trigger */}
                <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#eee] p-4 z-40">
                  <button 
                    onClick={handleDiagnosePage}
                    className="w-full bg-primary hover:bg-[#410091] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[98%] cursor-pointer"
                  >
                    <Activity className="w-5 h-5 text-white animate-pulse" />
                    <span>상세페이지 AI 정밀 진단 시작</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}


        {/* VIEW: DIAGNOSIS LOADING VIEW */}
        {currentView === "diagnosis-loading" && (
          <div className="flex flex-col min-h-screen items-center justify-center bg-gray-900 px-6 py-12 text-center text-white relative overflow-hidden">
            
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/10 rounded-full blur-3xl opacity-60" />
            
            <div className="z-10 space-y-8 max-w-sm">
              
              {/* Large Radar Scanner Graphic */}
              <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
                {/* Outermost pulsing ring */}
                <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-pulse" />
                
                {/* Middle Rotating radar sweep */}
                <div className="absolute inset-2 border border-purple-500/30 rounded-full" />
                <div className="absolute inset-6 border border-dashed border-teal-500/25 rounded-full animate-spin" style={{ animationDuration: '15s' }} />
                
                {/* Scanning sweep line */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/40 rounded-full animate-spin" style={{ animationDuration: '3s' }} />

                {/* Central diagnostic gear / analysis shield */}
                <div className="absolute w-20 h-20 bg-gray-800 border-2 border-primary rounded-full flex items-center justify-center shadow-2xl">
                  <Activity className="w-8 h-8 text-purple-400 animate-pulse" />
                </div>
              </div>

              {/* Progress Labels */}
              <div className="space-y-3.5 transform transition-all duration-500">
                <span className="text-[10px] bg-primary/30 text-purple-300 font-extrabold font-mono py-1 px-3 rounded-full uppercase tracking-wider animate-pulse">
                  Analyzing Landing Copy
                </span>
                <h4 className="text-lg font-display font-extrabold tracking-tight">상세페이지 정밀 심사 중</h4>
                <p className="text-xs text-gray-400 leading-normal h-12 font-sans px-4">
                  {diagnosisLoadingText}
                </p>
              </div>

              {/* Tips block */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left">
                <div className="flex items-center gap-1.5 text-purple-300 text-[11px] font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>진단 꿀팁!</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-normal">
                  헤드라인 3초 이탈 구간을 지배하는 문장만 점검해도 상세페이지 전환 지표가 최대 180% 이상 격상될 수 있습니다.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* VIEW: DIAGNOSIS RESULT VIEW */}
        {currentView === "diagnosis-result" && diagnosisReport && (
          <div className="flex flex-col min-h-screen bg-[#f8f9fc] w-full">
            {/* Global Top Header adapted for Widescreen Desktop / Mobile */}
            {isDesktopLayout ? (
              <header className="w-full bg-white border-b border-[#f0f0f5] px-8 py-4 flex items-center justify-between sticky top-0 z-40 bg-white/80 backdrop-blur-md select-none">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView("dashboard")}>
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5300b7] to-[#800cf2] flex items-center justify-center text-white shrink-0 shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h1 className="text-lg md:text-xl font-display font-black text-primary tracking-tight">팔리는페이지</h1>
                  <span className="bg-primary/10 text-primary text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ml-1.5 leading-none">AI 정밀 소구닥터</span>
                </div>
                
                <span className="font-display font-extrabold text-[#111] text-xs bg-gray-50 border border-gray-100 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#5300b7] animate-pulse" />
                  <span>상세페이지 심화 CRO 정밀 진단 결과 보고서</span>
                </span>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentView("diagnosis-input")}
                    className="text-xs font-bold text-gray-500 hover:text-primary flex items-center gap-1 bg-white border border-gray-200/80 px-4 py-2 rounded-xl transition-all mr-1"
                  >
                    <span>새로 진단하기</span>
                  </button>
                  <button 
                    onClick={() => setCurrentView("dashboard")} 
                    className="text-xs font-bold text-white bg-primary hover:bg-[#410091] px-4 py-2 rounded-xl transition-all shadow-xs"
                  >
                    <span>대시보드로 가기</span>
                  </button>
                </div>
              </header>
            ) : (
              <header className="sticky top-0 bg-white border-b border-[#eee] min-h-16 px-4 flex items-center justify-between z-30 shadow-sm col-span-full">
                <button 
                  onClick={() => setCurrentView("dashboard")} 
                  className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 focus:outline-none cursor-pointer"
                  title="홈으로"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h3 className="text-base font-display font-extrabold text-gray-800">상세페이지 AI 진단서</h3>
                <button 
                  onClick={() => setCurrentView("diagnosis-input")}
                  className="text-xs text-primary font-bold hover:underline cursor-pointer"
                >
                  재입력
                </button>
              </header>
            )}

            {/* Main content body */}
            {isDesktopLayout ? (
              <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-8 md:grid md:grid-cols-12 md:gap-8 md:items-start overflow-y-auto">
                {/* Desktop Left Column: Overall Verdict and scorecard */}
                <div className="md:col-span-4 space-y-6 sticky top-24">
                  {/* Card 1: Score & Overall Verdict visual module */}
                  <div className="bg-white border border-gray-200/80 p-8 rounded-3xl shadow-xs text-center space-y-6 relative overflow-hidden select-none">
                    <span className="text-[10px] font-display font-extrabold uppercase px-3 py-1.5 rounded-full bg-primary/10 text-primary tracking-wide">
                      Conversion Strength Rate
                    </span>

                    {/* Interactive Score Circle widget */}
                    <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                      <div className="absolute inset-0 border-8 border-gray-100 rounded-full" />
                      <div className={`absolute inset-0 border-8 rounded-full ${
                        diagnosisReport.score < 60 
                          ? "border-red-500" 
                          : diagnosisReport.score < 80 
                          ? "border-amber-500" 
                          : "border-teal-500"
                      }`} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} />

                      <div className="z-10 flex flex-col items-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Score</span>
                        <span className="text-4xl font-display font-black text-gray-900">{diagnosisReport.score}</span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 mt-1 rounded-full ${
                          diagnosisReport.score < 60 
                            ? "bg-red-50 text-red-600" 
                            : diagnosisReport.score < 80 
                            ? "bg-amber-50 text-amber-600" 
                            : "bg-teal-50 text-teal-600"
                        }`}>
                          {diagnosisReport.score < 60 ? "위험" : diagnosisReport.score < 80 ? "보통" : "최적"}
                        </span>
                      </div>
                    </div>

                    {/* Overall Diagnostic comment box */}
                    <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl text-left">
                      <div className="flex items-center gap-1.5 text-xs text-gray-800 font-extrabold mb-1.5">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>정밀 전문 진단 종합 의견</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line font-sans">
                        {diagnosisReport.overallVerdict}
                      </p>
                    </div>
                  </div>

                  {/* Card 4: Action check lists */}
                  <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-4 shadow-xs select-none">
                    <div className="flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-display font-extrabold text-[#111]">즉시 적용할 핵심 3대 실천 가이드</span>
                    </div>

                    <ul className="space-y-3">
                      {diagnosisReport.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 bg-[#ebddff] text-primary rounded-full flex items-center justify-center text-[10px] font-mono font-black mt-0.5 flex-shrink-0">
                            {i + 1}
                          </span>
                          <p className="text-xs text-gray-600 font-sans leading-relaxed">
                            {rec}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Desktop Right Column: Diagnostic breakdowns and core copy overhauls */}
                <div className="md:col-span-8 space-y-6">
                  {/* Card 2: Metrics List */}
                  <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm space-y-4">
                    <div className="flex items-center gap-1.5 text-gray-800 font-display font-extrabold text-sm border-b border-gray-100 pb-3 select-none">
                      <BarChart2 className="w-4 h-4 text-primary" />
                      <span>진단 영역별 지표 상세 채점표</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      
                      {/* 1. Hook */}
                      <div className="bg-gray-50/50 border border-gray-100 p-5 rounded-2xl space-y-2">
                        <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-gray-100">
                          <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>첫 3초 후킹 지수</span>
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-mono font-bold text-gray-900">{diagnosisReport.metrics.hook.score}점</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              diagnosisReport.metrics.hook.status === "취약"
                                ? "bg-red-50 text-red-600 border border-red-100"
                                : diagnosisReport.metrics.hook.status === "개선필요"
                                ? "bg-amber-50 text-amber-600 border border-amber-100"
                                : "bg-teal-50 text-teal-600 border border-teal-100"
                            }`}>
                              {diagnosisReport.metrics.hook.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed pl-1.5 font-sans">
                          {diagnosisReport.metrics.hook.feedback}
                        </p>
                      </div>

                      {/* 2. Agitation */}
                      <div className="bg-gray-50/50 border border-gray-100 p-5 rounded-2xl space-y-2">
                        <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-gray-100">
                          <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                            <ThumbsDown className="w-3.5 h-3.5 text-red-400" />
                            <span>불편 공감 극대화 지수</span>
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-mono font-bold text-gray-900">{diagnosisReport.metrics.agitation.score}점</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              diagnosisReport.metrics.agitation.status === "취약"
                                ? "bg-red-50 text-red-600 border border-red-100"
                                : diagnosisReport.metrics.agitation.status === "개선필요"
                                ? "bg-amber-50 text-amber-600 border border-amber-100"
                                : "bg-teal-50 text-teal-600 border border-teal-100"
                            }`}>
                              {diagnosisReport.metrics.agitation.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed pl-1.5 font-sans">
                          {diagnosisReport.metrics.agitation.feedback}
                        </p>
                      </div>

                      {/* 3. Clarity */}
                      <div className="bg-gray-50/50 border border-gray-100 p-5 rounded-2xl space-y-2 col-span-2">
                        <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-gray-100">
                          <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                            <ThumbsUp className="w-3.5 h-3.5 text-teal-500" />
                            <span>USP 설명 선명도</span>
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-mono font-bold text-gray-900">{diagnosisReport.metrics.clarity.score}점</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              diagnosisReport.metrics.clarity.status === "취약"
                                ? "bg-red-50 text-red-600 border border-red-100"
                                : diagnosisReport.metrics.clarity.status === "개선필요"
                                ? "bg-amber-50 text-amber-600 border border-amber-100"
                                : "bg-teal-50 text-teal-600 border border-teal-100"
                            }`}>
                              {diagnosisReport.metrics.clarity.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed pl-1.5 font-sans">
                          {diagnosisReport.metrics.clarity.feedback}
                        </p>
                      </div>

                      {/* 4. Readability */}
                      <div className="bg-gray-50/50 border border-gray-100 p-5 rounded-2xl space-y-2 col-span-2">
                        <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-gray-100">
                          <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                            <Activity className="w-3.5 h-3.5 text-[#8b5cf6]" />
                            <span>모바일 최적화 가독성 및 가치제안</span>
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-mono font-bold text-gray-900">{diagnosisReport.metrics.readability.score}점</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              diagnosisReport.metrics.readability.status === "취약"
                                ? "bg-red-50 text-red-600 border border-red-100"
                                : diagnosisReport.metrics.readability.status === "개선필요"
                                ? "bg-amber-50 text-amber-600 border border-amber-100"
                                : "bg-teal-50 text-teal-600 border border-teal-100"
                            }`}>
                              {diagnosisReport.metrics.readability.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed pl-1.5 font-sans">
                          {diagnosisReport.metrics.readability.feedback}
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Card 3: Before vs After copy overhaul display box */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-1.5 text-gray-800 font-display font-extrabold text-sm ml-1 select-none">
                      <span className="material-symbols-outlined text-[17px] text-primary">published_with_changes</span>
                      <span>AI 카피 대안 및 기획 수정 제안</span>
                    </div>

                    <div className="space-y-4">
                      {diagnosisReport.beforeAfterCopys.map((copy, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xs">
                          <header className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-xs font-bold text-gray-700">{copy.sectionName}</span>
                          </header>

                          <div className="p-5 space-y-4">
                            {/* Before (Red) */}
                            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl relative">
                              <span className="absolute right-4 top-4 text-[8px] bg-red-100 text-red-600 py-0.5 px-2 rounded-full font-extrabold uppercase">
                                Before (기존)
                              </span>
                              <span className="text-[10px] text-red-500 font-bold block mb-1">단조로운 문장</span>
                              <p className="text-xs text-gray-600 leading-relaxed font-sans pr-14 italic">
                                "{copy.before}"
                              </p>
                            </div>

                            {/* Arrow separator */}
                            <div className="flex justify-center">
                              <div className="bg-primary/5 p-1 rounded-full border border-primary/15 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-base">arrow_downward</span>
                              </div>
                            </div>

                            {/* After (Teal/Purple) */}
                            <div className="bg-teal-50 border border-teal-100 p-5 rounded-2xl relative">
                              <span className="absolute right-4 top-4 text-[8px] bg-[#ebddff] text-primary py-0.5 px-3 rounded-full font-bold uppercase flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" />
                                <span>AI 추천 한글 카피</span>
                              </span>
                              <span className="text-[10px] text-teal-600 font-extrabold block mb-1">전환 증가를 일으키는 구성</span>
                              <p className="text-xs text-gray-900 font-sans font-bold leading-relaxed pr-16 whitespace-pre-line">
                                {copy.after}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Back to Home CTA Actions */}
                  <div className="bg-[#f1f3ff] border border-primary/10 p-6 rounded-3xl flex items-center justify-between gap-4">
                    <div className="space-y-1 text-left">
                      <h4 className="text-sm font-extrabold text-gray-900 font-display">획기적인 전환용 카피 생성하기</h4>
                      <p className="text-[11.5px] text-gray-500">지금 진단해본 정보를 온전히 렌더링에 주입하여 나만의 완벽한 모사 상세페이지 빌딩을 지시해 보세요.</p>
                    </div>
                    <div className="flex shrink-0 gap-2 font-sans">
                      <button 
                        onClick={() => setCurrentView("dashboard")}
                        className="bg-white border border-[#cbd5e1] text-gray-700 text-xs font-bold px-4 py-3 rounded-xl transition-all cursor-pointer hover:bg-gray-5"
                      >
                        대시보드로 가기
                      </button>
                      <button 
                        onClick={() => {
                          setName(diagnosisPrdName || "진단 상품");
                          setCategory(diagnosisCategory);
                          setTargetCustomer("이 상품의 고밀도 잠재고객 분들");
                          setPainPoints([
                            "가장 불편함을 느꼈을 법한 대표적 결핍 상황",
                            "기존 시중의 보급형 제품 사용시 누적되는 아쉬운 애로 사항"
                          ]);
                          setUsPs([
                            "가장 확실하고 투명한 강점 요인",
                            "편안한 소지 및 환경을 배려한 최고급 설계",
                            "소유에 최대 만족을 심는 마감과 검증"
                          ]);
                          setCurrentView("form-step-1");
                        }}
                        className="bg-primary hover:bg-[#410091] text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md transition-all active:scale-[98%] cursor-pointer flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                        <span>맞춤 상세 카피 제작</span>
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            ) : (
              /* Mobile Results scroll view layout */
              <>
                <main className="flex-1 p-4 space-y-6 pb-24 overflow-y-auto">
                  {/* Card 1: Score & Overall Verdict visual module */}
                  <div className="bg-white border border-[#e2e8f0] p-6 rounded-3xl shadow-sm text-center space-y-5 relative overflow-hidden">
                    <span className="text-[10px] font-display font-extrabold uppercase px-2.5 py-1 rounded-full bg-primary/10 text-primary tracking-wide">
                      Conversion Strength Rate
                    </span>

                    {/* Interactive Score Circle widget */}
                    <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                      <div className="absolute inset-0 border-8 border-gray-100 rounded-full" />
                      <div className={`absolute inset-0 border-8 rounded-full ${
                        diagnosisReport.score < 60 
                          ? "border-red-500" 
                          : diagnosisReport.score < 80 
                          ? "border-amber-500" 
                          : "border-teal-500"
                      }`} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} />

                      <div className="z-10 flex flex-col items-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Score</span>
                        <span className="text-4xl font-display font-black text-gray-900">{diagnosisReport.score}</span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 mt-1 rounded-full ${
                          diagnosisReport.score < 60 
                            ? "bg-red-50 text-red-600" 
                            : diagnosisReport.score < 80 
                            ? "bg-amber-50 text-amber-600" 
                            : "bg-teal-50 text-teal-600"
                        }`}>
                          {diagnosisReport.score < 60 ? "위험" : diagnosisReport.score < 80 ? "보통" : "최적"}
                        </span>
                      </div>
                    </div>

                    {/* Overall Diagnostic comment box */}
                    <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-left">
                      <div className="flex items-center gap-1.5 text-xs text-gray-800 font-extrabold mb-1.5">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>정밀 전문 진단 종합 의견</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line font-sans">
                        {diagnosisReport.overallVerdict}
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Metrics Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-gray-800 font-display font-extrabold text-sm ml-1">
                      <BarChart2 className="w-4 h-4 text-primary" />
                      <span>진단 영역별 지표 평가</span>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      
                      {/* 1. Hook */}
                      <div className="bg-white border border-gray-200 p-4 rounded-2xl space-y-2">
                        <div className="flex justify-between items-center bg-gray-50 p-2 rounded-xl">
                          <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            <span>첫 3초 후킹 지수</span>
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-mono font-bold text-gray-900">{diagnosisReport.metrics.hook.score}점</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              diagnosisReport.metrics.hook.status === "취약"
                                ? "bg-red-50 text-red-600 border border-red-100"
                                : diagnosisReport.metrics.hook.status === "개선필요"
                                ? "bg-amber-50 text-amber-600 border border-amber-100"
                                : "bg-teal-50 text-teal-600 border border-teal-100"
                            }`}>
                              {diagnosisReport.metrics.hook.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed pl-1.5 font-sans">
                          {diagnosisReport.metrics.hook.feedback}
                        </p>
                      </div>

                      {/* 2. Agitation */}
                      <div className="bg-white border border-gray-200 p-4 rounded-2xl space-y-2">
                        <div className="flex justify-between items-center bg-gray-50 p-2 rounded-xl">
                          <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                            <ThumbsDown className="w-4 h-4 text-red-400" />
                            <span>불편 공감 극대화 지수</span>
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-mono font-bold text-gray-900">{diagnosisReport.metrics.agitation.score}점</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              diagnosisReport.metrics.agitation.status === "취약"
                                ? "bg-red-50 text-red-600 border border-red-100"
                                : diagnosisReport.metrics.agitation.status === "개선필요"
                                ? "bg-amber-50 text-amber-600 border border-amber-100"
                                : "bg-teal-50 text-teal-600 border border-teal-100"
                            }`}>
                              {diagnosisReport.metrics.agitation.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed pl-1.5 font-sans">
                          {diagnosisReport.metrics.agitation.feedback}
                        </p>
                      </div>

                      {/* 3. Clarity */}
                      <div className="bg-white border border-gray-200 p-4 rounded-2xl space-y-2">
                        <div className="flex justify-between items-center bg-gray-50 p-2 rounded-xl">
                          <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4 text-teal-500" />
                            <span>USP 설명 선명도</span>
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-mono font-bold text-gray-900">{diagnosisReport.metrics.clarity.score}점</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              diagnosisReport.metrics.clarity.status === "취약"
                                ? "bg-red-50 text-red-600 border border-red-100"
                                : diagnosisReport.metrics.clarity.status === "개선필요"
                                ? "bg-amber-50 text-amber-600 border border-amber-100"
                                : "bg-teal-50 text-teal-600 border border-teal-100"
                            }`}>
                              {diagnosisReport.metrics.clarity.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed pl-1.5 font-sans">
                          {diagnosisReport.metrics.clarity.feedback}
                        </p>
                      </div>

                      {/* 4. Readability */}
                      <div className="bg-white border border-gray-200 p-4 rounded-2xl space-y-2">
                        <div className="flex justify-between items-center bg-gray-50 p-2 rounded-xl">
                          <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                            <Activity className="w-4 h-4 text-[#8b5cf6]" />
                            <span>모바일 최적화 가독성</span>
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-mono font-bold text-gray-900">{diagnosisReport.metrics.readability.score}점</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              diagnosisReport.metrics.readability.status === "취약"
                                ? "bg-red-50 text-red-600 border border-red-100"
                                : diagnosisReport.metrics.readability.status === "개선필요"
                                ? "bg-amber-50 text-amber-600 border border-amber-100"
                                : "bg-teal-50 text-teal-600 border border-teal-100"
                            }`}>
                              {diagnosisReport.metrics.readability.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed pl-1.5 font-sans">
                          {diagnosisReport.metrics.readability.feedback}
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Card 3: Before vs After copy overhaul display box */}
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-1.5 text-gray-800 font-display font-extrabold text-sm ml-1">
                      <span className="material-symbols-outlined text-[17px] text-primary">published_with_changes</span>
                      <span>AI 카피 대안 (개선 제안)</span>
                    </div>

                    <div className="space-y-4">
                      {diagnosisReport.beforeAfterCopys.map((copy, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xs">
                          
                          {/* Section label */}
                          <header className="bg-gray-50 px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-xs font-bold text-gray-700">{copy.sectionName}</span>
                          </header>

                          <div className="p-4 space-y-3">
                            
                            {/* Before (Red) */}
                            <div className="bg-red-50 border border-red-100 p-3.5 rounded-2xl relative">
                              <span className="absolute right-3.5 top-3.5 text-[8px] bg-red-100 text-red-600 py-0.5 px-2 rounded-full font-extrabold uppercase">
                                Before (기존)
                              </span>
                              <span className="text-[10px] text-red-500 font-bold block mb-1">단조로운 문장</span>
                              <p className="text-xs text-gray-600 leading-relaxed font-sans pr-14 italic">
                                "{copy.before}"
                              </p>
                            </div>

                            {/* Arrow separator in middle */}
                            <div className="flex justify-center my-1.5">
                              <div className="bg-primary/5 p-1 rounded-full border border-primary/15 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-base animate-pulse">arrow_downward</span>
                              </div>
                            </div>

                            {/* After (Teal/Purple) */}
                            <div className="bg-teal-50 border border-teal-100 p-4 rounded-2xl relative">
                              <span className="absolute right-3.5 top-3.5 text-[8px] bg-[#ebddff] text-primary py-0.5 px-3 rounded-full font-bold uppercase flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" />
                                <span>AI 추천 한글 카피</span>
                              </span>
                              <span className="text-[10px] text-teal-600 font-extrabold block mb-1">전환 증가를 일으키는 구성</span>
                              <p className="text-xs text-gray-900 font-sans font-bold leading-relaxed pr-16">
                                {copy.after}
                              </p>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card 4: Action check lists */}
                  <div className="bg-white p-5 rounded-3xl border border-gray-200 space-y-4">
                    <div className="flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-display font-extrabold text-[#111]">즉시 적용할 핵심 3대 실천 가이드</span>
                    </div>

                    <ul className="space-y-3">
                      {diagnosisReport.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 bg-[#ebddff] text-primary rounded-full flex items-center justify-center text-[10px] font-mono font-black mt-0.5 flex-shrink-0">
                            {i + 1}
                          </span>
                          <p className="text-xs text-gray-600 font-sans leading-relaxed">
                            {rec}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Back to Home CTA Actions */}
                  <div className="space-y-3 pt-2">
                    <button 
                      onClick={() => {
                        // Populate basic parameters to generate a fresh detailed copy page with CRO optimized values!
                        setName(diagnosisPrdName || "진단 상품");
                        setCategory(diagnosisCategory);
                        setTargetCustomer("이 상품의 고밀도 잠재고객 분들");
                        setPainPoints([
                          "가장 불편함을 느꼈을 법한 대표적 결핍 상황",
                          "기존 시중의 보급형 제품 사용시 누적되는 아쉬운 애로 사항"
                        ]);
                        setUsPs([
                          "가장 확실하고 투명한 강점 요인",
                          "편안한 소지 및 환경을 배려한 최고급 설계",
                          "소유에 최대 만족을 심는 마감과 검증"
                        ]);
                        setCurrentView("form-step-1");
                      }}
                      className="w-full bg-primary hover:bg-[#410091] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[98%] cursor-pointer font-sans"
                    >
                      <Sparkles className="w-5 h-5 text-white" />
                      <span>이 진단내용 기반으로 새 상세 카피 만들기</span>
                    </button>

                    <button 
                      onClick={() => setCurrentView("dashboard")}
                      className="w-full bg-white border border-[#cbd5e1] text-gray-700 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-[98%] cursor-pointer font-sans"
                    >
                      <span>대시보드로 가기</span>
                    </button>
                  </div>
                </main>
              </>
            )}
          </div>
        )}

        {/* Global Floating Toast Alert */}
        {toastMessage && (
          <div 
            onClick={() => setToastMessage(null)}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-[100] bg-gray-900 border-l-4 border-primary text-white text-xs font-bold font-sans py-3 px-5 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce cursor-pointer hover:bg-gray-800 transition-all text-center min-w-[200px]"
          >
            <Sparkles className="w-4 h-4 text-purple-300 animate-pulse flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

      </div>
    </div>
  );
}
