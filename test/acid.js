const DGDInterface  = artifacts.require("DGDInterface");
const Acid = artifacts.require("Acid");

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

});

