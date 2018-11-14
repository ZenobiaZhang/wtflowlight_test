var MockNetwork = function() {
  this.putRequests = []
  this.postRequests = []
  this.postResponse = ""
  this.putResponse = ""
}

MockNetwork.prototype.put = function(request) {
  this.putRequests.push(request)
  return new Promise((fulfill, reject) => {fulfill(this.putResponse)})
}

MockNetwork.prototype.post = function(request) {
  this.postRequests.push(request)
  return new Promise((fulfill, reject) => {fulfill(this.postResponse)})
}

module.exports = MockNetwork
