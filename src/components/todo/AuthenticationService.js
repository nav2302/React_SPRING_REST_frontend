import axios from 'axios'
import Constants from '../../Constants'

export const USER_NAME_SESSION = 'authenticatedUser'

class AuthenticationService {

    executeBasicAuthService(username, password){
        let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)
        return axios.get(`${Constants.API_URL}/basicauth`, {
            headers: {
                authorization: basicAuthHeader
            }
        })
    }

    executeJWTAuthService(username, password){
        console.log(`${Constants.API_URL}`)
        return axios.post(`${Constants.API_URL}/authenticate`, {
            username,
            password
        })
    }

    resgisterSuccessfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION, username);
        let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)
        this.setupAxiosInterceptors(basicAuthHeader)
    }

    resgisterSuccessfulLoginForJWT(username, token){
        // console.log(USER_NAME_SESSION)
        sessionStorage.setItem(USER_NAME_SESSION, username);
        this.setupAxiosInterceptors(this.createJWTtoken(token))
    }

    createJWTtoken(token){
        return 'Bearer ' + token
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION)
    }

    isUserLoggedIn() {
        console.log(USER_NAME_SESSION)
        let user = sessionStorage.getItem(USER_NAME_SESSION)
        if (user == null) return false
        return true
    }

    getLoggedinUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION)
        if (user == null) return ''
        return user
    }

    setupAxiosInterceptors(JWTAuth) {

        console.log(JWTAuth)
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn) {
                    config.headers.Authorization = JWTAuth
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()