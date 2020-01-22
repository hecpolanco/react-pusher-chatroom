import React from 'react';

class WhosOnlineList extends React.Component {
    renderUsers = () => {
        return (
            <div>
                <h3 className="whos-online-header">Current Room</h3>
                <h5 className="whos-online-room">#{this.props.currentRoom.name}</h5>
                <br />
                <h3 className="whos-online-members">{this.props.users.length === 1 ? this.props.users.length + " Member" : this.props.users.length + " Members"}</h3>
            <ul className="whos-online-list">
                {this.props.users.sort((usera, userb) => usera.name.localeCompare(userb.name)).map((user, ind) => {
                    if (user.id === this.props.currentUser.id) {
                        return (
                            <WhosOnlineListItem key={ind} presenceState="online">
                                {user.name} (you)
                            </WhosOnlineListItem>
                        )
                    }
                    return (
                        <WhosOnlineListItem key={ind} presenceState={user.presence.state}>
                            {user.name}
                        </WhosOnlineListItem>
                    )
                })}
            </ul>
            </div>
        )
    }

    render(){
        if (this.props.users) {
            return this.renderUsers()
        } else {
            return <div>Loading...</div>
        }
    }
}

class WhosOnlineListItem extends React.Component {
  render() {
    const styles = {
      li: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 2,
        paddingBottom: 2,
      },
      div: {
        borderRadius: '50%',
        width: 11,
        height: 11,
        marginRight: 10,
      },
    }
    return (
      <li style={styles.li}>
        <div
          style={{
            ...styles.div,
            backgroundColor:
              this.props.presenceState === 'online' ? '#1FC8DB' : '#414756',
          }}
        />
        {this.props.children}
      </li>
    )
  }
}

export default WhosOnlineList