# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고하는 가이드입니다.

## 프로젝트 개요

Figma에서 내보낸 다이어리 스타일 미니홈피 프로토타입입니다. 백엔드 없이 클라이언트 전용으로 동작합니다.

참고: 모노레포 전체 문서는 `../CLAUDE.md`를 확인하세요.

## 명령어

```bash
npm install     # 의존성 설치
npm run dev     # 개발 서버 시작 (포트 3000, 브라우저 자동 열림)
npm run build   # 프로덕션 빌드 (/build 디렉토리에 출력)
```

## 아키텍처

### 네비게이션 시스템
`src/App.tsx`에 정의된 `RoomType` 유니온 타입을 통한 방 기반 네비게이션:
- 메인 방: 거실, 다락방, 서재, 도서관, 천문대, 온실, 다실
- 서브 방 (거실 하위): 채팅 공간, 방명록

네비게이션 상태는 App 컴포넌트의 `useState<RoomType>`로 관리되며, `onRoomChange` prop을 통해 자식 컴포넌트로 전달됩니다.

### 컴포넌트 구조
```
src/components/
├── rooms/           # 방 뷰 (LivingRoom, AtticRoom, StudyRoom 등)
├── ui/              # Radix UI 프리미티브 (40개 이상)
├── figma/           # Figma 통합 유틸리티 (ImageWithFallback)
├── ProfileSection   # 프로필 사이드바
├── JukeboxSection   # 음악 플레이어 사이드바
└── RoomNavigation   # 방 선택 네비게이션
```

### 주요 패턴

**Figma 에셋 임포트**: Figma에서 내보낸 이미지는 버전 별칭 임포트 사용:
```tsx
import image from 'figma:asset/[hash].png';
```
vite.config.ts의 별칭 설정을 통해 `./src/assets/`로 연결됩니다.

**유틸리티 함수**: 조건부 Tailwind 클래스에는 `@/components/ui/utils`의 `cn()` 사용:
```tsx
import { cn } from '@/components/ui/utils';
```

**경로 별칭**: `@`는 `./src/`로 연결됨

## 코드 컨벤션

- 소스 수정 시 주석을 첨가하고, 주석 맨 앞에 "이원주 수정" 수식어를 반드시 붙일 것
- 모든 쿼리는 LINQ로 구현
- 함수형 컴포넌트와 훅만 사용
- props와 상태에 TypeScript 인터페이스 사용
- 모든 스타일링에 Tailwind 유틸리티 클래스 사용 (CSS-in-JS 없음)
