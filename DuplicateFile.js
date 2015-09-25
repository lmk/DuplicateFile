var dirFilter = [
	  'Debug'
	, 'Release'
	, 'Doxygen'
	, 'Doc'	
];

var fileFilter = [
	  '.obj'
	, '.exe'
	, '.class'
	, '.log'
	, '.vcproj'
	, '.scc'
];

var fs = require('fs');

var DupList = {};

DuplicateFile('D:\\Source\\BSP_SDK\\NBioBSPSDK\\');


//console.log("[result]=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");

for(var file in DupList)
{
	if(DupList[file].count <= 1) {
		delete DupList[file];
	}
}

console.log(DupList);


function DuplicateFile(parentDir) {
	
	if (parentDir.substr(parentDir.length - 1) !== '\\')
		parentDir += '\\';
	
	var files = fs.readdirSync(parentDir);
		
	for(var i in files)
	{
		var obj = {};
		
		if ( fs.lstatSync(parentDir + files[i]).isFile() ) {
//				console.log('[F] ' + files[i]);
			if (isExcludFile(files[i])) {
//				console.log('excluding file: ' + parentDir + files[i]);
				continue;
			}
			
			if ( DupList[files[i]] === undefined ) {
			DupList[files[i]] = {count:1, parent:[]};
			} else {
				DupList[files[i]].count++;
			}
			DupList[files[i]].parent.push(parentDir);
			
		} else if ( fs.lstatSync(parentDir + files[i]).isDirectory() ) {
			if (isExcludDir(files[i])) {
//				console.log('excluding dir: ' + parentDir + files[i]);
				continue;
			}
//				console.log('[D] ' + files[i]);
			
				DuplicateFile(parentDir + files[i]);
			
		} else {
			console.log('Unknown type: ' + files[i]);
			process.exit(1);
		}
	}
}

	
function isExcludDir(dir) {
	for(var i in dirFilter) {
		if ( dir === dirFilter[i]) return true;
	}
	return false;
}

function isExcludFile(dir) {
	for(var i in fileFilter) {
		if ( dir.search(fileFilter[i]) !== -1 ) return true;
	}
	return false;
}