import React, { useState } from "react";
import { Image as ImageIcon, Check, X } from "lucide-react";
import { useHospital } from "../../context/HospitalContext";

interface EditableImageProps {
  id: string;
  defaultSrc: string;
  alt: string;
  className?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  id,
  defaultSrc,
  alt,
  className = "",
}) => {
  const { isCmsMode, getInlineContent, updateInlineContent } = useHospital();
  const currentSrc = getInlineContent(id, defaultSrc);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlInput, setUrlInput] = useState(currentSrc);

  if (!isCmsMode) {
    return <img src={currentSrc} alt={alt} className={className} />;
  }

  const handleSave = () => {
    if (urlInput.trim()) {
      updateInlineContent(id, urlInput.trim());
    }
    setIsModalOpen(false);
  };

  return (
    <div className="relative group inline-block">
      <img
        src={currentSrc}
        alt={alt}
        className={`${className} ring-2 ring-cyan-400 ring-dashed hover:opacity-90 transition cursor-pointer`}
        onClick={() => setIsModalOpen(true)}
      />
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-2 right-2 bg-cyan-600 text-white p-1.5 rounded-full shadow-lg opacity-90 group-hover:opacity-100 transition"
        title="이미지 URL 교체 (CMS)"
      >
        <ImageIcon className="w-4 h-4" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-2">이미지 URL 변경 (인라인 CMS)</h3>
            <p className="text-xs text-slate-500 mb-4">
              새로운 이미지 주소(웹 URL)를 입력하면 즉시 교체 저장됩니다.
            </p>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              placeholder="https://..."
            />
            {urlInput && (
              <div className="mb-4 aspect-video rounded-lg overflow-hidden bg-slate-100 border">
                <img
                  src={urlInput}
                  alt="미리보기"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" /> 적용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
