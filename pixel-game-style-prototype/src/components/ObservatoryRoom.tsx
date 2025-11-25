import { useState, useEffect } from 'react';

interface ObservatoryRoomProps {
  onTelescopeClick: () => void;
  onConstellationBookClick: () => void;
  onResearchNoteClick: () => void;
}

export function ObservatoryRoom({
  onTelescopeClick,
  onConstellationBookClick,
  onResearchNoteClick
}: ObservatoryRoomProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [stars, setStars] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  // Generate random stars for background
  useEffect(() => {
    const generatedStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Night Sky Background with Stars */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0a1628 0%, #1a1040 100%)',
        }}
      >
        {/* Twinkling Stars */}
        {stars.map((star, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white star-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Observatory Room Content */}
      <div className="relative w-full max-w-[1200px] h-full flex items-center justify-center">
        {/* Observatory Interior */}
        <div className="relative w-[800px] h-[500px]">
          {/* Floor */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[100px]"
            style={{
              background: 'linear-gradient(180deg, #2a2a3e 0%, #1a1a2e 100%)',
              borderTop: '4px solid #3a3a5e',
            }}
          />

          {/* Interactive Telescope - Center-Left */}
          <button
            className={`absolute left-[15%] bottom-[25%] w-[200px] h-[250px] cursor-pointer transition-all ${
              hoveredItem === 'telescope' ? 'neon-glow-blue' : ''
            }`}
            onMouseEnter={() => setHoveredItem('telescope')}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={onTelescopeClick}
            aria-label="망원경"
          >
            {/* Telescope Visualization */}
            <div className="relative w-full h-full">
              {/* Tripod */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80px] h-[60px] flex justify-between items-end">
                <div className="w-[8px] h-[60px] bg-[#4a4a5e] pixel-border-small" />
                <div className="w-[8px] h-[50px] bg-[#4a4a5e] pixel-border-small" />
                <div className="w-[8px] h-[60px] bg-[#4a4a5e] pixel-border-small" />
              </div>
              {/* Telescope Body */}
              <div
                className="absolute bottom-[50px] left-1/2 -translate-x-1/2 w-[120px] h-[40px] bg-[#6a6a8e] pixel-border-small"
                style={{ transform: 'translateX(-50%) rotate(-30deg)', transformOrigin: 'left center' }}
              />
              <div
                className="absolute bottom-[80px] left-1/2 -translate-x-1/2 w-[80px] h-[30px] bg-[#5a5a7e] pixel-border-small"
                style={{ transform: 'translateX(-50%) rotate(-30deg)', transformOrigin: 'left center' }}
              />
            </div>
            <div className="w-full h-full border-2 border-transparent hover:border-blue-400 hover:border-dashed rounded" />
          </button>

          {/* Interactive Constellation Book - Right on Table */}
          <button
            className={`absolute right-[15%] bottom-[20%] w-[120px] h-[100px] cursor-pointer transition-all ${
              hoveredItem === 'book' ? 'neon-glow-purple' : ''
            }`}
            onMouseEnter={() => setHoveredItem('book')}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={onConstellationBookClick}
            aria-label="별자리 도감"
          >
            {/* Table */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150px] h-[40px] bg-[#3a3a4e] pixel-border-small" />
            {/* Book */}
            <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 w-[80px] h-[60px] bg-[#6b3fa0] pixel-border-small">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[12px]">⭐</div>
            </div>
            <div className="w-full h-full border-2 border-transparent hover:border-purple-400 hover:border-dashed rounded" />
          </button>

          {/* Interactive Research Note - Center Desk */}
          <button
            className={`absolute left-[45%] bottom-[18%] w-[100px] h-[80px] cursor-pointer transition-all ${
              hoveredItem === 'note' ? 'neon-glow-yellow' : ''
            }`}
            onMouseEnter={() => setHoveredItem('note')}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={onResearchNoteClick}
            aria-label="연구 노트"
          >
            {/* Desk */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[35px] bg-[#3a3a4e] pixel-border-small" />
            {/* Note */}
            <div className="absolute bottom-[35px] left-1/2 -translate-x-1/2 w-[70px] h-[50px] bg-[#f0e6d2] pixel-border-small">
              <div className="absolute top-2 left-2 right-2 h-[2px] bg-[#8b7355]" />
              <div className="absolute top-4 left-2 right-2 h-[2px] bg-[#8b7355]" />
              <div className="absolute top-6 left-2 right-2 h-[2px] bg-[#8b7355]" />
            </div>
            <div className="w-full h-full border-2 border-transparent hover:border-yellow-400 hover:border-dashed rounded" />
          </button>

          {/* Hover Labels */}
          {hoveredItem === 'telescope' && (
            <div className="absolute left-[15%] bottom-[75%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
              <span className="text-[16px]">🔭 망원경 - 별자리 관측</span>
            </div>
          )}
          {hoveredItem === 'book' && (
            <div className="absolute right-[15%] bottom-[45%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
              <span className="text-[16px]">⭐ 천구의 - 별자리 도감</span>
            </div>
          )}
          {hoveredItem === 'note' && (
            <div className="absolute left-[45%] bottom-[40%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
              <span className="text-[16px]">🌟 연구 노트 - 오늘의 운세</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
