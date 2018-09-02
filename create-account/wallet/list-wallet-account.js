var Web3            = require("web3");
var Accounts        = require("web3-eth-accounts");
var Personal        = require('web3-eth-personal');
var KeyStoreWalletProvider = require('../keystore-hdwallet');
var myGethNode      = require("../commons");
var fs              = require("fs");

const keyStoreDir   = __dirname+"/keystore/";
var web3I           = new Web3(new Web3.providers.HttpProvider(myGethNode));
var allWallets      = [];

fs.readdirSync(keyStoreDir).forEach( fileName => {
    var content = new Buffer(fs.readFileSync(keyStoreDir+fileName)).toString();
    var wallet = web3I.eth.accounts.wallet.decrypt(JSON.parse(content), "password"); //this assumes many encrypted accounts in a single file and all encrypted with same password

    for(var i=0;wallet[i]!=undefined;i++)
    {
        // console.log(wallet[i].address + " :: "+ wallet[i].privateKey);
        allWallets.push(wallet[i]);
    }
});

var getBalances = async () => {
    for(var i=0; i< allWallets.length ; i++) {
        var address = allWallets[i].address;
        var balance = await web3I.eth.getBalance(address)
        console.log( address + " balance is " +  balance);
    }
}

getBalances();

