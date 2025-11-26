import teaRoomImage from '../assets/다실.jpg';

export function TeaRoom() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Tea Room Background */}
      <div className="relative w-full h-full">
        <img
          src={teaRoomImage}
          alt="다실"
          className="w-full h-full object-cover pixel-render"
        />
      </div>
    </div>
  );
}
