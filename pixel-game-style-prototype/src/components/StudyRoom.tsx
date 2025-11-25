import { useState } from 'react';

interface StudyRoomProps {
  onDeskLampClick: () => void;
  onBookshelfClick: () => void;
  onGlobeClick: () => void;
}

export function StudyRoom({ onDeskLampClick, onBookshelfClick, onGlobeClick }: StudyRoomProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Study Room Background with gradient */}
      <div className="relative w-full h-full" style={{
        background: 'linear-gradient(180deg, #4a3a2a 0%, #2c1810 100%)'
      }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[90%] h-[80%]">

            {/* Interactive Globe Area - Left Side */}
            <button
              className={`absolute left-[5%] top-[30%] w-[20%] h-[25%] cursor-pointer transition-all ${
                hoveredItem === 'globe' ? 'neon-glow-blue' : ''
              }`}
              onMouseEnter={() => setHoveredItem('globe')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={onGlobeClick}
              aria-label="지구본"
            >
              <div className="w-full h-full border-2 border-transparent hover:border-blue-400 hover:border-dashed rounded flex items-center justify-center">
                <span className="text-[48px]">🌍</span>
              </div>
            </button>

            {/* Interactive Desk Lamp + Diary Area - Center */}
            <button
              className={`absolute left-[35%] top-[35%] w-[25%] h-[30%] cursor-pointer transition-all ${
                hoveredItem === 'diary' ? 'neon-glow-orange' : ''
              }`}
              onMouseEnter={() => setHoveredItem('diary')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={onDeskLampClick}
              aria-label="책상 램프와 일기장"
            >
              <div className="w-full h-full border-2 border-transparent hover:border-orange-400 hover:border-dashed rounded flex items-center justify-center">
                <span className="text-[48px]">📔</span>
              </div>
            </button>

            {/* Interactive Bookshelf Area - Right Side */}
            <button
              className={`absolute right-[5%] top-[25%] w-[25%] h-[40%] cursor-pointer transition-all ${
                hoveredItem === 'bookshelf' ? 'neon-glow-pink' : ''
              }`}
              onMouseEnter={() => setHoveredItem('bookshelf')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={onBookshelfClick}
              aria-label="책장"
            >
              <div className="w-full h-full border-2 border-transparent hover:border-pink-400 hover:border-dashed rounded flex items-center justify-center">
                <span className="text-[48px]">📚</span>
              </div>
            </button>

            {/* Hover Labels */}
            {hoveredItem === 'diary' && (
              <div className="absolute left-[20%] top-[25%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
                <span className="text-[16px]">📔 일기장 - 일기 작성</span>
              </div>
            )}
            {hoveredItem === 'bookshelf' && (
              <div className="absolute right-[10%] top-[10%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
                <span className="text-[16px]">📚 책장 - 퀴즈 게임</span>
              </div>
            )}
            {hoveredItem === 'globe' && (
              <div className="absolute left-[10%] top-[15%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
                <span className="text-[16px]">🔮 지구본 - 오늘의 운세</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
