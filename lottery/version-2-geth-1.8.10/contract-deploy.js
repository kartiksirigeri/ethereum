const commons  = require('./commons');

const deploy = async (web3I, deploymentccount, contractInterface , bytecode, deploymentArguments) => {
 
  var nonce   = await web3I.eth.getTransactionCount(deploymentccount);
  //var gasEst  = await web3I.eth.estimateGas({ data: '0x'+bytecode, arguments : deploymentArguments })
  //console.log("gas estimated for deploy     ", gasEst);
  const result = await new web3I.eth.Contract(JSON.parse(contractInterface))
    .deploy({ 'data': '0x'+bytecode, 'arguments' : deploymentArguments })
    .send({ 'gas': 3000000, 'from': deploymentccount, 'nonce': nonce })

  return result;
};


 module.exports = deploy;