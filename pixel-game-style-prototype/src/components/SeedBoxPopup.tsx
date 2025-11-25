import { useState } from 'react';
import { X, Leaf } from 'lucide-react';

interface PlantType {
  id: string;
  name: string;
  icon: string;
  growthDays: number;
  reward: number;
  owned: number;
}

interface SeedBoxPopupProps {
  onClose: () => void;
}

export function SeedBoxPopup({ onClose }: SeedBoxPopupProps) {
  const [seeds, setSeeds] = useState<PlantType[]>([
    {
      id: '1',
      name: '장미',
      icon: '🌹',
      growthDays: 7,
      reward: 100,
      owned: 5,
    },
    {
      id: '2',
      name: '해바라기',
      icon: '🌻',
      growthDays: 5,
      reward: 80,
      owned: 3,
    },
    {
      id: '3',
      name: '튤립',
      icon: '🌷',
      growthDays: 6,
      reward: 90,
      owned: 8,
    },
    {
      id: '4',
      name: '선인장',
      icon: '🌵',
      growthDays: 10,
      reward: 150,
      owned: 2,
    },
    {
      id: '5',
      name: '라벤더',
      icon: '💜',
      growthDays: 8,
      reward: 120,
      owned: 0,
    },
    {
      id: '6',
      name: '국화',
      icon: '🌼',
      growthDays: 6,
      reward: 95,
      owned: 4,
    },
  ]);

  const [plantingSlots] = useState(6); // Maximum plants that can be growing at once
  const [currentPlants] = useState(4); // Currently growing plants

  const handlePlant = (seedId: string) => {
    if (currentPlants >= plantingSlots) {
      alert('화분대가 가득 찼습니다! 식물을 수확한 후 다시 시도해주세요.');
      return;
    }

    const seed = seeds.find(s => s.id === seedId);
    if (!seed || seed.owned <= 0) {
      alert('씨앗이 부족합니다!');
      return;
    }

    setSeeds(seeds.map(s =>
      s.id === seedId ? { ...s, owned: s.owned - 1 } : s
    ));

    // TODO: Add plant to growing list
    alert(`${seed.name} 씨앗을 심었습니다!`);
  };

  const availableSlots = plantingSlots - currentPlants;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-[#ebe1d1] pixel-border w-full max-w-[800px] max-h-[650px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-[#f39c12] text-white p-4 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <span className="text-[24px]">🌱</span>
            <h2 className="text-[24px]">씨앗 상자</h2>
          </div>
          <button
            onClick={onClose}
            className="pixel-button bg-white/20 hover:bg-white/30 p-2"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Planting Slots Info */}
        <div className="bg-[#d4c4a8] p-4 border-b-4 border-black">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf size={20} className="text-[#27ae60]" />
              <span className="text-[16px] text-black">화분대 슬롯</span>
            </div>
            <span className="text-[18px] text-black">
              {currentPlants} / {plantingSlots}
            </span>
          </div>
          <div className="w-full h-4 bg-[#ebe1d1] pixel-border-small overflow-hidden mt-2">
            <div
              className="h-full bg-[#27ae60] transition-all duration-500"
              style={{ width: `${(currentPlants / plantingSlots) * 100}%` }}
            />
          </div>
          <p className="text-[12px] text-[#8b7355] mt-2">
            {availableSlots > 0
              ? `🌱 ${availableSlots}개 슬롯 사용 가능`
              : '⚠️ 슬롯이 가득 찼습니다. 식물을 수확해주세요.'}
          </p>
        </div>

        {/* Seed Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4">
            {seeds.map((seed) => (
              <div
                key={seed.id}
                className={`bg-white pixel-border p-4 transition-all ${
                  seed.owned > 0 ? 'hover:shadow-lg' : 'opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-[48px]">{seed.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[18px] text-black font-bold">{seed.name}</h3>
                      <div className="bg-[#faed96] px-3 py-1 pixel-border-small">
                        <span className="text-[14px] text-black">x{seed.owned}</span>
                      </div>
                    </div>

                    <div className="space-y-1 mb-3 text-[14px] text-[#8b7355]">
                      <div className="flex items-center gap-2">
                        <span>⏱️</span>
                        <span>성장 기간: {seed.growthDays}일</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>💰</span>
                        <span>수확 보상: {seed.reward} 코인</span>
                      </div>
                    </div>

                    {seed.owned > 0 ? (
                      <button
                        onClick={() => handlePlant(seed.id)}
                        disabled={availableSlots <= 0}
                        className={`pixel-button w-full py-2 text-[14px] ${
                          availableSlots <= 0
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                            : 'bg-[#27ae60] hover:bg-[#229954] text-white'
                        }`}
                      >
                        {availableSlots <= 0 ? '슬롯 없음' : '🌱 심기'}
                      </button>
                    ) : (
                      <div className="text-center text-[14px] text-[#e74c3c] py-2 bg-[#ebe1d1] rounded pixel-border-small">
                        씨앗 없음
                      </div>
                    )}
                  </div>
                </div>

                {/* Rarity Badge */}
                {seed.growthDays >= 8 && (
                  <div className="mt-3 text-center">
                    <span className="inline-block bg-gradient-to-r from-[#f39c12] to-[#e67e22] text-white px-3 py-1 text-[12px] pixel-border-small">
                      ⭐ 레어
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#c4b49a] border-t-4 border-black p-4">
          <div className="text-center text-[14px] text-[#3a3a3a]">
            💡 씨앗은 상점에서 구매하거나 이벤트로 획득할 수 있습니다
          </div>
        </div>
      </div>
    </div>
  );
}
