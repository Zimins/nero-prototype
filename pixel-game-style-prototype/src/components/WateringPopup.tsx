import { useState } from 'react';
import { X, Droplets } from 'lucide-react';

interface Plant {
  id: string;
  name: string;
  stage: 'seed' | 'sprout' | 'growing' | 'blooming';
  progress: number;
  lastWatered: Date | null;
  needsWater: boolean;
}

interface WateringPopupProps {
  onClose: () => void;
}

export function WateringPopup({ onClose }: WateringPopupProps) {
  const [waterAmount, setWaterAmount] = useState(80);
  const maxWater = 100;
  const [showEffect, setShowEffect] = useState<string | null>(null);

  const [plants, setPlants] = useState<Plant[]>([
    {
      id: '1',
      name: '장미',
      stage: 'blooming',
      progress: 95,
      lastWatered: new Date(Date.now() - 6 * 60 * 60 * 1000),
      needsWater: true,
    },
    {
      id: '2',
      name: '해바라기',
      stage: 'growing',
      progress: 60,
      lastWatered: new Date(Date.now() - 8 * 60 * 60 * 1000),
      needsWater: true,
    },
    {
      id: '3',
      name: '튤립',
      stage: 'sprout',
      progress: 25,
      lastWatered: new Date(Date.now() - 1 * 60 * 60 * 1000),
      needsWater: false,
    },
    {
      id: '4',
      name: '선인장',
      stage: 'seed',
      progress: 5,
      lastWatered: null,
      needsWater: true,
    },
  ]);

  const getStageIcon = (stage: Plant['stage']) => {
    switch (stage) {
      case 'seed':
        return '🌰';
      case 'sprout':
        return '🌱';
      case 'growing':
        return '🌿';
      case 'blooming':
        return '🌸';
    }
  };

  const handleWater = (plantId: string) => {
    const waterCost = 10;

    if (waterAmount < waterCost) {
      alert('물이 부족합니다!');
      return;
    }

    setPlants(plants.map(plant => {
      if (plant.id === plantId) {
        return {
          ...plant,
          lastWatered: new Date(),
          needsWater: false,
          progress: Math.min(100, plant.progress + 5),
        };
      }
      return plant;
    }));

    setWaterAmount(prev => Math.max(0, prev - waterCost));
    setShowEffect(plantId);

    setTimeout(() => {
      setShowEffect(null);
    }, 1500);
  };

  const handleRefillWater = () => {
    setWaterAmount(maxWater);
  };

  const getTimeSinceWatered = (lastWatered: Date | null) => {
    if (!lastWatered) return '물 없음';

    const hours = Math.floor((Date.now() - lastWatered.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return '방금 전';
    if (hours < 24) return `${hours}시간 전`;
    const days = Math.floor(hours / 24);
    return `${days}일 전`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-[#ebe1d1] pixel-border w-full max-w-[700px] max-h-[600px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-[#3498db] text-white p-4 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <span className="text-[24px]">💧</span>
            <h2 className="text-[24px]">물주기</h2>
          </div>
          <button
            onClick={onClose}
            className="pixel-button bg-white/20 hover:bg-white/30 p-2"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Water Gauge */}
        <div className="bg-[#d4c4a8] p-4 border-b-4 border-black">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Droplets size={20} className="text-[#3498db]" />
              <span className="text-[16px] text-black">물통</span>
            </div>
            <span className="text-[18px] text-black">
              {waterAmount} / {maxWater}
            </span>
          </div>
          <div className="w-full h-6 bg-[#ebe1d1] pixel-border-small overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-[#3498db] to-[#2980b9] transition-all duration-500"
              style={{ width: `${(waterAmount / maxWater) * 100}%` }}
            />
          </div>
          <button
            onClick={handleRefillWater}
            className="pixel-button w-full bg-[#3498db] hover:bg-[#2980b9] text-white py-2 text-[14px]"
            disabled={waterAmount === maxWater}
          >
            {waterAmount === maxWater ? '물통이 가득 찼습니다' : '💧 물통 채우기'}
          </button>
        </div>

        {/* Plant List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {plants.length === 0 ? (
              <div className="text-center py-12 text-[#8b7355]">
                <div className="text-[48px] mb-4">🌱</div>
                <p className="text-[18px]">물을 줄 식물이 없습니다</p>
              </div>
            ) : (
              plants.map((plant) => (
                <div
                  key={plant.id}
                  className={`bg-white pixel-border p-4 flex items-center justify-between hover:shadow-lg transition-all ${
                    showEffect === plant.id ? 'bg-blue-50 scale-105' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-[32px]">{getStageIcon(plant.stage)}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[16px] text-black font-bold">{plant.name}</h3>
                        {plant.needsWater && (
                          <span className="text-[12px] bg-[#e74c3c] text-white px-2 py-0.5 rounded pixel-border-small">
                            물 필요
                          </span>
                        )}
                      </div>
                      <div className="text-[12px] text-[#8b7355]">
                        💧 마지막 물주기: {getTimeSinceWatered(plant.lastWatered)}
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-[10px] text-[#8b7355] mb-1">
                          <span>성장</span>
                          <span>{plant.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#d4c4a8] pixel-border-small overflow-hidden">
                          <div
                            className="h-full bg-[#27ae60] transition-all duration-500"
                            style={{ width: `${plant.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleWater(plant.id)}
                    disabled={!plant.needsWater || waterAmount < 10}
                    className={`pixel-button px-4 py-2 text-[14px] ml-4 ${
                      !plant.needsWater
                        ? 'bg-[#27ae60] text-white cursor-default'
                        : waterAmount < 10
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-[#3498db] hover:bg-[#2980b9] text-white'
                    }`}
                  >
                    {!plant.needsWater ? '✓ 완료' : '물주기'}
                  </button>

                  {showEffect === plant.id && (
                    <div className="absolute top-0 right-0 text-[24px] animate-bounce">
                      💧+5%
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#c4b49a] border-t-4 border-black p-4">
          <div className="text-center text-[14px] text-[#3a3a3a]">
            💡 물주기 1회당 성장도 +5% | 6시간마다 물이 필요합니다
          </div>
        </div>
      </div>
    </div>
  );
}
