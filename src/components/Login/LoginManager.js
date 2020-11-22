import React from 'react';

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


export const initializeLoginFramework=()=>{
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
}

export const handleGoogleSignIn = () => {

    const googleProvider = new firebase.auth.GoogleAuthProvider();

     return firebase.auth().signInWithPopup(googleProvider)
      .then(result => {
        const { displayName, photoURL, email } = result.user;

        const signedInUser = {

          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success:true


        };

        return (signedInUser);

        console.log(displayName, photoURL, email);
      })
      .catch(error => console.log(error, error.message));
  }
  export const handleFbSignIn=()=>{

    const fbprovider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth().signInWithPopup(fbprovider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;

      user.success=true;

     return user;
      
      
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

  }

  export const handleSignOut = () => {

    return firebase.auth().signOut()
      .then(result => {
        const signOutUser = {
          isSignIn: false,
          name: '',
          email: '',
          password: '',
          photo: '',
          error: '',
          success: false,


        }

       return (signOutUser);
      }).catch(error => console(error, error.message));


  }

  export const createUserWithEmailAndPassword = (name,email,password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {

      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      newUserInfo.isSignIn=true;
      newUserInfo.name=name;
      updateUserName(name)

      return newUserInfo;

    })
    .catch((error) => {


      let newUserInfo = {  };

      newUserInfo.error = error.message;
      newUserInfo.success = false;
      newUserInfo.isSignIn=false;
      return newUserInfo;

     
      // ..
    });
  }

  

  export const signInUserWithEmailPassword = (email,password)=> {
    return firebase.auth().signInWithEmailAndPassword(email,password)
    .then((res) => {

      const newUserInfo =  res.user ;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;

    })
    .catch((error) => {

      let newUserInfo = {};

      newUserInfo.error = error.message;
      newUserInfo.success = false;

     return (newUserInfo);
    });
  }

  const updateUserName = name => {

    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
     
    }).then(function () {
       console.log('Update Successfully');
    }).catch(function (error) {
      console.log(error);
    });


  }


