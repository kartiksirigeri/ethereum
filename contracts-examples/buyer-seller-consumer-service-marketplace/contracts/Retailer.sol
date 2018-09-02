pragma solidity ^0.4.21;

interface ManufacturerInterface
{
    function sellToRetailer(string prodname) external payable returns (string, uint);
}

contract Retailer
{
    string name;
    mapping (string => uint) products;
    
    constructor (string id)
    public
    {
        name = id;
    }
    
    function
    buyFromManufacturer(string prodname)
    public payable
    {
        require(msg.value > 0.00000000000000001 ether);
        
        ManufacturerInterface mi = ManufacturerInterface(address(0x0));
        
        string memory pname;
        uint qty;
        
        (pname, qty)= mi.sellToRetailer.value(msg.value)(prodname);
        
        //transfer tokens to consumer
    }
    
    modifier
    checkInventory(string prodname)
    {
        require(products[prodname] > 0);
        _;    
    }
    
    function
    sellToConsumer(string prodname)
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