import { useState } from 'react';
import { X, Search, Shuffle, Users, Star, Heart } from 'lucide-react';

interface VisitPopupProps {
  onClose: () => void;
}

interface User {
  id: number;
  username: string;
  description: string;
  visitors: number;
  level: number;
  tags: string[];
}

export function VisitPopup({ onClose }: VisitPopupProps) {
  const [activeTab, setActiveTab] = useState<'인기' | '친구'>('인기');
  const [searchQuery, setSearchQuery] = useState('');
  const [randomUser, setRandomUser] = useState<User | null>(null);

  const popularUsers: User[] = [
    {
      id: 1,
      username: "픽셀마스터",
      description: "따뜻하고 아늑한 거실이 있는 공간입니다",
      visitors: 1234,
      level: 25,
      tags: ["인테리어", "힐링"],
    },
    {
      id: 2,
      username: "도트아티스트",
      description: "예쁜 장식품이 가득한 다락방",
      visitors: 987,
      level: 22,
      tags: ["아트", "디자인"],
    },
    {
      id: 3,
      username: "레트로게이머",
      description: "게임 좋아하시는 분 환영합니다!",
      visitors: 856,
      level: 20,
      tags: ["게임", "채팅"],
    },
    {
      id: 4,
      username: "8비트뮤지션",
      description: "좋은 음악과 함께하는 공간",
      visitors: 743,
      level: 18,
      tags: ["음악", "감성"],
    },
  ];

  const friendUsers: User[] = [
    {
      id: 5,
      username: "베스트프렌드",
      description: "항상 반겨주는 따뜻한 친구의 방",
      visitors: 456,
      level: 15,
      tags: ["친구", "대화"],
    },
    {
      id: 6,
      username: "옆집이웃",
      description: "편하게 놀러오세요~",
      visitors: 324,
      level: 12,
      tags: ["친절", "환영"],
    },
  ];

  const handleRandomVisit = () => {
    const allUsers = [...popularUsers, ...friendUsers];
    const random = allUsers[Math.floor(Math.random() * allUsers.length)];
    setRandomUser(random);
    setTimeout(() => setRandomUser(null), 3000);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Here you would typically search for users
      console.log('Searching for:', searchQuery);
    }
  };

  const handleVisit = (user: User) => {
    console.log('Visiting:', user.username);
    // Here you would typically navigate to the user's room
  };

  const currentUsers = activeTab === '인기' ? popularUsers : friendUsers;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-[700px] max-h-[700px] bg-[#d4c4a8] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#27ae60] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <span className="text-[20px]">🧭</span>
            <span className="text-[18px]">이웃 탐방</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-green-700 p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-[#c4b49a] border-b-4 border-black space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="닉네임으로 검색..."
              className="flex-1 px-4 py-2 bg-white text-black pixel-border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#27ae60]"
              maxLength={20}
            />
            <button
              onClick={handleSearch}
              className="pixel-button bg-[#27ae60] hover:bg-[#229954] text-white px-6 py-2 flex items-center gap-2"
            >
              <Search size={16} />
              <span className="text-[14px]">검색</span>
            </button>
          </div>
          <button
            onClick={handleRandomVisit}
            className="w-full pixel-button bg-[#3498db] hover:bg-[#2980b9] text-white py-2 flex items-center justify-center gap-2"
          >
            <Shuffle size={16} />
            <span className="text-[14px]">랜덤 방문하기</span>
          </button>
        </div>

        {/* Random Visit Result */}
        {randomUser && (
          <div className="p-4 bg-[#52c77e] text-white border-b-2 border-black text-center">
            <div className="text-[14px]">
              🎲 <strong>{randomUser.username}</strong>님의 방으로 이동합니다!
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b-4 border-black bg-[#c4b49a]">
          {(['인기', '친구'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-[16px] transition-colors ${
                activeTab === tab
                  ? 'bg-[#ebe1d1] text-black border-r-2 border-black'
                  : 'bg-[#c4b49a] text-[#8b7355] hover:bg-[#d4c4a8] border-r-2 border-black'
              }`}
            >
              {tab === '인기' ? (
                <div className="flex items-center justify-center gap-2">
                  <Star size={16} />
                  <span>인기 방</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Heart size={16} />
                  <span>친구 목록</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#ebe1d1] space-y-3">
          {currentUsers.length === 0 ? (
            <div className="text-center py-12 text-[#8b7355]">
              <Users size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-[16px]">
                {activeTab === '친구' ? '친구 목록이 비어있습니다.' : '인기 방을 불러올 수 없습니다.'}
              </p>
            </div>
          ) : (
            currentUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white pixel-border p-4 hover:bg-[#f5f5f5] transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-[16px] text-black">{user.username}</h3>
                      <span className="text-[11px] bg-[#27ae60] text-white px-2 py-0.5 pixel-border-small">
                        Lv.{user.level}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#8b7355] mb-2">{user.description}</p>
                    <div className="flex items-center gap-2 mb-2">
                      {user.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] bg-[#ebe1d1] text-[#8b7355] px-2 py-1 pixel-border-small"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[12px] text-[#8b7355]">
                      <Users size={12} />
                      <span>방문자 {user.visitors.toLocaleString()}명</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleVisit(user)}
                    className="pixel-button bg-[#27ae60] hover:bg-[#229954] text-white px-4 py-2 text-[13px] whitespace-nowrap"
                  >
                    방문하기
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#8b7355] text-white text-center py-2 text-[12px] border-t-4 border-black">
          새로운 이웃을 만나보세요
        </div>
      </div>
    </div>
  );
}
