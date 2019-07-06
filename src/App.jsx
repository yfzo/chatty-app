import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
// import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: 'Anonymous', id: ''}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      numOfUsersOn: 1,
      // userColors: [{name: 'Jen', color: '#5280aa'}, {name: 'Sam', color: '#d4abc7'}]
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://0.0.0.0:3001/');
    this.socket.addEventListener('open', () => {
      console.log('Connected to server');
    });
    this.socket.onmessage = evt => {
      const msg = JSON.parse(evt.data);
      // console.log('msg from client:', msg)
      if(msg.usersNum) {
        this.setState({numOfUsersOn: msg.usersNum});
      } else {
        this.setState({ messages: this.state.messages.concat([msg]) });
        // console.log('all messages', this.state.messages)
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
        <MessageList messages={this.state.messages} user={this.state.currentUser} colors={this.state.userColors} />
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
