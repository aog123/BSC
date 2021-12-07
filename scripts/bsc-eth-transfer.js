const BridgeBsc = artifacts.require('./BridgeBsc.sol');

// sending account private key
const privKey = 'privateKey';

module.exports = async done => {
  const nonce = 1; // need to increment this for each new transfer
  const accounts = await web3.eth.getAccounts();
  const bridgeBsc = await BridgeBsc.deployed();
  const amount = web3.utils.toWei('1000');
  const message = web3.utils.soliditySha3(
    {t: 'address', v: accounts[2]},
    {t: 'address', v: accounts[1]},
    {t: 'uint256', v: amount},
    {t: 'uint256', v: nonce},
  ).toString('hex');
  const { signature } = web3.eth.accounts.sign(
    message, 
    privKey
  ); 
  await bridgeBsc.burn(accounts[1], amount, nonce, signature, {from: accounts[2]});
  done();
}
