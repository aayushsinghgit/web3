// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KryptToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 100000000 * 10**18; // 100M tokens
    
    constructor() ERC20("Krypt Token", "KRT") {
        _mint(msg.sender, 25000000 * 10**18); // Initial 25M tokens
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }
}