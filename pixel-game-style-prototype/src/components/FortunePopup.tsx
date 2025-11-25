import { useState, useEffect } from 'react';
import { X, Star, Music, Sparkles } from 'lucide-react';

interface FortunePopupProps {
  onClose: () => void;
}

interface Fortune {
  stars: number;
  message: string;
  luckyGenre: string;
  recommendedSong: string;
}

const FORTUNES: Fortune[] = [
  {
    stars: 5,
    message: '오늘은 최고의 날입니다! 새로운 도전을 시작하기에 완벽한 시간이에요. 당신의 모든 노력이 빛을 발할 것입니다.',
    luckyGenre: 'K-POP',
    recommendedSong: 'Dynamite - BTS',
  },
  {
    stars: 4,
    message: '긍정적인 에너지가 가득한 하루입니다. 주변 사람들과의 관계가 더욱 돈독해질 거예요.',
    luckyGenre: 'Pop',
    recommendedSong: 'Happy - Pharrell Williams',
  },
  {
    stars: 3,
    message: '평온한 하루가 될 것입니다. 조금의 여유를 가지고 자신을 돌아보는 시간을 가져보세요.',
    luckyGenre: 'Jazz',
    recommendedSong: 'Fly Me to the Moon - Frank Sinatra',
  },
  {
    stars: 4,
    message: '창의력이 샘솟는 날입니다! 새로운 아이디어가 떠오를 거예요. 메모를 준비하세요.',
    luckyGenre: 'Electronic',
    recommendedSong: 'Levels - Avicii',
  },
  {
    stars: 5,
    message: '행운의 여신이 함께합니다. 오늘 하루는 무엇을 하든 잘 풀릴 것입니다!',
    luckyGenre: 'Rock',
    recommendedSong: "Don't Stop Believin' - Journey",
  },
  {
    stars: 3,
    message: '침착함을 유지하세요. 작은 일에 흔들리지 않는다면 좋은 결과가 있을 거예요.',
    luckyGenre: 'Classical',
    recommendedSong: 'Canon in D - Pachelbel',
  },
  {
    stars: 4,
    message: '소통의 날입니다. 중요한 이야기를 나누거나 연락이 끊긴 친구에게 먼저 연락해보세요.',
    luckyGenre: 'R&B',
    recommendedSong: 'Stand By Me - Ben E. King',
  },
  {
    stars: 5,
    message: '당신의 매력이 빛나는 날입니다. 자신감을 가지고 하루를 시작하세요!',
    luckyGenre: 'Hip Hop',
    recommendedSong: 'Good Life - Kanye West',
  },
];

export function FortunePopup({ onClose }: FortunePopupProps) {
  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    // Check if fortune was already revealed today
    const today = new Date().toISOString().split('T')[0];
    const savedData = localStorage.getItem('fortune_data');

    if (savedData) {
      const { date, fortune: savedFortune } = JSON.parse(savedData);
      if (date === today) {
        setFortune(savedFortune);
        return;
      }
    }

    // Generate new fortune
    revealFortune();
  }, []);

  const revealFortune = () => {
    setIsRevealing(true);

    // Random selection with animation delay
    setTimeout(() => {
      const randomFortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
      setFortune(randomFortune);

      // Save to localStorage
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('fortune_data', JSON.stringify({
        date: today,
        fortune: randomFortune,
      }));

      setIsRevealing(false);
    }, 1500);
  };

  const renderStars = (count: number) => {
    return (
      <div className="flex gap-1 justify-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={24}
            className={index < count ? 'text-[#faed96] fill-[#faed96]' : 'text-gray-400'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-[600px] max-h-[700px] bg-[#d4c4a8] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#17a2b8] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="pixel-icon" />
            <span className="text-[18px]">🔮 오늘의 운세</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-[#138496] p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#ebe1d1]">
          {isRevealing ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
              <div className="text-[64px] animate-pulse">🔮</div>
              <div className="text-[18px] text-[#8b7355]">운세를 점치는 중...</div>
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-[#17a2b8] rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          ) : fortune ? (
            <div className="space-y-6">
              {/* Stars */}
              <div className="bg-white pixel-border p-6">
                <div className="text-[14px] text-[#8b7355] text-center mb-3">오늘의 운세 지수</div>
                {renderStars(fortune.stars)}
                <div className="text-center mt-3 text-[12px] text-[#8b7355]">
                  {fortune.stars === 5 ? '최상' : fortune.stars === 4 ? '좋음' : '보통'}
                </div>
              </div>

              {/* Fortune Message */}
              <div className="bg-white pixel-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={18} className="text-[#17a2b8]" />
                  <div className="text-[16px] text-black">오늘의 메시지</div>
                </div>
                <div className="text-[14px] text-[#3a3a3a] leading-relaxed whitespace-pre-wrap">
                  {fortune.message}
                </div>
              </div>

              {/* Lucky Genre */}
              <div className="bg-white pixel-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Music size={18} className="text-[#17a2b8]" />
                  <div className="text-[16px] text-black">행운의 장르</div>
                </div>
                <div className="bg-[#17a2b8] text-white px-4 py-2 text-center pixel-border-small">
                  <span className="text-[18px]">{fortune.luckyGenre}</span>
                </div>
              </div>

              {/* Recommended Song */}
              <div className="bg-[#faed96] pixel-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star size={18} className="text-[#d4af37]" />
                  <div className="text-[16px] text-black">오늘의 추천곡</div>
                </div>
                <div className="text-center">
                  <div className="text-[16px] text-black mb-2">🎵</div>
                  <div className="text-[14px] text-[#3a3a3a]">{fortune.recommendedSong}</div>
                </div>
                <div className="mt-4 text-[12px] text-[#8b7355] text-center">
                  이 노래를 들으면 행운이 따를 거예요!
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-[18px] text-[#8b7355]">운세를 불러오는 중...</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#17a2b8] text-white text-center py-3 text-[12px] border-t-4 border-black">
          <div>오늘의 운세는 하루에 한 번만 확인할 수 있습니다</div>
          <div className="text-[10px] mt-1 opacity-80">매일 자정에 새로운 운세가 업데이트됩니다</div>
        </div>
      </div>
    </div>
  );
}
