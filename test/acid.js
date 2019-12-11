const DGDInterface  = artifacts.require("DGDInterface");
const Acid = artifacts.require("Acid");
const a = require('awaiting');
const bn = require ('bn.js');

contract('Acid', (accounts) => {
  it('should allow owner to initialize the contract', async () => {
    const acid = await Acid.deployed();
    const deployedDGDaddress = await DGDInterface.address;
    await acid.init(193124288, deployedDGDaddress);
    const dgdAddressAfterInit = await acid.dgdTokenContract.call(); 
    const isInitialized = await acid.isInitialized.call();
    const weiPerNanoDGDAfterInit = await acid.weiPerNanoDGD.call();
    assert.equal(isInitialized, true, "Should be initialized");
    assert.equal(dgdAddressAfterInit, deployedDGDaddress, "Should be the correct DGD token contract address");
    assert.equal(weiPerNanoDGDAfterInit, 193124288, "Should be the correct weiPerNanoDGD value");
  });
  it('Burning 0.000000001 DGD should give 193124288 wei', async () => {


    const burner = accounts[3];
    const minter = accounts[0];
    const acidContract = await Acid.address;

    const acid = await Acid.deployed();
    const dgd = await DGDInterface.deployed();

    await dgd.transfer(burner, 1, {from: minter, gas: 300000, gasPrice: 20000000000});
    await dgd.approve(acidContract, 2000000000000000, {from: burner, gas: 300000, gasPrice: 20000000000});

    const contractBalance = await web3.eth.getBalance(acidContract);
    const expected = contractBalance - 193124288; 
    console.log(contractBalance);

    await a.failure(acid.burn({from: burner, gas: 300000, gasPrice: 20000000000}));
    const contractBalanceAfterFail = await web3.eth.getBalance(acidContract);
    assert.equal(contractBalanceAfterFail, contractBalance, "Should not transfer after failure");

    await web3.eth.sendTransaction({from: minter, to: acidContract, value: web3.utils.toWei('386248.57629615575', 'ether'), gas: 30000, gasPrice: 20000000000});
    acid.burn({from: burner, gas: 300000, gasPrice: 20000000000});
    const contractBalanceAfter = await web3.eth.getBalance(acidContract);
    assert.equal(contractBalanceAfter, expected, "193124288 should have been deducted from the contract");

  });
});

