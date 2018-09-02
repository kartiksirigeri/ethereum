var Web3            = require("web3");
var myGethNode      = require("./commons");

var web3I           = new Web3(myGethNode);

web3I.eth.getCoinbase().then(
    (coinbase, err)=> {
        if(err) {
            console.log("error getting coinbase balance", err);
        } 
        else{
            console.log("coinbase address   ",coinbase);
            web3I.eth.getBalance(coinbase).then(
                (balance, error) => {

                    if(err){
                        console.log("error getting coinbase balance", err);
                    }
                    else{
                        console.log("coinbase balance   ",balance);
                    }

                }
            );
        }
    }
);
