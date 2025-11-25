import { useState } from 'react';
import { X, Eye } from 'lucide-react';

interface TelescopePopupProps {
  onClose: () => void;
}

interface Star {
  id: number;
  x: number;
  y: number;
  connected: boolean;
}

export function TelescopePopup({ onClose }: TelescopePopupProps) {
  const [stars, setStars] = useState<Star[]>([
    { id: 1, x: 30, y: 25, connected: false },
    { id: 2, x: 45, y: 20, connected: false },
    { id: 3, x: 60, y: 30, connected: false },
    { id: 4, x: 55, y: 45, connected: false },
    { id: 5, x: 40, y: 50, connected: false },
    { id: 6, x: 25, y: 40, connected: false },
  ]);
  const [connectionOrder, setConnectionOrder] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [coinsEarned, setCoinsEarned] = useState(0);

  const handleStarClick = (starId: number) => {
    if (isComplete) return;

    const star = stars.find(s => s.id === starId);
    if (!star || star.connected) return;

    const newStars = stars.map(s =>
      s.id === starId ? { ...s, connected: true } : s
    );
    setStars(newStars);

    const newOrder = [...connectionOrder, starId];
    setConnectionOrder(newOrder);

    // Check if all stars are connected
    if (newStars.every(s => s.connected)) {
      setIsComplete(true);
      const coins = Math.floor(Math.random() * 50) + 50; // 50-100 coins
      setCoinsEarned(coins);
    }
  };

  const handleReset = () => {
    setStars(stars.map(s => ({ ...s, connected: false })));
    setConnectionOrder([]);
    setIsComplete(false);
    setCoinsEarned(0);
  };

  const getStarPosition = (starId: number) => {
    const star = stars.find(s => s.id === starId);
    return star ? { x: star.x, y: star.y } : { x: 0, y: 0 };
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70" onClick={onClose}>
      <div
        className="w-[700px] max-h-[700px] bg-[#0a1628] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1a1a3e] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <Eye size={20} className="pixel-icon" />
            <span className="text-[18px]">🔭 별자리 관측</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-[#2a2a4e] p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Viewfinder Area */}
        <div className="flex-1 p-6 bg-[#0a1628] overflow-hidden">
          {/* Circular Viewfinder */}
          <div className="relative mx-auto" style={{ width: '500px', height: '500px' }}>
            {/* Outer Circle */}
            <div
              className="absolute inset-0 rounded-full border-4 border-[#2a2a4e]"
              style={{
                background: 'radial-gradient(circle, #1a1040 0%, #0a0820 100%)',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
              }}
            >
              {/* Crosshair */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#3a3a5e] opacity-30" />
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#3a3a5e] opacity-30" />

              {/* Background Stars */}
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={`bg-star-${i}`}
                  className="absolute rounded-full bg-white star-twinkle"
                  style={{
                    left: `${Math.random() * 90 + 5}%`,
                    top: `${Math.random() * 90 + 5}%`,
                    width: `${Math.random() * 2 + 1}px`,
                    height: `${Math.random() * 2 + 1}px`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                />
              ))}

              {/* Constellation Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {connectionOrder.map((starId, index) => {
                  if (index === 0) return null;
                  const prevStar = getStarPosition(connectionOrder[index - 1]);
                  const currentStar = getStarPosition(starId);
                  return (
                    <line
                      key={`line-${index}`}
                      x1={`${prevStar.x}%`}
                      y1={`${prevStar.y}%`}
                      x2={`${currentStar.x}%`}
                      y2={`${currentStar.y}%`}
                      stroke="#4a9eff"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                  );
                })}
              </svg>

              {/* Interactive Stars */}
              {stars.map((star) => (
                <button
                  key={star.id}
                  onClick={() => handleStarClick(star.id)}
                  disabled={isComplete}
                  className={`absolute w-4 h-4 rounded-full transition-all ${
                    star.connected
                      ? 'bg-[#4a9eff] scale-125 shadow-lg'
                      : 'bg-white hover:bg-yellow-200 hover:scale-110'
                  } ${isComplete ? 'cursor-default' : 'cursor-pointer'}`}
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: star.connected
                      ? '0 0 10px #4a9eff, 0 0 20px #4a9eff'
                      : '0 0 5px white',
                  }}
                  aria-label={`별 ${star.id}`}
                />
              ))}

              {/* Completion Message */}
              {isComplete && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/90 text-white px-8 py-6 pixel-border text-center">
                    <div className="text-[24px] mb-2">✨ 별자리 발견! ✨</div>
                    <div className="text-[16px] mb-3">헥사곤 별자리를 완성했습니다!</div>
                    <div className="text-[20px] text-yellow-300">💰 +{coinsEarned} 코인</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions and Controls */}
        <div className="bg-[#1a1a2e] text-white px-4 py-3 border-t-4 border-black">
          <div className="flex items-center justify-between">
            <div className="text-[14px]">
              {isComplete ? (
                <span>별자리를 완성했습니다! 다시 관측하려면 초기화를 누르세요.</span>
              ) : (
                <span>별을 클릭하여 연결하세요 ({connectionOrder.length}/{stars.length})</span>
              )}
            </div>
            {isComplete && (
              <button
                onClick={handleReset}
                className="pixel-button bg-[#4a9eff] hover:bg-[#3a8eef] text-white px-4 py-2 text-[14px]"
              >
                초기화
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#2a2a4e] text-white text-center py-2 text-[12px] border-t-4 border-black">
          밤하늘의 신비를 탐험하세요
        </div>
      </div>
    </div>
  );
}
