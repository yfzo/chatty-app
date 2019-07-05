import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const messages = this.props.messages.map(message => (
        <Message key={message.id} message={message} user={this.props.user} colors={this.props.colors} />
    ));

    return (
        <main className="messages">
          {messages}
        </main>
    );
  }
}
export default MessageList;