import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Button, Image, List, Grid, Segment, Icon, Divider, Header, Table } from 'semantic-ui-react'
import logo from '../images/fadedmon.png'
import './component.css'
import user from '../images/user.png'


class MonumentDetail extends Component {
    
    render() {
        return (
            <Grid columns='equal'>
            <Grid.Row stretched >
                <Grid.Column width={0}>
                </Grid.Column>
                <Grid.Column width={8} >
                    <Segment >
                        <Button icon='edit outline' floated='right' />
                        <Image />
                        <Divider horizontal>
                            <Header as='h3'>
                             
                            </Header>
                        </Divider>
                        <Table definition>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell width={2}>About</Table.Cell>
                                    <Table.Cell></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Location</Table.Cell>
                                    <Table.Cell>Washington, DC</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Interests</Table.Cell>
                                    <Table.Cell>Flags, Monuments, Coding</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Segment>
                </Grid.Column>
                <Grid.Column>

                    <Header as='h5' attached='top'>
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
                    </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
     
        )
    }
}

export default withRouter(MonumentDetail)
