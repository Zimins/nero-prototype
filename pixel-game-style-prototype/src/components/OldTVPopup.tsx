import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Tv } from 'lucide-react';

interface OldTVPopupProps {
  onClose: () => void;
}

interface VideoItem {
  id: number;
  title: string;
  date: string;
  description: string;
}

export function OldTVPopup({ onClose }: OldTVPopupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const videos: VideoItem[] = [
    {
      id: 1,
      title: "첫 번째 여름 방학",
      date: "2010.07.15",
      description: "할머니 댁에서 보낸 여름. 매미 소리와 수박의 추억이 가득했던 그 날들..."
    },
    {
      id: 2,
      title: "학창 시절의 축제",
      date: "2012.10.20",
      description: "친구들과 함께한 학교 축제. 밴드 공연과 먹거리의 향연, 지금도 생생한 그 순간."
    },
    {
      id: 3,
      title: "첫 자전거 여행",
      date: "2014.05.05",
      description: "한강을 따라 달린 첫 자전거 여행. 바람을 가르며 느낀 자유로움이 기억에 남아있다."
    },
    {
      id: 4,
      title: "가족 여행 제주도",
      date: "2015.08.10",
      description: "가족과 함께 떠난 제주도 여행. 푸른 바다와 맛있는 음식, 함께한 시간들이 소중했다."
    },
    {
      id: 5,
      title: "졸업식 날",
      date: "2016.02.14",
      description: "학교를 떠나는 날. 눈물과 웃음이 교차했던 순간, 새로운 시작을 꿈꾸던 그 날."
    },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
  };

  const currentVideo = videos[currentIndex];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-[600px] max-h-[700px] bg-[#2c2c2c] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#9b59b6] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <Tv size={20} className="pixel-icon" />
            <span className="text-[18px]">📺 추억의 영상관</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-[#8e44ad] p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* TV Screen with Scanline Effect */}
        <div className="flex-1 bg-[#1a1a1a] p-6 relative overflow-hidden">
          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none scanline-effect" />

          {/* Video Display */}
          <div className="relative h-full flex flex-col">
            {/* Screen Border */}
            <div className="flex-1 bg-[#0a0a0a] pixel-border p-6 flex flex-col justify-between">
              {/* Video Info */}
              <div className="text-[#00ff00] space-y-4">
                <div className="text-center text-[20px] mb-6 font-bold">
                  {currentVideo.title}
                </div>
                <div className="text-[14px] opacity-80 text-center mb-4">
                  📅 {currentVideo.date}
                </div>
                <div className="text-[14px] leading-relaxed text-center px-4">
                  {currentVideo.description}
                </div>
              </div>

              {/* Video Counter */}
              <div className="text-center text-[#00cc00] text-[12px] mt-6">
                [ {currentIndex + 1} / {videos.length} ]
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={handlePrevious}
                className="pixel-button bg-[#8e44ad] hover:bg-[#7d3c98] text-white p-3 flex items-center gap-2"
                aria-label="이전"
              >
                <ChevronLeft size={20} />
                <span className="text-[14px]">이전</span>
              </button>
              <div className="text-[#00ff00] text-[16px] min-w-[100px] text-center">
                {currentVideo.id}/{videos.length}
              </div>
              <button
                onClick={handleNext}
                className="pixel-button bg-[#8e44ad] hover:bg-[#7d3c98] text-white p-3 flex items-center gap-2"
                aria-label="다음"
              >
                <span className="text-[14px]">다음</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#9b59b6] text-white text-center py-2 text-[12px] border-t-4 border-black">
          레트로 TV로 추억을 회상하세요
        </div>
      </div>

      {/* Scanline Effect CSS */}
      <style>{`
        .scanline-effect {
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.1) 0px,
            rgba(0, 0, 0, 0.1) 1px,
            transparent 1px,
            transparent 2px
          );
          animation: scanline 8s linear infinite;
        }

        @keyframes scanline {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(4px);
          }
        }
      `}</style>
    </div>
  );
}
