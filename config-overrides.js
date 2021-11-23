const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@components": "src/components",
    "@assets": "src/assets",
    "@utils": "src/utils",
    "@context": "src/context",
  })(config);

  return config;
};
