import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, X, Volume2 } from 'lucide-react';

interface JukeboxPopupProps {
  onClose: () => void;
}

interface Song {
  id: number;
  title: string;
  artist: string;
}

export function JukeboxPopup({ onClose }: JukeboxPopupProps) {
  const [position, setPosition] = useState({ x: window.innerWidth - 420, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const popupRef = useRef<HTMLDivElement>(null);

  const playlist: Song[] = [
    { id: 1, title: "픽셀 카페의 오후", artist: "8bit Orchestra" },
    { id: 2, title: "도트 세계의 산책", artist: "Chiptune Masters" },
    { id: 3, title: "따뜻한 벽난로", artist: "Retro Vibes" },
    { id: 4, title: "오래된 사진첩", artist: "Pixel Nostalgia" },
    { id: 5, title: "책과 함께하는 시간", artist: "8bit Lounge" },
  ];

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

      // Keep within viewport bounds
      const maxX = window.innerWidth - 400;
      const maxY = window.innerHeight - 500;

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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const handleSongClick = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  return (
    <div
      ref={popupRef}
      className={`fixed z-50 w-[400px] bg-[#d4c4a8] pixel-border shadow-2xl ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className="bg-[#8b7355] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
        <div className="flex items-center gap-2">
          <Volume2 size={20} className="pixel-icon" />
          <span className="text-[18px] font-bold">🎵 쥬크박스</span>
        </div>
        <button
          onClick={onClose}
          className="no-drag hover:bg-red-500 p-1 transition-colors pixel-border-small"
          aria-label="닫기"
        >
          <X size={18} />
        </button>
      </div>

      {/* Current Song Display */}
      <div className="bg-[#3a3a3a] text-[#00ff00] p-4 border-b-4 border-black font-mono">
        <div className="text-[14px] mb-1 font-bold">♪ NOW PLAYING:</div>
        <div className="text-[16px] truncate font-bold">{playlist[currentSongIndex].title}</div>
        <div className="text-[12px] text-[#00cc00] truncate font-semibold">{playlist[currentSongIndex].artist}</div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 p-6 bg-[#c4b49a] border-b-4 border-black">
        <button
          onClick={handlePrevious}
          className="no-drag pixel-button bg-[#8b7355] hover:bg-[#6d5c44] text-white p-3"
          aria-label="이전 곡"
        >
          <SkipBack size={24} fill="currentColor" />
        </button>
        <button
          onClick={handlePlayPause}
          className="no-drag pixel-button bg-[#d4af37] hover:bg-[#b8951f] text-white p-4"
          aria-label={isPlaying ? "일시정지" : "재생"}
        >
          {isPlaying ? (
            <Pause size={28} fill="currentColor" />
          ) : (
            <Play size={28} fill="currentColor" />
          )}
        </button>
        <button
          onClick={handleNext}
          className="no-drag pixel-button bg-[#8b7355] hover:bg-[#6d5c44] text-white p-3"
          aria-label="다음 곡"
        >
          <SkipForward size={24} fill="currentColor" />
        </button>
      </div>

      {/* Playlist */}
      <div className="bg-[#ebe1d1] max-h-[300px] overflow-y-auto">
        <div className="p-3 bg-[#a89378] border-b-2 border-black">
          <span className="text-[16px] text-white">📝 재생목록</span>
        </div>
        <div className="divide-y-2 divide-[#c4b49a]">
          {playlist.map((song, index) => (
            <button
              key={song.id}
              onClick={() => handleSongClick(index)}
              className={`no-drag w-full text-left p-3 transition-colors hover:bg-[#d4c4a8] ${
                index === currentSongIndex ? 'bg-[#faed96] border-l-4 border-[#d4af37]' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-[16px] text-[#8b7355] w-6">
                  {index === currentSongIndex && isPlaying ? '▶' : (index + 1)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] text-black truncate">{song.title}</div>
                  <div className="text-[12px] text-[#8b7355] truncate">{song.artist}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-[#8b7355] text-white text-center py-2 text-[12px] border-t-4 border-black">
        상점과 방 꾸미기에서 플레이리스트 변경 가능
      </div>
    </div>
  );
}