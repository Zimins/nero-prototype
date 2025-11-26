import { Coffee, MessageSquare, Heart, User } from 'lucide-react';
import { useState } from 'react';

interface GuestbookEntry {
  id: number;
  name: string;
  date: string;
  message: string;
}

const initialEntries: GuestbookEntry[] = [
  {
    id: 1,
    name: "지수",
    date: "2025.11.12",
    message: "미니홈피 너무 예쁘다! 추억 돋네 ㅎㅎ 자주 놀러올게 ^^"
  },
  {
    id: 2,
    name: "현우",
    date: "2025.11.10",
    message: "오랜만에 미니홈피 구경하니 옛날 생각나서 좋네요. 온실 컨셉 마음에 들어요!"
  },
  {
    id: 3,
    name: "서연",
    date: "2025.11.08",
    message: "와 쥬크박스까지 있어?! 진짜 감성 터진다 ㅠㅠ"
  },
  {
    id: 4,
    name: "민준",
    date: "2025.11.05",
    message: "천문대에 있는 일기 글 잘 읽었어. 앞으로도 좋은 글 기대할게!"
  },
];

export function TeaRoom() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries);
  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && newMessage.trim()) {
      const newEntry: GuestbookEntry = {
        id: entries.length + 1,
        name: newName,
        date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
        message: newMessage,
      };
      setEntries([newEntry, ...entries]);
      setNewName("");
      setNewMessage("");
    }
  };

  // 이원주 수정: 다실 크기 1364x768 고정
  return (
    <div className="overflow-auto p-8" style={{ width: '1364px', height: '768px' }}>
      <div className="flex items-center gap-3 mb-6">
        <Coffee className="w-8 h-8" />
        <h1 className="text-3xl">다실</h1>
      </div>
      
      <p className="text-gray-600 mb-8">
        차 한잔 나누며 이야기를 남겨주세요. ☕
      </p>

      {/* Write New Entry */}
      <div className="mb-8 p-6 bg-amber-50 rounded border border-amber-200">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5" />
          <h2 className="text-xl">방명록 남기기</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">이름</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="이름을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">메시지</label>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              rows={4}
              placeholder="메시지를 남겨주세요"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
          >
            작성하기
          </button>
        </form>
      </div>

      {/* Entries */}
      <div className="mb-4 flex items-center gap-2">
        <Heart className="w-5 h-5 text-red-500" />
        <h2 className="text-xl">방명록 ({entries.length})</h2>
      </div>

      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="p-5 bg-white border border-gray-200 rounded hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-400" />
                <span>{entry.name}</span>
              </div>
              <span className="text-sm text-gray-500">{entry.date}</span>
            </div>
            <p className="text-gray-700 leading-relaxed pl-7">{entry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
