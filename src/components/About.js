import React, { Component } from 'react'
import { Grid, Segment, Header, Divider } from 'semantic-ui-react'



export default class About extends Component {
    render() {
        return (
            <Grid columns='equal'>
                <Grid.Row style={{ marginTop: '20px' }} stretched >
                    <Grid.Column width={14} >
                        <Segment style={{ marginLeft: '150px', height: '400px' }} >

                            <Divider horizontal>
                                <Header as='h3'>
                                    Monuments
                                </Header>
                            </Divider>
                            <br />
                            <br />
                            <span>A site where users can visualize and critically reflect on the current landscape of confederate monuments in the United States.
                               The data comes from the Southern Poverty Law Center's <a href='https://www.splcenter.org/20190201/whose-heritage-public-symbols-confederacy' target='_blank' rel="noopener noreferrer" >Whose Heritage Project</a>, which
                               is vetted and updated on a daily basis.
                               <br />
                            </span>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        )
    }
}
