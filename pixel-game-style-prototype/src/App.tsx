import { useState } from 'react';
import { JukeboxPopup } from './components/JukeboxPopup';
import { ChatPopup } from './components/ChatPopup';
import { GuestbookPopup } from './components/GuestbookPopup';
import { BottomNavigation } from './components/BottomNavigation';
import { LivingRoom } from './components/LivingRoom';
import { AtticRoom } from './components/AtticRoom';
import { ShopPage } from './components/ShopPage';
import { DecorPage } from './components/DecorPage';
import { LibraryRoom } from './components/LibraryRoom';
import { BookCollectionPopup } from './components/BookCollectionPopup';
import { KnowledgeMapPopup } from './components/KnowledgeMapPopup';
import { DailyQuotePopup } from './components/DailyQuotePopup';
import { ObservatoryRoom } from './components/ObservatoryRoom';
import { TelescopePopup } from './components/TelescopePopup';
import { ConstellationCollectionPopup } from './components/ConstellationCollectionPopup';
import { StarFortunePopup } from './components/StarFortunePopup';
import { GreenhouseRoom } from './components/GreenhouseRoom';
import { PlantManagementPopup } from './components/PlantManagementPopup';
import { WateringPopup } from './components/WateringPopup';
import { SeedBoxPopup } from './components/SeedBoxPopup';
import { OldTVPopup } from './components/OldTVPopup';
import { MemoryBoxPopup } from './components/MemoryBoxPopup';
import { SecretDiaryPopup } from './components/SecretDiaryPopup';
import { OutsidePage } from './components/OutsidePage';
import { CommunityBoardPopup } from './components/CommunityBoardPopup';
import { FountainChatPopup } from './components/FountainChatPopup';
import { MailboxPopup } from './components/MailboxPopup';
import { ArcadePopup } from './components/ArcadePopup';
import { VisitPopup } from './components/VisitPopup';
import { StudyRoom } from './components/StudyRoom';
import { DiaryPopup } from './components/DiaryPopup';
import { QuizPopup } from './components/QuizPopup';
import { FortunePopup } from './components/FortunePopup';
import { TeaRoom } from './components/TeaRoom';
import { TeaCeremonyPopup } from './components/TeaCeremonyPopup';
import { MeditationPopup } from './components/MeditationPopup';
import { AmbiancePopup } from './components/AmbiancePopup';

export default function App() {
  const [currentRoom, setCurrentRoom] = useState('거실');
  const [showJukebox, setShowJukebox] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showGuestbook, setShowGuestbook] = useState(false);
  const [showBookCollection, setShowBookCollection] = useState(false);
  const [showKnowledgeMap, setShowKnowledgeMap] = useState(false);
  const [showDailyQuote, setShowDailyQuote] = useState(false);
  const [showTelescope, setShowTelescope] = useState(false);
  const [showConstellationBook, setShowConstellationBook] = useState(false);
  const [showStarFortune, setShowStarFortune] = useState(false);
  const [showPlantManagement, setShowPlantManagement] = useState(false);
  const [showWatering, setShowWatering] = useState(false);
  const [showSeedBox, setShowSeedBox] = useState(false);
  const [showOldTV, setShowOldTV] = useState(false);
  const [showMemoryBox, setShowMemoryBox] = useState(false);
  const [showSecretDiary, setShowSecretDiary] = useState(false);
  // 외출 관련 상태
  const [showCommunityBoard, setShowCommunityBoard] = useState(false);
  const [showFountainChat, setShowFountainChat] = useState(false);
  const [showMailbox, setShowMailbox] = useState(false);
  const [showArcade, setShowArcade] = useState(false);
  const [showVisit, setShowVisit] = useState(false);
  // 서재 관련 상태
  const [showDiary, setShowDiary] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFortune, setShowFortune] = useState(false);
  // 다실 관련 상태
  const [showTeaCeremony, setShowTeaCeremony] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);
  const [showAmbiance, setShowAmbiance] = useState(false);

  const handleFireplaceClick = () => {
    setShowChat(true);
  };

  const handlePhotoAlbumClick = () => {
    setShowGuestbook(true);
  };

  const handleBookshelfClick = () => {
    setShowBookCollection(true);
  };

  const handleGlobeClick = () => {
    setShowKnowledgeMap(true);
  };

  const handleReadingDeskClick = () => {
    setShowDailyQuote(true);
  };

  const handleTelescopeClick = () => {
    setShowTelescope(true);
  };

  const handleConstellationBookClick = () => {
    setShowConstellationBook(true);
  };

  const handleResearchNoteClick = () => {
    setShowStarFortune(true);
  };

  const handlePlantBedClick = () => {
    setShowPlantManagement(true);
  };

  const handleWateringCanClick = () => {
    setShowWatering(true);
  };

  const handleSeedBoxClick = () => {
    setShowSeedBox(true);
  };

  const handleOldTVClick = () => {
    setShowOldTV(true);
  };

  const handleMemoryBoxClick = () => {
    setShowMemoryBox(true);
  };

  const handleSecretDiaryClick = () => {
    setShowSecretDiary(true);
  };

  // 외출 핸들러
  const handleBoardClick = () => setShowCommunityBoard(true);
  const handleFountainClick = () => setShowFountainChat(true);
  const handleMailboxClick = () => setShowMailbox(true);
  const handleArcadeClick = () => setShowArcade(true);
  const handleSignpostClick = () => setShowVisit(true);

  // 서재 핸들러
  const handleDeskLampClick = () => setShowDiary(true);
  const handleStudyBookshelfClick = () => setShowQuiz(true);
  const handleStudyGlobeClick = () => setShowFortune(true);

  // 다실 핸들러
  const handleTeaTableClick = () => setShowTeaCeremony(true);
  const handleScrollClick = () => setShowMeditation(true);
  const handleBrazierClick = () => setShowAmbiance(true);

  const renderRoom = () => {
    switch (currentRoom) {
      case '상점':
        return <ShopPage />;
      case '방 꾸미기':
        return <DecorPage />;
      case '다락방':
        return (
          <AtticRoom
            onOldTVClick={handleOldTVClick}
            onMemoryBoxClick={handleMemoryBoxClick}
            onSecretDiaryClick={handleSecretDiaryClick}
          />
        );
      case '거실':
        return (
          <LivingRoom
            onFireplaceClick={handleFireplaceClick}
            onPhotoAlbumClick={handlePhotoAlbumClick}
          />
        );
      case '도서관':
        return (
          <LibraryRoom
            onBookshelfClick={handleBookshelfClick}
            onGlobeClick={handleGlobeClick}
            onReadingDeskClick={handleReadingDeskClick}
          />
        );
      case '천문대':
        return (
          <ObservatoryRoom
            onTelescopeClick={handleTelescopeClick}
            onConstellationBookClick={handleConstellationBookClick}
            onResearchNoteClick={handleResearchNoteClick}
          />
        );
      case '온실':
        return (
          <GreenhouseRoom
            onPlantBedClick={handlePlantBedClick}
            onWateringCanClick={handleWateringCanClick}
            onSeedBoxClick={handleSeedBoxClick}
          />
        );
      case '외출':
        return (
          <OutsidePage
            onBoardClick={handleBoardClick}
            onFountainClick={handleFountainClick}
            onMailboxClick={handleMailboxClick}
            onArcadeClick={handleArcadeClick}
            onSignpostClick={handleSignpostClick}
          />
        );
      case '서재':
        return (
          <StudyRoom
            onDeskLampClick={handleDeskLampClick}
            onBookshelfClick={handleStudyBookshelfClick}
            onGlobeClick={handleStudyGlobeClick}
          />
        );
      case '다실':
        return (
          <TeaRoom
            onTeaTableClick={handleTeaTableClick}
            onScrollClick={handleScrollClick}
            onBrazierClick={handleBrazierClick}
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

      {/* Book Collection Popup */}
      {showBookCollection && (
        <BookCollectionPopup onClose={() => setShowBookCollection(false)} />
      )}

      {/* Knowledge Map Popup */}
      {showKnowledgeMap && (
        <KnowledgeMapPopup onClose={() => setShowKnowledgeMap(false)} />
      )}

      {/* Daily Quote Popup */}
      {showDailyQuote && (
        <DailyQuotePopup onClose={() => setShowDailyQuote(false)} />
      )}

      {/* Telescope Popup */}
      {showTelescope && (
        <TelescopePopup onClose={() => setShowTelescope(false)} />
      )}

      {/* Constellation Collection Popup */}
      {showConstellationBook && (
        <ConstellationCollectionPopup onClose={() => setShowConstellationBook(false)} />
      )}

      {/* Star Fortune Popup */}
      {showStarFortune && (
        <StarFortunePopup onClose={() => setShowStarFortune(false)} />
      )}

      {/* Plant Management Popup */}
      {showPlantManagement && (
        <PlantManagementPopup onClose={() => setShowPlantManagement(false)} />
      )}

      {/* Watering Popup */}
      {showWatering && (
        <WateringPopup onClose={() => setShowWatering(false)} />
      )}

      {/* Seed Box Popup */}
      {showSeedBox && (
        <SeedBoxPopup onClose={() => setShowSeedBox(false)} />
      )}

      {/* Old TV Popup */}
      {showOldTV && (
        <OldTVPopup onClose={() => setShowOldTV(false)} />
      )}

      {/* Memory Box Popup */}
      {showMemoryBox && (
        <MemoryBoxPopup onClose={() => setShowMemoryBox(false)} />
      )}

      {/* Secret Diary Popup */}
      {showSecretDiary && (
        <SecretDiaryPopup onClose={() => setShowSecretDiary(false)} />
      )}

      {/* Community Board Popup */}
      {showCommunityBoard && (
        <CommunityBoardPopup onClose={() => setShowCommunityBoard(false)} />
      )}

      {/* Fountain Chat Popup */}
      {showFountainChat && (
        <FountainChatPopup onClose={() => setShowFountainChat(false)} />
      )}

      {/* Mailbox Popup */}
      {showMailbox && (
        <MailboxPopup onClose={() => setShowMailbox(false)} />
      )}

      {/* Arcade Popup */}
      {showArcade && (
        <ArcadePopup onClose={() => setShowArcade(false)} />
      )}

      {/* Visit Popup */}
      {showVisit && (
        <VisitPopup onClose={() => setShowVisit(false)} />
      )}

      {/* Diary Popup (서재) */}
      {showDiary && (
        <DiaryPopup onClose={() => setShowDiary(false)} />
      )}

      {/* Quiz Popup (서재) */}
      {showQuiz && (
        <QuizPopup onClose={() => setShowQuiz(false)} />
      )}

      {/* Fortune Popup (서재) */}
      {showFortune && (
        <FortunePopup onClose={() => setShowFortune(false)} />
      )}

      {/* Tea Ceremony Popup (다실) */}
      {showTeaCeremony && (
        <TeaCeremonyPopup onClose={() => setShowTeaCeremony(false)} />
      )}

      {/* Meditation Popup (다실) */}
      {showMeditation && (
        <MeditationPopup onClose={() => setShowMeditation(false)} />
      )}

      {/* Ambiance Popup (다실) */}
      {showAmbiance && (
        <AmbiancePopup onClose={() => setShowAmbiance(false)} />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation
        currentRoom={currentRoom}
        onRoomChange={setCurrentRoom}
      />
    </div>
  );
}
