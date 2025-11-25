import { BookOpen, CheckCircle, Circle } from 'lucide-react';

const readingList = [
  { id: 1, title: "멋진 신세계", author: "올더스 헉슬리", status: "completed", rating: 5 },
  { id: 2, title: "1984", author: "조지 오웰", status: "reading", progress: 65 },
  { id: 3, title: "데미안", author: "헤르만 헤세", status: "completed", rating: 4 },
  { id: 4, title: "코스모스", author: "칼 세이건", status: "reading", progress: 30 },
  { id: 5, title: "사피엔스", author: "유발 하라리", status: "planned" },
  { id: 6, title: "총, 균, 쇠", author: "제러드 다이아몬드", status: "planned" },
];

export function StudyRoom() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-8 h-8" />
        <h1 className="text-3xl">서재</h1>
      </div>
      
      <p className="text-gray-600 mb-8">
        현재 읽고 있는 책과 읽고 싶은 책들입니다. 📚
      </p>

      {/* Reading Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 p-4 rounded border border-green-200">
          <p className="text-2xl mb-1">{readingList.filter(b => b.status === 'completed').length}</p>
          <p className="text-sm text-gray-600">완독한 책</p>
        </div>
        <div className="bg-blue-50 p-4 rounded border border-blue-200">
          <p className="text-2xl mb-1">{readingList.filter(b => b.status === 'reading').length}</p>
          <p className="text-sm text-gray-600">읽는 중</p>
        </div>
        <div className="bg-gray-50 p-4 rounded border border-gray-200">
          <p className="text-2xl mb-1">{readingList.filter(b => b.status === 'planned').length}</p>
          <p className="text-sm text-gray-600">읽고 싶은 책</p>
        </div>
      </div>

      {/* Reading List */}
      <div className="space-y-3">
        {readingList.map((book) => (
          <div key={book.id} className="p-4 bg-white border border-gray-200 rounded hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {book.status === 'completed' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-500">{book.author}</p>
                  </div>
                  {book.status === 'completed' && book.rating && (
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < book.rating ? 'text-yellow-500' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {book.status === 'reading' && book.progress && (
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>읽는 중...</span>
                      <span>{book.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
