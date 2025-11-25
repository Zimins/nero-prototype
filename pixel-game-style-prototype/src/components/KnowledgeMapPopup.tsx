import { X, Award, TrendingUp } from 'lucide-react';

interface KnowledgeMapPopupProps {
  onClose: () => void;
}

interface CategoryStat {
  id: number;
  name: string;
  icon: string;
  booksRead: number;
  totalBooks: number;
  color: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export function KnowledgeMapPopup({ onClose }: KnowledgeMapPopupProps) {
  const categoryStats: CategoryStat[] = [
    {
      id: 1,
      name: '소설',
      icon: '📖',
      booksRead: 2,
      totalBooks: 3,
      color: '#e74c3c'
    },
    {
      id: 2,
      name: '시',
      icon: '🎭',
      booksRead: 2,
      totalBooks: 2,
      color: '#9b59b6'
    },
    {
      id: 3,
      name: '에세이',
      icon: '✍️',
      booksRead: 2,
      totalBooks: 3,
      color: '#3498db'
    },
    {
      id: 4,
      name: '역사',
      icon: '📜',
      booksRead: 1,
      totalBooks: 1,
      color: '#f39c12'
    },
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      title: '첫 걸음',
      description: '첫 번째 책 완독',
      icon: '🎯',
      unlocked: true
    },
    {
      id: 2,
      title: '책벌레',
      description: '10권 이상 완독',
      icon: '📚',
      unlocked: false
    },
    {
      id: 3,
      title: '시의 달인',
      description: '시 카테고리 5권 완독',
      icon: '🎭',
      unlocked: false
    },
    {
      id: 4,
      title: '박학다식',
      description: '모든 카테고리에서 최소 3권 완독',
      icon: '🌟',
      unlocked: false
    },
    {
      id: 5,
      title: '완벽주의자',
      description: '카테고리 하나를 100% 완독',
      icon: '👑',
      unlocked: true
    },
    {
      id: 6,
      title: '지식 탐험가',
      description: '30일 연속 독서',
      icon: '🗺️',
      unlocked: false
    },
  ];

  const getProgressPercentage = (stat: CategoryStat) => {
    return Math.round((stat.booksRead / stat.totalBooks) * 100);
  };

  const totalBooksRead = categoryStats.reduce((sum, stat) => sum + stat.booksRead, 0);
  const totalBooks = categoryStats.reduce((sum, stat) => sum + stat.totalBooks, 0);
  const overallProgress = Math.round((totalBooksRead / totalBooks) * 100);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-[700px] max-h-[700px] bg-[#d4c4a8] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2c5530] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <span className="text-[20px]">🗺️</span>
            <span className="text-[18px]">지식의 지도</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-red-600 p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#ebe1d1]">
          {/* Overall Progress */}
          <div className="bg-white pixel-border p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[20px] text-black flex items-center gap-2">
                <TrendingUp size={24} className="text-[#2c5530]" />
                전체 진행 상황
              </h3>
              <span className="text-[24px] text-[#2c5530]">{overallProgress}%</span>
            </div>
            <div className="w-full h-6 bg-[#e0d5c7] pixel-border overflow-hidden mb-3">
              <div
                className="h-full bg-[#2c5530] transition-all"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <p className="text-[14px] text-[#8b7355] text-center">
              {totalBooksRead}권 / {totalBooks}권 완독
            </p>
          </div>

          {/* Category Statistics */}
          <div className="mb-6">
            <h3 className="text-[18px] text-black mb-4 flex items-center gap-2">
              📊 카테고리별 통계
            </h3>
            <div className="space-y-3">
              {categoryStats.map((stat) => (
                <div key={stat.id} className="bg-white pixel-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[24px]">{stat.icon}</span>
                      <span className="text-[16px] text-black">{stat.name}</span>
                    </div>
                    <div className="text-[14px] text-[#8b7355]">
                      {stat.booksRead} / {stat.totalBooks}권
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-4 bg-[#e0d5c7] pixel-border overflow-hidden">
                      <div
                        className="h-full transition-all"
                        style={{
                          width: `${getProgressPercentage(stat)}%`,
                          backgroundColor: stat.color
                        }}
                      />
                    </div>
                    <span className="text-[14px] text-[#8b7355] min-w-[45px] text-right">
                      {getProgressPercentage(stat)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-[18px] text-black mb-4 flex items-center gap-2">
              <Award size={20} className="text-[#f39c12]" />
              업적
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`pixel-border p-4 ${
                    achievement.unlocked
                      ? 'bg-white border-[#f39c12] border-4'
                      : 'bg-[#d4c4a8] opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-[32px]">{achievement.icon}</span>
                    <div className="flex-1">
                      <h4 className="text-[14px] text-black mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-[12px] text-[#8b7355]">
                        {achievement.description}
                      </p>
                      {achievement.unlocked && (
                        <div className="mt-2 inline-block">
                          <span className="text-[10px] bg-[#f39c12] text-white px-2 py-1 pixel-border-small">
                            ✓ 달성
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#c4b49a] border-t-4 border-black p-4">
          <div className="text-center text-[14px] text-[#3a3a3a]">
            💡 계속 독서하여 더 많은 업적을 달성하세요!
          </div>
        </div>
      </div>
    </div>
  );
}
