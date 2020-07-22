import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Button, Image, List, Grid, Segment } from 'semantic-ui-react'
import logo from '../images/fadedmon.png'
import './component.css'

export default class UserProfile extends Component {

    state = {
        travelogues: [],
        favorites: []
    }

    componentDidMount() {
        fetch(`http://localhost:3000/users/${this.props.currentUser}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data.monuments, data.travelogues)
                this.setState({ favorites: data.monuments, travelogues: data.travelogues })
            })
    }

    removeMonument = (e, id) => {
        if (this.state.favorites.find(mon => mon.monument_id === id)) {
            let removed = this.state.favorites.find(mon => mon.monument_id === id).id

            fetch(`http://localhost:3000/favorites/${removed}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    Accept: 'application/json'
                }
            }).then(resp => resp.json())
                .then(data => {

                    let filteredArr = this.state.favorites.filter(mon => mon.id !== data.id)
                    this.setState({ favorites: filteredArr })
                })
        }
    }

    render() {
     
        return (

            <Grid columns='equal'>
                <Grid.Row stretched >
                    <Grid.Column width={0}>
                    </Grid.Column>
                    <Grid.Column width={8} >
                        <Segment >
                            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                   
                        <Segment>
                            {this.state.favorites ? 
                            <List celled divided verticalAlign='middle'>
                            {this.state.favorites.map(fav =>
                                <List.Item>
                                    <List.Content floated='right'>
                                        <Button basic color = 'black'>Remove</Button>
                                    </List.Content>
                                        <Image avatar src={logo} />
                                   
                                        <List.Content>
                                        <List.Header>{fav.name}</List.Header>
                                        {fav.symbol_type}
                                        </List.Content>
                                </List.Item>)}
                            </List> : 'You have no monuments listed'}
                        </Segment>
                        <Segment>2</Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    {/* <Grid.Column>
                        <Segment>1</Segment>
                        <Segment>2</Segment>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Segment>
                            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>1</Segment>
                        <Segment>2</Segment>
                    </Grid.Column> */}
                </Grid.Row>
            </Grid>



            //     <List divided verticalAlign='middle'>
            //     <List.Item>
            //       <List.Content floated='right'>
            //         <Button>Remove</Button>
            //       </List.Content>
            //       <Image avatar src={logo} />
            //       {this.state.favorites.map(fav => 
            //       <List.Content>{fav.name}</List.Content>)}
            //     </List.Item>
            //   </List>

            // <div>

            //     <span>This is {this.props.name}'s page</span>
            //    <span> Favorite monuments: {this.state.favorites.map(fav => <p>{fav.name}</p>)}</span>
            // </div>
        )
    }
}

// export default withRouter(UserProfile)
