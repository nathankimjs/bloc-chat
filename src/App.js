import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDDHlzm8b94cTB_llWGgrSmUc9V09R9cT4",
    authDomain: "bloc-chat-9dcad.firebaseapp.com",
    databaseURL: "https://bloc-chat-9dcad.firebaseio.com",
    projectId: "bloc-chat-9dcad",
    storageBucket: "bloc-chat-9dcad.appspot.com",
    messagingSenderId: "47913623216"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase}/>
      </div>
    );
  }
}

export default App;
