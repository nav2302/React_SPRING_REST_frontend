import React, {Component} from 'react'
import moment from 'moment'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'

class TodoComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            id:this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    onSubmit(values){
        // console.log(values)
        let username = AuthenticationService.getLoggedinUserName()
        TodoDataService.updateTodo(username, this.state.id,{
            id : this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }).then(() => {
            this.props.history.push('/todos')
        })
    }

    validate(values){
        let errors = {}
        if(!values.description){
            errors.description = 'Description cannot be empty'
        } else if(values.description.length < 5){
            errors.description = 'Description length cannot be less than 5 characters'
        }

        if(!moment(values.targetDate).isValid()){
            errors.targetDate = 'Enter a valid date'
        }
        // console.log(values);
        return errors
    }

    componentDidMount(){
        let username = AuthenticationService.getLoggedinUserName()
        TodoDataService.retrieveTodo(username, this.state.id)
        .then(response => {
           this.setState({
               description : response.data.description,
               targetDate : moment(response.data.targetDate).format('YYYY-MM-DD')
           }) 
        })
    }

    render() {

        let {description, targetDate} = this.state

        return( 
                <div className="container">
                    <h1>ToDo</h1>
                    <Formik
                        initialValues = {{description, targetDate}}
                        onSubmit = {this.onSubmit}
                        validateOnBlur={false}
                        validate = {this.validate}
                        enableReinitialize = {true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component ="div" className = "alert alert-warning">
                                    </ErrorMessage>
                                    <ErrorMessage name="targetDate" component ="div" className = "alert alert-warning">
                                    </ErrorMessage>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type = "text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type = "date" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success" type = "submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
        )
    }
}
export default TodoComponent