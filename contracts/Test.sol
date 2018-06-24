pragma solidity ^0.4.17;

contract Test {
    
    address public d_address;
    Referred public rf;
    
    function deployOther()
    public
    {
        d_address = new Referred(123);
        
    }
    
    function get()
    public returns (uint)
    {
         rf = Referred(d_address);
        return rf.toReturn();
    }
    
    function set()
    public payable
    {
        // d_address.call.gas(21000)(bytes4(keccak256("set(uint)")),456);
        
        rf.set.gas(21000).value(msg.value)(456);
    }
    
}


contract Referred {
    
    uint public val;
    constructor(uint v) public
    {
        val = v;
    }
    
    function set(uint nv)
    public payable
    {
        val = nv;
    }
    
    function toReturn() public view returns (uint)
    {
        return val;
    }
    
}