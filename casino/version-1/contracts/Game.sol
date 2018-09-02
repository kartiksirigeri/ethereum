pragma solidity ^0.4.17;

import "./Player.sol";

contract Game 
{
    
    string      public  name;                           /*name of the game*/
    Player      private casino;                    /*casino owner as a player*/
    uint        private gameFee;                        /*game fee that will be deducted from the win amount*/
    uint        private min_players_count;
    Player[]    public  players;        /*list of players currently in the game*/
    mapping(uint    => address) private gamesHistory;
    
    constructor(string gamename, uint fee, uint playersCount) 
    {
        name        = gamename;
        casino      = Player(msg.sender);
        gameFee     = fee;
        min_players_count = playersCount + 1;           /*incremented because of casino itself is added as player*/
        players.push(casino);
    }
    
    function getFee()
    public  view
    returns (uint)
    {
        return gameFee;
    }
    
    modifier notCasino(Player ply)
    {
        require(ply != casino);
        _;
    }
    
    function updatePlayerList(Player ply)
    public notCasino(ply)
    {
        uint i=0;
        for(;i< players.length; i++)
        {
            if(players[i] == ply)
            {
                break;    
            }
        }
        if(i >= players.length)
        {
            players.push(ply);
        }
    }
    
    function canPlayGame()
    public view
    returns (bool)
    {
        if(players.length >= min_players_count)
        {
            return true;
        }
        return false;
    }
    
    event GameStarted   (string name, uint playersCount);
    event GameEnded     (string name, uint playersCount, string winner_name, uint amount_won);
    
    function playGame() 
    public 
    returns (Player)                                    /*choose a winner and return*/
    {
        emit GameStarted(name, players.length);
        Player winner   = chooseWinner();
        uint amount_won;
        if(winner == casino)
        {                                               /*casino won, all the money to casino*/
            amount_won  = this.balance;
            address(casino).transfer(amount_won);
        } 
        else 
        {
            amount_won = this.balance - gameFee;
            address(winner).transfer(amount_won);
            address(casino).transfer(gameFee);
        }
        
        emit GameEnded(name, players.length, winner.getName(), amount_won);
        
        gamesHistory[now] = address(winner);
        clearGame();
        
        return winner;
    }
    
    function clearGame() 
    private                                             /*delete all players except the owner*/
    {
        for(uint i=1;i<players.length;i++)
        {
            delete players[i];
        }
        
    }
    
    function chooseWinner() 
    private  view
    returns (Player)                                    /*return player*/
    {
        return players[randomPlayer()];
    }
    
    function randomPlayer() 
    private view 
    returns (uint)                                      /*return a random index number*/
    {
        return (uint(keccak256(block.difficulty, now, players)) % players.length);
    }
    
}