import React, { Component } from 'react'
import MonumentCard from './MonumentCard'
import { Container, Divider, Grid } from 'semantic-ui-react'
import Pagination from './Pagination'
import './component.css'


export default class MonumentContainer extends Component {

    state = {
        monumentsPerPage: 20,
        currentPage: 1,
        added: [],
    }

    paginate = (pageNumber) => {
        this.setState({ currentPage: pageNumber })
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

        const indexOfLastMonument = this.state.currentPage * this.state.monumentsPerPage;
        const indexOfFirstMonument = indexOfLastMonument - this.state.monumentsPerPage;
        const currentMonuments = containerMon.slice(indexOfFirstMonument, indexOfLastMonument)

        let results
       if (this.props.filter === 'removed') {
        results = <span>Monuments that have been removed: {containerMon.length}</span>;
       }else if (this.props.filter === 'renamed') {
        results = <span>Monuments that have been renamed: {containerMon.length}</span>;
       } else {
        results = <span>All Monuments: {containerMon.length}</span>;
       }
       console.log('results', results)
        if (this.props.monuments.length > 0) {
            return (

                <Container>
                    <Divider hidden />
                    <br />
                   
                    {results}

                    <Grid className='card-padding' relaxed columns={4} divided>
                        {currentMonuments.map(monument =>
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
                    <br />
                    <Pagination
                        monumentsPerPage={this.state.monumentsPerPage}
                        totalMonuments={this.props.monuments.length}
                        currentPage={this.state.currentPage}
                        paginate={this.paginate} />

                </Container>
            )
        }

    }
}
