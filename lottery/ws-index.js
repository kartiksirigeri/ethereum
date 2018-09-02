const commons  = require('./commons')
const compile  = require('./contract-compile')

const web3I	=	commons.getHTTPGethNode()
const compiledContracts		=	compile('contracts',['Lottery.sol'])['Lottery.sol:Lottery']
//console.log('compiled contract.....', compiledContracts)
const {interface, bytecode}	=	compiledContracts
const contractAddress		= '0x2a0eb9444c9127afffe680d456afa615e1b646d0'
const contractC 			= new web3I.eth.Contract(JSON.parse(interface),contractAddress)
contractC.events.Balance()
	.on('data', function(event){
		console.log("Balance....",event); // same results as the optional callback above
	})
	.on('changed', function(event){
		// remove event from local database
	})
	.on('error', console.error);
	
contractC.events.Winner()
	.on('data', function(event){
		console.log("Winner....",event); // same results as the optional callback above
	})
	.on('changed', function(event){
		// remove event from local database
	})
	.on('error', console.error);