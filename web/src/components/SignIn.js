import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { authApi } from '../firebase/auth'
import { Redirect } from 'react-router-dom';

class SignIn extends Component {

  constructor(props) {
    super(props)
    this.state = {
      password: "",
      email: "",
      user: null
    }
    this.login = this.login.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.onAuth = this.onAuth.bind(this)
  }

  componentWillMount() {
    authApi.onAuthStateChanged(this.onAuth)
  }

  render () {
    if(this.state.user) {
      return (<Redirect to="/" />)
    } else {
      return (
        <div>
             <div id='signupContainer'>
                  <form id='form'>
                      <TextField className='input' type="text"
                       placeholder="Email"
                       onChange={this.updateEmail}/>
                      <TextField className='input' type="password"
                       placeholder="Password"
                       onChange={this.updatePassword}/>
                      <Button id='login' onClick={this.login}>Sign In</Button>
                  </form>
             </div>
        </div>
      )
    }
   }

   login(event) {
     console.log("login")
     authApi.login(this.state.email, this.state.password)
     .catch(error => {
       console.log(error)
     });
   }

   updateEmail(event) {
     this.setState({"email": event.target.value, "password": this.state.password})
   }

   updatePassword(event) {
     this.setState({"password": event.target.value, "email": this.state.email})
   }

   onAuth(user) {
     if(user) {
       this.setState({user: user})
       console.log(user);
     } else {
       console.log("not authenticated")
     }
   }
}

export {
  SignIn
}
