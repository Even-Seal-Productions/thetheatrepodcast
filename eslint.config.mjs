import nextConfig from "eslint-config-next";
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextConfig,
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Disable this rule - legitimate patterns for syncing state from external sources
      // (localStorage, URL params) on mount trigger this rule incorrectly
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
