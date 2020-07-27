import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import TravelogueForm from './TravelogueForm'
import { Dropdown, TextArea, Form, Modal, Button, Image, List, Grid, Segment, Icon, Divider, Header, Table } from 'semantic-ui-react'
import logo from '../images/fadedmon.png'
import './component.css'
import user from '../images/user.png'

class UserProfile extends Component {

    state = {
        newTravel: {
            title: '',
            blog: ''
        },
        travelogues: [],
        favoriteMons: [],
        favoriteID: [],
        modal: false,
        bio: '',
        user_location: '',
        interests: '',
        options: [
            {
                key: 0, text: '', value: ''
            }
        ]
    }

    componentDidMount() {
        fetch(`http://localhost:3000/users/${this.props.currentUser}`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    favoriteMons: data.monuments,
                    travelogues: data.travelogues,
                    favoriteID: data.favorites,
                    about: data.about,
                    user_location: data.location,
                    interests: data.interests,
                    options: data.monuments.map(fav => { return { key: fav.id, text: fav.name, value: fav.name } })
                })
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

                let filteredArr = this.state.favoriteID.filter(fav => fav.id !== data.id)
                let filteredMons = this.state.favoriteMons.filter(fav => fav.id !== data.monument_id)
                this.setState({ favoriteID: filteredArr, favoriteMons: filteredMons })
            })
    }

    removeTravelogue = (e, id) => {
        // console.log('removing')
        fetch(`http://localhost:3000/travelogues/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                Accept: 'application/json'
            }
        }).then(resp => resp.json())
            .then(data => {
                let filteredArr = this.state.travelogues.filter(trav => trav.id !== data.id)
                this.setState({ travelogues: filteredArr })
            })
    }

    editTravelogue = (e, id) => {
        console.log('updating')
    }


    handleSubmit = (e) => {
        e.preventDefault()
        let { title, blog } = this.state.newTravel
        // let {monument_id, travelogue_id} = this.state.favoriteID
        fetch('http://localhost:3000/travelogues', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json'
            },
            body: JSON.stringify({
                title: title,
                blog: blog,
                user_id: this.props.currentUser
            })
        }).then(resp => resp.json())
            .then(data =>
                this.setState({ travelogues: [...this.state.travelogues, data], modal: false, newTravel: { title: '', blog: '' } }))

    }



    handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        this.setState({ newTravel: { ...this.state.newTravel, [name]: value } })
        // this.setState({ newTravel: {...this.state.newTravel}, [name]: value })
    }

    render() {

        return (

            <Grid columns='equal'>
                <Grid.Row style={{ marginTop: '20px' }} stretched >
                    <Grid.Column width={8} >
                        <Segment style={{ marginLeft: '50px' }}>
                            {this.props.currentUser ?
                                <Button icon='edit outline' floated='right' /> : null}
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
                                        <Table.Cell>{this.state.about}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Location</Table.Cell>
                                        <Table.Cell>{this.state.user_location}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Interests</Table.Cell>
                                        <Table.Cell>{this.state.interests}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>

                        <Header as='h5' attached='top' style={{ maxHeight: 50 }}>
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

                        <Header as='h5' attached='top' style={{ maxHeight: 50 }}>
                            Travelogues
                            <Modal as={Form}
                                open={this.state.modal}
                                onClose={() => this.setState({ modal: false })}
                                style={{ overflow: 'auto', position: 'relative', paddingTop: '25px', paddingRight: '115px', backgroundColor: '#c8d3d4' }}
                                trigger={<Button
                                    onClick={() => this.setState({ modal: true })}
                                    size='mini'
                                    floated='right'
                                    basic>Create</Button>}>
                                        <TravelogueForm 
                                        handleChange = {this.handleChange}
                                        handleChange = {this.handleSubmit}
                                        newTravel = {this.state.newTravel}
                                        name = {this.props.name}
                                        options = {this.state.options}
                                        />
                                {/* <Grid columns='equal'>

                                    <Grid.Row stretched >

                                        <Grid.Column width={3}>
                                        </Grid.Column>
                                        <Grid.Column width={13} >
                                            <Segment >
                                                <Divider horizontal>
                                                    <Header as='h3'>
                                                        {this.props.name.split(' ')[0]}, what do you want to write?
                                                    </Header>
                                                </Divider>
                                            </Segment>
                                            <Segment attached style={{ overflow: 'auto', maxHeight: 500 }}>
                                                <Form onSubmit={this.handleSubmit}>
                                                

                                                    <Dropdown placeholder='Tag Monuments' fluid multiple selection options={this.state.options} />
                                                    <br />
                                                    <br />
                                                    <Form.Input required fluid
                                                        label='Title'
                                                        placeholder='Title'
                                                        name='title'
                                                        value={this.state.newTravel.title}
                                                        onChange={this.handleChange}
                                                    />

                                                    <Form.Field required
                                                        name='blog'
                                                        control={TextArea}
                                                        label='Travelogue'
                                                        value={this.state.newTravel.blog}
                                                        onChange={this.handleChange}
                                                        placeholder='Start writing...'
                                                    />

                                                    <Form.Field control={Button}>Submit</Form.Field>
                                                </Form>
                                            </Segment>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid> */}

                            </Modal>
                        </Header>
                        <Segment attached style={{ overflow: 'auto', maxHeight: 250 }}>
                            {this.state.travelogues.length === 0 ?
                                <List><List.Content><List.Header><b>You have no blogs yet</b></List.Header></List.Content></List> :
                                <List celled divided verticalAlign='middle'>
                                    {this.state.travelogues.map(logs =>
                                        <List.Item>
                                            <List.Content floated='right'>

                                                {this.props.currentUser ?
                                                    <Icon
                                                        className='Edit'
                                                        name='edit outline'
                                                        onClick={(e) => { this.editTravelogue(e) }} /> : null}


                                                {this.props.currentUser ?
                                                    <Modal
                                                        style={{ position: 'relative', paddingTop: '100px' }}
                                                        basic size='small'

                                                        trigger={<Icon
                                                            className='Delete'

                                                            name='delete' />}

                                                    >
                                                        <Header content='Delete Post' />
                                                        <Modal.Content>
                                                            <p>
                                                                Are you sure you want to delete this post?
                                                            </p>
                                                        </Modal.Content>

                                                        <Modal.Actions>
                                                            <Button
                                                                onClick={(e) => this.removeTravelogue(e, logs.id)}
                                                                color='green' inverted>
                                                                <Icon name='checkmark' /> Yes
                                                  </Button>
                                                        </Modal.Actions>
                                                    </Modal>
                                                    : null}
                                            </List.Content>
                                            <Image avatar src={'https://react.semantic-ui.com/images/wireframe/paragraph.png'} />

                                            <Modal style={{ overflow: 'auto', position: 'relative', paddingTop: '25px', paddingRight: '115px', backgroundColor: '#c8d3d4' }} trigger={
                                                <List.Content>

                                                    {logs.title.split('').length > 45 ?
                                                        <List.Header className='Title'>{logs.title.substring(0, 45) + '...'}</List.Header> :
                                                        <List.Header className='Title'>{logs.title}</List.Header>}

                                                    {logs.blog.split('').length > 45 ? <List.Content>{logs.blog.substring(0, 45) + '...'} </List.Content> : <List.Content> {logs.blog} </List.Content>}
                                                </List.Content>}>
                                                <Grid columns='equal'>

                                                    <Grid.Row stretched >

                                                        <Grid.Column width={3}>



                                                        </Grid.Column>
                                                        <Grid.Column width={13} >
                                                            <Segment >

                                                                <Divider horizontal>
                                                                    <Header as='h3'>
                                                                        {logs.title}
                                                                        <Header.Subheader>by {this.props.name}</Header.Subheader>
                                                                    </Header>
                                                                </Divider>
                                                            </Segment>
                                                            <Segment attached style={{ overflow: 'auto', maxHeight: 250 }}>
                                                                <span style={{ color: 'black' }}>{logs.blog}</span>
                                                            </Segment>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </Modal>
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
