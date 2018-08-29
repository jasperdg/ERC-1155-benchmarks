pragma solidity ^0.4.24;

import "./../../node_modules/zeppelin-solidity/contracts/token/erc721/ERC721Token.sol";

contract BenchNFT is ERC721Token {
    constructor(string _name, string _symbol) public
        ERC721Token(_name, _symbol) {
    }

    function mint(address _to, uint _tokenId, string _uri) public{
        _mint(_to, _tokenId);
        _setTokenURI(_tokenId, _uri);
    }
    
}