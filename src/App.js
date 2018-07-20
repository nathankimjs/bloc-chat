import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
        user: null
      };
      this.setActiveRoom = this.setActiveRoom.bind(this);
      this.setUser = this.setUser.bind(this);
  }

  setActiveRoom(room) {
    this.setState({activeRoom: room});
    if (this.state.activeRoom === room) {
      console.log("active room");
    } else {
      console.log(room);
    }
  }

  setUser(user) {
    this.setState({ user: user});
  }

  render() {
    let currentUser = this.state.user === null ? "Guest" : this.state.user.displayName;

    return (
      <div className="App">
        <h1> {"Select Chat Room"}</h1>
        <User
          firebase={firebase}
          setUser={this.setUser}
          currentUser = {currentUser} />
        <RoomList
          firebase={firebase}
          setActiveRoom={this.setActiveRoom} />
        <MessageList
          firebase={firebase}
          setActiveRoom={this.setActiveRoom}
          activeRoom={this.state.activeRoom}
          currentUser = {currentUser} />
      </div>

    );
  }
}

export default App;
