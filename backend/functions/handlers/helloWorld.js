module.exports = function(functions, db) {
  return functions.https.onRequest(handleRequest(db))
}

function handleRequest(db) {
  return function(request, response) {
    console.log(db);
    response.json({valid: true});
  }
}
