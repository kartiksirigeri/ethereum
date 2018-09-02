pragma solidity ^0.4.17;

contract Referrer {
    address input;
    constructor(address adr) public
    {
        input = adr;
    }
    
    function get() public view returns (uint answer)
    {
        return Referred(input).toReturn();
    }
    
    function get_assembly()
    public view returns (uint answer)
    {
        bytes4 sig = bytes4(keccak256("toReturn()"));
        assembly {
            let ptr := mload(0x40)
            mstore(ptr,sig)
            //mstore(add(ptr,0x04), _val) //pass any value
            let result := call(
                15000,
                sload(input_slot),
                0,
                ptr,
                0x04,
                ptr,
                0x20)
            
            if eq(result, 0) {
                revert(0, 0)
            }
            
            answer := mload(ptr) 
            mstore(0x40,add(ptr,0x24))
        }
     //   return Referred(input).toReturn();
    }
    
    function set(address input)
    public payable
    {
        // d_address.call.gas(21000)(bytes4(keccak256("set(uint)")),456);
        
        Referred(input).set.gas(21000).value(msg.value)(456);
    }
    
}


contract Referred {
    
    uint public val;
    constructor (uint v) public
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