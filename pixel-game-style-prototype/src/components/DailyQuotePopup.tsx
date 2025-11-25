import { useState } from 'react';
import { X, RefreshCw, Heart, Trash2 } from 'lucide-react';

interface DailyQuotePopupProps {
  onClose: () => void;
}

interface Quote {
  id: number;
  text: string;
  author: string;
  source: string;
}

interface SavedQuote extends Quote {
  savedDate: string;
}

export function DailyQuotePopup({ onClose }: DailyQuotePopupProps) {
  const availableQuotes: Quote[] = [
    {
      id: 1,
      text: "책은 한 시대를 대변하는 거울이다.",
      author: "버지니아 울프",
      source: "『자기만의 방』"
    },
    {
      id: 2,
      text: "독서는 완전한 인간을 만들고, 토론은 기민한 인간을 만들며, 글쓰기는 정확한 인간을 만든다.",
      author: "프랜시스 베이컨",
      source: "『수상록』"
    },
    {
      id: 3,
      text: "오늘 읽은 책이 내일의 나를 만든다.",
      author: "마거릿 풀러",
      source: "『19세기 여성』"
    },
    {
      id: 4,
      text: "한 권의 책에는 세상을 바꿀 힘이 있다.",
      author: "말랄라 유사프자이",
      source: "『나는 말랄라』"
    },
    {
      id: 5,
      text: "책을 읽는다는 것은 다른 사람의 마음속을 산책하는 것이다.",
      author: "찰스 스크리브너",
      source: "『독서의 즐거움』"
    },
    {
      id: 6,
      text: "지혜는 경험의 딸이다.",
      author: "레오나르도 다 빈치",
      source: "『레오나르도의 노트』"
    },
  ];

  const [currentQuote, setCurrentQuote] = useState<Quote>(availableQuotes[0]);
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([
    {
      id: 1,
      text: "책은 한 시대를 대변하는 거울이다.",
      author: "버지니아 울프",
      source: "『자기만의 방』",
      savedDate: "2024-01-15"
    },
    {
      id: 3,
      text: "오늘 읽은 책이 내일의 나를 만든다.",
      author: "마거릿 풀러",
      source: "『19세기 여성』",
      savedDate: "2024-01-10"
    },
  ]);
  const [showSaved, setShowSaved] = useState(false);

  const handleRefresh = () => {
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    setCurrentQuote(availableQuotes[randomIndex]);
  };

  const handleSave = () => {
    const isAlreadySaved = savedQuotes.some(q => q.id === currentQuote.id);
    if (!isAlreadySaved) {
      const newSavedQuote: SavedQuote = {
        ...currentQuote,
        savedDate: new Date().toISOString().split('T')[0]
      };
      setSavedQuotes([newSavedQuote, ...savedQuotes]);
    }
  };

  const handleDelete = (id: number) => {
    setSavedQuotes(savedQuotes.filter(q => q.id !== id));
  };

  const isCurrentQuoteSaved = savedQuotes.some(q => q.id === currentQuote.id);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-[600px] max-h-[700px] bg-[#d4c4a8] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#4a3728] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <span className="text-[20px]">✨</span>
            <span className="text-[18px]">오늘의 글귀</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-red-600 p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Toggle View Buttons */}
        <div className="bg-[#c4b49a] border-b-4 border-black px-4 py-3 flex gap-2">
          <button
            onClick={() => setShowSaved(false)}
            className={`pixel-button px-4 py-2 text-[14px] ${
              !showSaved
                ? 'bg-[#4a3728] text-white'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            오늘의 글귀
          </button>
          <button
            onClick={() => setShowSaved(true)}
            className={`pixel-button px-4 py-2 text-[14px] ${
              showSaved
                ? 'bg-[#4a3728] text-white'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            저장한 글귀 ({savedQuotes.length})
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#ebe1d1]">
          {!showSaved ? (
            /* Today's Quote View */
            <div className="space-y-6">
              <div className="bg-white pixel-border p-8">
                <div className="text-center mb-6">
                  <div className="text-[40px] mb-4">✨</div>
                  <blockquote className="text-[20px] text-black leading-relaxed mb-6 italic">
                    "{currentQuote.text}"
                  </blockquote>
                  <div className="space-y-2">
                    <p className="text-[16px] text-[#4a3728] font-bold">
                      - {currentQuote.author}
                    </p>
                    <p className="text-[14px] text-[#8b7355]">
                      {currentQuote.source}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center mt-6">
                  <button
                    onClick={handleRefresh}
                    className="pixel-button bg-[#3498db] hover:bg-[#2980b9] text-white px-6 py-3 flex items-center gap-2"
                  >
                    <RefreshCw size={18} />
                    <span className="text-[14px]">새 글귀</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isCurrentQuoteSaved}
                    className={`pixel-button px-6 py-3 flex items-center gap-2 ${
                      isCurrentQuoteSaved
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-[#e74c3c] hover:bg-[#c0392b] text-white'
                    }`}
                  >
                    <Heart size={18} fill={isCurrentQuoteSaved ? 'currentColor' : 'none'} />
                    <span className="text-[14px]">
                      {isCurrentQuoteSaved ? '저장됨' : '저장하기'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="bg-[#fff9e6] pixel-border p-4">
                <p className="text-[14px] text-[#8b7355] text-center">
                  💡 마음에 드는 글귀를 저장하고 언제든지 다시 읽어보세요
                </p>
              </div>
            </div>
          ) : (
            /* Saved Quotes List View */
            <div className="space-y-4">
              {savedQuotes.length === 0 ? (
                <div className="bg-white pixel-border p-8 text-center">
                  <div className="text-[40px] mb-4">📝</div>
                  <p className="text-[16px] text-[#8b7355]">
                    아직 저장한 글귀가 없습니다.
                  </p>
                </div>
              ) : (
                savedQuotes.map((quote) => (
                  <div key={quote.id} className="bg-white pixel-border p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <blockquote className="text-[16px] text-black leading-relaxed mb-3 italic">
                          "{quote.text}"
                        </blockquote>
                        <div className="space-y-1">
                          <p className="text-[14px] text-[#4a3728] font-bold">
                            - {quote.author}
                          </p>
                          <p className="text-[12px] text-[#8b7355]">
                            {quote.source}
                          </p>
                          <p className="text-[11px] text-[#a89378] mt-2">
                            저장일: {quote.savedDate}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(quote.id)}
                        className="pixel-button bg-[#e74c3c] hover:bg-[#c0392b] text-white p-2 flex-shrink-0"
                        aria-label="삭제"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#c4b49a] border-t-4 border-black p-4">
          <div className="text-center text-[14px] text-[#3a3a3a]">
            📚 독서는 영혼의 양식입니다
          </div>
        </div>
      </div>
    </div>
  );
}
