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
// 이원주 수정: 스프링 이미지 import
import springImage from './assets/스프링.png';
// 이원주 수정: 거실 배경 이미지 import
import livingRoomBg from './assets/만화거실.jpg';
// 이원주 수정: 다락방 배경 이미지 import
import atticRoomBg from './assets/만화다락방.jpg';
// 이원주 수정: 서재 배경 이미지 import
import studyRoomBg from './assets/만화서재.jpg';
// 이원주 수정: 도서관 배경 이미지 import
import libraryRoomBg from './assets/만화도서관.jpg';
// 이원주 수정: 천문대 배경 이미지 import
import observatoryRoomBg from './assets/만화천문대.jpg';
// 이원주 수정: 온실 배경 이미지 import
import greenhouseRoomBg from './assets/만화온실.jpg';
// 이원주 수정: 다실 배경 이미지 import
import teaRoomBg from './assets/만화다실.jpg';
// 이원주 수정: 채팅 공간 배경 이미지 import
import chatRoomBg from './assets/만화채팅공간.jpg';
// 이원주 수정: 방명록 배경 이미지 import
import guestbookRoomBg from './assets/만화방명록.jpg';

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
    <div className="relative size-full min-h-screen flex justify-start p-[20px]">
      {/* 이원주 수정: 거실일 때 전체 배경 이미지 */}
      {currentRoom === '거실' && (
        <img
          src={livingRoomBg}
          alt="배경"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
      )}
      {/* 이원주 수정: 다락방일 때 전체 배경 이미지 */}
      {currentRoom === '다락방' && (
        <img
          src={atticRoomBg}
          alt="배경"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
      )}
      {/* 이원주 수정: 서재일 때 전체 배경 이미지 */}
      {currentRoom === '서재' && (
        <img
          src={studyRoomBg}
          alt="배경"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
      )}
      {/* 이원주 수정: 도서관일 때 전체 배경 이미지 */}
      {currentRoom === '도서관' && (
        <img
          src={libraryRoomBg}
          alt="배경"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
      )}
      {/* 이원주 수정: 천문대일 때 전체 배경 이미지 */}
      {currentRoom === '천문대' && (
        <img
          src={observatoryRoomBg}
          alt="배경"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
      )}
      {/* 이원주 수정: 온실일 때 전체 배경 이미지 */}
      {currentRoom === '온실' && (
        <img
          src={greenhouseRoomBg}
          alt="배경"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
      )}
      {/* 이원주 수정: 다실일 때 전체 배경 이미지 */}
      {currentRoom === '다실' && (
        <img
          src={teaRoomBg}
          alt="배경"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
      )}
      {/* 이원주 수정: 채팅 공간일 때 전체 배경 이미지 */}
      {currentRoom === '채팅 공간' && (
        <img
          src={chatRoomBg}
          alt="배경"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
      )}
      {/* 이원주 수정: 방명록일 때 전체 배경 이미지 */}
      {currentRoom === '방명록' && (
        <img
          src={guestbookRoomBg}
          alt="배경"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
      )}
      {/* 이원주 수정: 스케치북 전체 컨테이너 */}
      <div
        className="relative"
        style={{
          background: 'linear-gradient(180deg, #E8F4F8 0%, #D8EEF4 100%)',
          borderRadius: '20px',
          border: '2px solid #B8D4E3',
          boxShadow: '4px 4px 12px rgba(0,0,0,0.1)',
          padding: '20px',
          alignSelf: 'flex-start',
        }}
      >
        {/* 이원주 수정: 스케치북 내부 점선 테두리 */}
        <div
          className="absolute"
          style={{
            top: '10px',
            left: '10px',
            right: '10px',
            bottom: '10px',
            border: '2px dashed #9BB8C7',
            borderRadius: '15px',
            pointerEvents: 'none',
          }}
        />
        <div className="flex items-stretch" style={{ gap: '0px' }}>
          {/* 이원주 수정: 왼쪽 사이드바 - 프로필 + 주크박스 */}
          <div className="flex flex-col">
            <ProfileSection />
            <div className="mt-[20px]">
              <JukeboxSection />
            </div>
          </div>

          {/* 이원주 수정: 스프링 바인딩 - 사이드바와 메인콘텐츠 사이 */}
          <img
            src={springImage}
            alt="스프링 제본"
            className="self-stretch relative z-10"
            style={{
              width: '35px',
              objectFit: 'cover',
            }}
          />

          {/* 이원주 수정: 메인 콘텐츠 + 메뉴 */}
          <div className="flex items-start h-[600px]">
            {/* 이원주 수정: 메인 콘텐츠 박스 - 크기 고정, 내부 스크롤은 각 방 컴포넌트에서 처리 */}
            <div className="relative bg-white h-[600px] w-[800px] border border-black border-solid overflow-hidden">
              {renderRoom()}
            </div>

            {/* 이원주 수정: 우측 메뉴 */}
            <div>
              <RoomNavigation currentRoom={currentRoom} onRoomChange={setCurrentRoom} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}