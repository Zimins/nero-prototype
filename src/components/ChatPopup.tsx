import { useState } from 'react';
import { X, Send } from 'lucide-react';

interface ChatPopupProps {
  onClose: () => void;
}

interface ChatMessage {
  id: number;
  username: string;
  message: string;
  timestamp: string;
}

export function ChatPopup({ onClose }: ChatPopupProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, username: "픽셀여행자", message: "안녕하세요! 따뜻한 거실이네요 🔥", timestamp: "14:23" },
    { id: 2, username: "도트마스터", message: "벽난로 앞이 정말 아늑해요", timestamp: "14:25" },
    { id: 3, username: "8비트친구", message: "여기서 책 읽으면 좋겠어요 📚", timestamp: "14:27" },
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
        className="w-[500px] max-h-[600px] bg-[#d4c4a8] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#e67e22] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <span className="text-[20px]">🔥</span>
            <span className="text-[18px]">벽난로 채팅방</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-red-600 p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
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
                    ? 'bg-[#faed96] text-black' 
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
              className="flex-1 px-4 py-2 bg-white text-black pixel-border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#e67e22]"
              maxLength={200}
            />
            <button
              onClick={handleSendMessage}
              className="pixel-button bg-[#e67e22] hover:bg-[#d35400] text-white px-6 py-2 flex items-center gap-2"
            >
              <Send size={18} />
              <span className="text-[14px]">전송</span>
            </button>
          </div>
          <div className="mt-2 text-[11px] text-[#8b7355] text-center">
            벽난로 앞에서 따뜻한 대화를 나눠보세요
          </div>
        </div>
      </div>
    </div>
  );
}
