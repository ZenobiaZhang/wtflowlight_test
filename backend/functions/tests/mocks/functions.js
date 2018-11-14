var MockHttps = function() {}
MockHttps.prototype.onRequest = function(callback) {
  this.callback = callback
}

var MockPubsub = function() {
  this.topic = function(topic) {
    this.topic = new MockTopic(topic)
    return this.topic
  }
}

var MockTopic = function(topic) {
  this.onPublish = function(callback) {
    this.onPublish = callback
  }
}

var MockRef = function() {
  this.onUpdate = function(onEvent) {
    this.onEvent = onEvent
  }
}

var MockFunctionsDatabase = function() { }
MockFunctionsDatabase.prototype.ref = function(ref) {
  this.ref = new MockRef()
  return this.ref
}

var MockFunctions = function() {
  this.https = new MockHttps()
  this.database = new MockFunctionsDatabase()
  this.pubsub = new MockPubsub()
}

MockFunctions.prototype.simulatePubsub = function(event) {
  return this.pubsub.topic.onPublish(event)
}

MockFunctions.prototype.simulateRequest = function(request, response) {
  return this.https.callback(request, response)
}

MockFunctions.prototype.simulateEvent = function(event) {
  return this.database.ref.onEvent(event)
}

module.exports = MockFunctions
