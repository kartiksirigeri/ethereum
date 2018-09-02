const fs                = require("fs");
const commons  = require('./commons');
const HDWalletProvider  = require('truffle-hdwallet-provider');
const Web3              = require('web3');
const deploy            = require('./contract-deploy');
const contracts         = require('./contract-compile');
const coinedTrans       = require('./transactions-from-coinbase');
var provider;
var web3;

const {interface, bytecode}       = contracts['Casino.sol:Casino'];
const accounts = async (numberOfAccounts) => {
    provider = new HDWalletProvider(
      'target fatigue caught apart share aerobic unable table input wolf range stamp',
      commons.getHTTPGethNode(),
      0,
      numberOfAccounts
    );
    web3 = new Web3(provider);
    let list_accounts = await web3.eth.getAccounts()
    return list_accounts;
  };

const start = async () => {
  var g_accounts = await accounts(10)
  console.log("all account:       ", g_accounts);

  var casino_acc = g_accounts[0]
  var result     = await deploy(provider, casino_acc, interface, bytecode)
  console.log("deployment result    ",   result.options.address);

  let contractI = new web3.eth.Contract(JSON.parse(interface), result.options.address);
  var games = [ ['Game1',10, 3] ];//, ['Game2',10, 3], ['Game3',10, 3] ] ;
  
  for(let i =0; i < games.length; i++)
  {
    var nonce = await web3.eth.getTransactionCount(casino_acc);
    var game = games[i];

     var gasEst   = await contractI.methods.addGame(game[0],game[1], game[2]).estimateGas({"from": casino_acc});
     var greceipt = await contractI.methods.addGame(game[0],game[1], game[2])
        .send({"from": casino_acc, "gasPrice": 2000000,"gas":gasEst, "nonce": nonce});
     console.log("game receipt       ", greceipt);
    // var funcCall = contractI.methods.addGame(game[0],game[1], game[2]).encodeABI();
    // var gasEst   = await web3.eth.estimateGas({"data": funcCall,"from": casino_acc});
    // console.log("estimate for add game ", gasEst);
    // var greceipt = await web3.eth.sendTransaction(
    //               {"from": casino_acc, "gasPrice": 2000000,"gas":763831, "nonce": nonce, "data": funcCall})
    // console.log("game receipt       ", greceipt);
  }

  for(let i=1; i<4; i++)
  {
    var nonce    = await web3.eth.getTransactionCount(g_accounts[i])
    var gasEst   = await contractI.methods.enterCasino().estimateGas({"from": g_accounts[i]});
    var ereceipt = await contractI.methods.enterCasino()
    .send({"from": g_accounts[i], "gasPrice": 18000000000,"gas":gasEst, "nonce": nonce});
    console.log("enter casino receipt       ", ereceipt);
    // var funcCall = contractI.methods.enterCasino().encodeABI()
    // var ereceipt = await web3.eth.sendTransaction(
    //   {"from":  g_accounts[i], "gasPrice": 18000000000,"gas":2000000, "nonce": nonce, "data": funcCall})

    for(let i =0; i < games.length; i++)
    {
      var game = games[i];
      nonce    = await web3.eth.getTransactionCount(g_accounts[i])
      gasEst   = await contractI.methods.playGame(game[0]).estimateGas({"from": g_accounts[i],"value": 20});
      // var preceipt  = await contractI.methods.playGame(game[0])
      //     .send({"from": g_accounts[i], "gasPrice": 18000000000,"gas":gasEst, "nonce": nonce, "value": 20});
      console.log("played receipt       ", gasEst);
      // funcCall = contractI.methods.playGame(game[0]).encodeABI()
      // var preceipt = await web3.eth.sendTransaction(
      // {"from":  g_accounts[i], "gasPrice": 18000000000,"gas":2000000, "nonce": nonce, "data": funcCall})
      // console.log("Receipt for ", g_accounts[i], "::::" ,game[0], "::::",preceipt)
    }
    
  }

}

start();