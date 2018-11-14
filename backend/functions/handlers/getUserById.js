module.exports = function(functions, users) {
  return functions.https.onRequest(handleRequest(users))
}

function handleRequest(users) {
  return function(request, response) {
    const uid = request.query.uid
    if(uid) {
      return users.getUser(uid).then((userRecord) => {
        response.status(200).send(JSON.stringify(userRecord))
      })
      .catch((err) => {
        console.log(err)
        response.status(500).send()
      })
    }
  }
}
