pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
}


contract WhalesHeavenBountyPayout is Ownable {

  using SafeMath for uint256;

  address public currencyAddress;

  constructor(
      address _currencyAddress
  ) public {
      currencyAddress = _currencyAddress;
  }

  function bountyDrop(address[] memory recipients, uint256[] memory values) onlyOwner public returns (bool) {
      require(recipients.length == values.length);

      for (uint256 i = 0; i < recipients.length; i++) {
          token().transfer(recipients[i], values[i]);
      }

      return true;
  }

  function token() public view returns (IERC20) {
      return IERC20(currencyAddress);
  }
}
