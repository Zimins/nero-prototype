import { useState } from 'react';

interface TeaRoomProps {
  onTeaTableClick: () => void;
  onScrollClick: () => void;
  onBrazierClick: () => void;
}

export function TeaRoom({ onTeaTableClick, onScrollClick, onBrazierClick }: TeaRoomProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Tea Room Background */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(to bottom, #2d4739 0%, #3d5a47 50%, #f5e6d3 100%)',
        }}
      >
        {/* Decorative elements for traditional tea room feel */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, #1a2a1f 10px, #1a2a1f 12px)',
          }}
        />

        {/* Interactive Tea Table Area - Center bottom */}
        <button
          className={`absolute left-[35%] bottom-[20%] w-[30%] h-[25%] cursor-pointer transition-all ${
            hoveredItem === 'teatable' ? 'neon-glow-green' : ''
          }`}
          onMouseEnter={() => setHoveredItem('teatable')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={onTeaTableClick}
          aria-label="찻상"
          style={{
            background: hoveredItem === 'teatable'
              ? 'radial-gradient(circle, rgba(86, 125, 70, 0.3) 0%, transparent 70%)'
              : 'transparent',
          }}
        >
          <div className="w-full h-full border-2 border-transparent hover:border-green-500 hover:border-dashed rounded flex items-center justify-center">
            <span className="text-[48px] opacity-80">🍵</span>
          </div>
        </button>

        {/* Interactive Scroll Area - Left wall */}
        <button
          className={`absolute left-[10%] top-[25%] w-[20%] h-[30%] cursor-pointer transition-all ${
            hoveredItem === 'scroll' ? 'neon-glow-yellow' : ''
          }`}
          onMouseEnter={() => setHoveredItem('scroll')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={onScrollClick}
          aria-label="족자"
          style={{
            background: hoveredItem === 'scroll'
              ? 'radial-gradient(circle, rgba(139, 69, 19, 0.3) 0%, transparent 70%)'
              : 'transparent',
          }}
        >
          <div className="w-full h-full border-2 border-transparent hover:border-yellow-600 hover:border-dashed rounded flex items-center justify-center">
            <span className="text-[48px] opacity-80">📜</span>
          </div>
        </button>

        {/* Interactive Brazier Area - Right side */}
        <button
          className={`absolute right-[12%] top-[40%] w-[20%] h-[25%] cursor-pointer transition-all ${
            hoveredItem === 'brazier' ? 'neon-glow-orange' : ''
          }`}
          onMouseEnter={() => setHoveredItem('brazier')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={onBrazierClick}
          aria-label="화로"
        >
          <div className="w-full h-full border-2 border-transparent hover:border-orange-500 hover:border-dashed rounded flex items-center justify-center">
            <span className="text-[48px] opacity-80">🔥</span>
          </div>
        </button>

        {/* Hover Labels */}
        {hoveredItem === 'teatable' && (
          <div className="absolute left-[35%] bottom-[10%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
            <span className="text-[16px]">🍵 찻상 - 다도 체험</span>
          </div>
        )}
        {hoveredItem === 'scroll' && (
          <div className="absolute left-[10%] top-[15%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
            <span className="text-[16px]">📜 족자 - 명상 & 명언</span>
          </div>
        )}
        {hoveredItem === 'brazier' && (
          <div className="absolute right-[12%] top-[30%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
            <span className="text-[16px]">🔥 화로 - 분위기 설정</span>
          </div>
        )}
      </div>
    </div>
  );
}
