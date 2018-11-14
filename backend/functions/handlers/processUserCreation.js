module.exports = function(functions, users, db) {
  return functions
    .auth
    .user()
    .onCreate((user) => { return handleEvent(user, db) });
}

function handleEvent(user, db) {
  return db.setUser({uid: user.uid,
                     email: user.email,
                     roles: {user: true,
                             admin: false,
                             superadmin: false}})
}
