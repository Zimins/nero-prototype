import { useState, useRef, useEffect } from 'react';
import { X, Save, Upload } from 'lucide-react';

interface AmbiancePopupProps {
  onClose: () => void;
}

interface SoundSettings {
  rain: number;
  wind: number;
  fire: number;
  bamboo: number;
}

interface Preset {
  id: string;
  name: string;
  lightingMode: string;
  sounds: SoundSettings;
}

type LightingMode = 'bright' | 'dusk' | 'night' | 'candle';

export function AmbiancePopup({ onClose }: AmbiancePopupProps) {
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 250, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [lightingMode, setLightingMode] = useState<LightingMode>('bright');
  const [sounds, setSounds] = useState<SoundSettings>({
    rain: 50,
    wind: 30,
    fire: 70,
    bamboo: 20,
  });
  const [presets, setPresets] = useState<Preset[]>([
    {
      id: '1',
      name: '아침 명상',
      lightingMode: 'bright',
      sounds: { rain: 20, wind: 40, fire: 30, bamboo: 50 },
    },
    {
      id: '2',
      name: '저녁 휴식',
      lightingMode: 'dusk',
      sounds: { rain: 60, wind: 20, fire: 80, bamboo: 10 },
    },
    {
      id: '3',
      name: '깊은 밤',
      lightingMode: 'night',
      sounds: { rain: 80, wind: 50, fire: 40, bamboo: 30 },
    },
  ]);
  const [newPresetName, setNewPresetName] = useState('');
  const [showSaveInput, setShowSaveInput] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.no-drag')) return;

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      const maxX = window.innerWidth - 500;
      const maxY = window.innerHeight - 700;

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleSoundChange = (soundType: keyof SoundSettings, value: number) => {
    setSounds({
      ...sounds,
      [soundType]: value,
    });
  };

  const handleSavePreset = () => {
    if (newPresetName.trim()) {
      const newPreset: Preset = {
        id: Date.now().toString(),
        name: newPresetName,
        lightingMode,
        sounds: { ...sounds },
      };
      setPresets([...presets, newPreset]);
      setNewPresetName('');
      setShowSaveInput(false);
    }
  };

  const handleLoadPreset = (preset: Preset) => {
    setLightingMode(preset.lightingMode as LightingMode);
    setSounds({ ...preset.sounds });
  };

  const handleDeletePreset = (presetId: string) => {
    setPresets(presets.filter(p => p.id !== presetId));
  };

  const getLightingModeDisplay = (mode: string) => {
    switch (mode) {
      case 'bright': return '☀️ 밝음';
      case 'dusk': return '🌅 황혼';
      case 'night': return '🌙 야간';
      case 'candle': return '🕯️ 촛불';
      default: return mode;
    }
  };

  const getLightingColor = (mode: string) => {
    switch (mode) {
      case 'bright': return '#faed96';
      case 'dusk': return '#e67e22';
      case 'night': return '#2c3e50';
      case 'candle': return '#d4af37';
      default: return '#c4b49a';
    }
  };

  return (
    <div
      ref={popupRef}
      className={`fixed z-50 w-[500px] bg-[#d4c4a8] pixel-border shadow-2xl ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className="bg-[#e67e22] text-white px-4 py-3 flex items-center justify-between border-b-4 border-black">
        <div className="flex items-center gap-2">
          <span className="text-[18px] font-bold">🔥 분위기 설정</span>
        </div>
        <button
          onClick={onClose}
          className="no-drag hover:bg-red-500 p-1 transition-colors pixel-border-small"
          aria-label="닫기"
        >
          <X size={18} />
        </button>
      </div>

      {/* Lighting Mode Selection */}
      <div className="p-4 bg-[#c4b49a] border-b-4 border-black">
        <div className="text-[14px] text-[#3a3a3a] mb-3 font-bold">💡 조명 모드</div>
        <div className="grid grid-cols-2 gap-2">
          {(['bright', 'dusk', 'night', 'candle'] as LightingMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setLightingMode(mode)}
              className={`no-drag pixel-button py-3 text-[14px] font-bold transition-all ${
                lightingMode === mode
                  ? 'border-4 scale-105'
                  : 'border-2'
              }`}
              style={{
                backgroundColor: lightingMode === mode ? getLightingColor(mode) : 'white',
                color: mode === 'night' && lightingMode === mode ? 'white' : 'black',
              }}
            >
              {getLightingModeDisplay(mode)}
            </button>
          ))}
        </div>
      </div>

      {/* Sound Sliders */}
      <div className="p-4 bg-[#ebe1d1] border-b-4 border-black">
        <div className="text-[14px] text-[#3a3a3a] mb-3 font-bold">🔊 사운드 설정</div>
        <div className="space-y-4">
          {/* Rain */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-bold">🌧️ 빗소리</span>
              <span className="text-[12px] text-[#8b7355]">{sounds.rain}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sounds.rain}
              onChange={(e) => handleSoundChange('rain', parseInt(e.target.value))}
              className="no-drag w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3498db 0%, #3498db ${sounds.rain}%, #d1d5db ${sounds.rain}%, #d1d5db 100%)`,
              }}
            />
          </div>

          {/* Wind */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-bold">💨 바람소리</span>
              <span className="text-[12px] text-[#8b7355]">{sounds.wind}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sounds.wind}
              onChange={(e) => handleSoundChange('wind', parseInt(e.target.value))}
              className="no-drag w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #95a5a6 0%, #95a5a6 ${sounds.wind}%, #d1d5db ${sounds.wind}%, #d1d5db 100%)`,
              }}
            />
          </div>

          {/* Fire */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-bold">🔥 화로소리</span>
              <span className="text-[12px] text-[#8b7355]">{sounds.fire}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sounds.fire}
              onChange={(e) => handleSoundChange('fire', parseInt(e.target.value))}
              className="no-drag w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #e67e22 0%, #e67e22 ${sounds.fire}%, #d1d5db ${sounds.fire}%, #d1d5db 100%)`,
              }}
            />
          </div>

          {/* Bamboo */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-bold">🎋 대나무 바람</span>
              <span className="text-[12px] text-[#8b7355]">{sounds.bamboo}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sounds.bamboo}
              onChange={(e) => handleSoundChange('bamboo', parseInt(e.target.value))}
              className="no-drag w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #27ae60 0%, #27ae60 ${sounds.bamboo}%, #d1d5db ${sounds.bamboo}%, #d1d5db 100%)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Preset Management */}
      <div className="bg-[#ebe1d1] max-h-[200px] overflow-y-auto">
        <div className="p-3 bg-[#a89378] border-b-2 border-black flex items-center justify-between sticky top-0">
          <span className="text-[14px] text-white font-bold">💾 프리셋</span>
          <button
            onClick={() => setShowSaveInput(!showSaveInput)}
            className="no-drag pixel-button bg-[#27ae60] hover:bg-[#229954] text-white px-3 py-1 text-[12px] flex items-center gap-1"
          >
            <Save size={14} />
            저장
          </button>
        </div>

        {showSaveInput && (
          <div className="p-3 bg-[#faed96] border-b-2 border-black">
            <div className="flex gap-2">
              <input
                type="text"
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                placeholder="프리셋 이름"
                className="no-drag flex-1 px-3 py-2 border-2 border-black text-[12px]"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSavePreset();
                }}
              />
              <button
                onClick={handleSavePreset}
                className="no-drag pixel-button bg-[#27ae60] hover:bg-[#229954] text-white px-3 py-2 text-[12px]"
              >
                저장
              </button>
            </div>
          </div>
        )}

        <div className="divide-y-2 divide-[#c4b49a]">
          {presets.map((preset) => (
            <div
              key={preset.id}
              className="p-3 bg-white hover:bg-[#f5f5f5] transition-colors flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="text-[14px] font-bold text-[#2d4739]">{preset.name}</div>
                <div className="text-[11px] text-[#8b7355]">
                  {getLightingModeDisplay(preset.lightingMode)}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleLoadPreset(preset)}
                  className="no-drag pixel-button bg-[#3498db] hover:bg-[#2980b9] text-white px-3 py-1 text-[11px] flex items-center gap-1"
                >
                  <Upload size={12} />
                  불러오기
                </button>
                <button
                  onClick={() => handleDeletePreset(preset.id)}
                  className="no-drag pixel-button bg-[#c0392b] hover:bg-[#a93226] text-white px-2 py-1"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-[#e67e22] text-white text-center py-2 text-[12px] border-t-4 border-black">
        원하는 분위기를 만들어보세요
      </div>
    </div>
  );
}
