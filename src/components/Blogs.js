import React, { Component } from 'react'
import { List, Image, Grid, Segment, Header, Divider } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'
import './component.css'


class Blogs extends Component {

    state = {
        travelogues: [],
        users: []
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
                this.setState({ users: data })
            )
    }

    // author = () => {
    //     let author
    //     let travel_id = this.state.travelogues.map(travel => travel.user_id) 
    //     let user_id = this.state.users.find(user => user.id)
    //     if (travel_id === user_id) {
    //         author = this.state.users.
    //     }
    //     this.setState({ author: author })
    // }




    render() {
        // debugger
        // let author = this.state.travelogues.map(trav => {
        //     let travelID = trav.user_id
        //     let name
        //     this.state.users.map(user => {
        //         if (travelID === user.id) {
        //             name = user.name
        //         }
        //     })

        //     return name
        // })

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
                         <Link to={`/travelogues/${log.id}`}>
                            <Segment className='Grey' color = 'grey'style={{ marginLeft: '150px', height: '75px' }}>
                                <List>

                                    <List.Item>
                                        <Image avatar src={'https://react.semantic-ui.com/images/wireframe/paragraph.png'} />
                                        <List.Content>
                                           
                                                {log.title.split('').length > 75 ?
                                                    <List.Header className='Title'>{log.title.substring(0, 75) + '...'}</List.Header> :
                                                    <List.Header className='Title'>{log.title}</List.Header>}
                                            {/* <span>by {author}</span> */}
                                           <span style={{color: 'grey'}}>{log.blog.split('').length > 80 ? <span>{log.blog.substring(0, 80) + '...'} </span> : <span> {log.blog} </span>}</span> 
                                            <br />
                                            <span style={{ color: 'white' }}>Posted on: {new Date(log.created_at).toString().split(' ').splice(0, 4).join(' ')}</span>
                                        </List.Content>
                                    </List.Item>
                                </List>


                            </Segment><br/></Link>)}
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        )
    }
}

export default withRouter(Blogs)