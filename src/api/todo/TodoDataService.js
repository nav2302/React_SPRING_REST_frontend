import axios from 'axios'
import API_URL from '../../Constants'

class TodoDataService {
    retrieveAllTodos(userName){
        return axios.get(`${API_URL}/users/${userName}/todos`)
    }
    retrieveTodo(userName, id){
        return axios.get(`${API_URL}/users/${userName}/todos/${id}`)
    }
    deleteTodo(userName, id){
        return axios.delete(`${API_URL}/users/${userName}/todos/${id}`)
    }

    updateTodo(userName, id, todo){
        return axios.put(`${API_URL}/users/${userName}/todos/${id}`, todo)
    }

    createTodo(userName, todo){
        return axios.post(`${API_URL}/users/${userName}/todos/`, todo)
    }

} 

export default new TodoDataService