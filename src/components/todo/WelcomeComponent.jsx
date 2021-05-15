import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js'


class WelcomeComponent extends Component {

    constructor(props) {
        super(props);
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.state ={
            welcomeMessage : ''
        }
    }
    render() {
        return (
            <>
                <div className="container mb-4">
                    Welcome {this.props.match.params.name}.
                    You can manage your TODO list <Link to="/todos">here</Link>
                </div>
                <div className="container">
                     Click here to get customised welcom message.&nbsp;
                     <button onClick = {this.retrieveWelcomeMessage} className = "btn btn-success"> Click here!</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }
    retrieveWelcomeMessage(){
        // HelloWorldService.executeHelloWorldService()
        // .then(response => {
        //     this.setState({
        //         welcomeMessage : response.data
        //     })
        //     // console.log(response.config)
        // })
        // .catch()

        HelloWorldService.executeHelloWorldPathVaribaleService(this.props.match.params.name)
        .then(response => {
            this.setState({
                welcomeMessage : response.data
            })
            // console.log(response.config)
        })
        .catch(error => {
            let errorMessage = ''
            if(error.message){
                errorMessage += error.message
            }

            if(error.response && error.response.data){
                errorMessage += error.response.data.message
            }
            this.setState({
                welcomeMessage : errorMessage
            })

            console.log(error.response.data.message)
        })
    }
}

export default WelcomeComponent