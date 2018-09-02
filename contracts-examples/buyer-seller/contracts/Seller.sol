pragma solidity ^0.4.17;

contract Seller {
 
    address public ownAddress;
    string public sellerId;
    
    struct sellable {
        string  itemId;
        uint    quantity;
        uint    pricePerUnit;
    }
    
    //enum inventoryState { Empty, NotEmpty }

    mapping (string => sellable) private inventory;
    
    constructor (string sellerName) public{
        sellerId = sellerName;
        ownAddress = this;
    }
    
    function isInInventory(string itemName) public view returns (bool) {
        if(inventory[itemName].quantity < 1) {
            return false;
        }
        return true;
    }
    
    function addToInventory(string itemName, uint qty, uint priceUnit) public{
        if(inventory[itemName].quantity == 0) {
            inventory[itemName] = sellable(itemName, qty, priceUnit);
        } 
        else {
            inventory[itemName].quantity += qty;
            inventory[itemName].pricePerUnit = (inventory[itemName].pricePerUnit + priceUnit) / 2;
        }
    }
    
    event Sold(string sellerId, string itemName, uint quantity, uint totalCost);
    
    function sell(string itemName, uint qty) public payable returns (string , uint){
        
        // require(isInInventory(itemName), "the item is not available");
        require((isInInventory(itemName) && (inventory[itemName].quantity >= qty)), "the item is not available for the required quantity");
        
        inventory[itemName].quantity -= qty;
        
        emit Sold(sellerId, itemName, qty, msg.value);
        
        return (itemName, qty);
    }

}