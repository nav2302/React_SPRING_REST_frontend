class AuthenticationService {
    resgisterSuccessfulLogin(username, password){
        sessionStorage.setItem('authenticatedUser', username);
    }

    logout(){
        sessionStorage.removeItem('authenticatedUser')
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user == null) return false
        return true
    }

    getLoggedinUserName(){
        let user = sessionStorage.getItem('authenticatedUser')
        if (user == null) return ''
        return user
    }
}

export default new AuthenticationService()