import { BookHeart, User, Heart, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface GuestbookEntry {
  id: number;
  name: string;
  date: string;
  message: string;
  mood: string;
}

const moods = ["😊", "🥰", "😎", "🤗", "✨", "💝", "🌟", "🎉"];

const initialEntries: GuestbookEntry[] = [
  {
    id: 1,
    name: "서연",
    date: "2025.11.13",
    message: "미니홈피 분위기 너무 좋아요! 자주 들를게요 ^^",
    mood: "🥰"
  },
  {
    id: 2,
    name: "지훈",
    date: "2025.11.12",
    message: "옛날 감성 물씬 나네요~ 추억 돋아요!",
    mood: "😊"
  },
  {
    id: 3,
    name: "유진",
    date: "2025.11.11",
    message: "각 방마다 컨셉이 있어서 구경하는 재미가 쏠쏠해요!",
    mood: "✨"
  },
  {
    id: 4,
    name: "태양",
    date: "2025.11.10",
    message: "친구가 알려줘서 왔는데 정말 잘 만드셨네요 👍",
    mood: "😎"
  },
  {
    id: 5,
    name: "하은",
    date: "2025.11.09",
    message: "쥬크박스 음악 리스트 취향 저격이에요 ㅎㅎ",
    mood: "🎉"
  },
];

export function GuestbookRoom() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries);
  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [selectedMood, setSelectedMood] = useState("😊");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && newMessage.trim()) {
      const newEntry: GuestbookEntry = {
        id: entries.length + 1,
        name: newName,
        date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
        message: newMessage,
        mood: selectedMood,
      };
      setEntries([newEntry, ...entries]);
      setNewName("");
      setNewMessage("");
      setSelectedMood("😊");
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <BookHeart className="w-8 h-8" />
        <h1 className="text-3xl">방명록</h1>
      </div>
      
      <p className="text-gray-600 mb-8">
        소중한 발자취를 남겨주세요! 💌
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-pink-50 p-4 rounded border border-pink-200 text-center">
          <MessageSquare className="w-6 h-6 mx-auto mb-2 text-pink-600" />
          <p className="text-2xl mb-1">{entries.length}</p>
          <p className="text-sm text-gray-600">방명록 수</p>
        </div>
        <div className="bg-purple-50 p-4 rounded border border-purple-200 text-center">
          <Heart className="w-6 h-6 mx-auto mb-2 text-purple-600" />
          <p className="text-2xl mb-1">127</p>
          <p className="text-sm text-gray-600">총 방문자</p>
        </div>
      </div>

      {/* Write New Entry */}
      <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded border border-pink-200">
        <h2 className="text-xl mb-4">방명록 작성하기</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">이름</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="이름을 입력하세요"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-2">기분</label>
            <div className="flex gap-2 flex-wrap">
              {moods.map((mood) => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setSelectedMood(mood)}
                  className={`w-12 h-12 text-2xl rounded hover:bg-white transition-colors ${
                    selectedMood === mood ? 'bg-white ring-2 ring-pink-400' : 'bg-gray-50'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">메시지</label>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
              rows={4}
              placeholder="방문 소감을 남겨주세요"
            />
          </div>
          
          <button
            type="submit"
            className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
          >
            작성 완료
          </button>
        </form>
      </div>

      {/* Entries */}
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div 
            key={entry.id} 
            className="p-5 bg-white border border-gray-200 rounded hover:shadow-lg transition-shadow"
            style={{ 
              animation: index === 0 && entries.length > 5 ? 'slideIn 0.3s ease-out' : 'none' 
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{entry.mood}</span>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{entry.name}</span>
                </div>
              </div>
              <span className="text-sm text-gray-500">{entry.date}</span>
            </div>
            <p className="text-gray-700 leading-relaxed pl-11">{entry.message}</p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
