export interface HospitalInfo {
  name: string;
  representativeName: string;
  businessNumber: string;
  mainNumber: string;
  emergencyNumber?: string;
  footerAddress: string;
  weekdayHours: string;
  saturdayHours: string;
  lunchHours: string;
  sundayHolidayHours: string;
  headerLogo: string;
  footerLogo: string;
  favicon: string;
  siteUrl: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  seoOgImage: string;
  customHospitalSchema?: string;
  naverMapUrl?: string;
  kakaoMapUrl?: string;
  youtubeUrl?: string;
  blogUrl?: string;
  isQuickAppointmentEnabled: boolean;
}

export interface DoctorScheduleDay {
  am: boolean;
  pm: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  history: string[];
  treatise?: string[];
  imageUrl: string;
  order: number;
  schedule: {
    mon: DoctorScheduleDay;
    tue: DoctorScheduleDay;
    wed: DoctorScheduleDay;
    thu: DoctorScheduleDay;
    fri: DoctorScheduleDay;
    sat: DoctorScheduleDay;
  };
}

export interface SubpageComparison {
  criteria: string;
  target: string;
  normal: string;
}

export interface SubpageSectionItem {
  title: string;
  description: string;
}

export interface SubpageAdvantage {
  title: string;
  items: string[];
}

export interface SubpageFaq {
  question: string;
  answer: string;
}

export interface Subpage {
  id: string;
  path: string;
  title: string;
  subtitle?: string;
  category: string;
  categoryName: string;
  authorName?: string;
  authorTitle?: string;
  introDescription: string;
  symptoms: string[];
  targets: SubpageSectionItem[];
  advantages: SubpageAdvantage[];
  comparisons?: SubpageComparison[];
  treatments: SubpageSectionItem[];
  processes: SubpageSectionItem[];
  postcare: SubpageSectionItem[];
  risks?: SubpageSectionItem[];
  faqs: SubpageFaq[];
  whyUs?: SubpageSectionItem[];
  references?: string;
  images: {
    hero?: string;
    intro?: string;
    process?: string;
  };
  updatedAt: string;
}

export interface Consultation {
  id: string;
  seq: number;
  title: string;
  content: string;
  category: string;
  authorName: string;
  authorId: string;
  imageUrl?: string;
  isSecret: boolean;
  password?: string;
  views: number;
  status: "접수완료" | "답변완료";
  answer?: string;
  answerDoctorName?: string;
  answerDoctorId?: string;
  answerCreatedAt?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  seq: number;
  title: string;
  treatmentName: string;
  content: string;
  authorName: string;
  authorId: string;
  rating: number;
  category: string;
  status: "승인대기" | "승인완료";
  views: number;
  createdAt: string;
}

export interface QuickAppointment {
  id: string;
  name: string;
  phone: string;
  category: string;
  preferredDate: string;
  preferredTime: string;
  symptomDescription?: string;
  status: "신규접수" | "상담완료" | "예약확정" | "취소";
  notes?: string;
  createdAt: string;
}

export interface HeroSlide {
  id: string;
  order: number;
  isActive: boolean;
  type: "video" | "image" | "leftTextOnly";
  pcImageUrl?: string;
  mobileImageUrl?: string;
  pcVideoUrl?: string;
  pcMainHeading1: string;
  pcMainHeading2: string;
  pcSmallSubtitle: string;
  pcBody: string;
  textColor: "white" | "black";
  linkUrl?: string;
  badgeText?: string;
}

export interface Notice {
  id: string;
  seq: number;
  title: string;
  content: string;
  authorName: string;
  views: number;
  createdAt: string;
  isImportant?: boolean;
}

export interface MediaArticle {
  id: string;
  seq: number;
  title: string;
  pressName: string;
  content: string;
  articleUrl?: string;
  imageUrl?: string;
  views: number;
  createdAt: string;
}

export interface YouTubeVideo {
  id: string;
  seq: number;
  title: string;
  youtubeId: string;
  youtubeUrl: string;
  content: string;
  doctorName?: string;
  createdAt: string;
}

export interface PopupItem {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  width?: number;
  height?: number;
}

export interface NonCoveredFeeItem {
  category: string;
  code: string;
  name: string;
  unit: string;
  cost: number;
  minCost?: number;
  maxCost?: number;
  description: string;
}

export interface Therapist {
  id: string;
  name: string;
  title: string;
  specialty: string;
  history: string[];
  imageUrl: string;
  order: number;
}

export interface ResearchActivity {
  id: string;
  seq: number;
  title: string;
  category: "논문" | "학술대회 발표" | "연구활동";
  publication: string;
  date: string;
  authors: string;
  description: string;
  linkUrl?: string;
}

export interface CertificateItem {
  id: string;
  name: string;
  fee: string;
  period: string;
  legalBasis: string;
  requiredDocuments: string;
  note: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: "patient" | "doctor" | "admin";
  phone?: string;
}
