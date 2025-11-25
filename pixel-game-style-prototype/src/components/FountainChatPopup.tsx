import { useState } from 'react';
import { X, Send, Users } from 'lucide-react';

interface FountainChatPopupProps {
  onClose: () => void;
}

interface ChatMessage {
  id: number;
  username: string;
  message: string;
  timestamp: string;
}

export function FountainChatPopup({ onClose }: FountainChatPopupProps) {
  const [message, setMessage] = useState('');
  const [onlineUsers] = useState(47); // Mock online users count
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, username: "도트마스터", message: "날씨가 정말 좋네요! ☀️", timestamp: "15:23" },
    { id: 2, username: "픽셀친구", message: "분수대 앞에서 친구 만나기로 했어요", timestamp: "15:25" },
    { id: 3, username: "8비트게이머", message: "오락실에 새 게임 생겼던데 같이 가실 분?", timestamp: "15:27" },
    { id: 4, username: "레트로러버", message: "광장 채팅 처음인데 분위기 좋네요!", timestamp: "15:29" },
    { id: 5, username: "코인수집가", message: "오늘 미니게임 보상 좋더라구요", timestamp: "15:31" },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: messages.length + 1,
        username: "나",
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-[550px] max-h-[650px] bg-[#d4c4a8] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#00bcd4] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-3">
            <span className="text-[20px]">⛲</span>
            <div className="flex flex-col">
              <span className="text-[18px]">광장 채팅</span>
              <div className="flex items-center gap-1 text-[12px] opacity-90">
                <Users size={14} />
                <span>{onlineUsers}명 접속 중</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-cyan-700 p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Online Users Info */}
        <div className="bg-[#b2ebf2] px-4 py-2 border-b-2 border-black">
          <p className="text-[13px] text-[#006064] text-center">
            🌟 마을 광장에서 모두와 자유롭게 대화해보세요
          </p>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#ebe1d1] min-h-[400px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col gap-1 ${msg.username === '나' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#8b7355]">{msg.username}</span>
                <span className="text-[10px] text-[#a89378]">{msg.timestamp}</span>
              </div>
              <div
                className={`max-w-[70%] px-4 py-2 pixel-border ${
                  msg.username === '나'
                    ? 'bg-[#80deea] text-black'
                    : 'bg-white text-black'
                }`}
              >
                <p className="text-[14px] break-words">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#c4b49a] border-t-4 border-black">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              className="flex-1 px-4 py-2 bg-white text-black pixel-border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
              maxLength={200}
            />
            <button
              onClick={handleSendMessage}
              className="pixel-button bg-[#00bcd4] hover:bg-[#0097a7] text-white px-6 py-2 flex items-center gap-2"
            >
              <Send size={18} />
              <span className="text-[14px]">전송</span>
            </button>
          </div>
          <div className="mt-2 text-[11px] text-[#8b7355] text-center">
            광장에서 즐거운 대화를 나눠보세요
          </div>
        </div>
      </div>
    </div>
  );
}
