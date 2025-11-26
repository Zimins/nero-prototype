import observatoryImage from '../assets/천문대.png';

export function ObservatoryRoom() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Observatory Background */}
      <div className="relative w-full h-full">
        <img
          src={observatoryImage}
          alt="천문대"
          className="w-full h-full object-cover pixel-render"
        />
      </div>
    </div>
  );
}
