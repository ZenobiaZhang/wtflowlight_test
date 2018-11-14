let MockFunctions = require("../mocks/functions.js")
let MockDatabase = require("../mocks/database.js")
let MockResponse = require("../mocks/response.js")
let helloWorldHandler = require('../../handlers/helloWorld.js')

let functions = new MockFunctions()
let db = new MockDatabase()

test("hello world handler", () => {
  let handler = helloWorldHandler(functions, db)
  let response = new MockResponse()
  functions.simulateRequest({}, response)
  expect(response.json).toEqual({valid: true})
})
