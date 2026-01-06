module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }], // Адаптирует код под текущую версию Node.js
    "@babel/preset-typescript", // Позволяет понимать TypeScript
    ["@babel/preset-react", { runtime: "automatic" }], // Позволяет понимать JSX (React)
  ],
};
