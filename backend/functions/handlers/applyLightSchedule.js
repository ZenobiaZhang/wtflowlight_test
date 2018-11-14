const Database = require('../database/database')

module.exports = function(functions, db, moment) {
  const handler = new ApplyScheduleHandler(db, moment)
  return functions
      .pubsub
      .topic('apply-lights-schedule')
      .onPublish((event) => {
        let promise = handler.handleEvent(event)
        return promise
       });
}

var ApplyScheduleHandler = function(db, moment) {
  this.db = db
  this.moment = moment
  this.teams = {}
  this.spaces = {}

  this.handleEvent = function(event) {
    return Promise
      .all([this.fetchTeams(), this.fetchSpaces()])
      .then(() => { return this.applyTeamSchedules() })
      .then(() => { return {"sucess": true } })
      .catch((error) => {
        console.log("An error ocurred while applying light schedule")
        console.log(error)
      });
    return promise
  }

  this.applyTeamSchedules = function() {
    console.log(this.teams)
    Object.keys(this.teams).forEach( (key) => {
      var team = this.createTeam({"name": key, "team": this.teams[key]});
      if(team) {
        return this.setLightsForTeam(team);
      } else {
        return Promise.reject(Error());
      }
    });
  }

  this.setLightsForTeam = function(team) {
    const lights = this.getLightsForTeam(team)
    const isFlowTime = team.isFlowTime(this.moment)
    console.log(team.name + ": " + isFlowTime)
    var promises = []
    Object.keys(lights).forEach( (light) => {
      promises.push(this.db.setLightState(light, isFlowTime))
    });
    return Promise.all(promises)
  }

  this.getLightsForTeam = function(team) {
    return this.spaces[team.space].lights
  }

  this.fetchSpaces = function() {
    return this.db.getSpaces()
      .then((spaces) => {
        this.spaces = spaces ;
        return this.spaces;
      });
  }

  this.fetchTeams = function() {
    return this.db.getTeams()
      .then((teams) => {
        this.teams = teams
        return this.teams
      });
  }

  this.createTeam = function(json) {
    if(json.name && json.team.space) {
      var dbteam = new Database.Team(json.name, json.team.space, json.team.flowStart, json.team.flowEnd);
      return dbteam;
    } else {
      return null;
    }
  }
}
