import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Sprout, Heart, Camera, Music, Palette, Plane } from 'lucide-react';

const hobbies = [
  {
    id: 1,
    icon: Camera,
    title: "사진 촬영",
    description: "일상의 아름다운 순간들을 카메라에 담는 것을 좋아합니다.",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=500&h=300&fit=crop",
    color: "bg-blue-50 border-blue-200"
  },
  {
    id: 2,
    icon: Music,
    title: "음악 감상",
    description: "다양한 장르의 음악을 들으며 감성을 충전합니다.",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=300&fit=crop",
    color: "bg-purple-50 border-purple-200"
  },
  {
    id: 3,
    icon: Palette,
    title: "그림 그리기",
    description: "수채화로 풍경과 일상을 표현하는 시간이 행복합니다.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=300&fit=crop",
    color: "bg-pink-50 border-pink-200"
  },
  {
    id: 4,
    icon: Plane,
    title: "여행",
    description: "새로운 장소를 탐험하고 다른 문화를 경험하는 것을 즐깁니다.",
    image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=500&h=300&fit=crop",
    color: "bg-green-50 border-green-200"
  },
];

export function GreenhouseRoom() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <Sprout className="w-8 h-8" />
        <h1 className="text-3xl">온실</h1>
      </div>
      
      <p className="text-gray-600 mb-8">
        제 취미와 관심사를 키우는 공간입니다. 🌱
      </p>

      {/* Introduction */}
      <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded border border-green-200">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-5 h-5 text-red-500" />
          <h2 className="text-xl">관심사 소개</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          저는 일상의 소소한 아름다움을 발견하고 기록하는 것을 좋아합니다. 
          사진, 음악, 그림, 여행을 통해 세상을 더 풍요롭게 경험하려 노력하고 있습니다. 
          각각의 취미는 저에게 다른 방식으로 영감을 주고, 삶의 활력을 불어넣어 줍니다.
        </p>
      </div>

      {/* Hobbies Grid */}
      <div className="grid grid-cols-1 gap-6">
        {hobbies.map((hobby) => (
          <div key={hobby.id} className={`p-5 rounded border ${hobby.color} hover:shadow-lg transition-shadow`}>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <ImageWithFallback
                  src={hobby.image}
                  alt={hobby.title}
                  className="w-[200px] h-[150px] object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <hobby.icon className="w-6 h-6" />
                  <h3>{hobby.title}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{hobby.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Future Goals */}
      <div className="mt-8 p-6 bg-yellow-50 rounded border border-yellow-200">
        <h2 className="text-xl mb-4">앞으로 해보고 싶은 것들</h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-yellow-600">✓</span>
            <span>전시회 관람하며 예술 감각 키우기</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600">✓</span>
            <span>악기 하나 배워서 연주할 수 있게 되기</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600">✓</span>
            <span>유럽 배낭여행 떠나기</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600">✓</span>
            <span>개인 사진전 열기</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
