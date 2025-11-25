import { useState } from 'react';

interface OutsidePageProps {
  onBoardClick: () => void;
  onFountainClick: () => void;
  onMailboxClick: () => void;
  onArcadeClick: () => void;
  onSignpostClick: () => void;
}

export function OutsidePage({
  onBoardClick,
  onFountainClick,
  onMailboxClick,
  onArcadeClick,
  onSignpostClick,
}: OutsidePageProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outside Background - Sky gradient with town feeling */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#B0E0E6] to-[#98D8C8]" />

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#8FBC8F] to-[#9ACD32]" />

      {/* Decorative clouds */}
      <div className="absolute top-[10%] left-[10%] w-[100px] h-[40px] bg-white/70 rounded-full" />
      <div className="absolute top-[15%] right-[15%] w-[120px] h-[45px] bg-white/60 rounded-full" />
      <div className="absolute top-[8%] left-[40%] w-[90px] h-[35px] bg-white/65 rounded-full" />

      {/* Main content area */}
      <div className="relative w-full h-full max-w-[1200px] max-h-[600px]">
        {/* Community Board - Left side */}
        <button
          className={`absolute left-[8%] top-[25%] w-[18%] h-[35%] cursor-pointer transition-all ${
            hoveredItem === 'board' ? 'neon-glow-green' : ''
          }`}
          onMouseEnter={() => setHoveredItem('board')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={onBoardClick}
          aria-label="게시판"
        >
          {/* Board visual */}
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-[#8B4513] pixel-border" />
            <div className="absolute inset-[8%] bg-[#DEB887] pixel-border flex flex-col items-center justify-center gap-2">
              <div className="text-[32px]">📋</div>
              <div className="text-[12px] text-black">게시판</div>
            </div>
          </div>
          <div className="w-full h-full border-2 border-transparent hover:border-green-400 hover:border-dashed rounded" />
        </button>

        {/* Fountain - Center */}
        <button
          className={`absolute left-[50%] top-[35%] -translate-x-1/2 w-[25%] h-[40%] cursor-pointer transition-all ${
            hoveredItem === 'fountain' ? 'neon-glow-blue' : ''
          }`}
          onMouseEnter={() => setHoveredItem('fountain')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={onFountainClick}
          aria-label="분수대"
        >
          {/* Fountain visual */}
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-[#4682B4] pixel-border rounded-full" />
            <div className="absolute bottom-[50%] left-1/2 -translate-x-1/2 w-[40%] h-[50%] bg-[#5F9EA0] pixel-border" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[40px]">⛲</div>
          </div>
          <div className="w-full h-full border-2 border-transparent hover:border-cyan-400 hover:border-dashed rounded" />
        </button>

        {/* Arcade - Right side */}
        <button
          className={`absolute right-[8%] top-[20%] w-[20%] h-[40%] cursor-pointer transition-all ${
            hoveredItem === 'arcade' ? 'neon-glow-purple' : ''
          }`}
          onMouseEnter={() => setHoveredItem('arcade')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={onArcadeClick}
          aria-label="오락실"
        >
          {/* Arcade visual */}
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-[#9b59b6] to-[#8e44ad] pixel-border" />
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 text-[36px]">🎮</div>
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 text-[12px] text-white">오락실</div>
          </div>
          <div className="w-full h-full border-2 border-transparent hover:border-purple-400 hover:border-dashed rounded" />
        </button>

        {/* Mailbox - Right bottom */}
        <button
          className={`absolute right-[15%] bottom-[15%] w-[15%] h-[25%] cursor-pointer transition-all ${
            hoveredItem === 'mailbox' ? 'neon-glow-red' : ''
          }`}
          onMouseEnter={() => setHoveredItem('mailbox')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={onMailboxClick}
          aria-label="우편함"
        >
          {/* Mailbox visual */}
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[30%] h-[40%] bg-[#8B4513] pixel-border" />
            <div className="absolute bottom-[35%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-[#e74c3c] pixel-border rounded-t-full" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[32px]">📮</div>
          </div>
          <div className="w-full h-full border-2 border-transparent hover:border-red-400 hover:border-dashed rounded" />
        </button>

        {/* Signpost - Left bottom */}
        <button
          className={`absolute left-[12%] bottom-[18%] w-[16%] h-[28%] cursor-pointer transition-all ${
            hoveredItem === 'signpost' ? 'neon-glow-green' : ''
          }`}
          onMouseEnter={() => setHoveredItem('signpost')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={onSignpostClick}
          aria-label="이정표"
        >
          {/* Signpost visual */}
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[20%] h-full bg-[#8B4513] pixel-border" />
            <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[90%] h-[25%] bg-[#27ae60] pixel-border flex items-center justify-center text-white text-[10px]">
              이웃방문
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[28px]">🧭</div>
          </div>
          <div className="w-full h-full border-2 border-transparent hover:border-emerald-400 hover:border-dashed rounded" />
        </button>

        {/* Hover Labels */}
        {hoveredItem === 'board' && (
          <div className="absolute left-[8%] top-[15%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none z-10">
            <span className="text-[16px]">📋 게시판 - 커뮤니티</span>
          </div>
        )}
        {hoveredItem === 'fountain' && (
          <div className="absolute left-[50%] top-[25%] -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none z-10">
            <span className="text-[16px]">⛲ 분수대 - 광장 채팅</span>
          </div>
        )}
        {hoveredItem === 'arcade' && (
          <div className="absolute right-[8%] top-[10%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none z-10">
            <span className="text-[16px]">🎮 오락실 - 미니게임</span>
          </div>
        )}
        {hoveredItem === 'mailbox' && (
          <div className="absolute right-[15%] bottom-[45%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none z-10">
            <span className="text-[16px]">📮 우편함 - 메시지</span>
          </div>
        )}
        {hoveredItem === 'signpost' && (
          <div className="absolute left-[12%] bottom-[50%] bg-black/80 text-white px-4 py-2 rounded pixel-border pointer-events-none z-10">
            <span className="text-[16px]">🧭 이정표 - 이웃 방문</span>
          </div>
        )}
      </div>
    </div>
  );
}
