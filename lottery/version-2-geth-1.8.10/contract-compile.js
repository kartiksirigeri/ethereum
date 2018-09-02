const path      = require('path');
const fs        = require('fs');
const solc      = require('solc');


function compile(srcdir, sources){
	
	var sourceinput = {};
	
	for(var i=0; i<sources.length; i++)
	{
		var sourcepath = path.resolve(__dirname, srcdir, sources[i])
		sourceinput[sources[i]] = fs.readFileSync(sourcepath, 'utf8')
	}
	
	return solc.compile({sources: sourceinput}, 1).contracts
}

module.exports = compile;