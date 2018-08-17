pragma solidity ^0.4.24;

import "./../../node_modules/zeppelin-solidity/contracts/token/erc20/StandardToken.sol";

contract BenchCoin is StandardToken {
    string public name;
    string public symbol;
    uint8 public decimals = 18;

    constructor(string _name, string _symbol, uint _supply ) public {
        name = _name;
        symbol = _symbol;
        totalSupply_ = _supply;
        balances[msg.sender] = _supply;
    }
    
}