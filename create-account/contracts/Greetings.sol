pragma solidity ^0.4.17;

contract Greetings{
    string public message;
    
    constructor(string initialTweet) public{
        message = initialTweet;
    }
    
    function setMessage(string newTweet) public{
        message = newTweet;
    }
    
    function getMessage() public view returns (string) {
        return message;
    }
    
    // function getMessage_Not_View() public returns (string) {
    //     return message;
    // }
    
    // function doMath(int a , int b) public {
    //     a + b;
    //     b - a;
    //     a * b;
    //     a == 0;
    // }
    
}