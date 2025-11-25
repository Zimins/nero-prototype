import { useState } from 'react';

interface GreenhouseRoomProps {
  onPlantBedClick: () => void;
  onWateringCanClick: () => void;
  onSeedBoxClick: () => void;
}

export function GreenhouseRoom({
  onPlantBedClick,
  onWateringCanClick,
  onSeedBoxClick
}: GreenhouseRoomProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Greenhouse Background */}
      <div
        className="relative w-full max-w-[1200px] h-[calc(100vh-200px)] flex items-center justify-center"
        style={{
          background: 'linear-gradient(to bottom, #6ba587 0%, #4a7c59 50%, #3d6b4a 100%)',
          borderRadius: '8px',
          boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Decorative glass panels effect */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255, 255, 255, 0.1) 80px, rgba(255, 255, 255, 0.1) 100px)',
          }}
        />

        {/* Plant Bed - Center */}
        <button
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[40%] cursor-pointer transition-all ${
            hoveredItem === 'plantbed' ? 'neon-glow-green' : ''
          }`}
          onMouseEnter={() => setHoveredItem('plantbed')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={onPlantBedClick}
          aria-label="화분대"
        >
          <div className="w-full h-full border-2 border-transparent hover:border-green-400 hover:border-dashed rounded flex items-center justify-center">
            <div className="text-[64px] opacity-60 hover:opacity-100 transition-opacity">
              🌱🌻🌿
            </div>
          </div>
        </button>

        {/* Watering Can - Right Bottom */}
        <button
          className={`absolute right-[10%] bottom-[15%] w-[15%] h-[20%] cursor-pointer transition-all ${
            hoveredItem === 'wateringcan' ? 'neon-glow-blue' : ''
          }`}
          onMouseEnter={() => setHoveredItem('wateringcan')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={onWateringCanClick}
          aria-label="물뿌리개"
        >
          <div className="w-full h-full border-2 border-transparent hover:border-blue-400 hover:border-dashed rounded flex items-center justify-center">
            <div className="text-[48px] opacity-60 hover:opacity-100 transition-opacity">
              💧
            </div>
          </div>
        </button>

        {/* Seed Box - Left Bottom */}
        <button
          className={`absolute left-[10%] bottom-[15%] w-[15%] h-[20%] cursor-pointer transition-all ${
            hoveredItem === 'seedbox' ? 'neon-glow-orange' : ''
          }`}
          onMouseEnter={() => setHoveredItem('seedbox')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={onSeedBoxClick}
          aria-label="씨앗 상자"
        >
          <div className="w-full h-full border-2 border-transparent hover:border-orange-400 hover:border-dashed rounded flex items-center justify-center">
            <div className="text-[48px] opacity-60 hover:opacity-100 transition-opacity">
              🌰
            </div>
          </div>
        </button>

        {/* Hover Labels */}
        {hoveredItem === 'plantbed' && (
          <div className="absolute left-1/2 top-[35%] -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
            <span className="text-[16px]">🌱 화분대 - 식물 관리</span>
          </div>
        )}
        {hoveredItem === 'wateringcan' && (
          <div className="absolute right-[10%] bottom-[38%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
            <span className="text-[16px]">💧 물뿌리개 - 물주기</span>
          </div>
        )}
        {hoveredItem === 'seedbox' && (
          <div className="absolute left-[10%] bottom-[38%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none">
            <span className="text-[16px]">🌰 씨앗 상자 - 새 식물 심기</span>
          </div>
        )}
      </div>
    </div>
  );
}
