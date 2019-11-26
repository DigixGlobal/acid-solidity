pragma solidity ^0.5.0;

contract DummyDGD {

  string public constant name = "DummyDGD";
  string public constant symbol = "dDGD";
  uint8 public constant decimals = 9;  

  event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
  event Transfer(address indexed from, address indexed to, uint tokens);


  mapping(address => uint256) balances;

  mapping(address => mapping (address => uint256)) allowed;
    
  uint256 totalSupply;

  using SafeMath for uint256;

  constructor(uint256 _totalSupply) public {  
    totalSupply = _totalSupply;
  	balances[msg.sender] = totalSupply;
  }  

  function totalSupply() public view returns (uint256) {
   	return totalSupply;
  }
    
  function balanceOf(address tokenOwner) public view returns (uint) {
    return balances[tokenOwner];
  }

  function transfer(address receiver, uint numTokens) public returns (bool) {
    require(numTokens <= balances[msg.sender]);
    balances[msg.sender] = balances[msg.sender].sub(numTokens);
    balances[receiver] = balances[receiver].add(numTokens);
    emit Transfer(msg.sender, receiver, numTokens);
    return true;
  }

  function approve(address delegate, uint numTokens) public returns (bool) {
    allowed[msg.sender][delegate] = numTokens;
    Approval(msg.sender, delegate, numTokens);
    return true;
  }

  function allowance(address owner, address delegate) public view returns (uint) {
    return allowed[owner][delegate];
  }

  function transferFrom(address owner, address buyer, uint numTokens) public returns (bool) {
    require(numTokens <= balances[owner]);    
    require(numTokens <= allowed[owner][msg.sender]);
   
    balances[owner] = balances[owner].sub(numTokens);
    allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
    balances[buyer] = balances[buyer].add(numTokens);
    Transfer(owner, buyer, numTokens);
    return true;
  }
}


