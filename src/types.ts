export interface ProductInfo {
  name: string;
  category: string;
  targetCustomer: string;
  painPoints: string[];
  usPs: string[];
}

export interface DetailHook {
  title: string;
  sellingPoint: string;
  description: string;
}

export interface USPDetails {
  title: string;
  description: string;
  icon: "snowflake" | "lock" | "leaf" | "battery" | "sparkles" | "flame" | "shield" | "heart" | "zap";
}

export interface GeneratedDetails {
  mainHeadline: string;
  subtitle: string;
  problemQuestion: string;
  problemAnswer: string;
  imageAlt: string;
  imagePrompt: string; // Used for "AI 이미지 가이드"
  imageHotlink: string; // The URL to use
  usps: USPDetails[];
}

export interface Project {
  id: string;
  productInfo: ProductInfo;
  generatedDetails: GeneratedDetails;
  updatedAt: string;
}

export interface MetricDetail {
  score: number;
  status: "취약" | "보통" | "개선필요" | "우수";
  feedback: string;
}

export interface BeforeAfterCopy {
  sectionName: string;
  before: string;
  after: string;
}

export interface DiagnosisReport {
  score: number;
  overallVerdict: string;
  metrics: {
    hook: MetricDetail;
    agitation: MetricDetail;
    clarity: MetricDetail;
    readability: MetricDetail;
  };
  beforeAfterCopys: BeforeAfterCopy[];
  recommendations: string[];
}
