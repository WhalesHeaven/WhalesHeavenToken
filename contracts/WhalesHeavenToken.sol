pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

/**
 * @title Basic token
 * @dev Basic version of StandardToken, with no allowances.
 */
contract WhalesHeavenToken is ERC20 {
    constructor() public {
      _mint(_msgSender(),50000000000000000000000000);
    }
}
