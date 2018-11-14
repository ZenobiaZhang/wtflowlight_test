const base64 = require('base-64')
const utf8 = require('utf8')
const moment = require('moment-timezone')
const LightRequest = require('./LightRequest')

var NetworkAuthManager = function(db, network, baseUrl, remoteAuth) {
  this.db = db
  this.network = network
  this.baseUrl = baseUrl
  this.remoteAuth = remoteAuth
}

NetworkAuthManager.prototype.loadAuth = function(bridge) {
  return this.db.getHueAuth(bridge)
    .then(authSnap => {
      return authSnap.val()
    })
}

NetworkAuthManager.prototype.buildHeaders = function(bridge) {
  return this.loadAuth(bridge)
    .then(auth => {
      const tokens = auth.tokens;
      if(tokens) {
        var headers = {};
        headers["Authorization"] = "Bearer " + tokens.access_token;
        headers["Content-Type"] = "application/json";
        return headers;
      } else {
        return {};
      }
    });
}



NetworkAuthManager.prototype.createWhitelistUser = function(bridge) {
  return this.buildHeaders(bridge).then(headers => {
    var body = JSON.stringify({ "linkbutton": true });
    var request = new LightRequest(this.baseUrl + '/bridge/0/config', headers, body);
    return this.network.put(request)
      .then(body => {
        const json = JSON.stringify({ devicetype: "wtflowlight" });
        var request = new LightRequest(this.baseUrl + '/bridge', headers, json);
        return this.network.post(request)
          .then(body => {
            console.log(body);
            const json = JSON.parse(body);
            const user = json[0].success.username;
            if(user) {
              this.db.setWhitelistUser(bridge, {username: user});
            }
          });
      });
  });
};

NetworkAuthManager.prototype.generateRefreshTokens = function(bridge) {
  return this.loadAuth(bridge).then(auth => {
    const code = auth.authorizationCode
    if(!code) { return Promise.reject(new Error()) }
    var text = this.remoteAuth.HUE_REMOTE_AUTH_CLIENT_ID + ":" + this.remoteAuth.HUE_REMOTE_AUTH_CLIENT_SECRET;
    console.log(text)
    var encoded = base64.encode(text);
    console.log(encoded);
    const headers = {
      Authorization: "Basic " + encoded
    };
    const request = new LightRequest(this.baseUrl + '/oauth2/token?code=' + code + '&grant_type=authorization_code', headers);
    return this.network.post(request)
    .then((body, res, err) => {
      console.log("try to save tokens")
      if (err) { return Promise.reject(err); }
      var json = JSON.parse(body);
      if(json.access_token &&
         json.access_token_expires_in &&
         json.refresh_token &&
         json.refresh_token_expires_in &&
         json.token_type) {
           console.log("try to set tokens")
           console.log(this)
           return this.db.setTokens(bridge, json).then(() => {
             console.log("set tokens")
             return json
           } )
      } else {
        console.log("invalid response");
        return new Promise.reject(new Error());
      }
    })
  })
}

NetworkAuthManager.prototype.refreshTokens = function(bridge) {
  return this.loadAuth(bridge).then(auth => {
    const code = auth.authorizationCode
    if(!code) { return Promise.reject(new Error()) }
    var text = this.remoteAuth.HUE_REMOTE_AUTH_CLIENT_ID + ":" + this.remoteAuth.HUE_REMOTE_AUTH_CLIENT_SECRET;
    console.log(text)
    var encoded = base64.encode(text);
    var headers = {}
    headers["Authorization"] = "Basic " + encoded
    headers["Content-Type"] = "application/x-www-form-urlencoded"
    var form = { refresh_token: auth.tokens.refresh_token }
    const request = new LightRequest(this.baseUrl + '/oauth2/refresh?grant_type=refresh_token', headers, null, null, form);
    return this.network.post(request)
            .then((body, res, err) => {
              console.log("try to save tokens")
              if (err) { return Promise.reject(err); }
              var json = JSON.parse(body);
              if(json.access_token &&
                 json.access_token_expires_in &&
                 json.refresh_token &&
                 json.refresh_token_expires_in &&
                 json.token_type) {
                   console.log("try to set tokens")
                   console.log(this)
                   return this.db.setTokens(bridge, json).then(() => {
                     console.log("set tokens")
                     return json
                   } )
              } else {
                console.log("invalid response");
                return new Promise.reject(new Error());
              }
            })
  })
}

NetworkAuthManager.prototype.saveTokens = function(bridge, body, res, err) {
  console.log("try to save tokens")
  if (err) { return Promise.reject(err); }
  var json = JSON.parse(body);
  if(json.access_token &&
     json.access_token_expires_in &&
     json.refresh_token &&
     json.refresh_token_expires_in &&
     json.token_type) {
       console.log("try to set tokens")
       console.log(this)
       return this.db.setTokens(bridge, json).then(() => {
         console.log("set tokens")
         return json
       } )
  } else {
    return new Promise.reject(new Error());
  }
}

module.exports = NetworkAuthManager
