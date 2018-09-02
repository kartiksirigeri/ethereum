pragma solidity ^0.4.21;

contract ServiceProvider
{
    string name;
    constructor (string id)
    {
        name = id;
    }
    
    function
    service(string consumner, string product)
    public payable
    returns (bool)
    {
        require(msg.value > 0.0000000000000001 ether);
        
        //transfer tokens from consumner
        
        return true;
    }
}