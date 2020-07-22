import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

export default class UserProfile extends Component {

    state = {
        travelogues: [],
        favorites: []
    }

    componentDidMount() {
        fetch(`http://localhost:3000/users/${this.props.currentUser}`)
        .then(resp => resp.json())
        .then(data => { console.log(data)
            // this.setState({travelogues: data.travelogues})
        })
    }

    render() {

        return (
            <div>

                <span>This is {this.props.name}'s page </span>
            </div>
        )
    }
}

// export default withRouter(UserProfile)
