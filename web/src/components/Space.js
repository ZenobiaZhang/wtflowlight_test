import React from 'react';
import '../index.css';
import { api } from '../firebase/db.js';
import 'typeface-roboto'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import 'rc-time-picker/assets/index.css';
import Typography from '@material-ui/core/Typography';

class Space extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      teamId: props.team,
      space: null
    };
    this.onSpaceChange = this.onSpaceChange.bind(this)
    this.onTeamChange = this.onTeamChange.bind(this)
  }

  componentDidMount() {
    this.spaceRef = api.spaceRef(this.state.id)
    this.teamRef = api.teamRef(this.state.teamId)
    this.spaceRef.on('value', this.onSpaceChange)
    this.teamRef.on('value', this.onTeamChange)
  }

  componentWillUnmount() {
    this.spaceRef.off()
    this.teamRef.off()
  }

  render() {
    var name = this.state.space ? this.state.space.name : ""
    var team = this.state.team ? this.state.team.name : ""
    return (
      <Grid item lg={3} sm={3} md={3}>
        <Card key={team}>
          <CardContent>
            <Typography variant="title">{name}</Typography>
            <Typography variant="subheading">{team}</Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  }

  onChangeTime(value) {
    
  }

  onSpaceChange(snapshot) {
    this.setState((prevState, props) => ({
      id: props.id,
      space: snapshot.val(),
      team: prevState.team
    }))
  }

  onTeamChange(snapshot) {
    this.setState((prevState, props) => ({
      id: props.id,
      space: prevState.space,
      team: snapshot.val()
    }))
  }
}

export {
  Space
}
