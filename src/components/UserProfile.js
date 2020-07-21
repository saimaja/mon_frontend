import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

export default class UserProfile extends Component {
    render() {
        console.log('what are props?', this.props)
      
        return (
            <div>
               
                <span>These are {this.props.name}'s added monuments: </span>
            </div>
        )
    }
}

// export default withRouter(UserProfile)
