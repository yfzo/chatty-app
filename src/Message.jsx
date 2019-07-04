import React, {Component} from 'react';

class Message extends Component {
  render() {
    if(this.props.message.type === 'incomingMessage') {
      return (
        <div className="message">
          <span className="message-username">{this.props.message.user}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
      );
    } else if (this.props.message.type === 'incomingNotification') {
      return (
        <div className="notification">
          <span className="notification-content">{this.props.message.content}</span>
        </div>
      )
        
    }
  }
}
export default Message;