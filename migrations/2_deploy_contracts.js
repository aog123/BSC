const TokenBsc = artifacts.require('TokenBsc.sol');
const BridgeEth = artifacts.require('BridgeEth.sol');
const BridgeBsc = artifacts.require('BridgeBsc.sol');

const tokenContractAOG = "0x2CD42811ec44b7EE92Bc1f29068B9ece5dB7cff0";
module.exports = async function (deployer, network) {
  if(network === 'ethMainnet') {
    await deployer.deploy(BridgeEth, tokenContractAOG);
    await BridgeEth.deployed();
  }
  if(network === 'bscMainnet') {
    await deployer.deploy(TokenBsc);
    const tokenBsc = await TokenBsc.deployed();
    await deployer.deploy(BridgeBsc, tokenBsc.address);
    const bridgeBsc = await BridgeBsc.deployed();
    await tokenBsc.updateAdmin(bridgeBsc.address);
  }
};
