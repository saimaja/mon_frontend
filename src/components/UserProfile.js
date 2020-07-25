import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Dropdown, Accordion, Checkbox, Select, TextArea, Form, Modal, Button, Image, List, Grid, Segment, Icon, Divider, Header, Table } from 'semantic-ui-react'
import logo from '../images/fadedmon.png'
import './component.css'
import user from '../images/user.png'

// let options = [
//     { key: 'angular', text: 'Angular', value: 'angular' },
//     { key: 'css', text: 'CSS', value: 'css' },
//     { key: 'design', text: 'Graphic Design', value: 'design' },
//     { key: 'ember', text: 'Ember', value: 'ember' },
//     { key: 'html', text: 'HTML', value: 'html' },
//     { key: 'ia', text: 'Information Architecture', value: 'ia' },
//     { key: 'javascript', text: 'Javascript', value: 'javascript' },
//     { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
//     { key: 'meteor', text: 'Meteor', value: 'meteor' },
//     { key: 'node', text: 'NodeJS', value: 'node' },
//     { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
//     { key: 'python', text: 'Python', value: 'python' },
//     { key: 'rails', text: 'Rails', value: 'rails' },
//     { key: 'react', text: 'React', value: 'react' },
//     { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
//     { key: 'ruby', text: 'Ruby', value: 'ruby' },
//     { key: 'ui', text: 'UI Design', value: 'ui' },
//     { key: 'ux', text: 'User Experience', value: 'ux' },
//   ]

class UserProfile extends Component {

    state = {
        travelogues: [],
        favoriteMons: [],
        favoriteID: [],
        bio: '',
        user_location: '',
        interests: '',
        activeIndexes: [], 
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
                    interests: data.interests })
            })
    }

    // options = () => {
       
    //     let fav = this.state.favoriteMons.map(fav => fav)
    //     this.setState({options: {key: fav.id, text: fav.name, value: fav.name}})
    // }

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


    handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const { activeIndexes } = this.state;
        const newIndex = activeIndexes;

        const currentIndexPosition = activeIndexes.indexOf(index);
        if (currentIndexPosition > -1) {
            newIndex.splice(currentIndexPosition, 1);
        } else {
            newIndex.push(index);
        }

        this.setState({ activeIndexes: newIndex });
    };


    render() {

        const { activeIndexes } = this.state;

        return (

            <Grid columns='equal'>
                <Grid.Row stretched >
                    <Grid.Column width={0}>
                    </Grid.Column>
                    <Grid.Column width={8} >
                        <Segment >
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
                            <Modal as={Form}
                                style={{ position: 'relative', paddingTop: '25px', paddingRight: '115px', backgroundColor: '#c8d3d4' }}
                                trigger={<Button
                                    floated='right'
                                    icon='add square' />}>
                                <Grid columns='equal'>

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
                                                <Form>
                                                    {/* <Form.Group widths='equal'> */}
                                                   

                                                    <Dropdown placeholder='Tag Monuments' fluid multiple selection options={this.state.favoriteMons.map(fav => 
                                                        [{key: fav.id, value: fav.name, text: fav.name}])} />

                                                    {/* <Dropdown
                                                        placeholder='Tag Monuments'
                                                        fluid selection>

                                                        {<Dropdown.Menu>
                                                            <Form>
                                                                {this.state.favoriteMons.map(fav => {
                                                                    return <Form.Field key={fav.id}>
                                                                        <Checkbox
                                                                            label={fav.name}
                                                                        //   onChange={this.props.toggleCategory}
                                                                        //   checked={this.props.checkedCats[`${fav.name}`]}
                                                                        />
                                                                    </Form.Field>
                                                                }
                                                                )}
                                                            </Form>
                                                        </Dropdown.Menu>}
                                                    </Dropdown> */}


                                                    {/* <Dropdown
                                                            placeholder='Tag Monuments' fluid selection>
                                                        
                                                            <Dropdown.Menu>
                                                            {this.state.favoriteMons.map(mon =>
                                                                <Dropdown.Item text={mon.name} />)}
                                                            </Dropdown.Menu>


                                                        </Dropdown> */}



                                                    {/* </Form.Group> */}
                                                    <br />
                                                    <br />
                                                    <Form.Input required fluid label='Title' placeholder='Title' />

                                                    <Form.Field required
                                                        control={TextArea}
                                                        label='Travelogue'
                                                        placeholder='Start writing...'
                                                    />

                                                    <Form.Field control={Button}>Submit</Form.Field>
                                                </Form>
                                            </Segment>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                            </Modal>
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
                                                {this.props.currentUser ?

                                                    <Icon
                                                        className='Edit'
                                                        name='edit outline' /> : null}
                                            </List.Content>
                                            <Image avatar src={'https://react.semantic-ui.com/images/wireframe/paragraph.png'} />

                                            <Modal style={{ position: 'relative', paddingTop: '25px', paddingRight: '115px', backgroundColor: '#c8d3d4' }} trigger={
                                                <List.Content>
                                                    {/* <Link to={`/travelogues/${logs.id}`}> */}

                                                    {logs.title.split('').length > 45 ?
                                                        <List.Header className='Title'>{logs.title.substring(0, 45) + '...'}</List.Header> :
                                                        <List.Header className='Title'>{logs.title}</List.Header>}
                                                    {/* </Link> */}
                                                    {logs.blog.split('').length > 45 ? <List.Content>{logs.blog.substring(0, 45) + '...'} </List.Content> : <List.Content> {logs.blog} </List.Content>}
                                                </List.Content>}>
                                                <Grid columns='equal'>

                                                    <Grid.Row stretched >

                                                        <Grid.Column width={3}>
                                                        </Grid.Column>
                                                        <Grid.Column width={13} >
                                                            <Segment >

                                                                {/* {this.props.admin ?
                              <Button icon='edit outline' floated='right' /> : null} */}
                                                                {/* <Image src={mon} size='small' circular /> */}
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
