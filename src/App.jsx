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
      messages: [
        {
          id: 'iajo',
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 'fdhodu',
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://0.0.0.0:3001/');
    this.socket.addEventListener('open', () => {
      console.log('Connected to server');
    })
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
            onEnter={(currentUser, messageInput) => {
              const newMessage = {id: generateRandomId(), username: currentUser, content: messageInput};
              const messages = this.state.messages.concat(newMessage);
              this.setState({ messages: messages })
            }} 
          />
      </div>
    );
  }
}
export default App;
