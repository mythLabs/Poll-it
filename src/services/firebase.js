import firebase from "firebase"
import "firebase/firestore"

const config = {
    apiKey: "AIzaSyDb2aHNcmx-fjEbKElJ01NivDBQH88ay0w",
    authDomain: "poll-it-74174.firebaseapp.com",
    databaseURL: "https://poll-it-74174.firebaseio.com",
    projectId: "poll-it-74174",
    storageBucket: "poll-it-74174.appspot.com",
    messagingSenderId: "455357464407"
}

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.store = firebase.firestore;
    this.auth = firebase.auth;
  }

  get polls() {
    return this.store().collection('polls');
  }
}

export default new Firebase();