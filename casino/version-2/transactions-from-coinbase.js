var Web3            = require("web3");
var fs              = require("fs");
const keyStore      = "C:/dev/ethereum/geth/data/04/keystore/UTC--2018-05-01T06-16-53.609186700Z--0c0df324c081faf1c9fe6bf98379e0614181d254";
const d_keyStore    = fs.readFileSync(keyStore);
var Tx = require('ethereumjs-tx');
const commons  = require('./commons');
const Personal        = require('web3-eth-personal');

var getCoinbase     = async (web3I) => {
    var coinbase    = await web3I.eth.getCoinbase();
    return coinbase;
}

// var getWeb3SignedTx = async (web3I, coinbase, toAddr, value, privateKey) => {
var getWeb3SignedTx = async (web3I, coinbase, toAddr, value) => {
    var chainId = await web3I.eth.net.getId();
    var gPrice  = await web3I.eth.getGasPrice();
    gPrice  =   18000000000;//gPrice *2;
    // console.log("cb account     ",coinbase);
    var txCount = await web3I.eth.getTransactionCount(coinbase);
    var pentxCount = 0;//web3I.eth.pendingTransactions.length;
    var nonce =txCount + pentxCount ;
    var tx = {};
    tx.from     = coinbase;
    tx.to       = toAddr;
    tx.value    = web3I.utils.toHex(value);
    // tx.chainId  = web3I.utils.toHex(chainId); //transaction gets into pending state if chainid is included
    tx.gasPrice = web3I.utils.toHex(gPrice);
    tx.gas      = web3I.utils.toHex(2000000);
    tx.nonce    = web3I.utils.toHex(txCount);
    // console.log("web3 raw transaction   ", tx);
    // var signedTrans = await web3I.eth.accounts.signTransaction(tx, privateKey);
    var signedTrans = await web3I.eth.signTransaction(tx);
    // console.log("web3 raw signedTrans   ", signedTrans);
    return signedTrans.raw;
}

var getEthJsSignedTx = async (web3I, coinbase, toAddr, value, privateKey) => {
    var chainId = await web3I.eth.net.getId();
    var rawTx = {
        'from': coinbase,
        'to': toAddr,
        'value': value,
        'chainId': chainId,
        'gasLimit': 400000,
        'gasPrice': 32000000000
        // 'gasLimit': 2000000
    };
    // var gasEst = await web3I.eth.estimateGas(rawTx);
    // console.log("estimate is ", gasEst);
    var tx = new Tx(rawTx);
    tx.sign(new  Buffer(privateKey.substr(2),'hex'));
    var serializedTx = tx.serialize();
    var signedTrans = '0x' + serializedTx.toString('hex');
    console.log("ethjs signedTrans   ", signedTrans);
    return signedTrans;
}

var createCoinTransaction = async (web3I, toAddr, value) => {
    var coinbase = await getCoinbase(web3I);
    // var account  = web3I.eth.accounts.decrypt(JSON.parse(d_keyStore), "password")
    // var privateKey =account.privateKey;
    // var privateKey  = web3I.eth.getPrivateKey(coinbase);
    // console.log('cb pk          ', privateKey);
    // var receipt;
    // var web3_trans = await getWeb3SignedTx(web3I, coinbase, toAddr, value, privateKey);
    var web3_trans  = await getWeb3SignedTx(web3I, coinbase, toAddr, value);
    var receipt     = await web3I.eth.sendSignedTransaction(web3_trans);
    // console.log("web3_trans receipt     ",receipt);
    // .on('receipt', (receipt)=>{console.log("web3_trans         ",receipt);})
    // .on('error', (error)=>{console.log("web3 trans error    ",error)});

    // var ethjs_trans = await getEthJsSignedTx(web3I, coinbase, toAddr, value, privateKey);
    // web3I.eth.sendSignedTransaction(ethjs_trans)
    // .on('receipt', (receipt)=>{console.log("ethjs trans         ",receipt);})
    // .on('error', (error)=>{console.log("ethjs trans error    ",error)});

    var balance = await web3I.eth.getBalance(toAddr);

    console.log("updated balance is         ",toAddr,"  ", balance);

    return receipt;
};

module.exports = createCoinTransaction;