# RedBeans Club Website 🫘

단국대학교 컴퓨터공학과 학술 동아리 RedBeans의 공식 웹사이트입니다.

![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.2-6DB33F?logo=spring)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-38B2AC?logo=tailwind-css)
![Java](https://img.shields.io/badge/Java-17-007396?logo=java)


## 🎯 프로젝트 소개

RedBeans 동아리 웹사이트는 동아리 활동을 효율적으로 관리하고 홍보하기 위한 플랫폼입니다. Notion API와 연동하여 실시간으로 일정을 관리하고, 동아리 활동과 프로젝트를 소개합니다.
2025.10. 현재 다른 스터디로 인해 개발 중단

### 주요 특징

- 📅 **실시간 일정 관리**: Notion 데이터베이스와 연동된 동적 일정 시스템
- 🎨 **현대적인 UI/UX**: TailwindCSS 기반의 반응형 디자인
- 🚀 **풀스택 아키텍처**: React + Spring Boot 기반의 확장 가능한 구조
- ⚡ **실시간 데이터 동기화**: 한국 시간대(KST)를 고려한 정확한 일정 표시

## ✨ 주요 기능

### 1. 메인 페이지
- 동아리 소개 및 주요 활동 안내
- Hero Section with gradient animation
- Feature 카드 (프로젝트, 알고리즘 스터디, 네트워킹)

### 2. 오늘의 일정 (TodaySchedule)
- Notion API 연동을 통한 실시간 일정 표시
- 일정 상태별 분류:
  - 🟢 진행 중인 일정
  - 🔵 예정된 일정
  - ⚫ 종료된 일정
- 카테고리별 색상 구분 (스터디, 회의, 기타)
- 상대적 날짜 표시 (오늘, 내일, N일 후)

### 3. 활동 둘러보기 (Activities)
- 신입생/고학년 활동 분류
- 프로젝트 추가 및 관리 기능
- 활동별 성과 및 참여 인원 표시
- 동적 프로젝트 카드 생성

### 4. 멤버 프로필
- 동아리 회원 정보 표시
- GitHub 프로필 연동
- 역할별 구분 (회장, 부회장, 회원)

## 🛠 기술 스택

### Frontend
- **Framework**: React 19.0.0
- **Routing**: React Router DOM 7.2.0
- **Styling**: TailwindCSS 3.4.1
- **Icons**: Lucide React 0.475.0
- **Build Tool**: React Scripts 5.0.1

### Backend
- **Framework**: Spring Boot 3.4.2
- **Language**: Java 17
- **Build Tool**: Gradle 8.12.1
- **Dependencies**:
  - Spring Web
  - Spring WebSocket
  - Lombok
  - Jackson (JSON 처리)

### External Services
- **Notion API**: 일정 관리 데이터베이스 연동
- **Deployment**: 
  - Frontend: Netlify
  - Backend: Railway

## 📁 프로젝트 구조

```
RedBeans/
├── frontend/                    # React 프론트엔드
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── logo-transparent2.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js        # 네비게이션 바
│   │   │   ├── HeroSection.js   # 메인 히어로 섹션
│   │   │   ├── TodaySchedule.js # 일정 표시 컴포넌트
│   │   │   ├── Activities.js    # 활동 관리 페이지
│   │   │   └── MemberProfile.js # 멤버 프로필 카드
│   │   ├── App.js               # 메인 앱 컴포넌트
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
│
└── backend/                     # Spring Boot 백엔드
    ├── src/main/java/com/redbeans/
    │   ├── config/
    │   │   ├── NotionConfig.java      # Notion API 설정
    │   │   └── WebConfig.java         # CORS 설정
    │   ├── controller/
    │   │   ├── HomeController.java
    │   │   └── NotionController.java  # Notion API 엔드포인트
    │   ├── dto/
    │   │   ├── common/
    │   │   │   └── ApiResponse.java   # 표준 API 응답 형식
    │   │   ├── schedule/
    │   │   │   └── NotionEventDto.java # 일정 DTO
    │   │   └── project/
    │   │       └── ProjectDTO.java     # 프로젝트 DTO
    │   ├── service/
    │   │   ├── NotionService.java     # Notion API 비즈니스 로직
    │   │   └── NotionDatabaseInspector.java
    │   ├── repository/
    │   │   └── ProjectRepository.java  # 프로젝트 데이터 관리
    │   └── exception/
    │       └── GlobalExceptionHandler.java
    ├── src/main/resources/
    │   └── application.properties
    └── build.gradle
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 16+ 
- Java 17+
- Gradle 8.12.1+
- Notion API Key 및 Database ID

## 🔐 환경 변수 설정

### Frontend (환경에 따라 API URL 자동 설정)

```javascript
// TodaySchedule.js에서 자동으로 환경 감지
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:8080/api' 
    : 'https://redbeans-backend-production.up.railway.app/api';
```

### Notion 데이터베이스 구조

다음 필드를 가진 Notion 데이터베이스가 필요합니다:

| 필드명 | 타입 | 설명 |
|--------|------|------|
| 이름 | Title | 일정 제목 |
| 이벤트 시간 | Date | 시작/종료 시간 |
| 유형 | Select | 회의/스터디/기타 |
| 참석자 | People | 참여자 목록 |

## 📡 API 문서

### 주요 엔드포인트

#### 1. 오늘의 일정 조회
```http
GET /api/notion/events/today
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "title": "알고리즘 스터디",
      "startTime": "14:00",
      "endTime": "16:00",
      "category": "study",
      "eventDate": "2025-11-10",
      "peoples": "조남웅, 김철수",
      "fullStartDateTime": "2025-11-10T14:00"
    }
  ],
  "timestamp": "2025-11-10T12:00:00"
}
```

#### 2. 데이터베이스 구조 확인 (개발용)
```http
GET /api/notion/inspect
```

### CORS 설정

백엔드는 다음 origin에서의 요청을 허용합니다:
- `http://localhost:3000` (로컬 개발)
- `https://warm-blini-39cdcb.netlify.app` (프로덕션)

## 🎨 디자인 시스템

### 색상 팔레트

```css
/* 주요 색상 */
--primary-red: #B82132;      /* 동아리 메인 컬러 */
--secondary-red: #D2665A;    /* 서브 컬러 */
--dark-bg: #121212;          /* 다크 배경 */
--light-text: #F9F7F7;       /* 밝은 텍스트 */
--accent: #F6DED8;           /* 강조 색상 */

/* 카테고리 색상 */
--study-bg: #A9B5DF;         /* 스터디 */
--meeting-bg: #9DC08B;       /* 회의 */
--other-bg: #a25f7e;         /* 기타 */
```


## 🌐 배포

### Frontend (Netlify)

1. GitHub 리포지토리 연결
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
3. 환경 변수 설정 (필요시)

### Backend (Railway)

1. GitHub 리포지토리 연결
2. Environment Variables 설정:
   - `NOTION_API_KEY`
   - 기타 필요한 환경 변수
3. 자동 배포 활성화

**배포 URL:**
- Frontend: https://warm-blini-39cdcb.netlify.app
- Backend: https://redbeans-backend-production.up.railway.app

### 코드 스타일 가이드

- **Frontend**: ESLint 규칙 준수
- **Backend**: Java 코드 컨벤션 준수
- **Commit**: Conventional Commits 사용

## 📝 라이선스

이 프로젝트는 Private 프로젝트입니다.

## 📞 문의

- 동아리 홈페이지: [RedBeans Website](https://warm-blini-39cdcb.netlify.app)
- 가입 신청: [네이버 폼](https://naver.me/GOPwN9CO)
  
## 🔄 버전 관리

현재 버전: 0.1.0

### 변경 사항

- **v0.1.0** (2025-11)
  - 초기 릴리즈
  - Notion API 연동 완료
  - 기본 UI/UX 구현
  - 일정 관리 기능 구현
  - 활동 관리 페이지 구현

## 🐛 알려진 이슈

- [ ] 모바일 환경에서 일부 애니메이션 성능 개선 필요
- [ ] 프로젝트 추가 시 이미지 업로드 기능 미구현

## 🎯 향후 계획

- [ ] 회원 관리 시스템 구축
- [ ] 프로젝트 상세 페이지 추가
- [ ] 사진 갤러리 기능
- [ ] 알림 시스템 (이메일/푸시)
- [ ] 관리자 대시보드
- [ ] 다크 모드 지원
