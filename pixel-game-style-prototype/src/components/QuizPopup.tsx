import { useState } from 'react';
import { X, Award, ChevronRight } from 'lucide-react';

interface QuizPopupProps {
  onClose: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '세계에서 가장 긴 강은?',
    options: ['나일강', '아마존강', '양쯔강', '미시시피강'],
    correctAnswer: 0,
    explanation: '나일강은 약 6,650km로 세계에서 가장 긴 강입니다.',
  },
  {
    id: 2,
    question: '태양계에서 가장 큰 행성은?',
    options: ['토성', '목성', '천왕성', '해왕성'],
    correctAnswer: 1,
    explanation: '목성은 태양계에서 가장 큰 행성으로, 지구보다 약 11배 큽니다.',
  },
  {
    id: 3,
    question: '세계에서 가장 높은 산은?',
    options: ['K2', '칸첸중가', '에베레스트', '로체'],
    correctAnswer: 2,
    explanation: '에베레스트는 해발 8,849m로 세계에서 가장 높은 산입니다.',
  },
  {
    id: 4,
    question: '빛의 속도는 초당 약 몇 km인가?',
    options: ['100,000km', '200,000km', '300,000km', '400,000km'],
    correctAnswer: 2,
    explanation: '빛의 속도는 초당 약 300,000km (정확히는 299,792km)입니다.',
  },
  {
    id: 5,
    question: '인간의 몸에서 가장 큰 장기는?',
    options: ['간', '폐', '심장', '피부'],
    correctAnswer: 3,
    explanation: '피부는 약 2제곱미터로 인체에서 가장 큰 장기입니다.',
  },
];

export function QuizPopup({ onClose }: QuizPopupProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCorrect, setAnsweredCorrect] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const progress = currentQuestionIndex + 1;
  const total = QUIZ_QUESTIONS.length;

  const handleAnswerSelect = (index: number) => {
    if (!showResult) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setAnsweredCorrect(isCorrect);
    setShowResult(true);

    if (isCorrect) {
      setScore(score + 10); // 정답 시 10코인
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setAnsweredCorrect(false);
    } else {
      // 퀴즈 완료
      alert(`퀴즈 완료! 총 ${score + (answeredCorrect ? 10 : 0)}코인을 획득했습니다!`);
      onClose();
    }
  };

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index
        ? 'bg-[#6b5b95] text-white'
        : 'bg-white hover:bg-[#ebe1d1]';
    }

    if (index === currentQuestion.correctAnswer) {
      return 'bg-[#27ae60] text-white';
    }

    if (selectedAnswer === index && index !== currentQuestion.correctAnswer) {
      return 'bg-[#c0392b] text-white';
    }

    return 'bg-white opacity-50';
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-[600px] max-h-[700px] bg-[#d4c4a8] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#6b5b95] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <span className="text-[18px]">📚 지식 퀴즈</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-[#5a4a85] p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="p-4 bg-[#c4b49a] border-b-4 border-black">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px] text-[#8b7355]">진행률</span>
            <span className="text-[16px] text-black">
              {progress} / {total}
            </span>
          </div>
          <div className="w-full h-4 bg-[#ebe1d1] pixel-border-small">
            <div
              className="h-full bg-[#6b5b95] transition-all duration-300"
              style={{ width: `${(progress / total) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-end gap-2 mt-2">
            <Award size={16} className="text-[#d4af37]" />
            <span className="text-[14px] text-[#8b7355]">
              획득 코인: {score + (showResult && answeredCorrect ? 10 : 0)}
            </span>
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#ebe1d1] space-y-4">
          <div className="bg-white pixel-border p-4">
            <div className="text-[12px] text-[#8b7355] mb-2">문제 {progress}</div>
            <div className="text-[18px] text-black leading-relaxed">
              {currentQuestion.question}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full text-left px-4 py-3 pixel-button text-[14px] transition-all ${getOptionStyle(
                  index
                )}`}
              >
                <span className="inline-block w-8">{index + 1}.</span>
                {option}
              </button>
            ))}
          </div>

          {/* Result Explanation */}
          {showResult && (
            <div
              className={`pixel-border p-4 ${
                answeredCorrect ? 'bg-[#d4edda] border-[#27ae60]' : 'bg-[#f8d7da] border-[#c0392b]'
              }`}
            >
              <div className="text-[16px] mb-2">
                {answeredCorrect ? '정답입니다! 🎉' : '틀렸습니다 😢'}
              </div>
              <div className="text-[14px] text-[#3a3a3a]">{currentQuestion.explanation}</div>
              {answeredCorrect && (
                <div className="text-[14px] text-[#27ae60] mt-2 flex items-center gap-1">
                  <Award size={16} />
                  <span>+10 코인 획득!</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#c4b49a] border-t-4 border-black">
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className={`w-full pixel-button py-3 flex items-center justify-center gap-2 text-[16px] ${
                selectedAnswer === null
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#6b5b95] hover:bg-[#5a4a85] text-white'
              }`}
            >
              <span>답안 제출</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full pixel-button bg-[#6b5b95] hover:bg-[#5a4a85] text-white py-3 flex items-center justify-center gap-2 text-[16px]"
            >
              <span>{currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? '다음 문제' : '완료'}</span>
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
