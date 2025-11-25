import { useState } from 'react';
import { X, BookOpen, CheckCircle } from 'lucide-react';

interface BookCollectionPopupProps {
  onClose: () => void;
}

interface Book {
  id: number;
  title: string;
  author: string;
  category: 'novel' | 'poetry' | 'essay' | 'history';
  totalPages: number;
  readPages: number;
  status: 'unread' | 'reading' | 'completed';
}

export function BookCollectionPopup({ onClose }: BookCollectionPopupProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'novel' | 'poetry' | 'essay'>('all');
  const [books] = useState<Book[]>([
    {
      id: 1,
      title: "픽셀 왕국의 전설",
      author: "도트 작가",
      category: 'novel',
      totalPages: 320,
      readPages: 320,
      status: 'completed'
    },
    {
      id: 2,
      title: "8비트 시집",
      author: "레트로 시인",
      category: 'poetry',
      totalPages: 150,
      readPages: 90,
      status: 'reading'
    },
    {
      id: 3,
      title: "게임 속의 철학",
      author: "칩튠 사색가",
      category: 'essay',
      totalPages: 280,
      readPages: 0,
      status: 'unread'
    },
    {
      id: 4,
      title: "디지털 세계 여행기",
      author: "픽셀 탐험가",
      category: 'novel',
      totalPages: 400,
      readPages: 200,
      status: 'reading'
    },
    {
      id: 5,
      title: "레트로 감성 시선집",
      author: "8비트 문인",
      category: 'poetry',
      totalPages: 120,
      readPages: 120,
      status: 'completed'
    },
    {
      id: 6,
      title: "코드와 예술의 만남",
      author: "프로그래머 작가",
      category: 'essay',
      totalPages: 250,
      readPages: 150,
      status: 'reading'
    },
    {
      id: 7,
      title: "픽셀 아트의 역사",
      author: "도트 역사가",
      category: 'history',
      totalPages: 350,
      readPages: 350,
      status: 'completed'
    },
    {
      id: 8,
      title: "추억의 게임 소설",
      author: "레트로 소설가",
      category: 'novel',
      totalPages: 380,
      readPages: 0,
      status: 'unread'
    },
    {
      id: 9,
      title: "칩튠 명상록",
      author: "사운드 사색가",
      category: 'essay',
      totalPages: 200,
      readPages: 200,
      status: 'completed'
    },
  ]);

  const filteredBooks = activeTab === 'all'
    ? books
    : books.filter(book => book.category === activeTab);

  const getProgressPercentage = (book: Book) => {
    return Math.round((book.readPages / book.totalPages) * 100);
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      novel: '소설',
      poetry: '시',
      essay: '에세이',
      history: '역사'
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-[#27ae60] text-white';
      case 'reading':
        return 'bg-[#3498db] text-white';
      case 'unread':
        return 'bg-[#95a5a6] text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return '완독';
      case 'reading':
        return '읽는 중';
      case 'unread':
        return '읽지 않음';
      default:
        return status;
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-[800px] max-h-[700px] bg-[#d4c4a8] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#8b0a1a] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <span className="text-[20px]">📚</span>
            <span className="text-[18px]">나의 책 컬렉션</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-red-600 p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-[#c4b49a] border-b-4 border-black px-4 py-3 flex gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`pixel-button px-4 py-2 text-[14px] ${
              activeTab === 'all'
                ? 'bg-[#8b0a1a] text-white'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setActiveTab('novel')}
            className={`pixel-button px-4 py-2 text-[14px] ${
              activeTab === 'novel'
                ? 'bg-[#8b0a1a] text-white'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            소설
          </button>
          <button
            onClick={() => setActiveTab('poetry')}
            className={`pixel-button px-4 py-2 text-[14px] ${
              activeTab === 'poetry'
                ? 'bg-[#8b0a1a] text-white'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            시
          </button>
          <button
            onClick={() => setActiveTab('essay')}
            className={`pixel-button px-4 py-2 text-[14px] ${
              activeTab === 'essay'
                ? 'bg-[#8b0a1a] text-white'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            에세이
          </button>
        </div>

        {/* Book Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#ebe1d1]">
          <div className="grid grid-cols-3 gap-4">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className={`bg-white pixel-border p-4 transition-all hover:scale-105 ${
                  book.status === 'completed' ? 'border-[#27ae60] border-4' : ''
                }`}
              >
                {/* Book Icon and Status */}
                <div className="flex items-start justify-between mb-3">
                  <BookOpen size={24} className="text-[#8b0a1a]" />
                  {book.status === 'completed' && (
                    <CheckCircle size={20} className="text-[#27ae60]" />
                  )}
                </div>

                {/* Book Title */}
                <h3 className="text-[16px] text-black mb-1 line-clamp-2 min-h-[48px]">
                  {book.title}
                </h3>

                {/* Author */}
                <p className="text-[12px] text-[#8b7355] mb-2">
                  {book.author}
                </p>

                {/* Category Badge */}
                <div className="mb-3">
                  <span className="text-[11px] bg-[#e0d5c7] text-[#8b7355] px-2 py-1 pixel-border-small">
                    {getCategoryLabel(book.category)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-[#8b7355]">진행률</span>
                    <span className="text-[11px] text-[#8b7355]">
                      {getProgressPercentage(book)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#e0d5c7] pixel-border-small overflow-hidden">
                    <div
                      className="h-full bg-[#8b0a1a] transition-all"
                      style={{ width: `${getProgressPercentage(book)}%` }}
                    />
                  </div>
                </div>

                {/* Pages Info */}
                <div className="text-[11px] text-[#a89378] mb-2">
                  {book.readPages} / {book.totalPages} 페이지
                </div>

                {/* Status Badge */}
                <div className={`text-center text-[11px] px-2 py-1 pixel-border-small ${getStatusColor(book.status)}`}>
                  {getStatusLabel(book.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#c4b49a] border-t-4 border-black p-4">
          <div className="text-center text-[14px] text-[#3a3a3a]">
            💡 총 {filteredBooks.length}권의 책이 있습니다
          </div>
        </div>
      </div>
    </div>
  );
}
