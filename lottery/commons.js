const Web3 = require('web3');
//const web3 = new Web3(new Web3.providers.WebsocketProvider(myGethNode));

const getWSGethNode = function () {
    return "ws://localhost:8548";
}

const getHTTPGethNode = function () {
    return "http://localhost:8549";
}

const getWSWeb3 = function () {
    return new Web3(new Web3.providers.WebsocketProvider(getWSGethNode(),{headers: {
    Origin: "http://localhost"
  }}));
}

const getHTTPWeb3 = function () {
    return new Web3(new Web3.providers.HttpProvider(getHTTPGethNode()));
}

module.exports.getWSWeb3 = getWSWeb3; 
module.exports.getWSGethNode = getWSGethNode;
module.exports.getHTTPWeb3 = getHTTPWeb3;
module.exports.getHTTPGethNode = getHTTPGethNode;