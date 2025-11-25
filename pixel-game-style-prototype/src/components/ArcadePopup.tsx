import { useState } from 'react';
import { X, Gamepad2, Trophy, Coins } from 'lucide-react';

interface ArcadePopupProps {
  onClose: () => void;
}

type GameId = 'rps' | null;

export function ArcadePopup({ onClose }: ArcadePopupProps) {
  const [selectedGame, setSelectedGame] = useState<GameId>(null);
  const [userChoice, setUserChoice] = useState<'rock' | 'paper' | 'scissors' | null>(null);
  const [computerChoice, setComputerChoice] = useState<'rock' | 'paper' | 'scissors' | null>(null);
  const [result, setResult] = useState<'win' | 'lose' | 'draw' | null>(null);
  const [score, setScore] = useState(0);

  const games = [
    {
      id: 'rps',
      name: '가위바위보',
      icon: '✊✋✌️',
      description: '컴퓨터와 가위바위보 대결!',
      reward: '승리시 10코인',
      color: '#9b59b6',
    },
    {
      id: 'slot',
      name: '슬롯머신',
      icon: '🎰',
      description: '행운의 슬롯머신',
      reward: '잭팟시 100코인',
      color: '#f39c12',
    },
    {
      id: 'memory',
      name: '기억력 게임',
      icon: '🃏',
      description: '카드 짝 맞추기',
      reward: '클리어시 20코인',
      color: '#e74c3c',
    },
    {
      id: 'quiz',
      name: '픽셀 퀴즈',
      icon: '❓',
      description: '재미있는 퀴즈 풀기',
      reward: '정답시 15코인',
      color: '#3498db',
    },
  ];

  const playRPS = (choice: 'rock' | 'paper' | 'scissors') => {
    const choices: ('rock' | 'paper' | 'scissors')[] = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    setUserChoice(choice);
    setComputerChoice(computerChoice);

    if (choice === computerChoice) {
      setResult('draw');
    } else if (
      (choice === 'rock' && computerChoice === 'scissors') ||
      (choice === 'paper' && computerChoice === 'rock') ||
      (choice === 'scissors' && computerChoice === 'paper')
    ) {
      setResult('win');
      setScore(score + 10);
    } else {
      setResult('lose');
    }
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  const getChoiceEmoji = (choice: 'rock' | 'paper' | 'scissors' | null) => {
    if (!choice) return '❓';
    switch (choice) {
      case 'rock': return '✊';
      case 'paper': return '✋';
      case 'scissors': return '✌️';
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-[700px] max-h-[700px] bg-[#d4c4a8] pixel-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#9b59b6] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-3">
            <span className="text-[20px]">🎮</span>
            <div className="flex flex-col">
              <span className="text-[18px]">픽셀 오락실</span>
              <div className="flex items-center gap-2 text-[12px] opacity-90">
                <Coins size={14} />
                <span>{score} 코인</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-purple-700 p-1 transition-colors pixel-border-small"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Game Selection */}
        {!selectedGame && (
          <div className="flex-1 overflow-y-auto p-4 bg-[#ebe1d1]">
            <div className="mb-4 text-center">
              <h2 className="text-[20px] text-black mb-2">게임을 선택하세요</h2>
              <p className="text-[13px] text-[#8b7355]">다양한 미니게임으로 코인을 획득하세요!</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {games.map((game) => (
                <button
                  key={game.id}
                  onClick={() => game.id === 'rps' ? setSelectedGame('rps') : null}
                  disabled={game.id !== 'rps'}
                  className={`bg-white pixel-border p-6 hover:scale-105 transition-all text-center ${
                    game.id !== 'rps' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  style={{ borderColor: game.color }}
                >
                  <div className="text-[48px] mb-3">{game.icon}</div>
                  <h3 className="text-[16px] text-black mb-2">{game.name}</h3>
                  <p className="text-[12px] text-[#8b7355] mb-2">{game.description}</p>
                  <div className="flex items-center justify-center gap-1 text-[11px]" style={{ color: game.color }}>
                    <Trophy size={12} />
                    <span>{game.reward}</span>
                  </div>
                  {game.id !== 'rps' && (
                    <div className="mt-2 text-[10px] text-[#8b7355]">준비 중</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Rock Paper Scissors Game */}
        {selectedGame === 'rps' && (
          <div className="flex-1 overflow-y-auto p-6 bg-[#ebe1d1]">
            <button
              onClick={() => {
                setSelectedGame(null);
                resetGame();
              }}
              className="text-[13px] text-[#8b7355] hover:text-black mb-4"
            >
              ← 게임 목록으로
            </button>

            <div className="bg-white pixel-border p-6">
              <h2 className="text-[20px] text-center text-black mb-6">✊✋✌️ 가위바위보</h2>

              {/* Game Area */}
              <div className="flex items-center justify-around mb-8">
                <div className="text-center">
                  <div className="text-[13px] text-[#8b7355] mb-2">당신</div>
                  <div className="text-[72px] mb-2">{getChoiceEmoji(userChoice)}</div>
                  {userChoice && (
                    <div className="text-[14px] text-black">
                      {userChoice === 'rock' ? '바위' : userChoice === 'paper' ? '보' : '가위'}
                    </div>
                  )}
                </div>

                <div className="text-[32px] text-[#8b7355]">VS</div>

                <div className="text-center">
                  <div className="text-[13px] text-[#8b7355] mb-2">컴퓨터</div>
                  <div className="text-[72px] mb-2">{getChoiceEmoji(computerChoice)}</div>
                  {computerChoice && (
                    <div className="text-[14px] text-black">
                      {computerChoice === 'rock' ? '바위' : computerChoice === 'paper' ? '보' : '가위'}
                    </div>
                  )}
                </div>
              </div>

              {/* Result */}
              {result && (
                <div className="text-center mb-6">
                  <div className={`text-[24px] mb-2 ${
                    result === 'win' ? 'text-[#2ecc71]' : result === 'lose' ? 'text-[#e74c3c]' : 'text-[#8b7355]'
                  }`}>
                    {result === 'win' ? '🎉 승리!' : result === 'lose' ? '😢 패배!' : '🤝 무승부!'}
                  </div>
                  {result === 'win' && (
                    <div className="text-[14px] text-[#2ecc71]">+10 코인 획득!</div>
                  )}
                </div>
              )}

              {/* Choice Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => playRPS('rock')}
                  disabled={result !== null}
                  className="pixel-button bg-[#e74c3c] hover:bg-[#c0392b] text-white px-8 py-4 text-[48px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✊
                </button>
                <button
                  onClick={() => playRPS('paper')}
                  disabled={result !== null}
                  className="pixel-button bg-[#3498db] hover:bg-[#2980b9] text-white px-8 py-4 text-[48px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✋
                </button>
                <button
                  onClick={() => playRPS('scissors')}
                  disabled={result !== null}
                  className="pixel-button bg-[#2ecc71] hover:bg-[#27ae60] text-white px-8 py-4 text-[48px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✌️
                </button>
              </div>

              {/* Reset Button */}
              {result && (
                <div className="text-center mt-6">
                  <button
                    onClick={resetGame}
                    className="pixel-button bg-[#9b59b6] hover:bg-[#8e44ad] text-white px-8 py-2 text-[14px]"
                  >
                    다시 하기
                  </button>
                </div>
              )}

              <div className="text-center mt-6 text-[12px] text-[#8b7355]">
                승리하면 10코인을 획득합니다!
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-[#8b7355] text-white text-center py-2 text-[12px] border-t-4 border-black flex items-center justify-center gap-2">
          <Gamepad2 size={14} />
          <span>즐거운 게임으로 코인을 모아보세요</span>
        </div>
      </div>
    </div>
  );
}
