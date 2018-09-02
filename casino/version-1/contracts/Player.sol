pragma solidity ^0.4.17;

contract Player 
{
    struct GamePlayed 
    {
        string  gameName;               /*name of the game played*/
        uint    timePlayed;             /*time when game played*/
        int     amountPlayed;           /*amount win or lost in the game*/
    }
    string public name;
    string public id;
    GamePlayed[] private playHistory /*time played => win/lost amount*/;
    
    constructor(string player_name) 
    {
        name = player_name;
    }
    
    function getName() 
    public view
    returns (string)
    {
        return name;
    }
    
    function updateGameHistory(string gameName, uint timePlayed, int amountPlayed)
    public
    {
        playHistory.push(GamePlayed(gameName, timePlayed, amountPlayed));
    }
}
