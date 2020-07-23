import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react'
// import {Card} from 'react-bootstrap' 
import { withRouter } from 'react-router-dom'
// import logo from '../images/card.png'
import './component.css'


class MonumentCard extends Component {


    render() {
        return (
           
                <Card.Group >
                <Card style={{height: '265px'}} className='Change' >
                  <Card.Content onClick={() => this.props.history.push(`/monuments/${this.props.monument.id}`) }>
                    {this.props.monument.name.split('').length > 42 ?
                    <Card.Header> {this.props.monument.name.substring(0, 42) + '...'}</Card.Header> : 
                    <Card.Header> {this.props.monument.name}</Card.Header>}
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
                        basic fluid>Remove</Button> :
                         <Button 
                        onClick={(e) => {this.props.addMon(e, this.props.monument.id)}}
                        basic fluid>Add</Button>}
                    
                    </Card.Content>
                </Card>
            </Card.Group>
        )
    }
}

export default withRouter(MonumentCard)
