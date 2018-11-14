import React from 'react';
import 'typeface-roboto'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import AppBar from '@material-ui/core/AppBar'
import { SpaceGrid } from './SpaceGrid.js'
import { TeamGrid } from './TeamGrid.js'
import { LightGrid } from './LightGrid.js'
import { QuitGrid } from './QuitGrid.js'
import SignOut from './SignOut.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.user)
    this.state = {
      selectedTab: 0,
      user: props.user
    };

    this.onTab = this.onTab.bind(this)
  }

  render() {
    var tabs = ["Spaces", "Teams", "Lights"]
    if(this.state.user.roles.admin) { tabs.push("Bridges")}
    return (//**************************************************** */
      <div>
        <ul>
          <li><SignOut /></li>
        </ul>
        <AppBar>
              <Tabs value={this.state.selectedTab} onChange={this.onTab}>
                {tabs.map((tab) => { return <Tab label={tab} key={tab}/> })}
              </Tabs>


        </AppBar>
        {this.buildTab(this.state.selectedTab)()}
      </div>
    )
  }
  //how to shift to case #
  buildTab(tab) {
    switch(tab) {
      case 0:
        return this.renderSpaceGrid
      case 1:
        return this.renderTeamGrid
      case 2:
        return this.renderLightGrid
      case 3:
        return this.renderBridges
      default:
        return null
    }
  }

  onTab(event, value) {
    this.setState(() => ({
      selectedTab: value
    }))
  }

  renderSpaceGrid() {
    return (
      <div style={{ padding: 50 }}>
        <SpaceGrid />
      </div>
    )
  }

  renderTeamGrid() {
    return (
      <div style={{ padding: 50 }}>
        <TeamGrid />
      </div>
    )
  }

  renderLightGrid() {
    return (
      <div style={{padding: 50, maxWidth:320}}>
        <LightGrid />
      </div>
    )
  }

  renderBridges() {
    return (
      <div>
        <h1>Bridges</h1>
      </div>
    )
  }

}

export {
  Home
};
