import React, { Component } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import logo from '../images/bp2.jpg'

export default class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    formChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


    render() {
        return (
            <div>
                {/* <img class='image-component' src={logo} /> */}
                <div className='login_container'>
                    <Form onSubmit={(e) => {
                        this.setState({username: '', password: ''})
                        this.props.formSubmit(e, this.state.username, this.state.password)}}>
                        <Form.Group >
                        <Form.Input
                            name='username' required onChange={this.formChange} placeholder='Username' value={this.state.username} />
                      
                        <Form.Input
                            name='password' required onChange={this.formChange} placeholder='Password' value={this.state.password} type='password' />
            
                        <Form.Button basic color='ui grey inverted button' type='submit' content='Login'/>
                        </Form.Group>  
                    </Form>
                    <div >
                    Don't have an account? <Link to='/register'>Register here.</Link>
                    </div>
                
                </div>
            </div>

        )
    }
}
