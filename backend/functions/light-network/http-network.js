const requester = require('request-promise-native');

var Network = function() {};

Network.prototype.buildOptions = function(request) {
  if(!request) { return {} }
  var options = {}
  if (request.headers) {
    options["headers"] = request.headers
  }
  if (request.body) {
    options["body"] = JSON.stringify(request.body)
  }
  if (request.form) {
    options["form"] = request.form
  }
  return options
}

Network.prototype.put = function(request) {
  const options = this.buildOptions(request)
  return requester.put(request.url, options)
};

Network.prototype.post = function(request) {
  const options = this.buildOptions(request)
  return requester.post(request.url, options)
};

module.exports = Network
