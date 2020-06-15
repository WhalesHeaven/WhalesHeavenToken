var WhalesHeavenToken = artifacts.require("./WhalesHeavenToken.sol");

module.exports = function(deployer) {
  deployer.deploy(WhalesHeavenToken);
};
