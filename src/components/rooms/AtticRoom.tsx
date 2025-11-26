import atticImage from 'figma:asset/bf78eb87396427f421ed71be53144a5185659176.png';
import { useState } from 'react';
import { RoomType } from '../../App';

interface AtticRoomProps {
  onRoomChange?: (room: RoomType) => void;
}

export function AtticRoom({ onRoomChange }: AtticRoomProps) {
  const [chatHover, setChatHover] = useState(false);
  const [guestbookHover, setGuestbookHover] = useState(false);

  const handleChatClick = () => {
    if (onRoomChange) {
      onRoomChange('채팅 공간');
    }
  };

  const handleGuestbookClick = () => {
    if (onRoomChange) {
      onRoomChange('방명록');
    }
  };

  return (
    <div className="relative w-full h-full">
      <img 
        src={atticImage} 
        alt="다락방" 
        className="w-full h-full object-cover"
      />

      {/* Chat Area - Left side */}
      <div
        className="absolute cursor-pointer transition-all duration-300"
        style={{
          left: '15%',
          top: '30%',
          width: '30%',
          height: '45%',
        }}
        onMouseEnter={() => setChatHover(true)}
        onMouseLeave={() => setChatHover(false)}
        onClick={handleChatClick}
      >
        {chatHover && (
          <>
            <div 
              className="absolute inset-0 rounded-lg animate-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(255,140,0,0.4) 0%, rgba(255,69,0,0.2) 50%, transparent 70%)',
                boxShadow: '0 0 30px 10px rgba(255,140,0,0.6), inset 0 0 20px rgba(255,140,0,0.3)',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/70 text-white px-4 py-2 rounded border-2 border-orange-400 shadow-lg animate-bounce">
                <p className="text-center">💬 채팅 공간으로 이동</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Guestbook Area - Right side */}
      <div
        className="absolute cursor-pointer transition-all duration-300"
        style={{
          right: '15%',
          top: '30%',
          width: '30%',
          height: '45%',
        }}
        onMouseEnter={() => setGuestbookHover(true)}
        onMouseLeave={() => setGuestbookHover(false)}
        onClick={handleGuestbookClick}
      >
        {guestbookHover && (
          <>
            <div 
              className="absolute inset-0 rounded-lg animate-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(138,43,226,0.4) 0%, rgba(75,0,130,0.2) 50%, transparent 70%)',
                boxShadow: '0 0 30px 10px rgba(138,43,226,0.6), inset 0 0 20px rgba(138,43,226,0.3)',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/70 text-white px-4 py-2 rounded border-2 border-purple-400 shadow-lg animate-bounce">
                <p className="text-center">📖 방명록으로 이동</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}