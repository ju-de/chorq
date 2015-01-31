Kik API - NodeJS Library
==========================

For any webapp, some features will require having a backend. This NodeJS package makes sending push notifications and verifying user data easy for those developing against the Kik browser API.

Links
-----
* [Push Notifications Docs](http://dev.kik.com/docs/#push)
* [Authentication Docs](http://dev.kik.com/docs/#identity-auth)

Usage
-----

### Getting started

```sh
npm install kik-lib
```

Alternatively, you can include the library in your `package.json`:
```json
{
  "dependencies" : {
    "kik-cards" : "0.1.2"
  }
}
```

Now you can use the library in your code:

```js
var kik = require('kik-lib');
```

### Sending push notifications

`kik.push.send()` accepts 3 arguments and a callback function.
This method handles all responses outlined in the [Push Notifications Docs](http://dev.kik.com/docs/#push) and will automatically retry requests where applicable.

```js
// this is the users unique push token. http://dev.kik.com/docs/#push-token
var pushToken = 'pushTokenFromClient';

// this shows up in the status bar
var ticker = 'My awesome ticker text';

// data to be passed to your app (can be empty)
var payload = {
  'key' : 'value'
}

kik.push.send(pushToken, ticker, payload, function (err, shouldDeleteToken) {
  if (shouldDeleteToken) {
    // the push token has been rejected. You should delete any references to it and not attempt to use it again.
  }

  if (err) {
      // something went wrong :-( 'err' will tell you why!
  } else {
      // the push was sent!
  }
});
```

### Authentication

`kik.verify()` accepts 3 arguments and a callback function.
This method handles all responses outlined in the [Authentication Docs](http://dev.kik.com/docs/#identity-auth) and will automatically retry requests where applicable.

```js
// the user we want to verify
var username = 'kikteam';

// the hostname of your app
var host = 'myapp.com';

// the signed data from the client. http://dev.kik.com/docs/#identity-auth
var signedData = 'mySignedData';

kik.verify(username, host, signedData, function (err, unsignedData) {
  if (err) {
    // not verified
  } else {
    // do something with unsignedData
  }
});
```

### Anonymous authentication

`kik.anonymousVerify()` accepts 3 arguments and a callback function.
This method handles all responses outlined in the [Anonymous Authentication Docs](http://dev.kik.com/docs/#identity-anon) and will automatically retry requests where applicable.

```js
// the anonymous user we want to verify
var anonToken = 'getThisFromTheClient';

// the hostname of your app
var host = 'myapp.com';

// the signed data
var signedData = 'mySignedData';

kik.anonymousVerify(anonToken, host, signedData, function (err, unsignedData) {
  if (err) {
    // not verified
  } else {
    // do something with unsignedData
  }
});
```
