import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Button, Image, List, Grid, Segment, Icon, Divider, Header, Table } from 'semantic-ui-react'
import logo from '../images/fadedmon.png'
import './component.css'
import user from '../images/user.png'

class UserProfile extends Component {

    state = {
        travelogues: [],
        favoriteMons: [],
        favoriteID: [],
        bio: ''
    }

    componentDidMount() {
        fetch(`http://localhost:3000/users/${this.props.currentUser}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data.monuments, data.travelogues, data.favorites)
                this.setState({ favoriteMons: data.monuments, travelogues: data.travelogues, favoriteID: data.favorites, bio: data.bio })
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
                            <Button icon='edit outline' floated='right' />
                            <Image src={user} size='small' circular />
                            <Divider horizontal>
                                <Header as='h3'>
                                    {this.props.name}
                                </Header>
                            </Divider>
                            <Table definition>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell width={2}>About</Table.Cell>
                                        <Table.Cell>{this.state.bio}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Location</Table.Cell>
                                        <Table.Cell>Washington, DC</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Interests</Table.Cell>
                                        <Table.Cell>Flags, Monuments, Coding</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>

                        <Header as='h5' attached='top'>
                            Featured Monuments
                        </Header>
                        <Segment attached style={{ overflow: 'auto', maxHeight: 250 }}>
                            {this.state.favoriteMons.length === 0 ?
                                <List><List.Content><List.Header><b>You have no monuments added</b></List.Header></List.Content></List> :
                                <List celled divided verticalAlign='middle'>
                                    {this.state.favoriteMons.map(fav =>
                                        <List.Item>
                                            <List.Content floated='right'>
                                                <Icon
                                                    className='Delete'
                                                    onClick={(e) => this.removeFavorite(e, fav.id)}
                                                    name='delete' />
                                            </List.Content>
                                            <Image avatar src={logo} />
                                            <List.Content>
                                                <Link to={`/monuments/${fav.id}`}>
                                                    {fav.name.split('').length > 45 ?
                                                        <List.Header className='Title'>{fav.name.substring(0, 45) + '...'}</List.Header> :
                                                        <List.Header className='Title'>{fav.name}</List.Header>}
                                                </Link>
                                                {fav.symbol_type}
                                            </List.Content>
                                        </List.Item>)}
                                </List>}
                        </Segment>

                        <Header as='h5' attached='top'>
                            Travelogues
                            <Button
                                floated='right'
                                icon='add square' />
                        </Header>
                        <Segment attached style={{ overflow: 'auto', maxHeight: 250 }}>
                            {this.state.travelogues.length === 0 ?
                                <List><List.Content><List.Header><b>You have no blogs yet</b></List.Header></List.Content></List> :
                                <List celled divided verticalAlign='middle'>
                                    {this.state.travelogues.map(logs =>
                                        <List.Item>
                                            <List.Content floated='right'>
                                                {/* <Button onClick={(e) => this.removeFavorite(e, fav.id)}
                                                    basic color='black'>Remove</Button> */}
                                                <Icon
                                                    className='Edit'
                                                    name='edit outline' />
                                            </List.Content>
                                            <Image avatar src={'https://react.semantic-ui.com/images/wireframe/paragraph.png'} />
                                            <List.Content>
                                                <Link to={`/travelogues/${logs.id}`}>
                                                    {logs.title.split('').length > 45 ?
                                                        <List.Header className='Title'>{logs.title.substring(0, 45) + '...'}</List.Header> :
                                                        <List.Header className='Title'>{logs.title}</List.Header>}
                                                </Link>
                                                {logs.blog.split('').length > 45 ? <List.Content>{logs.blog.substring(0, 45) + '...'} </List.Content> : <List.Content> {logs.blog} </List.Content>}
                                            </List.Content>
                                        </List.Item>)}
                                </List>}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default withRouter(UserProfile)
