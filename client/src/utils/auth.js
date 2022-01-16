import decode from 'jwt-decode'
import Cookies from 'js-cookie'

class AuthService {
    getProfile() {
        return decode(this.getToken())
    }

    loggedIn() {
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token)
            return (decoded.exp < Date.now() / 1000) ? true : false
        } catch (err) {
            return false
        }
    }

    getToken() {
        return Cookies.get('token')
    }

    login(token) {
        Cookies.set('token', token, { sameSite: 'Lax' })

        window.location.assign('/')
    }

    logout() {
        Cookies.remove('token')
        window.location.assign('/')
    }
}

export default new AuthService()