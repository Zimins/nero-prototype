import libraryRoomImage from '../assets/서재.png';

export function LibraryRoom() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Library Room Background */}
      <div className="relative w-full h-full">
        <img
          src={libraryRoomImage}
          alt="서재"
          className="w-full h-full object-cover pixel-render"
        />
      </div>
    </div>
  );
}
