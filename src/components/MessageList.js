import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      username:'',
      content: '',
      sentAt: '',
      roomId: ''
    };
      this.messagesRef = this.props.firebase.database().ref('messages');
      this.handleChange = this.handleChange.bind(this);
      this.createMessage = this.createMessage.bind(this);
  }


  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) })
      ///concat instead of push because concat returns a new array
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.key,
      username: this.props.currentUser
    });
  }

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.props.currentUser,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });
    this.setState({message: '', sentAt: '', roomId: ''})
    e.target.reset()
  };

  render() {
    return (
      <div className = "currentMessages">
        <ul>

            {this.state.messages.map ((message) => {
              let activeRoom = this.props.activeRoom.key
              if (message.roomId === activeRoom) {
                return <li key={message.key}>{message.content}</li>
              }
              null;
            })
          }
        </ul>

        <form className="newMessage" onSubmit={ (e) => this.createMessage(e)}>
          <input type="text" placeholder="Type message here" onChange={(e)=>this.handleChange(e)} />
          <input type="submit" value="Submit" />
        </form>
      </div>


    )
  }
}

export default MessageList;
