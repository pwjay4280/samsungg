import React, { useState } from "react";
import { Edit2, Check, X } from "lucide-react";
import { useHospital } from "../../context/HospitalContext";

interface EditableTextProps {
  id: string;
  defaultText: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  id,
  defaultText,
  as: Component = "span",
  className = "",
}) => {
  const { isCmsMode, getInlineContent, updateInlineContent } = useHospital();
  const currentText = getInlineContent(id, defaultText);

  const [isEditing, setIsEditing] = useState(false);
  const [val, setVal] = useState(currentText);

  if (!isCmsMode) {
    return <Component className={className}>{currentText}</Component>;
  }

  const handleSave = () => {
    updateInlineContent(id, val);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setVal(currentText);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <span className="inline-flex items-center gap-1.5 p-1 bg-cyan-50 border border-cyan-400 rounded shadow-sm">
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="px-2 py-0.5 text-slate-900 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500"
          autoFocus
        />
        <button
          onClick={handleSave}
          title="저장"
          className="p-1 text-white bg-cyan-600 hover:bg-cyan-700 rounded transition"
        >
          <Check className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleCancel}
          title="취소"
          className="p-1 text-slate-600 hover:bg-slate-200 rounded transition"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </span>
    );
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      title="클릭하여 즉시 인라인 텍스트 수정 (CMS)"
      className={`group relative inline-block cursor-pointer transition ring-1 ring-cyan-400 ring-dashed hover:ring-cyan-600 hover:bg-cyan-50/50 rounded px-1 -mx-1 ${className}`}
    >
      <Component className="inline">{currentText}</Component>
      <span className="opacity-0 group-hover:opacity-100 absolute -top-3 -right-3 bg-cyan-600 text-white rounded-full p-0.5 shadow transition text-[10px]">
        <Edit2 className="w-2.5 h-2.5" />
      </span>
    </span>
  );
};
