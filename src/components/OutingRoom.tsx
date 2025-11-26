import outingImage from '../assets/외출.jpg';

export function OutingRoom() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outing Background */}
      <div className="relative w-full h-full">
        <img
          src={outingImage}
          alt="외출"
          className="w-full h-full object-cover pixel-render"
        />
      </div>
    </div>
  );
}
