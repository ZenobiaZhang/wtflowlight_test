import React from 'react';
import 'typeface-roboto'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { SignUp } from './SignUp.js'
import { SignIn } from './SignIn.js'
import { Home } from './Home.js'
import { authApi } from '../firebase/auth.js'
import { api } from '../firebase/db'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fetchingUser: false,
      user: null,
      error: null
    }
    this.onAuth = this.onAuth.bind(this)
    this.onUserCreated = this.onUserCreated.bind(this)
  }
  componentWillMount() {
    this.authRef = authApi.onAuthStateChanged(this.onAuth)
    this.userChildAddedRef = api.usersRef()
    this.userChildAddedRef.on('child_added', this.onUserCreated)
  }

  componentWillUnmount() {
    this.authRef.off()
  }

  render() {
    let user = this.state.user
    let error = this.state.error
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={() => {
            if(error) {
              return (
                <p>{error}</p>
              )
            } else if(user) {
              return (
                <div>
                  <Home user={user}/>
                </div>
              )
            } else if(this.state.fetchingUser) {
              return (<p>Loading...</p>)
            } else {
              return (<Redirect to="/signin" />)
            }
          }}/>
          <Route exact={true} path='/signup' render={() => {
            if(user) {
              return (<Redirect to="/" />)
            } else {
              return (
                <div>
                  <SignUp />
                  </div>
              )
            }
          }}/>
          <Route exact={true} path='/signin' render={() => (
            <div>
              <SignIn />
            </div>
          )}/>
        </div>
      </BrowserRouter>
    );
  }

  onAuth(user) {
    if(user) {
      console.log(user)
      this.setState({user: this.state.user, uid: user.uid, fetchingUser: true, error: null})
      api.getUser(user.uid).then((userData) => {
        if(userData) {
          this.setState({user: userData, uid: user.uid, fetchingUser: false, error: null})
        } else {
          console.log("user not found")
        }
      })
    } else {
      console.log("user not authenticated")
      this.setState({user: null, fetchingUser: false, error: null})
    }
  }

  onUserCreated(event) {
    const user = event.val()
    console.log(user)
    if(user && this.state.uid && this.state.uid === event.key) {
      console.log(user)
      this.setState({user: user, uid: this.state.uid, fetchingUser: false, error: null})
    }
  }

}

export {
  App
};
