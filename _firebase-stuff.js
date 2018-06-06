// Email and password Docs
// https://firebase.google.com/docs/auth/web/password-auth
//
// Firebase docs onAuth Change:
// https://firebase.google.com/docs/auth/web/manage-users

// CREATE USER/PW COMBO
firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // ...
});

// SIGN IN
firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // ...
});

// AUTH STATE CHANGE
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});

// SIGN OUT SUCCESS
firebase.auth().signOut().then(() => {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});