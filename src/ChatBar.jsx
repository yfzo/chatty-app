import React, {Component} from 'react';

class ChatBar extends Component {

    constructor(props) {
        super(props);
        this.state = {user: this.props.currentUser.name, message: ''};
    }

    handleInput = inputType => (evt) => {
        if (inputType === 'msg') {
            this.setState({message: evt.target.value});
            // console.log(this.state.message);
        } else if (inputType === 'user') {
            this.setState({user: evt.target.value});
            // console.log(this.state.user);
        }
    }

    handleSubmit = inputType => (evt) => {
        if(evt.key === 'Enter'){
            if (inputType === 'msg') {
                var messageInput = evt.target.value;
                var user = this.refs.username.value;
            } else if (inputType === 'user') {
                var user = evt.target.value;
            }
            
            if (this.props.onEnter) {
                this.props.onEnter(user, messageInput);
            }
            this.setState({message: ''});
        } 
    };
    render() {
    return (
        <footer className="chatbar">
            <input className="chatbar-username" value={this.state.user} onChange={this.handleInput('user')} onKeyPress={this.handleSubmit('user')} ref="username" placeholder="Your Name (Optional)" />
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.message} onChange={this.handleInput('msg')} onKeyPress={this.handleSubmit('msg')} />
        </footer>
    );
  }

}
export default ChatBar;
