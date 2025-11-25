import { useState } from 'react';
import { X, Mail, Send, Inbox } from 'lucide-react';

interface MailboxPopupProps {
  onClose: () => void;
}

interface Letter {
  id: number;
  from: string;
  to: string;
  subject: string;
  content: string;
  date: string;
  isRead: boolean;
}

export function MailboxPopup({ onClose }: MailboxPopupProps) {
  const [activeTab, setActiveTab] = useState<'받은편지' | '보낸편지'>('받은편지');
  const [isWriting, setIsWriting] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [newLetter, setNewLetter] = useState({ to: '', subject: '', content: '' });

  const [receivedLetters, setReceivedLetters] = useState<Letter[]>([
    {
      id: 1,
      from: "픽셀여행자",
      to: "나",
      subject: "방문 감사 인사",
      content: "안녕하세요! 어제 방문했던 픽셀여행자입니다. 정말 멋진 방이었어요. 특히 거실 인테리어가 인상 깊었습니다. 다음에 또 놀러갈게요!",
      date: "2025.11.22",
      isRead: false,
    },
    {
      id: 2,
      from: "도트마스터",
      to: "나",
      subject: "친구 신청합니다",
      content: "분수대에서 뵀던 도트마스터입니다. 이야기 나누면서 정말 즐거웠어요. 친구 신청 수락해주시면 감사하겠습니다!",
      date: "2025.11.21",
      isRead: true,
    },
    {
      id: 3,
      from: "이벤트봇",
      to: "나",
      subject: "주간 보상이 도착했습니다",
      content: "축하합니다! 이번 주 활동 보상으로 100코인이 지급되었습니다. 계속해서 즐거운 시간 보내세요!",
      date: "2025.11.20",
      isRead: true,
    },
  ]);

  const [sentLetters] = useState<Letter[]>([
    {
      id: 4,
      from: "나",
      to: "레트로러버",
      subject: "방명록 감사합니다",
      content: "제 방명록에 따뜻한 글 남겨주셔서 감사합니다. 당신의 방도 방문하고 싶네요!",
      date: "2025.11.21",
      isRead: true,
    },
    {
      id: 5,
      from: "나",
      to: "8비트게이머",
      subject: "미니게임 같이 할까요?",
      content: "오락실에서 같이 게임 하면 재미있을 것 같아요. 시간 되실 때 연락주세요!",
      date: "2025.11.19",
      isRead: true,
    },
  ]);

  const handleSendLetter = () => {
    if (newLetter.to.trim() && newLetter.subject.trim() && newLetter.content.trim()) {
      // Here you would typically send to backend
      setNewLetter({ to: '', subject: '', content: '' });
      setIsWriting(false);
    }
  };

  const handleLetterClick = (letter: Letter) => {
    setSelectedLetter(letter);
    if (activeTab === '받은편지' && !letter.isRead) {
      setReceivedLetters(receivedLetters.map(l =>
        l.id === letter.id ? { ...l, isRead: true } : l
      ));
    }
  };

  const currentLetters = activeTab === '받은편지' ? receivedLetters : sentLetters;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-[700px] max-h-[700px] bg-[#d4c4a8] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#e74c3c] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <span className="text-[20px]">📮</span>
            <span className="text-[18px]">우편함</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-red-700 p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b-4 border-black bg-[#c4b49a]">
          {(['받은편지', '보낸편지'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setIsWriting(false);
                setSelectedLetter(null);
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
        {!isWriting && !selectedLetter && (
          <div className="p-3 bg-[#ebe1d1] border-b-2 border-black">
            <button
              onClick={() => setIsWriting(true)}
              className="w-full pixel-button bg-[#e74c3c] hover:bg-[#c0392b] text-white py-2 flex items-center justify-center gap-2"
            >
              <Send size={16} />
              <span className="text-[14px]">편지 쓰기</span>
            </button>
          </div>
        )}

        {/* Write Form */}
        {isWriting && (
          <div className="flex-1 overflow-y-auto p-4 bg-[#ebe1d1] space-y-3">
            <div>
              <label className="block text-[14px] text-[#8b7355] mb-2">받는 사람</label>
              <input
                type="text"
                value={newLetter.to}
                onChange={(e) => setNewLetter({ ...newLetter, to: e.target.value })}
                placeholder="닉네임을 입력하세요"
                className="w-full px-4 py-2 bg-white text-black pixel-border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
                maxLength={20}
              />
            </div>
            <div>
              <label className="block text-[14px] text-[#8b7355] mb-2">제목</label>
              <input
                type="text"
                value={newLetter.subject}
                onChange={(e) => setNewLetter({ ...newLetter, subject: e.target.value })}
                placeholder="제목을 입력하세요"
                className="w-full px-4 py-2 bg-white text-black pixel-border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
                maxLength={50}
              />
            </div>
            <div>
              <label className="block text-[14px] text-[#8b7355] mb-2">내용</label>
              <textarea
                value={newLetter.content}
                onChange={(e) => setNewLetter({ ...newLetter, content: e.target.value })}
                placeholder="따뜻한 마음을 담아 편지를 작성해보세요..."
                rows={10}
                className="w-full px-4 py-2 bg-white text-black pixel-border text-[14px] resize-none focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
                maxLength={500}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSendLetter}
                className="flex-1 pixel-button bg-[#e74c3c] hover:bg-[#c0392b] text-white py-2 text-[14px]"
              >
                보내기
              </button>
              <button
                onClick={() => {
                  setIsWriting(false);
                  setNewLetter({ to: '', subject: '', content: '' });
                }}
                className="flex-1 pixel-button bg-[#8b7355] hover:bg-[#6d5c44] text-white py-2 text-[14px]"
              >
                취소
              </button>
            </div>
          </div>
        )}

        {/* Letter Detail View */}
        {selectedLetter && !isWriting && (
          <div className="flex-1 overflow-y-auto p-4 bg-[#ebe1d1]">
            <div className="bg-white pixel-border p-4">
              <div className="mb-4 pb-4 border-b-2 border-[#e0d5c7]">
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="text-[12px] text-[#8b7355] hover:text-black mb-3"
                >
                  ← 목록으로
                </button>
                <h3 className="text-[18px] text-black mb-3">{selectedLetter.subject}</h3>
                <div className="flex items-center justify-between text-[13px] text-[#8b7355]">
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    <span>{activeTab === '받은편지' ? '보낸 사람' : '받는 사람'}: {activeTab === '받은편지' ? selectedLetter.from : selectedLetter.to}</span>
                  </div>
                  <span>{selectedLetter.date}</span>
                </div>
              </div>
              <div className="text-[14px] text-black leading-relaxed whitespace-pre-wrap">
                {selectedLetter.content}
              </div>
            </div>
          </div>
        )}

        {/* Letters List */}
        {!isWriting && !selectedLetter && (
          <div className="flex-1 overflow-y-auto bg-[#ebe1d1]">
            <div className="p-4 space-y-2">
              {currentLetters.length === 0 ? (
                <div className="text-center py-12 text-[#8b7355]">
                  <Inbox size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-[16px]">편지가 없습니다.</p>
                </div>
              ) : (
                currentLetters.map((letter) => (
                  <button
                    key={letter.id}
                    onClick={() => handleLetterClick(letter)}
                    className={`w-full bg-white pixel-border p-4 hover:bg-[#f5f5f5] transition-colors text-left ${
                      !letter.isRead && activeTab === '받은편지' ? 'border-l-4 border-l-[#e74c3c]' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Mail size={14} className={!letter.isRead && activeTab === '받은편지' ? 'text-[#e74c3c]' : 'text-[#8b7355]'} />
                          <span className="text-[13px] text-[#8b7355]">
                            {activeTab === '받은편지' ? letter.from : letter.to}
                          </span>
                          {!letter.isRead && activeTab === '받은편지' && (
                            <span className="text-[10px] bg-[#e74c3c] text-white px-2 py-0.5 pixel-border-small">NEW</span>
                          )}
                        </div>
                        <h3 className={`text-[15px] mb-2 truncate ${
                          !letter.isRead && activeTab === '받은편지' ? 'text-black' : 'text-[#3a3a3a]'
                        }`}>
                          {letter.subject}
                        </h3>
                        <div className="text-[12px] text-[#8b7355]">
                          {letter.date}
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-[#8b7355] text-white text-center py-2 text-[12px] border-t-4 border-black">
          따뜻한 마음을 편지로 전해보세요
        </div>
      </div>
    </div>
  );
}
