module.exports = function(functions, api) {
  return functions.https.onRequest(handleRequest(api));
}

function handleRequest(api) {
  return function(request, response) {
    return api.createWhitelistUser(request.query.bridge)
      .then(() => { response.sendStatus(200) })
      .catch(error => {
        console.log(error);
        response.sendStatus(500)
      });
  }
}
