import React, { Component } from 'react'
import MonumentCard from './MonumentCard'
import { Container, Divider, Segment, Grid } from 'semantic-ui-react'

export default class MonumentContainer extends Component {
    render() {
        console.log('what is props', this.props.monuments)
        // let containerMon = this.props.monuments.filter(
        //     mon => mon.name.toLowerCase().includes(this.props.searchField.toLowerCase()) 
        //   )
        return (
            
                <Container>
                <Divider hidden/>
                <Grid className='card-padding' relaxed columns={3} divided>
                    {this.props.monuments.map(monument =>
                        <Grid.Column><MonumentCard key={monument.id} monument={monument} /></Grid.Column>)}
                </Grid>
                </Container>
           
        )


    }
}
