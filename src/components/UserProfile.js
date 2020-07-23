import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Button, Image, List, Grid, Segment } from 'semantic-ui-react'
import logo from '../images/fadedmon.png'
import './component.css'

export default class UserProfile extends Component {

    state = {
        travelogues: [],
        favoriteMons: [], 
        favoriteID: []
    }

    componentDidMount() {
        fetch(`http://localhost:3000/users/${this.props.currentUser}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data.monuments, data.travelogues, data.favorites)
                this.setState({ favoriteMons: data.monuments, travelogues: data.travelogues, favoriteID: data.favorites })
            })
    }

    removeFavorite = (e, monID) => {
        let favID = this.state.favoriteID.find(fav => fav.monument_id === monID).id
        console.log('removing')
        fetch(`http://localhost:3000/favorites/${favID}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                Accept: 'application/json'
            }
        }).then(resp => resp.json())
            .then(data => {
                console.log('this is the data', data)

                let filteredArr = this.state.favoriteID.filter(fav => fav.id !== data.id)
                let filteredMons = this.state.favoriteMons.filter(fav => fav.id !== data.monument_id)
                this.setState({ favoriteID: filteredArr, favoriteMons: filteredMons })
            })
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
                            {this.state.favoriteMons ?
                                <List celled divided verticalAlign='middle'>
                                    {this.state.favoriteMons.map(fav =>
                                        <List.Item>
                                            <List.Content floated='right'>
                                                <Button onClick={(e) => this.removeFavorite(e, fav.id)}
                                                basic color='black'>Remove</Button>
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
