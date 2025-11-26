import libraryHallImage from '../assets/도서관.png';

export function LibraryHallRoom() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Library Hall Background */}
      <div className="relative w-full h-full">
        <img
          src={libraryHallImage}
          alt="도서관"
          className="w-full h-full object-cover pixel-render"
        />
      </div>
    </div>
  );
}
