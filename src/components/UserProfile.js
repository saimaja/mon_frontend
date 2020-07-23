import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Button, Image, List, Grid, Segment } from 'semantic-ui-react'
import logo from '../images/fadedmon.png'
import './component.css'

class UserProfile extends Component {

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

                        <Segment style={{ overflow: 'auto', maxHeight: 250 }}>
                            {this.state.favoriteMons.length === 0 ?
                                <List><List.Content><List.Header><b>You have no monuments added</b></List.Header></List.Content></List> :
                                <List celled divided verticalAlign='middle'>
                                    {this.state.favoriteMons.map(fav =>
                                        <List.Item>
                                            <List.Content floated='right'>
                                                <Button onClick={(e) => this.removeFavorite(e, fav.id)}
                                                    basic color='black'>Remove</Button>
                                            </List.Content>
                                            <Image avatar src={logo} />
                                            <List.Content>
                                                <Link to={`/monuments/${fav.id}`}>
                                                    {fav.name.split('').length > 35 ?
                                                        <List.Header>{fav.name.substring(0, 35) + '...'}</List.Header> :
                                                        <List.Header>{fav.name}</List.Header>}
                                                </Link>
                                                {fav.symbol_type}
                                            </List.Content>
                                        </List.Item>)}
                                </List>}
                        </Segment>
                        <Segment style={{ overflow: 'auto', maxHeight: 250 }}>
                            {this.state.travelogues.length === 0 ?
                                <List><List.Content><List.Header><b>You have no blogs yet</b></List.Header></List.Content></List> :
                                <List celled divided verticalAlign='middle'>
                                    {this.state.travelogues.map(logs =>
                                        <List.Item>
                                            <Image avatar src={'https://react.semantic-ui.com/images/wireframe/paragraph.png'} />
                                            <List.Content>
                                                <Link to={`/travelogues/${logs.id}`}>
                                                    {logs.title.split('').length > 35 ?
                                                        <List.Header>{logs.title.substring(0, 35) + '...'}</List.Header> :
                                                        <List.Header>{logs.title}</List.Header>}
                                                </Link>
                                                {logs.blog.split('').length > 60 ? <List.Content>{logs.blog.substring(0, 60) + '...'} </List.Content> : <List.Content> {logs.blog} </List.Content>}
                                            </List.Content>
                                        </List.Item>)}
                                </List>}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                </Grid.Row>
            </Grid>
        )
    }
}

export default withRouter(UserProfile)
