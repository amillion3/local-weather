const {setUID,} = require('./firebaseAPI');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUID(user.uid);
      // User is signed in.
    } else {
      // No user is signed in.

    }
  });
};

module.exports = {
  checkLoginStatus,
};
