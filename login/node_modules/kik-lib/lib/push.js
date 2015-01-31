var utils = require('../lib/utils');

exports.send = function (token, ticker, payload, callback) {
	if (!token || typeof token !== 'string') {
		throw TypeError('push token must be a string, got ' + token);
	}
	if (!ticker || typeof ticker !== 'string') {
		throw TypeError('ticker text must be a string, got ' + ticker);
	}
	if (typeof callback !== 'function') {
		throw TypeError('callback must be a function, got ' + callback);
	}

	var url  = 'https://api.kik.com/push/v1/send',
		body = {
			token  : token   ,
			ticker : ticker  ,
			data   : payload || {} ,
		};
	pushRequest(url, JSON.stringify(body), callback);
};

function pushRequest (url, body, callback, retry) {
	retry = retry || 0;

	utils.httpRequest(url, body, function (status, data) {
		if (status == 200) {
			callback();
		} else if (status == 403) {
			callback(data || 'push token permanently rejected', true);
		} else if (status && (status < 500) && (status !== 429)) {
			callback(data || 'request rejected');
		} else {
			// exponential back off on retries
			if (retry < 4) {
				retry++;
				var retrySecs = Math.pow(2, retry);
				console.log('push request failed - waiting '+ retrySecs +' seconds before retrying');
				setTimeout(function() {
					pushRequest(url, body, callback, retry);
				}, retrySecs * 1000);
			} else {
				console.log('push request failed - giving up');
				if (status == 429) {
					callback('push failed (rate limited)');
				} else if (status && data) {
					callback(data);
				} else {
					callback('unable to connect to push service');
				}
			}
		}
	});
}
