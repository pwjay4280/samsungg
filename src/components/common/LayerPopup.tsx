import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ExternalLink } from "lucide-react";
import { useHospital } from "../../context/HospitalContext";

export const LayerPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState<any>(null);

  useEffect(() => {
    // Check local storage for dismiss timestamp
    const dismissedAt = localStorage.getItem("samsung_g_popup_dismiss");
    if (dismissedAt) {
      const diff = Date.now() - parseInt(dismissedAt, 10);
      if (diff < 24 * 60 * 60 * 1000) {
        return; // dismissed within 24 hours
      }
    }

    fetch("/api/popups")
      .then((res) => res.json())
      .then((list) => {
        if (list && list.length > 0 && list[0].isActive) {
          setPopupData(list[0]);
          setIsOpen(true);
        }
      })
      .catch(() => {});
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDismissToday = () => {
    localStorage.setItem("samsung_g_popup_dismiss", Date.now().toString());
    setIsOpen(false);
  };

  if (!isOpen || !popupData) return null;

  return (
    <div className="fixed top-24 left-6 z-50 max-w-xs sm:max-w-sm w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-left-4 duration-300">
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={popupData.imageUrl}
          alt={popupData.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 bg-white">
        <h4 className="font-bold text-sm text-slate-900 leading-snug">
          {popupData.title}
        </h4>
        {popupData.linkUrl && (
          <Link
            to={popupData.linkUrl}
            onClick={handleClose}
            className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-cyan-600 hover:text-cyan-700"
          >
            <span>자세히 보기</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>

      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <button
          onClick={handleDismissToday}
          className="hover:text-slate-800 transition cursor-pointer"
        >
          오늘 하루 보지 않기
        </button>
        <button
          onClick={handleClose}
          className="font-semibold text-slate-700 hover:text-slate-950 cursor-pointer"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
