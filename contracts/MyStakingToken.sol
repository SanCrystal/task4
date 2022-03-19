// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract MyStakingToken is ERC20 {
    address Owner;
    constructor()
    ERC20("MyStakingToken", "MST"){
        Owner = msg.sender;
        _mint(Owner,1000000 * 10**decimals());

    }
}