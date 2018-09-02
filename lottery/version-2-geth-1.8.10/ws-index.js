const commons  = require('./commons')
const compile  = require('./contract-compile')

const web3I	=	commons.getWSWeb3()
const compiledContracts		=	compile('contracts',['Lottery.sol'])['Lottery.sol:Lottery']
//console.log('compiled contract.....', compiledContracts)
const {interface, bytecode}	=	compiledContracts
const contractAddress		= '0xd49482b8ed9a1e2baa96e45715946afdda089053'
const contractC 			= new web3I.eth.Contract(JSON.parse(interface),contractAddress)
//contractC.events.allEvents({'fromBlock ':4500}, function(error, events){
contractC.events.Balance({}, function(error, events){
	if(error != undefined)
	{
		console.log('Balance....',error);
	}
	
	if(events != undefined)
	{
		console.log('Balance....',events);
	}	
});
contractC.events.Winner({}, function(error, events){
	if(error != undefined)
	{
		console.log('Winner....',error);
	}
	
	if(events != undefined)
	{
		console.log('Winner....',events);
	}	
});
