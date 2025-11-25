import { useState } from 'react';
import { X, BookOpen, PenTool } from 'lucide-react';

interface GuestbookPopupProps {
  onClose: () => void;
}

interface GuestbookEntry {
  id: number;
  username: string;
  message: string;
  date: string;
}

export function GuestbookPopup({ onClose }: GuestbookPopupProps) {
  const [isWriting, setIsWriting] = useState(false);
  const [newEntry, setNewEntry] = useState({ username: '', message: '' });
  const [entries, setEntries] = useState<GuestbookEntry[]>([
    { 
      id: 1, 
      username: "픽셀탐험가", 
      message: "멋진 거실이네요! 다시 방문하고 싶어요 ✨", 
      date: "2025.11.10" 
    },
    { 
      id: 2, 
      username: "도트아티스트", 
      message: "따뜻하고 아늑한 공간입니다. 벽난로가 특히 마음에 들어요!", 
      date: "2025.11.11" 
    },
    { 
      id: 3, 
      username: "레트로러버", 
      message: "추억이 가득한 사진첩 덕분에 좋은 시간 보냈습니다 📷", 
      date: "2025.11.12" 
    },
  ]);

  const handleSubmit = () => {
    if (newEntry.username.trim() && newEntry.message.trim()) {
      const entry: GuestbookEntry = {
        id: entries.length + 1,
        username: newEntry.username.trim(),
        message: newEntry.message.trim(),
        date: new Date().toLocaleDateString('ko-KR', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit' 
        }).replace(/\. /g, '.').replace('.', '.'),
      };
      setEntries([entry, ...entries]);
      setNewEntry({ username: '', message: '' });
      setIsWriting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div 
        className="w-[600px] max-h-[700px] bg-[#d4c4a8] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#c0392b] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="pixel-icon" />
            <span className="text-[18px]">📷 사진첩 방명록</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-red-700 p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Write Button */}
        {!isWriting && (
          <div className="p-4 bg-[#c4b49a] border-b-4 border-black">
            <button
              onClick={() => setIsWriting(true)}
              className="w-full pixel-button bg-[#c0392b] hover:bg-[#a93226] text-white py-3 flex items-center justify-center gap-2"
            >
              <PenTool size={18} />
              <span className="text-[16px]">방명록 작성하기</span>
            </button>
          </div>
        )}

        {/* Write Form */}
        {isWriting && (
          <div className="p-4 bg-[#ebe1d1] border-b-4 border-black space-y-3">
            <div>
              <label className="block text-[14px] text-[#8b7355] mb-2">이름</label>
              <input
                type="text"
                value={newEntry.username}
                onChange={(e) => setNewEntry({ ...newEntry, username: e.target.value })}
                placeholder="이름을 입력하세요"
                className="w-full px-4 py-2 bg-white text-black pixel-border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#c0392b]"
                maxLength={20}
              />
            </div>
            <div>
              <label className="block text-[14px] text-[#8b7355] mb-2">메시지</label>
              <textarea
                value={newEntry.message}
                onChange={(e) => setNewEntry({ ...newEntry, message: e.target.value })}
                placeholder="방문 소감을 남겨주세요..."
                rows={4}
                className="w-full px-4 py-2 bg-white text-black pixel-border text-[14px] resize-none focus:outline-none focus:ring-2 focus:ring-[#c0392b]"
                maxLength={200}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="flex-1 pixel-button bg-[#c0392b] hover:bg-[#a93226] text-white py-2 text-[14px]"
              >
                등록
              </button>
              <button
                onClick={() => {
                  setIsWriting(false);
                  setNewEntry({ username: '', message: '' });
                }}
                className="flex-1 pixel-button bg-[#8b7355] hover:bg-[#6d5c44] text-white py-2 text-[14px]"
              >
                취소
              </button>
            </div>
          </div>
        )}

        {/* Entries List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#ebe1d1]">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-[#8b7355]">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-[16px]">아직 방명록이 없습니다.</p>
              <p className="text-[14px] mt-2">첫 번째 방문자가 되어주세요!</p>
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="bg-white pixel-border p-4 shadow-md">
                <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-[#e0d5c7]">
                  <span className="text-[16px] text-black">✍️ {entry.username}</span>
                  <span className="text-[12px] text-[#8b7355]">{entry.date}</span>
                </div>
                <p className="text-[14px] text-[#3a3a3a] leading-relaxed whitespace-pre-wrap">
                  {entry.message}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#8b7355] text-white text-center py-2 text-[12px] border-t-4 border-black">
          소중한 추억을 함께 나눠주세요
        </div>
      </div>
    </div>
  );
}
