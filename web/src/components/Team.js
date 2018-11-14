import React from 'react';
import '../index.css';
import { api } from '../firebase/db.js';
import 'typeface-roboto'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import 'rc-time-picker/assets/index.css';
import moment from 'moment-timezone';
import TimePicker from 'rc-time-picker';
import Typography from '@material-ui/core/Typography';

class Team extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      spaceId: props.space,
      team: null,
      space: null
    };

    this.onSpaceChange = this.onSpaceChange.bind(this)
    this.onTeamChange = this.onTeamChange.bind(this)
    this.onFlowStartChange = this.onFlowStartChange.bind(this)
    this.onFlowEndChange = this.onFlowEndChange.bind(this)
  }

  componentDidMount() {
    this.spaceRef = api.spaceRef(this.state.spaceId)
    this.teamRef = api.teamRef(this.state.id)
    this.spaceRef.on('value', this.onSpaceChange)
    this.teamRef.on('value', this.onTeamChange)
  }

  componentWillUnmount() {
    this.spaceRef.off()
    this.teamRef.off()
  }

  render() {
    moment.tz.setDefault("America/New_York")
    const format = 'hh:mm a';
    var name = this.state.team ? this.state.team.name : "";
    var space = this.state.space ? this.state.space.name : "";
    if(!!this.state.team && !!this.state.team.flowStart) {
      var flowStart = moment(this.state.team.flowStart, "HH:mm")
    }
    if(!!this.state.team && !!this.state.team.flowEnd) {
      var flowEnd = moment(this.state.team.flowEnd, "HH:mm")
    }
    return (
      <Grid item lg={3} sm={3} md={3}>
        <Card>
          <CardContent>
            <Typography variant="title">{name}</Typography>
            <Typography variant="subheading">{space}</Typography>
            <Typography variant="subheading">{"Flow Start"}</Typography>
            <TimePicker
              showSecond={false}
              defaultValue={moment("00:00", "HH:mm")}
              value={flowStart }
              onChange={this.onFlowStartChange}
              format={format}
              use12Hours
              allowEmpty={false}
            />
            <Typography variant="subheading">{"Flow End"}</Typography>
            <TimePicker
              showSecond={false}
              defaultValue={moment("00:00", "HH:mm")}
              value={flowEnd }
              onChange={this.onFlowEndChange}
              format={format}
              use12Hours
              allowEmpty={false}
            />
          </CardContent>
        </Card>
      </Grid>
    )
  }

  onFlowStartChange(newTime) {
    var newTeam = this.state.team
    newTeam.flowStart = newTime.format("HH:mm")
    api.setTeam(this.props.id, newTeam)
  }

  onFlowEndChange(newTime) {
    var newTeam = this.state.team
    newTeam.flowEnd = newTime.format("HH:mm")
    api.setTeam(this.props.id, newTeam)
  }

  onTeamChange(snapshot) {
    const team = snapshot.val()
    this.setState((prevState, props) => ({
      id: props.id,
      space: prevState.space,
      team: team
    }))
  }

  onSpaceChange(snapshot) {
    this.setState((prevState, props) => ({
      id: props.id,
      team: prevState.team,
      space: snapshot.val()
    }))
  }
}

export {
  Team
}
