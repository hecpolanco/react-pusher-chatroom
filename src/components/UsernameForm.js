import React from 'react';

class UsernameForm extends React.Component {

    state = {
        username: ''
    }

    onChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onSubmit(this.state.username)
    }

    render(){
        return(
            <div className="login-background">
                <form onSubmit={e => this.onSubmit(e)}>
                    <span ><input className="login-bar" type="text" placeholder="Enter your username" onChange={e => this.onChange(e)} /></span>
                    <span> <input className="login-button" type="submit" value="Log In" /></span>
                </form>
            </div>
        )
    }
}

export default UsernameForm