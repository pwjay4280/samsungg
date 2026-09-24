import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Building2,
  Award,
  ShieldCheck,
  Activity,
  HeartPulse,
  MapPin,
  Car,
  Train,
  Clock,
  Phone,
  Microscope,
  Users,
  HeartHandshake,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { useHospital } from "../context/HospitalContext";
import { useLanguage } from "../context/LanguageContext";
import {
  hospitalVisionData,
  initialTherapists,
  hospitalTourFacilities,
} from "../data/hospitalContentData";

type AboutTab = "greeting" | "location" | "staff" | "tour" | "equipment";

export const AboutHospitalLayout: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as AboutTab;
  const [activeTab, setActiveTab] = useState<AboutTab>(tabParam || "greeting");

  const { hospitalInfo, doctors, openAppointmentModal } = useHospital();
  const { language } = useLanguage();
  const navPrefix = language === "en" ? "/en" : "";

  useEffect(() => {
    if (tabParam && ["greeting", "location", "staff", "tour", "equipment"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: AboutTab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const equipments = [
    {
      name: "지멘스 마그네톰 비다 3.0T MRI",
      desc: "대학병원급 초고해상도 영상으로 미세 신경, 디스크 탈출, 연골 손상을 오차 없이 당일 판독",
      img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
      specs: ["초고해상도 3.0 Tesla 자장", "BioMatrix 호흡 감지 기술", "검사 시간 40% 단축"],
    },
    {
      name: "마코(Mako) 로봇 인공관절 시스템",
      desc: "수술 전 3D CT 시뮬레이션과 햅틱 로봇 암 제어로 0.1mm 오차 없는 환자 맞춤형 무릎 절골",
      img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=600&q=80",
      specs: ["0.1mm 정밀도 제어", "정상 인대 100% 보존", "수술 후 통증 50% 감소"],
    },
    {
      name: "독일 자이스(Zeiss) 4K 수술 현미경",
      desc: "수술 시야를 20배 이상 확대하여 신경 및 미세 혈관 손상 없이 안전한 최소침습 수술 집도",
      img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
      specs: ["4K 초고화질 형광 조영", "20배 광학 줌", "무수혈 미세 수술 지원"],
    },
    {
      name: "독일 센타우르(Centaur) 3D 척추안정화기",
      desc: "컴퓨터 제어 하에 360도 공간 회전 운동을 통해 척추 심부 다열근과 코어를 선택적으로 강화",
      img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
      specs: ["중력 부하 3D 공간 회전", "척추 심부 근력 실시간 측정", "재발 방지 특화 재활"],
    },
    {
      name: "방사형 & 초점형 체외충격파 (ESWT)",
      desc: "스위스 정품 충격파 장비로 석회성건염, 테니스엘보, 족저근막염의 염증을 비수술 파쇄",
      img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
      specs: ["초점형/방사형 듀얼 모드", "세포 증식 및 혈관 재형성", "시술 시간 10분 즉시 일상 복귀"],
    },
    {
      name: "디지털 C-arm 척추 투시 영상 장비",
      desc: "시술 부위를 실시간 X-선 연속 투시하여 1mm 오차 없이 정밀 신경차단술 및 신경성형술 시행",
      img: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=600&q=80",
      specs: ["초정밀 마이크로 투시", "방사선 피폭량 70% 저감", "신경 표적 정확도 99.9%"],
    },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Breadcrumb & Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            HOSPITAL INTRODUCTION
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            삼성G정형외과 소개
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            연구하는 의원, 함께 뛰는 의원, 나누는 의원의 정신으로 기본에 충실한 바른 의료를 약속합니다.
          </p>
        </div>

        {/* 2-Depth Submenu Tabs */}
        <div className="flex items-center justify-center">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-center gap-1">
            {[
              { id: "greeting", label: "인사말 & 비전" },
              { id: "location", label: "오시는길 & 진료안내" },
              { id: "staff", label: "의료진 & 치료사 안내" },
              { id: "tour", label: "둘러보기 (원내 시설)" },
              { id: "equipment", label: "의료장비 안내" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as AboutTab)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: 인사말 & 비전 */}
        {activeTab === "greeting" && (
          <div className="space-y-12 animate-fadeIn">
            {/* Vision Highlight Banner */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="max-w-3xl space-y-6 relative z-10">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
                  OUR PHILOSOPHY & MOTTO
                </span>
                <h2 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight">
                  연구하는 병원 · 함께 뛰는 병원 · 나누는 병원
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
                  {hospitalVisionData.directorGreeting}
                </p>
                <div className="pt-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400">
                    <img
                      src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80"
                      alt="대표원장"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">구본진 대표원장</p>
                    <p className="text-xs text-cyan-300">정형외과 전문의 / 의학박사</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Core Values Grid */}
            <div>
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  CORE VALUES
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">삼성G정형외과 3대 핵심 가치</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hospitalVisionData.coreValues.map((val, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                      {idx === 0 && <Microscope className="w-7 h-7" />}
                      {idx === 1 && <Users className="w-7 h-7" />}
                      {idx === 2 && <HeartHandshake className="w-7 h-7" />}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-cyan-700 tracking-wider">
                        {val.enTitle}
                      </span>
                      <h4 className="text-xl font-bold text-slate-900 mt-1">{val.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 오시는길 & 진료안내 */}
        {activeTab === "location" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Hours & Contact Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">외래 및 재활 진료시간</h3>
                    <p className="text-xs text-slate-500">환자 편의를 위해 평일 야간 및 토요일 진료를 운영합니다.</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs divide-y divide-slate-100">
                  <div className="pt-2 flex justify-between items-center">
                    <span className="font-bold text-slate-700">평일 (월~금) 외래진료</span>
                    <span className="font-mono font-bold text-slate-900">{hospitalInfo.weekdayHours}</span>
                  </div>
                  <div className="pt-2 flex justify-between items-center text-cyan-700 font-bold bg-cyan-50/50 p-2 rounded-xl">
                    <span>도수·운동재활센터 평일 야간</span>
                    <span className="font-mono">평일 저녁 20:00까지 연장 운영</span>
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <span className="font-bold text-slate-700">토요일 진료</span>
                    <span className="font-mono font-bold text-slate-900">{hospitalInfo.saturdayHours} (점심시간 없음)</span>
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <span className="font-bold text-slate-700">점심시간</span>
                    <span className="font-mono text-slate-600">{hospitalInfo.lunchHours}</span>
                  </div>
                  <div className="pt-2 flex justify-between items-center text-rose-600">
                    <span className="font-bold">일요일 및 법정 공휴일</span>
                    <span className="font-semibold">{hospitalInfo.sundayHolidayHours}</span>
                  </div>
                </div>

                <button
                  onClick={openAppointmentModal}
                  className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>간편 빠른예약 접수하기</span>
                </button>
              </div>

              {/* Transportation details */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">찾아오시는 길 & 주차 안내</h3>
                    <p className="text-xs text-slate-500">{hospitalInfo.footerAddress}</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-cyan-800">
                      <Train className="w-4 h-4 text-cyan-600" />
                      <span>지하철 이용 시</span>
                    </div>
                    <p className="text-slate-600 pl-6 leading-relaxed">
                      <strong>2호선 / 신분당선 강남역 9번 출구</strong> 직진 100m (도보 1분거리, 서초대로 방향 삼성G의료타워 1F~9F 전층)
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-blue-800">
                      <Car className="w-4 h-4 text-blue-600" />
                      <span>자가용 & 무료 발렛 파킹</span>
                    </div>
                    <p className="text-slate-600 pl-6 leading-relaxed">
                      네비게이션 <strong>'삼성G정형외과'</strong> 또는 <strong>'서초구 서초대로 397'</strong> 검색. 건물 전면 발렛 전용 부스에서 <strong>내원 환자 무료 대행 주차</strong>를 제공합니다.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-slate-800">
                      <Phone className="w-4 h-4 text-slate-600" />
                      <span>대표 문의 전화</span>
                    </div>
                    <p className="text-slate-600 pl-6 leading-relaxed font-bold text-slate-900">
                      대표 예약: <a href="tel:1588-7520" className="text-cyan-600 hover:underline">1588-7520</a> / 응급실: 02-530-8119
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 의료진 & 치료사 안내 */}
        {activeTab === "staff" && (
          <div className="space-y-12 animate-fadeIn">
            {/* Section 1: 전문의 의료진 */}
            <div>
              <div className="border-b border-slate-200 pb-4 mb-8">
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
                  DOCTORS
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">전문의 의료진 소개</h3>
                <p className="text-xs text-slate-500 mt-1">
                  대학병원 교수 출신 정형외과, 신경외과, 영상의학과 전문의가 1:1 책임 진료합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                        <img src={doc.imageUrl} alt={doc.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6 space-y-3">
                        <div>
                          <span className="text-[11px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">
                            {doc.title}
                          </span>
                          <h4 className="text-xl font-bold text-slate-900 mt-1">{doc.name} 원장</h4>
                          <p className="text-xs text-slate-500 font-medium">{doc.specialty}</p>
                        </div>
                        <ul className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                          {doc.history.slice(0, 4).map((h, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: 전담 치료사 안내 */}
            <div className="pt-8">
              <div className="border-b border-slate-200 pb-4 mb-8">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  REHABILITATION SPECIALISTS
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">전담 도수 & 물리치료사 안내</h3>
                <p className="text-xs text-slate-500 mt-1">
                  국제 도수치료 및 스포츠의학 인증 자격을 보유한 1:1 전담 치료사 팀이 통증 회복을 함께합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {initialTherapists.map((th) => (
                  <div
                    key={th.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                        <img src={th.imageUrl} alt={th.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6 space-y-3">
                        <div>
                          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                            {th.title}
                          </span>
                          <h4 className="text-xl font-bold text-slate-900 mt-1">{th.name} 치료사</h4>
                          <p className="text-xs text-slate-500 font-medium">{th.specialty}</p>
                        </div>
                        <ul className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                          {th.history.map((h, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 둘러보기 (원내 시설 가상 투어) */}
        {activeTab === "tour" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
                VIRTUAL TOUR
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">삼성G의료타워 둘러보기</h3>
              <p className="text-xs text-slate-500 mt-1">
                환자의 동선과 심리적 안정을 최우선으로 설계한 쾌적한 원내 공간을 소개합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitalTourFacilities.map((fac, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group"
                >
                  <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                    <img
                      src={fac.imageUrl}
                      alt={fac.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-slate-900 text-base">{fac.title}</h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{fac.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: 의료장비 안내 */}
        {activeTab === "equipment" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
                ADVANCED MEDICAL EQUIPMENT
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">첨단 의료장비 시스템</h3>
              <p className="text-xs text-slate-500 mt-1">
                정확한 진단과 안전한 최소침습 치료를 위한 대학병원급 정밀 의료 장비를 보유하고 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {equipments.map((eq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                      <img src={eq.img} alt={eq.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 space-y-3">
                      <h4 className="font-bold text-slate-900 text-base">{eq.name}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{eq.desc}</p>
                      <div className="pt-2 space-y-1">
                        {eq.specs.map((sp, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                            <span>{sp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
