import React, {Component} from 'react';

class ChatBar extends Component {

    constructor() {
        super();
        this.state = {message: ''};
    }

    handleMsgInput = (evt) => {
        this.setState({message:evt.target.value});
    }

    handleSubmit = (evt) => {
        if(evt.key === 'Enter'){
            const messageInput = evt.target.value;
            const user = this.refs.username.value;

            if (this.props.onEnter) {
                this.props.onEnter(user, messageInput);
            }
            this.setState({message: ''});
        } 
    };
    render() {
    return (
        <footer className="chatbar">
            <input className="chatbar-username" defaultValue={this.props.currentUser.name} ref="username" placeholder="Your Name (Optional)" />
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.message} onChange={this.handleMsgInput} onKeyPress={this.handleSubmit} />
        </footer>
    );
  }

}
export default ChatBar;
