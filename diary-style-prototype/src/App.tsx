import { useState } from 'react';
import { ProfileSection } from './components/ProfileSection';
import { JukeboxSection } from './components/JukeboxSection';
import { RoomNavigation } from './components/RoomNavigation';
import { LivingRoom } from './components/rooms/LivingRoom';
import { AtticRoom } from './components/rooms/AtticRoom';
import { StudyRoom } from './components/rooms/StudyRoom';
import { LibraryRoom } from './components/rooms/LibraryRoom';
import { ObservatoryRoom } from './components/rooms/ObservatoryRoom';
import { GreenhouseRoom } from './components/rooms/GreenhouseRoom';
import { TeaRoom } from './components/rooms/TeaRoom';
import { ChatRoom } from './components/rooms/ChatRoom';
import { GuestbookRoom } from './components/rooms/GuestbookRoom';

export type RoomType = 
  | '거실' 
  | '다락방' 
  | '서재' 
  | '도서관' 
  | '천문대' 
  | '온실' 
  | '다실' 
  | '채팅 공간' 
  | '방명록';

export default function App() {
  const [currentRoom, setCurrentRoom] = useState<RoomType>('거실');

  const renderRoom = () => {
    switch (currentRoom) {
      case '거실':
        return <LivingRoom onRoomChange={setCurrentRoom} />;
      case '다락방':
        return <AtticRoom onRoomChange={setCurrentRoom} />;
      case '서재':
        return <StudyRoom />;
      case '도서관':
        return <LibraryRoom />;
      case '천문대':
        return <ObservatoryRoom />;
      case '온실':
        return <GreenhouseRoom />;
      case '다실':
        return <TeaRoom />;
      case '채팅 공간':
        return <ChatRoom />;
      case '방명록':
        return <GuestbookRoom />;
      default:
        return <LivingRoom onRoomChange={setCurrentRoom} />;
    }
  };

  return (
    <div className="bg-white relative size-full min-h-screen">
      {/* Profile Section */}
      <div className="absolute left-[20px] top-[20px]">
        <ProfileSection />
      </div>

      {/* Jukebox Section */}
      <div className="absolute left-[20px] top-[240px]">
        <JukeboxSection />
      </div>

      {/* Main Content Area */}
      <div className="absolute left-[240px] top-[20px]">
        <div className="bg-white h-[860px] w-[1160px] border border-black border-solid overflow-auto">
          {renderRoom()}
        </div>
      </div>

      {/* Room Navigation */}
      <div className="absolute right-[20px] top-[40px]">
        <RoomNavigation currentRoom={currentRoom} onRoomChange={setCurrentRoom} />
      </div>
    </div>
  );
}