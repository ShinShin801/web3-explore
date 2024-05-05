// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import './MyToken.sol';
import "hardhat/console.sol";


contract MyTokenGenerator {
    // Array of MyToken
    MyToken[] private _myTokens;
    // The maximum number of MyTokens that can be returned from myTokens Function
    uint256 constant maxLimit = 50;

    // Event when Mytoken is generated
    event MyTokenCreated (MyToken indexed myToken, address indexed owner);

    /**
     * Retrieving number of MyTokens published in the contract
     */
    function myTokensCount () public view returns (uint256) {
        return _myTokens.length;
    }

    /**
     * Contract to generate MyToken
     * @param name name of the token
     * @param symbol symbol of the token
     */
    function createMyToken (string memory name, string memory symbol, uint256 amount) public {
        MyToken myToken = new MyToken(name, symbol, msg.sender, amount);
        // console.log("Here comes ended");
        // Trasnfering the owenership
        // myToken.transferOwnership(msg.sender);
        // Storing in the array
        _myTokens.push(myToken);

        emit MyTokenCreated(myToken, msg.sender);
    }

    /**
     * Function to retrieve MyTokens
     * @param limit The number of MyTokens to retrieve
     * @param offset the beggining of the array to search
     * @return coll Array of MyToken contract
     */
    function myTokens (uint256 limit, uint256 offset) public view returns (MyToken[] memory coll) {
        // 取得前に確認
        require (offset <= myTokensCount(), "offset out of bounds");
        // 最大値を上回っている場合は、limitを格納する。
        uint256 size = myTokensCount() - offset;
        size = size < limit ? size : limit;
        // sizeは、maxLimitを超えてはならない。
        size = size < maxLimit ? size : maxLimit;
        // コントラクト用の配列
        coll = new MyToken[](size);

        for (uint256 i = 0; i < size; i++) {
            coll[i] = _myTokens[offset + i];
        }

        return coll;
    }
}
