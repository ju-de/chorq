var utils = require('../lib/utils');

exports.verify = function (username, host, signedData, callback) {
	if (!username || typeof username !== 'string') {
		throw TypeError('username must be a string, got ' + username);
	}
	if (!host || typeof host !== 'string') {
		throw TypeError('host must be a string, got ' + host);
	}
	if (!signedData || typeof signedData !== 'string') {
		throw TypeError('signed data must be a string, got ' + signedData);
	}

	var url = 'https://auth.kik.com/verification/v1/check?u=' + encodeURIComponent(username) + '&d=' + encodeURIComponent(host);
	if (global.ZERVER_DEBUG) {
		url += '&debug=true';
	}
	verifyRequest(url, signedData, callback);
};

exports.anonymousVerify = function (anonToken, host, signedData, callback) {
	if (!anonToken || typeof anonToken !== 'string') {
		throw TypeError('anonymous token must be a string, got ' + anonToken);
	}
	if (!host || typeof host !== 'string') {
		throw TypeError('host must be a string, got ' + host);
	}
	if (!signedData || typeof signedData !== 'string') {
		throw TypeError('signed data must be a string, got ' + signedData);
	}

	var url = 'https://auth.kik.com/verification/v1/check?a=' + encodeURIComponent(anonToken) + '&d=' + encodeURIComponent(host);
	if (global.ZERVER_DEBUG) {
		url += '&debug=true';
	}
	verifyRequest(url, signedData, callback);
};

function verifyRequest (url, body, callback, retry) {
	retry = retry || 0;

	utils.httpRequest(url, body, function (status, data) {
		if ( !status ) {
			// exponential back off on retries
			if (retry < 4) {
				retry++;
				var retrySecs = Math.pow(2, retry)
				console.log('verify request failed - waiting '+ retrySecs +' seconds before retrying');
				setTimeout(function () {
					verifyRequest(url, body, callback, retry);
				}, retrySecs * 1000);
			} else {
				console.log('verify request failed - giving up');
				callback('retry limit exceeded');
			}
		} else {
			if (status === 200) {
				callback(null, data);
			} else {
				callback('verification failed');
			}
		}
	});
}
