import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom';

class NavBar extends Component {

  state = { 
    activeItem: 'home' 
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  

  render() {
    if(this.props.location.pathname === '/login' || this.props.location.pathname === '/register') {
      return <span></span>
    } else {

    return (
      <Menu secondary>
        <Menu.Item
          name='home'
          active={this.state.activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='about'
          active={this.state.activeItem === 'messages'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name= {this.props.userName}
          active={this.state.activeItem === 'profile'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' type='text' placeholder='Search...' onChange={this.props.search} />
          </Menu.Item>
          <Menu.Item
            name= 'logout'
            active={this.state.activeItem === 'logout'}
            onClick={this.props.logout}
          />
        </Menu.Menu>
      </Menu>

    )
    }
  }
}

export default withRouter(NavBar)