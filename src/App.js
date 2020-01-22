import React, { Component } from 'react';
import UsernameForm from './components/UsernameForm';
import ChatScreen from './ChatScreen';

class App extends Component {

  state = {
    currentScreen: 'Login',
    currentUsername: ''
  }

  onUsernameSubmitted = (username) => {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username }),
    })
      .then(() => 
        this.setState({
          currentUsername: username,
          currentScreen: 'ChatScreen'
        })
    ).catch(error =>
      console.log(error))
  }

  render() {
    return (
    this.state.currentScreen === 'Login' ? <UsernameForm onSubmit={this.onUsernameSubmitted} /> : <ChatScreen currentUsername={this.state.currentUsername} />
    )  
  }
}

export default App
