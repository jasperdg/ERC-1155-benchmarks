var BenchNFT = artifacts.require("./BenchNFT.sol");

module.exports = function(deployer) {
  deployer.deploy(BenchNFT, "BenchNFT", "BENCH");
};
