pragma solidity ^0.5.0;

import "./DGDInterface.sol";

contract Acid {
  
  event Refund(address indexed user, uint256 indexed dgds, uint256 refundAmount);

  // wei refunded per 0.000000001 DGD burned
  uint256 public weiPerNanoDGD;
  bool public isInitialized;
  address public dgdTokenContract;
  address public owner;

  modifier isOwner() {
    require(owner == msg.sender);
    _;
  }

  modifier requireInitialized() {
    require(isInitialized);
    _;
  }

  constructor() public {
    owner = msg.sender;
    isInitialized = false;
  }

  function init(uint256 _weiPerNanoDGD, address _dgdTokenContract) public isOwner() returns (bool _success) {
    weiPerNanoDGD = _weiPerNanoDGD;
    dgdTokenContract = _dgdTokenContract;
    isInitialized = true;
    _success = true;
  }

  function burn() requireInitialized() public returns (bool _success) {
    // Rate will be calculated based on the nearest decimal
    uint256 _amount = DGDInterface(dgdTokenContract).balanceOf(msg.sender);
    uint256 _wei = _amount * weiPerNanoDGD;
    require(DGDInterface(dgdTokenContract).transferFrom(msg.sender, 0x0000000000000000000000000000000000000000, _amount));
    address _user = msg.sender;
    (_success,) = _user.call.value(_wei).gas(150000)('');
    emit Refund(_user, _amount, _wei);
  }


}
