import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount(e) {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
      ///concat instead of push because concat returns a new array
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(!this.state.newRoomName) {return}
    this.roomsRef.push({ name: this.state.newRoomName });
    this.setState({ newRoomName: " "});
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value })
  }

  render() {
    return (
      <div className="roomlist">
        {
          this.state.rooms.map((room, index) =>
            <li key={index}>{room.name}</li>
            ///creating a new list item for each room
          )
        }
        <form onSubmit={ (e) => this.handleSubmit(e) }>
          <label> Create Room: </label>
          <input type="text" value={this.state.newRoomName} onChange = {(e) => this.handleChange(e)} />
          <input type="submit" onSubmit = {(e) => this.handleSubmit(e)}/>
        </form>
      </div>

    )
  }
}

export default RoomList;
