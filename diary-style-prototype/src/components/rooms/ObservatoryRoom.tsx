import { Star, Moon, Cloud } from 'lucide-react';

const diaryEntries = [
  {
    id: 1,
    date: "2025.11.13",
    weather: "맑음",
    mood: "평온함",
    title: "가을의 끝자락",
    content: "오늘은 날씨가 정말 좋았다. 공원을 산책하며 떨어지는 낙엽을 보니 계절의 변화가 느껴졌다. 변화는 늘 새로운 시작을 의미한다는 것을 다시 한번 깨달았다.",
  },
  {
    id: 2,
    date: "2025.11.10",
    weather: "흐림",
    mood: "사색적",
    title: "작은 행복들",
    content: "커피 한 잔의 여유가 주는 평화로움. 때로는 이런 작은 것들이 삶을 지탱해주는 것 같다. 일상 속 소소한 행복을 찾는 연습을 계속해야겠다.",
  },
  {
    id: 3,
    date: "2025.11.05",
    weather: "비",
    mood: "차분함",
    title: "빗소리를 들으며",
    content: "창밖의 빗소리가 마음을 정화시켜준다. 책을 읽으며 보낸 오후, 이런 시간이 참 소중하다. 바쁜 일상 속에서 나를 돌아볼 수 있는 시간.",
  },
  {
    id: 4,
    date: "2025.11.01",
    weather: "맑음",
    mood: "설렘",
    title: "새로운 시작",
    content: "11월이 시작되었다. 올해도 두 달이 채 남지 않았다는 사실이 믿기지 않는다. 남은 시간 동안 더욱 의미있게 보내야겠다는 다짐을 해본다.",
  },
];

const weatherEmoji = {
  "맑음": "☀️",
  "흐림": "☁️",
  "비": "🌧️",
  "눈": "❄️",
};

const moodEmoji = {
  "평온함": "😌",
  "사색적": "🤔",
  "차분함": "😊",
  "설렘": "✨",
};

export function ObservatoryRoom() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <Moon className="w-8 h-8" />
        <h1 className="text-3xl">천문대</h1>
      </div>
      
      <p className="text-gray-600 mb-8">
        밤하늘을 바라보며 적은 나의 생각들. ✨
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-indigo-50 p-4 rounded border border-indigo-200 text-center">
          <Star className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
          <p className="text-2xl mb-1">{diaryEntries.length}</p>
          <p className="text-sm text-gray-600">작성한 일기</p>
        </div>
        <div className="bg-purple-50 p-4 rounded border border-purple-200 text-center">
          <Moon className="w-6 h-6 mx-auto mb-2 text-purple-600" />
          <p className="text-2xl mb-1">15</p>
          <p className="text-sm text-gray-600">밤의 사색</p>
        </div>
        <div className="bg-pink-50 p-4 rounded border border-pink-200 text-center">
          <Cloud className="w-6 h-6 mx-auto mb-2 text-pink-600" />
          <p className="text-2xl mb-1">23</p>
          <p className="text-sm text-gray-600">소중한 순간</p>
        </div>
      </div>

      {/* Diary Entries */}
      <div className="space-y-4">
        {diaryEntries.map((entry) => (
          <div key={entry.id} className="p-5 bg-white border border-gray-200 rounded hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3>{entry.title}</h3>
              <span className="text-sm text-gray-500">{entry.date}</span>
            </div>
            
            <div className="flex gap-4 mb-3 text-sm">
              <span className="flex items-center gap-1">
                <span>{weatherEmoji[entry.weather as keyof typeof weatherEmoji]}</span>
                <span className="text-gray-600">{entry.weather}</span>
              </span>
              <span className="flex items-center gap-1">
                <span>{moodEmoji[entry.mood as keyof typeof moodEmoji]}</span>
                <span className="text-gray-600">{entry.mood}</span>
              </span>
            </div>
            
            <p className="text-gray-700 leading-relaxed">{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
