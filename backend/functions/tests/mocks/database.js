const Models = require('../../database/models.js')

var MockSnapshot = function(val) {
  this.returnValue = val
}

MockSnapshot.prototype.val = function() {
  return this.returnValue
}

var Database = function() {
  this.hueAuthResponse = {}
  this.setWhitelistUserRequest = {bridge: null, user: null}
}

Database.Team = Models.Team
Database.Space = Models.Space
Database.Light = Models.Light
Database.HueAuth = Models.HueAuth



Database.prototype.getSpaces = function() {
  return Promise.resolve(this.getSpacesResponse)
};

Database.prototype.getTeams = function() {
  return Promise.resolve(this.getTeamsResponse)
};

Database.prototype.getLights = function() {
  return Promise.resolve(this.getLightsResponse)
};

Database.prototype.onSpace = function(id, callback) {
  this.onSpaceRequest = {id: id}
  callback(this.onSpaceResponse)
};
Database.prototype.onTeam = function(id, callback) {
  this.onTeamRequest = { id: id }
  callback(this.onTeamResponse)
};
Database.prototype.setTeam = function(id, team) {
  this.setTeamRequest = { id: id, team: team}
  return new Promise((fulfill, reject) => {fulfill()});
};
Database.prototype.setLightState = function(light, on) {
  this.setLightStateRequest = { light: light, on: on }
  return new Promise((fulfill, reject) => {fulfill()});
};
Database.prototype.getHueAuth = function(bridge) {
  return Promise.resolve(new MockSnapshot(this.hueAuthResponse))
};
Database.prototype.setWhitelistUser = function(bridge, user) {
  this.setWhitelistUserRequest = {bridge: bridge, user: user}
  return new Promise((fulfill, reject) => {fulfill()});
};
Database.prototype.setRemoteAuthorizationCode = function(bridge, code) { return this.db.ref("bridges/" + bridge + "/auth/authorizationCode").set(code) };
Database.prototype.setTokens = function(bridge, tokens) {
  return new Promise((fulfill, reject) => {fulfill()})
};


module.exports = Database;
