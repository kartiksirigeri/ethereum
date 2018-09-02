pragma solidity ^0.4.17;

library Utility
{
    function randomArrayIndex(address[] addrs) 
    public view 
    returns (uint)                                      /*return a random index number*/
    {
        return uint ((uint(keccak256(block.difficulty, now, addrs)) % addrs.length));
    }
    
}