// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title USDC Mock Token
 * @notice 模拟USDC代币，小数位数为6
 */
// contract USDC is ERC20, Ownable {
//     constructor() ERC20("USD Coin", "USDC") Ownable(msg.sender) {
//         // 初始铸造10,000,000 USDC
//         _mint(msg.sender, 1000 * 10**decimals());
//     }

//     function mint(address to, uint256 amount) public {
//         _mint(to, amount);
//     }
// }

contract USDC is ERC20, Ownable {

   constructor() ERC20("USD Coin", "USDC") Ownable(msg.sender) {
        // 初始铸造1000 USDC，注意USDC的小数位数为6
        // 这里的decimals()返回6，所以1000 * 10 ** decimals() = 1000 * 10 ** 6 = 1,000,000 USDC
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}