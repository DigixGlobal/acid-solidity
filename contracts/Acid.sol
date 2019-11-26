pragma solidity ^0.5.0;

import "./DummyDGD.sol"

contract Acid {
  
  event Refund(address indexed user, uint256 indexed dgds, uint256 refundAmount);

  // Wei refunded per DGD burned
  uint256 refundRate;
  address dgdToken;
  
  constructor(uint256 _refundRate, address _gdToken) public {
    refundRate = _refundRate;
    dydToken = _dgdToken
  }

  function burn() public returns (bool) {
    uint256 _amount = DummyDGD(dgdToken).balanceOf(msg.sender);
    uint256 _wei = _amount * refundRate;
    require(DummyDGD(dgdToken).transferFrom(msg.sender, 0x0);
    address _user = msg.sender;
    return _user.call.value(_wei).gas(100000)();
  }


  }
}
