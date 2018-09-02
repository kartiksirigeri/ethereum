pragma solidity ^0.4.17;

import "./Seller.sol";
import "./Producer.sol";

contract Retailer is Seller{
    
    address[] public producers;
    address[] public sellers;
    
    // constructor(string retailerName) Seller(retailerName) public{
        
    // }
    
    function updateProducers () public {
        
        producers.push(bytesToAddress(msg.data));

    }
    
    function purchaseFromProducers(string itemName, uint quantity) public {
        
        address seller = producers[randomSeller(producers)];
        Producer sl = Producer(seller);
        uint amountSpent = address(this).balance;
        sl.sell.value(address(this).balance)(itemName, quantity);
        //check for error..but how?
        
        amountSpent -= address(this).balance;
        
        addToInventory(itemName, quantity, (amountSpent/quantity + 20));
        
    }
    
    function randomSeller(address[] list) private view returns (uint) {
        return (uint(keccak256(block.difficulty, now, list)) % list.length);
    }
    
    function bytesToAddress(bytes _address) private view returns (address) {
        uint160 m = 0;
        uint160 b = 0;
            
        for (uint8 i = 0; i < 20; i++) {
            m *= 256;
            b = uint160(_address[i]);
            m += (b);
        }

        return address(m);
    }
    
}