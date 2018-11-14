let applyLightSchedule = require('../../handlers/applyLightSchedule.js')
let HandlerTest = require("../mocks/TestDependencies")
const moment = require('moment')
let dependencies = new HandlerTest()

test("apply light schedule handler", done => {
  dependencies.reset()
  dependencies.db.getTeamsResponse = {
    "synchrony": {
      "flowStart": "02:00",
      "flowEnd": "04:00",
      "name": "Synchrony",
      "space": "joshua"
    }
  }
  dependencies.db.getSpacesResponse = {
    "joshua": {
      "lights": {
        "cashew": true
      },
      "name": "Joshua",
      "team": "synchrony"
    }
  }
  moment.tz.setDefault("America/New_York")
  let time = moment("03:00", "HH:mm");
  let handler = applyLightSchedule(dependencies.functions, dependencies.db, time)
  dependencies.functions.simulatePubsub({}).then(() => {
    expect(dependencies.db.setLightStateRequest).toEqual({ light: "cashew", on: true })
    done()
  })
})
