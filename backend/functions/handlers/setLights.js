module.exports = function(functions, api) {
  return functions
    .database
    .ref('lights/{id}')
    .onUpdate((event) => { return handleEvent(event, api) });
}

function handleEvent(event, api) {
  const light = event.after.val();
  var state = { on: light.state,
                hue: light.hue }
  return api.setState(light.bridge, light.id, state);
}
