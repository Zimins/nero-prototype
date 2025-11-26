import { MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  time: string;
  isOwner: boolean;
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "민지",
    message: "안녕하세요! 채팅방에 오신 것을 환영합니다 ✨",
    time: "14:20",
    isOwner: true,
  },
  {
    id: 2,
    sender: "지수",
    message: "안녕하세요~ 미니홈피 너무 예뻐요!",
    time: "14:25",
    isOwner: false,
  },
  {
    id: 3,
    sender: "민지",
    message: "감사합니다! 🥰 자주 놀러오세요~",
    time: "14:27",
    isOwner: true,
  },
  {
    id: 4,
    sender: "현우",
    message: "추억의 미니홈피 감성이네요 ㅎㅎ",
    time: "15:10",
    isOwner: false,
  },
];

export function ChatRoom() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("방문자");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const now = new Date();
      const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const message: ChatMessage = {
        id: messages.length + 1,
        sender: username,
        message: newMessage,
        time: time,
        isOwner: false,
      };
      
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  // 이원주 수정: 창 크기 고정을 위해 w-full h-full overflow-auto 추가
  // 이원주 수정: 채팅 공간 크기 1364x768 고정
  return (
    <div className="overflow-auto p-8 flex flex-col" style={{ width: '1364px', height: '768px' }}>
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="w-8 h-8" />
        <h1 className="text-3xl">채팅 공간</h1>
      </div>
      
      <p className="text-gray-600 mb-6">
        실시간으로 대화를 나눠보세요! 💬
      </p>

      {/* Username Input */}
      <div className="mb-4 p-4 bg-blue-50 rounded border border-blue-200">
        <label className="block text-sm mb-2">닉네임 설정</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="닉네임을 입력하세요"
        />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 mb-4 p-4 bg-gray-50 rounded border border-gray-200 overflow-y-auto max-h-[500px]">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwner ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${msg.isOwner ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <span className="text-sm px-2">{msg.sender}</span>
                <div
                  className={`p-3 rounded-lg ${
                    msg.isOwner
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-white border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p>{msg.message}</p>
                </div>
                <span className="text-xs text-gray-500 px-2">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="메시지를 입력하세요..."
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          전송
        </button>
      </form>
    </div>
  );
}
