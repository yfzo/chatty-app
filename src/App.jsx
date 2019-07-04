import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
// import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: 'Anonymous', color: '#cb2a51'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      numOfUsersOn: 1
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://0.0.0.0:3001/');
    this.socket.addEventListener('open', () => {
      console.log('Connected to server');
    });
    this.socket.onmessage = evt => {
      const msg = JSON.parse(evt.data);

      if(msg.usersNum) {
        this.setState({numOfUsersOn: msg.usersNum});
      } else {
        this.setState({ messages: this.state.messages.concat([msg]) });
      }
    }
  }

  msgHandler(user, content, type) {
    const msg = {
      user: user,
      content: content,
      type: type
    }

    if(type === 'postNotification') {
      this.setState({currentUser: {name: user}});
      // console.log(this.state);
    }
    this.socket.send(JSON.stringify(msg));
  }

  render() {
    return (
      <div>
        <NavBar numOfUsersOn={this.state.numOfUsersOn} />
        <MessageList messages={this.state.messages} user={this.state.currentUser}/>
        <ChatBar 
          currentUser={this.state.currentUser} 
          onEnter={(user, content, type) => {
            this.msgHandler(user, content, type);
          }}
        />
      </div>
    );
  }
}
export default App;
