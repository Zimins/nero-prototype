import { ImageWithFallback } from './figma/ImageWithFallback';
import atticRoomImage from 'figma:asset/906bd015a53489b1c86c385049849952546f708a.png';

export function AtticRoom() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Attic Room Background */}
      <div className="relative w-full h-full">
        <ImageWithFallback 
          src={atticRoomImage}
          alt="다락방"
          className="w-full h-full object-cover pixel-render"
        />
      </div>
    </div>
  );
}