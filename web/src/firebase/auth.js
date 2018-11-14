import { auth } from './firebase'

var authApi = { }

authApi.createUser = function(email, password) {
  return auth.createUserWithEmailAndPassword(email, password)
}

authApi.login = function(email, password) {
  return auth.signInWithEmailAndPassword(email, password)
}

authApi.onAuthStateChanged = function(callback) {
  return auth.onAuthStateChanged(callback)
}

export {
  authApi
}
