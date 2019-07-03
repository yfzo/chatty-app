import React, {Component} from 'react';

class ChatBar extends Component {
    _handleSubmit = (evt) => {
        if(evt.key === 'Enter'){
            const messageInput = evt.target.value;
            const user = this.refs.username.value;

            if (this.props.onEnter) {
                this.props.onEnter(user, messageInput);
            }

            // messageInput = '';
        }
    };
    render() {
    return (
        <footer className="chatbar">
            <input className="chatbar-username" defaultValue={this.props.currentUser.name} ref="username" placeholder="Your Name (Optional)" />
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this._handleSubmit} />
        </footer>
    );
  }

}
export default ChatBar;
