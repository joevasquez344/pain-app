var firebaseConfig = {
  apiKey: 'AIzaSyBrCEjIyk07z-rn_AP14DSqIy6NMwsEwwY',
  authDomain: 'pain-app-c9f83.firebaseapp.com',
  projectId: 'pain-app-c9f83',
  storageBucket: 'pain-app-c9f83.appspot.com',
  messagingSenderId: '236273111686',
  appId: '1:236273111686:web:60a04c5bb24ebd98333707',
  measurementId: 'G-TY8YE505QR',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//functions
function register(firstName, lastName, email, password) {
  var username = firstName + lastName;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      return firebase
        .firestore()
        .collection('users')
        .doc(cred.user.uid)
        .set({username});
    })
    .then(() => (window.location.href = 'home.html'))
    .catch((err) => console.log(err));
}

function createPainLevel(painLevel) {
  const user = firebase.auth().currentUser;
  firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((doc) => {
      return doc.painEntries;
    })
    .then((entries) => {
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          painEntries: [
            ...entries,
            {
              date: new Date(),
              level: painLevel,
            },
          ],
        });
    });
}
const signIn = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      window.alert('Signed in .');
      window.location.href = 'home.html';
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
      window.alert('message : ' + errorMessage);
    });
};

//sign in page button events
//sign in user
$('#btn-login').click(function () {
  var email = $('#email').val();
  var password = $('#password').val();

  if (email != '' && password != '') {
    signIn(email, password);
  } else {
    window.alert('Please fill out all fields');
  }
});
//move user to signup page
$('#btn-to-signup').click(function () {
  window.location.href = 'signup.html';
});

// firebase.auth().signInWithEmailAndPassword(email, password)
//   .then((user) => {
//     // Signed in
//     // ...
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//   });

//home page button events
//add user painlevel to users/ database
$('#btn-pain-submit').click(function () {
  var painLevel = $('#pain-level').val();
  var entryDate = Date();
  console.log(entryDate);

  if (
    (painLevel != '') & (painLevel == '1') ||
    '2' ||
    '3' ||
    '4' ||
    '5' ||
    '6' ||
    '7' ||
    '8' ||
    '9' ||
    '10'
  ) {
    createPainLevel(painLevel);
    window.alert('successful entry');
  } else {
    window.alert('Please fill out all fields');
  }
});

//sign out user
$('#btn-sign-out').click(function () {
  firebase
    .auth()
    .signOut()
    .then(function () {
      window.location.href = 'index.html';
      window.alert('Sign-out successful.');
    })
    .catch(function (error) {
      window.alert('An error occurred while signing out.');
    });
});

// sign up page button events
// add user data to users/ database
$('#btn-signup').click(function () {
  var email = $('#email').val();
  var firstName = $('#first-name').val();
  var lastName = $('#last-name').val();
  var password = $('#password').val();

  if (email != '' && firstName != '' && lastName != '' && password != '') {
    register(firstName, lastName, email, password);
    window.alert('successful entry');
  } else {
    window.alert('Please fill out all fields');
  }
});
