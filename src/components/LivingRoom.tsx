import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import livingRoomImage from 'figma:asset/255809ad34a9b3bcf57a271a8de35e05d3511ca8.png';

interface LivingRoomProps {
  onFireplaceClick: () => void;
  onPhotoAlbumClick: () => void;
}

export function LivingRoom({ onFireplaceClick, onPhotoAlbumClick }: LivingRoomProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Living Room Background */}
      <div className="relative">
        <ImageWithFallback 
          src={livingRoomImage}
          alt="거실"
          className="max-w-full max-h-[calc(100vh-200px)] object-contain pixel-render"
        />

        {/* Interactive Fireplace Area - Left side of the room */}
        <button
          className={`absolute left-[15%] top-[45%] w-[25%] h-[35%] cursor-pointer transition-all ${
            hoveredItem === 'fireplace' ? 'neon-glow-orange' : ''
          }`}
          onMouseEnter={() => setHoveredItem('fireplace')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={onFireplaceClick}
          aria-label="벽난로"
        >
          <div className="w-full h-full border-2 border-transparent hover:border-orange-400 hover:border-dashed rounded" />
        </button>

        {/* Interactive Photo Album Area - Right side wall */}
        <button
          className={`absolute right-[8%] top-[20%] w-[12%] h-[20%] cursor-pointer transition-all ${
            hoveredItem === 'photoalbum' ? 'neon-glow-pink' : ''
          }`}
          onMouseEnter={() => setHoveredItem('photoalbum')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={onPhotoAlbumClick}
          aria-label="사진첩"
        >
          <div className="w-full h-full border-2 border-transparent hover:border-pink-400 hover:border-dashed rounded" />
        </button>

        {/* Hover Labels */}
        {hoveredItem === 'fireplace' && (
          <div className="absolute left-[15%] top-[35%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
            <span className="text-[16px]">🔥 벽난로 - 채팅</span>
          </div>
        )}
        {hoveredItem === 'photoalbum' && (
          <div className="absolute right-[8%] top-[10%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
            <span className="text-[16px]">📷 사진첩 - 방명록</span>
          </div>
        )}
      </div>
    </div>
  );
}