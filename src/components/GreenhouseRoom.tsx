import greenhouseImage from '../assets/온실1.jpg';

export function GreenhouseRoom() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Greenhouse Background */}
      <div className="relative w-full h-full">
        <img
          src={greenhouseImage}
          alt="온실"
          className="w-full h-full object-cover pixel-render"
        />
      </div>
    </div>
  );
}
