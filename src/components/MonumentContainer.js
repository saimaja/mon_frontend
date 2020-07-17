import React, { Component } from 'react'
import MonumentCard from './MonumentCard'
import { Grid } from 'semantic-ui-react'

export default class MonumentContainer extends Component {
    render() {
        return (
            <div>
                <Grid columns={4} relaxed style={{ paddingRight: 0 }}>
                    {this.props.monuments.map(monument =>
                        <Grid.Column mobile={16} tablet={8} computer={4}><MonumentCard key={monument.id} monument={monument} /></Grid.Column>)}
                </Grid>
            </div>
        )


    }
}
