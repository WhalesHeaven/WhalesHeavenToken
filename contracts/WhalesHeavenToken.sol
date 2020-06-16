pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

/**
 * @title Basic token
 * @dev Basic version of StandardToken, with no allowances.
 */
contract WhalesHeavenToken is ERC20, ERC20Detailed {
    constructor() public ERC20Detailed("WhaleHeavenToken", "WHT", 18) {
      _mint(_msgSender(),50000000000000000000000000);
    }
}
