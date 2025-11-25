import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Save, Trash2 } from 'lucide-react';

interface DiaryPopupProps {
  onClose: () => void;
}

interface DiaryEntry {
  date: string;
  title: string;
  content: string;
  mood: string;
}

const MOOD_EMOJIS = ['😊', '😔', '😄', '😢', '😐'];

export function DiaryPopup({ onClose }: DiaryPopupProps) {
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [entries, setEntries] = useState<Record<string, DiaryEntry>>({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState('😊');

  // Load entries from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('diary_entries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  // Load entry for current date
  useEffect(() => {
    const entry = entries[currentDate];
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
      setSelectedMood(entry.mood);
    } else {
      setTitle('');
      setContent('');
      setSelectedMood('😊');
    }
  }, [currentDate, entries]);

  const handlePrevDay = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - 1);
    setCurrentDate(date.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + 1);
    setCurrentDate(date.toISOString().split('T')[0]);
  };

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      const newEntries = {
        ...entries,
        [currentDate]: {
          date: currentDate,
          title: title.trim(),
          content: content.trim(),
          mood: selectedMood,
        },
      };
      setEntries(newEntries);
      localStorage.setItem('diary_entries', JSON.stringify(newEntries));
      alert('일기가 저장되었습니다!');
    }
  };

  const handleDelete = () => {
    if (entries[currentDate] && confirm('이 날의 일기를 삭제하시겠습니까?')) {
      const newEntries = { ...entries };
      delete newEntries[currentDate];
      setEntries(newEntries);
      localStorage.setItem('diary_entries', JSON.stringify(newEntries));
      setTitle('');
      setContent('');
      setSelectedMood('😊');
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-[600px] max-h-[700px] bg-[#d4c4a8] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#d4af37] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <span className="text-[18px]">📔 일기장</span>
          <button
            onClick={onClose}
            className="hover:bg-[#b8951f] p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Date Navigation */}
        <div className="p-4 bg-[#c4b49a] border-b-4 border-black">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevDay}
              className="pixel-button bg-[#8b7355] hover:bg-[#6d5c44] text-white p-2"
              aria-label="이전 날"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="text-center">
              <div className="text-[16px] text-black">{formatDate(currentDate)}</div>
              {entries[currentDate] && (
                <div className="text-[12px] text-[#8b7355] mt-1">저장된 일기가 있습니다</div>
              )}
            </div>
            <button
              onClick={handleNextDay}
              className="pixel-button bg-[#8b7355] hover:bg-[#6d5c44] text-white p-2"
              aria-label="다음 날"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#ebe1d1] space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-[14px] text-[#8b7355] mb-2">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="일기 제목을 입력하세요"
              className="w-full px-4 py-2 bg-white text-black pixel-border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              maxLength={50}
            />
          </div>

          {/* Mood Selection */}
          <div>
            <label className="block text-[14px] text-[#8b7355] mb-2">오늘의 기분</label>
            <div className="flex gap-2">
              {MOOD_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedMood(emoji)}
                  className={`pixel-button p-3 text-[24px] transition-all ${
                    selectedMood === emoji
                      ? 'bg-[#d4af37] hover:bg-[#b8951f]'
                      : 'bg-white hover:bg-[#ebe1d1]'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Content Textarea */}
          <div>
            <label className="block text-[14px] text-[#8b7355] mb-2">내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="오늘 있었던 일을 기록해보세요..."
              rows={10}
              className="w-full px-4 py-2 bg-white text-black pixel-border text-[14px] resize-none focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              maxLength={1000}
            />
            <div className="text-right text-[12px] text-[#8b7355] mt-1">
              {content.length} / 1000
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 pixel-button bg-[#d4af37] hover:bg-[#b8951f] text-white py-3 flex items-center justify-center gap-2"
            >
              <Save size={18} />
              <span className="text-[14px]">저장하기</span>
            </button>
            {entries[currentDate] && (
              <button
                onClick={handleDelete}
                className="pixel-button bg-[#c0392b] hover:bg-[#a93226] text-white py-3 px-4 flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                <span className="text-[14px]">삭제</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#8b7355] text-white text-center py-2 text-[12px] border-t-4 border-black">
          소중한 하루를 기록하세요
        </div>
      </div>
    </div>
  );
}
