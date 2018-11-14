var MockResponse = function() {}

MockResponse.prototype.json = function(json) {
  this.json = json
}

MockResponse.prototype.sendStatus = function(status) {
  this.status = status
}

module.exports = MockResponse
