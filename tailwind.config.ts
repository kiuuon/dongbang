import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: '#F3ECDE',
      secondary: '#FFE6A1',
      tertiary: '#A17C4A',
      tertiary_dark: '#5C4A25',
      gray0: '#E0E0E0',
      gray1: '#B4B4B4',
      gray2: '#969696',
      gray3: '#6B6B6B',
      gray4: '#3C3C3C',
      error: '#FF5252',
    },
    extend: {
      boxShadow: {
        modal: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
} satisfies Config;
