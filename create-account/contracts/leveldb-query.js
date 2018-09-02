var Trie = require('merkle-patricia-tree/secure');
var levelup = require('levelup');
var leveldown = require('leveldown');
var utils = require('ethereumjs-util');
var BN = utils.BN;
var Account = require('ethereumjs-account');
var rlp = require('rlp');
var encode = require('encoding-down')
var level = require('level')

//Connecting to the leveldb database
var db = levelup(leveldown('c:\\dev\\ethereum\\geth\\data\\03\\geth\\chaindata'));
// var db = level('c:\\dev\\ethereum\\geth\\data\\03\\geth\\chaindata')

//Adding the "stateRoot" value from the block so that we can inspect the state root at that block height.
var root = '0x4e023643bcdd2cbec89dc5d427af9da6c0d1c3543c666d4f9989b7055e2e61ab';

//Creating a trie object of the merkle-patricia-tree library
var trie = new Trie(db, root);

//var address = '0x0c0df324c081faf1c9fe6bf98379e0614181d254';
// trie.get(address, function (err, raw) {
//     if (err) return cb(err)
//     //Using ethereumjs-account to create an instance of an account
//     var account = new Account(raw)
//     console.log('Account Address: ' + raw);
//     //Using ethereumjs-util to decode and present the account balance 
//     console.log('Balance: ' + (new BN(account.balance)).toString());
// })

// var gav = new Buffer('0c0df324c081faf1c9fe6bf98379e0614181d254', 'hex');

// trie.get(gav, function (err, val) {
//   console.log(val)
//   var decoded = rlp.decode(val);
//   console.log(decoded);
// });

//get a read stream object
var stream = trie.createReadStream();

stream.on('data', function (data) {

  //console.log('data: ' + data)
//   console.log('key:' + data.key.toString('hex'));
  //accouts are rlp encoded
  var decodedVal = rlp.decode(data.value);
  console.log(decodedVal)
//   for(var l=0; l< decodedVal.length; l++){
//     var entry = decodedVal[l];
//     try {
//        // console.log(entry.toString('hex'))

//         var s_trie = new Trie(db, '0x'+entry.toString('hex'));
//         var s_stream = trie.createReadStream();

//         s_stream.on('data', function (s_data) {
//             console.log(s_data)
//             console.log('s_data_key:' + s_data.key.toString('hex'));
//             var s_data_value = (s_data.value.toString('hex'));
//             console.log('s_data_value:' + s_data_value);
//         })

//     } catch(error){
//         console.log("failed to decode "+entry+" error is "+error)
//     }    
//   }
});

stream.on('end', function (val) {
  console.log('done reading!');
});
