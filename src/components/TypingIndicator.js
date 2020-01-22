import React from 'react';

class TypingIndicator extends React.Component {
    render(){
        if (this.props.usersWhoAreTyping.length === 0) {
            return <div className="whos-typing-container"></div>
        } else if (this.props.usersWhoAreTyping.length === 1) {
            return <div className="whos-typing-container">{this.props.usersWhoAreTyping[0]} is typing...</div>
        } else if (this.props.usersWhoAreTyping.length > 1) {
            return <div className="whos-typing-container">{this.props.usersWhoAreTyping.join(' and ')} are typing...</div>
        }
    }
}

export default TypingIndicator;