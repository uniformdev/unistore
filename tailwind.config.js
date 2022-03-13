module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/containers/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        lg: '1040px',
      },
      colors: {
        demo_border: 'var(--demo_border)',
        orange_border: 'var(--orange_border)',
        rose_bud: 'var(--rose_bud)',
        cornflower: 'var(--cornflower)',
        havelock_blue: 'var(--havelock_blue)',
        wild_sand: 'var(--wild_sand)',
        mercury: 'var(--mercury)',
        black_secondary: 'var(--black_secondary)',
        ebony_clay: 'var(--ebony_clay)',
        lightgray: 'var(--lightgray)',
        grey: 'var(--grey)',
      },
    },
    fontFamily: {
      overpass: ['"Overpass"'],
    },
    animation: {
      'pulse-fast': 'pulse 0.7s infinite',
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('tailwindcss-animation-delay')],
};
