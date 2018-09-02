pragma solidity ^0.4.17;

import "./Player.sol";
import "./Game.sol";
import "./CasinoUtility.sol";

contract Casino is Player
{                                                   /*casino hosts n participates in all the games*/
    
    string      public  name;                       /*name of the casino*/
    Player      private self;                      /*casio owner*/
    address     private owner;
    mapping(string => Game)     private games;      /*list of games hosted by casino*/
    mapping(string => Player)   private players;    /*list of players currently in the casino*/
    
    constructor(string casinoName) Player(casinoName)
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
        games[gameName] = new Game(gameName, gameFee, playersCount);
    }
    
    modifier byPlayersOnly()
    {
        require(msg.sender != owner);
        _;
    }
    
    function enterCasino(string playerAddr)
    public byPlayersOnly                                        /*only players choose to enter*/
    {
        Player ply          = Player(Utility.parseAddr(playerAddr));    /*type cast address to player*/
        string memory nm    = ply.getName();
        players[nm]         = ply;                              /*update the players list maintained by casino*/
    }
    
    modifier checkFee(string gameName) 
    {
        require(msg.value > games[gameName].getFee(),"player value is not sufficient");
        _;
    }

    function playGame(string gameName, string playerName) 
    public payable byPlayersOnly checkFee(gameName)
    returns (bool, string)
    {
        Game gm         = games[gameName];
        gm.updatePlayerList(players[playerName]);
        if(gm.canPlayGame())
        {
            Player winner = gm.playGame();    
            return (true, winner.getName());
        }
        return (false, "not enough players");
    }
    
    function exitCasino(string playerName)
    public byPlayersOnly
    {
        delete players[playerName];
    }
    
}