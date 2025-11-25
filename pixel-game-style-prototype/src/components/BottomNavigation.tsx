import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Settings } from 'lucide-react';

interface BottomNavigationProps {
  currentRoom: string;
  onRoomChange: (room: string) => void;
}

export function BottomNavigation({ currentRoom, onRoomChange }: BottomNavigationProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [autoHide, setAutoHide] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [mouseInNav, setMouseInNav] = useState(false);

  const rooms = [
    { name: '거실', color: '#faed96' },
    { name: '다락방', color: '#ffffff' },
    { name: '서재', color: '#ffffff' },
    { name: '도서관', color: '#ffffff' },
    { name: '천문대', color: '#ffffff' },
    { name: '온실', color: '#ffffff' },
    { name: '다실', color: '#ffffff' },
  ];

  const specialRooms = [
    { name: '상점', position: 'left' },
    { name: '방 꾸미기', position: 'left' },
    { name: '외출', position: 'right' },
  ];

  useEffect(() => {
    if (!autoHide) return;

    let hideTimer: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      const threshold = window.innerHeight - 100;
      
      if (e.clientY > threshold) {
        setIsHidden(false);
        clearTimeout(hideTimer);
      } else if (!mouseInNav) {
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
          setIsHidden(true);
        }, 2000);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(hideTimer);
    };
  }, [autoHide, mouseInNav]);

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="fixed bottom-4 right-4 z-50 pixel-button bg-[#8b7355] hover:bg-[#6d5c44] text-white p-3 shadow-lg"
        aria-label="설정"
      >
        <Settings size={20} />
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed bottom-20 right-4 z-50 bg-[#d4c4a8] pixel-border shadow-2xl p-4 w-[250px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px]">네비게이션 설정</span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoHide}
              onChange={(e) => setAutoHide(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-[14px]">자동 숨기기</span>
          </label>
        </div>
      )}

      {/* Bottom Navigation */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
          isHidden && autoHide ? 'translate-y-full' : 'translate-y-0'
        }`}
        onMouseEnter={() => setMouseInNav(true)}
        onMouseLeave={() => setMouseInNav(false)}
      >
        {/* Hide/Show Indicator */}
        {autoHide && (
          <button
            onClick={() => setIsHidden(!isHidden)}
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#8b7355] text-white px-4 py-1 pixel-border-small hover:bg-[#6d5c44]"
          >
            {isHidden ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}

        <div className="bg-[#d4c4a8] border-t-4 border-black px-4 py-3">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-2">
            {/* Left Special Rooms */}
            <div className="flex gap-2">
              {specialRooms.filter(r => r.position === 'left').map((room) => (
                <button
                  key={room.name}
                  onClick={() => onRoomChange(room.name)}
                  className={`pixel-button px-6 py-3 text-[16px] transition-colors ${
                    currentRoom === room.name
                      ? 'bg-[#faed96] text-black border-4 border-black'
                      : 'bg-white hover:bg-[#ebe1d1] text-black border-2 border-black'
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>

            {/* Main Rooms */}
            <div className="flex gap-2 flex-1 justify-center">
              {rooms.map((room) => (
                <button
                  key={room.name}
                  onClick={() => onRoomChange(room.name)}
                  className={`pixel-button px-6 py-3 text-[16px] transition-all hover:scale-105 ${
                    currentRoom === room.name
                      ? 'bg-[#faed96] text-black border-4 border-black scale-110'
                      : 'bg-white hover:bg-[#ebe1d1] text-black border-2 border-black'
                  }`}
                  style={{
                    backgroundColor: currentRoom === room.name ? room.color : 'white',
                  }}
                >
                  {room.name}
                </button>
              ))}
            </div>

            {/* Right Special Rooms */}
            <div className="flex gap-2">
              {specialRooms.filter(r => r.position === 'right').map((room) => (
                <button
                  key={room.name}
                  onClick={() => onRoomChange(room.name)}
                  className={`pixel-button px-6 py-3 text-[16px] transition-colors ${
                    currentRoom === room.name
                      ? 'bg-[#faed96] text-black border-4 border-black'
                      : 'bg-white hover:bg-[#ebe1d1] text-black border-2 border-black'
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
