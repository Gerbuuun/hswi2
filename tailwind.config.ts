const baseTheme = {
  "primary": "#0056aa",
  "primary-focus": "#000f75",
  "secondary": "#f07f3c",
  "secondary-focus": "#fa4f29",
  "accent": "#7c3aed",
  "neutral": "#3d4451",
  "base-100": "#fff",
  "base-200": "#f5faff",
  "info": "#3abff8",
  "success": "#36d399",
  "warning": "#fbbd23",
  "error": "#f87272",

  "--rounded-box": "0.5rem",
  "--rounded-btn": "0.25rem",
  "--rounded-badge": "1.9rem",
  "--animation-btn": "0.25s",
  "--animation-input": "0.2s",
  "--btn-text-case": "uppercase",
  "--btn-focus-scale": "0.95",
  "--border-btn": "1px",
  "--tab-border": "1px",
  "--tab-radius": "0.5rem",
};

module.exports = {
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    styled: true,
    logs: false,
    themes: [
      {
        iris: baseTheme,
      },
    ],
  },
};
