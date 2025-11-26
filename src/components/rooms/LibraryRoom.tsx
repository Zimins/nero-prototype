import { Library, Star, TrendingUp } from 'lucide-react';

const bookCollection = [
  { category: "문학", books: ["데미안", "수레바퀴 아래서", "나르치스와 골드문트"], color: "bg-red-50 border-red-200" },
  { category: "과학", books: ["코스모스", "이기적 유전자", "시간의 역사"], color: "bg-blue-50 border-blue-200" },
  { category: "철학", books: ["존재와 시간", "차라투스트라는 이렇게 말했다", "명상록"], color: "bg-purple-50 border-purple-200" },
  { category: "역사", books: ["사피엔스", "총, 균, 쇠", "문명의 붕괴"], color: "bg-green-50 border-green-200" },
  { category: "심리학", books: ["생각에 관한 생각", "설득의 심리학", "프로이트의 의자"], color: "bg-yellow-50 border-yellow-200" },
  { category: "자기계발", books: ["습관의 힘", "미라클 모닝", "원씽"], color: "bg-orange-50 border-orange-200" },
];

const favoriteQuotes = [
  { quote: "새는 알에서 나오려고 투쟁한다.", book: "데미안", author: "헤르만 헤세" },
  { quote: "우리는 모두 별의 조각이다.", book: "코스모스", author: "칼 세이건" },
  { quote: "삶이 그대를 속일지라도 슬퍼하거나 노하지 말라.", book: "삶이 그대를 속일지라도", author: "푸시킨" },
];

export function LibraryRoom() {
  // 이원주 수정: 도서관 크기 1364x768 고정
  return (
    <div className="overflow-auto p-8" style={{ width: '1364px', height: '768px' }}>
      <div className="flex items-center gap-3 mb-6">
        <Library className="w-8 h-8" />
        <h1 className="text-3xl">도서관</h1>
      </div>
      
      <p className="text-gray-600 mb-8">
        카테고리별로 정리된 저의 책 컬렉션입니다. 📖
      </p>

      {/* Favorite Quotes */}
      <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded border border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500" />
          <h2 className="text-xl">좋아하는 구절</h2>
        </div>
        <div className="space-y-4">
          {favoriteQuotes.map((item, index) => (
            <div key={index} className="border-l-4 border-purple-400 pl-4">
              <p className="italic mb-2">"{item.quote}"</p>
              <p className="text-sm text-gray-600">- {item.book}, {item.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Book Collection by Category */}
      <div className="mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5" />
        <h2 className="text-xl">카테고리별 컬렉션</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {bookCollection.map((category) => (
          <div key={category.category} className={`p-4 rounded border ${category.color}`}>
            <h3 className="mb-3">{category.category}</h3>
            <ul className="space-y-2">
              {category.books.map((book, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span>{book}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
