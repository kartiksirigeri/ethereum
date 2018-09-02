pragma solidity ^0.4.17;

import "./Game.sol";

contract Casino
{                                                   /*casino hosts n participates in all the games*/
    
    string      public  name;                       /*name of the casino*/
    address     private self;                       /*casio owner*/
    address     private owner;
    mapping(string => Game)    private games;      /*list of games hosted by casino*/
    mapping(address => bool)   private players;    /*list of players currently in the casino*/
    
    constructor(string casinoName) public
    {                                               /*constructor of the contract*/
        name   = casinoName;
        self   = this;
        owner  = msg.sender;
    }
    
    modifier casinoOwner() 
    {
        require(msg.sender == owner);
        _;
    }
    
    function addGame(string gameName, uint gameFee, uint playersCount) 
    public casinoOwner                          /*only casino owner can add new games*/
    {
       games[gameName] = new Game(gameName, gameFee, playersCount, owner);
    }
    
    modifier byPlayersOnly()
    {
        require(msg.sender != owner);
        _;
    }
    
    function enterCasino()
    public byPlayersOnly                                        /*only players choose to enter*/
    {
        if(players[msg.sender]==false)
        {
            players[msg.sender] = true;
        }
        
    }
    
    modifier checkFee(string gameName) 
    {
        require(msg.value > games[gameName].getFee(),"player value is not sufficient");
        _;
    }

    function playGame(string gameName) 
    public payable byPlayersOnly checkFee(gameName)
    returns (bool, address)
    {
        Game gm         = games[gameName];
        gm.updatePlayerList.value(msg.value)(msg.sender);
        if(gm.canPlayGame())
        {
            address winner = gm.playGame();
            return (true, winner);
        }
        return (false, address(0));
    }
    
    function exitCasino()
    public byPlayersOnly
    {
        delete players[msg.sender];
    }
    
}