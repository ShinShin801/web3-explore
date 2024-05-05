// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

// , ERC20Burnable, ERC20Pausable, ERC20Permit, ERC20Votes

contract MyToken is ERC20, ERC20Burnable, Ownable, ERC20Permit, ERC20Pausable{

    string tokenName;
    string tokenSymbol;
    address tokenInitialOwner;

    /**
     * contructor
     * @param _name name of the token
     * @param _symbol name of the symbol
     * @param _initialOwner address of the owner
     * @param _amount amout to be initioally minted
     */
    constructor(string memory _name, string memory _symbol, address _initialOwner, uint256 _amount)
    ERC20(_name, _symbol)
    ERC20Permit(_name)
    Ownable(_initialOwner)
    {
          tokenName = _name;
          tokenSymbol = _symbol;
          tokenInitialOwner = _initialOwner;

        //   Initial Mint
          _mint(_initialOwner, _amount);
    }


    /**
     *
     * @param to address to mint the token
     * @param amount amout of the minting
     */
    function mint(address to, uint256 amount) public onlyOwner {
          _mint(to, amount);
    }

    /**
     *
     * @param to address to burn the token
     * @param amount amout of the burning
     */
    function burn(address to, uint256 amount) public onlyOwner {
          _burn(to, amount);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }


    // Override the function for ERC20Pausable
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }

}
