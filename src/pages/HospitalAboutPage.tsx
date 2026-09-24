import React from "react";
import {
  Building2,
  Award,
  ShieldCheck,
  Activity,
  HeartPulse,
  MapPin,
  Car,
  Train,
  Phone,
  Clock,
} from "lucide-react";
import { useHospital } from "../context/HospitalContext";

export const HospitalAboutPage: React.FC = () => {
  const { hospitalInfo } = useHospital();

  const equipments = [
    {
      name: "지멘스 마그네톰 비다 3.0T MRI",
      desc: "대학병원급 초고해상도 자기공명영상으로 미세 신경, 디스크 탈출, 연골 손상을 오차 없이 조기 진단",
      img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "마코(Mako) 로봇 인공관절 시스템",
      desc: "수술 전 3차원 CT 시뮬레이션과 실시간 로봇 암 안전 제어로 0.1mm 오차 없는 환자 맞춤형 무릎 치환술",
      img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "독일 자이스(Zeiss) 4K 수술 현미경",
      desc: "수술 시야를 20배 이상 확대하여 신경 및 미세 혈관을 보호하며 안전한 무수혈 미세 수술 집도",
      img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "독일 센타우르(Centaur) 3D 척추안정화기",
      desc: "컴퓨터 제어 하에 360도 공간 회전 운동을 통해 척추 심부 코어 근육을 선택적으로 강화",
      img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const floors = [
    { floor: "9F", name: "재활의학센터 & 옥상 힐링정원", desc: "1인 도수치료실, 독일 슬링 치료실, 환자 휴게 정원" },
    { floor: "8F", name: "물리치료실 & 체외충격파 클리닉", desc: "방사형/초점형 체외충격파, 척추 견인치료실, 고주파 온열실" },
    { floor: "6F ~ 7F", name: "입원병동 (VIP병실, 1인실, 4인실)", desc: "전 병상 개인 스마트 TV 완비, 간호간병통합서비스 안심 케어" },
    { floor: "5F", name: "무균 청정 수술센터 & 회복실", desc: "헤파필터 0.3μm 양압 클린룸 수술실 4실, 마코 로봇수술실" },
    { floor: "3F", name: "영상의학센터 & 종합검진센터", desc: "3.0T MRI실, 128ch CT실, 디지털 X-ray, 골밀도(BMD)실" },
    { floor: "2F", name: "외래 진료센터 (척추·관절)", desc: "정형외과/신경외과 전문의 진료실, 초음파 유도 주사실" },
    { floor: "1F", name: "로비 & 스마트 원스톱 접수·수납", desc: "안내데스크, 원무과, 제증명 발급 창구, 카페테리아" },
    { floor: "B1 ~ B2", name: "전용 주차장 & 발렛파킹 라운지", desc: "내원 환자 전용 자주식 무료 주차장 및 발렛 대행" },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20">
        {/* 1. Hospital Vision & Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            ABOUT SAMSUNG G HOSPITAL
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            환자의 고통에 공감하고,<br />
            정직하고 바른 의학을 실천합니다
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal pt-2">
            삼성G정형외과은 과잉 진료를 철저히 배제하고, 수술 전 비수술 치료를 우선하며, 수술이 불가피한 경우 정상 근육과 뼈를 최대한 보존하는 0.5cm 미세침습 척추내시경 및 정밀 로봇 관절 수술을 전문으로 합니다.
          </p>
        </div>

        {/* 2. Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">비수술 우선 원칙</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              정확한 3.0T MRI 진단을 통해 수술이 필요하지 않은 90% 이상의 환자에게 체계적인 비수술 치료 플랜을 제공합니다.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Activity className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">최첨단 정밀 최소침습</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              0.5cm 미세 절개 양방향 내시경과 0.1mm 정밀 마코 로봇 수술로 통증과 출혈을 최소화하고 빠른 일상 복귀를 돕습니다.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <HeartPulse className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">1:1 책임 전담제</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              상담부터 정밀 진단, 수술 집도, 수술 후 재활까지 대리 수술 없는 전문의 1:1 실명 책임 진료를 약속합니다.
            </p>
          </div>
        </div>

        {/* 3. Advanced Equipment Showcase */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              STATE-OF-THE-ART TECHNOLOGY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              대학병원급 첨단 의료 장비 시스템
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipments.map((eq, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img src={eq.img} alt={eq.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-slate-900 text-sm">{eq.name}</h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{eq.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Floor-by-Floor Directory */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-12">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2.5 py-0.5 rounded">
              FLOOR DIRECTORY
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">
              삼성G의료타워 층별 안내
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              환자의 동선을 최소화한 스마트 의료 빌딩 구조로 쾌적한 원내 환경을 제공합니다.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {floors.map((fl, i) => (
              <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-4">
                  <span className="w-14 text-base font-black text-cyan-700 bg-cyan-50 py-1 rounded-xl text-center">
                    {fl.floor}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">{fl.name}</span>
                </div>
                <span className="text-xs text-slate-500 sm:text-right">{fl.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Directions & Location */}
        <div id="location" className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-800">
              LOCATION & DIRECTIONS
            </span>
            <h2 className="text-2xl font-black text-white mt-2">오시는 길 & 주차 안내</h2>
            <p className="text-xs text-slate-400 mt-1">
              강남역 9번 출구에서 100m 직진, 삼성G의료타워 전층
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Train className="w-5 h-5" />
                <span>지하철 이용 시</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>2호선 & 신분당선 강남역 9번 출구</strong>로 나오셔서 서초대로 방향으로 도보 1분(약 100m) 직진하시면 우측 삼성G의료타워 입구가 위치해 있습니다.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Car className="w-5 h-5" />
                <span>자가용 & 무료 발렛</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                네비게이션에 <strong>'삼성G정형외과'</strong> 또는 <strong>'서초대로 397'</strong>을 검색하세요. 건물 전면 발렛 부스에서 무료 대행 주차를 제공합니다.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <Clock className="w-5 h-5" />
                <span>진료 및 면회 시간</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                평일 09:00~18:00 (도수 야간 20:00) / 토요일 09:00~14:00. 입원 환자 면회는 감염 예방을 위해 지정된 시간에만 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
