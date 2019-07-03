import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
// import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import { generateRandomId } from './utils';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://0.0.0.0:3001/');
    this.socket.addEventListener('open', () => {
      console.log('Connected to server');
    });
    this.socket.onmessage = evt => {
      const msg = JSON.parse(evt.data);
      this.setState({ messages: this.state.messages.concat([msg]) });
    }
  }

  msgHandler(user, content) {
    if (content) {
      const msg = {
        user: user,
        content: content
      }
      this.socket.send(JSON.stringify(msg));
    } else {
      this.setState({currentUser: {name: user}});
      console.log(this.state);
    }
    
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
          <MessageList messages={this.state.messages} />
          <ChatBar 
            currentUser={this.state.currentUser} 
            onEnter={(user, content) => {
              this.msgHandler(user, content);
            }}
          />
      </div>
    );
  }
}
export default App;
