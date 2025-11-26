import { useState } from 'react';
import { ShoppingCart, Music } from 'lucide-react';

interface Playlist {
  id: number;
  name: string;
  description: string;
  price: number;
  songs: number;
  owned: boolean;
}

export function ShopPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { 
      id: 1, 
      name: "8bit 클래식", 
      description: "픽셀 세계의 클래식 모음",
      price: 1000, 
      songs: 12,
      owned: true 
    },
    { 
      id: 2, 
      name: "칩튠 재즈", 
      description: "레트로한 재즈 선율",
      price: 1500, 
      songs: 15,
      owned: false 
    },
    { 
      id: 3, 
      name: "도트 팝송", 
      description: "신나는 픽셀 팝 음악",
      price: 1200, 
      songs: 10,
      owned: false 
    },
    { 
      id: 4, 
      name: "레트로 힐링", 
      description: "차분한 배경 음악",
      price: 1300, 
      songs: 18,
      owned: false 
    },
    { 
      id: 5, 
      name: "픽셀 어드벤처", 
      description: "모험을 떠나는 듯한 음악",
      price: 1400, 
      songs: 14,
      owned: false 
    },
    { 
      id: 6, 
      name: "8bit 로맨스", 
      description: "감성적인 픽셀 멜로디",
      price: 1100, 
      songs: 16,
      owned: false 
    },
  ]);

  const [coins, setCoins] = useState(5000);

  const handlePurchase = (playlist: Playlist) => {
    if (coins >= playlist.price && !playlist.owned) {
      setCoins(coins - playlist.price);
      setPlaylists(playlists.map(p => 
        p.id === playlist.id ? { ...p, owned: true } : p
      ));
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#ebe1d1]">
      {/* Header */}
      <div className="bg-[#8b7355] text-white p-6 border-b-4 border-black">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart size={32} className="pixel-icon" />
              <div>
                <h1 className="text-[28px]">🛍️ 플레이리스트 상점</h1>
                <p className="text-[14px] text-[#d4c4a8] mt-1">쥬크박스에서 재생할 플레이리스트를 구매하세요</p>
              </div>
            </div>
            <div className="bg-[#faed96] text-black px-6 py-3 pixel-border">
              <div className="text-[14px]">보유 코인</div>
              <div className="text-[24px]">💰 {coins.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div 
              key={playlist.id}
              className={`bg-white pixel-border p-5 transition-all hover:scale-105 ${
                playlist.owned ? 'border-[#27ae60] border-4' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Music size={20} className="text-[#8b7355]" />
                    <h3 className="text-[18px] text-black">{playlist.name}</h3>
                  </div>
                  <p className="text-[14px] text-[#8b7355] mb-3">{playlist.description}</p>
                  <div className="text-[12px] text-[#a89378]">
                    🎵 {playlist.songs}곡 수록
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-[#e0d5c7]">
                <div className="text-[20px] text-black">
                  💰 {playlist.price.toLocaleString()}
                </div>
                {playlist.owned ? (
                  <div className="bg-[#27ae60] text-white px-4 py-2 pixel-border text-[14px]">
                    ✓ 보유중
                  </div>
                ) : (
                  <button
                    onClick={() => handlePurchase(playlist)}
                    disabled={coins < playlist.price}
                    className={`pixel-button px-4 py-2 text-[14px] ${
                      coins < playlist.price
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-[#3498db] hover:bg-[#2980b9] text-white'
                    }`}
                  >
                    {coins < playlist.price ? '코인 부족' : '구매하기'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Footer */}
      <div className="bg-[#c4b49a] border-t-4 border-black p-4">
        <div className="max-w-[1200px] mx-auto text-center text-[14px] text-[#3a3a3a]">
          💡 구매한 플레이리스트는 쥬크박스에서 바로 재생할 수 있습니다
        </div>
      </div>
    </div>
  );
}
