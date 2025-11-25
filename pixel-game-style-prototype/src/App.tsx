import { useState } from 'react';
import { JukeboxPopup } from './components/JukeboxPopup';
import { ChatPopup } from './components/ChatPopup';
import { GuestbookPopup } from './components/GuestbookPopup';
import { BottomNavigation } from './components/BottomNavigation';
import { LivingRoom } from './components/LivingRoom';
import { AtticRoom } from './components/AtticRoom';
import { ShopPage } from './components/ShopPage';
import { DecorPage } from './components/DecorPage';

export default function App() {
  const [currentRoom, setCurrentRoom] = useState('거실');
  const [showJukebox, setShowJukebox] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showGuestbook, setShowGuestbook] = useState(false);

  const handleFireplaceClick = () => {
    setShowChat(true);
  };

  const handlePhotoAlbumClick = () => {
    setShowGuestbook(true);
  };

  const renderRoom = () => {
    switch (currentRoom) {
      case '상점':
        return <ShopPage />;
      case '방 꾸미기':
        return <DecorPage />;
      case '다락방':
        return <AtticRoom />;
      case '거실':
        return (
          <LivingRoom 
            onFireplaceClick={handleFireplaceClick}
            onPhotoAlbumClick={handlePhotoAlbumClick}
          />
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center pixel-text text-[#8b7355]">
              <h2 className="text-[32px] mb-4">{currentRoom}</h2>
              <p className="text-[20px]">준비 중입니다</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#bfaf9a] overflow-hidden pixel-text">
      {/* Main Content Area */}
      <div className="absolute inset-0 pb-32">
        {renderRoom()}
      </div>

      {/* Jukebox Popup */}
      {showJukebox && (
        <JukeboxPopup onClose={() => setShowJukebox(false)} />
      )}

      {/* Chat Popup */}
      {showChat && (
        <ChatPopup onClose={() => setShowChat(false)} />
      )}

      {/* Guestbook Popup */}
      {showGuestbook && (
        <GuestbookPopup onClose={() => setShowGuestbook(false)} />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentRoom={currentRoom}
        onRoomChange={setCurrentRoom}
      />
    </div>
  );
}