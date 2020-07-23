import React, { Component } from 'react'
import MonumentCard from './MonumentCard'
import { Container, Divider, Grid } from 'semantic-ui-react'
import './component.css'


export default class MonumentContainer extends Component {

    state = {
        added: [],
    }

    componentDidMount() {
        fetch(`http://localhost:3000/users/${this.props.currentUser}`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({ added: data.favorites })
            })
    }

    addMonument = (e, id) => {
        // console.log(this.props.currentUser, id)

        fetch('http://localhost:3000/favorites', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                user_id: this.props.currentUser,
                monument_id: id
            })
        }).then(resp => resp.json())
            .then(data => {
                // let addedMon = {...this.state.added, data}
                this.setState({ added: [...this.state.added, data] })
            }
            )
    }

    removeMonument = (e, id) => {
        if (this.state.added.find(mon => mon.monument_id === id)) {
            let removed = this.state.added.find(mon => mon.monument_id === id).id

            fetch(`http://localhost:3000/favorites/${removed}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    Accept: 'application/json'
                }
            }).then(resp => resp.json())
                .then(data => {

                    let filteredArr = this.state.added.filter(mon => mon.id !== data.id)
                    this.setState({ added: filteredArr })
                })
        }
    }

    isAdded = (id) => {
        return this.state.added.map(mon => mon.monument_id).includes(id)
    }

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
                            <Grid.Column>
                                <MonumentCard
                                    key={monument.id}
                                    monument={monument}
                                    currentUser={this.props.currentUser}
                                    isAdded={this.isAdded(monument.id)}
                                    addMon={this.addMonument}
                                    removeMon={this.removeMonument}
                                />
                            </Grid.Column>)}
                    </Grid>

                </Container>
            )
        }

    }
}
