import { useState } from 'react';
import { X } from 'lucide-react';

interface Plant {
  id: string;
  name: string;
  stage: 'seed' | 'sprout' | 'growing' | 'blooming';
  progress: number;
  lastWatered: Date | null;
  plantedAt: Date;
}

interface PlantManagementPopupProps {
  onClose: () => void;
}

export function PlantManagementPopup({ onClose }: PlantManagementPopupProps) {
  const [activeTab, setActiveTab] = useState<'growing' | 'collection'>('growing');

  const [growingPlants, setGrowingPlants] = useState<Plant[]>([
    {
      id: '1',
      name: '장미',
      stage: 'blooming',
      progress: 100,
      lastWatered: new Date(Date.now() - 2 * 60 * 60 * 1000),
      plantedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      name: '해바라기',
      stage: 'growing',
      progress: 65,
      lastWatered: new Date(Date.now() - 5 * 60 * 60 * 1000),
      plantedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
    {
      id: '3',
      name: '튤립',
      stage: 'sprout',
      progress: 30,
      lastWatered: new Date(Date.now() - 1 * 60 * 60 * 1000),
      plantedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: '4',
      name: '선인장',
      stage: 'seed',
      progress: 10,
      lastWatered: null,
      plantedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ]);

  const [collectedPlants] = useState([
    { id: 'c1', name: '장미', icon: '🌹', count: 3 },
    { id: 'c2', name: '해바라기', icon: '🌻', count: 2 },
    { id: 'c3', name: '튤립', icon: '🌷', count: 5 },
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

  const getStageText = (stage: Plant['stage']) => {
    switch (stage) {
      case 'seed':
        return '씨앗';
      case 'sprout':
        return '새싹';
      case 'growing':
        return '성장 중';
      case 'blooming':
        return '개화';
    }
  };

  const handleHarvest = (plantId: string) => {
    setGrowingPlants(plants => plants.filter(p => p.id !== plantId));
    // TODO: Add to collected plants and give rewards
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
      <div className="bg-[#ebe1d1] pixel-border w-full max-w-[800px] max-h-[600px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-[#27ae60] text-white p-4 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <span className="text-[24px]">🌱</span>
            <h2 className="text-[24px]">나의 정원</h2>
          </div>
          <button
            onClick={onClose}
            className="pixel-button bg-white/20 hover:bg-white/30 p-2"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b-4 border-black bg-[#d4c4a8]">
          <button
            onClick={() => setActiveTab('growing')}
            className={`flex-1 px-6 py-3 text-[18px] transition-colors ${
              activeTab === 'growing'
                ? 'bg-[#ebe1d1] text-black border-r-4 border-black'
                : 'bg-[#c4b49a] text-[#666] hover:bg-[#d4c4a8]'
            }`}
          >
            키우는 중 ({growingPlants.length})
          </button>
          <button
            onClick={() => setActiveTab('collection')}
            className={`flex-1 px-6 py-3 text-[18px] transition-colors ${
              activeTab === 'collection'
                ? 'bg-[#ebe1d1] text-black border-l-4 border-black'
                : 'bg-[#c4b49a] text-[#666] hover:bg-[#d4c4a8]'
            }`}
          >
            수집 도감 ({collectedPlants.length})
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'growing' ? (
            <div className="grid grid-cols-2 gap-4">
              {growingPlants.length === 0 ? (
                <div className="col-span-2 text-center py-12 text-[#8b7355]">
                  <div className="text-[48px] mb-4">🌱</div>
                  <p className="text-[18px]">키우는 식물이 없습니다</p>
                  <p className="text-[14px] mt-2">씨앗 상자에서 새 식물을 심어보세요!</p>
                </div>
              ) : (
                growingPlants.map((plant) => (
                  <div
                    key={plant.id}
                    className="bg-white pixel-border p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[32px]">{getStageIcon(plant.stage)}</span>
                        <div>
                          <h3 className="text-[16px] text-black font-bold">{plant.name}</h3>
                          <p className="text-[12px] text-[#8b7355]">{getStageText(plant.stage)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-[12px] text-[#8b7355] mb-1">
                        <span>성장</span>
                        <span>{plant.progress}%</span>
                      </div>
                      <div className="w-full h-3 bg-[#d4c4a8] pixel-border-small overflow-hidden">
                        <div
                          className="h-full bg-[#27ae60] transition-all duration-500"
                          style={{ width: `${plant.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <div className="text-[12px] text-[#8b7355] mb-3">
                      <div>💧 마지막 물주기: {getTimeSinceWatered(plant.lastWatered)}</div>
                    </div>

                    {/* Action Button */}
                    {plant.progress >= 100 ? (
                      <button
                        onClick={() => handleHarvest(plant.id)}
                        className="pixel-button w-full bg-[#f39c12] hover:bg-[#e67e22] text-white py-2 text-[14px]"
                      >
                        ✓ 수확하기
                      </button>
                    ) : (
                      <div className="text-center text-[12px] text-[#8b7355] py-2 bg-[#ebe1d1] rounded">
                        성장 중...
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {collectedPlants.map((plant) => (
                <div
                  key={plant.id}
                  className="bg-white pixel-border p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-[48px] mb-2">{plant.icon}</div>
                  <h3 className="text-[16px] text-black font-bold mb-1">{plant.name}</h3>
                  <div className="text-[14px] text-[#8b7355]">수확: {plant.count}회</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#c4b49a] border-t-4 border-black p-4">
          <div className="text-center text-[14px] text-[#3a3a3a]">
            💡 식물에 정기적으로 물을 주면 더 빨리 자랍니다
          </div>
        </div>
      </div>
    </div>
  );
}
