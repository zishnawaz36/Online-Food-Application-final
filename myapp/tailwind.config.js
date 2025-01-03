module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Specify the files to scan for Tailwind CSS classes
  theme: {
    extend: {
      keyframes: {
        moveX: {
          '0%, 100%': { transform: 'translateX(0)' }, // Starts and ends at the original position
          '50%': { transform: 'translateX(50px)' }, // Moves 100px to the right at 50%
          '25%': { transform: 'translateX(-50px)' }, // Moves 100px to the left at 25%
        },
      },
      animation: {
        moveX: 'moveX 4s ease-in-out infinite', // 1s duration, infinite loop
      },
    },
  },
  plugins: [],
};
