pragma solidity ^0.4.17;

// import "./CasinoUtility.sol";

contract Game 
{
    
    string      public  name;                       /*name of the game*/
    address     private casino;                     /*casino owner as a player*/
    uint        private gameFee;                    /*game fee that will be deducted from the win amount*/
    uint        private min_players_count;
    address[]   public  players;                    /*list of players currently in the game*/
    mapping(uint    => address) private gamesHistory;
    constructor(string gamename, uint fee, uint playersCount, address owner) public
    {
        name        = gamename;
        casino      = owner;
        gameFee     = fee;
        min_players_count = playersCount + 1;        /*incremented because of casino itself is added as player*/
        players.push(casino);
        
    }
    
    function getFee()
    public  view
    returns (uint)
    {
        return gameFee;
    }
    
    modifier notCasino(address ply)
    {
        require(ply != casino);
        _;
    }
    
    function updatePlayerList(address ply)
    public notCasino(ply) payable
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
    event GameEnded     (string name, uint playersCount, address winner_address, uint amount_won);
    
    function playGame() 
    public 
    returns (address)                                    /*choose a winner and return*/
    {
        emit GameStarted(name, players.length);
        address winner   = chooseWinner();
        uint amount_won=0;
        if(winner == casino)
        {                                               /*casino won, all the money to casino*/
            amount_won  = this.balance;
            casino.transfer(amount_won);
        } 
        else 
        {
            amount_won = this.balance - gameFee;
            winner.transfer(amount_won);
            casino.transfer(gameFee);
        }
        
        emit GameEnded(name, players.length, winner, amount_won);
        
        gamesHistory[now] = winner;
        clearGame();
        
        return winner;
    }
    
    function clearGame() 
    private                                             /*delete all players except the owner*/
    {
        for(uint i=1;i<players.length;i++)
        {
            delete players[i];                          /*player[0] is the casino owner account*/
        }
        
    }
    
    function chooseWinner() 
    private  view
    returns (address)                                    /*return player*/
    {
        return players[randomArrayIndex(players)];
    }

    function randomArrayIndex(address[] addrs) 
    public view 
    returns (uint)                                      /*return a random index number*/
    {
        return (uint(keccak256(block.difficulty, now, addrs)) % addrs.length);
    }
    

}