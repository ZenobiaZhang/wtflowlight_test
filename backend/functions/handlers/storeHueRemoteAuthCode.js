const functions = require('firebase-functions');

module.exports = function(db) {
  return functions.https.onRequest(handleRequest(db));
}

function handleRequest(db) {
  return function(request, response) {
    const authCode = request.query.code;
    const bridge = request.query.state
    if(authCode) {
        db.setRemoteAuthorizationCode(bridge, authCode).then(() => { return authCode; })
          .then((code) => { return response.json({authCode: code}); })
          .catch( error => { return response.status(500); });
      } else {
        return response.status(400);
      }
  }
}
