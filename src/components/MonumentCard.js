import React, { Component } from 'react'
import { Card, Button, Icon } from 'semantic-ui-react'
// import {Card} from 'react-bootstrap' 
import { withRouter } from 'react-router-dom'
import logo from '../images/card.png'
import './component.css'


class MonumentCard extends Component {


    // toggleAdd = (e) => {

    // }

   


    render() {
        return (
           
                <Card.Group >
                <Card style={{height: '265px'}} >
                  <Card.Content>
                    <Card.Header>{this.props.monument.name ? this.props.monument.name.substring(0, 42) + '..' : null}</Card.Header>
                 
                    <Card.Meta>
                        {this.props.monument.year_dedicated ? 
                        <span className = 'date'>Year Dedicated: {this.props.monument.year_dedicated}</span>  
                        : null}
                        <br/>
                        {this.props.monument.year_removed ? 
                        <span className = 'date'>Year Removed: {this.props.monument.year_removed}</span> 
                        : null}
                       
                        <div>{this.props.monument.city}, {this.props.monument.state}</div>
                    </Card.Meta>
                    {this.props.monument.honorees ? 
                    <Card.Description> <span className = 'date'>Honoree: {this.props.monument.honorees}</span></Card.Description>
                    : null}
                    </Card.Content>
                    <Card.Content extra>
                        {this.props.isAdded ? 
                        <Button 
                        onClick={(e) => {this.props.removeMon(e, this.props.monument.id)}}
                        basic color ='black' fluid>Remove</Button> :
                         <Button 
                        onClick={(e) => {this.props.addMon(e, this.props.monument.id)}}
                        basic color ='black' fluid>Add</Button>}
                    
                    </Card.Content>
                </Card>
            </Card.Group>
        )
    }
}

export default withRouter(MonumentCard)
