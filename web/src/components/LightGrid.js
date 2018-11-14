import React from 'react';
import { api } from '../firebase/db';
import 'typeface-roboto'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';

class LightGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lights: null
    };
    this.onLightStateChange = this.onLightStateChange.bind(this);
    this.updateLights = this.updateLights.bind(this);
  }

  componentDidMount() {
    this.lightsRef = api.lightsRef();
    this.lightsRef.on("value", this.updateLights);
  }

  componentWillUnmount() {
    this.lightsRef.off();
  }

  render() {
    var lights = this.state.lights;
    if (lights == null) lights = {};
    return (
      <List>
        {
            Object.keys(lights).map(key =>
              <ListItem
                key={key}>
                <ListItemText primary={lights[key].name} />
                <ListItemSecondaryAction>
                  <Switch
                    id={key}
                    checked={lights[key].state}
                    onChange={this.onLightStateChange} />
                </ListItemSecondaryAction>
              </ListItem>
            )
        }
      </List>
    );
  }

  updateLights(snapshot) {
    this.setState(() => ({ lights: snapshot.val() }));
  }

  onLightStateChange(event, checked) {
    api.setLightState(event.target.id, checked);
  }
}

export {
  LightGrid
}
