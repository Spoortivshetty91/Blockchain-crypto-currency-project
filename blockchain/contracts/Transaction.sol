// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Transaction {
    struct Txn {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
    }

    Txn[] public transactions;

    function sendTransaction(address _receiver, uint256 _amount, string memory _message) public {
        require(_receiver != address(0), "Invalid receiver");
        require(_amount > 0, "Amount must be greater than zero");

        transactions.push(Txn(
            msg.sender,
            _receiver,
            _amount,
            _message,
            block.timestamp
        ));
    }

    function getTransactions() public view returns (Txn[] memory) {
        return transactions;
    }
}