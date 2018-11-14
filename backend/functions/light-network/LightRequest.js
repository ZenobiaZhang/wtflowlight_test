var LightRequestMethod = function() {
  this.POST = "POST"
  this.GET = "GET"
  this.PUT = "PUT"
}
var LightRequest = function(url, headers, body, queryParams, formParams, method) {
  this.url = url
  this.headers = headers
  this.body = body
  this.queryParams = queryParams
  this.form = formParams
  this.method = method
}
LightRequest.Method = new LightRequestMethod()

module.exports = LightRequest
