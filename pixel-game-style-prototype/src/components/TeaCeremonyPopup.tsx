import { useState, useRef, useEffect } from 'react';
import { X, Clock } from 'lucide-react';

interface TeaCeremonyPopupProps {
  onClose: () => void;
}

interface Tea {
  id: string;
  name: string;
  category: 'green' | 'black' | 'oolong' | 'herbal';
  brewTime: number; // seconds
  unlocked: boolean;
  emoji: string;
}

export function TeaCeremonyPopup({ onClose }: TeaCeremonyPopupProps) {
  const [position, setPosition] = useState({ x: window.innerWidth - 520, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentTea, setCurrentTea] = useState<Tea | null>(null);
  const [isBrewing, setIsBrewing] = useState(false);
  const [brewTimer, setBrewTimer] = useState(0);
  const popupRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const teaCollection: Tea[] = [
    { id: '1', name: '녹차', category: 'green', brewTime: 30, unlocked: true, emoji: '🍵' },
    { id: '2', name: '홍차', category: 'black', brewTime: 30, unlocked: true, emoji: '☕' },
    { id: '3', name: '우롱차', category: 'oolong', brewTime: 30, unlocked: true, emoji: '🍂' },
    { id: '4', name: '캐모마일', category: 'herbal', brewTime: 30, unlocked: false, emoji: '🌼' },
    { id: '5', name: '페퍼민트', category: 'herbal', brewTime: 30, unlocked: false, emoji: '🌿' },
    { id: '6', name: '자스민차', category: 'green', brewTime: 30, unlocked: false, emoji: '🌸' },
  ];

  const unlockedCount = teaCollection.filter(tea => tea.unlocked).length;
  const totalCount = teaCollection.length;
  const collectionRate = Math.round((unlockedCount / totalCount) * 100);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.no-drag')) return;

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      const maxX = window.innerWidth - 500;
      const maxY = window.innerHeight - 600;

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  useEffect(() => {
    if (isBrewing && brewTimer > 0) {
      timerRef.current = setTimeout(() => {
        setBrewTimer(brewTimer - 1);
      }, 1000);
    } else if (brewTimer === 0 && isBrewing) {
      setIsBrewing(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isBrewing, brewTimer]);

  const handleBrewTea = () => {
    if (currentTea && !isBrewing) {
      setIsBrewing(true);
      setBrewTimer(currentTea.brewTime);
    }
  };

  const handleSelectTea = (tea: Tea) => {
    if (tea.unlocked) {
      setCurrentTea(tea);
      setIsBrewing(false);
      setBrewTimer(0);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'green': return '#27ae60';
      case 'black': return '#8b4513';
      case 'oolong': return '#d4af37';
      case 'herbal': return '#9b59b6';
      default: return '#8b7355';
    }
  };

  return (
    <div
      ref={popupRef}
      className={`fixed z-50 w-[500px] bg-[#d4c4a8] pixel-border shadow-2xl ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className="bg-[#567d46] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
        <div className="flex items-center gap-2">
          <span className="text-[18px] font-bold">🍵 다도 체험</span>
        </div>
        <button
          onClick={onClose}
          className="no-drag hover:bg-red-500 p-1 transition-colors pixel-border-small"
          aria-label="닫기"
        >
          <X size={18} />
        </button>
      </div>

      {/* Current Tea Display */}
      <div className="bg-[#3a3a3a] text-white p-4 border-b-4 border-black">
        <div className="text-[14px] mb-1 font-bold">☕ 현재 우려내는 차:</div>
        {currentTea ? (
          <div className="flex items-center gap-3">
            <span className="text-[32px]">{currentTea.emoji}</span>
            <div>
              <div className="text-[16px] font-bold">{currentTea.name}</div>
              <div className="text-[12px] text-gray-300">
                {isBrewing ? `우리는 중... ${brewTimer}초 남음` : '준비 완료'}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-[14px] text-gray-300">아래에서 차를 선택하세요</div>
        )}
      </div>

      {/* Brew Button */}
      <div className="p-4 bg-[#c4b49a] border-b-4 border-black">
        <button
          onClick={handleBrewTea}
          disabled={!currentTea || isBrewing}
          className={`no-drag w-full pixel-button py-3 text-[16px] font-bold flex items-center justify-center gap-2 ${
            !currentTea || isBrewing
              ? 'bg-gray-400 cursor-not-allowed opacity-50'
              : 'bg-[#567d46] hover:bg-[#456334] text-white'
          }`}
        >
          <Clock size={20} />
          {isBrewing ? '우리는 중...' : '차 우리기 시작 (30초)'}
        </button>
      </div>

      {/* Collection Rate */}
      <div className="p-3 bg-[#a89378] border-b-2 border-black flex items-center justify-between">
        <span className="text-[14px] text-white font-bold">📊 수집률</span>
        <span className="text-[14px] text-white font-bold">
          {unlockedCount}/{totalCount} ({collectionRate}%)
        </span>
      </div>

      {/* Tea Collection Grid */}
      <div className="bg-[#ebe1d1] max-h-[300px] overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {teaCollection.map((tea) => (
            <button
              key={tea.id}
              onClick={() => handleSelectTea(tea)}
              disabled={!tea.unlocked}
              className={`no-drag pixel-border-small p-3 transition-all ${
                tea.unlocked
                  ? currentTea?.id === tea.id
                    ? 'bg-[#faed96] border-4 border-[#567d46]'
                    : 'bg-white hover:bg-[#f5f5f5]'
                  : 'bg-gray-300 cursor-not-allowed opacity-50'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-[32px]">{tea.unlocked ? tea.emoji : '🔒'}</span>
                <div className="text-center">
                  <div className="text-[12px] font-bold">{tea.unlocked ? tea.name : '???'}</div>
                  {tea.unlocked && (
                    <div
                      className="text-[10px] mt-1 px-2 py-1 rounded"
                      style={{ backgroundColor: getCategoryColor(tea.category), color: 'white' }}
                    >
                      {tea.category === 'green' && '녹차류'}
                      {tea.category === 'black' && '홍차류'}
                      {tea.category === 'oolong' && '우롱차류'}
                      {tea.category === 'herbal' && '허브차류'}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-[#567d46] text-white text-center py-2 text-[12px] border-t-4 border-black">
        다양한 차를 우려보며 수집률을 높이세요
      </div>
    </div>
  );
}
