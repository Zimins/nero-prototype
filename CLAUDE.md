# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고할 가이드를 제공합니다.

## 프로젝트 개요

Pixel Style Jukebox Prototype - React, TypeScript, Vite로 구축된 픽셀 아트 스타일의 인터랙티브 방 탐색 웹 앱입니다. 원본 디자인은 Figma에서 제작되었습니다 (https://www.figma.com/design/n4OiIBrly8vbhBmHi7ueYO/Pixel-Style-Jukebox-Prototype).

## 개발 명령어

```bash
# 의존성 설치
npm i

# 개발 서버 시작 (http://localhost:3000 에서 자동 오픈)
npm run dev

# 프로덕션 빌드 (./build 디렉토리에 출력)
npm run build
```

## 아키텍처

### 애플리케이션 구조

이 앱은 방 기반 네비게이션을 가진 단일 페이지 애플리케이션입니다:

- **App.tsx**: 메인 애플리케이션 진입점. 현재 방과 팝업 표시 여부(주크박스, 채팅, 방명록)를 위한 전역 상태를 관리합니다. `renderRoom()` 함수에서 switch 문을 사용하여 `currentRoom` 상태에 따라 방 컴포넌트를 조건부로 렌더링합니다.

- **방 컴포넌트**: 각 방은 독립적인 컴포넌트(LivingRoom, AtticRoom, LibraryRoom 등)로, 배경 이미지를 렌더링하고 인터랙티브 핫스팟을 포함할 수 있습니다. LivingRoom 컴포넌트가 클릭 가능한 벽난로와 사진첩 영역을 가진 패턴의 예시입니다.

- **하단 네비게이션**: 지속적으로 표시되는 네비게이션 바 (`BottomNavigation.tsx`):
  - 메인 방들: 거실, 다락방, 서재, 도서관, 천문대, 온실, 다실
  - 왼쪽 특수 버튼: 상점, 방 꾸미기
  - 오른쪽 특수 버튼: 외출
  - 설정 패널이 있는 자동 숨김 기능

- **팝업 시스템**: App.tsx에서 boolean 상태로 관리되는 세 가지 주요 팝업:
  - JukeboxPopup: 음악 플레이어 인터페이스
  - ChatPopup: LivingRoom에서 벽난로 클릭 시 트리거됨
  - GuestbookPopup: LivingRoom에서 사진첩 클릭 시 트리거됨

### 스타일링 시스템

- **Tailwind CSS v4**: 유틸리티 클래스에 Tailwind 사용
- **픽셀 아트 테마**: index.css에 정의된 커스텀 CSS 클래스들:
  - `.pixel-text`: 레트로 픽셀 폰트 렌더링 (Press Start 2P, DungGeunMo)
  - `.pixel-render`: 픽셀화된 이미지 렌더링 (crisp-edges)
  - `.pixel-border`: 그림자 효과가 있는 4px 검은색 테두리
  - `.pixel-button`: 내부 그림자가 있는 3D 픽셀 스타일 버튼
  - `.neon-glow-orange` / `.neon-glow-pink`: 인터랙티브 요소를 위한 애니메이션 네온 글로우 효과
- **컬러 팔레트**: 픽셀 아트 미학에 맞는 어스톤 색상 (#bfaf9a, #d4c4a8, #8b7355, #faed96)
- **커스텀 스크롤바**: UI에 맞는 갈색/베이지 테마의 픽셀 스타일 스크롤바

### 에셋 관리

이미지는 커스텀 Figma 에셋 임포트 시스템을 사용합니다:
- 임포트 패턴: `import imageName from 'figma:asset/[hash].png'`
- 에셋은 `src/assets/` 디렉토리에 저장됨
- Vite 설정에 figma: URL에서 실제 파일 경로로의 alias 매핑이 포함됨
- 모든 이미지에 `src/components/figma/ImageWithFallback.tsx`의 `ImageWithFallback` 컴포넌트 사용

### 컴포넌트 라이브러리

접근 가능한 UI 컴포넌트를 위해 Radix UI primitives (@radix-ui/react-*)를 광범위하게 사용합니다. 이들은 `src/components/ui/`에서 shadcn/ui 패턴을 통해 임포트됩니다.

## 중요한 패턴

1. **방 네비게이션**: 방은 문자열 기반입니다 ("거실", "상점" 등). 새로운 방을 추가하려면 App.tsx의 switch 문을 업데이트하고 새 방 컴포넌트를 생성하세요.

2. **인터랙티브 핫스팟**: hover 상태가 있는 절대 위치 버튼을 사용합니다. 네온 글로우 효과가 있는 참조 패턴은 LivingRoom.tsx를 참조하세요.

3. **상태 관리**: 모든 전역 상태(방 선택, 팝업 표시)는 App.tsx에 있습니다. 외부 상태 관리 라이브러리는 사용하지 않습니다.

4. **에셋 임포트**: 새 이미지를 추가할 때는 항상 figma:asset 패턴을 사용하고 vite.config.ts에 해당 alias를 추가하세요.

5. **한국어 사용**: UI 텍스트는 한국어입니다. 방 이름, 레이블, UI 문자열은 한국어 텍스트를 사용합니다.

## 특별 고려사항

- Vite 설정에 의존성 충돌 해결을 위한 광범위한 패키지 버전 alias가 포함되어 있음
- 이미지 렌더링은 `pixel-render` 클래스를 사용하여 픽셀 아트 미학을 유지해야 함
- 개발 서버는 포트 3000에서 브라우저 자동 오픈으로 설정됨
- 빌드 출력은 `./build` 디렉토리로 감 (`./dist`가 아님)
