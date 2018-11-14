import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { authApi } from '../firebase/auth'

class SignUp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      password: "",
      email: "",
    }
    this.submit = this.submit.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
  }

  render () {
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
                      <Button id='submit' onClick={this.submit}>Sign Up</Button>
                  </form>
             </div>
        </div>
      )
   }

   submit(event) {
     authApi.createUser(this.state.email, this.state.password)
   }

   updateEmail(event) {
     this.setState({"email": event.target.value, "password": this.state.password})
   }

   updatePassword(event) {
     this.setState({"password": event.target.value, "email": this.state.email})
   }
}

export {
  SignUp
}
