import React, { Component } from 'react'
import { Dropdown, TextArea, Form, Button, Grid, Segment, Divider, Header } from 'semantic-ui-react'
import './component.css'


export default class EditTravelogue extends Component {


    render() {
        return (
            <Grid columns='equal'>

                <Grid.Row stretched >

                    <Grid.Column width={3}>
                    </Grid.Column>
                    <Grid.Column width={13} >
                        <Segment >
                            <Divider horizontal>
                                <Header as='h3'>
                                    {this.props.name.split(' ')[0]}, what do you want to edit?
                                </Header>
                            </Divider>
                        </Segment>
                        <Segment attached style={{ overflow: 'auto', maxHeight: 500 }}>
                            <Form onSubmit={this.props.editTravelogue}>


                                <Dropdown placeholder='Tag Monuments' fluid multiple selection options={this.props.options} />
                                <br />
                                <br />
                                <Form.Input required fluid
                                    label='Title'
                                    placeholder='Title'
                                    name='title'
                                    value={this.props.newTravel.title}
                                    onChange={this.props.handleChange}
                                />

                                <Form.Field required
                                    name='blog'
                                    control={TextArea}
                                    label='Travelogue'
                                    value={this.props.newTravel.blog}
                                    onChange={this.props.handleChange}
                                    placeholder='Start writing...'
                                />

                                <Form.Field control={Button}>Submit</Form.Field>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
