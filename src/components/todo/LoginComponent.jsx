import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'nav',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.LoginClicked = this.LoginClicked.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    LoginClicked(event) {
        if (this.state.username === "nav" && this.state.password === "nav") {
            AuthenticationService.resgisterSuccessfulLogin(this.state.username, this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`)
            // this.setState({
            //     showSuccessMessage: true,
            //     hasLoginFailed: false
            // })
        }
        else {
            this.setState({
                showSuccessMessage: false,
                hasLoginFailed: true
            })
        }
    }

    render() {
        return (
            <div className="login">
                <br /><br />
                <ShowInvalidCreds hasLoginFailed={this.state.hasLoginFailed} showSuccessMessage={this.state.showSuccessMessage} />
                UserName: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                Password: <input type="password" name="password" onChange={this.handleChange}></input>
                <button onClick={this.LoginClicked} type="submit">Login</button>
            </div>
        )
    }
}

function ShowInvalidCreds(props) {
    if (props.hasLoginFailed) {
        return <div>Invalid Creds</div>
    }
    else if (props.showSuccessMessage) {
        return <div>Login Success !!</div>
    }
    return null
}



export default LoginComponent