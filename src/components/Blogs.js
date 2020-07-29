import React, { Component } from 'react'
import { List, Image, Grid, Segment, Header, Divider } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'
import './component.css'


class Blogs extends Component {

    state = {
        travelogues: [],
        users: [], 
        author: ''
    }

    componentDidMount() {
        fetch('http://localhost:3000/travelogues')
            .then(resp => resp.json())
            .then(data =>
                this.setState({ travelogues: data })
            )
    }

    fetchUsers = () => {
        fetch('http://localhost:3000/users')
            .then(resp => resp.json())
            .then(data => 
                this.setState({users: data})
                )
    }

    author = () => {
        let author = this.state.travelogues.map(travel => travel.user_id === this.state.users.find(user => user.id))
        this.setState({author: author})
    }




    render() {

        // let date = (this.state.travelogues.map(travel => new Date(travel.created_at).toString()))


        return (
            <Grid columns='equal'>
                <Grid.Row style={{ marginTop: '20px' }} stretched >
                    <Grid.Column width={14} >
                        <Segment style={{ marginLeft: '150px', height: '75px' }} >

                            <Divider horizontal>
                                <Header as='h3'>
                                    Blogs
                            </Header>
                            </Divider>
                           
                        </Segment>
                        {this.state.travelogues.map(log =>
                        <Segment style={{ marginLeft: '150px', height: '90px' }}>
                        <List>
                        
                                        <List.Item>
                                            <Image avatar src={'https://react.semantic-ui.com/images/wireframe/paragraph.png'} />
                                            <List.Content>
                                                <Link to={`/travelogues/${log.id}`}>
                                                    {log.title.split('').length > 45 ?
                                                        <List.Header className='Title'>{log.title.substring(0, 45) + '...'}</List.Header> :
                                                        <List.Header className='Title'>{log.title}</List.Header>}
                                                </Link>
                                                {log.blog}
                                                <br/>
                                                <span style={{color: 'grey'}}>Posted on: {new Date(log.created_at).toString()}</span>
                                            </List.Content>
                                        </List.Item>
                                        </List>
                        

                        </Segment>)}
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        )
    }
}

export default withRouter(Blogs)