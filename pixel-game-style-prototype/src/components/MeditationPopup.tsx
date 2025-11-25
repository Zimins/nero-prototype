import { useState, useRef, useEffect } from 'react';
import { X, Clock, Bookmark, BookmarkCheck } from 'lucide-react';

interface MeditationPopupProps {
  onClose: () => void;
}

interface Quote {
  id: string;
  text: string;
  author: string;
  source: string;
}

export function MeditationPopup({ onClose }: MeditationPopupProps) {
  const [position, setPosition] = useState({ x: 50, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMeditating, setIsMeditating] = useState(false);
  const [meditationTimer, setMeditationTimer] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(5);
  const [savedQuotes, setSavedQuotes] = useState<string[]>([]);
  const popupRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const quotes: Quote[] = [
    {
      id: '1',
      text: '천 리 길도 한 걸음부터',
      author: '노자',
      source: '도덕경',
    },
    {
      id: '2',
      text: '마음이 고요하면 모든 것이 평온하다',
      author: '혜능',
      source: '단경',
    },
    {
      id: '3',
      text: '물은 다투지 않으되 만물을 이롭게 한다',
      author: '노자',
      source: '도덕경',
    },
    {
      id: '4',
      text: '지금 이 순간이 바로 삶이다',
      author: '틱낫한',
      source: '현재의 힘',
    },
  ];

  const [currentQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

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

      const maxX = window.innerWidth - 600;
      const maxY = window.innerHeight - 700;

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
    if (isMeditating && meditationTimer > 0) {
      timerRef.current = setTimeout(() => {
        setMeditationTimer(meditationTimer - 1);
      }, 1000);
    } else if (meditationTimer === 0 && isMeditating) {
      setIsMeditating(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isMeditating, meditationTimer]);

  const handleStartMeditation = (duration: number) => {
    setSelectedDuration(duration);
    setIsMeditating(true);
    setMeditationTimer(duration * 60); // Convert minutes to seconds
  };

  const handleStopMeditation = () => {
    setIsMeditating(false);
    setMeditationTimer(0);
  };

  const handleToggleBookmark = (quoteId: string) => {
    if (savedQuotes.includes(quoteId)) {
      setSavedQuotes(savedQuotes.filter(id => id !== quoteId));
    } else {
      setSavedQuotes([...savedQuotes, quoteId]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={popupRef}
      className={`fixed z-50 w-[600px] bg-[#d4c4a8] pixel-border shadow-2xl ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className="bg-[#8b4513] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
        <div className="flex items-center gap-2">
          <span className="text-[18px] font-bold">📜 명상</span>
        </div>
        <button
          onClick={onClose}
          className="no-drag hover:bg-red-500 p-1 transition-colors pixel-border-small"
          aria-label="닫기"
        >
          <X size={18} />
        </button>
      </div>

      {/* Quote Display */}
      <div className="bg-[#f5e6d3] p-6 border-b-4 border-black">
        <div className="text-center space-y-4">
          <div className="text-[12px] text-[#8b4513] font-bold">오늘의 명언</div>
          <div className="text-[20px] leading-relaxed text-[#2d4739] font-bold px-4">
            "{currentQuote.text}"
          </div>
          <div className="text-[14px] text-[#8b7355]">
            - {currentQuote.author}, {currentQuote.source}
          </div>
          <button
            onClick={() => handleToggleBookmark(currentQuote.id)}
            className="no-drag pixel-button bg-[#8b4513] hover:bg-[#6d3410] text-white px-4 py-2 text-[12px] flex items-center gap-2 mx-auto"
          >
            {savedQuotes.includes(currentQuote.id) ? (
              <>
                <BookmarkCheck size={16} />
                저장됨
              </>
            ) : (
              <>
                <Bookmark size={16} />
                저장하기
              </>
            )}
          </button>
        </div>
      </div>

      {/* Meditation Timer Status */}
      {isMeditating && (
        <div className="bg-[#3a3a3a] text-white p-4 border-b-4 border-black text-center">
          <div className="text-[14px] mb-2">🧘 명상 중...</div>
          <div className="text-[32px] font-bold font-mono">{formatTime(meditationTimer)}</div>
        </div>
      )}

      {/* Meditation Timer Buttons */}
      <div className="p-4 bg-[#c4b49a] border-b-4 border-black">
        <div className="text-[14px] text-[#3a3a3a] mb-3 font-bold">명상 타이머</div>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleStartMeditation(5)}
            disabled={isMeditating}
            className={`no-drag pixel-button py-3 text-[14px] font-bold flex flex-col items-center gap-1 ${
              isMeditating
                ? 'bg-gray-400 cursor-not-allowed opacity-50'
                : 'bg-[#8b4513] hover:bg-[#6d3410] text-white'
            }`}
          >
            <Clock size={20} />
            5분
          </button>
          <button
            onClick={() => handleStartMeditation(10)}
            disabled={isMeditating}
            className={`no-drag pixel-button py-3 text-[14px] font-bold flex flex-col items-center gap-1 ${
              isMeditating
                ? 'bg-gray-400 cursor-not-allowed opacity-50'
                : 'bg-[#8b4513] hover:bg-[#6d3410] text-white'
            }`}
          >
            <Clock size={20} />
            10분
          </button>
          <button
            onClick={() => handleStartMeditation(15)}
            disabled={isMeditating}
            className={`no-drag pixel-button py-3 text-[14px] font-bold flex flex-col items-center gap-1 ${
              isMeditating
                ? 'bg-gray-400 cursor-not-allowed opacity-50'
                : 'bg-[#8b4513] hover:bg-[#6d3410] text-white'
            }`}
          >
            <Clock size={20} />
            15분
          </button>
        </div>
        {isMeditating && (
          <button
            onClick={handleStopMeditation}
            className="no-drag mt-3 w-full pixel-button bg-[#c0392b] hover:bg-[#a93226] text-white py-2 text-[14px] font-bold"
          >
            명상 중지
          </button>
        )}
      </div>

      {/* Saved Quotes */}
      <div className="bg-[#ebe1d1] max-h-[250px] overflow-y-auto">
        <div className="p-3 bg-[#a89378] border-b-2 border-black sticky top-0">
          <span className="text-[14px] text-white font-bold">📚 저장한 명언 ({savedQuotes.length})</span>
        </div>
        <div className="divide-y-2 divide-[#c4b49a]">
          {savedQuotes.length === 0 ? (
            <div className="p-4 text-center text-[14px] text-[#8b7355]">
              저장한 명언이 없습니다
            </div>
          ) : (
            savedQuotes.map((quoteId) => {
              const quote = quotes.find(q => q.id === quoteId);
              if (!quote) return null;
              return (
                <div key={quoteId} className="p-3 bg-white hover:bg-[#f5f5f5] transition-colors">
                  <div className="text-[14px] text-[#2d4739] mb-1">"{quote.text}"</div>
                  <div className="text-[11px] text-[#8b7355] flex items-center justify-between">
                    <span>- {quote.author}</span>
                    <button
                      onClick={() => handleToggleBookmark(quoteId)}
                      className="no-drag text-[#c0392b] hover:text-[#a93226]"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-[#8b4513] text-white text-center py-2 text-[12px] border-t-4 border-black">
        마음의 평화를 찾아보세요
      </div>
    </div>
  );
}
