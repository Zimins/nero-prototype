import { RoomType } from '../App';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface RoomNavigationProps {
  currentRoom: RoomType;
  onRoomChange: (room: RoomType) => void;
}

const mainRooms: RoomType[] = [
  '거실',
  '다락방',
  '서재',
  '도서관',
  '천문대',
  '온실',
  '다실',
];

const subRooms: RoomType[] = [
  '채팅 공간',
  '방명록',
];

export function RoomNavigation({ currentRoom, onRoomChange }: RoomNavigationProps) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(true);

  return (
    <div className="flex flex-col gap-2">
      {/* Main Room - 거실 with sub-menu */}
      <div>
        <button
          onClick={() => {
            if (currentRoom !== '거실') {
              onRoomChange('거실');
            }
            setIsSubMenuOpen(!isSubMenuOpen);
          }}
          className={`h-[40px] w-[120px] border-2 border-black flex items-center justify-between px-3 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] ${
            currentRoom === '거실' ? 'bg-[#FFE093]' : 'bg-[#FFFACD]'
          }`}
          style={{
            transform: 'rotate(-1deg)',
          }}
        >
          <span>거실</span>
          {isSubMenuOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {/* Sub Rooms */}
        {isSubMenuOpen && (
          <div className="ml-[20px] mt-2 space-y-2">
            {subRooms.map((room, index) => (
              <button
                key={room}
                onClick={() => onRoomChange(room)}
                className={`h-[32px] w-[100px] border-2 border-black flex items-center justify-center text-sm transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] ${
                  currentRoom === room ? 'bg-[#FFE093]' : 'bg-[#FFF5BA]'
                }`}
                style={{
                  transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})`,
                }}
              >
                <span>{room}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Other Main Rooms */}
      {mainRooms.slice(1).map((room, index) => (
        <button
          key={room}
          onClick={() => onRoomChange(room)}
          className={`h-[40px] w-[120px] border-2 border-black flex items-center justify-center transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] ${
            currentRoom === room ? 'bg-[#FFE093]' : 'bg-[#FFFACD]'
          }`}
          style={{
            transform: `rotate(${index % 2 === 0 ? '1deg' : '-2deg'})`,
          }}
        >
          <span>{room}</span>
        </button>
      ))}
    </div>
  );
}