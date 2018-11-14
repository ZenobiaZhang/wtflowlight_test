let setLightsHandler = require('../../handlers/setLights.js')
let HandlerTest = require("../mocks/TestDependencies")
let Network = require("../../light-network/http-network.js")
let dependencies = new HandlerTest()

test("set state handler", done => {
  dependencies.reset()

  dependencies.db.hueAuthResponse = {
    "authorizationCode" : "1234",
    "tokens" : {
      "access_token" : "1234",
      "access_token_expires_in" : "1234",
      "refresh_token" : "1234",
      "refresh_token_expires_in" : "1234",
      "token_type" : "BearerToken"
    },
    "whitelist" : {
      "username" : "1234"
    }
  }
  dependencies.network.putResponse = JSON.stringify([
    { success: true }
  ]);

  let mockEvent = {
    after: {
      val: function() { return {bridge: "forest", id: 1, name: "Cashew", state: false, hue: 46920}}
    }
  }
  let handler = setLightsHandler(dependencies.functions, dependencies.api)
  dependencies.functions.simulateEvent(mockEvent).then( () => {
    expect(dependencies.network.putRequests[0].body).toEqual({"on": false, hue: 46920})
    done()
  })
})
