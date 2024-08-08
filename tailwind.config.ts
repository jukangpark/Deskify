import type { Config } from "tailwindcss";

/*
  @tailwind 는 Tailwind CSS 프레임워크에서 제공하는 특수한 규칙으로, CSS 파일에서 Tailwind CSS 를 사용할 수 있도록 설정합니다.
  @tailwind base 는 Tailwind CSS 의 기본 스타일을 포함하는 규칙입니다.
  이 규칙을 사용하면, HTML 요소의 기본 스타일을 Tailwind CSS 의 스타일로 대체할 수 있습니다.
  
  @tailwind components 는 Tailwind CSS 의 컴포넌트 스타일을 포함하는 규칙입니다.

  @tailwind utilities 는 Tailwind CSS 의 유틸리티 스타일을 포함하는 규칙입니다.
  예를 들어, text-center 는 Tailwind CSS 의 유틸리티 클래스입니다. 
  유틸리티 클래스는 CSS 파일에서 직접 정의할 필요 없이, Tailwind CSS 가 제공하는 클래스를 사용하여 HTML 요소의 스타일을 변경할 수 있습니다.
*/

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
