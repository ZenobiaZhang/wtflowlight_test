import React from 'react';
import { api } from '../firebase/db';
import 'typeface-roboto'
import Grid from '@material-ui/core/Grid'
import { Team } from './Team.js'

class TeamGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: null
    };
  }

  componentDidMount() {
    api.getTeams().then(snapshot => {
      this.setState(() => ({ teams: snapshot.val() }))
    })
  }

  render() {
    var teams = this.state.teams
    if (teams == null) teams = {}
    return (
      <Grid container spacing={16}>
        {
            Object.keys(teams).map(key =>
              <Team id={key} key={key} space={teams[key].space} item/>
            )
        }
      </Grid>
    )
  }
}

export {
  TeamGrid
}
