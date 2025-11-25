import { useState } from 'react';
import { X, Package, Lock, Unlock } from 'lucide-react';

interface MemoryBoxPopupProps {
  onClose: () => void;
}

interface TimeCapsuleItem {
  id: number;
  title: string;
  date: string;
  unlockDate: string;
  isLocked: boolean;
  content?: string;
}

export function MemoryBoxPopup({ onClose }: MemoryBoxPopupProps) {
  const [items] = useState<TimeCapsuleItem[]>([
    {
      id: 1,
      title: "2020년의 나에게",
      date: "2015.01.01",
      unlockDate: "2020.01.01",
      isLocked: false,
      content: "5년 후의 나는 어떤 모습일까? 꿈을 이루고 행복하게 살고 있기를 바란다. 포기하지 말고 계속 도전하자!"
    },
    {
      id: 2,
      title: "고등학교 졸업 추억",
      date: "2016.02.14",
      unlockDate: "2021.02.14",
      isLocked: false,
      content: "함께 웃고 울었던 친구들, 열정적으로 가르쳐주신 선생님들. 그 시절의 추억이 평생 나의 보물이 될 것이다."
    },
    {
      id: 3,
      title: "첫 직장 입사일",
      date: "2018.03.02",
      unlockDate: "2023.03.02",
      isLocked: false,
      content: "설렘과 두려움이 공존했던 첫 출근날. 많이 배우고 성장할 수 있는 시간이 되기를 기대한다."
    },
    {
      id: 4,
      title: "2025년의 꿈",
      date: "2020.12.31",
      unlockDate: "2025.12.31",
      isLocked: true,
      content: ""
    },
    {
      id: 5,
      title: "30살의 나에게",
      date: "2023.06.15",
      unlockDate: "2030.06.15",
      isLocked: true,
      content: ""
    },
  ]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-[600px] max-h-[700px] bg-[#ebe1d1] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#d4af37] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <Package size={20} className="pixel-icon" />
            <span className="text-[18px]">📦 추억 상자</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-[#b8951f] p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#ebe1d1]">
          {items.map((item) => (
            <div
              key={item.id}
              className={`pixel-border p-4 shadow-md ${
                item.isLocked ? 'bg-[#c4b49a] opacity-75' : 'bg-white'
              }`}
            >
              <div className="flex items-start justify-between mb-3 pb-3 border-b-2 border-[#e0d5c7]">
                <div className="flex items-center gap-2">
                  {item.isLocked ? (
                    <Lock size={18} className="text-[#8b7355]" />
                  ) : (
                    <Unlock size={18} className="text-[#d4af37]" />
                  )}
                  <span className="text-[16px] text-black font-semibold">
                    {item.title}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[12px] text-[#8b7355]">
                    작성: {item.date}
                  </span>
                  <span className="text-[11px] text-[#a89378]">
                    {item.isLocked ? `🔒 ${item.unlockDate}에 열림` : `🔓 열림`}
                  </span>
                </div>
              </div>

              {item.isLocked ? (
                <div className="text-center py-6 text-[#8b7355]">
                  <Lock size={32} className="mx-auto mb-3 opacity-50" />
                  <p className="text-[14px]">아직 열 수 없는 타임캡슐입니다</p>
                  <p className="text-[12px] mt-2">
                    {item.unlockDate}에 자동으로 열립니다
                  </p>
                </div>
              ) : (
                <div className="text-[14px] text-[#3a3a3a] leading-relaxed whitespace-pre-wrap">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-[#c4b49a] border-t-4 border-black p-4">
          <div className="flex items-center gap-2 text-[#3a3a3a] text-[12px]">
            <Package size={16} />
            <span>
              총 {items.length}개의 추억 | 열린 추억 {items.filter(i => !i.isLocked).length}개 |
              잠긴 추억 {items.filter(i => i.isLocked).length}개
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#d4af37] text-white text-center py-2 text-[12px] border-t-4 border-black">
          소중한 추억을 타임캡슐에 담아두세요
        </div>
      </div>
    </div>
  );
}
