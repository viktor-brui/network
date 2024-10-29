import axios from "../../../axios/axios-instance"

const state = {
    userDetails: {},
    isLoggedIn: true,
    errors: [],
    invalidCredentials: ''
}
const actions = {
    registerUser(context, user) {
        return new Promise((resolve, reject) => {
            axios.post('/api/register', {
                name: user.name,
                email: user.email,
                password: user.password,
                password_confirmation: user.password_confirmation
            }).then(response => {
                if (response.data) {
                    window.location.replace('login')
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch((error) => {
                if (error.response.status === 422) {
                    context.commit('setErrors', error.response.data.errors)
                }
            })
        })
    },

    loginUser(context, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/login', payload)
                .then(response => {
                    if (response.data.access_token) {
                        localStorage.setItem('token', response.data.access_token)
                        context.commit('setLoggedIn', true)
                        context.dispatch('currentUser').then(() => resolve(response))
                        window.location.replace('dashboard')
                    }
                })
                .catch((error) => {
                    if (error.response.data.error) {
                        context.commit('setInvalidCredentials', error.response.data.error)
                    } else if (error.response.status === 422) {
                        context.commit('setErrors', error.response.data.errors)
                    }
                })
        })
    },
    logout(context) {
        return new Promise(resolve => {
            localStorage.removeItem('token')
            context.commit('setLoggedIn', false)
            resolve(true)
            window.location.replace('login')
        })
    },

    setLoggedInstate(context) {
        return new Promise(resolve => {
            if (localStorage.getItem('token')) {
                context.commit('setLoggedIn', true)
                resolve(true)
            } else {
                context.commit('setLoggedIn', false)
                resolve(false)
            }
        })
    },

    forgotPassword(context, user) {
        return new Promise((resolve, reject) => {
            axios.post('/api/forgot-password', {email: user.email})
                .then(response => {
                    if (response.data) {
                        window.location.replace('login')
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
                .catch((error) => {
                    if (error.response.status === 500) {
                        context.commit('setInvalidCredentials', error.response.data.errors)
                    } else if (error.response.status === 422) {
                        context.commit('setErrors', error.response.data.errors)
                    }
                })
        })
    },

    resetPassword(context, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/api/reset-password', payload)
                .then(response => {
                    resolve(response)
                })
                .then(response => {
                    if (response.data) {
                        window.location.replace('login')
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
                .catch((error) => {
                    if (error.response.status === 500) {
                        context.commit('setInvalidCredentials', error.response.data.errors)
                    } else if (error.response.status === 422) {
                        context.commit('setErrors', error.response.data.errors)
                    }
                })
        })
    },

    currentUser(context) {
        const token = localStorage.getItem('token')
        return new Promise((resolve, reject) => {
            axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    context.commit('setUserDetails', response.data.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },

    changePassword(context, payload) {
        const token = localStorage.getItem('token')
        return new Promise((resolve, reject) => {
            axios.post('/api/changePassword', payload, {
                headers: {
                    Authorization: `Bearer ${token}`}
            })
                .then(response => {
                    if (response.data.success) {
                        resolve(response)
                        window.location.replace('login')
                    } else {
                        reject(response)
                    }
                })
                .catch(error => {
                    if (error.response.data.errors) {
                        context.commit('setInvalidCredentials', error.response.data.errors)
                    } else if (error.response.data.status === 422) {
                        context.commit('setErrors', error.response.data.errors)
                    }
                })
        })
    },

    updateDetails(context, payload) {
        const token = localStorage.getItem('token')
        return new Promise((resolve, reject) => {
            axios.post('/api/changeDetails', payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }})
                .then(response => {
                    if (response.data.success) {
                        resolve(response)
                        window.location.replace('profile')
                    } else {
                        reject(response)
                    }
                })
                .catch(error => {
                    if (error.response.data.errors) {
                        context.commit('setInvalidCredentials', error.response.data.errors)
                    } else if (error.response.data.status === 422) {
                        context.commit('setErrors', error.response.data.errors)
                    }
                })
        })
    }

}
const mutations = {
    setLoggedIn(state, payload) {
      state.isLoggedIn = payload
    },
    setErrors(state, errors) {
        state.errors = errors
    },
    setInvalidCredentials(state, invalidCredentials) {
        state.invalidCredentials = invalidCredentials
    },
    setUserDetails(state, payload) {
        state.userDetails = payload
    }
}
const getters = {
    loggedIn(state) {
        return state.isLoggedIn
    },
    userDetails(state) {
        return state.userDetails
    },
    errors(state) {
        return state.errors
    },
    invalidCredentials(state) {
        return state.invalidCredentials
    },
    isAdmin(state) {
        return state.userDetails ? state.userDetails.roles : false
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
