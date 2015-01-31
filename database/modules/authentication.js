<script src="http://cdn.kik.com/kik/1.0.18/kik.js"></script>

var kik = require('kik-lib');
var anonToken;
var host;
var signedData;

kik.getAnonymousUser(function (token) {
	typeof token; // 'string'
});

kik.verify(anonToken, host, signedData, function(err, unsignedData){
	if(err){

	} else{

	}
});