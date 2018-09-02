pragma solidity ^0.4.24;

contract Lottery {
    address public manager;
    address[] public players;
	
	event Winner(address indexed winAddr, uint indexed amountWon);
	event Balance(address indexed targetAddr, uint amount);
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > 0.00000000000000001 ether);
        players.push(msg.sender);
		Balance(address(this), address(this).balance);
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty,now,players));
    }
    
	function pickWinner() public onlyManager {
        //require(msg.sender == manager); //inovked by manager only
        
        uint idx = random() % players.length;
        address myAddress = this; //contract address
		uint amountWon = myAddress.balance;
        players[idx].transfer(amountWon);
        Winner(players[idx], amountWon);
		Balance(players[idx], players[idx].balance);
		Balance(myAddress, myAddress.balance);
        players = new address[] (0); // reset players list
    }
    
    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }
    
    function getPlayers() public view returns(address[]) {
        return players;
    }
    
}