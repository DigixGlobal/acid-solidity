const DGDInterface = artifacts.require("DGDInterface");

contract('DGDInterface', (accounts) => {
  it('should put 10000 DGDInterface in the first account', async () => {
    const dgdInterfaceInstance = await DGDInterface.deployed();
    const balance = await dgdInterfaceInstance.getBalance.call(accounts[0]);

    assert.equal(balance.valueOf(), 2000000000000000, "2000000000000000 wasn't in the first account");
  });
  it('should call a function that depends on a linked library', async () => {
    const dgdInterfaceInstance = await DGDInterface.deployed();
    const dgdInterfaceBalance = (await dgdInterfaceInstance.getBalance.call(accounts[0])).toNumber();
    const dgdInterfaceEthBalance = (await dgdInterfaceInstance.getBalanceInEth.call(accounts[0])).toNumber();

    assert.equal(dgdInterfaceEthBalance, 2 * dgdInterfaceBalance, 'Library function returned unexpected function, linkage may be broken');
  });
  it('should send coin correctly', async () => {
    const dgdInterfaceInstance = await DGDInterface.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await dgdInterfaceInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await dgdInterfaceInstance.getBalance.call(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await dgdInterfaceInstance.sendCoin(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await dgdInterfaceInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await dgdInterfaceInstance.getBalance.call(accountTwo)).toNumber();


    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
