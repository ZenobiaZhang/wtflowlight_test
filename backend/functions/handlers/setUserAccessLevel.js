module.exports = function(functions, users, db) {
  return functions.https.onRequest(handleRequest(users, db))
}

function handleRequest(users, db) {
  return function(request, response) {
    const email = request.query.email
    const access = request.query.access
    const isUser = access == "user"
    const isAdmin = access == "admin"
    const isSuperAdmin = access == "superadmin"
    if(email && (isUser || isAdmin || isSuperAdmin) ) {
      var claims = {}
      if(isUser) {
        claims = { "user": true }
      } else if(isAdmin) {
        claims = { "admin": true }
      } else {
        claims = { "superadmin": true }
      }
      return users.getUserByEmail(email)
        .then((userRecord) => {
          return Promise.all([users.setCustomUserClaims(userRecord.uid, claims),
                              Promise.resolve(userRecord)])
        })
        .then((promises) => {
          const userRecord = promises[1]
          return db.setUser({ uid: userRecord.uid,
                              displayName: userRecord.displayName,
                              email: userRecord.email,
                              roles: { user: isUser || isAdmin || isSuperAdmin,
                                       admin: isAdmin || isSuperAdmin,
                                       superadmin: isSuperAdmin}})
        })
        .then(() => {
          response.send(JSON.stringify({status: "success"}))
        })
        .catch((err) => {
          console.log(err)
          response.status(500).send()
        })
    }
  }

}
