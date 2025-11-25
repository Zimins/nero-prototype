import { useState } from 'react';
import { X, PenTool, MessageSquare } from 'lucide-react';

interface CommunityBoardPopupProps {
  onClose: () => void;
}

interface Post {
  id: number;
  category: string;
  title: string;
  author: string;
  date: string;
  views: number;
  comments: number;
}

export function CommunityBoardPopup({ onClose }: CommunityBoardPopupProps) {
  const [activeTab, setActiveTab] = useState<'공지' | '자유' | '팁'>('공지');
  const [isWriting, setIsWriting] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const posts: Record<string, Post[]> = {
    공지: [
      { id: 1, category: '공지', title: '마을 축제가 열립니다!', author: '마을관리자', date: '2025.11.20', views: 234, comments: 12 },
      { id: 2, category: '공지', title: '신규 미니게임 오픈 안내', author: '운영팀', date: '2025.11.18', views: 189, comments: 8 },
      { id: 3, category: '공지', title: '11월 업데이트 내역', author: '개발팀', date: '2025.11.15', views: 456, comments: 23 },
    ],
    자유: [
      { id: 4, category: '자유', title: '오늘 분수대에서 만난 친구들 너무 좋았어요', author: '픽셀여행자', date: '2025.11.22', views: 67, comments: 5 },
      { id: 5, category: '자유', title: '다들 어떤 미니게임 좋아하세요?', author: '게이머123', date: '2025.11.21', views: 92, comments: 15 },
      { id: 6, category: '자유', title: '방 꾸미기 팁 공유해요!', author: '인테리어러버', date: '2025.11.20', views: 145, comments: 28 },
    ],
    팁: [
      { id: 7, category: '팁', title: '코인 빨리 모으는 방법', author: '부자되고싶다', date: '2025.11.19', views: 523, comments: 45 },
      { id: 8, category: '팁', title: '방명록 이쁘게 꾸미는 법', author: '디자이너', date: '2025.11.17', views: 278, comments: 19 },
      { id: 9, category: '팁', title: '이웃 찾는 꿀팁 공유', author: '친구많은사람', date: '2025.11.16', views: 334, comments: 31 },
    ],
  };

  const handleSubmit = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      // Here you would typically send to backend
      setNewPost({ title: '', content: '' });
      setIsWriting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-[700px] max-h-[700px] bg-[#d4c4a8] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2ecc71] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <span className="text-[20px]">📋</span>
            <span className="text-[18px]">마을 게시판</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-green-700 p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b-4 border-black bg-[#c4b49a]">
          {(['공지', '자유', '팁'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setIsWriting(false);
              }}
              className={`flex-1 py-3 text-[16px] transition-colors ${
                activeTab === tab
                  ? 'bg-[#ebe1d1] text-black border-r-2 border-black'
                  : 'bg-[#c4b49a] text-[#8b7355] hover:bg-[#d4c4a8] border-r-2 border-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Write Button */}
        {!isWriting && activeTab !== '공지' && (
          <div className="p-3 bg-[#ebe1d1] border-b-2 border-black">
            <button
              onClick={() => setIsWriting(true)}
              className="w-full pixel-button bg-[#2ecc71] hover:bg-[#27ae60] text-white py-2 flex items-center justify-center gap-2"
            >
              <PenTool size={16} />
              <span className="text-[14px]">글쓰기</span>
            </button>
          </div>
        )}

        {/* Write Form */}
        {isWriting && (
          <div className="p-4 bg-[#ebe1d1] border-b-4 border-black space-y-3">
            <div>
              <label className="block text-[14px] text-[#8b7355] mb-2">제목</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="제목을 입력하세요"
                className="w-full px-4 py-2 bg-white text-black pixel-border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2ecc71]"
                maxLength={50}
              />
            </div>
            <div>
              <label className="block text-[14px] text-[#8b7355] mb-2">내용</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="내용을 입력하세요..."
                rows={6}
                className="w-full px-4 py-2 bg-white text-black pixel-border text-[14px] resize-none focus:outline-none focus:ring-2 focus:ring-[#2ecc71]"
                maxLength={500}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="flex-1 pixel-button bg-[#2ecc71] hover:bg-[#27ae60] text-white py-2 text-[14px]"
              >
                등록
              </button>
              <button
                onClick={() => {
                  setIsWriting(false);
                  setNewPost({ title: '', content: '' });
                }}
                className="flex-1 pixel-button bg-[#8b7355] hover:bg-[#6d5c44] text-white py-2 text-[14px]"
              >
                취소
              </button>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="flex-1 overflow-y-auto bg-[#ebe1d1]">
          <div className="p-4 space-y-2">
            {posts[activeTab].map((post) => (
              <button
                key={post.id}
                className="w-full bg-white pixel-border p-4 hover:bg-[#f5f5f5] transition-colors text-left"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[11px] px-2 py-1 pixel-border ${
                        post.category === '공지'
                          ? 'bg-[#e74c3c] text-white'
                          : post.category === '팁'
                          ? 'bg-[#f39c12] text-white'
                          : 'bg-[#3498db] text-white'
                      }`}>
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-[15px] text-black mb-2 truncate">{post.title}</h3>
                    <div className="flex items-center gap-3 text-[12px] text-[#8b7355]">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>조회 {post.views}</span>
                      <div className="flex items-center gap-1">
                        <MessageSquare size={12} />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#8b7355] text-white text-center py-2 text-[12px] border-t-4 border-black">
          마을 소식과 이야기를 나눠보세요
        </div>
      </div>
    </div>
  );
}
