import React, { Component } from 'react';

class Message extends Component {
    render() {
        if (this.props.message.type === 'incomingMessage') {
            const usernameStyle = {
                color: this.props.message.color
            }

            //checks if message content has an image url, if so render image and remove url from text
            const imgURL = this.props.message.content.match(/http\S+(jpg|png|gif)\b/g);
            if (imgURL) {
                var content = this.props.message.content.replace(/http\S+(jpg|png|gif)\b/g, '');
            } else {
                content = this.props.message.content;
            }

            return (
                <div className="message">
                    <span className="message-username" style={usernameStyle} >{this.props.message.user}</span>
                    <span className="message-content">
                        {content}
                        <div>
                            <img src={imgURL} className="msgImg" />
                        </div>
                    </span>
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