import React from 'react';
import Chatkit from '@pusher/chatkit-client'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
import WhosOnlineList from './components/WhosOnlineList'

class ChatScreen extends React.Component {

    state = {
        currentUser: {},
        currentRoom: {},
        messages: [],
        usersWhoAreTyping: [],
        scrolled: false,
    }

    componentDidMount () {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:547c503a-ca75-4325-9b1d-0aec8bf8fc5b',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/authenticate',
            }),
        })

        chatManager
            .connect()
            .then(currentUser => {
                this.setState({ currentUser })
                return currentUser.subscribeToRoom({
                    roomId: "4ea0ac33-e785-4e60-8392-269ffbf0f90f",
                    messageLimit: 100,
                    hooks: {
                        onMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message]
                            })
                        },
                        onUserStartedTyping: user => {
                            this.setState({
                                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
                            })
                        },
                        onUserStoppedTyping: user => {
                            this.setState({
                                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(username => username !== user.name)
                            })
                        },
                        onPresenceChanged: () => this.forceUpdate(),
                    },
                })
            })
            .then(currentRoom => { 
                this.setState({ currentRoom })
            })
            .catch(error => console.log(error))
    }

    sendMessage = (text) => {
        this.state.currentUser.sendMessage({
            roomId: this.state.currentRoom.id,
            text: text
        })
        this.setState({
            scrolled: false
        })
    }

    sendTypingEvent = () => {
        this.state.currentUser
            .isTypingIn({roomId: this.state.currentRoom.id})
            .catch(error => console.log(error))
    }

    onScroll = () => {
        this.setState({
            scrolled: true
        })
    }

    render(){
        return(
            <div className="container">
                <div className="chatContainer">
                    <div className="whosOnlineListContainer">
                        <WhosOnlineList currentRoom={this.state.currentRoom} users={this.state.currentRoom.users} currentUser={this.state.currentUser} />
                    </div>
                    <div className="chatListContainer">
                        <MessageList currentUser={this.state.currentUser} messages={this.state.messages} scrolled={this.state.scrolled} onScroll={this.onScroll}/>
                        <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
                        <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatScreen;