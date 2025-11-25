import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import atticRoomImage from 'figma:asset/906bd015a53489b1c86c385049849952546f708a.png';

interface AtticRoomProps {
  onOldTVClick: () => void;
  onMemoryBoxClick: () => void;
  onSecretDiaryClick: () => void;
}

export function AtticRoom({ onOldTVClick, onMemoryBoxClick, onSecretDiaryClick }: AtticRoomProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Attic Room Background */}
      <div className="relative">
        <ImageWithFallback
          src={atticRoomImage}
          alt="다락방"
          className="max-w-full max-h-[calc(100vh-200px)] object-contain pixel-render"
        />

        {/* Interactive Old TV Area - Right bottom */}
        <button
          className={`absolute right-[10%] bottom-[15%] w-[20%] h-[30%] cursor-pointer transition-all ${
            hoveredItem === 'oldtv' ? 'neon-glow-purple' : ''
          }`}
          onMouseEnter={() => setHoveredItem('oldtv')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={onOldTVClick}
          aria-label="오래된 TV"
        >
          <div className="w-full h-full border-2 border-transparent hover:border-purple-400 hover:border-dashed rounded" />
        </button>

        {/* Interactive Memory Box Area - Center */}
        <button
          className={`absolute left-[40%] bottom-[20%] w-[20%] h-[25%] cursor-pointer transition-all ${
            hoveredItem === 'memorybox' ? 'neon-glow-gold' : ''
          }`}
          onMouseEnter={() => setHoveredItem('memorybox')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={onMemoryBoxClick}
          aria-label="낡은 상자"
        >
          <div className="w-full h-full border-2 border-transparent hover:border-yellow-400 hover:border-dashed rounded" />
        </button>

        {/* Interactive Old Computer Area - Right top */}
        <button
          className={`absolute right-[8%] top-[20%] w-[18%] h-[25%] cursor-pointer transition-all ${
            hoveredItem === 'computer' ? 'neon-glow-cyan' : ''
          }`}
          onMouseEnter={() => setHoveredItem('computer')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={onSecretDiaryClick}
          aria-label="구형 컴퓨터"
        >
          <div className="w-full h-full border-2 border-transparent hover:border-cyan-400 hover:border-dashed rounded" />
        </button>

        {/* Hover Labels */}
        {hoveredItem === 'oldtv' && (
          <div className="absolute right-[10%] bottom-[45%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
            <span className="text-[16px]">📺 오래된 TV - 추억의 영상관</span>
          </div>
        )}
        {hoveredItem === 'memorybox' && (
          <div className="absolute left-[40%] bottom-[45%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
            <span className="text-[16px]">📦 낡은 상자 - 추억 상자</span>
          </div>
        )}
        {hoveredItem === 'computer' && (
          <div className="absolute right-[8%] top-[10%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
            <span className="text-[16px]">💻 구형 컴퓨터 - 비밀 일기장</span>
          </div>
        )}
      </div>
    </div>
  );
}