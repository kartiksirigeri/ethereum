const Web3     = require('web3');
const commons  = require('./commons');
const web3     = commons.getWSWeb3();

web3.eth.getAccounts().then(function(accounts){
    console.log(accounts);
});
