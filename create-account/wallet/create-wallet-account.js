var Web3            = require("web3");
var Accounts        = require("web3-eth-accounts");
var Personal        = require('web3-eth-personal');
var HDWalletProvider = require('truffle-hdwallet-provider');
var myGethNode      = require("../commons");
var fs              = require("fs");
const keyStoreDir   = __dirname+"/keystore/";
!fs.existsSync(keyStoreDir) && fs.mkdirSync(keyStoreDir);

const numberOfAccounts  = 3;
const httpProvider      = new Web3.providers.HttpProvider(myGethNode)
// const walletProvider = new HDWalletProvider(
//     'tape reward load torch base float safe student online swallow thing dentist festival style simple',
//      myGethNode,
//      0,
//      numberOfAccounts
// );

var web3I           = new Web3(httpProvider);
var accountI        = new Accounts(httpProvider);
var personalI       = new Personal(httpProvider);
var wallet;

var createAccount =  async () => {
    wallet = web3I.eth.accounts.wallet.create(numberOfAccounts); //this creates n accounts in the eth wallet

    var enCryptedWallet = wallet.encrypt("password")

    fs.writeFileSync(keyStoreDir+Date.now()+".json", JSON.stringify(enCryptedWallet));

    //## below is to encrypt individual accounts
    // for(var j=0;j< numberOfAccounts;j++){
    //     var eWallet =   wallet[j].encrypt( wallet[j].privateKey, "password");
    //     console.log(wallet[j].address +" :: "+ JSON.stringify(eWallet) 
    //     fs.writeFileSync(keyStoreDir+wallet[j].address+".json", JSON.stringify(eWallet));
    // }

    // var accounts    = await web3I.eth.getAccounts();    
    // console.log("accounts address    ", accounts); //this shows the accounts that are in the eth node itself; but not the wallets

};

var getBalances = async () => {
    for(var i=0; i< numberOfAccounts ; i++) {
        var address = wallet[i].address;
        var balance = await web3I.eth.getBalance(address)
        console.log( address + " balance is " +  balance);
    }
};

createAccount().then(getBalances());