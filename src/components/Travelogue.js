import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {  Grid, Segment, Divider, Header } from 'semantic-ui-react'
import './component.css'
// import mon from '../images/fadedmon.png'

class Travelogue extends Component {

    state = {
        travelogue: [], 
        user: []
    }

    componentDidMount() {
        let id = parseInt(this.props.match.params.id)
        fetch(`http://localhost:3000/travelogues/${id}`)
            .then(resp => resp.json())
            .then(data => { console.log(data)
                this.setState({ travelogue: data, user: data.user})
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
                                <Header.Subheader>by {this.state.user.name}</Header.Subheader>
                            </Header>
                        </Divider>
                    </Segment>
                    <Segment attached style={{ overflow: 'auto', maxHeight: 250 }}>
                        <span>{this.state.travelogue.blog}</span>
                    </Segment>
                </Grid.Column>
                </Grid.Row>
                </Grid>
            
        )
    }
}

export default withRouter(Travelogue)
