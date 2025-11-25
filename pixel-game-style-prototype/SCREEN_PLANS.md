# Pixel Game Style Prototype - 미구현 화면 기능 계획서

## 개요

이 문서는 pixel-game-style-prototype 프로젝트의 미구현 화면들에 대한 상세 기능 계획을 담고 있습니다.

---

# 1. 서재 (Study Room)

## 컨셉
**"지식과 창작의 아늑한 공간"** - 오래된 책들과 필기구, 따뜻한 조명이 있는 지적이고 차분한 공간

## 색상 팔레트
- 짙은 나무색: `#5a4a3a`
- 가죽 브라운: `#8b5a2b`
- 황금빛 조명: `#d4af37`
- 양피지 베이지: `#f5e6c8`

## 인터랙티브 오브젝트

| 오브젝트 | 위치 | 기능 | 호버 효과 |
|---------|------|------|----------|
| 책상 램프 + 일기장 | 중앙-좌측 | 일기장 작성/열람 | `neon-glow-gold` |
| 책장 | 우측 벽면 | 지식 퀴즈 게임 | `neon-glow-purple` |
| 지구본 | 좌측/책상 옆 | 오늘의 운세 | `neon-glow-cyan` |

## 주요 기능

### 1.1 일기장 (DiaryPopup)
- 날짜별 일기 작성/수정/삭제
- 기분 이모지 선택 (기쁨, 평온, 우울, 신남, 피곤)
- 캘린더 네비게이션
- 로컬스토리지 저장

### 1.2 지식 퀴즈 (QuizPopup)
- 일일 퀴즈 5문제
- 카테고리: 음악사, 악기, 아티스트, 장르
- 정답 시 코인 보상 (난이도별 50~200코인)
- 연속 정답 보너스

### 1.3 오늘의 운세 (FortunePopup)
- 일일 1회 운세 확인
- 행운의 장르 & 추천곡 제공
- 쥬크박스 연동 (바로 재생)

## 데이터 타입
```typescript
interface DiaryEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: 'happy' | 'calm' | 'sad' | 'excited' | 'tired';
}

interface QuizQuestion {
  id: number;
  category: 'music-history' | 'instruments' | 'artists' | 'genres';
  question: string;
  options: string[];
  correctAnswer: number;
  reward: number;
}
```

---

# 2. 도서관 (Library)

## 컨셉
**"마법의 고서관"** - 웅장하고 신비로운 대형 도서관, 끝없이 이어지는 책장과 떠다니는 책들

## 서재와의 차별점
| 서재 | 도서관 |
|------|--------|
| 개인 작업 공간 | 대형 공공 공간 |
| 아늑하고 집중적 | 웅장하고 신비로운 |
| 글쓰기, 메모 | 책 탐색, 지식 수집 |

## 색상 팔레트
- 미드나잇 블루: `#1a1a2e`
- 버건디 레드: `#8b0a1a`
- 골드: `#d4af37`
- 다크 월넛: `#4a3728`

## 인터랙티브 오브젝트

| 오브젝트 | 기능 | 호버 효과 |
|---------|------|----------|
| 거대 책장 | 책 컬렉션 도감 | `neon-glow-gold` |
| 지구본 & 고지도 | 지식 지도 (읽은 책 통계) | `neon-glow-cyan` |
| 마법의 독서대 | 오늘의 글귀/명언 | `neon-glow-purple` |
| 수면 고양이 | 이스터에그 | - |

## 주요 기능

### 2.1 책 컬렉션 (BookCollectionPopup)
- 수집한 책 목록 그리드
- 카테고리별 필터 (소설, 시, 에세이, 역사)
- 읽기 진행률 표시
- 책 상세 정보 모달

### 2.2 지식 지도 (KnowledgeMapPopup)
- 픽셀 판타지 지도 UI
- 장르별 "영토" 개척 시스템
- 업적 시스템 연동

### 2.3 오늘의 글귀 (DailyQuotePopup)
- 랜덤 명언/문구
- 저장 및 공유 기능

## 데이터 타입
```typescript
interface Book {
  id: number;
  title: string;
  author: string;
  category: 'novel' | 'poetry' | 'essay' | 'history';
  totalPages: number;
  readPages: number;
  status: 'unread' | 'reading' | 'completed';
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  progress: number;
  unlocked: boolean;
}
```

---

# 3. 천문대 (Observatory)

## 컨셉
**"별을 바라보는 밤"** - 밤하늘 아래서 별을 관측하고 별자리를 수집하는 신비로운 공간

## 색상 팔레트
- 깊은 남색: `#0a1628`
- 진한 보라: `#1a1040`
- 별빛 노랑: `#ffd700`
- 은빛 백색: `#e8e8ff`

## 인터랙티브 오브젝트

| 오브젝트 | 위치 | 기능 | 호버 효과 |
|---------|------|------|----------|
| 망원경 | 중앙-좌측 | 별자리 관측 | `neon-glow-blue` |
| 천구의 | 우측 테이블 | 별자리 도감 | `neon-glow-gold` |
| 연구 노트 | 책상 위 | 오늘의 운세 | `neon-glow-purple` |

## 주요 기능

### 3.1 별자리 관측 (TelescopePopup)
- 망원경 뷰파인더 UI (원형)
- 별 연결하여 별자리 완성
- 시즌별 관측 가능 별자리 변경
- 힌트 시스템

### 3.2 별자리 도감 (ConstellationCollectionPopup)
- 수집한 별자리 그리드
- 별자리별 유래/신화 스토리
- 계절 탭 (봄/여름/가을/겨울/특별)

### 3.3 오늘의 별점 (StarFortunePopup)
- 생년월일 기반 별자리 운세
- 카테고리: 전체운, 연애운, 금전운, 건강운
- 행운의 색상/숫자/별자리

## 데이터 타입
```typescript
interface Constellation {
  id: string;
  name: string;
  koreanName: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter' | 'special';
  stars: string[];
  story: string;
  rewardCoins: number;
}

type ZodiacSign = 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo' |
                  'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';
```

---

# 4. 온실 (Greenhouse)

## 컨셉
**"픽셀 마법의 온실"** - 따뜻한 햇살이 들어오는 유리 온실에서 식물을 키우는 힐링 공간

## 색상 팔레트
- 숲 녹색: `#4a7c59`
- 나무색: `#c9a66b`
- 밝은 초록: `#7cb342`
- 꽃 포인트: `#ff6b9d`, `#ffd93d`, `#6bcbff`

## 인터랙티브 오브젝트

| 오브젝트 | 기능 | 호버 효과 |
|---------|------|----------|
| 화분대 | 식물 관리/도감 | `neon-glow-green` |
| 물뿌리개 | 물주기 | `neon-glow-blue` |
| 씨앗 상자 | 새 식물 심기 | `neon-glow-yellow` |

## 주요 기능

### 4.1 식물 관리 (PlantManagementPopup)
- 현재 키우는 식물 목록 (최대 6개)
- 성장 진행도 표시
- 수집 도감 (완성한 식물)
- 수확 및 보상

### 4.2 물주기 시스템
- 물통 게이지 (시간 경과로 충전)
- 각 식물에 개별 물주기
- 성장 속도 증가 효과

### 4.3 씨앗 심기 (SeedBoxPopup)
- 보유 씨앗 목록
- 성장 기간/보상 정보
- 빈 화분에 심기

## 식물 성장 시스템
```
씨앗 → 새싹 (1-2일) → 성장 중 (3-5일) → 개화 완성
```

## 데이터 타입
```typescript
type PlantStage = 'seed' | 'sprout' | 'growing' | 'blooming';

interface GrowingPlant {
  id: string;
  plantTypeId: string;
  plantedAt: Date;
  currentStage: PlantStage;
  growthProgress: number;
  lastWatered: Date | null;
}

interface PlantType {
  id: string;
  name: string;
  growthDays: number;
  reward: { coins: number; specialItem?: string };
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
}
```

---

# 5. 다실 (Tea Room)

## 컨셉
**"고요한 한국 전통 다실"** - 동양적 미니멀리즘, 전통과 힐링이 어우러진 명상적 공간

## 색상 팔레트
- 짙은 초록: `#2d4739`
- 크림색 한지: `#f5e6d3`
- 다갈색 목재: `#8b4513`
- 골드 악센트: `#d4af37`

## 인터랙티브 오브젝트

| 오브젝트 | 기능 | 호버 효과 |
|---------|------|----------|
| 찻상 | 다도 체험/차 수집 | `neon-glow-tea` |
| 족자 | 명상 & 명언 | `neon-glow-gold` |
| 화로 | 분위기 설정 | `neon-glow-ember` |

## 주요 기능

### 5.1 다도 체험 (TeaCeremonyPopup)
- 차 우리기 타이머 (30초~1분)
- 차 컬렉션 시스템 (30종)
- 차별 명상 문구 표시

### 5.2 명상 (MeditationPopup)
- 매일 새로운 동양 고전 명언
- 명상 타이머 (5/10/15분)
- 명언 저장 기능
- 명상 스트릭 시스템

### 5.3 분위기 설정 (AmbiancePopup)
- 조명 모드 (밝음/황혼/야간/촛불)
- ASMR 사운드 믹서 (빗소리, 바람, 화로, 대나무)
- 프리셋 저장/불러오기

## 데이터 타입
```typescript
type TeaCategory = 'green' | 'black' | 'oolong' | 'white' | 'puerh' | 'herbal';
type LightingMode = 'bright' | 'evening' | 'night' | 'candle';

interface Tea {
  id: string;
  name: string;
  category: TeaCategory;
  brewTime: number;
  quote: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
}

interface MeditationSession {
  duration: 5 | 10 | 15;
  startTime: Date;
  currentQuote: Quote;
}
```

---

# 6. 외출 (Outing)

## 컨셉
**"픽셀 마을 광장"** - 집을 나서면 펼쳐지는 아기자기한 마을, 소셜/미니게임 공간

## 시간대별 배경
- 아침/낮: 밝고 화창
- 저녁: 노을빛
- 밤: 별빛과 가로등

## 인터랙티브 오브젝트

| 오브젝트 | 기능 | 호버 효과 |
|---------|------|----------|
| 게시판 | 공지/자유게시판 | `neon-glow-blue` |
| 분수대 | 오픈 채팅방 | `neon-glow-cyan` |
| 우편함 | 메시지/선물 | `neon-glow-red` |
| 오락실 | 미니게임 | `neon-glow-yellow` |
| 이정표 | 다른 방 방문 | `neon-glow-green` |

## 주요 기능

### 6.1 게시판 (CommunityBoardPopup)
- 탭: 공지사항/자유게시판/팁
- 글 작성/댓글/좋아요

### 6.2 분수대 채팅 (FountainChatPopup)
- 실시간 오픈 채팅
- 현재 접속자 수 표시
- 이모지 빠른 선택

### 6.3 우편함 (MailboxPopup)
- 받은/보낸 편지
- 선물 첨부 기능
- 새 메일 알림

### 6.4 오락실 (ArcadePopup)
- 가위바위보 (무료)
- 슬롯머신 (무료 1회/100코인)
- 기억력 게임 (50코인)
- 음악 퀴즈 (무료)

### 6.5 이웃 방문 (VisitPopup)
- 유저 검색
- 랜덤 방문
- 인기 방 TOP
- 친구 목록/최근 방문자

---

# 7. 다락방 인터랙션 (Attic Room)

## 현재 상태
배경 이미지만 존재, 인터랙션 없음

## 컨셉
**"추억의 보물창고"** - 잊혀진 추억과 비밀이 숨겨진 공간

## 인터랙티브 오브젝트

| 오브젝트 | 위치 | 기능 | 호버 효과 |
|---------|------|------|----------|
| 오래된 TV | 우측 하단 | 추억의 영상관 | `neon-glow-purple` |
| 낡은 상자 | 중앙 | 추억 상자/타임캡슐 | `neon-glow-gold` |
| 구형 컴퓨터 | 우측 상단 | 비밀 일기장 | `neon-glow-cyan` |

## 주요 기능

### 7.1 추억의 영상관 (OldTVPopup)
- YouTube/GIF/MP4 재생
- 호스트 설정 영상 목록
- 레트로 TV 필터 (스캔라인)

### 7.2 추억 상자 (MemoryBoxPopup)
- 타임캡슐 (특정 날짜에 열림)
- 호스트 편지/메모
- 숨겨진 아이템 발견
- 방문자 기여 가능

### 7.3 비밀 일기장 (SecretDiaryPopup)
- 페이지 넘기기 애니메이션
- 날짜별/태그별 검색
- 비밀번호 잠금 일기

## 특별 기능

### 이스터에그
- 코나미 코드 입력 시 보상
- 자정 방문 시 특별 아이템
- 특정 위치 반복 클릭

### 방문 마일스톤
| 방문 횟수 | 해금 콘텐츠 |
|----------|------------|
| 1회 | 환영 메시지 |
| 5회 | 숨겨진 사진 앨범 |
| 10회 | 호스트의 비밀 편지 |
| 25회 | 특별 아이템 |
| 50회 | 전설급 황금 열쇠 |

---

# 구현 우선순위 종합

## Phase 1 (MVP)
1. **다락방 인터랙션** - 기존 이미지 활용, 코드만 추가
2. **서재** - 기본 방 확장
3. **다실** - 간단한 힐링 컨셉

## Phase 2
4. **온실** - 식물 키우기 시스템
5. **천문대** - 별자리 수집

## Phase 3
6. **도서관** - 책 컬렉션 시스템
7. **외출** - 소셜 기능

---

# 공통 CSS 클래스 추가 필요

```css
/* 새로운 네온 글로우 효과 */
.neon-glow-gold { /* 황금색 */ }
.neon-glow-purple { /* 보라색 */ }
.neon-glow-cyan { /* 청록색 */ }
.neon-glow-blue { /* 파란색 */ }
.neon-glow-green { /* 초록색 */ }
.neon-glow-yellow { /* 노란색 */ }
.neon-glow-tea { /* 녹차색 */ }
.neon-glow-ember { /* 불씨색 */ }
```

---

*문서 작성일: 2025-11-25*
