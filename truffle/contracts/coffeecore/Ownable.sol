// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "../coffeeBase/SupplyChain.sol";

/// Provides basic authorization control
contract Ownable is SupplyChain {
    address public origOwner;

    // Define an Event
    event TransferOwnership(address indexed oldOwner, address indexed newOwner);

    /// Assign the contract to an owner
    constructor() {
        origOwner = msg.sender;
        emit TransferOwnership(address(0), origOwner);
    }

    /// Define a function modifier 'onlyOwner'
    modifier onlyOwner() override {
        require(isOwner(), "Is owner account");
        _;
    }

    /// Check if the calling address is the owner of the contract
    function isOwner() public view returns (bool) {
        return msg.sender == origOwner;
    }

    /// Define a function to renounce ownerhip
    function renounceOwnership() public onlyOwner {
        emit TransferOwnership(origOwner, address(0));
        origOwner = address(0);
    }

    /// Define a public function to transfer ownership
    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    /// Define an internal function to transfer ownership
    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0), "Account should not be 0");
        emit TransferOwnership(origOwner, newOwner);
        origOwner = newOwner;
    }
}
