pragma solidity ^0.5.0;

import "./DGDInterface.sol";

contract Acid {
  
  event Refund(address indexed user, uint256 indexed dgds, uint256 refundAmount);

  // wei refunded per 0.000000001 DGD burned
  uint256 public weiPerNanoDGD;
  bool public isInitialized;
  address public dgdTokenContract;
  address public owner;

  modifier onlyOwner() {
    require(owner == msg.sender);
    _;
  }

  modifier unlessInitialized() {
    require(!isInitialized, "contract is already initialized");
    _;
  }

  modifier requireInitialized() {
    require(isInitialized, "contract is not initialized");
    _;
  }

  constructor() public {
    owner = msg.sender;
    isInitialized = false;
  }

  function () external payable {}  

  function init(uint256 _weiPerNanoDGD, address _dgdTokenContract) public onlyOwner() unlessInitialized() returns (bool _success) {
    require(_weiPerNanoDGD > 0, "rate cannot be zero");
    require(_dgdTokenContract != address(0), "DGD token contract cannot be empty");
    weiPerNanoDGD = _weiPerNanoDGD;
    dgdTokenContract = _dgdTokenContract;
    isInitialized = true;
    _success = true;
  }

  function burn() public requireInitialized() returns (bool _success) {
    // Rate will be calculated based on the nearest decimal
    uint256 _amount = DGDInterface(dgdTokenContract).balanceOf(msg.sender);
    uint256 _wei = _amount * weiPerNanoDGD;
    require(address(this).balance >= _wei, "Contract does not have enough funds");
    require(DGDInterface(dgdTokenContract).transferFrom(msg.sender, 0x0000000000000000000000000000000000000000, _amount), "No DGDs or DGD account not authorized");
    address _user = msg.sender;
    (_success,) = _user.call.value(_wei).gas(150000)('');
    require(_success, "Transfer of Ether failed")
    emit Refund(_user, _amount, _wei);
  }
}
