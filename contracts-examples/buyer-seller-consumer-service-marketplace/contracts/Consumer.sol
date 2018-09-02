pragma solidity ^0.4.21;

interface RetailerInterface
{
    function sellToConsumer(string prodname) external payable returns (string, uint);
}

contract Consumer
{
    string name;
    mapping (string => uint) products;
    
    constructor (string id)
    public
    {
        name = id;
    }
    
    function
    buyFromRetailer(string prodname)
    public payable
    {
        require(msg.value > 0.00000000000000001 ether);
        
        RetailerInterface mi = RetailerInterface(address(0x0));
        
        string memory pname;
        uint qty;
        
        (pname, qty)= mi.sellToConsumer.value(msg.value)(prodname);
        
        //transfer tokens to consumer
    }
}