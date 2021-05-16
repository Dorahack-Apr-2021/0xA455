// 2_first_contracts.js
const SimpleStorage = artifacts.require("SimpleStorage");
const Bet = artifacts.require("Bet");

module.exports = async function(deployer) {
  const accounts = await web3.eth.getAccounts()
  await deployer.deploy(SimpleStorage);

  await deployer.deploy(Bet);
};
