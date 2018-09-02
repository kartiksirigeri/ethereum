var Web3            = require("web3");
var Accounts        = require("web3-eth-accounts");
var Personal        = require('web3-eth-personal');
var myGethNode      = require("../commons");
var web3           = new Web3(new Web3.providers.HttpProvider(myGethNode));
const contractAddress   = "0x6ECE8fDfEf14Ab1D87843491D207dF1E6a8A54b8";
var index = 0;
//let newKey = increaseHexByOne(web3.sha3(index, {"encoding":"hex"}))
// console.log(web3.eth.getStorageAt(contractAddress, newKey))
// console.log('ASCII: ' +
// web3.toAscii(web3.eth.getStorageAt(contractAddress, newKey)))

web3.eth.getStorageAt(contractAddress).then(data => {
    console.log(web3.utils.toAscii(data));
});
// console.log('ASCII: ' +
// web3.utils.toAscii(web3.eth.getStorageAt(contractAddress)))