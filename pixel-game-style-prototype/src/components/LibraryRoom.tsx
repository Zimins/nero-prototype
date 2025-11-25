import { useState } from 'react';

interface LibraryRoomProps {
  onBookshelfClick: () => void;
  onGlobeClick: () => void;
  onReadingDeskClick: () => void;
}

export function LibraryRoom({ onBookshelfClick, onGlobeClick, onReadingDeskClick }: LibraryRoomProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Library Room Background - Dark purple/navy gradient */}
      <div className="relative w-full h-full" style={{
        background: 'linear-gradient(180deg, #1a1a2e 0%, #1a1040 100%)'
      }}>
        {/* Decorative elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-[1200px] h-full max-h-[700px]">

            {/* Giant Bookshelf - Center-left */}
            <button
              className={`absolute left-[15%] top-[20%] w-[30%] h-[60%] cursor-pointer transition-all ${
                hoveredItem === 'bookshelf' ? 'neon-glow-red' : ''
              }`}
              onMouseEnter={() => setHoveredItem('bookshelf')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={onBookshelfClick}
              aria-label="거대 책장"
            >
              <div className="w-full h-full border-2 border-transparent hover:border-red-400 hover:border-dashed rounded flex items-center justify-center">
                <div className="text-[80px] opacity-70">📚</div>
              </div>
            </button>

            {/* Globe & Map - Right bottom */}
            <button
              className={`absolute right-[15%] bottom-[15%] w-[20%] h-[30%] cursor-pointer transition-all ${
                hoveredItem === 'globe' ? 'neon-glow-green' : ''
              }`}
              onMouseEnter={() => setHoveredItem('globe')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={onGlobeClick}
              aria-label="지구본과 고지도"
            >
              <div className="w-full h-full border-2 border-transparent hover:border-green-400 hover:border-dashed rounded flex items-center justify-center">
                <div className="text-[60px] opacity-70">🗺️</div>
              </div>
            </button>

            {/* Magic Reading Desk - Right center */}
            <button
              className={`absolute right-[20%] top-[30%] w-[25%] h-[35%] cursor-pointer transition-all ${
                hoveredItem === 'desk' ? 'neon-glow-brown' : ''
              }`}
              onMouseEnter={() => setHoveredItem('desk')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={onReadingDeskClick}
              aria-label="마법의 독서대"
            >
              <div className="w-full h-full border-2 border-transparent hover:border-yellow-400 hover:border-dashed rounded flex items-center justify-center">
                <div className="text-[70px] opacity-70">✨</div>
              </div>
            </button>

            {/* Hover Labels */}
            {hoveredItem === 'bookshelf' && (
              <div className="absolute left-[15%] top-[10%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
                <span className="text-[16px]">📚 거대 책장 - 책 컬렉션</span>
              </div>
            )}
            {hoveredItem === 'globe' && (
              <div className="absolute right-[15%] bottom-[48%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
                <span className="text-[16px]">🗺️ 지구본 & 고지도 - 지식 지도</span>
              </div>
            )}
            {hoveredItem === 'desk' && (
              <div className="absolute right-[20%] top-[20%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
                <span className="text-[16px]">✨ 마법의 독서대 - 오늘의 글귀</span>
              </div>
            )}
          </div>
        </div>

        {/* Room Title */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-8 py-3 pixel-border pointer-events-none">
          <h1 className="text-[28px] text-center">📖 도서관</h1>
          <p className="text-[14px] text-center text-gray-300 mt-1">지식의 보고, 영감의 공간</p>
        </div>
      </div>
    </div>
  );
}
