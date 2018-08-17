var BenchCoin = artifacts.require("./BenchCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(BenchCoin, "BenchCoin", "BENCH", 1000000);
};
