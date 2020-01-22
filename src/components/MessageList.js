import React from 'react';

class MessageList extends React.Component {

    componentDidUpdate() {
        setInterval(this.updateScroll,1000);
      }

    updateScroll = () => {
        let element = document.querySelector('.message-list-container')
        if (this.props.scrolled === false) {
            element.scrollTop = element.scrollHeight;
        }
    }
      

    parseTime = (createdMessage) => {
        let date = new Date(createdMessage);
        let hours = date.getHours();
        let mins = date.getMinutes();
        let merid = " AM"
        if (hours > 12 && mins < 10) {
            hours = hours - 12
            mins = "0" + mins
            merid = " PM"
            return hours + ':' + mins + merid
        } else if (hours > 12 && mins > 10) {
                hours = hours - 12
                merid = " PM"
                return hours + ':' + mins + merid

        } else if (hours < 12 && mins < 10) {
            mins = "0" + mins
            return hours + ':' + mins + merid
        } else {
            return hours + ':' + mins + merid
        }
    }

    currentDay = () => {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        return date
    }

    render () {
        return(
            <div className="message-list-container" onScroll={() => this.props.onScroll()}> 
                {this.props.messages.map((message, ind) => {
                    return <div key={ind}>
                        <div className="message-item">
                            <span>{this.props.currentUser.id === message.senderId ? <strong><font className="special-text">{message.senderId}</font></strong> : <strong>{message.senderId}</strong>} <span className="message-list-time">{this.parseTime(message.createdAt)}</span></span>
                            <br/>
                            <p className="message-list-text">{message.text}</p>
                        </div>
                        <br/>
                    </div>
                    }    
                )}
            </div>
        )
    }

}

export default MessageList;