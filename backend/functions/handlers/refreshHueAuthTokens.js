const functions = require('firebase-functions');

module.exports = function(authManager) {
  return functions.https.onRequest(handleRequest(authManager));
}

function handleRequest(authManager) {
  return function(request, response) {
    return authManager.refreshTokens(request.query.bridge)
      .then((auth) => {
        console.log("success refreshing tokens")
        response.json(auth);
      })
      .catch(error => {
        console.log(error)
        response.sendStatus(500)
      })
  }
}
