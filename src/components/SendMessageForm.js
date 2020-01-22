import React from 'react';

class SendMessageForm extends React.Component {

    state = {
        text: ''
    }

    onChange = (e) => {
        this.setState({
            text: e.target.value
        })
        this.props.onChange()
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onSubmit(this.state.text)
        this.setState({
            text: ''
        })
    }

    render(){
        return(
            <div className="message-form-container">
                <div className="message-form-form">
                <form onSubmit={e => this.onSubmit(e)}>
                    <input type="text" placeholder="Message #general" onChange={e => this.onChange(e)} className="message-form-input" value={this.state.text} />
                </form>
                </div>
                {this.state.text.length > 2 ? <div className="message-form-return">hit return to send</div> : ""}
            </div>
        )
    }
}

export default SendMessageForm