import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  FileText,
  Calendar,
  Phone,
  ChevronDown,
  ChevronUp,
  UserCheck,
  ShieldCheck,
  Award,
  ArrowRight,
} from "lucide-react";
import { useHospital } from "../context/HospitalContext";
import { useLanguage } from "../context/LanguageContext";
import { EditableText } from "../components/common/EditableText";
import { EditableImage } from "../components/common/EditableImage";

export const CenterSubpage: React.FC = () => {
  const { subpages, openAppointmentModal } = useHospital();
  const { language } = useLanguage();
  const location = useLocation();
  const navPrefix = language === "en" ? "/en" : "";

  // Normalize path
  const currentPath = location.pathname.startsWith("/en")
    ? location.pathname.replace(/^\/en/, "") || "/"
    : location.pathname;

  const subpage =
    subpages.find((sp) => sp.path === currentPath) ||
    subpages.find((sp) => currentPath.startsWith(sp.path)) ||
    subpages[0];

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* 1. Subpage Hero Header */}
      <section className="relative bg-slate-950 text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <EditableImage
            id={`sub-hero-img-${subpage.id}`}
            defaultSrc={
              subpage.images.hero ||
              "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
            }
            alt={subpage.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-400/30">
              <span>{subpage.categoryName}</span>
              <span>•</span>
              <span>삼성G정형외과 특화센터</span>
            </div>

            <EditableText
              id={`sub-title-${subpage.id}`}
              as="h1"
              defaultText={subpage.title}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight block text-white"
            />

            {subpage.subtitle && (
              <EditableText
                id={`sub-subtitle-${subpage.id}`}
                as="p"
                defaultText={subpage.subtitle}
                className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed block"
              />
            )}

            {subpage.authorName && (
              <div className="flex items-center gap-3 pt-2 text-xs text-cyan-300 font-semibold">
                <UserCheck className="w-4 h-4" />
                <span>
                  의학 감수 및 전담 집도: <strong>{subpage.authorName}</strong> ({subpage.authorTitle})
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Intro Description & Symptom Checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Disease Description & Symptoms */}
          <div className="lg:col-span-8 space-y-12">
            {/* Intro */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                치료법 개요 및 원리
              </h2>
              <EditableText
                id={`sub-intro-${subpage.id}`}
                as="p"
                defaultText={subpage.introDescription}
                className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal block"
              />
            </div>

            {/* Symptoms Checklist */}
            {subpage.symptoms && subpage.symptoms.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                    !
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">이런 증상이 있다면 치료 대상입니다</h3>
                    <p className="text-xs text-slate-500">자가 진단 체크리스트를 확인해 보세요</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {subpage.symptoms.map((symptom, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-slate-800 text-sm font-medium"
                    >
                      <CheckCircle className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Target Candidates */}
            {subpage.targets && subpage.targets.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900">치료 적응증 및 권장 대상</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {subpage.targets.map((tgt, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <h4 className="font-bold text-slate-900 text-sm text-cyan-700">{tgt.title}</h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{tgt.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Advantages */}
            {subpage.advantages && subpage.advantages.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900">삼성G정형외과 특화 치료 장점</h3>
                <div className="space-y-4">
                  {subpage.advantages.map((adv, i) => (
                    <div key={i} className="p-5 bg-cyan-50/50 rounded-2xl border border-cyan-100">
                      <h4 className="font-bold text-cyan-900 text-base mb-2">{adv.title}</h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                        {adv.items.map((it, j) => (
                          <li key={j} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 shrink-0"></span>
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comparison Table */}
            {subpage.comparisons && subpage.comparisons.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900">
                  타 병원 일반 치료 vs 삼성G정형외과 비교
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="py-3 px-4 text-slate-400 font-bold w-1/3">비교 항목</th>
                        <th className="py-3 px-4 text-cyan-700 font-bold bg-cyan-50/80 rounded-t-lg w-1/3">
                          삼성G정형외과 치료
                        </th>
                        <th className="py-3 px-4 text-slate-500 font-bold w-1/3">기존 일반 절개술</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {subpage.comparisons.map((c, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-bold text-slate-700">{c.criteria}</td>
                          <td className="py-3 px-4 font-bold text-cyan-800 bg-cyan-50/40">
                            {c.target}
                          </td>
                          <td className="py-3 px-4 text-slate-500">{c.normal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Treatment Steps */}
            {subpage.treatments && subpage.treatments.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900">정밀 치료 단계</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {subpage.treatments.map((step, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="text-xs font-bold text-cyan-600 mb-1">STEP 0{i + 1}</div>
                      <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Clinical Process */}
            {subpage.processes && subpage.processes.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900">진료 및 시술 프로세스</h3>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {subpage.processes.map((proc, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center"
                    >
                      <div className="w-6 h-6 rounded-full bg-cyan-600 text-white font-bold text-[11px] flex items-center justify-center mx-auto mb-2">
                        {i + 1}
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs">{proc.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-1">{proc.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Postcare & Risks */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900">시술 후 주의사항 및 부작용 고지</h3>
              <div className="space-y-3">
                {subpage.postcare.map((item, i) => (
                  <div key={i} className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-xs">
                    <strong className="text-emerald-900 font-bold block">{item.title}</strong>
                    <span className="text-slate-600 mt-0.5 block">{item.description}</span>
                  </div>
                ))}
                {subpage.risks?.map((risk, i) => (
                  <div key={i} className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 text-xs">
                    <strong className="text-amber-900 font-bold block">{risk.title}</strong>
                    <span className="text-slate-600 mt-0.5 block">{risk.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            {subpage.faqs && subpage.faqs.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900">자주 묻는 질문 (FAQ)</h3>
                <div className="space-y-3">
                  {subpage.faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="border border-slate-100 rounded-2xl overflow-hidden transition"
                    >
                      <button
                        onClick={() => toggleFaq(i)}
                        className="w-full p-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between hover:bg-slate-50 transition"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-cyan-600 font-black">Q.</span>
                          <span>{faq.question}</span>
                        </span>
                        {expandedFaq === i ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                      {expandedFaq === i && (
                        <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          <strong className="text-slate-800 block mb-1">A. 전문의 답변:</strong>
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Academic References */}
            {subpage.references && (
              <div className="p-4 bg-slate-100 rounded-2xl text-[11px] text-slate-500 leading-normal">
                <strong>학술 근거 및 문헌 출처:</strong> {subpage.references}
              </div>
            )}
          </div>

          {/* Right Sticky Sidebar: Quick Appointment & Doctor Profile */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            {/* Quick booking card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg shadow-cyan-900/5 space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded">
                  빠른 전문의 상담
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {subpage.title} 진료 예약
                </h3>
                <p className="text-xs text-slate-500">
                  대기 시간 없이 원하는 날짜와 시간에 1:1 진료를 예약하세요.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-600" />
                  <span>3.0T MRI 당일 판독 협진</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-600" />
                  <span>1박 2일 단기 입원 시스템</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-600" />
                  <span>실손보험 원스톱 서류 발급</span>
                </div>
              </div>

              <button
                onClick={openAppointmentModal}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>간편 빠른예약 신청</span>
              </button>

              <div className="pt-2 border-t border-slate-100 text-center">
                <a
                  href="tel:1588-7520"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-cyan-600"
                >
                  <Phone className="w-4 h-4 text-cyan-600" />
                  <span>대표전화: 1588-7520</span>
                </a>
              </div>
            </div>

            {/* Other centers quick menu */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
              <h4 className="font-bold text-sm text-slate-900">다른 특화센터 둘러보기</h4>
              <div className="space-y-1.5">
                {subpages
                  .filter((s) => s.id !== subpage.id)
                  .map((s) => (
                    <Link
                      key={s.id}
                      to={`${navPrefix}${s.path}`}
                      className="block p-2.5 rounded-xl hover:bg-slate-50 transition text-xs font-semibold text-slate-700 hover:text-cyan-600"
                    >
                      {s.title}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
