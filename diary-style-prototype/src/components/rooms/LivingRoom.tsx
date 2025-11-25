import livingRoomImage from 'figma:asset/d71d8d12c2b561bdbfc0aee2718830206014bbb5.png';
import { useState } from 'react';
import { RoomType } from '../../App';

interface LivingRoomProps {
  onRoomChange?: (room: RoomType) => void;
}

export function LivingRoom({ onRoomChange }: LivingRoomProps) {
  const [fireplaceHover, setFireplaceHover] = useState(false);
  const [photoAlbumHover, setPhotoAlbumHover] = useState(false);

  const handleFireplaceClick = () => {
    if (onRoomChange) {
      onRoomChange('채팅 공간');
    }
  };

  const handlePhotoAlbumClick = () => {
    if (onRoomChange) {
      onRoomChange('방명록');
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Background Image */}
      <img 
        src={livingRoomImage} 
        alt="거실" 
        className="w-full h-full object-cover"
      />

      {/* Fireplace Clickable Area with Neon Effect */}
      <div
        className="absolute cursor-pointer transition-all duration-300"
        style={{
          left: '35%',
          top: '25%',
          width: '30%',
          height: '50%',
        }}
        onMouseEnter={() => setFireplaceHover(true)}
        onMouseLeave={() => setFireplaceHover(false)}
        onClick={handleFireplaceClick}
      >
        {fireplaceHover && (
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
                <p className="text-center">🔥 채팅 공간으로 이동</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Photo Album Clickable Area with Neon Effect (Right side shelves) */}
      <div
        className="absolute cursor-pointer transition-all duration-300"
        style={{
          right: '5%',
          top: '15%',
          width: '20%',
          height: '60%',
        }}
        onMouseEnter={() => setPhotoAlbumHover(true)}
        onMouseLeave={() => setPhotoAlbumHover(false)}
        onClick={handlePhotoAlbumClick}
      >
        {photoAlbumHover && (
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
                <p className="text-center">📸 방명록으로 이동</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Fireplace Animation Overlay */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '42%',
          top: '45%',
          width: '16%',
          height: '25%',
        }}
      >
        {/* Fire animation */}
        <div className="relative w-full h-full">
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[100%]"
            style={{
              background: 'radial-gradient(ellipse at bottom, rgba(255,140,0,0.8) 0%, rgba(255,69,0,0.6) 30%, rgba(255,0,0,0.4) 50%, transparent 70%)',
              animation: 'flicker 2s ease-in-out infinite',
            }}
          />
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[90%]"
            style={{
              background: 'radial-gradient(ellipse at bottom, rgba(255,200,0,0.9) 0%, rgba(255,140,0,0.7) 40%, transparent 70%)',
              animation: 'flicker 1.5s ease-in-out infinite reverse',
            }}
          />
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40%] h-[80%]"
            style={{
              background: 'radial-gradient(ellipse at bottom, rgba(255,255,200,1) 0%, rgba(255,200,0,0.8) 30%, transparent 60%)',
              animation: 'flicker 1s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes flicker {
          0%, 100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          25% {
            opacity: 0.8;
            transform: scale(1.05) translateY(-5px);
          }
          50% {
            opacity: 0.9;
            transform: scale(0.95) translateY(-2px);
          }
          75% {
            opacity: 0.85;
            transform: scale(1.02) translateY(-7px);
          }
        }
      `}</style>
    </div>
  );
}