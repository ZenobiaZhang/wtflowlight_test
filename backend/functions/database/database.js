const Models = require('./models.js')


var Database = function(db) {
  this.db = db
}

Database.Team = Models.Team
Database.Space = Models.Space
Database.Light = Models.Light
Database.HueAuth = Models.HueAuth

Database.initialize = function(admin) {
  const fb = admin.database()
  return new Database(fb)
}

Database.prototype.getSpaces = function() { return this.db.ref('spaces').once('value').then((promise) => {return promise.val()}) };
Database.prototype.getTeams = function() { return this.db.ref('teams').once('value').then((promise) => {return promise.val()}) };
Database.prototype.getLights = function() { return this.db.ref('lights').once('value') };
Database.prototype.onSpace = function(id, callback) { return this.db.ref('spaces/' + id).on('value', callback) };
Database.prototype.onTeam = function(id, callback) { return this.db.ref('teams/' + id).on('value', callback) };
Database.prototype.setTeam = function(id, team) { return this.db.ref('teams/' + id).set(team) };
Database.prototype.setLightState = function(light, on) { return this.db.ref("/lights/" + light + "/state").set(on)};
Database.prototype.getHueAuth = function(bridge) { return this.db.ref("bridges/" + bridge + "/auth").once("value") };
Database.prototype.setWhitelistUser = function(bridge, username) { return this.db.ref("bridges/" + bridge + "/auth/whitelist/username").set(username) };
Database.prototype.setRemoteAuthorizationCode = function(bridge, code) { return this.db.ref("bridges/" + bridge + "/auth/authorizationCode").set(code) };
Database.prototype.setTokens = function(bridge, tokens) { return this.db.ref("bridges/" + bridge + "/auth/tokens").set(tokens) };

Database.prototype.setUser = function(user) {
  return this.db.ref("users").child(user.uid).set({email: user.email, roles: user.roles})
}

module.exports = Database;
