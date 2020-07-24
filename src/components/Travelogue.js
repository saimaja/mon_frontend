import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Button, Image, List, Grid, Segment, Icon, Divider, Header, Table } from 'semantic-ui-react'
import './component.css'
import mon from '../images/fadedmon.png'

class Travelogue extends Component {

    state = {
        travelogues: []
    }

    componentDidMount() {
        let id = parseInt(this.props.match.params.id)
        fetch(`http://localhost:3000/travelogues/${id}`)
            .then(resp => resp.json())
            .then(data => { 
                this.setState({ travelogues: data })
            })
    }

    render() {
        return (
            <div></div>
            // <Grid columns='equal'>
            //      <Grid.Row stretched >
            //         <Grid.Column width={3}>
            //         </Grid.Column>
            //         <Grid.Column width={10} >
            //         {this.state.travelogues.map(log => 
            //             <Segment >
            //                 {this.props.admin ?
            //                     <Button icon='edit outline' floated='right' /> : null}
            //                 <Image src={mon} size='small' circular />
            //                 <Divider horizontal>
            //                     <Header as='h3'>
            //                         {log.title}
            //                     </Header>
            //                 </Divider>

                            
            //             </Segment>)}
            //             {/* <Header as='h5' attached='top'>
            //                 Blogs about this monument
            //         </Header>
            //             <Segment attached style={{ overflow: 'auto', maxHeight: 250 }}>
            //                 {this.state.travelogues.length === 0 ?
            //                     <List><List.Content><List.Header><b>There aren't any blogs about this monument yet</b></List.Header></List.Content></List> :
            //                     <List celled divided verticalAlign='middle'>
            //                         {this.state.travelogues.map(logs =>
            //                             <List.Item>
            //                                 <List.Content floated='right'>
            //                                     <Icon

            //                                     />
            //                                 </List.Content>
            //                                 <Image avatar src={'https://react.semantic-ui.com/images/wireframe/paragraph.png'} />
            //                                 <List.Content>
            //                                     <Link to={`/travelogues/${logs.id}`}>
            //                                         {logs.title.split('').length > 45 ?
            //                                             <List.Header className='Title'>{logs.title.substring(0, 45) + '...'}</List.Header> :
            //                                             <List.Header className='Title'>{logs.title}</List.Header>}
            //                                     </Link>
            //                                     {logs.blog.split('').length > 100 ? <List.Content>{logs.blog.substring(0, 100) + '...'} </List.Content> : <List.Content> {logs.blog} </List.Content>}
            //                                 </List.Content>
            //                             </List.Item>)}
            //                     </List>}
            //             </Segment>
            //         </Grid.Column>
            //         <Grid.Column> */}


            //          </Grid.Column>
            //      </Grid.Row> 
            // </Grid>
        )
    }
}

export default withRouter(Travelogue)
