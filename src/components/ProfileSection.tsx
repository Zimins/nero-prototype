import { ImageWithFallback } from './figma/ImageWithFallback';
import { User, MapPin, Calendar, Edit } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

export function ProfileSection() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '김민지',
    location: '서울, 대한민국',
    status: '"오늘도 좋은 하루 ☀️"',
    level: 15,
    image: 'data:image/jpeg;base64,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'
  });

  const [tempData, setTempData] = useState(profileData);

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditOpen(false);
  };

  return (
    <>
      <div className="w-[200px] relative">
        {/* Profile Image */}
        <div 
          className="relative bg-white size-[200px] border border-black border-solid mb-[20px] cursor-pointer hover:opacity-90 transition-opacity group"
          onClick={() => {
            setTempData(profileData);
            setIsEditOpen(true);
          }}
        >
          <ImageWithFallback
            src={profileData.image}
            alt="프로필 사진"
            className="w-full h-full object-cover"
          />
          {/* Level Badge */}
          <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded border border-black text-sm">
            Lv.{profileData.level}
          </div>
          {/* Hover Edit Indicator */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white rounded-full p-3">
              <Edit className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-white border border-black border-solid p-4">
          <div className="flex items-center justify-between mb-3">
            <h3>{profileData.name}</h3>
            <button
              onClick={() => {
                setTempData(profileData);
                setIsEditOpen(true);
              }}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="프로필 수정"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{profileData.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              <span>2025.11.13</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm italic text-gray-600">{profileData.status}</p>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>프로필 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm mb-2">프로필 이미지 URL</label>
              <input
                type="text"
                value={tempData.image}
                onChange={(e) => setTempData({ ...tempData, image: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">닉네임</label>
              <input
                type="text"
                value={tempData.name}
                onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">레벨</label>
              <input
                type="number"
                value={tempData.level}
                onChange={(e) => setTempData({ ...tempData, level: parseInt(e.target.value) || 1 })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">위치</label>
              <input
                type="text"
                value={tempData.location}
                onChange={(e) => setTempData({ ...tempData, location: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">상태 메시지</label>
              <input
                type="text"
                value={tempData.status}
                onChange={(e) => setTempData({ ...tempData, status: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                저장
              </button>
              <button
                onClick={() => setIsEditOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}