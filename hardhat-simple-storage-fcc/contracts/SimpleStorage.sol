// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7; // 0.8.12

contract SimpleStorage {
    // boolean, uint(), int, address, bytes
    uint256 public favoriteNumber;
    // 映射
    mapping(string => uint256) public nameToFavoriteNumber;

    struct People {
        uint favoriteNumber;
        string name;
    }

    // EVM, Ethereum Virtual Machine
    // Avalanche, Fantom, Polygon

    People[] public people;

    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
    }

    // view, pre 不消耗gas
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    // calldata 可以修改的临时变量, memory 可以修改的临时变量, storage 可以修改的永久变量
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
