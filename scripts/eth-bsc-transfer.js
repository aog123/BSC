const BridgeEth = artifacts.require('./BridgeEth.sol');

// sending account private key
const privKey = 'add private key here';

module.exports = async done => {
  const nonce = 1; // need to increment this for each new transfer
  const accounts = await web3.eth.getAccounts();
  const bridgeEth = await BridgeEth.deployed();
  const amount = web3.utils.toWei('5000');
  const message = web3.utils.soliditySha3(
    {t: 'address', v: accounts[0]},
    {t: 'address', v: accounts[2]},
    {t: 'uint256', v: amount},
    {t: 'uint256', v: nonce},
  ).toString('hex');
  const { signature } = web3.eth.accounts.sign(
    message, 
    privKey
  );
  await bridgeEth.burn(accounts[2], amount, nonce, signature);
  done();
}
