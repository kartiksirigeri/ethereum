var Web3            = require("web3");
var Accounts        = require("web3-eth-accounts");
var Personal        = require('web3-eth-personal');
var myGethNode      = require("./commons");

var web3I           = new Web3(new Web3.providers.HttpProvider(myGethNode));
var accountI        = new Accounts(new Web3.providers.HttpProvider(myGethNode));
var personalI       = new Personal(new Web3.providers.HttpProvider(myGethNode));

var externalAccount = "0xa24A4244d6f0384A049d50D0b854C43A85ce2573";

var getCoinbase     = async () => {
    var coinbase    = await web3I.eth.getCoinbase();
    await personalI.unlockAccount(coinbase,"password",50000);
    return coinbase;
}

var sendTransaction = (fromAddr, toAddr, value, callBack) => {
    
    web3I.eth.sendTransaction({
        "from"  : fromAddr,
        "to"    : toAddr,
        "value" : web3I.utils.toWei(value, "ether")  
    }, callBack);
};

getCoinbase().then(coinbase => {
    console.log("coinbase address           ", coinbase);
    console.log("creating transaction       ");
    sendTransaction(coinbase, externalAccount, '0.05', function(err, result) {
        if(err){
            console.log("transaction error          ", err);
        }
        if(result){
            console.log("transaction result         ", result);
            web3I.eth.getTransaction(result).then(console.log);
        }
    });
});