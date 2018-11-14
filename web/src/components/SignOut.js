import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import { auth } from '../firebase'
import { Redirect } from 'react-router-dom';

//how to from const->class extends
//put in home?
const SignOutButton = () =>
  <Button id='logout' onClick={auth.doSignOut}>Sign Out</Button>

export default SignOutButton;