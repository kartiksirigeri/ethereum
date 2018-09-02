const Web3 = require('web3');
const commons  = require('./commons');

const deploy = async (provider, casinoAccount, interface , bytecode) => {
  // let f_bytecode = web3.utils.toHex(bytecode);
  // let ge = await web3.eth.estimateGas({ data: bytecode, arguments : ['CasinoWorld']});
  // console.log(ge);
  const web3  = new Web3(provider);
  var nonce   = await web3.eth.getTransactionCount(casinoAccount);
  var gasEst  = await web3.eth.estimateGas({ data: '0x'+bytecode, arguments : ['CasinoWorld'] });
  console.log("gas estimated for deploy     ", gasEst);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x'+bytecode, arguments : ['CasinoWorld'] })
    .send({ 'gas': 3000000, 'from': casinoAccount, 'nonce': nonce });

  // // let ctrct         = new web3.eth.Contract(JSON.parse(interface));
  // // let contractData  = ctrct.new.getData({ data: f_bytecode, arguments : ['CasinoWorld'] });
  // console.log('Contract deployed to', result.options.address);

  return result;
};


 module.exports = deploy;