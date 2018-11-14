const LightRequest = require('./LightRequest')

var LightNetwork = function(authManager, baseUrl, network) {
  this.authManager = authManager;
  this.baseUrl = baseUrl;
  this.network = network;

  this.setState = function(bridge, light, state) {
    return buildHeaders(bridge).then((headers) => {
      const url = this.baseUrl + '/bridge/' + headers.auth.whitelist.username + '/lights/' + light + '/state';
      const lightRequest = new LightRequest(url, headers.headers, state, null, null, LightRequest.Method.PUT);
      return request(lightRequest, bridge)
    })
    .then( handleSetStateResponse )
  };

  var buildHeaders = function(bridge) {
    return Promise.all([authManager.buildHeaders(bridge),
                        authManager.loadAuth(bridge)])
    .then(promises => {
      let headers = promises[0]
      let auth = promises[1]
      return {"headers": headers, "auth": auth }
    })
  }

  this.createWhitelistUser = function(bridge) {
    return this.authManager.createWhitelistUser(bridge);
  }

  var request = function(request, bridge) {
    return new Promise(function(resolve, reject) {
      send(request)
      .then((body) => { resolve(body)})
      .catch((error) => { handleRequestError(error, bridge, request)
                          .then((body) => { resolve(body) })
                          .catch((error) => { reject(error) })
                        });
    })
  }

  var send = function(request) {
    switch(request.method) {
      case LightRequest.Method.GET:
        return network.get(request);
      case LightRequest.Method.POST:
        return network.post(request)
      case LightRequest.Method.PUT:
        return network.put(request)
    }
  }

  var handleRequestError = function(error, bridge, req) {
    console.log("There was an error with a request")
    console.log(error)
    if( error.statusCode == 401 ) {
      console.log("Attempting to refresh tokens")
      return refreshAndRetry(bridge, req);
    } else {
      return Promise.reject(error);
    }
  }

  var refreshAndRetry = function(bridge, req) {
    return authManager.refreshTokens(bridge).then((tokens) => {
      return buildHeaders(bridge).then((headers) => {
        req.headers = headers.headers
        return request(req)
      });
    });
  }

  var handleSetStateResponse = function(body) {
    console.log("body: " + body)
    if(body) {
      try {
        JSON.parse(body)
      }
      catch(error) {
        console.log(error)
        return Promise.reject(error)
      }
    } else {
      return Promise.reject(new Error())
    }
  }
}

module.exports = LightNetwork
