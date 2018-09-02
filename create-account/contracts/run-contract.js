var Web3            = require("web3");
var Accounts        = require("web3-eth-accounts");
var Personal        = require('web3-eth-personal');
var myGethNode      = require("../commons");

var web3I           = new Web3(new Web3.providers.HttpProvider(myGethNode));
var personalI       = new Personal(new Web3.providers.HttpProvider(myGethNode));
const {interface}   = require('./compile-contract');

const contractAddress   = "0x6ECE8fDfEf14Ab1D87843491D207dF1E6a8A54b8";
const contractI         = new web3I.eth.Contract(JSON.parse(interface),contractAddress);

async function createContractTransactions() {
    var accounts        = await web3I.eth.getAccounts();
    const accountToUse  = accounts[2];
    console.log("account to expense from                ", accountToUse);

    var calledMessage   = await contractI.methods.getMessage().call();
    console.log("call to contract returned              ", calledMessage);

    var transactionHash = await contractI.methods.setMessage('Time is '+Date.now()).send({"from": accountToUse});
    console.log("first transact result hash             ", transactionHash);

    calledMessage   = await contractI.methods.getMessage().call();
    console.log("call to contract returned              ", calledMessage);

    transactionHash = await contractI.methods.setMessage('Time is '+Date.now()).send({"from": accountToUse});
    console.log("second transact result hash             ", transactionHash);

    calledMessage   = await contractI.methods.getMessage().call();
    console.log("call to contract returned              ", calledMessage);
}


createContractTransactions();