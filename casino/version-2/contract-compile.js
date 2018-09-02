const path      = require('path');
const fs        = require('fs');
const solc      = require('solc');

const casinoPath    = path.resolve(__dirname, 'contracts','Casino.sol');
const gamePath      = path.resolve(__dirname, 'contracts','Game.sol');
const utilityPath   = path.resolve(__dirname, 'contracts','CasinoUtility.sol');

var input = {
    'Casino.sol': fs.readFileSync(casinoPath, 'utf8'),
    'Game.sol': fs.readFileSync(gamePath, 'utf8'),
    'CasinoUtility.sol': fs.readFileSync(utilityPath, 'utf8'),
};
module.exports  = solc.compile({sources: input}, 1).contracts;//['Casino.sol:Casino'];

// var {interface, bytecode} = solc.compile(source, 1).contracts[':Casino'];
// console.log("interface is               ", interface);
// console.log("bytecode is                ", bytecode);