const DGDInterface = artifacts.require("DGDInterface");
const Acid = artifacts.require("Acid");

module.exports = function(deployer) {
  deployer.deploy(DGDInterface);
  deployer.deploy(Acid);
};
