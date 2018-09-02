const Web3 = require('web3');
//const web3 = new Web3(new Web3.providers.WebsocketProvider(myGethNode));

const getWSGethNode = function () {
    return "ws://localhost:8547";
}

const getHTTPGethNode = function () {
    return "http://localhost:8546";
}

const getWSWeb3 = function () {
    return new Web3(new Web3.providers.WebsocketProvider(getWSGethNode()));
}

const getHTTPWeb3 = function () {
    return new Web3(new Web3.providers.HttpProvider(getHTTPGethNode()));
}

module.exports.getWSWeb3 = getWSWeb3; 
module.exports.getWSGethNode = getWSGethNode;
module.exports.getHTTPWeb3 = getHTTPWeb3;
module.exports.getHTTPGethNode = getHTTPGethNode;