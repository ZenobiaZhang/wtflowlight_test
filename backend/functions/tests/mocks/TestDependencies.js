require('dotenv').config()
let MockFunctions = require("../mocks/functions.js")
let MockDatabase = require("../mocks/database.js")
let MockResponse = require("../mocks/response.js")
let MockNetwork = require("../mocks/network.js")
let Network = require("../../light-network/http-network.js")
let Database = require("../../database/database.js")
let NetworkAuthManager = require("../../light-network/NetworkAuthManager.js")
let LightNetwork = require("../../light-network/LightNetwork.js")

var HandlerTest = function() {
  this.functions = new MockFunctions()
  this.db = new MockDatabase()
  this.network = new MockNetwork()
  this.baseUrl = 'https://api.meethue.com'
  this.auth = new NetworkAuthManager(this.db, this.network, this.baseUrl)
  this.api = new LightNetwork(this.auth, this.baseUrl, this.network)

  this.reset = function() {
    this.db = new MockDatabase()
    this.functions = new MockFunctions()
    this.network = new MockNetwork()
    this.auth = new NetworkAuthManager(this.db, this.network, this.baseUrl)
    this.api = new LightNetwork(this.auth, this.baseUrl, this.network)
  }

  this.setNetwork = function(network) {
    this.network = network
    this.auth = new NetworkAuthManager(this.db, this.network, this.baseUrl)
    this.api = new LightNetwork(this.auth, this.baseUrl, this.network)
  }

  this.createMockResponse = function() {
    return new MockResponse()
  }
}

module.exports = HandlerTest
