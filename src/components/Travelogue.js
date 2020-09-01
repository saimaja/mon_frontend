import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Grid, Segment, Divider, Header } from 'semantic-ui-react'
import './component.css'
const url = process.env.REACT_APP_MON_BACKEND || 'http://localhost:3000'

// import mon from '../images/fadedmon.png'

class Travelogue extends Component {

    state = {
        travelogue: [],
        user: []
    }

    componentDidMount() {
        let id = parseInt(this.props.match.params.id)
        fetch(`${url}/travelogues/${id}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                this.setState({ travelogue: data, user: data.user })
            })
    }

    render() {

        return (

            <Grid columns='equal'>

                <Grid.Row stretched >
                    <Divider hidden></Divider>
                    <Grid.Column width={3}>
                    </Grid.Column>
                    <Grid.Column width={10} >
                        <Segment >

                            {/* {this.props.admin ?
                            <Button icon='edit outline' floated='right' /> : null} */}
                            {/* <Image src={mon} size='small' circular /> */}
                            <Divider horizontal>
                                <Header as='h3'>
                                    {this.state.travelogue.title}
                            <Link to= {`/users/${this.state.user.id}`}> <Header.Subheader>by {this.state.user.name}</Header.Subheader></Link>
                                </Header>
                            </Divider>
                        </Segment>
                        <Segment attached style={{ overflow: 'auto', maxHeight: 350 }}>
                        <span style={{ color: 'grey' }}>Posted on: {new Date(this.state.travelogue.created_at).toString().split(' ').splice(0, 4).join(' ')}</span>
                            <br/>
                            <br/>
                             {this.state.travelogue.blog}       
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        )
    }
}

export default withRouter(Travelogue)
