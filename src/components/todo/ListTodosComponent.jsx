import React, { Component } from 'react'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class ListTodosComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            message: null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    componentDidMount() {
        let userName = AuthenticationService.getLoggedinUserName()
        TodoDataService.retrieveAllTodos(userName)
            .then(response => {
                // console.log(response)
                this.setState({
                    todos: response.data
                })
            })
            .catch(error => console.log(error.response.data.message))
    }

    refreshTodos(){
        let userName = AuthenticationService.getLoggedinUserName()
        TodoDataService.retrieveAllTodos(userName)
            .then(response => {
                // console.log(response)
                this.setState({
                    todos: response.data
                })
            })
            .catch(error => console.log(error.response.data.message))
    }

    deleteTodoClicked(id){
        let userName = AuthenticationService.getLoggedinUserName()
        TodoDataService.deleteTodo(userName, id)
        .then(response => {
            // console.log(response.data)
            this.setState({
                message: `Deleted todo with id = ${id}`
            })
            this.refreshTodos()
        })
    }

    updateTodoClicked(id){
        this.props.history.push(`/todos/${id}`)
    }

    render() {
        return (
            <div>
                List Todos:
                {this.state.message && <div className = "alert alert-success">{this.state.message}</div>}
                <div>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Target Date</th>
                                <th scope="col">Is Completed?</th>
                                <th scope="col">Description</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Update</th>
                            </tr>
                        </thead>
                        {this.state.todos.map(todo =>
                            <tbody key = {todo.id}>
                                <tr key = {todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.description}</td>
                                    <td><button className = "btn btn-warning" onClick = {() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    <td><button className = "btn btn-success" onClick = {() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                </tr>
                            </tbody>

                        )}
                    </table>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent