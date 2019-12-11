const DGDInterface  = artifacts.require("DGDInterface");
const Acid = artifacts.require("Acid");
const a = require('awaiting');
const bn = require ('bn.js');
const gasPrice = 20000000000;
const weiPerNanoDGD = 193124288;
const dissolutionEtherAmount = web3.utils.toWei('386248.57629615575', 'ether');
const dgdContractAddress = DGDInterface.address;
const acidContractAddress = Acid.address;

contract('Acid', (accounts) => {
  it('should throw an error when calling burn() on an uninitialized contract', async () => {
    let acidContract = await Acid.deployed();
    let dgdContract = await DGDInterface.deployed();
    let burner = accounts[3];
    let minter = accounts[0];
    await a.failure(acidContract.burn({from: burner, gas: 300000, gasPrice: gasPrice}));
  });

  it('should not allow anyone but the owner to initialize the contract', async () => {
    let acidContract = await Acid.deployed();
    let dgdContract = await DGDInterface.deployed();
    let knobhead = accounts[4];
    await a.failure(acidContract.init(weiPerNanoDGD, dgdContractAddress, {from: knobhead, gas: 250000, gasPrice: gasPrice}));
  });

  it('should allow the owner to initialize the contract', async () => {
    let acidContract = await Acid.deployed();
    let dgdContract = await DGDInterface.deployed();
    let owner = accounts[0];
    await acidContract.init(weiPerNanoDGD, dgdContractAddress, {from: owner, gas: 300000, gasPrice: gasPrice});
    let isInitialized = await acidContract.isInitialized.call();
    let dgdAddress = await acidContract.dgdTokenContract.call(); 
    let rate = await acidContract.weiPerNanoDGD.call(); 
    assert.equal(isInitialized, true, "isInitialized() should return true");
    assert.equal(dgdAddress, dgdContractAddress, "dgdTokenContract() should return the correct address");
    assert.equal(rate, weiPerNanoDGD, "weiPerNanoDGD() should return the correct value");
  });

  it('should not allow burn if the contract is not funded', async () => {
    let acidContract = await Acid.deployed();
    let dgdContract = await DGDInterface.deployed();
    let minter = accounts[0];
    let knobhead = accounts[5];
    let toBurn = 2;
    await dgdContract.transfer(knobhead, toBurn, {from: minter, gas: 300000, gasPrice: gasPrice});
    await dgdContract.approve(dgdContractAddress, (2000000 * 1e9), {from: knobhead, gas: 300000, gasPrice: gasPrice});
    await a.failure(acidContract.burn({from: knobhead, gas: 300000, gasPrice: gasPrice}));
    let dgdBalanceAfter = await dgdContract.balanceOf.call(knobhead);
    assert.equal(dgdBalanceAfter, toBurn, "burn() should not deduct DGDs from user if contract is not funded");
    await dgdContract.transfer(minter, toBurn, {from: knobhead, gas: 300000, gasPrice: gasPrice});
  });

  it('should allow itself to be funded with ETH', async () => {
    let acidContract = await Acid.deployed();
    let minter = accounts[0];
    let balanceBefore = await web3.eth.getBalance(acidContractAddress);
    await web3.eth.sendTransaction({from: minter, to: acidContractAddress, value: dissolutionEtherAmount, gas: 60000, gasPrice: gasPrice});
    let balanceAfter = await web3.eth.getBalance(acidContractAddress);
    assert.equal(balanceBefore, 0, "Balance should be zero before funding");
    assert.equal(balanceAfter, 386248576296155750000000, "Balance should be correct after funding");
  });

  it('should allow a user to burn some DGDs and receive ETH', async () => {
    let acidContract = await Acid.deployed();
    let dgdContract = await DGDInterface.deployed();
    let minter = accounts[0];
    let genius = accounts[6];
    let toBurn = 2;
    await dgdContract.transfer(genius, toBurn, {from: minter, gas: 300000, gasPrice: gasPrice});
    await dgdContract.approve(acidContractAddress, (2000000 * 1e9), {from: genius, gas: 300000, gasPrice: gasPrice});
    let contractBalanceBefore = await web3.eth.getBalance(acidContractAddress);
    let userBalanceBefore = await web3.eth.getBalance(genius);
    let userDGDBefore = await dgdContract.balanceOf(genius);
    assert.equal(userDGDBefore, toBurn, "user should have 2 DGDs before burning");
    await acidContract.burn({from: genius, gas: 300000, gasPrice: gasPrice});
    let userDGDAfter = await dgdContract.balanceOf(genius);
    let contractBalanceAfter = await web3.eth.getBalance(acidContractAddress);
    let expectedBalanceAfter = contractBalanceBefore - (toBurn * weiPerNanoDGD);
    assert.equal(userDGDAfter, 0, "user should have no DGDs after burning");
    assert.equal(contractBalanceAfter, expectedBalanceAfter, "The correct amount of ETH should be sent to the user");
  });

  it('should allow a user to burn the remaining DGDs in supply', async () => {
    let acidContract = await Acid.deployed();
    let dgdContract = await DGDInterface.deployed();
    let minter = accounts[0];
    await dgdContract.approve(acidContractAddress, (2000000 * 1e9), {from: minter, gas: 300000, gasPrice: gasPrice});

    let contractBalanceBefore = await web3.eth.getBalance(acidContractAddress);
    let userBalanceBefore = await web3.eth.getBalance(minter);
    let userDGDBefore = await dgdContract.balanceOf(minter);

    await acidContract.burn({from: minter, gas: 300000, gasPrice: gasPrice});

    let userDGDAfter = await dgdContract.balanceOf(minter);
    let userBalanceAfter = await web3.eth.getBalance(minter);
    let contractBalanceAfter = await web3.eth.getBalance(acidContractAddress);

    console.log("\n\t\tAccounting Report\n");
    console.log(`\t\tUser DGD Balance Before:    ${userDGDBefore}`);
    console.log(`\t\tUser DGD Balance After:     ${userDGDAfter}`);
    console.log(`\t\tContract ETH before:        ${web3.utils.fromWei(contractBalanceBefore.toString(), 'ether')}`);
    console.log(`\t\tContract ETH Balance After: ${web3.utils.fromWei(contractBalanceAfter.toString(), 'ether')}`);
    console.log(`\t\tUser ETH Balance Before:    ${web3.utils.fromWei(userBalanceBefore.toString(), 'ether')}`);
    console.log(`\t\tUser ETH Balance After:     ${web3.utils.fromWei(userBalanceAfter.toString(), 'ether')}\n`);

    assert.equal(userDGDAfter, 0, "User should not have any DGDs after burning");
  });

});

