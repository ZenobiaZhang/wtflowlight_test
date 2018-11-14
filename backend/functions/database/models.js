const moment = require('moment-timezone')

var Models = function() { }


Models.Light = function(name, color, id, state) {
  this.color = Color(color.r, color.g, color.b)
  this.name = name
  this.id = id
  this.state = state
}
const Color = function(r, g, b) {
  this.r = r
  this.g = g
  this.b = b
}

Models.Team = function(name, space, flowStart, flowEnd) {
  this.name = name
  this.space = space
  this.flowStart = flowStart
  this.flowEnd = flowEnd

  this.isFlowTime = function(now) {
    var flowStart = moment(this.flowStart, "HH:mm")
    var flowEnd = moment(this.flowEnd, "HH:mm")
    if(flowEnd.isBefore(flowStart)) {
      if(now.isBefore(flowEnd, "minute")) {
        now.add(1,'d')
      }
      flowEnd.add(1, 'd')
    }
    console.log(this.name + " flow start: " + flowStart)
    console.log(this.name + " flow end: " + flowEnd)
    console.log("now: " + now)
    return now.isBetween(flowStart, flowEnd, "minute", "[)")
  }
}

Models.Space = function(lights, name, team) {
  this.lights = lights
  this.name = name
  this.team = team
}

Models.HueRemoteAuth = function(authorizationCode, tokens, whitelist) {
  this.authorizationCode = authorizationCode
  this.tokens = tokens
  this.whitelist = whitelist
}

module.exports = Models
