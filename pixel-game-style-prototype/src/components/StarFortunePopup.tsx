import { useState, useEffect } from 'react';
import { X, Sparkles, Star } from 'lucide-react';

interface StarFortunePopupProps {
  onClose: () => void;
}

interface Fortune {
  zodiac: string;
  emoji: string;
  overall: number;
  love: number;
  money: number;
  health: number;
  luckyColor: string;
  luckyNumber: number;
  message: string;
}

const zodiacSigns = [
  { name: '양자리', emoji: '♈', period: '3.21-4.19' },
  { name: '황소자리', emoji: '♉', period: '4.20-5.20' },
  { name: '쌍둥이자리', emoji: '♊', period: '5.21-6.21' },
  { name: '게자리', emoji: '♋', period: '6.22-7.22' },
  { name: '사자자리', emoji: '♌', period: '7.23-8.22' },
  { name: '처녀자리', emoji: '♍', period: '8.23-9.22' },
  { name: '천칭자리', emoji: '♎', period: '9.23-10.23' },
  { name: '전갈자리', emoji: '♏', period: '10.24-11.22' },
  { name: '사수자리', emoji: '♐', period: '11.23-12.21' },
  { name: '염소자리', emoji: '♑', period: '12.22-1.19' },
  { name: '물병자리', emoji: '♒', period: '1.20-2.18' },
  { name: '물고기자리', emoji: '♓', period: '2.19-3.20' },
];

const fortuneMessages = [
  '오늘은 새로운 시작을 위한 완벽한 날입니다.',
  '주변 사람들과의 소통이 행운을 가져다 줄 것입니다.',
  '작은 변화가 큰 기쁨으로 돌아올 수 있는 날입니다.',
  '차분한 마음으로 하루를 보내면 좋은 일이 생길 것입니다.',
  '오늘 하루는 당신의 노력이 빛을 발하는 시간입니다.',
  '예상치 못한 행운이 찾아올 수 있으니 마음을 열어두세요.',
  '진심이 담긴 행동이 좋은 결과를 만들어낼 것입니다.',
  '오늘은 자신을 위한 시간을 가져보는 것은 어떨까요?',
];

const luckyColors = ['빨강', '파랑', '노랑', '초록', '보라', '주황', '분홍', '금색', '은색'];

export function StarFortunePopup({ onClose }: StarFortunePopupProps) {
  const [selectedZodiac, setSelectedZodiac] = useState(0);
  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [showFortune, setShowFortune] = useState(false);

  const generateFortune = () => {
    const zodiac = zodiacSigns[selectedZodiac];
    const newFortune: Fortune = {
      zodiac: zodiac.name,
      emoji: zodiac.emoji,
      overall: Math.floor(Math.random() * 3) + 3, // 3-5 stars
      love: Math.floor(Math.random() * 5) + 1, // 1-5 stars
      money: Math.floor(Math.random() * 5) + 1,
      health: Math.floor(Math.random() * 5) + 1,
      luckyColor: luckyColors[Math.floor(Math.random() * luckyColors.length)],
      luckyNumber: Math.floor(Math.random() * 99) + 1,
      message: fortuneMessages[Math.floor(Math.random() * fortuneMessages.length)],
    };
    setFortune(newFortune);
    setShowFortune(true);
  };

  const renderStars = (count: number, max: number = 5) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < count ? 'text-yellow-300 fill-yellow-300' : 'text-gray-600'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70" onClick={onClose}>
      <div
        className="w-[600px] max-h-[700px] bg-[#1a0a3e] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#6b3fa0] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="pixel-icon" />
            <span className="text-[18px]">🌟 오늘의 별점</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-[#7b4fb0] p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {!showFortune ? (
          <>
            {/* Zodiac Selection */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-[#1a0a3e] to-[#0a0520]">
              <div className="text-center mb-6">
                <h3 className="text-[20px] text-white mb-2">별자리를 선택하세요</h3>
                <p className="text-[14px] text-[#c0a0e0]">당신의 별자리는 무엇인가요?</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {zodiacSigns.map((zodiac, index) => (
                  <button
                    key={zodiac.name}
                    onClick={() => setSelectedZodiac(index)}
                    className={`pixel-border p-4 transition-all ${
                      selectedZodiac === index
                        ? 'bg-[#6b3fa0] text-white scale-105'
                        : 'bg-[#2a1050] text-[#c0a0e0] hover:bg-[#3a2060]'
                    }`}
                  >
                    <div className="text-[32px] mb-2">{zodiac.emoji}</div>
                    <div className="text-[14px] font-bold mb-1">{zodiac.name}</div>
                    <div className="text-[11px] opacity-70">{zodiac.period}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="bg-[#2a1050] px-4 py-4 border-t-4 border-black">
              <button
                onClick={generateFortune}
                className="w-full pixel-button bg-[#6b3fa0] hover:bg-[#7b4fb0] text-white py-3 text-[16px] flex items-center justify-center gap-2"
              >
                <Sparkles size={18} />
                운세 보기
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Fortune Display */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-[#1a0a3e] to-[#0a0520]">
              {fortune && (
                <div className="space-y-4">
                  {/* Zodiac Header */}
                  <div className="text-center bg-[#2a1050] pixel-border p-4">
                    <div className="text-[48px] mb-2">{fortune.emoji}</div>
                    <div className="text-[24px] text-white font-bold mb-1">{fortune.zodiac}</div>
                    <div className="text-[14px] text-[#c0a0e0]">
                      {new Date().toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>

                  {/* Overall Fortune */}
                  <div className="bg-[#2a1050] pixel-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[16px] text-white">✨ 종합 운세</span>
                      {renderStars(fortune.overall, 5)}
                    </div>
                    <div className="text-[14px] text-[#c0a0e0] leading-relaxed">
                      {fortune.message}
                    </div>
                  </div>

                  {/* Detailed Fortune */}
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-[#2a1050] pixel-border p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[14px] text-white">💕 연애운</span>
                        {renderStars(fortune.love)}
                      </div>
                    </div>

                    <div className="bg-[#2a1050] pixel-border p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[14px] text-white">💰 금전운</span>
                        {renderStars(fortune.money)}
                      </div>
                    </div>

                    <div className="bg-[#2a1050] pixel-border p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[14px] text-white">💪 건강운</span>
                        {renderStars(fortune.health)}
                      </div>
                    </div>
                  </div>

                  {/* Lucky Items */}
                  <div className="bg-[#2a1050] pixel-border p-4">
                    <div className="text-[16px] text-white mb-3">🍀 오늘의 행운</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[12px] text-[#a080c0]">행운의 색상</span>
                        <div className="text-[14px] text-white font-bold mt-1">{fortune.luckyColor}</div>
                      </div>
                      <div>
                        <span className="text-[12px] text-[#a080c0]">행운의 숫자</span>
                        <div className="text-[14px] text-white font-bold mt-1">{fortune.luckyNumber}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Back Button */}
            <div className="bg-[#2a1050] px-4 py-4 border-t-4 border-black">
              <button
                onClick={() => setShowFortune(false)}
                className="w-full pixel-button bg-[#4a3070] hover:bg-[#5a4080] text-white py-3 text-[14px]"
              >
                다른 별자리 보기
              </button>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="bg-[#6b3fa0] text-white text-center py-2 text-[12px] border-t-4 border-black">
          별이 전하는 오늘의 메시지
        </div>
      </div>
    </div>
  );
}
