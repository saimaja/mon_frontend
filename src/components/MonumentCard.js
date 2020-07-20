import React, { Component } from 'react'
// import { Card, Icon, Image } from 'semantic-ui-react'
import {Card} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import logo from '../images/card.png'
import './component.css'

class MonumentCard extends Component {
    render() {
        return (
           
                <Card className='bg-dark' >
                <Card.Img src={logo} alt='Card Image'/>
                    <Card.ImgOverlay>
                    <Card.Title>{this.props.monument.name}</Card.Title>
                    <Card.Text>
                        <span className = 'date'>Honoree: {this.props.monument.honorees}</span>
                        <br/>
                        {this.props.monument.year_dedicated ? 
                        <span className = 'date'>Year Dedicated: {this.props.monument.year_dedicated}</span>  
                        : null}
                        <br/>
                        {this.props.monument.year_removed ? 
                        <span className = 'date'>Year Removed: {this.props.monument.year_removed}</span> 
                        : null}
                    </Card.Text>
                </Card.ImgOverlay>
            </Card>
        )
    }
}

export default withRouter(MonumentCard)
