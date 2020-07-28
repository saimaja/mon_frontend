import React, { Component } from 'react'
import EditTravelogue from './EditTravelogue'
import { Form, Modal, Icon } from 'semantic-ui-react'
import './component.css'

export default class EditModal extends Component {

    state = {
        editModal: null,
        editTravel: {
            title: '', 
            blog: ''
        }, 
        tags: []

    }

    handleSubmit = (e) => {
        e.preventDefault()
        let { title, blog } = this.state.editTravel

        fetch(`http://localhost:3000/travelogues/${this.props.travelogueID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json'
            },
            body: JSON.stringify({
                title: title,
                blog: blog,
                user_id: this.props.currentUser,
                monument_ids: this.props.tags
            })
        }).then(resp => resp.json())
            .then(data =>
                this.setState({ travelogues: [...this.state.travelogues, data], createModal: false, options: [], tags: [], editTravel: { title: '', blog: '' } }))

    }

    handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        this.setState({ editTravel: { ...this.state.editTravel, [name]: value } })
    }

    render() {

        return (
            <Modal as={Form}

                open={this.state.editModal === this.props.travelogueID}
                onClose={() => this.setState({ editModal: null })}
                style={{ overflow: 'auto', position: 'relative', paddingTop: '25px', paddingRight: '115px', backgroundColor: '#c8d3d4' }}
                trigger={<Icon
                    onClick={() => {
                        console.log('is this working')
                        this.setState({ editModal: this.props.travelogueID })
                    }}
                    className='Edit'
                    name='edit outline' />}>
                <EditTravelogue

                    name={this.props.name}
                    // handleChange={this.props.handleChange}
                    // handleSubmit={this.props.handleSubmit}
                    options={this.props.options}
                    newTravel={this.props.newTravel}
                    editTravelogue={this.props.editTravelogue}

                />
            </Modal>
        )
    }
}
