const BridgeEth = artifacts.require('./BridgeEth.sol');

// sending account private key
const privKey = '4107c052723f1a92e6a6f6fd81d6b20d75578637584a4c72808f1d44be6c473e';

module.exports = async done => {
  const nonce = 1; // need to increment this for each new transfer
  const accounts = await web3.eth.getAccounts();
  const bridgeEth = await BridgeEth.deployed();
  const amount = web3.utils.toWei('5000');
  const message = web3.utils.soliditySha3(
    {t: 'address', v: accounts[0]},
    {t: 'address', v: "0x7DA7D2b4B1820c7708bAac27AAD71e2f6Ee118a7"},
    {t: 'uint256', v: amount},
    {t: 'uint256', v: nonce},
  ).toString('hex');
  const { signature } = web3.eth.accounts.sign(
    message, 
    privKey
  );
  await bridgeEth.burn("0x7DA7D2b4B1820c7708bAac27AAD71e2f6Ee118a7", amount, nonce, signature);
  done();
}
