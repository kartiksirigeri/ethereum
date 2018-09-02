pragma solidity ^0.4.17;

import "./Seller.sol";

contract Producer is Seller{
    
    string[] toProduce = ["item 1", "item 2"];
    
    enum ProductionState { INPRODUCTION  , PRODUCTIONCOMPLETE }
    
    event Manufactured (string manufacturerName, string itemName, uint quantity, uint time);
    event ProducerState (string manufacturerName, ProductionState state);
    
    
    constructor(string manufacturerName) Seller(manufacturerName) public {
        
        // toProduce.push("item 1");
        // toProduce.push("item 2");
        toProduce.push("item 3");
        toProduce.push("item 4");
        toProduce.push("item 5");
        toProduce.push("item 6");
        toProduce.push("item 7");
        toProduce.push("item 8");
        toProduce.push("item 9");
        toProduce.push("item 10");
        
        produceGoods();
    }
    
    
    function produceGoods() public {
        //enums are not exposed in ABI....will the below work?
        emit ProducerState(sellerId, ProductionState.INPRODUCTION);
        
        for(uint i=0; i< toProduce.length; i++) {
            addToInventory(toProduce[i], 10, determinePrice(toProduce[i],100));
            emit Manufactured(sellerId, toProduce[i], 10, now);    
        }
        
        emit ProducerState(sellerId, ProductionState.PRODUCTIONCOMPLETE);
        
    }
    
    function determinePrice(string itemName, uint price) private view returns (uint) {
        if(isInInventory(itemName)) 
        {
            return price;
        }
        
        return ((price * 70) / 100);
    }
  
}