// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BTC Mock Token
 * @notice 模拟BTC代币，小数位数为18
 */
contract BTC is ERC20, Ownable {
    constructor() ERC20("Bitcoin", "BTC") Ownable(msg.sender) {
        // 初始铸造1,000 BTC
        _mint(msg.sender, 1_000 * 10**decimals());
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
    _burn(from, amount);
    }
}