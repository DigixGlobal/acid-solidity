pragma solidity >=0.4.25 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/DGDInterface.sol";

contract TestDGDInterface {

  function testInitialBalanceUsingDeployedContract() public {
    DGDInterface dgd = DGDInterface(DeployedAddresses.DGDInterface());

    uint expected = 2000000000000000;

    Assert.equal(dgd.balanceOf(tx.origin), expected, "Owner should have 2000000000000000 DGD initially");
  }

}
