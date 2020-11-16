import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './component.css'
import logo from '../images/monlanding2.png'

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
            <div style={{
                backgroundColor: '#818181',
                height: '100vh',
                display: 'center',
                
              }}>
               <img className='image-component' alt= {logo} src={logo} style={{justifySelf: 'center'}} />
              
                    <Form 
                        onSubmit={(e) => {
                        this.setState({username: '', password: ''})
                        this.props.formSubmit(e, this.state.username, this.state.password)}}>
                        <Form.Group style={{marginLeft: '285px'}}>
                        <Form.Input
                            name='username' required onChange={this.formChange} placeholder='Username' value={this.state.username} />
                      
                        <Form.Input
                            name='password' required onChange={this.formChange} placeholder='Password' value={this.state.password} type='password' />
            
                        <Form.Button basic color= 'black'  type='submit' content='Login'/>
                        </Form.Group>  
                    </Form>
                    <div style={{marginLeft: '293px'}}>
                    {/* Sign in or <Link to='/register'>register here.</Link> */}
                    [Guest login: sja; Password: 123]
                    </div>

                   
                    
               
            </div>

        )
    }
}
