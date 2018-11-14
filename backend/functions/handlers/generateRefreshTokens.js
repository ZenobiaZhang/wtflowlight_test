const functions = require('firebase-functions');

module.exports = function(authManager) {
  return functions.https.onRequest(handleRequest(authManager));
}

function handleRequest(authManager) {
  return function(request, response) {
     return authManager.generateRefreshTokens(request.query.bridge)
      .then((json) => { response.json(json).end() })
      .catch(error => {
        console.log("error")
        console.log(error)
        response.status(500).end()
      });
  }
}
