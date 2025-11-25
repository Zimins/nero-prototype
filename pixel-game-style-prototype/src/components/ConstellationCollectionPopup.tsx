import { useState } from 'react';
import { X, Book, Lock } from 'lucide-react';

interface ConstellationCollectionPopupProps {
  onClose: () => void;
}

interface Constellation {
  id: number;
  name: string;
  latinName: string;
  description: string;
  season: string;
  collected: boolean;
  stars: number;
}

const constellationsData: Constellation[] = [
  // Spring
  { id: 1, name: '사자자리', latinName: 'Leo', description: '용맹한 사자의 모습을 한 별자리', season: '봄', collected: true, stars: 9 },
  { id: 2, name: '처녀자리', latinName: 'Virgo', description: '정의의 여신을 상징하는 별자리', season: '봄', collected: false, stars: 15 },
  { id: 3, name: '목동자리', latinName: 'Boötes', description: '곰을 지키는 목동의 별자리', season: '봄', collected: true, stars: 7 },

  // Summer
  { id: 4, name: '백조자리', latinName: 'Cygnus', description: '날개를 펼친 백조의 모습', season: '여름', collected: true, stars: 9 },
  { id: 5, name: '전갈자리', latinName: 'Scorpius', description: '붉은 심장을 가진 전갈', season: '여름', collected: false, stars: 18 },
  { id: 6, name: '거문고자리', latinName: 'Lyra', description: '오르페우스의 악기를 본뜬 별자리', season: '여름', collected: true, stars: 5 },

  // Autumn
  { id: 7, name: '페가수스자리', latinName: 'Pegasus', description: '날개 달린 천마의 별자리', season: '가을', collected: false, stars: 15 },
  { id: 8, name: '안드로메다자리', latinName: 'Andromeda', description: '공주를 구한 영웅의 이야기', season: '가을', collected: true, stars: 16 },
  { id: 9, name: '물고기자리', latinName: 'Pisces', description: '두 마리 물고기가 리본으로 연결된 모습', season: '가을', collected: false, stars: 18 },

  // Winter
  { id: 10, name: '오리온자리', latinName: 'Orion', description: '겨울 밤하늘의 사냥꾼', season: '겨울', collected: true, stars: 10 },
  { id: 11, name: '큰개자리', latinName: 'Canis Major', description: '가장 밝은 별 시리우스를 품은 별자리', season: '겨울', collected: true, stars: 8 },
  { id: 12, name: '황소자리', latinName: 'Taurus', description: '돌진하는 황소의 형상', season: '겨울', collected: false, stars: 19 },

  // Special
  { id: 13, name: '북두칠성', latinName: 'Big Dipper', description: '북쪽 하늘의 길잡이', season: '특별', collected: true, stars: 7 },
  { id: 14, name: '카시오페이아', latinName: 'Cassiopeia', description: 'W자 모양의 왕비 별자리', season: '특별', collected: false, stars: 5 },
  { id: 15, name: '용자리', latinName: 'Draco', description: '북극성 주위를 도는 용', season: '특별', collected: false, stars: 17 },
];

export function ConstellationCollectionPopup({ onClose }: ConstellationCollectionPopupProps) {
  const [selectedSeason, setSelectedSeason] = useState('봄');
  const seasons = ['봄', '여름', '가을', '겨울', '특별'];

  const filteredConstellations = constellationsData.filter(
    (c) => c.season === selectedSeason
  );

  const collectedCount = constellationsData.filter((c) => c.collected).length;
  const totalCount = constellationsData.length;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70" onClick={onClose}>
      <div
        className="w-[700px] max-h-[700px] bg-[#1a0a2e] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#4a0080] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <Book size={20} className="pixel-icon" />
            <span className="text-[18px]">⭐ 별자리 도감</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-[#5a1090] p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Collection Progress */}
        <div className="bg-[#2a1050] text-white px-4 py-3 border-b-4 border-black">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px]">수집 진행도</span>
            <span className="text-[16px] text-yellow-300">{collectedCount}/{totalCount}</span>
          </div>
          <div className="w-full h-4 bg-[#1a0a2e] pixel-border-small overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#4a0080] to-[#8a4ac0] transition-all"
              style={{ width: `${(collectedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Season Tabs */}
        <div className="bg-[#2a1050] px-4 py-2 border-b-4 border-black flex gap-2">
          {seasons.map((season) => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`pixel-button px-4 py-2 text-[14px] transition-colors ${
                selectedSeason === season
                  ? 'bg-[#6a3fa0] text-white'
                  : 'bg-[#3a2060] text-[#c0a0e0] hover:bg-[#4a3070]'
              }`}
            >
              {season}
            </button>
          ))}
        </div>

        {/* Constellation Grid */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-[#1a0a2e] to-[#0a0520]">
          <div className="grid grid-cols-3 gap-4">
            {filteredConstellations.map((constellation) => (
              <div
                key={constellation.id}
                className={`pixel-border p-4 transition-all ${
                  constellation.collected
                    ? 'bg-[#2a1050] hover:bg-[#3a2060] cursor-pointer'
                    : 'bg-[#1a0a2e] opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Constellation Icon */}
                <div className="relative w-full h-32 mb-3 flex items-center justify-center">
                  {constellation.collected ? (
                    <div className="relative">
                      {/* Simple star pattern visualization */}
                      <div className="relative w-24 h-24">
                        {Array.from({ length: constellation.stars }).map((_, i) => {
                          const angle = (Math.PI * 2 * i) / constellation.stars;
                          const radius = 30 + Math.random() * 10;
                          const x = Math.cos(angle) * radius + 48;
                          const y = Math.sin(angle) * radius + 48;
                          return (
                            <div
                              key={i}
                              className="absolute w-2 h-2 rounded-full bg-white star-twinkle"
                              style={{
                                left: `${x}px`,
                                top: `${y}px`,
                                boxShadow: '0 0 5px white, 0 0 10px white',
                                animationDelay: `${i * 0.2}s`,
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Lock size={40} className="text-[#4a3070] mb-2" />
                      <span className="text-[12px] text-[#6a5090]">미발견</span>
                    </div>
                  )}
                </div>

                {/* Constellation Info */}
                <div className="text-center">
                  <div className={`text-[16px] font-bold mb-1 ${constellation.collected ? 'text-white' : 'text-[#6a5090]'}`}>
                    {constellation.name}
                  </div>
                  <div className={`text-[12px] mb-2 ${constellation.collected ? 'text-[#c0a0e0]' : 'text-[#4a3070]'}`}>
                    {constellation.latinName}
                  </div>
                  {constellation.collected && (
                    <div className="text-[12px] text-[#a080c0] leading-relaxed">
                      {constellation.description}
                    </div>
                  )}
                  {!constellation.collected && (
                    <div className="text-[12px] text-[#4a3070]">
                      ??? ??? ???
                    </div>
                  )}
                </div>

                {/* Star Count */}
                <div className="mt-3 text-center text-[12px] text-[#8a6ab0]">
                  {constellation.collected ? `⭐ ${constellation.stars}개의 별` : '???'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#4a0080] text-white text-center py-2 text-[12px] border-t-4 border-black">
          별자리를 수집하여 도감을 완성하세요
        </div>
      </div>
    </div>
  );
}
