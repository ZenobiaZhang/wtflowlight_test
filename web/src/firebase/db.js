import { db } from './firebase';

var api = {}

api.getSpaces = () => db.ref('spaces').once('value')
api.getTeams = () => db.ref('teams').once('value')
api.getLights = () => db.ref('lights').once('value')
api.onSpace = (id, callback) => db.ref('spaces/' + id).on('value', callback)
api.onTeam = (id, callback) => db.ref('teams/' + id).on('value', callback)
api.setTeam = (id, team) => db.ref('teams/' + id).set(team)
api.spaceRef = (id) => db.ref('spaces/' + id)
api.teamRef = (id) => db.ref('teams/' + id)
api.lightsRef = () => db.ref('lights')
api.setLightState = (id, state) => db.ref('lights/' + id + '/state').set(state)
api.getUser = (uid) => db.ref('users/' + uid).once('value').then( user => {return user.val() })
api.usersRef = () => db.ref('users')
export {
  api
}
