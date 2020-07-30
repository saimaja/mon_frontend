import React, { Component } from 'react'
import './component.css'
import { Input, Menu, Dropdown, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import logo from '../images/mon.png'



class NavBar extends Component {

  state = {
    activeItem: 'home'
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  render() {

    let results
    if (this.props.filter === 'removed') {
      results = <span>Monuments Removed: {this.props.monuments.length}</span>;
    } else if (this.props.filter === 'renamed') {
      results = <span>Monuments Renamed: {this.props.monuments.length}</span>;
    } else {
      results = <span>Results: {this.props.monuments.length}</span>;
    }

    if (this.props.location.pathname === '/login' || this.props.location.pathname === '/register') {
      return <span></span>
    } else {

      return (
        <div>
          <Menu secondary className='no-padding'>
            <Menu.Item
              onClick={() => this.props.history.push('/monuments')}>
              <img src={logo} alt='logo' />
            </Menu.Item>

            {this.props.currentUser ?
              <Menu.Item
                name={this.props.name}
                active={this.state.activeItem === 'profile'}
                onClick={() => this.props.history.push(`/users/${this.props.currentUser}`)}
              /> : null}

            <Menu.Item
              name='about'
              active={this.state.activeItem === 'about'}
              onClick={() => this.props.history.push('/about')}
            />

            <Menu.Item
              name='blogs'
              active={this.state.activeItem === 'blogs'}
              onClick={() => this.props.history.push('/blogs')}
            />


            <Menu.Item
              name='map view'
              active={this.state.activeItem === 'map'}
              onClick={() => this.props.history.push('/map')}
            />

            <Menu.Item
              name='list view'
              active={this.state.activeItem === 'list'}
              onClick={() => this.props.history.push('/monuments')}
            />

            <Menu.Menu position='right'>
              {this.props.location.pathname === '/map' || this.props.location.pathname === '/monuments' ?
                <Dropdown item text='Filter' >
                  <Dropdown.Menu >
                    <Dropdown.Item text='None' onClick={(e) => this.props.changeFilter('none')} />
                    <Dropdown.Item text='Removed' onClick={(e) => this.props.changeFilter('removed')} />
                    <Dropdown.Item text='Renamed' onClick={(e) => this.props.changeFilter('renamed')} />
                  </Dropdown.Menu>
                </Dropdown> : <span></span>}

              {this.props.location.pathname === '/monuments' ?
                <Menu.Item>
                  <Input icon='search' type='text' placeholder='Search by Name' onChange={this.props.search} />
                </Menu.Item> : <span></span>}


              {this.props.currentUser ?
                <Menu.Item
                  name='logout'
                  active={this.state.activeItem === 'logout'}
                  onClick={this.props.logout}
                /> : 'login'}
            </Menu.Menu>
          </Menu>

          {this.props.location.pathname === '/map' ?
            <Segment secondary raised compact style={{ margin: 'auto', marginBottom: '25px', marginTop: '-10px' }}>{results}</Segment>
            : <span></span>}
        </div>

      )
    }
  }
}

export default withRouter(NavBar)