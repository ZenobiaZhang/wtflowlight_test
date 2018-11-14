import * as firebase from 'firebase';
var config = {}
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV !== "production") {
  config = {
    apiKey: "AIzaSyDYtvFUK7_NmASbD0lCAGzEd-4RFpkeMjg",
    authDomain: "wtflowlight-dev.firebaseapp.com",
    databaseURL: "https://wtflowlight-dev.firebaseio.com",
    projectId: "wtflowlight-dev",
    storageBucket: "wtflowlight-dev.appspot.com",
    messagingSenderId: "578092546940"
  };
} else {
  config = {
      apiKey: "AIzaSyDDTUp-P_mkzi5afksYQoWdIW8By4vP73g",
      authDomain: "wtflowlight.firebaseapp.com",
      databaseURL: "https://wtflowlight.firebaseio.com",
      projectId: "wtflowlight",
      storageBucket: "wtflowlight.appspot.com",
      messagingSenderId: "122764132772"
  };
}

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth
};
