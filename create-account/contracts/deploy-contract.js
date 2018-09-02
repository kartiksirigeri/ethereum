var Web3            = require("web3");
var Accounts        = require("web3-eth-accounts");
var Personal        = require('web3-eth-personal');
var myGethNode      = require("../commons");

var web3I           = new Web3(new Web3.providers.HttpProvider(myGethNode));
var personalI       = new Personal(new Web3.providers.HttpProvider(myGethNode));

var {interface, bytecode} = require('./compile-contract');

const deploy = async () => {
    const accounts = await web3I.eth.getAccounts();
    //console.log('Accounts fetched is ', accounts.length);
    //console.log('Attempting to deploy from 1st account ', accounts[0]);
    await personalI.unlockAccount(accounts[2],"password",50000);
    const results = await new web3I.eth.Contract(JSON.parse(interface))
                    .deploy({data: '0x'+bytecode, arguments: ['Time is '+Date.now()]})
                    .send({from: accounts[2], gas: '1000000'});

    console.log('Contract deployed and results is ', results);
    console.log('Contract deployed and address is ', results.options.address);
    console.log('Contract ABI                     ', JSON.parse(interface));

};

deploy();