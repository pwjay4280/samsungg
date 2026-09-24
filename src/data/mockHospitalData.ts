import {
  HospitalInfo,
  Doctor,
  Subpage,
  Consultation,
  Review,
  QuickAppointment,
  HeroSlide,
  Notice,
  MediaArticle,
  YouTubeVideo,
  PopupItem,
  NonCoveredFeeItem,
} from "../types/hospital";

export const initialHospitalInfo: HospitalInfo = {
  name: "삼성G정형외과",
  representativeName: "구본진 의학박사 / 정형외과 전문의",
  businessNumber: "214-82-98471",
  mainNumber: "1588-7520",
  emergencyNumber: "02-530-8119",
  footerAddress: "서울특별시 서초구 서초대로 397 (강남역 9번 출구 도보 1분, 삼성G의료타워 1F~9F)",
  weekdayHours: "09:00 ~ 18:00 (도수/운동재활센터 평일 야간 20:00까지)",
  saturdayHours: "09:00 ~ 14:00 (점심시간 없이 연속 진료)",
  lunchHours: "13:00 ~ 14:00 (외래진료실)",
  sundayHolidayHours: "일요일 및 법정 공휴일 휴진 (365일 24시간 당직 응급 진료 및 입원실 운영)",
  headerLogo: "/logo-samsung-g.svg",
  footerLogo: "/logo-samsung-g-white.svg",
  favicon: "/favicon.ico",
  siteUrl: "https://samsung-g-hospital.com",
  seoTitle: "삼성G정형외과 - 척추·관절·정형외과 전문 의료기관",
  seoDescription: "강남역 9번 출구 삼성G정형외과. 양방향 척추내시경, 로봇 인공관절수술, 비수술 도수재활 클리닉, 대학병원급 3.0T MRI 및 무균수술실 완비.",
  seoKeywords: "삼성G정형외과, 척추내시경, 허리디스크, 무릎인공관절, 어깨관절경, 도수치료, 강남정형외과, 척추신경외과",
  seoOgImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  customHospitalSchema: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "삼성G정형외과",
    "image": "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    "telephone": "1588-7520",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "서초대로 397 삼성G의료타워",
      "addressLocality": "서초구",
      "addressRegion": "서울특별시",
      "addressCountry": "KR"
    },
    "medicalSpecialty": ["Orthopedic", "Neurology", "PhysicalTherapy"]
  }),
  naverMapUrl: "https://map.naver.com",
  kakaoMapUrl: "https://map.kakao.com",
  youtubeUrl: "https://youtube.com",
  blogUrl: "https://blog.naver.com",
  isQuickAppointmentEnabled: true,
};

export const initialDoctors: Doctor[] = [
  {
    id: "doc-1",
    name: "구본진",
    title: "대표원장 / 정형외과 전문의",
    specialty: "척추질환, 양방향 척추내시경(UBE), 허리디스크, 척추관협착증",
    history: [
      "서울대학교 의과대학 졸업",
      "삼성서울병원 정형외과 전공의 및 척추전임의",
      "삼성서울병원 외래교수",
      "대한정형외과학회 정회원",
      "대한척추외과학회 척추내시경 연구회 정회원",
      "미국 척추외과학회(NASS) 정회원",
      "양방향 척추내시경술(UBE) 라이브 서저리 500례 이상 집도"
    ],
    treatise: [
      "Clinical Outcomes of Biportal Endoscopic Lumbar Discectomy in High-Grade Spondylolisthesis (Spine Journal, 2023)",
      "Comparative Study of Minimal Invasive Spine Surgery vs Conventional Open Surgery (KCI, 2022)",
      "Safety and Efficacy of Full-Endoscopic Decompression for Lumbar Spinal Stenosis (J Neurosurg, 2021)"
    ],
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    order: 1,
    schedule: {
      mon: { am: true, pm: true },
      tue: { am: true, pm: false },
      wed: { am: false, pm: true },
      thu: { am: true, pm: true },
      fri: { am: true, pm: true },
      sat: { am: true, pm: false },
    },
  },
  {
    id: "doc-2",
    name: "김성훈",
    title: "병원장 / 정형외과 전문의",
    specialty: "무릎·어깨 관절, 로봇 인공관절 치환술, 관절경 수술, 줄기세포 치료",
    history: [
      "연세대학교 의과대학 졸업 및 동대학원 석·박사",
      "세브란스병원 정형외과 전문의",
      "미국 하버드 의과대학 MGH 관절센터 연수",
      "대한슬관절학회 우수논문상 수상",
      "대한관절경학회 학술위원",
      "마코(Mako) 로봇 인공관절 공인 교육 지도전문의"
    ],
    treatise: [
      "Accuracy and Alignment Analysis in Robot-Assisted Total Knee Arthroplasty (JBJS, 2024)",
      "Arthroscopic Rotator Cuff Repair with Bio-inductive Collagen Implants (AJSM, 2023)",
      "Long-term Outcomes of Autologous Chondrocyte Implantation in Osteoarthritis (Cartilage, 2021)"
    ],
    imageUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
    order: 2,
    schedule: {
      mon: { am: true, pm: false },
      tue: { am: true, pm: true },
      wed: { am: true, pm: true },
      thu: { am: false, pm: true },
      fri: { am: true, pm: true },
      sat: { am: true, pm: false },
    },
  },
  {
    id: "doc-3",
    name: "이소연",
    title: "재활의학센터장 / 재활의학과 전문의",
    specialty: "비수술 도수재활, 체형·골반교정, 수술 후 집중 재활, 척추 측만증",
    history: [
      "가톨릭대학교 의과대학 졸업",
      "서울성모병원 재활의학과 전공의",
      "대한재활의학회 정회원",
      "대한도수의학회 정회원 및 강사",
      "국제 슈로스(Schroth) 척추측만 교정치료 인증의"
    ],
    treatise: [
      "Effect of Targeted Physical Therapy on Functional Recovery after Lumbar Decompression (Ann Rehabil Med, 2023)",
      "Conservative Core Strengthening in Chronic Lower Back Pain: A Randomized Trial (JOSPT, 2022)"
    ],
    imageUrl: "https://images.unsplash.com/photo-1594824813583-74c10643b2f5?auto=format&fit=crop&w=600&q=80",
    order: 3,
    schedule: {
      mon: { am: true, pm: true },
      tue: { am: true, pm: true },
      wed: { am: true, pm: false },
      thu: { am: true, pm: true },
      fri: { am: false, pm: true },
      sat: { am: true, pm: false },
    },
  },
  {
    id: "doc-4",
    name: "정재혁",
    title: "척추신경외과 원장 / 신경외과 전문의",
    specialty: "경추/요추 신경성형술, 고주파 수핵감압술, 미세현미경 척추수술",
    history: [
      "고려대학교 의과대학 졸업",
      "고려대 안암병원 신경외과 전문의",
      "대한신경외과학회 정회원",
      "대한척추신경외과학회 정회원",
      "대한최소침습척추치료연구회(KOMISS) 정회원"
    ],
    treatise: [
      "Efficacy of Percutaneous Epidural Neuroplasty for Lumbar Disc Herniation (J Clin Med, 2023)",
      "Radiofrequency Nucleoplasty in Cervical Spondylosis: 3-Year Follow-up (Pain Physician, 2021)"
    ],
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
    order: 4,
    schedule: {
      mon: { am: false, pm: true },
      tue: { am: true, pm: true },
      wed: { am: true, pm: true },
      thu: { am: true, pm: false },
      fri: { am: true, pm: true },
      sat: { am: false, pm: true },
    },
  },
];

export const initialSubpages: Subpage[] = [
  {
    id: "sub-spine-endoscopy",
    path: "/centers/spine/endoscopy",
    title: "양방향 척추내시경술 (UBE)",
    subtitle: "초고화질 내시경으로 허리 근육 손상 없이 병변만 정밀 제거하는 최신 척추 시술",
    category: "spine",
    categoryName: "척추센터",
    authorName: "구본진 대표원장",
    authorTitle: "정형외과 전문의 / 척추분과",
    introDescription:
      "양방향 척추내시경술(Unilateral Biportal Endoscopy, UBE)은 약 5mm 크기의 미세 구멍 2개를 통해 한쪽에는 초고화질 내시경을, 다른 한쪽에는 미세 수술기구를 삽입하여 신경을 압박하는 디스크나 비후된 황색인대를 안전하게 제거하는 최첨단 최소침습 척추 치료법입니다. 근육 손상이 거의 없어 고령자나 기저질환자도 안심하고 치료받을 수 있습니다.",
    symptoms: [
      "허리를 숙이거나 앉아있을 때 허리 및 엉치 통증이 심해진다",
      "다리 쪽으로 찌릿한 방사통이 이어지며 발가락 힘이 빠진다",
      "조금만 걸어도 다리가 저리고 쥐가 나서 가다 서다를 반복한다 (신경성 파행)",
      "기침이나 재채기를 할 때 허리 깊숙한 곳에서 순간적인 격통이 발생한다",
      "아침에 일어났을 때 허리가 굳어 움직이기 힘들고 30분 이상 지속된다"
    ],
    targets: [
      {
        title: "중증 허리디스크 (추간판탈출증)",
        description: "비수술 주사 치료에도 호전이 없고 신경 마비 증상이 동반된 난치성 디스크 환자"
      },
      {
        title: "고령 및 만성질환 척추관협착증 환자",
        description: "당뇨, 고혈압, 심장질환 등으로 전신마취 수술이 부담스러운 70세 이상 고령 환자"
      },
      {
        title: "기존 척추 수술 후 재발 환자",
        description: "과거 절개 수술 후 유착이 심하거나 인접 부위 디스크 재발로 재수술이 필요한 경우"
      },
      {
        title: "빠른 일상 복귀를 원하는 직장인·자영업자",
        description: "긴 입원 기간이나 긴 재활 기간을 감당하기 어려운 현대인"
      }
    ],
    advantages: [
      {
        title: "0.5cm 초미세 절개로 무출혈·무수혈",
        items: [
          "정상 척추 근육과 뼈 구조물을 최대한 보존",
          "수술 후 척추 불안정증 및 유착 발생률 90% 이상 감소",
          "수술 부위 감염 및 흉터 최소화"
        ]
      },
      {
        title: "초고화질 4K 내시경 시야 확보",
        items: [
          "신경과 혈관을 10배 이상 확대하여 육안보다 안전하게 시술",
          "정상 신경을 손상시키지 않고 병변 부위만 미세 타격",
          "척추 전문의 1:1 정밀 집도"
        ]
      },
      {
        title: "국소 수면마취로 당일 혹은 1박 입원",
        items: [
          "전신마취 부담 없이 안전한 척추 수면마취 진행",
          "시술 시간 40분~1시간 내외, 시술 당일 보행 가능",
          "퇴원 후 일주일 이내 일상 복귀 가능"
        ]
      }
    ],
    comparisons: [
      { criteria: "절개 크기", target: "5mm 미세 절개공 2개", normal: "3~5cm 개방성 절개" },
      { criteria: "마취 방법", target: "국소 수면마취 (안전)", normal: "전신마취 필수" },
      { criteria: "근육 및 조직 손상", target: "거의 없음 (근육 보존)", normal: "근육 절개 및 척추뼈 일부 절제" },
      { criteria: "출혈 및 수혈", target: "무수혈 (시술 중 지속 식염수 세척)", normal: "출혈 발생 및 수혈 가능성" },
      { criteria: "입원 기간", target: "1박 2일 ~ 2박 3일", normal: "1~2주 장기 입원" },
      { criteria: "일상 복귀", target: "시술 당일 보행, 3~5일 복귀", normal: "최소 4주 이상 재활 필요" }
    ],
    treatments: [
      {
        title: "1단계: 정밀 3.0T MRI 영상 분석 및 마킹",
        description: "디스크 파열 위치와 척추 신경 압박 각도를 실시간 C-arm 투시 하에 0.1mm 단위로 마킹합니다."
      },
      {
        title: "2단계: 5mm 내시경 포트 및 수술 포트 삽입",
        description: "수압을 이용해 시야를 맑게 유지하며 척추 신경과 황색인대 사이의 공간을 확보합니다."
      },
      {
        title: "3단계: 신경 압박 원인 물질 정밀 박리",
        description: "튀어나온 수핵 덩어리와 두꺼워진 인대를 미세 고주파 및 펀치로 선택적 제거합니다."
      },
      {
        title: "4단계: 신경 감압 확인 및 안전 지혈",
        description: "박동하는 건강한 신경 상태를 육안으로 재확인하고 흉터 연고 및 미세 봉합으로 마무리합니다."
      }
    ],
    processes: [
      { title: "진료 및 정밀검사", description: "전문 의료진 심층 문진 + 3.0T MRI 촬영" },
      { title: "시술 전 안전 스크리닝", description: "심전도, 혈액검사, 마취 적합성 종합 판정" },
      { title: "UBE 내시경 시술", description: "약 45~60분 소요 (수면 마취 하 편안하게 진행)" },
      { title: "회복실 케어 및 보행", description: "시술 후 2시간 안정 후 보조기 착용 하 자가 보행" },
      { title: "퇴원 및 사후 재활", description: "전문의 퇴원 설명 및 1:1 도수재활 플랜 수립" }
    ],
    postcare: [
      { title: "수술 후 2주간 무리한 허리 비틀기 금지", description: "바닥에 쪼그려 앉거나 무거운 물건 들기를 자제해야 합니다." },
      { title: "샤워 관리", description: "방수 밴드 부착 시 가벼운 샤워는 실밥 제거(약 7일) 전에도 가능합니다." },
      { title: "보조기 착용 안내", description: "퇴원 후 약 2~3주간 외출 시 척추 보호대를 착용하여 안정성을 도모합니다." },
      { title: "가벼운 걷기 운동 권장", description: "평지에서 하루 20~30분씩 걷는 것은 척추 근육 회복과 유착 방지에 매우 유익합니다." }
    ],
    risks: [
      { title: "일시적 저림 및 감각 이상", description: "오랜 시간 눌려있던 신경이 펴지면서 일시적인 찌릿함이 생길 수 있으나 수주 내 안정됩니다." },
      { title: "미세 경막 파열 가능성", description: "심한 유착 환자의 경우 1% 미만에서 발생할 수 있으나 내시경 하 특수 지혈 패치로 즉시 해결 가능합니다." }
    ],
    faqs: [
      {
        question: "양방향 척추내시경술은 전신마취를 해야 하나요?",
        answer: "아닙니다. 삼성G정형외과에서는 고령 환자 및 고혈압·당뇨 환자분들도 안전하도록 전신마취가 아닌 '국소 수면마취' 하에 안전하게 진행됩니다. 환자는 주무시는 동안 통증 없이 편안히 시술을 마칠 수 있습니다."
      },
      {
        question: "입원은 며칠이나 필요한가요?",
        answer: "보통 시술 당일 오전에 입원하여 시술받으신 후 다음 날 퇴원하시거나, 경과 관찰을 위해 2박 3일 정도 입원합니다. 시술 당일 2~3시간 후부터 화장실 보행이 가능할 정도로 회복이 빠릅니다."
      },
      {
        question: "시술 후 재발 위험은 없나요?",
        answer: "삼성G정형외과 의료진은 단순히 튀어나온 디스크 조각만 떼어내는 것이 아니라 고주파 열 치료술로 디스크 외벽을 단단히 수축시켜 수술 후 재발률을 3% 미만으로 현저히 낮추고 있습니다."
      }
    ],
    whyUs: [
      { title: "대학병원 척추센터 출신 전문의 직접 집도", description: "수천 례 이상의 내시경 척추 수술 경험을 가진 전문의가 첫 진단부터 수술, 사후 관리까지 책임집니다." },
      { title: "독일 자이스(Zeiss) 최고사양 4K 내시경 시스템", description: "0.1mm의 오차도 허용하지 않는 첨단 장비와 무균 양압 수술실을 갖추었습니다." },
      { title: "원스톱 척추 재활 협진 시스템", description: "수술 직후 재활의학과 전문의 및 물리치료사가 결합하여 척추 코어 강화 치료를 병행합니다." }
    ],
    references: "Kim HS, et al. Current Status and Advances in Biportal Endoscopic Spine Surgery. Neurospine. 2020;17(Suppl 1):S12-S23.",
    images: {
      hero: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
      intro: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
      process: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80"
    },
    updatedAt: "2026-09-20T10:00:00Z",
  },
  {
    id: "sub-spine-disc",
    path: "/centers/spine/disc",
    title: "허리디스크·협착증 비수술 클리닉",
    subtitle: "수술 없이 신경 부종과 염증을 즉각 치료하는 신경성형술 & 고주파 수핵감압술",
    category: "spine",
    categoryName: "척추센터",
    authorName: "정재혁 원장",
    authorTitle: "신경외과 전문의 / 척추분과",
    introDescription:
      "허리디스크(추간판탈출증)와 척추관협착증은 무조건 수술을 해야 하는 질환이 아닙니다. 실제 환자의 90% 이상은 수술 없이 비수술 보존적 치료로 완치 수준의 호전이 가능합니다. 삼성G정형외과 비수술 척추 클리닉에서는 직경 1mm 특수 카테터를 꼬리뼈 구멍을 통해 삽입하여 신경 유착을 박리하고 약물을 주입하는 신경성형술을 시행합니다.",
    symptoms: [
      "허리 통증과 함께 엉덩이, 허벅지, 종아리가 저리고 당긴다",
      "눕거나 서 있으면 편하지만 앉을 때 허리에 강한 압박감이 느껴진다",
      "서서히 걸을 때 다리가 무겁고 터질 듯하여 자주 쪼그려 앉아야 한다",
      "발등이나 발가락의 감각이 둔해지고 남의 살처럼 느껴진다"
    ],
    targets: [
      { title: "초기 및 중기 허리디스크 환자", description: "약물치료와 물리치료로 효과를 보지 못한 환자" },
      { title: "척추 수술에 대한 두려움이 큰 환자", description: "칼을 대지 않고 당일 퇴원하여 일상에 복귀하고 싶은 경우" },
      { title: "척추관협착증 환자", description: "다리 저림으로 장거리 보행이 힘든 중장년층" }
    ],
    advantages: [
      {
        title: "절개 없는 10분 시술",
        items: ["전신마취 없음, 국소마취 진행", "흉터 걱정 없는 1mm 초미세 침술 치료", "시술 후 1~2시간 휴식 후 바로 당일 귀가"]
      },
      {
        title: "통증 유발 부위 직접 타깃",
        items: ["C-arm 영상 장비로 척추 신경근까지 정밀 접근", "염증 유발 물질 세척 및 고농도 신경 재생액 주입"]
      }
    ],
    treatments: [
      { title: "경막외 신경성형술 (PEN)", description: "꼬리뼈를 통해 특수 카테터를 병변 부위까지 밀어 넣어 유착을 풀고 염증을 씻어냅니다." },
      { title: "고주파 수핵감압술 (L-DISQ)", description: "튀어나온 디스크 내부에 미세 바늘을 삽입하고 고주파 플라즈마로 디스크 압력을 즉각 낮춥니다." }
    ],
    processes: [
      { title: "정밀 검사", description: "MRI 및 신경학적 검진" },
      { title: "시술 준비", description: "국소 피부 마취 (약 3분)" },
      { title: "영상 유도 시술", description: "실시간 모니터링 하 카테터 시술 (약 15분)" },
      { title: "당일 귀가", description: "회복실 안정 후 당일 일상 복귀" }
    ],
    postcare: [
      { title: "시술 당일 무리한 활동 자제", description: "시술 부위 샤워는 다음 날부터 가능합니다." },
      { title: "코어 운동 병행", description: "염증 가라앉은 2주 후부터 전문 도수운동치료 시작" }
    ],
    faqs: [
      { question: "시술할 때 통증이 심한가요?", answer: "피부 국소마취를 충분히 시행한 뒤 진행하므로 치과 치료보다도 부담이 적으며, 약간 뻐근한 느낌 외에는 큰 통증이 없습니다." }
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80"
    },
    updatedAt: "2026-09-18T10:00:00Z",
  },
  {
    id: "sub-joint-robotic-knee",
    path: "/centers/joint/robotic-knee",
    title: "로봇 인공관절 수술 센터",
    subtitle: "0.1mm 오차 없는 인공지능 3D 로봇(Mako) 맞춤형 인공슬관절 치환술",
    category: "joint",
    categoryName: "관절센터",
    authorName: "김성훈 병원장",
    authorTitle: "정형외과 전문의 / 슬관절분과",
    introDescription:
      "퇴행성 관절염 말기로 연골이 닳아 뼈끼리 부딪히는 극심한 통증을 겪는 환자에게 로봇 인공관절 수술은 혁신적인 해답입니다. 수술 전 환자의 관절을 3차원 CT로 입체 재구성하여 0.1mm 오차 없이 사전 시뮬레이션하고, 집도의의 숙련된 손길과 로봇 암의 정밀 안전 제어가 결합되어 정상 뼈와 인대를 극대화하여 보존합니다.",
    symptoms: [
      "밤에 잘 때도 무릎이 욱신거려 잠을 이룰 수 없다",
      "계단을 오르내릴 때 손잡이를 잡지 않으면 발을 디딜 수 없다",
      "다리가 O자형으로 휘어져 걸음걸이가 뒤뚱거린다",
      "연골주사나 소염진통제를 복용해도 더 이상 통증이 완화되지 않는다"
    ],
    targets: [
      { title: "말기 퇴행성 관절염 (KL Grade 4)", description: "관절 간격이 소실되고 골극이 형성된 극심한 통증 환자" },
      { title: "외상성 관절염 및 관절 변형 환자", description: "O자형 또는 X자형 다리 변형이 심하게 진행된 경우" },
      { title: "오래 쓰는 인공관절을 원하는 환자", description: "정확한 각도와 균형으로 25년 이상 반영구적 수명을 원하는 경우" }
    ],
    advantages: [
      {
        title: "인공관절 수명 연장 (정밀 정렬)",
        items: ["환자 고유의 해부학적 각도 0.5도 단위 맞춤 삽입", "인공관절 마모율 최소화로 25년 이상 사용"]
      },
      {
        title: "출혈량 감소 및 빠른 보행",
        items: ["불필요한 뼈 절제 방지 햅틱 존(Haptic Zone) 안전 시스템", "수술 다음 날부터 보행기 보행 훈련 시작"]
      }
    ],
    comparisons: [
      { criteria: "절제 정밀도", target: "0.1mm 오차 로봇 암 제어", normal: "의사의 육안 및 눈대중 계측" },
      { criteria: "인대 균형", target: "실시간 컴퓨터 센서 수치화", normal: "손끝 감각에 의존" },
      { criteria: "인공관절 수명", target: "25년 이상 (정밀 정렬)", normal: "약 15~20년" }
    ],
    treatments: [
      { title: "3D CT 데이터 기반 가상 수술", description: "환자의 고유한 관절 굴곡과 골격을 3차원 분석" },
      { title: "로봇 암 가이드 정밀 절삭", description: "계획된 영역 밖으로 기구가 벗어나지 않는 안전 가드 작동" },
      { title: "생체 적합 맞춤 인공관절 안착", description: "좌우 인대 장력을 완벽히 대칭으로 조율하여 안착" }
    ],
    processes: [
      { title: "입원 및 정밀 3D CT", description: "수술 1일 전 입원 및 계측" },
      { title: "로봇 인공관절 수술", description: "약 1시간 10분 소요" },
      { title: "집중 CPM 재활", description: "수술 24시간 후 무릎 꺾기 훈련" },
      { title: "퇴원 및 보행", description: "수술 후 약 7~10일 내 독립 보행 퇴원" }
    ],
    postcare: [
      { title: "수술 후 조기 무릎 굴곡 운동 필수", description: "관절이 굳지 않도록 CPM 기구와 도수 운동을 매일 병행합니다." }
    ],
    faqs: [
      { question: "로봇이 알아서 수술하는 건가요?", answer: "아닙니다. 숙련된 정형외과 전문의가 로봇 암을 직접 잡고 조작하며, 로봇은 0.1mm의 오차나 떨림을 제어하고 뼈 절제 각도를 보조하는 최첨단 어시스턴트 역할을 합니다." }
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1200&q=80"
    },
    updatedAt: "2026-09-19T10:00:00Z",
  },
  {
    id: "sub-joint-shoulder",
    path: "/centers/joint/shoulder",
    title: "어깨 오십견 & 회전근개 관절경 클리닉",
    subtitle: "통증 없이 팔을 자유롭게 올리는 미세 관절경 봉합술 및 관절 수압팽창술",
    category: "joint",
    categoryName: "관절센터",
    authorName: "김성훈 병원장",
    authorTitle: "정형외과 전문의",
    introDescription:
      "어깨 통증의 대표적인 원인인 유착성 관절낭염(오십견)과 회전근개 파열은 치료법이 완전히 다릅니다. 삼성G정형외과 어깨 클리닉에서는 고해상도 초음파와 3.0T MRI를 통해 힘줄의 파열 유무를 정확히 감별하고, 비수술 관절강 유착박리술부터 무절개 미세 관절경 봉합술까지 1:1 맞춤형 치료를 시행합니다.",
    symptoms: [
      "팔을 뒤로 돌리거나 위로 올릴 때 어깨에 걸리는 느낌과 통증이 있다",
      "밤에 아픈 쪽으로 돌아누우면 잠을 깰 정도로 극심한 야간통이 있다",
      "옷을 입거나 머리를 감을 때 팔이 올라가지 않는다",
      "팔을 내릴 때 뚝 소리가 나거나 힘이 툭 빠진다"
    ],
    targets: [
      { title: "회전근개 힘줄 파열 환자", description: "파열이 진행되어 팔을 들기 힘든 경우" },
      { title: "만성 오십견 (동결견) 환자", description: "어깨가 굳어 모든 방향의 운동 범위가 제한된 환자" },
      { title: "어깨 석회성 건염", description: "돌 같은 석회가 힘줄에 침착되어 극심한 통증을 유발하는 경우" }
    ],
    advantages: [
      {
        title: "초미세 관절경을 통한 흉터 없는 치료",
        items: ["피부 절개 없이 작은 구멍으로 관절 속을 직접 관찰", "파열된 힘줄을 튼튼하게 교량형(Bridge) 봉합"]
      }
    ],
    treatments: [
      { title: "비수술 어깨 관절 수압팽창술", description: "굳어진 관절막을 생리식염수와 약물로 부드럽게 팽창시켜 가동 범위를 즉시 넓힙니다." },
      { title: "미세 관절경 회전근개 봉합술", description: "초고화질 내시경으로 찢어진 어깨 힘줄을 뼈에 단단하게 재부착합니다." }
    ],
    processes: [
      { title: "어깨 정밀 초음파/MRI", description: "파열 크기 및 관절염 동반 여부 확인" },
      { title: "맞춤 시술/수술", description: "비수술 시술 10분, 관절경 봉합 40분" },
      { title: "어깨 전용 CPM 재활", description: "수술 직후부터 안전한 수동적 관절 운동 시작" }
    ],
    postcare: [
      { title: "수술 후 보조기 착용 (약 4~6주)", description: "봉합된 힘줄이 뼈에 완전히 안착할 때까지 어깨 외전 보조기를 착용합니다." }
    ],
    faqs: [
      { question: "오십견은 시간 지나면 저절로 낫지 않나요?", answer: "흔히 자연 치유된다고 알려져 있지만 방치할 경우 영구적인 어깨 운동 제한과 만성 통증을 남깁니다. 조기에 유착을 풀어주는 치료를 받아야 완전한 기능 회복이 가능합니다." }
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
    },
    updatedAt: "2026-09-17T10:00:00Z",
  },
  {
    id: "sub-rehab-dohsu",
    path: "/centers/rehab/dohsu",
    title: "1:1 프리미엄 도수·운동재활센터",
    subtitle: "국가공인 전문 물리치료사의 수기 치료와 첨단 척추 감압·슬링 운동의 결합",
    category: "rehab",
    categoryName: "도수재활센터",
    authorName: "이소연 센터장",
    authorTitle: "재활의학과 전문의",
    introDescription:
      "삼성G정형외과 도수재활센터는 단순한 마사지가 아닌, 재활의학과 전문의의 정확한 의학적 진단과 처방을 바탕으로 1:1 전담 물리치료사가 척추와 관절의 정렬을 바로잡고 심부 근육을 강화하는 맞춤형 메디컬 재활 프로그램입니다. 평일 야간 8시까지 직장인을 위한 야간 클리닉을 운영합니다.",
    symptoms: [
      "컴퓨터나 스마트폰을 오래 하면 목 뒤가 뻐근하고 두통이 찾아온다",
      "골반이 틀어져 치마가 한쪽으로 돌아가거나 신발 밑창이 한쪽만 닳는다",
      "허리나 무릎 수술 후 일상생활로 복귀하기 위한 근력 회복이 필요하다",
      "측만증으로 인해 양쪽 어깨 높이나 갈비뼈 돌출도가 비대칭이다"
    ],
    targets: [
      { title: "일자목·거북목 및 척추 불균형 환자", description: "근막 이완과 관절 가동성 회복이 시급한 직장인·수험생" },
      { title: "척추·관절 수술 후 재활 환자", description: "수술 부위 유착 방지와 위축된 근육 재건" },
      { title: "만성 근막통증증후군 환자", description: "어깨, 등, 허리의 만성적인 근육 뭉침과 결림" }
    ],
    advantages: [
      {
        title: "전문의 처방 기반 1:1 맞춤 독립 치료실",
        items: ["프라이빗한 1인 도수 치료실 완비", "환자 상태에 따른 맞춤형 도수 테크닉 (Maitland, Kaltenborn, Mulligan)"]
      },
      {
        title: "첨단 척추 무중력 감압기 & 독일 슬링 시스템",
        items: ["척추 내 음압을 형성해 디스크를 원래 자리로 당겨주는 로봇 감압 치료", "흔들리는 줄을 이용한 코어 안정화 슬링 운동"]
      }
    ],
    treatments: [
      { title: "관절 가동술 (Joint Mobilization)", description: "굳어진 척추 관절과 사지 관절의 운동 범위를 부드럽게 증진" },
      { title: "근막 이완요법 (Myofascial Release)", description: "비정상적으로 긴장된 심부 근막을 풀어 혈액 순환 촉진" },
      { title: "슈로스 3차원 측만 교정 운동", description: "회전 호흡과 특수 자세를 통해 척추 만곡 교정" }
    ],
    processes: [
      { title: "체형 분석 및 기능 검사", description: "동적 족저압 및 척추 정렬 3D 스캔" },
      { title: "전담 물리치료사 1:1 치료", description: "수기 도수치료 (40분~60분)" },
      { title: "장비 운동 재활", description: "슬링 및 체외충격파, 척추감압기 치료" },
      { title: "홈케어 운동 티칭", description: "일상생활 자세 교정 및 자가 운동법 지도" }
    ],
    postcare: [
      { title: "치료 후 일시적 뻐근함 (명현 현상)", description: "평소 쓰지 않던 심부 근육이 자극되어 1~2일간 근육통이 있을 수 있으나 곧 상쾌해집니다." }
    ],
    faqs: [
      { question: "실손의료보험(실비보험) 적용이 가능한가요?", answer: "네, 의사의 의학적 진단 및 처방 하에 이루어지는 비급여 치료로 실손의료보험 혜택을 받으실 수 있습니다. 자세한 서류 발급은 원무과에서 100% 지원해 드립니다." }
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
    },
    updatedAt: "2026-09-19T10:00:00Z",
  }
];

export const initialConsultations: Consultation[] = [
  {
    id: "cons-1",
    seq: 104,
    title: "허리디스크 진단 후 다리 저림이 심한데 내시경 수술로 해결될까요?",
    content: "40대 직장인입니다. 3주 전부터 엉치부터 종아리 바깥쪽까지 찌릿찌릿 당기고 오래 앉아있기 힘듭니다. 동네 병원에서 4-5번 디스크 파열이라는데 큰 수술이 무서워서 망설여집니다. 양방향 내시경술로 흉터 없이 회복이 가능한가요?",
    category: "척추질환",
    authorName: "최*영",
    authorId: "user-101",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80",
    isSecret: false,
    views: 142,
    status: "답변완료",
    answer: "안녕하세요, 삼성G정형외과 척추센터 대표원장 구본진입니다. 엉치부터 종아리까지의 방사통은 4-5번 요추 신경근이 탈출된 디스크 수핵에 의해 직접 압박받고 있을 가능성이 매우 높습니다. 양방향 척추내시경술(UBE)은 5mm 미세 절개공 2개만을 통해 4K 초고화질로 신경을 확인하며 파열된 디스크 조각만 선택적으로 제거하므로 척추 근육 손상이 거의 없고 1박 2일 입원으로 빠른 회복이 가능합니다. 최근 촬영하신 MRI 자료를 지참하시어 내원하시면 신경 손상 정도를 정밀 검토해 드리겠습니다.",
    answerDoctorName: "구본진 대표원장",
    answerDoctorId: "doc-1",
    answerCreatedAt: "2026-09-21T14:30:00Z",
    createdAt: "2026-09-21T09:15:00Z",
  },
  {
    id: "cons-2",
    seq: 103,
    title: "어머니가 70대이신데 무릎 인공관절 로봇 수술 안전할까요?",
    content: "어머니께서 퇴행성 관절염 말기 판정을 받으셨는데 고혈압과 당뇨가 있으셔서 수술이 너무 걱정됩니다. 로봇 수술이 일반 수술보다 덜 아프고 출혈이 적다고 들었는데 정말 그런가요?",
    category: "관절질환",
    authorName: "박*호",
    authorId: "user-102",
    isSecret: false,
    views: 98,
    status: "답변완료",
    answer: "안녕하세요, 관절센터 병원장 김성훈입니다. 고령의 어르신과 고혈압, 당뇨 등 만성질환 환자분들일수록 로봇 인공관절 수술(Mako)의 장점이 극대화됩니다. 사전 3D-CT를 통해 뼈 절제 범위를 0.1mm 단위로 정확하게 계산하고 정상 인대와 뼈를 최대한 보존하므로 수술 중 출혈량이 일반 수술 대비 40% 이상 적고 통증도 훨씬 덜합니다. 본원에서는 내과 전문의와의 수술 전 철저한 협진으로 안전성을 최우선으로 확보하고 있으니 안심하시고 상담받으시길 권합니다.",
    answerDoctorName: "김성훈 병원장",
    answerDoctorId: "doc-2",
    answerCreatedAt: "2026-09-20T17:00:00Z",
    createdAt: "2026-09-20T11:40:00Z",
  },
  {
    id: "cons-3",
    seq: 102,
    title: "목 디스크 및 일자목 도수치료 비용 및 실비 문의",
    content: "야간 근무가 많은 개발자입니다. 목이 뻣뻣하고 팔 쪽으로 뻐근한 느낌이 드는데 도수치료를 평일 저녁 늦게도 받을 수 있는지, 실손보험 청구 서류가 발급되는지 궁금합니다.",
    category: "도수재활",
    authorName: "강*석",
    authorId: "user-103",
    isSecret: false,
    views: 76,
    status: "답변완료",
    answer: "안녕하세요, 재활의학센터장 이소연입니다. 삼성G정형외과 도수재활센터는 직장인 분들의 편의를 위해 평일 월~금 야간 8시까지 1:1 전담 물리치료사 야간 클리닉을 운영하고 있습니다. 재활의학과 전문의의 정확한 진단 및 처방 하에 이루어지는 비급여 치료이므로 가입하신 실손의료보험의 약관에 따라 혜택을 받으실 수 있으며, 진료비 세부내역서와 진단서 등 필요 서류를 원무과에서 원스톱으로 즉시 발급해 드립니다.",
    answerDoctorName: "이소연 센터장",
    answerDoctorId: "doc-3",
    answerCreatedAt: "2026-09-19T18:10:00Z",
    createdAt: "2026-09-19T15:20:00Z",
  },
  {
    id: "cons-4",
    seq: 101,
    title: "MRI 검사 결과 판독 및 비수술 시술 가능 문의 (비밀글)",
    content: "타 병원에서 촬영한 요추 MRI CD를 가지고 있습니다. 수술 판정을 받았는데 비수술로 치료 가능한지 2차 소견을 듣고 싶습니다.",
    category: "척추질환",
    authorName: "이*민",
    authorId: "user-104",
    isSecret: true,
    password: "123",
    views: 35,
    status: "접수완료",
    createdAt: "2026-09-22T08:50:00Z",
  }
];

export const initialReviews: Review[] = [
  {
    id: "rev-1",
    seq: 48,
    title: "양방향 척추내시경 후 지옥 같던 다리 저림이 사라졌습니다.",
    treatmentName: "양방향 척추내시경술 (UBE)",
    content: "디스크가 심하게 터져서 밤마다 엉덩이와 종아리가 끊어질 것처럼 아파서 진통제 없이는 10분도 못 서 있었습니다. 구본진 대표원장님께 내시경 수술을 받고 다음 날 바로 걸어서 화장실을 가는데 통증이 거짓말처럼 사라져서 눈물이 났습니다. 흉터도 반창고 크기밖에 안 남았고 1주일 만에 회사에 복귀했습니다. 정말 감사드립니다.",
    authorName: "김*진",
    authorId: "user-rev-1",
    rating: 5,
    category: "척추센터",
    status: "승인완료",
    views: 310,
    createdAt: "2026-09-18T16:00:00Z",
  },
  {
    id: "rev-2",
    seq: 47,
    title: "74세 어머니 로봇 인공관절 수술 후 걷는 즐거움을 되찾으셨어요",
    treatmentName: "마코(Mako) 로봇 인공관절 치환술",
    content: "다리가 심하게 O자로 휘어져서 걷기 힘들어하시던 어머니가 김성훈 병원장님께 로봇 인공관절 수술을 받으셨습니다. 수술 전 꼼꼼한 설명과 친절한 간호사 선생님들 덕분에 안심할 수 있었습니다. 지금은 수술 2달째인데 통증 없이 공원 산책을 매일 1시간씩 다니십니다.",
    authorName: "이*선",
    authorId: "user-rev-2",
    rating: 5,
    category: "관절센터",
    status: "승인완료",
    views: 284,
    createdAt: "2026-09-15T11:20:00Z",
  },
  {
    id: "rev-3",
    seq: 46,
    title: "어깨가 안 올라가던 오십견, 관절경 시술로 통증 끝!",
    treatmentName: "어깨 미세관절경 유리술 및 도수재활",
    content: "머리를 빗거나 뒤로 옷을 입을 때마다 찢어지는 통증으로 고생했는데, 삼성G정형외과에서 정확한 원인을 찾고 간단한 관절경 치료와 도수치료를 병행하니 3주 만에 팔이 끝까지 올라갑니다. 의료진 분들 모두 너무 친절하십니다.",
    authorName: "정*희",
    authorId: "user-rev-3",
    rating: 5,
    category: "관절센터",
    status: "승인완료",
    views: 195,
    createdAt: "2026-09-12T14:45:00Z",
  },
  {
    id: "rev-4",
    seq: 45,
    title: "수술 권유받았던 척추관 협착증, 신경성형술로 호전되었습니다.",
    treatmentName: "경막외 신경성형술 (PEN)",
    content: "100미터만 걸어도 다리가 저려 주저앉던 협착증 환자였습니다. 정재혁 원장님 상담 후 신경성형술을 받았는데 칼을 대지 않고 20분 만에 끝났습니다. 시술 당일 퇴원해서 무리 없이 생활하고 있습니다.",
    authorName: "박*수",
    authorId: "user-rev-4",
    rating: 5,
    category: "척추센터",
    status: "승인완료",
    views: 240,
    createdAt: "2026-09-10T10:30:00Z",
  }
];

export const initialQuickAppointments: QuickAppointment[] = [
  {
    id: "qa-1",
    name: "정태환",
    phone: "010-3841-9210",
    category: "척추클리닉",
    preferredDate: "2026-09-25",
    preferredTime: "오전 10시",
    symptomDescription: "허리 통증 및 오른쪽 다리 당김 증상",
    status: "신규접수",
    notes: "초진 환자, 타병원 MRI CD 지참 예정",
    createdAt: "2026-09-23T01:30:00Z",
  },
  {
    id: "qa-2",
    name: "한미경",
    phone: "010-5120-7734",
    category: "관절클리닉",
    preferredDate: "2026-09-26",
    preferredTime: "오후 2시",
    symptomDescription: "양측 무릎 계단 내려갈 때 극심한 통증",
    status: "상담완료",
    notes: "김성훈 병원장 진료 예약 안내",
    createdAt: "2026-09-22T16:15:00Z",
  }
];

export const initialHeroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    order: 1,
    isActive: true,
    type: "image",
    pcImageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=85",
    mobileImageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=85",
    badgeText: "척추·관절 최첨단 최소침습 전문의료기관",
    pcMainHeading1: "정확한 진단이 기적을 만듭니다,",
    pcMainHeading2: "삼성G정형외과의 바른 척추·관절 의학",
    pcSmallSubtitle: "SAMSUNG G HOSPITAL SPINE & JOINT CENTER",
    pcBody: "대학병원급 3.0T MRI와 0.1mm 정밀 4K 양방향 척추내시경, 최신 마코 로봇 인공관절 시스템으로 환자의 건강한 일상을 지켜냅니다.",
    textColor: "white",
    linkUrl: "/centers/spine/endoscopy",
  },
  {
    id: "slide-2",
    order: 2,
    isActive: true,
    type: "image",
    pcImageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1920&q=85",
    mobileImageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=85",
    badgeText: "0.5cm 미세절개 양방향 척추내시경(UBE)",
    pcMainHeading1: "칼 대지 않는 수면 척추 치료,",
    pcMainHeading2: "고령·만성질환자도 1박2일 안심 회복",
    pcSmallSubtitle: "MINIMALLY INVASIVE SPINE SURGERY",
    pcBody: "정상 근육과 뼈를 최대한 보존하여 수술 후 통증이 적고 회복이 빠른 삼성G정형외과만의 특화 내시경 수술 노하우.",
    textColor: "white",
    linkUrl: "/centers/spine/endoscopy",
  },
  {
    id: "slide-3",
    order: 3,
    isActive: true,
    type: "image",
    pcImageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=85",
    mobileImageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=85",
    badgeText: "1:1 맞춤형 메디컬 도수·운동 재활",
    pcMainHeading1: "수술 전 비수술부터 수술 후 재활까지,",
    pcMainHeading2: "재활의학과 전문의와 1:1 밀착 케어",
    pcSmallSubtitle: "PREMIUM REHABILITATION CENTER",
    pcBody: "평일 야간 8시까지, 첨단 무중력 척추감압기와 슬링 시스템을 결합한 과학적인 신체 균형 회복 솔루션.",
    textColor: "white",
    linkUrl: "/centers/rehab/dohsu",
  }
];

export const initialNotices: Notice[] = [
  {
    id: "not-1",
    seq: 32,
    title: "[공지] 추석 연휴 진료 일정 및 24시간 응급 진료실 운영 안내",
    content: "추석 연휴 기간 동안 외래 진료는 휴진하며, 입원실 및 365일 24시간 당직 응급 수술실은 정상 가동됩니다. 내원에 착오 없으시길 바랍니다.",
    authorName: "삼성G정형외과 행정처",
    views: 420,
    createdAt: "2026-09-21T09:00:00Z",
    isImportant: true,
  },
  {
    id: "not-2",
    seq: 31,
    title: "[도입] 대학병원급 지멘스 3.0T MRI 최신 마그네톰 비다 추가 도입",
    content: "삼성G정형외과은 더욱 정밀하고 신속한 신경·관절 진단을 위해 최첨단 3.0T MRI 장비를 추가 도입하여 대기 시간을 대폭 단축하였습니다.",
    authorName: "영상의학센터",
    views: 310,
    createdAt: "2026-09-15T14:00:00Z",
    isImportant: true,
  },
  {
    id: "not-3",
    seq: 30,
    title: "[안내] 평일 야간 도수재활 클리닉 저녁 8시까지 확대 운영",
    content: "바쁜 직장인 및 학생 환자분들을 위하여 1:1 전담 물리치료 도수재활센터를 평일 저녁 8시까지 확대 운영합니다.",
    authorName: "도수재활센터",
    views: 260,
    createdAt: "2026-09-10T10:00:00Z",
  }
];

export const initialMediaArticles: MediaArticle[] = [
  {
    id: "med-1",
    seq: 15,
    title: "[조선일보] 삼성G정형외과 구본진 원장, '양방향 척추내시경술로 척추 치료의 패러다임을 바꾸다'",
    pressName: "조선일보",
    content: "절개창을 최소화하고 초고화질 내시경으로 신경 압박 원인을 제거하는 UBE 수술의 우수성과 임상 결과를 집중 조명했습니다.",
    imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80",
    articleUrl: "#",
    views: 540,
    createdAt: "2026-09-18T08:30:00Z",
  },
  {
    id: "med-2",
    seq: 14,
    title: "[동아일보] 인공관절 수명 25년으로 연장... 로봇 수술이 이끄는 관절 정밀 의학",
    pressName: "동아일보",
    content: "삼성G정형외과 김성훈 병원장 인터뷰. 마코 로봇 암을 이용한 환자 맞춤형 인공슬관절 치환술의 안전성과 장점 분석.",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
    articleUrl: "#",
    views: 480,
    createdAt: "2026-09-08T09:00:00Z",
  }
];

export const initialYouTubeVideos: YouTubeVideo[] = [
  {
    id: "yt-1",
    seq: 8,
    title: "[전문의가 알려주는 의학상식] 허리디스크 vs 척추관협착증 3초 자가구별법",
    youtubeId: "dQw4w9WgXcQ",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    content: "허리를 앞으로 숙일 때 아프면 디스크? 뒤로 젖힐 때 아프면 협착증? 구본진 대표원장이 알기 쉽게 정리해 드립니다.",
    doctorName: "구본진 대표원장",
    createdAt: "2026-09-16T17:00:00Z",
  },
  {
    id: "yt-2",
    seq: 7,
    title: "[관절 건강] 무릎 소리 날 때 그냥 두면 위험한 이유와 연골 보존 운동법",
    youtubeId: "dQw4w9WgXcQ",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    content: "무릎에서 나는 '뚝' 소리와 통증. 로봇 인공관절 김성훈 병원장이 설명하는 연골 손상 단계별 대처법.",
    doctorName: "김성훈 병원장",
    createdAt: "2026-09-05T15:00:00Z",
  }
];

export const initialPopups: PopupItem[] = [
  {
    id: "pop-1",
    title: "삼성G정형외과 3.0T MRI 도입 기념 정밀 검진 프로모션",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    linkUrl: "/centers/spine/endoscopy",
    startDate: "2026-09-01",
    endDate: "2026-10-31",
    isActive: true,
    width: 420,
    height: 520,
  }
];

export const initialNonCoveredFees: NonCoveredFeeItem[] = [
  { category: "자기공명영상진단(MRI)", code: "MRI-L-01", name: "요추(허리) MRI 정밀 검사", unit: "1회", cost: 450000, minCost: 400000, maxCost: 500000, description: "3.0T 조영제 미포함 기준" },
  { category: "자기공명영상진단(MRI)", code: "MRI-C-01", name: "경추(목) MRI 정밀 검사", unit: "1회", cost: 450000, minCost: 400000, maxCost: 500000, description: "3.0T 조영제 미포함 기준" },
  { category: "자기공명영상진단(MRI)", code: "MRI-K-01", name: "슬관절(무릎) MRI 검사", unit: "1회(편측)", cost: 420000, minCost: 380000, maxCost: 450000, description: "십자인대 및 반월상연골 정밀" },
  { category: "도수치료", code: "DOSU-01", name: "1:1 척추·관절 도수치료 (일반)", unit: "1회(40분)", cost: 120000, minCost: 100000, maxCost: 150000, description: "전담 물리치료사 수기 치료" },
  { category: "도수치료", code: "DOSU-02", name: "1:1 프리미엄 도수 및 슬링운동", unit: "1회(60분)", cost: 180000, minCost: 160000, maxCost: 200000, description: "도수 + 슈로스/슬링 집중 재활" },
  { category: "체외충격파치료(ESWT)", code: "ESWT-F-01", name: "방사형 체외충격파 (근육/근막)", unit: "1회(2000타)", cost: 70000, minCost: 60000, maxCost: 80000, description: "어깨/발바닥/팔꿈치 부위별" },
  { category: "체외충격파치료(ESWT)", code: "ESWT-F-02", name: "초점형(집중형) 체외충격파 (관절심부)", unit: "1회(1500타)", cost: 100000, minCost: 90000, maxCost: 120000, description: "석회건염 및 깊은 인대 재생" },
  { category: "주사치료", code: "INJ-P-01", name: "DNA 인대증식치료(프롤로 주사)", unit: "1회", cost: 80000, minCost: 70000, maxCost: 100000, description: "PDRN 고농도 증식제 사용" }
];
