import { Subpage, Therapist, ResearchActivity, CertificateItem, MediaArticle, Notice } from "../types/hospital";

// 1. 병원소개 > 인사말 & 비전 (Vision: 연구하는 의원, 함께 뛰는 의원, 나누는 의원)
export const hospitalVisionData = {
  title: "환자의 아픔을 먼저 공감하고, 기본에 충실한 바른 의학을 실천합니다",
  subtitle: "연구하는 병원 · 함께 뛰는 병원 · 나누는 병원",
  directorGreeting: `안녕하십니까, 삼성G정형외과 대표원장 구본진입니다.
척추·관절 질환은 단순한 통증에 그치지 않고 환자분의 보행과 수면, 그리고 소중한 일상을 송두리째 앗아갑니다.
저희 삼성G정형외과은 무분별한 과잉 진료나 불필요한 조기 수술을 철저히 배제하고, 정확한 3.0T MRI 진단을 바탕으로 환자 개개인에게 가장 적합한 '단계별 맞춤 치료'를 제공합니다.

의사가 환자의 상태를 진료실에서 직접 확인하고 즉시 필요한 처치와 재활로 이어지는 '진료실 완결형 시스템'과 바쁜 현대인을 위한 '낮병동 원스톱 치료'를 통해 환자 중심의 의료 혁신을 이끌어 나가겠습니다. 늘 연구하고, 환자와 함께 뛰며, 사회에 따뜻함을 나누는 참된 의료기관이 되겠습니다.`,
  coreValues: [
    {
      title: "연구하는 병원",
      enTitle: "RESEARCH-DRIVEN MEDICINE",
      desc: "SCI급 국제 학술지 논문 게재 및 국내외 정형외과·신경외과 학회 초청 강연을 통해 검증된 최신 의학 기술을 선제적으로 도입합니다.",
      icon: "Microscope",
    },
    {
      title: "함께 뛰는 병원",
      enTitle: "ACCOMPANYING CARE",
      desc: "단순 진료에 머무르지 않고, 수술 전 비수술 치료부터 수술 후 스포츠 기능 회복까지 환자의 곁에서 끝까지 함께 호흡합니다.",
      icon: "Users",
    },
    {
      title: "나누는 병원",
      enTitle: "SOCIAL CONTRIBUTION",
      desc: "의료 소외계층 진료 지원, 지역사회 관절·척추 건강강좌 및 나눔 의료 봉사를 지속적으로 실천합니다.",
      icon: "HeartHandshake",
    },
  ],
};

// 2. 병원소개 > 의료진 & 치료사 안내
export const initialTherapists: Therapist[] = [
  {
    id: "th-1",
    name: "강동우",
    title: "수석 도수운동치료 실장",
    specialty: "척추 내시경 수술 후 재활 / 카이로프랙틱 / 독일 슬링(Sling) 코어 안정화",
    history: [
      "연세대학교 물리치료학과 학사",
      "대한정형도수물리치료학회(KAOMPT) 정회원 및 전문 강사",
      "독일 센타우르(Centaur) 3D 척추 재활 마스터 코스 수료",
      "전) 서울대학교병원 재활의학과 도수치료사",
      "현) 삼성G정형외과 도수·운동재활센터 수석 실장",
    ],
    imageUrl: "https://images.unsplash.com/photo-1594824813596-f04dfb38e079?auto=format&fit=crop&w=600&q=80",
    order: 1,
  },
  {
    id: "th-2",
    name: "이지연",
    title: "어깨·무릎 스포츠 재활 책임치료사",
    specialty: "마코 로봇 인공관절 후 보행 재활 / 회전근개 재건술 후 관절가동범위(ROM) 특화",
    history: [
      "고려대학교 보건과학대학 물리치료학과 석사",
      "미국 스포츠의학회(ACSM) 임상운동생리학자(CEP)",
      "KEMA(한국체형운동의학협회) 고급 과정 수료",
      "프로야구 선수단 전담 의무 트레이너 역임",
      "현) 삼성G정형외과 스포츠 재활 클리닉 수석 치료사",
    ],
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    order: 2,
  },
  {
    id: "th-3",
    name: "박준혁",
    title: "물리치료 및 체외충격파(ESWT) 전담 치료사",
    specialty: "초점형/방사형 체외충격파 / 석회성건염·족저근막염 집중 치료",
    history: [
      "단국대학교 물리치료학과 졸업",
      "국제체외충격파치료학회(ISMST) 인증 자격 취득",
      "대한도수의학연구회 정회원",
      "현) 삼성G정형외과 물리치료실 책임 물리치료사",
    ],
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    order: 3,
  },
];

// 3. 병원소개 > 둘러보기 (공간별 갤러리)
export const hospitalTourFacilities = [
  {
    title: "스마트 접수 로비 & 라운지 (1F)",
    desc: "환자 중심의 쾌적한 원스톱 키오스크 접수대와 호텔식 대기 라운지",
    imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "외래 진료실 & 초음파 처치실 (2F)",
    desc: "진료와 즉시 처치가 원스톱으로 이루어지는 진료실 완결형 첨단 외래실",
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "영상의학센터 (3F)",
    desc: "대학병원급 지멘스 3.0T MRI, 128채널 MDCT, C-arm 디지털 영상실",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "무균 청정 수술센터 & 낮병동 (5F)",
    desc: "헤파필터 0.3μm 양압 클린룸 4개 수술실 및 당일 입퇴원 낮병동 회복실",
    imageUrl: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "간호간병 통합 입원병동 (6F~7F)",
    desc: "전 병상 개인 스마트 모니터 완비, 감염 제로 안심 입원 시설",
    imageUrl: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "도수치료센터 & 센타우르 3D실 (8F~9F)",
    desc: "1인 독립 도수치료실, 독일 센타우르 척추안정화기, 옥상 치유정원",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  },
];

// 4. 특화 시스템 1: 진료실 완결형 시스템
export const oneStopSystemData = {
  title: "진료실 완결형 시스템 (One-Stop Clinical System)",
  subtitle: "의사가 환자의 상태를 직접 확인하면서 즉시 처치로 이어질 수 있어 진료의 연속성 확보",
  coreConcept: `환자가 병원에 내원하여 접수 후 진료실에서 진찰을 받고, 다시 처치실이나 검사실로 이동하여 오랜 시간 대기하던 기존의 번거로운 분절형 진료 체계를 완전히 혁신했습니다.
삼성G정형외과에서는 의사가 진료실 안에서 환자의 통증 부위를 직접 촉진하고, 고해상도 초음파로 병변을 실시간 확인하면서 정밀 주사 처치 및 기능 평가를 즉각 시행합니다.`,
  benefits: [
    {
      title: "진료의 연속성 (Continuity of Care)",
      desc: "담당 주치의가 첫 문진부터 정밀 초음파 판독, 주사 처치, 재활 처방까지 한자리에서 전담하여 오차 없는 맞춤 치료가 가능합니다.",
    },
    {
      title: "동선 및 대기 시간 80% 단축",
      desc: "여러 검사실을 전전하며 기다릴 필요 없이 진료실 한 곳에서 진단과 처치가 종결되어 고령 환자 및 거동 불편 환자에게 매우 편리합니다.",
    },
    {
      title: "실시간 치료 반응 확인",
      desc: "처치 직후 관절 가동 범위와 통증 경감 여부를 주치의가 환자와 함께 즉각 확인하고 즉각적인 피드백을 공유합니다.",
    },
  ],
  flow: [
    { step: "01", title: "심층 문진 & 이학적 검사", desc: "주치의와 1:1 상담 및 관절·신경 유발 검사 시행" },
    { step: "02", title: "진료실 내 정밀 초음파 진단", desc: "모니터를 환자와 함께 보며 인대, 건, 연골 손상 실시간 확인" },
    { step: "03", title: "초음파 유도하 즉각 정밀 처치", desc: "병변 부위에 오차 없이 프롤로·신경차단술 즉시 시술" },
    { step: "04", title: "치료 반응 평가 & 재활 처방", desc: "통증 완화 정도 확인 후 맞춤 도수·운동 처방 연계" },
  ],
};

// 5. 특화 시스템 2: 낮병동 운영
export const dayHospitalData = {
  title: "낮병동 운영 (Day Care Surgery Unit)",
  subtitle: "당일 시술 및 당일 퇴원이 가능한 수술에 대해 낮병동을 활용하여 일상 복귀를 앞당깁니다",
  coreConcept: `입원에 대한 부담감 때문에 척추·관절 치료를 미루셨던 바쁜 직장인과 보호자를 위해, 6시간 이상 병동에 체류하며 시술 및 충분한 회복 관찰을 거친 뒤 당일 안전하게 귀가하는 선진국형 낮병동(Day Hospital) 제도를 운영합니다.`,
  benefits: [
    {
      title: "경제적 부담 경감 & 실손보험 적용",
      desc: "보건복지부 기준 6시간 입원 체류를 충족하여 정식 입원료가 인정되며 실손의료비 혜택을 온전히 받으실 수 있습니다.",
    },
    {
      title: "간병인 없는 안심 전담 케어",
      desc: "전문 간호 인력이 회복실과 낮병동에서 1:1로 밀착 모니터링하여 보호자가 상주할 필요가 없습니다.",
    },
    {
      title: "당일 시술 · 당일 퇴원 원칙",
      desc: "오전 내원 후 0.5cm 미세침습 시술을 받고 낮병동에서 휴식한 뒤 당일 저녁 안전하게 일상과 가정으로 복귀합니다.",
    },
  ],
  targetProcedures: [
    "양방향 척추내시경 디스크 감압술 (UBE)",
    "경막외 신경성형술 및 풍선확장술",
    "무릎·어깨 관절경 최소침습 부분 절제술",
    "석회성건염 초음파 유도하 세척술(바버타지)",
    "고주파 수핵감압술 (PCDN)",
  ],
};

// 6. 고객센터 > 연구 / 학회 활동
export const initialResearchActivities: ResearchActivity[] = [
  {
    id: "res-1",
    seq: 5,
    title: "양방향 척추내시경(UBE)을 이용한 요추관협착증 환자의 조기 기능 회복에 관한 다기관 임상 비교 연구",
    category: "논문",
    publication: "대한척추신경외과학회지(Neurospine, SCI급)",
    date: "2025.11",
    authors: "구본진, 박성현 외",
    description: "기존 미세현미경 감압술 대비 양방향 척추내시경 시술 시 근육 손상 지표(CPK)가 65% 유의미하게 낮았으며 수술 후 24시간 내 자가 보행률 98%를 입증함.",
  },
  {
    id: "res-2",
    seq: 4,
    title: "로봇 인공관절 반치환술(Mako)의 관절선 재현도 및 장기 생존율 분석",
    category: "학술대회 발표",
    publication: "2025 세계정형외과학회(SICOT) 구연 발표",
    date: "2025.08",
    authors: "구본진 대표원장",
    description: "로봇 네비게이션을 이용한 무릎 인공관절 수술 1,000례 추적 결과, 절골 오차가 0.3mm 미만으로 정밀도가 우수함을 세계 유수 전문의들과 공유함.",
  },
  {
    id: "res-3",
    seq: 3,
    title: "만성 회전근개 파열에서 고농도 자가혈소판(PRP) 및 콜라겐 병합 주사의 건 치유 촉진 효과",
    category: "논문",
    publication: "대한견주관절의학회지 (KSS)",
    date: "2025.04",
    authors: "박성현 원장 외",
    description: "수술이 어려운 고령 환자의 불완전 회전근개 파열에 비수술 콜라겐 주사 시술 시 1년 추적 초음파상 결손부 치유율 78% 확인.",
  },
  {
    id: "res-4",
    seq: 2,
    title: "척추 내시경 수술 기구의 인체공학적 개선에 관한 특허 등록",
    category: "연구활동",
    publication: "대한민국 특허청 등록 제10-2024-XXXXXX호",
    date: "2024.12",
    authors: "구본진 대표원장 (삼성G정형외과 연구팀)",
    description: "수술 중 신경 손상을 방지하고 시야를 안정적으로 확보할 수 있는 독자 내시경 가이드 기구 특허 획득.",
  },
];

// 7. 고객센터 > 증명서 발급 안내
export const initialCertificates: CertificateItem[] = [
  {
    id: "cert-1",
    name: "일반 진단서",
    fee: "20,000원",
    period: "당일 발급",
    legalBasis: "의료법 시행규칙 제42조의2",
    requiredDocuments: "본인 신분증 (대리인 신청 시 위임장, 인감증명서 또는 본인 서명사실확인서)",
    note: "담당 주치의 진료 후 발급 가능",
  },
  {
    id: "cert-2",
    name: "소견서 / 진료의뢰서",
    fee: "10,000원",
    period: "당일 발급",
    legalBasis: "의료법 시행규칙 제42조의2",
    requiredDocuments: "본인 신분증",
    note: "타 병원 진료 의뢰 및 보험사 제출용",
  },
  {
    id: "cert-3",
    name: "입퇴원 확인서",
    fee: "3,000원",
    period: "당일 발급",
    legalBasis: "의료법 제45조",
    requiredDocuments: "본인 신분증",
    note: "원무과 창구에서 즉시 발급",
  },
  {
    id: "cert-4",
    name: "진료비 세부내역서",
    fee: "무료 (최초 1회)",
    period: "당일 발급",
    legalBasis: "국민건강보험법",
    requiredDocuments: "본인 신분증",
    note: "실손보험 청구 기본 증빙 서류",
  },
  {
    id: "cert-5",
    name: "영상 자료 복사 (CD / DVD)",
    fee: "10,000원 (장당)",
    period: "약 10분 소요",
    legalBasis: "의료법 제21조",
    requiredDocuments: "본인 신분증 (대리인 시 가족관계증명서, 위임장)",
    note: "3.0T MRI, CT, X-ray 영상 DICOM 뷰어 포함",
  },
  {
    id: "cert-6",
    name: "진료기록부 사본 (기본 1~5매)",
    fee: "1,000원 / 매 (6매부터 100원)",
    period: "당일 발급",
    legalBasis: "의료법 제21조",
    requiredDocuments: "본인 신분증 및 신청서",
    note: "경과기록지, 수술기록지, 간호기록지 등",
  },
];

// 8. 고객센터 > 언론보도
export const initialMediaArticles: MediaArticle[] = [
  {
    id: "media-1",
    seq: 4,
    title: "[조선일보] '0.5cm 구멍 둘로 디스크 해결' 삼성G정형외과 구본진 원장, 척추내시경 새 지평",
    pressName: "조선일보 헬스",
    content: "절개 부위가 작고 전신마취 없이 당일 퇴원이 가능한 양방향 척추내시경 수술이 고령층과 당뇨·고혈압 만성질환자 사이에서 호평을 받고 있다. 삼성G정형외과 구본진 원장은...",
    articleUrl: "https://chosun.com",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
    views: 1420,
    createdAt: "2026-03-15",
  },
  {
    id: "media-2",
    seq: 3,
    title: "[동아일보] 의사가 환자 옆에서 진단·주사 즉시 끝낸다… 삼성G정형외과 '진료실 완결형' 주목",
    pressName: "동아일보 메디컬",
    content: "병원 내 이동 동선과 대기 시간을 획기적으로 줄인 '진료실 완결형 시스템'이 환자 만족도를 98%까지 끌어올렸다. 주치의가 초음파를 직접 보며 환자와 실시간 소통...",
    articleUrl: "https://donga.com",
    imageUrl: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=600&q=80",
    views: 980,
    createdAt: "2026-02-28",
  },
  {
    id: "media-3",
    seq: 2,
    title: "[매일경제] '인공관절도 로봇 시대' 0.1mm 정밀도로 연골 보존하는 마코 로봇수술 도입",
    pressName: "매일경제",
    content: "삼성G정형외과이 최신 인공관절 로봇 시스템 '마코(Mako)'를 정식 도입하여 무릎 퇴행성 관절염 환자들에게 오차 없는 개인 맞춤 수술을 선보인다...",
    articleUrl: "https://mk.co.kr",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
    views: 1120,
    createdAt: "2026-01-20",
  },
  {
    id: "media-4",
    seq: 1,
    title: "[한국경제] 입원 부담 덜어주는 '낮병동'… 당일 시술받고 당일 저녁 집으로",
    pressName: "한국경제TV",
    content: "바쁜 현대인과 직장인을 위한 낮병동(Day Hospital) 제도가 큰 인기를 끌고 있다. 6시간 안정 후 안전하게 퇴원할 수 있으며 실손보험 혜택까지...",
    articleUrl: "https://hankyung.com",
    imageUrl: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=600&q=80",
    views: 850,
    createdAt: "2025-12-10",
  },
];

// 9. 질환별 상세 안내 마스터 데이터 (무릎 5종, 어깨 5종, 허리 5종)
export interface DiseaseItem {
  id: string;
  category: "무릎" | "어깨" | "허리";
  categorySlug: "knee" | "shoulder" | "spine";
  slug: string;
  name: string;
  enName: string;
  subtitle: string;
  summary: string;
  symptoms: string[];
  causes: string[];
  diagnosis: string[];
  nonSurgicalTreatments: { title: string; desc: string }[];
  surgicalTreatments: { title: string; desc: string }[];
  prevention: string[];
  faqs: { q: string; a: string }[];
  imageUrl: string;
}

export const diseaseItems: DiseaseItem[] = [
  // --- [1] 무릎 5종 ---
  {
    id: "knee-1",
    category: "무릎",
    categorySlug: "knee",
    slug: "osteoarthritis",
    name: "퇴행성 무릎관절염",
    enName: "Knee Osteoarthritis",
    subtitle: "관절 연골이 닳아 뼈와 뼈가 부딪히며 염증과 통증을 유발하는 대표적 퇴행성 질환",
    summary: "무릎 관절을 보호하는 연골이 점진적으로 손상되거나 퇴행성 변화로 인해 관절을 이루는 뼈와 인대 등에 손상이 일어나 염증과 통증이 생기는 질환입니다. 조기에는 비수술 주사 및 운동치료로 연골을 보존하고, 말기에는 정밀 로봇 인공관절 치환술을 적용합니다.",
    symptoms: [
      "계단을 오르내릴 때 무릎에 찌릿한 통증이 발생함",
      "앉았다 일어설 때 무릎에서 삐걱거리는 마찰음과 통증",
      "아침에 일어났을 때 무릎이 뻣뻣하고 관절이 잘 굽혀지지 않음",
      "다리가 서서히 O자형으로 변형되며 보행 시 통증 심화",
      "비가 오거나 날씨가 궂을 때 무릎이 시리고 욱신거림",
    ],
    causes: [
      "노화로 인한 관절 연골의 마모 및 탄력 저하",
      "비만으로 인한 무릎 관절 하중 증가",
      "격렬한 스포츠 손상 또는 외상 방치",
      "반월상 연골판 손상 후 2차 퇴행성 진행",
    ],
    diagnosis: ["정립 체중부하 X-ray (K-L 등급 판정)", "3.0T 고해상도 MRI (연골 결손 및 골수 부종 평가)", "정밀 초음파 (관절 활액막염 및 삼출액 확인)"],
    nonSurgicalTreatments: [
      { title: "자가혈소판(PRP) 및 콘쥬란 연골주사", desc: "관절강 내 마찰을 줄이고 연골 보호막을 형성하여 통증 경감 및 관절 윤활 작용 회복" },
      { title: "초점형 체외충격파(ESWT) & 고주파", desc: "관절 주변 염증을 제거하고 미세 혈류를 촉진하여 인대와 힘줄 조직 재생" },
      { title: "1:1 맞춤 대퇴사두근 강화 도수치료", desc: "무릎 관절로 쏠리는 체중 하중을 허벅지 근육이 분산하도록 전문 치료사가 1:1 교정" },
    ],
    surgicalTreatments: [
      { title: "마코(Mako) 로봇 인공관절 부분/전치환술", desc: "0.1mm 오차 없는 로봇 절골로 정상 뼈와 인대를 최대한 보존하고 빠른 보행 회복" },
      { title: "자가골수 줄기세포(BMAC) 연골재생술", desc: "연골 결손 부위에 환자 자신의 골수 줄기세포를 농축 주입하여 관절염 진행 차단" },
    ],
    prevention: ["체중 1kg 감량 시 무릎 하중 4kg 감소", "수영, 평지 걷기, 실내 자전거 등 관절 부담 적은 유산소 운동", "쪼그려 앉기, 양반다리 금지"],
    faqs: [
      { q: "무릎 주사(뼈주사)를 맞으면 연골이 더 닳나요?", a: "흔히 말하는 뼈주사(스테로이드)는 과다 투여 시 부작용이 있을 수 있으나, 삼성G정형외과에서는 연골을 구성하는 성분인 PN(콘쥬란)이나 히알루론산, 자가혈액(PRP) 주사를 사용하여 연골을 보호하고 마모를 지연시킵니다." },
      { q: "인공관절 수술은 몇 살에 하는 것이 가장 좋은가요?", a: "일반적으로 인공관절의 수명(20~25년)을 고려하여 65세 이후에 권장되나, 통증으로 인해 일상생활이 완전히 불가능한 말기 관절염 환자의 경우 연령과 무관하게 삶의 질 회복을 위해 수술을 고려합니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "knee-2",
    category: "무릎",
    categorySlug: "knee",
    slug: "meniscus",
    name: "반월상연골판 손상",
    enName: "Meniscus Tear",
    subtitle: "무릎 뼈 사이에서 충격을 흡수하는 C자형 연골판의 파열 및 파편 잠김",
    summary: "대퇴골과 경골 사이에 위치해 무릎 관절의 완충 장치 역할을 하는 반월상 연골판이 과도한 회전력이나 퇴행성 변화로 찢어지는 질환입니다. 방치할 경우 연골 손상과 조기 퇴행성 관절염으로 직결되므로 조기 정확한 진단이 필수적입니다.",
    symptoms: [
      "무릎을 굽히거나 펼 때 특정 각도에서 무릎이 걸리는 느낌(Locking)",
      "방향을 바꿀 때 무릎 속에서 '뚝' 소리와 함께 주저앉음",
      "무릎 관절 안쪽 또는 바깥쪽 틈새를 누르면 날카로운 압통",
      "손상 직후 무릎에 관절액이나 피가 차서 붓고 팽만감 발생",
    ],
    causes: [
      "농구, 축구, 스키 등 스포츠 중 급격한 방향 전환 및 비틀림",
      "중장년층에서 쪼그려 앉아 일하는 자세로 인한 퇴행성 파열",
      "선천성 원판형 연골판의 구조적 취약성",
    ],
    diagnosis: ["3.0T MRI (파열 모양, 파열 위치, 관절 불안정성 정밀 평가)", "이학적 맥머레이(McMurray) 유발 검사"],
    nonSurgicalTreatments: [
      { title: "약물 및 초음파 유도하 관절강 소염 치료", desc: "파열로 인한 2차 활액막염 및 관절 부종 완화" },
      { title: "PDRN(DNA) 주사 및 인대 강화 치료", desc: "경미한 파열 주변 조직의 치유 환경 조성" },
    ],
    surgicalTreatments: [
      { title: "관절경하 반월상연골판 봉합술", desc: "혈류가 통하는 부위의 파열 시 연골판을 미세 실로 꿰매어 본래 연골판 100% 보존" },
      { title: "관절경하 최소 부분 절제술", desc: "봉합이 불가능한 너덜너덜한 파열 파편만 정밀하게 다듬어 2차 관절 연골 마모 예방" },
    ],
    prevention: ["운동 전 충분한 스트레칭", "급격한 회전 운동 시 무릎 보호대 착용", "쪼그려 앉는 좌식 생활 피하기"],
    faqs: [
      { q: "연골판이 찢어지면 무조건 수술해야 하나요?", a: "아닙니다. 파열의 크기가 1cm 미만으로 작고 무릎이 잠기는 기계적 증상이 없다면 보존적 치료와 허벅지 근력 강화로 호전될 수 있습니다. 단, 파열편이 연골을 긁어 2차 손상을 주는 경우에는 관절경 시술이 필요합니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "knee-3",
    category: "무릎",
    categorySlug: "knee",
    slug: "cruciate-ligament",
    name: "십자인대 손상",
    enName: "Cruciate Ligament Tear",
    subtitle: "무릎 관절의 앞뒤 흔들림을 막아주는 핵심 십자인대의 파열",
    summary: "전방십자인대와 후방십자인대는 대퇴골과 경골을 십자 형태로 연결하여 무릎 관절이 앞뒤로 밀리거나 비틀리지 않게 잡아주는 핵심 지지대입니다. 과도한 외력이나 급격한 정지 동작에서 '툭' 끊어지는 파열이 흔히 발생합니다.",
    symptoms: [
      "부상 순간 무릎 안에서 '퍽' 또는 '뚝' 하는 파열음을 체감함",
      "손상 후 몇 시간 내에 무릎에 피가 차면서 심하게 붓고 통증",
      "걸을 때 무릎이 어긋나거나 힘없이 털썩 빠지는 듯한 불안정감",
      "시간이 지나 부기가 빠지면 일시적으로 걸을 수 있어 방치하기 쉬움",
    ],
    causes: [
      "축구, 농구, 스키 등 점프 후 착지나 갑작스러운 감속/방향 전환",
      "교통사고나 강한 외력에 의한 무릎 관절의 과신전 또는 타격",
    ],
    diagnosis: ["라크만(Lachman) 검사 & 전방전위 검사", "3.0T MRI (인대 완전 파열 여부 및 동반 연골판 손상 확인)"],
    nonSurgicalTreatments: [
      { title: "각도 조절 보조기(Brace) 착용 및 고정", desc: "부분 파열 시 인대의 자연 치유를 돕고 추가 손상 방지" },
      { title: "전문 도수 재활 및 고유수용성 감각 훈련", desc: "햄스트링 및 대퇴사두근 근력을 강화하여 인대 결손 보상" },
    ],
    surgicalTreatments: [
      { title: "관절경하 전방십자인대 재건술", desc: "손상된 인대를 제거하고 자가건 또는 동종건을 터널에 정확히 통과시켜 해부학적 인대 재건" },
    ],
    prevention: ["착지 시 무릎을 살짝 구부리는 습관", "점프 및 착지 밸런스 트레이닝", "대퇴사두근과 햄스트링의 균형 잡힌 근력 발달"],
    faqs: [
      { q: "수술 후 언제부터 일상생활과 운동이 가능한가요?", a: "수술 직후부터 보조기와 목발을 이용해 단계적 보행 훈련을 시작하며, 일상 보행은 4~6주, 가벼운 조깅은 3개월, 축구/농구 등 격렬한 스포츠 복귀는 약 6~9개월 후 안전하게 가능합니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "knee-4",
    category: "무릎",
    categorySlug: "knee",
    slug: "cartilage",
    name: "무릎 연골 손상",
    enName: "Articular Cartilage Defect",
    subtitle: "뼈를 덮고 있는 매끄러운 초자연골의 국소적 결손 및 마모",
    summary: "관절 뼈 표면을 감싸고 있는 3~4mm 두께의 관절 연골(물렁뼈)이 외상이나 반복적 충격으로 인해 뜯겨 나가거나 닳아 없어지는 상태입니다. 연골에는 혈관과 신경이 없어 초기 손상을 자각하기 어렵습니다.",
    symptoms: [
      "무릎 뼈 깊은 곳에서 묵직하게 느껴지는 통증",
      "오래 걷거나 달리고 난 후 무릎에 열감과 뻐근한 부종",
      "계단을 내려올 때 무릎 앞쪽에 찌릿한 충격",
    ],
    causes: ["외부 타격, 낙상 등 외상성 연골 결손", "연골하 골괴사증", "반복적인 과부하 누적"],
    diagnosis: ["3.0T MRI 연골 T2 맵핑(Cartilage T2 Mapping)", "고해상도 초음파 검사"],
    nonSurgicalTreatments: [
      { title: "자가골수 농축액(BMAC) 주사 치료", desc: "보건복지부 신의료기술 승인, 골수 줄기세포로 연골 결손 부위 조직 재생 유도" },
      { title: "콘쥬란 및 콜라겐 연골 보호 주사", desc: "손상된 연골 표면에 생체 친화적 보호막 형성" },
    ],
    surgicalTreatments: [
      { title: "관절경하 미세골절술 & 자가연골 이식술", desc: "연골 결손 부위에 미세한 구멍을 내어 줄기세포 삼출을 유도하거나 정상 연골 이식" },
      { title: "카티스템(제대혈 유래 줄기세포) 연골 재생술", desc: "결손 부위에 복합 줄기세포 치료제를 도포하여 초자연골에 가까운 원형 재생" },
    ],
    prevention: ["과도한 스쿼트나 런지 자제", "평지 걷기와 수영으로 관절액 순환 촉진"],
    faqs: [
      { q: "줄기세포 치료는 누구나 받을 수 있나요?", a: "관절 연골 결손 면적이 일정 기준(보통 1.5㎠ 이상)이고 관절 정렬이 심하게 변형되지 않은 경우에 가장 치료 효과가 우수합니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "knee-5",
    category: "무릎",
    categorySlug: "knee",
    slug: "sports",
    name: "스포츠 무릎 손상",
    enName: "Sports Knee Injuries",
    subtitle: "러너스 니, 장경인대 증후군, 거위발건염 등 운동 중 발생하는 복합 손상",
    summary: "골프, 테니스, 러닝, 등산, 헬스 등 레저 및 스포츠 인구 증가로 인해 무릎 관절 주위 힘줄, 인대, 점액낭에 발생하는 과사용 증후군 및 급성 부상을 총칭합니다.",
    symptoms: [
      "러닝이나 등산 시 무릎 바깥쪽 또는 슬개골 아래쪽 찌릿한 통증",
      "운동 후 무릎을 굽힐 때 힘줄 부위가 붓고 뜨거움",
      "스트레칭 시 관절 주변 건에 팽팽한 당김과 압통",
    ],
    causes: ["준비운동 부족 및 무리한 주행 거리 증가", "골반-대퇴 관절의 정렬 불균형", "딱딱한 노면에서의 점프와 착지"],
    diagnosis: ["동적 초음파 검사 (관절 움직임 시 건 충돌 실시간 확인)", "보행 분석 시스템"],
    nonSurgicalTreatments: [
      { title: "집중형 체외충격파(ESWT) 치료", desc: "건염 및 인대 부착부의 만성 염증 물질 제거 및 콜라겐 섬유 재배열" },
      { title: "선수 맞춤형 1:1 스포츠 도수재활", desc: "근막 이완, 골반 부정렬 교정 및 동작 메커니즘 재교육" },
    ],
    surgicalTreatments: [
      { title: "관절경하 건 절개 및 유리술", desc: "보존 치료에 반응하지 않는 난치성 만성 건염에 한해 최소 침습 시행" },
    ],
    prevention: ["운동 전후 15분 이상 충분한 햄스트링·종아리 스트레칭", "쿠션감 있는 전문 운동화 착용"],
    faqs: [
      { q: "통증이 있을 때 얼음찜질과 온찜질 중 어떤 걸 해야 하나요?", a: "운동 직후나 통증이 발생한 급성기(48시간 이내)에는 염증과 부종을 가라앉히기 위해 얼음찜질(냉찜질)이 적합하며, 만성적인 뻐근함에는 온찜질로 혈류를 촉진하는 것이 좋습니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1594824813596-f04dfb38e079?auto=format&fit=crop&w=800&q=80",
  },

  // --- [2] 어깨 5종 ---
  {
    id: "shoulder-1",
    category: "어깨",
    categorySlug: "shoulder",
    slug: "rotator-cuff",
    name: "회전근개 질환",
    enName: "Rotator Cuff Disease",
    subtitle: "어깨를 들고 돌리는 4개의 핵심 힘줄(극상근 등)의 염증 및 파열",
    summary: "어깨 관절을 지탱하고 움직임을 담당하는 극상근, 극하근, 소원근, 견갑하근 4개 힘줄이 뼈와의 마찰, 혈액순환 장애, 노화로 인해 손상되거나 파열되는 질환입니다. 오십견과 혼동하기 쉬우며 방치 시 파열 범위가 커집니다.",
    symptoms: [
      "팔을 위로 들어 올릴 때 특정 각도(60~120도)에서 날카로운 통증",
      "밤에 아픈 쪽으로 누워 잘 때 통증이 극심해 수면 장애 유발 (야간통)",
      "팔을 들어 올렸다가 힘없이 툭 떨어뜨림 (근력 약화)",
      "스스로 팔을 들기는 어려우나 다른 사람이 올려주면 올라감",
    ],
    causes: ["어깨 관절의 지속적 과사용", "노화로 인한 힘줄의 퇴행성 마모", "견봉 뼈의 골극(가시뼈) 마찰"],
    diagnosis: ["고해상도 어깨 초음파 (진료실 즉시 검사)", "3.0T MRI (파열 크기, 퇴축 정도, 지방변성 정확도 99%)"],
    nonSurgicalTreatments: [
      { title: "콜라겐 및 PDRN 힘줄 재생 주사", desc: "부분 파열 부위에 인체 콜라겐 제재를 주입하여 힘줄 두께 보강" },
      { title: "체외충격파(ESWT) & 도수 가동성 치료", desc: "굳어진 어깨 관절낭을 부드럽게 이완시키고 어깨 회전근 안정화" },
    ],
    surgicalTreatments: [
      { title: "관절경하 회전근개 봉합술 (0.5cm 미세절개)", desc: "초소형 관절경으로 찢어진 힘줄을 특수 골 앵커 나사로 원래 뼈에 견고하게 재부착" },
      { title: "역행성 인공관절 치환술", desc: "봉합이 불가능한 고령의 거대 파열 환자에서 삼각근을 이용해 팔을 들 수 있게 하는 수술" },
    ],
    prevention: ["어깨를 움츠리는 구부정한 자세 피하기", "수건이나 밴드를 이용한 어깨 외회전근 강화 운동"],
    faqs: [
      { q: "회전근개 파열은 무조건 수술해야 하나요?", a: "아닙니다. 부분 파열이거나 통증 조절이 가능한 초기 단계라면 콜라겐 재생 주사와 전문 도수 치료로 힘줄 악화를 막을 수 있습니다. 단, 완전 파열의 경우 시간이 지나면 힘줄이 말려 들어가 봉합이 어려워지므로 조기 수술적 치료가 권장됩니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "shoulder-2",
    category: "어깨",
    categorySlug: "shoulder",
    slug: "frozen-shoulder",
    name: "오십견 (유착성 관절낭염)",
    enName: "Frozen Shoulder (Adhesive Capsulitis)",
    subtitle: "어깨 관절 주머니에 염증이 생겨 관절이 얼어붙듯 굳어버리는 질환",
    summary: "특별한 외상 없이 어깨 관절을 둘러싼 관절낭이 두꺼워지고 염증이 생기며 쪼그라들어 관절 운동 범위가 모든 방향에서 제한되는 질환입니다. 통증기와 동결기, 해빙기를 거치며 일상생활에 극심한 불편을 초래합니다.",
    symptoms: [
      "머리를 감거나 빗을 때, 옷 뒤 단추를 채우거나 지퍼를 올릴 수 없음",
      "남이 팔을 억지로 올려주어도 어깨가 굳어 올라가지 않음",
      "어깨 전체가 욱신거리고 비가 오거나 밤이 되면 통증 악화",
      "작은 충격에도 어깨 전체에 칼로 베는 듯한 통증",
    ],
    causes: ["당뇨, 갑상선 질환 등 대사성 원인", "어깨 주변 조직의 염증 방치로 인한 관절낭 유착", "원인 미상의 특발성"],
    diagnosis: ["관절 수동 가동 범위 측정", "초음파 검사 (오구상완인대 비후 확인)", "3.0T MRI (회전근개 파열 동반 감별)"],
    nonSurgicalTreatments: [
      { title: "초음파 유도하 관절낭 팽창 수압치료", desc: "굳어 있는 관절낭 내에 생리식염수와 소염제를 주입해 유착된 주머니를 안전하게 박리" },
      { title: "1:1 수동 관절 유동술 (도수치료)", desc: "치료사의 전문적인 수기 치료로 어깨 가동 범위를 점진적으로 회복" },
    ],
    surgicalTreatments: [
      { title: "관절경하 관절막 유리술 (Capsular Release)", desc: "보존적 치료에도 6개월 이상 굳어 있는 관절낭을 관절경으로 전방위 절제하여 즉각 가동성 확보" },
    ],
    prevention: ["어깨를 굳히지 않고 하루 3회 이상 진자 운동(팔 흔들기) 시행", "온찜질 후 벽 타기 운동"],
    faqs: [
      { q: "오십견은 1~2년 지나면 저절로 낫는 병인가요?", a: "시간이 지나 통증이 다소 줄어들 수는 있으나, 적절한 치료 없이 방치하면 어깨의 가동 범위가 영구적으로 제한되어 팔이 끝까지 올라가지 않는 후유 장애가 남을 수 있습니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "shoulder-3",
    category: "어깨",
    categorySlug: "shoulder",
    slug: "calcific-tendinitis",
    name: "석회성건염",
    enName: "Calcific Tendinitis",
    subtitle: "어깨 힘줄 내에 돌(석회 침착물)이 생겨 화학적 염증 반응을 일으키는 질환",
    summary: "어깨 회전근개 힘줄 내에 칼슘 석회질이 침착되었다가, 석회가 녹아서 흡수되는 과정에서 치약 같은 농축액이 분출되어 화학적 염증 반응과 함께 극심한 응급 통증을 유발합니다.",
    symptoms: [
      "어깨를 전혀 움직일 수 없을 정도로 칼로 찌르는 듯한 급성 통증",
      "통증으로 인해 응급실을 찾을 만큼 밤에 잠을 잘 수 없음",
      "어깨 부위를 살짝 스치기만 해도 비명이 나올 정도의 통증",
    ],
    causes: ["힘줄 내부의 미세 저산소증 및 혈류 공급 저하", "반복적인 어깨 힘줄 마찰 손상"],
    diagnosis: ["디지털 단순 X-ray (석회 음영 형태 및 위치 확인)", "고해상도 초음파 (석회의 성상-단단한 돌형 vs 묽은 치약형 판별)"],
    nonSurgicalTreatments: [
      { title: "초음파 유도하 석회 쇄석 및 흡입술 (Barbotage)", desc: "주사 바늘로 석회를 잘게 부수고 녹여내어 즉각적인 통증 차단" },
      { title: "방사형/초점형 체외충격파(ESWT)", desc: "강력한 음파 에너지를 전달해 석회질 분해 촉진 및 혈관 재형성 유도" },
    ],
    surgicalTreatments: [
      { title: "관절경하 석회 제거술", desc: "석회의 크기가 1.5cm 이상으로 거대하거나 비수술 치료에 흡수되지 않을 때 관절경으로 깨끗이 흡입 제거" },
    ],
    prevention: ["스트레스 완화 및 어깨 혈액순환 개선", "무리한 어깨 오버헤드 동작 자제"],
    faqs: [
      { q: "석회는 칼슘을 많이 먹어서 생기나요?", a: "아닙니다. 음식으로 섭취하는 칼슘과는 무관하며, 어깨 힘줄의 국소적인 퇴행성 혈류 장애로 인해 발생합니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "shoulder-4",
    category: "어깨",
    categorySlug: "shoulder",
    slug: "impingement",
    name: "어깨 충돌증후군",
    enName: "Shoulder Impingement Syndrome",
    subtitle: "어깨 지붕 뼈(견봉)와 회전근개 힘줄이 팔을 올릴 때마다 부딪히는 현상",
    summary: "견봉 아래 공간이 좁아지면서 팔을 들어 올릴 때마다 견봉 뼈와 회전근개 힘줄, 점액낭이 충돌하여 마찰과 염증을 유발하는 질환으로, 회전근개 파열의 전 단계입니다.",
    symptoms: [
      "팔을 70~120도 사이로 옆으로 들어 올릴 때 어깨 앞뒤 통증",
      "물건을 선반 위에 올리거나 옷을 입을 때 걸리는 느낌",
      "어깨 속에 무언가 끼어 있는 듯한 뻐근한 불쾌감",
    ],
    causes: ["갈고리 모양으로 자라난 비정상적인 견봉(Acromion) 돌기", "라운드 숄더 및 흉추 후만 체형 불균형", "수영, 배드민턴 등 반복 동작"],
    diagnosis: ["견봉 출구 촬영 X-ray (Outlet View)", "니어(Neer) 및 호킨스(Hawkins) 충돌 유발 검사"],
    nonSurgicalTreatments: [
      { title: "견봉하 점액낭 항염 주사 치료", desc: "충돌로 붓고 두꺼워진 점액낭의 염증을 즉각 가라앉혀 공간 확보" },
      { title: "견갑골 안정화 및 체형 교정 도수치료", desc: "말린 어깨를 펴고 견갑골의 회전 궤적을 정상화하여 뼈와 힘줄의 충돌 방지" },
    ],
    surgicalTreatments: [
      { title: "관절경하 견봉 성형술 (Subacromial Decompression)", desc: "힘줄을 찌르는 튀어나온 뼈 돌기를 관절경 버(Burr)로 매끄럽게 깎아내어 충돌 원인 영구 제거" },
    ],
    prevention: ["턱을 당기고 가슴을 펴는 바른 자세 유지", "어깨 승모근 스트레칭과 광배근 스트레칭"],
    faqs: [
      { q: "뼈를 깎는 수술이라고 하니 무서운데 통증이 심한가요?", a: "0.5cm의 작은 구멍을 통해 뼈 표면을 살짝 다듬는 시술이므로 근육 손상이 거의 없어 수술 다음 날부터 가벼운 일상생활이 가능합니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "shoulder-5",
    category: "어깨",
    categorySlug: "shoulder",
    slug: "sports",
    name: "어깨 스포츠 손상",
    enName: "Sports Shoulder Injuries",
    subtitle: "슬랩(SLAP) 병변, 어깨 재발성 탈구, 견봉쇄골관절염 등 스포츠 활동 중 발생 손상",
    summary: "야구, 골프, 테니스, 크로스핏 등 어깨를 크고 강하게 회전시키는 운동 중 상부 관절와순이 뼈에서 떨어져 나가거나(SLAP), 어깨 관절이 빠지는 탈구 손상입니다.",
    symptoms: [
      "공을 던지는 동작이나 오버헤드 프레스 시 어깨 뒤쪽에 날카로운 통증",
      "팔을 뒤로 젖힐 때 어깨가 덜컹 빠질 것 같은 극심한 불안감",
      "어깨 관절을 돌릴 때 딸깍거리는 클릭음과 힘 빠짐",
    ],
    causes: ["공을 강하게 던지는 투구 동작의 반복 과부하", "팔을 짚고 넘어지며 발생한 어깨 탈구"],
    diagnosis: ["어깨 관절조영 3.0T MRI (MR-Arthrography)", "슬랩 오프라이언(O'Brien) 검사"],
    nonSurgicalTreatments: [
      { title: "회전근 및 견갑골 근력 강화 스포츠 재활", desc: "관절와순 손상 주변 근육을 강화하여 어깨 불안정성 보완" },
      { title: "관절와순 프롤로/DNA 인대 강화 주사", desc: "이완된 관절낭과 인대의 결합력 증강" },
    ],
    surgicalTreatments: [
      { title: "관절경하 상부 관절와순 봉합술 (SLAP Repair)", desc: "떨어진 관절와순을 미세 앵커로 관절와 뼈에 단단히 재고정" },
      { title: "방카르트(Bankart) 관절낭 축소 복원술", desc: "반복성 탈구 환자의 찢어진 전하방 관절와순 및 늘어난 관절낭 봉합" },
    ],
    prevention: ["던지기 전 회전근개 웜업 철저", "피로 시 무리한 투구수 자제"],
    faqs: [
      { q: "한 번 빠진 어깨는 계속 빠지나요?", a: "20대 이전에 첫 탈구가 발생한 경우 관절와순 파열로 인해 재발성 습관성 탈구로 이어질 확률이 80% 이상입니다. 따라서 조기에 정확한 MRI 진단과 재발 방지 치료를 받아야 합니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1594824813596-f04dfb38e079?auto=format&fit=crop&w=800&q=80",
  },

  // --- [3] 허리 5종 ---
  {
    id: "spine-1",
    category: "허리",
    categorySlug: "spine",
    slug: "disc",
    name: "허리디스크 (추간판탈출증)",
    enName: "Lumbar Herniated Intervertebral Disc",
    subtitle: "척추 뼈 사이의 수핵이 밀려나와 다리로 내려가는 신경을 압박하는 질환",
    summary: "척추뼈 사이에서 쿠션 역할을 하는 디스크(추간판)의 섬유륜이 찢어지면서 내부의 수핵이 돌출되어 척수 신경근을 자극하는 질환입니다. 허리 통증뿐 아니라 엉덩이, 허벅지, 종아리, 발가락까지 저리고 당기는 방사통이 주 증상입니다.",
    symptoms: [
      "허리를 앞으로 숙이거나 의자에 오래 앉아 있을 때 통증 심화",
      "엉치부터 종아리, 발끝까지 찌릿찌릿 당기고 저린 방사통",
      "기침이나 재채기, 배변 시 복압이 올라가며 허리가 울림",
      "누워서 한쪽 다리를 30도 이상 들어 올리기 어려움 (SLR 양성)",
      "심한 경우 발목이나 엄지발가락의 근력 저하",
    ],
    causes: ["잘못된 자세로 오래 앉아 있는 생활 습관", "무거운 물건을 허리 힘으로 들어 올리는 동작", "노화로 인한 디스크 수분 감소 및 탄력 저하"],
    diagnosis: ["3.0T 요추 정밀 MRI (디스크 돌출 방향 및 신경 압박 정도 확인)", "디지털 전척추 X-ray (척추 곡만도 측정)"],
    nonSurgicalTreatments: [
      { title: "C-arm 유도하 정밀 신경차단술", desc: "특수 영상 장치를 보며 염증이 생긴 신경 가지에 직접 소염제를 주입해 부종과 통증 급속 차단" },
      { title: "경막외 감압 신경성형술 (신경유착박리술)", desc: "꼬리뼈를 통해 1mm 초소형 카테터를 삽입하여 디스크와 유착된 신경을 물리적으로 박리" },
      { title: "독일 센타우르 3D 척추 코어 안정화 재활", desc: "척추 깊은 곳의 다열근과 코어 근육을 강화하여 디스크 재발 방지" },
    ],
    surgicalTreatments: [
      { title: "양방향 척추내시경 디스크 절제술 (UBE, 0.5cm 미세절개)", desc: "두 개의 작은 구멍으로 8K 고화질 내시경과 미세 수술 기구를 삽입하여 정상 근육 보존하에 파열된 디스크 파편만 안전하게 제거" },
    ],
    prevention: ["의자에 앉을 때 엉덩이를 깊숙이 밀어 넣고 허리 쿠션 사용", "걷기 운동과 플랭크 운동 꾸준히 시행"],
    faqs: [
      { q: "허리디스크 환자의 90%는 수술 없이 낫는다는 말이 사실인가요?", a: "네, 맞습니다. 마비 증상(대소변 장애나 족하수)이 없는 한 대부분 정밀 신경치료와 도수운동재활로 튀어나온 디스크가 체내에 자연 흡수되며 호전됩니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "spine-2",
    category: "허리",
    categorySlug: "spine",
    slug: "stenosis",
    name: "척추관협착증",
    enName: "Lumbar Spinal Stenosis",
    subtitle: "신경이 지나가는 척추관이 좁아져 다리가 저리고 10분 이상 걷지 못하는 노인성 질환",
    summary: "노화로 인해 척추 뒤쪽의 황색인대가 두꺼워지고 관절 뼈가 자라나면서 척추 신경이 통과하는 관(Spinal Canal)이 좁아져 신경을 옥죄는 질환입니다. 걸으면 다리가 터질 듯 아파 쉬어가야 하는 파행증이 특징입니다.",
    symptoms: [
      "조금만 걸어도 종아리와 허벅지가 터질 것 같아 쪼그려 앉아 쉬어야 함 (간헐적 파행)",
      "허리를 앞으로 굽히면 신경관이 넓어져 편안하고, 뒤로 젖히면 통증 악화",
      "엉치, 허벅지, 종아리가 시리고 모래밭을 걷는 듯 발바닥 감각 둔화",
      "유모차나 마트 카트를 밀고 걸을 때는 통증이 덜함",
    ],
    causes: ["척추의 노화로 인한 뼈와 후관절의 퇴행성 비후", "척추 황색인대의 섬유화 및 두꺼워짐"],
    diagnosis: ["3.0T MRI (신경관 단면적 좁아짐 및 압박 등급 정밀 판정)", "동적 척추 X-ray (불안정증 유무 확인)"],
    nonSurgicalTreatments: [
      { title: "풍선확장 경막외 감압술", desc: "특수 풍선 카테터를 척추관 내로 진입시켜 좁아진 관을 넓혀주고 혈류 장애 개선" },
      { title: "고주파 수핵 및 후관절 열치료술", desc: "만성 통증을 전달하는 감각 신경 가지를 선택적으로 차단" },
    ],
    surgicalTreatments: [
      { title: "양방향 척추내시경 황색인대 감압술 (UBE)", desc: "전신마취 없이 0.5cm 구멍을 통해 신경을 누르고 있는 두꺼워진 황색인대만 선택적으로 정밀 제거" },
    ],
    prevention: ["실내 자전거 타기 (허리를 약간 숙인 자세가 척추관을 넓혀줌)", "장시간 걷기보다 10~15분씩 나누어 걷기"],
    faqs: [
      { q: "허리디스크와 척추관협착증의 가장 큰 차이점은 무엇인가요?", a: "허리디스크는 허리를 앞으로 숙일 때 디스크가 뒤로 밀려 통증이 심해지지만, 협착증은 반대로 허리를 앞으로 굽히면 척추관이 넓어져 통증이 일시적으로 줄어듭니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "spine-3",
    category: "허리",
    categorySlug: "spine",
    slug: "spondylolisthesis",
    name: "척추전방전위증",
    enName: "Spondylolisthesis",
    subtitle: "위쪽 척추뼈가 아래쪽 척추뼈보다 앞으로 미끄러져 튀어나온 상태",
    summary: "관절 돌기의 골절이나 척추 관절의 퇴행성 변화로 인해 위 척추뼈가 아래 척추뼈보다 앞으로 밀려 나가 척추 정렬이 어긋나면서 척추관 협착과 불안정증을 일으키는 질환입니다.",
    symptoms: [
      "아침에 일어날 때나 자세를 바꿀 때 허리가 끊어질 듯한 통증",
      "오래 서 있거나 걸으면 허리와 엉덩이가 심하게 뻐근하고 무거움",
      "허리를 뒤로 젖힐 때 뼈가 어긋나는 듯한 불안정감",
      "허리 뒤를 만져보았을 때 계단처럼 층이 진 턱이 만져짐",
    ],
    causes: ["척추 분리증(협부 결손)의 방치", "노화로 인한 후관절 퇴행 및 디스크 높이 소실"],
    diagnosis: ["동적 굴곡-신전 X-ray (척추뼈의 전후방 흔들림 정도 측정)", "3.0T MRI (신경 압박 및 인대 파열 판독)"],
    nonSurgicalTreatments: [
      { title: "척추 심부 근육 강화 도수치료 (센타우르 3D)", desc: "어긋난 척추뼈를 든든하게 붙잡아주는 척추 기립근 및 복횡근 강화" },
      { title: "후관절 정밀 주사 치료", desc: "마찰로 인해 염증이 생긴 척추 관절 부위의 염증 억제" },
    ],
    surgicalTreatments: [
      { title: "최소침습 척추 유합술 (MIS-TLIF)", desc: "어긋난 뼈를 본래 위치로 정복하고 인공 뼈와 티타늄 나사못으로 흔들림 없이 견고하게 고정" },
    ],
    prevention: ["복부 비만 줄이기 (배가 나오면 허리가 앞으로 꺾여 밀림 가속)", "허리를 과도하게 뒤로 꺾는 운동 자제"],
    faqs: [
      { q: "뼈가 밀려나왔다고 하는데 무조건 쇠를 박는 나사못 수술을 해야 하나요?", a: "아닙니다. 뼈의 미끄러짐 정도가 1단계(25% 미만)이고 동적 검사상 흔들림이 심하지 않다면, 코어 근육 강화와 비수술 주사 치료로 평생 문제없이 지낼 수 있습니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "spine-4",
    category: "허리",
    categorySlug: "spine",
    slug: "acute-pain",
    name: "급성 허리통증",
    enName: "Acute Lumbar Sprain",
    subtitle: "무거운 짐을 들거나 삐끗하여 척추 주변 인대와 근육이 손상된 급성 통증",
    summary: "허리를 무리하게 사용하거나 갑작스러운 비틀림, 외상으로 인해 요추 주변의 근육과 인대가 늘어나거나 파열되어 심한 근육 경련과 꼼짝할 수 없는 통증을 유발하는 상태입니다.",
    symptoms: [
      "허리가 굳어져 몸을 숙이거나 펴지도 못하고 세수를 하거나 양말을 신기 어려움",
      "숨을 크게 쉬거나 기침할 때 허리 전체에 뻐근한 경련",
      "다리로 내려가는 저림이나 마비 증상은 동반되지 않음",
    ],
    causes: ["바닥에 있는 무거운 짐을 무릎을 굽히지 않고 들 때", "기침을 하다가 허리를 삐끗함", "장시간 운전 후 굳어진 상태에서 갑자기 움직임"],
    diagnosis: ["정밀 X-ray (척추 골절 및 디스크 간격 축소 확인)", "필요 시 3.0T MRI (급성 디스크 파열 감별)"],
    nonSurgicalTreatments: [
      { title: "근막 통증 유발점 주사(TPI) 및 신경차단", desc: "심하게 뭉친 척추 근육을 즉각 이완시키고 통증 신경 전달 차단" },
      { title: "고주파 심부 온열 치료 & 척추 견인", desc: "심부 근육의 혈류를 증가시키고 경련 완화" },
    ],
    surgicalTreatments: [],
    prevention: ["물건을 들 때 반드시 무릎을 굽히고 물건을 몸에 밀착시키기", "아침 기상 전 누워서 기지개 켜기"],
    faqs: [
      { q: "허리를 삐끗했을 때 온찜질이 좋나요, 냉찜질이 좋나요?", a: "다친 직후 48시간 동안은 인대 손상 부위의 염증과 부종을 막기 위해 냉찜질을 해야 하며, 이후 3일째부터는 온찜질로 뭉친 근육을 풀어주어야 합니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "spine-5",
    category: "허리",
    categorySlug: "spine",
    slug: "non-surgical",
    name: "척추 비수술치료",
    enName: "Non-Surgical Spine Treatment",
    subtitle: "전신마취나 피부 절개 없이 10~15분 만에 신경 염증을 잠재우는 선진 치료",
    summary: "삼성G정형외과은 수술을 요하는 마비 증상이 없는 척추 환자의 95%에게 비수술 보존 치료를 최우선 적용합니다. 대학병원급 첨단 C-arm 영상 장비 하에 오차 없이 정확한 표적 시술을 시행합니다.",
    symptoms: [
      "만성적인 허리 뻐근함과 다리 저림",
      "고령, 고혈압, 당뇨 등으로 수술이 부담스러운 척추 질환자",
      "기존 수술 후에도 잔여 통증이 남아 있는 환자",
    ],
    causes: ["디스크 탈출로 인한 신경근 화학적 염증", "신경 주변 미세 유착 및 섬유화", "후관절염 및 인대 약화"],
    diagnosis: ["3.0T MRI 정밀 신경 경로 분석", "디지털 C-arm 투시 검사"],
    nonSurgicalTreatments: [
      { title: "경막외 감압 신경성형술 (신경유착박리술)", desc: "1mm 카테터를 통해 신경 주변 유착 물질을 제거하고 항염증 약물 분주 (시술 시간 15분, 당일 일상 복귀)" },
      { title: "C-arm 유도하 후지내측지 신경차단술", desc: "만성 척추관절 통증을 유발하는 감각 신경 분지만을 선택적으로 차단" },
      { title: "추간판 내 고주파 열치료술 (PCDN)", desc: "디스크 내부에 고주파 바늘을 삽입해 통증 신경을 응고시키고 수핵을 수축시킴" },
    ],
    surgicalTreatments: [],
    prevention: ["정기적인 척추 도수교정", "주 3회 30분 이상 평지 걷기"],
    faqs: [
      { q: "비수술 시술은 효과가 얼마나 지속되나요?", a: "단순히 진통제를 맞는 것이 아니라 신경 주위의 유착과 염증을 씻어내고, 이후 1:1 도수 재활 치료를 병행하여 코어 근육을 강화하면 수년간 통증 없이 건강한 척추를 유지할 수 있습니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80",
  },
];
