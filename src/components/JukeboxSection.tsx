// 이원주 수정: useRef, useEffect 임포트 추가
import { useState, useRef, useEffect } from 'react';
// 이원주 수정: Plus 아이콘 복원 (상점 기능 복원)
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Repeat, Repeat1, Shuffle, Plus } from 'lucide-react';
import { Slider } from './ui/slider';
import { cn } from './ui/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

// 이원주 수정: Track 인터페이스 정의
interface Track {
  id: number;
  title: string;
  artist: string;
  audioUrl: string;
  price?: number;
}

// 이원주 수정: RepeatMode 타입 정의
type RepeatMode = 'none' | 'all' | 'one';

// 이원주 수정: public/music 폴더의 모든 MP3 파일 스캔
const musicFiles = import.meta.glob('/public/music/*.mp3', {
  eager: true,
  query: '?url',
  import: 'default'
});

// 이원주 수정: 파일명에서 곡 정보 추출
function parseFileName(filePath: string): { title: string; artist: string } {
  // "/public/music/Starlight - Muse.mp3" → "Starlight - Muse"
  const fileName = filePath.split('/').pop()?.replace('.mp3', '') || '';

  const parts = fileName.split(' - ');
  const title = parts[0]?.trim() || 'Unknown Title';
  const artist = parts[1]?.trim() || 'Unknown Artist';

  return { title, artist };
}

// 이원주 수정: 동적 플레이리스트 생성
function generatePlaylist(): Track[] {
  const files = Object.entries(musicFiles);

  return files.map(([path, url], index) => {
    const { title, artist } = parseFileName(path);

    return {
      id: index + 1,
      title,
      artist,
      audioUrl: url as string
    };
  });
}

// 이원주 수정: 상점에서 구매 가능한 곡 목록 (재생은 안되지만 리스트에 추가됨)
const availableSongs: Track[] = [
  { id: 1001, title: "Strawberry Moon", artist: "IU", audioUrl: "/music/strawberry-moon.mp3", price: 100 },
  { id: 1002, title: "Night Changes", artist: "One Direction", audioUrl: "/music/night-changes.mp3", price: 150 },
  { id: 1003, title: "Shape of You", artist: "Ed Sheeran", audioUrl: "/music/shape-of-you.mp3", price: 200 },
  { id: 1004, title: "Blinding Lights", artist: "The Weeknd", audioUrl: "/music/blinding-lights.mp3", price: 180 },
];

export function JukeboxSection() {
  // 이원주 수정: audioRef 추가
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 기존 state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  // 이원주 수정: 동적으로 플레이리스트 생성 (상점에서 구매한 곡 추가 가능하도록 변경)
  const [playlist, setPlaylist] = useState<Track[]>(() => generatePlaylist());

  // 이원주 수정: 상점 기능 복원
  const [points, setPoints] = useState(500);
  const [isShopOpen, setIsShopOpen] = useState(false);

  // 이원주 수정: 오디오 재생 관련 state 추가
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('none');
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [shuffledPlaylist, setShuffledPlaylist] = useState<Track[]>([]);

  // 이원주 수정: Audio 인스턴스 생성 및 cleanup
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = 'metadata';

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  // 이원주 수정: 곡 변경 시 오디오 로드
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const activePlaylist = isShuffleOn ? shuffledPlaylist : playlist;
    const track = activePlaylist[currentTrack];
    if (!track) return;

    audio.src = track.audioUrl;
    audio.load();
    audio.volume = volume;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.error('자동 재생 실패:', err);
        setIsPlaying(false);
      });
    }
  }, [currentTrack, isShuffleOn, playlist, shuffledPlaylist, isPlaying, volume]);

  // 이원주 수정: 곡 종료 시 처리 (자동 다음 곡 재생)
  const handleTrackEnd = () => {
    if (repeatMode === 'one') {
      // 한 곡 반복
      audioRef.current?.play();
      return;
    }

    const activePlaylist = isShuffleOn ? shuffledPlaylist : playlist;
    const isLastTrack = currentTrack >= activePlaylist.length - 1;

    if (isLastTrack) {
      if (repeatMode === 'all') {
        setCurrentTrack(0); // 처음부터
      } else {
        setIsPlaying(false); // 정지
      }
    } else {
      setCurrentTrack(currentTrack + 1); // 다음 곡
    }
  };

  // 이원주 수정: 오디오 이벤트 리스너 설정
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => handleTrackEnd();
    const handleError = () => {
      console.error('오디오 로드 에러');
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentTrack, repeatMode, isShuffleOn, shuffledPlaylist, playlist]);

  // 이원주 수정: 재생/일시정지 토글
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error('재생 실패:', err);
          alert('재생하려면 버튼을 클릭해주세요.');
        });
    }
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  // 이원주 수정: 시간 포맷 유틸리티
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 이원주 수정: 프로그레스 바 시크 핸들러
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // 이원주 수정: 볼륨 조절 핸들러
  const handleVolumeChange = (values: number[]) => {
    const newVolume = values[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  // 이원주 수정: 음소거 토글
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  // 이원주 수정: Fisher-Yates 셔플 알고리즘
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 이원주 수정: 셔플 모드 토글
  const toggleShuffle = () => {
    if (!isShuffleOn) {
      // 셔플 켜기: 현재 곡을 첫 번째로
      const currentTrackData = playlist[currentTrack];
      const otherTracks = playlist.filter((_, idx) => idx !== currentTrack);
      const shuffled = shuffleArray(otherTracks);
      setShuffledPlaylist([currentTrackData, ...shuffled]);
      setCurrentTrack(0);
    } else {
      // 셔플 끄기: 원래 인덱스 복원
      const currentTrackData = shuffledPlaylist[currentTrack];
      const originalIndex = playlist.findIndex(t => t.id === currentTrackData.id);
      setCurrentTrack(originalIndex);
    }
    setIsShuffleOn(!isShuffleOn);
  };

  // 이원주 수정: 반복 모드 순환
  const cycleRepeatMode = () => {
    const modes: RepeatMode[] = ['none', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  // 이원주 수정: 상점에서 곡 구매 기능 복원 (리스트에만 추가, 재생은 안됨)
  const handleBuySong = (song: Track) => {
    if (!song.price) return;

    if (points >= song.price) {
      // 이미 플레이리스트에 있는지 확인
      const alreadyOwned = playlist.some(track => track.id === song.id);

      if (alreadyOwned) {
        alert('이미 보유한 곡입니다!');
        return;
      }

      // 포인트 차감 및 플레이리스트에 추가
      setPoints(points - song.price);
      setPlaylist([...playlist, song]);
      alert(`"${song.title}" 구매 완료! (재생은 지원되지 않습니다)`);
    } else {
      alert('포인트가 부족합니다!');
    }
  };

  return (
    <>
      <div className="w-[200px] bg-white border border-black border-solid">
        <div className="p-4">
          {/* 이원주 수정: 포인트 표시 복원 */}
          <div className="text-center mb-3">
            <p className="mb-2">쥬크박스</p>
            <p className="text-xs text-gray-500">포인트: {points}P</p>
          </div>
          
          {/* Current Track Info */}
          <div className="bg-gray-50 p-3 mb-2 border border-gray-200">
            <p className="text-sm truncate">{playlist[currentTrack]?.title}</p>
            <p className="text-xs text-gray-500 truncate">{playlist[currentTrack]?.artist}</p>
          </div>

          {/* 이원주 수정: 프로그레스 바 및 시간 표시 */}
          <div className="mb-2">
            <div
              className="w-full h-1 bg-gray-300 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-0.5">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
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
            {/* 이원주 수정: togglePlayPause 사용 */}
            <button
              onClick={togglePlayPause}
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
          </div>

          {/* 이원주 수정: 반복/셔플 + 볼륨 조절 */}
          <div className="flex items-center justify-between mb-3 px-2">
            {/* 왼쪽: 반복/셔플 */}
            <div className="flex items-center gap-1">
              <button
                onClick={cycleRepeatMode}
                className={cn(
                  "p-1 hover:bg-gray-100 rounded transition-colors",
                  repeatMode !== 'none' && "text-blue-500"
                )}
                title={`반복: ${repeatMode === 'none' ? '없음' : repeatMode === 'all' ? '전체' : '한곡'}`}
              >
                {repeatMode === 'one' ? (
                  <Repeat1 className="w-4 h-4" />
                ) : (
                  <Repeat className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={toggleShuffle}
                className={cn(
                  "p-1 hover:bg-gray-100 rounded transition-colors",
                  isShuffleOn && "text-blue-500"
                )}
                title={isShuffleOn ? '셔플 켜짐' : '셔플 꺼짐'}
              >
                <Shuffle className="w-4 h-4" />
              </button>
            </div>

            {/* 오른쪽: 볼륨 */}
            <div className="flex items-center gap-1">
              <button
                onClick={toggleMute}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                title={isMuted ? "음소거 해제" : "음소거"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-gray-600" />
                ) : (
                  <Volume2 className="w-4 h-4 text-gray-600" />
                )}
              </button>
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={handleVolumeChange}
                max={1}
                step={0.01}
                className="w-14"
              />
            </div>
          </div>

          {/* Playlist */}
          <div className="mb-3">
            {/* 이원주 수정: + 버튼 복원 (상점 기능 복원) */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">플레이리스트</span>
              <button
                onClick={() => setIsShopOpen(true)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                title="곡 구매"
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

      {/* 이원주 수정: 상점 다이얼로그 복원 (리스트 추가 기능만 제공, 실제 재생 불가) */}
      <Dialog open={isShopOpen} onOpenChange={setIsShopOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>곡 구매</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-2">
              보유 포인트: <span className="font-bold text-blue-600">{points}P</span>
            </div>
            <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded border border-orange-200">
              ⚠️ 구매한 곡은 플레이리스트에 추가되지만 실제 재생은 지원되지 않습니다.
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {availableSongs.map((song) => {
                const owned = playlist.some(track => track.id === song.id);
                return (
                  <div
                    key={song.id}
                    className="flex items-center justify-between p-3 border rounded hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{song.title}</p>
                      <p className="text-xs text-gray-500">{song.artist}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-blue-600">{song.price}P</span>
                      <button
                        onClick={() => handleBuySong(song)}
                        disabled={owned || points < (song.price || 0)}
                        className={`px-3 py-1 text-xs rounded transition-colors ${
                          owned
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : points < (song.price || 0)
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        {owned ? '보유중' : '구매'}
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