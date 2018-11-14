const functions = require('firebase-functions');

module.exports = function(db, api) {
  return functions.https.onRequest(handleRequest(db, api));
}

function handleRequest(db, api) {
  return function(request, response) {
    return db.getLights()
        .then((lightsSnap) => {
          const lights = lightsSnap.val()
          console.log(lights)
          Object.keys(lights).forEach((key) => {
            var light = lights[key]
            var state = { on: light.state }
            api.setState(light.bridge, light.id, state);
          })
          return true
        })
        .catch( error => { return response.status(500); });
  }
}
