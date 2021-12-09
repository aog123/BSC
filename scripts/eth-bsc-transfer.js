const BridgeEth = artifacts.require('./BridgeEth.sol');

// sending account private key
const privKey = '';

module.exports = async done => {
  const nonce = 1; // need to increment this for each new transfer
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
  const bridgeEth = await BridgeEth.deployed();
  const amount = web3.utils.toWei(' ');
  const message = web3.utils.soliditySha3(
    {t: 'address', v: ""},
    {t: 'address', v: ""},
    {t: 'uint256', v: amount},
    {t: 'uint256', v: nonce},
  ).toString('hex');
  const { signature } = web3.eth.accounts.sign(
    message, 
    privKey
  );
  await bridgeEth.burn("", amount, nonce, signature );
  done();
}
