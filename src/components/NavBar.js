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
          // active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='about'
          // active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='profile'
          // active={activeItem === 'friends'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' type='text' placeholder='Search...' onChange={this.props.search} />
          </Menu.Item>
          <Menu.Item
            name='logout'
            // active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>

    )
    }
  }
}

export default withRouter(NavBar)