import { useState } from 'react';
import { Palette, Music } from 'lucide-react';

interface DecorItem {
  id: number;
  name: string;
  type: 'playlist' | 'furniture' | 'wallpaper';
  description: string;
  owned: boolean;
  equipped: boolean;
}

export function DecorPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'playlist' | 'furniture' | 'wallpaper'>('all');
  const [items, setItems] = useState<DecorItem[]>([
    { 
      id: 1, 
      name: "8bit 클래식", 
      type: 'playlist',
      description: "쥬크박스에 장착된 플레이리스트",
      owned: true,
      equipped: true
    },
    { 
      id: 2, 
      name: "칩튠 재즈", 
      type: 'playlist',
      description: "레트로한 재즈 선율",
      owned: false,
      equipped: false
    },
    { 
      id: 3, 
      name: "빈티지 소파", 
      type: 'furniture',
      description: "아늑한 갈색 소파",
      owned: true,
      equipped: true
    },
    { 
      id: 4, 
      name: "책장", 
      type: 'furniture',
      description: "오래된 나무 책장",
      owned: true,
      equipped: false
    },
    { 
      id: 5, 
      name: "스트라이프 벽지", 
      type: 'wallpaper',
      description: "베이지 스트라이프 패턴",
      owned: true,
      equipped: true
    },
    { 
      id: 6, 
      name: "벽돌 벽지", 
      type: 'wallpaper',
      description: "빈티지 벽돌 패턴",
      owned: true,
      equipped: false
    },
  ]);

  const handleEquip = (item: DecorItem) => {
    if (!item.owned) return;

    setItems(items.map(i => {
      if (i.type === item.type) {
        return i.id === item.id 
          ? { ...i, equipped: true }
          : { ...i, equipped: false };
      }
      return i;
    }));
  };

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.type === selectedCategory);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'playlist': return '🎵';
      case 'furniture': return '🪑';
      case 'wallpaper': return '🎨';
      default: return '📦';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'playlist': return '플레이리스트';
      case 'furniture': return '가구';
      case 'wallpaper': return '벽지';
      default: return '기타';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#ebe1d1]">
      {/* Header */}
      <div className="bg-[#9b59b6] text-white p-6 border-b-4 border-black">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3">
            <Palette size={32} className="pixel-icon" />
            <div>
              <h1 className="text-[28px]">🎨 방 꾸미기</h1>
              <p className="text-[14px] text-[#e8d4f0] mt-1">보유한 아이템을 선택하여 방을 꾸며보세요</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-[#d4c4a8] border-b-4 border-black p-4">
        <div className="max-w-[1200px] mx-auto flex gap-3">
          {[
            { key: 'all', label: '전체', icon: '📦' },
            { key: 'playlist', label: '플레이리스트', icon: '🎵' },
            { key: 'furniture', label: '가구', icon: '🪑' },
            { key: 'wallpaper', label: '벽지', icon: '🎨' },
          ].map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key as any)}
              className={`pixel-button px-6 py-3 text-[16px] transition-all ${
                selectedCategory === category.key
                  ? 'bg-[#9b59b6] text-white border-4 border-black scale-105'
                  : 'bg-white hover:bg-[#ebe1d1] text-black border-2 border-black'
              }`}
            >
              {category.icon} {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-4 text-[14px] text-[#8b7355]">
            {selectedCategory === 'all' ? '모든 아이템' : getTypeLabel(selectedCategory)} ({filteredItems.length}개)
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className={`bg-white pixel-border p-5 transition-all ${
                  item.equipped ? 'border-[#9b59b6] border-4 shadow-lg' : ''
                } ${
                  !item.owned ? 'opacity-50' : 'hover:scale-105'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[24px]">{getTypeIcon(item.type)}</span>
                      <div>
                        <h3 className="text-[18px] text-black">{item.name}</h3>
                        <div className="text-[12px] text-[#8b7355]">{getTypeLabel(item.type)}</div>
                      </div>
                    </div>
                    <p className="text-[14px] text-[#8b7355] mt-2">{item.description}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t-2 border-[#e0d5c7]">
                  {!item.owned ? (
                    <div className="bg-gray-300 text-gray-600 px-4 py-2 pixel-border text-[14px] text-center">
                      미보유 아이템
                    </div>
                  ) : item.equipped ? (
                    <div className="bg-[#9b59b6] text-white px-4 py-2 pixel-border text-[14px] text-center">
                      ✓ 장착 중
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEquip(item)}
                      className="w-full pixel-button bg-[#3498db] hover:bg-[#2980b9] text-white px-4 py-2 text-[14px]"
                    >
                      장착하기
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-[#8b7355]">
              <Palette size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-[16px]">해당 카테고리에 아이템이 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Footer */}
      <div className="bg-[#c4b49a] border-t-4 border-black p-4">
        <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-4 text-center text-[14px] text-[#3a3a3a]">
          <div>
            <div className="mb-1">🎵 플레이리스트</div>
            <div className="text-[12px] text-[#8b7355]">쥬크박스 음악 변경</div>
          </div>
          <div>
            <div className="mb-1">🪑 가구</div>
            <div className="text-[12px] text-[#8b7355]">방 인테리어 변경</div>
          </div>
          <div>
            <div className="mb-1">🎨 벽지</div>
            <div className="text-[12px] text-[#8b7355]">배경 스타일 변경</div>
          </div>
        </div>
      </div>
    </div>
  );
}
