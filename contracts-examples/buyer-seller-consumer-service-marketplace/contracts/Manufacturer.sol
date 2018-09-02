pragma solidity ^0.4.21;

import "./ProductToken.sol";

contract Manufacturer 
{
    string name;
    mapping (string => uint) products;
    mapping (string => address) tokens;
    
    constructor (string id) 
    public
    {
        name = id;
        manufacture();
    }
    
    function
    manufacture()
    private
    {
        string[5] memory list = ["Prod-1","Prod-2","Prod-3","Prod-4","Prod-5"];
        
        for(uint8 i =0; i<list.length; i++)
        {
            products[list[i]] = 10;
            tokens[list[i]] = new ProductToken(list[i]);
        }
        
    }
    
    modifier
    checkInventory(string prodname)
    {
        require(products[prodname] > 0);
        _;    
    }
    
    function
    sellToRetailer(string prodname)
    public payable checkInventory(prodname)
    returns (string, uint)
    {
        require(msg.value > 0.00000000000000001 ether);
        uint qty = products[prodname];
        products[prodname] = 0;
        
        //create token approval
        
        return (prodname, qty);
    }
}