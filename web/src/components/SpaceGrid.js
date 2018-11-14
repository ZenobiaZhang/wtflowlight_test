import React from 'react';
import { api } from '../firebase/db';
import 'typeface-roboto'
import Grid from '@material-ui/core/Grid'
import { Space } from './Space.js'

class SpaceGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spaces: null
    };
  }

  componentDidMount() {
    api.getSpaces().then(snapshot => {
      this.setState(() => ({ spaces: snapshot.val() }))
    })
  }
  render() {
    var spaces = this.state.spaces
    if (spaces == null) spaces = {}
    return (
      <Grid container spacing={16}>
        {
            Object.keys(spaces).map(key =>
              <Space id={key} team={spaces[key].team}item key={key}/>
            )
        }
      </Grid>
    )
  }
}

export {
  SpaceGrid
}
