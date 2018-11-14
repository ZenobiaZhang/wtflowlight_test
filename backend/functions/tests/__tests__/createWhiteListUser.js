let createWhitelistUserHandler = require('../../handlers/createWhitelistUser.js')
let HandlerTest = require("../mocks/TestDependencies")
let dependencies = new HandlerTest()

test("create whitelist user handler", done => {
  dependencies.reset()
  dependencies.db.hueAuthResponse = {
    authorizationCode: "1234",
    tokens: {
      access_token: "1234",
      access_token_expires_in: "1234",
      refresh_token: "1234",
      refresh_token_expires_in: "1234",
      token_type: "Bearer"
    },
    whitelist: {
      username: "12345"
    }
  }
  dependencies.network.postResponse = '[{"success": { "username": "testUser" }}]'
  let handler = createWhitelistUserHandler(dependencies.functions, dependencies.api)
  let response = dependencies.createMockResponse()
  let bridgeId = 1
  dependencies.functions.simulateRequest({query: {bridge: bridgeId}}, response).then( () => {
    expect(dependencies.network.postRequests[0].url).toEqual(dependencies.baseUrl + "/bridge")
    expect(dependencies.network.postRequests[0].body).toEqual(JSON.stringify({ devicetype: "wtflowlight" }))
    expect(dependencies.db.setWhitelistUserRequest).toEqual({bridge: bridgeId, user: {username: "testUser"}})
    expect(response.status).toEqual(200)
    done()
  })
})
