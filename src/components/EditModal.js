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
        editTags: []

    }

    componentDidMount(){
        // let log = this.props.travelogues.find(log => log.id === this.props.selectedTravel.id)
        let log = this.props.selectedTravel
        // let mt = this.props.travelogues.map(t => t.mon_travels)
        // let tagged = this.props.favMons.find(mon => mon.id === mt.monument_id)
        this.setState({editTravel: {title: log.title, blog: log.blog}, editTags: this.props.options})
    }

    handleEditSubmit = (e) => {
        e.preventDefault()
        let { title, blog } = this.state.editTravel

        fetch(`http://localhost:3000/travelogues/${this.props.selectedTravel.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json'
            },
            body: JSON.stringify({
                title: title,
                blog: blog,
                monument_ids: this.state.editTags
            })
        }).then(resp => resp.json())
            .then(data => {
                // debugger
                console.log(data)
                this.props.editTravelogue(data)
                this.setState({ editModal: false })
            })

    }

    dropDownEditChange = (e, {value}) => {
        console.log('value', value)
        this.setState({editTags: value})
    }

    handleEditChange = (e) => {
        // console.log('edit blog', e.target.value)
        let name = e.target.name
        let value = e.target.value
        this.setState({ editTravel: { ...this.state.editTravel, [name]: value } })
    }



    render() {
        // debugger
     
        return (
            <Modal as={Form}

                open={this.state.editModal === this.props.selectedTravel.id}
                onClose={() => this.setState({ editModal: null })}
                style={{ overflow: 'auto', position: 'relative', paddingTop: '25px', paddingRight: '115px', backgroundColor: '#c8d3d4' }}
                trigger={<Icon
                    onClick={() => {
                        // console.log('is this working')
                        this.setState({ editModal: this.props.selectedTravel.id})
                    }}
                    className='Edit'
                    name='edit outline' />}>
                <EditTravelogue
                    selectedTravel={this.props.selectedTravel}
                    name={this.props.name}
                    editTravel={this.state.editTravel}
                    handleEditChange={this.handleEditChange}
                    handleEditSubmit={this.handleEditSubmit}
                    dropDownEditChange={this.dropDownEditChange}
                    options={this.props.options}
                    // travelogues={this.props.travelogues}
                  

                />
            </Modal>
        )
    }
}
