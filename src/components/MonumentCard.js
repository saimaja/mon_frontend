import React, { Component } from 'react'
import { Card, Button, Icon } from 'semantic-ui-react'
// import {Card} from 'react-bootstrap' 
import { withRouter } from 'react-router-dom'
import logo from '../images/card.png'
import './component.css'

class MonumentCard extends Component {
    render() {
        return (
           
                <Card.Group >
                <Card style={{height: '250px'}} >
                  <Card.Content>
                {/* <Icon floated='right' name = 'building outline'/> */}
                    <Card.Header>{this.props.monument.name ? this.props.monument.name.substring(0, 55) : null}</Card.Header>
                 
                    <Card.Meta>
                        {this.props.monument.year_dedicated ? 
                        <span className = 'date'>Dedicated: {this.props.monument.year_dedicated}</span>  
                        : null}
                        <br/>
                        {this.props.monument.year_removed ? 
                        <span className = 'date'>Removed: {this.props.monument.year_removed}</span> 
                        : null}
                        {this.props.monument.city}, {this.props.monument.state}
                    </Card.Meta>
                    <Card.Description> <span className = 'date'>Honoree: {this.props.monument.honorees}</span></Card.Description>
                    </Card.Content>
                    {/* <Card.Content extra>
                    {this.props.monument.city}, {this.props.monument.state}
                    </Card.Content> */}
                    <Card.Content extra>
                        <Button basic color ='black' fluid>Add</Button>
                    </Card.Content>
                </Card>
            </Card.Group>
        )
    }
}

export default withRouter(MonumentCard)
