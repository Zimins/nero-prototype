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

  // 이원주 수정: 현재 방이 거실의 서브룸인지 확인
  const isSubRoom = subRooms.includes(currentRoom);
  // 이원주 수정: 거실 또는 서브룸이 선택되었을 때 거실 탭을 활성화 상태로 표시
  const isLivingRoomActive = currentRoom === '거실' || isSubRoom;

  // 이원주 수정: 선택 여부에 따른 위치 스타일 (선택된 탭은 콘텐츠에 가깝게, 나머지는 우측 끝으로)
  const getPositionStyle = (isSelected: boolean, baseRotate: string) => ({
    marginLeft: isSelected ? '-70px' : '0px',
    transform: baseRotate,
    transition: 'margin-left 0.3s ease',
  });

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
            isLivingRoomActive ? 'bg-[#FFE093]' : 'bg-[#FFFACD]'
          }`}
          style={getPositionStyle(isLivingRoomActive, 'rotate(-1deg)')}
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
          <div className="mt-2 space-y-2">
            {subRooms.map((room, index) => (
              <button
                key={room}
                onClick={() => onRoomChange(room)}
                className={`h-[32px] w-[100px] border-2 border-black flex items-center justify-center text-sm transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] ${
                  currentRoom === room ? 'bg-[#FFE093]' : 'bg-[#FFF5BA]'
                }`}
                style={{
                  // 이원주 수정: 서브룸도 선택 여부에 따라 위치 변경
                  marginLeft: currentRoom === room ? '-50px' : '20px',
                  transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})`,
                  transition: 'margin-left 0.3s ease',
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
          style={getPositionStyle(currentRoom === room, `rotate(${index % 2 === 0 ? '1deg' : '-2deg'})`)}
        >
          <span>{room}</span>
        </button>
      ))}
    </div>
  );
}