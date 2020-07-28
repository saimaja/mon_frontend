import React, { Component } from 'react'
import EditTravelogue from './EditTravelogue'
import { Form, Modal, Icon } from 'semantic-ui-react'
import './component.css'

export default class EditModal extends Component {

    state = {
        editModal: null

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
