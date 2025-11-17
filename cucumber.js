module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: [
      "support/hooks.ts",
      "features/step_definitions/**/*.ts",
    ],
    format: [
      "progress-bar",
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json",
    ],
  },
};
