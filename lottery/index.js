const commons  = require('./commons')
const compile  = require('./contract-compile')
const deploy   = require('./contract-deploy')
const Personal   = require('web3-eth-personal')
const Accounts   = require("web3-eth-accounts")

const web3I	=	commons.getHTTPWeb3()
const accountI        = new Accounts(web3I)
const personalI       = new Personal(web3I)

const compiledContracts		=	compile('contracts',['Lottery.sol'])['Lottery.sol:Lottery']
const {interface, bytecode}	=	compiledContracts

const start = async () => {

	var accounts			=	await web3I.eth.getAccounts()
	var deploymentAccount	= accounts[0]
	await personalI.unlockAccount(deploymentAccount, 'password', 5000);
	var result				=   await deploy(web3I, deploymentAccount, interface, bytecode, [])
	const contractAddres 	= result.options.address
	//const contractAddres 	= '0xf27E900F85f6bE97781b622ff61e197591310ac2'
	console.log('deployed contract address is......', contractAddres)
	const contractI 		= new web3I.eth.Contract(JSON.parse(interface), contractAddres)
	
	for(var i=1; i<accounts.length; i++)
	{
		var acc = accounts[i]
		await personalI.unlockAccount(acc, 'password', 50000)
		//var gasEst = await contractI.methods.enter().estimateGas({"from": acc})
		var gasPrice = 2000000
		var nonce = await web3I.eth.getTransactionCount(acc)
		var rcpt = await contractI.methods.enter().send({'from': acc, 'gasPrice': gasPrice,'nonce': nonce, 'value': 10})
		console.log("transation receipt .....", rcpt)
	}
	
	//var mgasEst = await contractI.methods.pickWinner().estimateGas({"from": deploymentAccount})
	var mgasPrice = 2000000
	var mnonce = await web3I.eth.getTransactionCount(deploymentAccount)
	var mrcpt = await contractI.methods.pickWinner().send({"from": deploymentAccount, "gasPrice": mgasPrice,"nonce": mnonce})
	console.log("transation receipt .....", mrcpt)

}

start();