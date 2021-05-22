import axios from 'axios'
import Constants from '../../Constants'

class TodoDataService {
    retrieveAllTodos(userName){
        return axios.get(`${Constants.JPA_API_URL}/users/${userName}/todos`)
    }
    retrieveTodo(userName, id){
        return axios.get(`${Constants.JPA_API_URL}/users/${userName}/todos/${id}`)
    }
    deleteTodo(userName, id){
        return axios.delete(`${Constants.JPA_API_URL}/users/${userName}/todos/${id}`)
    }

    updateTodo(userName, id, todo){
        return axios.put(`${Constants.JPA_API_URL}/users/${userName}/todos/${id}`, todo)
    }

    createTodo(userName, todo){
        return axios.post(`${Constants.JPA_API_URL}/users/${userName}/todos/`, todo)
    }

} 

export default new TodoDataService