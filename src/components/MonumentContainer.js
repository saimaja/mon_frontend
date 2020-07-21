import React, { Component } from 'react'
import MonumentCard from './MonumentCard'
import { Container, Divider, Grid, Segment } from 'semantic-ui-react'
import './component.css'

export default class MonumentContainer extends Component {
    render() {
        let containerMon = this.props.monuments.filter(
            mon => mon.name.toLowerCase().includes(this.props.search.toLowerCase())
        )
        if (this.props.monuments.length > 0) {
            return (

                <Container>
                    <Divider hidden />
                    <br />
                    <span>Results: {containerMon.length}</span>
                   
                        <Grid className='card-padding' relaxed columns={4} divided>
                            {containerMon.map(monument =>
                                <Grid.Column><MonumentCard key={monument.id} monument={monument} /></Grid.Column>)}
                        </Grid>
               
                </Container>
            )
        }

    }
}
