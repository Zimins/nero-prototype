import { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

const initialPlaylist = [
  { id: 1, title: "Starlight", artist: "Muse" },
  { id: 2, title: "Strawberry Moon", artist: "IU" },
  { id: 3, title: "Night Changes", artist: "One Direction" },
  { id: 4, title: "Dynamite", artist: "BTS" },
];

const availableSongs = [
  { id: 101, title: "Bohemian Rhapsody", artist: "Queen", price: 100 },
  { id: 102, title: "Hotel California", artist: "Eagles", price: 100 },
  { id: 103, title: "Imagine", artist: "John Lennon", price: 100 },
  { id: 104, title: "Billie Jean", artist: "Michael Jackson", price: 100 },
  { id: 105, title: "Wonderwall", artist: "Oasis", price: 100 },
  { id: 106, title: "Yesterday", artist: "The Beatles", price: 100 },
  { id: 107, title: "Sweet Child O' Mine", artist: "Guns N' Roses", price: 100 },
  { id: 108, title: "Smells Like Teen Spirit", artist: "Nirvana", price: 100 },
];

export function JukeboxSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [playlist, setPlaylist] = useState(initialPlaylist);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [points, setPoints] = useState(500);

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const handleBuySong = (song: typeof availableSongs[0]) => {
    if (points >= song.price && !playlist.find(s => s.id === song.id)) {
      setPlaylist([...playlist, song]);
      setPoints(points - song.price);
    }
  };

  return (
    <>
      <div className="w-[200px] bg-white border border-black border-solid">
        <div className="p-4">
          <div className="text-center mb-3">
            <p className="mb-2">쥬크박스</p>
            <p className="text-xs text-gray-500">포인트: {points}P</p>
          </div>
          
          {/* Current Track Info */}
          <div className="bg-gray-50 p-3 mb-3 border border-gray-200">
            <p className="text-sm truncate">{playlist[currentTrack]?.title}</p>
            <p className="text-xs text-gray-500 truncate">{playlist[currentTrack]?.artist}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <button
              onClick={handlePrev}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="이전 곡"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title={isPlaying ? "일시정지" : "재생"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={handleNext}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="다음 곡"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            <Volume2 className="w-4 h-4 text-gray-500" />
          </div>

          {/* Playlist */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">플레이리스트</span>
              <button
                onClick={() => setIsShopOpen(true)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                title="플레이리스트 추가"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1 max-h-[120px] overflow-y-auto">
              {playlist.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setCurrentTrack(index);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left p-2 text-xs rounded transition-colors ${
                    currentTrack === index
                      ? 'bg-blue-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="truncate">{track.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Shop Dialog */}
      <Dialog open={isShopOpen} onOpenChange={setIsShopOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>플레이리스트 상점</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="mb-4 p-3 bg-yellow-50 rounded border border-yellow-200">
              <p className="text-sm">보유 포인트: <span className="font-bold">{points}P</span></p>
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {availableSongs.map((song) => {
                const alreadyOwned = playlist.find(s => s.id === song.id);
                const canAfford = points >= song.price;
                
                return (
                  <div
                    key={song.id}
                    className={`p-3 border rounded flex items-center justify-between ${
                      alreadyOwned ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex-1">
                      <p className="text-sm">{song.title}</p>
                      <p className="text-xs text-gray-500">{song.artist}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{song.price}P</span>
                      <button
                        onClick={() => handleBuySong(song)}
                        disabled={alreadyOwned || !canAfford}
                        className={`px-3 py-1 text-sm rounded transition-colors ${
                          alreadyOwned
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : canAfford
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {alreadyOwned ? '보유중' : '구매'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}