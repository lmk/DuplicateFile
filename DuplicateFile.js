var dirFilter = [
	  'Debug'
	, 'Doxygen'
];

var fileFilter = [
	  '.ojb'
	, '.exe'
];

var fs = require('fs');



DuplicateFile('D:\\Source\\BSP_SDK\\NBioBSPSDK\\');



function DuplicateFile(parentDir) {
	fs.readdir(parentDir, function(err, files){
		if ( err ) {
			console.log(err);
			return false;
		}
		
		for(var i in files)
		{
			if ( fs.lstatSync(parentDir + files[i]).isFile() ) {
				console.log('[F] ' + files[i]);
			} else if ( fs.lstatSync(parentDir + files[i]).isDirectory() ) {
				if (isExcludDir(files[i])) {
					console.log('[X] ' + files[i]);
					continue;
				}
				console.log('[D] ' + files[i]);
			} else {
				console.log('[U] ' + files[i]);
			}
		}

	});
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