import axios from 'axios'

class AuthenticationService {

    executeBasicAuthService(username, password){
        let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)
        return axios.get('http://localhost:8080/basicauth', {
            headers: {
                authorization: basicAuthHeader
            }
        })
    }

    resgisterSuccessfulLogin(username, password) {
        sessionStorage.setItem('authenticatedUser', username);
        let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)
        this.setupAxiosInterceptors(basicAuthHeader)
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser')
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user == null) return false
        return true
    }

    getLoggedinUserName() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user == null) return ''
        return user
    }

    setupAxiosInterceptors(basicAuthHeader) {

        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn) {
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()