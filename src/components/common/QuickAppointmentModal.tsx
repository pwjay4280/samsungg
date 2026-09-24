import React, { useState } from "react";
import { X, Calendar, Clock, User, Phone, CheckCircle2, AlertCircle } from "lucide-react";
import { useHospital } from "../../context/HospitalContext";

export const QuickAppointmentModal: React.FC = () => {
  const { isAppointmentModalOpen, closeAppointmentModal, submitQuickAppointment } = useHospital();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("척추클리닉");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("오전 10시");
  const [symptomDescription, setSymptomDescription] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isAppointmentModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !preferredDate) {
      alert("성명, 연락처, 희망일자를 입력해 주세요.");
      return;
    }
    if (!agreed) {
      alert("개인정보 수집 및 이용에 동의해 주세요.");
      return;
    }

    setIsSubmitting(true);
    await submitQuickAppointment({
      name: name.trim(),
      phone: phone.trim(),
      category,
      preferredDate,
      preferredTime,
      symptomDescription: symptomDescription.trim(),
    });

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setName("");
    setPhone("");
    setSymptomDescription("");
    setIsSuccess(false);
    closeAppointmentModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 sm:p-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">간편 빠른예약이 접수되었습니다</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              <strong>{name}</strong>님, 접수가 정상 완료되었습니다. 전문 상담 코디네이터가 30분 이내에 기재하신 번호(
              {phone})로 전화드려 확정 일정을 안내해 드립니다.
            </p>
            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition"
              >
                확인
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200">
                <Calendar className="w-3.5 h-3.5" />
                삼성G정형외과 간편 진료예약
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                1분 빠른 예약 신청
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                대기 시간 없는 쾌적한 진료를 위해 전문 상담 간호사가 직접 연락드립니다.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    성함 <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="홍길동"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    연락처 <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="010-0000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  진료 희망 부위 / 클리닉
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none bg-white font-medium"
                >
                  <option value="척추클리닉">척추클리닉 (허리디스크, 척추내시경, 협착증)</option>
                  <option value="관절클리닉">관절클리닉 (로봇인공관절, 무릎연골, 어깨관절경)</option>
                  <option value="도수재활클리닉">도수재활클리닉 (1:1 체형교정, 수술 후 재활)</option>
                  <option value="일반정형외과">일반정형외과 / 골절 및 통증</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    희망 예약일 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    희망 시간대
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none bg-white font-medium"
                  >
                    <option value="오전 09:30">오전 09:30</option>
                    <option value="오전 10:30">오전 10:30</option>
                    <option value="오전 11:30">오전 11:30</option>
                    <option value="오후 14:00">오후 14:00</option>
                    <option value="오후 15:30">오후 15:30</option>
                    <option value="오후 16:30">오후 16:30</option>
                    <option value="야간 18:30 (도수/물리)">야간 18:30 (도수/물리치료)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  주요 증상 및 전달사항 (선택)
                </label>
                <textarea
                  rows={2}
                  value={symptomDescription}
                  onChange={(e) => setSymptomDescription(e.target.value)}
                  placeholder="예: 오른쪽 다리가 저리고 오래 걷기 힘듭니다. 타병원 MRI 촬영 경험 있음."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              {/* Privacy agreement */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-600 flex items-start gap-2">
                <input
                  type="checkbox"
                  id="privacy-check"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded text-cyan-600 focus:ring-cyan-500"
                />
                <label htmlFor="privacy-check" className="cursor-pointer leading-tight">
                  [필수] 진료 예약 상담 및 일정 안내를 위한 개인정보(성명, 연락처) 수집 및 이용에 동의합니다.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-600/25 transition cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "접수 처리 중..." : "예약 신청하기"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
