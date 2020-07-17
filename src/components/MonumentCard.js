import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

export default class MonumentCard extends Component {
    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        {this.props.monument.name}
                    </Card.Header>
                    <Card.Meta>
                        <span className = 'date'>Honoree: {this.props.monument.honorees}</span>
                        <br/>
                        {this.props.monument.year_dedicated ? 
                        <span className = 'date'>Year Dedicated: {this.props.monument.year_dedicated}</span>  
                        : null}
                        <br/>
                        {this.props.monument.year_removed ? 
                        <span className = 'date'>Year Removed: {this.props.monument.year_removed}</span> 
                        : null}
                    </Card.Meta>
                </Card.Content>
            </Card>
        )
    }
}
