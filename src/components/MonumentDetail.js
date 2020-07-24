import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Button, Image, List, Grid, Segment, Icon, Divider, Header, Table } from 'semantic-ui-react'
import logo from '../images/fadedmon.png'
import './component.css'
import mon from '../images/fadedmon.png'


class MonumentDetail extends Component {

    render() {
        
        let monument_id = this.props.match.params.id
        let monument = this.props.monuments.find(mon => mon.id === parseInt(monument_id))

        return (
            <Grid columns='equal'>
            <Grid.Row stretched >
                <Grid.Column width={0}>
                </Grid.Column>
                <Grid.Column width={8} >
                    <Segment >
                         <Button icon='edit outline' floated='right' />
                            <Image src={mon} size='small' circular />
                        <Divider horizontal>
                            <Header as='h3'>
                             {monument.name}
                            </Header>
                        </Divider>
        
                        <Table definition>
                            <Table.Body>
                            {monument.year_dedicated ? 
                                <Table.Row>
                                    <Table.Cell width={5}>Year Dedicated</Table.Cell>
                                    <Table.Cell>{monument.year_dedicated}</Table.Cell>
                                </Table.Row> : null} 
                               {monument.year_removed ? 
                                <Table.Row>
                                    <Table.Cell>Year Removed</Table.Cell>
                                    <Table.Cell>{monument.year_removed}</Table.Cell>
                                </Table.Row> : null}
                                {monument.honorees ?  
                                <Table.Row>
                                    <Table.Cell>Honorees</Table.Cell>
                                    <Table.Cell>{monument.honorees}</Table.Cell>
                                </Table.Row> : null}
                                <Table.Row>
                                    <Table.Cell>County, City, State</Table.Cell>
                                    <Table.Cell>{monument.county}, {monument.city}, {monument.state}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Symbol Type</Table.Cell>
                                    <Table.Cell>{monument.symbol_type}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Sponsors</Table.Cell>
                                    <Table.Cell>{monument.sponsors}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Tracking Status</Table.Cell>
                                    <Table.Cell>{monument.tracking_status}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Segment>
                </Grid.Column>
                <Grid.Column>

                    {/* <Header as='h5' attached='top'>
                        Featured Blogs
                    </Header>
                    <Segment attached style={{ overflow: 'auto', maxHeight: 250 }}>
                        {this.props.monuments.length === 0 ?
                            <List><List.Content><List.Header><b>There are no associated blogs</b></List.Header></List.Content></List> :
                            <List celled divided verticalAlign='middle'>
                                {this.props.monuments.map(mon =>
                                    <List.Item>
                                        <List.Content floated='right'>
                                            <Icon
                                                 />
                                        </List.Content>
                                        <Image  />
                                        <List.Content>
                                            <Link to>
                                                {mon.name.split('').length > 45 ?
                                                    <List.Header className='Title'>{mon.name.substring(0, 45) + '...'}</List.Header> :
                                                    <List.Header className='Title'>{mon.name}</List.Header>}
                                            </Link>
                                            {mon.symbol_type}
                                        </List.Content>
                                    </List.Item>)}
                            </List>}
                    </Segment> */}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
     
        )
    }
}

export default withRouter(MonumentDetail)
