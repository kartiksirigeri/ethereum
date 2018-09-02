var Web3            = require("web3");
var Accounts        = require("web3-eth-accounts");
var Personal        = require('web3-eth-personal');
var myGethNode      = require("./commons");

var web3I           = new Web3(new Web3.providers.HttpProvider(myGethNode));
var accountI        = new Accounts(new Web3.providers.HttpProvider(myGethNode));
var personalI       = new Personal(new Web3.providers.HttpProvider(myGethNode));

var createAccount =  async () => {
    var password        = "password";
    var accountP        = await personalI.newAccount(password);
    console.log("personal               ",accountP);

};
createAccount();



