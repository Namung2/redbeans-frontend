// Taliwind CSS 설정관리 .js 파일임
// React 프로젝트의 어떤 파일들에서 Tailwind 클래스를 사용할지 정의
// 테마 설정, 색상, 폰트 등을 커스터마이즈
/*"content" 배열의 설정이 중요한데, 이는 마치 Tailwind에게 
"이 경로들의 파일들을 확인하고 여기에 스타일을 적용해줘"라고 말하는 것과 같습니다.*/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",  // 이 부분이 매우 중요합니다
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

