const config = {
  plugins: {
    "@tailwindcss/postcss": {
      theme: {
        extend: {
          keyframes: {
            burn: {
              "0%": { transform: "scaleY(0.7) scaleX(0.9)", opacity: "0.7" },
              "100%": { transform: "scaleY(1.2) scaleX(1.1)", opacity: "1" },
            },
          },
          animation: {
            burn1: "burn 0.6s ease-in-out infinite alternate",
            burn2: "burn 0.6s ease-in-out 0.15s infinite alternate",
            burn3: "burn 0.6s ease-in-out 0.3s infinite alternate",
          },
          fontFamily: {
            syne: ["var(--font-syne)"],
            dmsans: ["var(--font-sansw)"],
          },
        },
      },
    },
  },
};

export default config;
