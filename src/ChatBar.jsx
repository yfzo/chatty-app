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
            var user, content, type;

            if (inputType === 'msg') {
                user = this.props.currentUser.name;
                content = evt.target.value;
                type = 'postMessage';
            } else if (inputType === 'user') {
                user = evt.target.value;
                content = `${this.props.currentUser.name} has changed their name to ${user}`;
                type = 'postNotification';
            }
            
            if (this.props.onEnter) {
                this.props.onEnter(user, content, type);
            }
            this.setState({message: ''});
        } 
    };

    handleNoEnter = (evt) => {
        this.setState({user: this.props.currentUser.name})
    }
    render() {
    return (
        <footer className="chatbar">
            <input className="chatbar-username" value={this.state.user} onChange={this.handleInput('user')} onKeyPress={this.handleSubmit('user')} onBlur={this.handleNoEnter} placeholder="Your Name (Optional)" />
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.message} onChange={this.handleInput('msg')} onKeyPress={this.handleSubmit('msg')} />
        </footer>
    );
  }

}
export default ChatBar;
