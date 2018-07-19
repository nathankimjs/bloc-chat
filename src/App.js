import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
  constructor(props) {
    super(props);

      this.state = {
        activeRoom: '',
      };
      this.setActiveRoom = this.setActiveRoom.bind(this);
  }

  setActiveRoom(room) {
    this.setState({activeRoom: room});
    if (this.state.activeRoom === room) {
      console.log("current room");
    } else {
      console.log(room);
    }

  }

  render() {
    return (
      <div className="App">
        <h1> {this.state.activeRoom.newRoomName || "Select Chat Room"}</h1>
        <RoomList firebase={firebase} setActiveRoom={this.setActiveRoom} />

        {this.state.activeRoom ?
          (<MessageList firebase={firebase} setActiveRoom={this.setActiveRoom} />) : (null)
        }

      </div>
    );
  }
}

export default App;
