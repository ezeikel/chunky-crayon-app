module.exports = {
  extends: [
    "expo",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "prettier",
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
