const Models = require('./models.js')


var Users = function(users) {
  this.users = users
}

Users.initialize = function(admin) {
  const auth = admin.auth()
  return new Users(auth)
}

Users.prototype.getUserByEmail = function(email) {
  return this.users.getUserByEmail(email)
}

Users.prototype.setCustomUserClaims = function(uid, claims) {
  return this.users.setCustomUserClaims(uid, claims)
}

Users.prototype.getUser = function(uid) {
  return this.users.getUser(uid)
}
module.exports = Users
