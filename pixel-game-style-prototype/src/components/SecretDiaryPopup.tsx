import { useState } from 'react';
import { X, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

interface SecretDiaryPopupProps {
  onClose: () => void;
}

interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  mood: string;
  content: string;
}

export function SecretDiaryPopup({ onClose }: SecretDiaryPopupProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const diaryEntries: DiaryEntry[] = [
    {
      id: 1,
      date: "2024.01.15",
      weather: "☀️ 맑음",
      mood: "😊 행복",
      content: "오늘은 정말 좋은 하루였다. 오랜만에 친구들을 만나 즐거운 시간을 보냈다. 맛있는 음식도 먹고, 웃으면서 이야기를 나누니 스트레스가 다 풀리는 것 같았다. 이런 날이 자주 있었으면 좋겠다."
    },
    {
      id: 2,
      date: "2024.03.22",
      weather: "🌸 봄날",
      mood: "🥰 설렘",
      content: "벚꽃이 만개했다. 혼자 산책하면서 벚꽃을 보니 마음이 평화로워졌다. 새로운 시작을 준비하는 이 계절이 항상 좋다. 올해는 꼭 계획했던 일들을 이루고 싶다."
    },
    {
      id: 3,
      date: "2024.06.10",
      weather: "☔ 비",
      mood: "😌 차분함",
      content: "비 오는 날의 감성. 창밖을 바라보며 커피를 마시는 이 시간이 좋다. 빗소리를 들으면서 책을 읽으니 집중도 잘 되고 마음도 편안하다. 가끔은 이런 여유로운 시간이 필요하다."
    },
    {
      id: 4,
      date: "2024.08.05",
      weather: "🌊 더움",
      mood: "😎 상쾌",
      content: "여름 바다에 다녀왔다. 파도 소리와 시원한 바람이 정말 좋았다. 발을 적시며 걷는 것만으로도 힐링이 되었다. 다음에는 친구들과 함께 오고 싶다."
    },
    {
      id: 5,
      date: "2024.10.20",
      weather: "🍂 가을",
      mood: "🤔 사색",
      content: "단풍이 물들어가는 계절. 올해도 어느덧 끝나가고 있다. 돌아보니 아쉬운 것도 많고 잘한 것도 있다. 남은 시간 후회 없이 열심히 살아야겠다."
    },
    {
      id: 6,
      date: "2024.12.24",
      weather: "❄️ 눈",
      mood: "🎄 따뜻함",
      content: "크리스마스 이브. 첫눈이 내렸다. 가족들과 함께 따뜻한 저녁을 먹으며 올해를 마무리했다. 내년에는 더 행복한 일들이 가득하기를 바란다."
    },
  ];

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : diaryEntries.length - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < diaryEntries.length - 1 ? prev + 1 : 0));
  };

  const currentEntry = diaryEntries[currentPage];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-[600px] max-h-[700px] bg-[#faed96] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#17a2b8] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="pixel-icon" />
            <span className="text-[18px]">📖 비밀 일기장</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-[#138496] p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Diary Page */}
        <div className="flex-1 bg-[#faed96] p-6 relative overflow-hidden">
          {/* Paper Texture Effect */}
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 24px,
                #8b7355 24px,
                #8b7355 25px
              )`
            }}
          />

          {/* Diary Content */}
          <div className="relative h-full flex flex-col">
            {/* Entry Header */}
            <div className="border-b-2 border-[#d4af37] pb-3 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[18px] text-black font-bold">
                  {currentEntry.date}
                </span>
                <div className="flex gap-3 text-[14px]">
                  <span>{currentEntry.weather}</span>
                  <span>{currentEntry.mood}</span>
                </div>
              </div>
            </div>

            {/* Entry Content */}
            <div className="flex-1 text-[16px] text-black leading-relaxed whitespace-pre-wrap">
              {currentEntry.content}
            </div>

            {/* Page Number */}
            <div className="text-center text-[12px] text-[#8b7355] mt-4">
              페이지 {currentPage + 1} / {diaryEntries.length}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-[#d4af37]">
              <button
                onClick={handlePreviousPage}
                className="pixel-button bg-[#17a2b8] hover:bg-[#138496] text-white px-4 py-2 flex items-center gap-2"
                aria-label="이전 페이지"
              >
                <ChevronLeft size={18} />
                <span className="text-[14px]">이전</span>
              </button>

              <div className="flex gap-2">
                {diaryEntries.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentPage
                        ? 'bg-[#17a2b8] w-6'
                        : 'bg-[#8b7355] opacity-50'
                    }`}
                    aria-label={`페이지 ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextPage}
                className="pixel-button bg-[#17a2b8] hover:bg-[#138496] text-white px-4 py-2 flex items-center gap-2"
                aria-label="다음 페이지"
              >
                <span className="text-[14px]">다음</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#17a2b8] text-white text-center py-2 text-[12px] border-t-4 border-black">
          나만의 비밀스러운 일기장
        </div>
      </div>
    </div>
  );
}
