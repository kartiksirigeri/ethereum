var Web3     = require("web3");
var myGethNode  = require("./commons");

var web3I    = new Web3(new Web3.providers.HttpProvider(myGethNode));

var getAccounts   = async () => {
    var accounts = await web3I.eth.getAccounts();    

    console.log("accounts address    ", accounts);
    
};

getAccounts();