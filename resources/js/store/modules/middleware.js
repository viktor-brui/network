const state  = {
    user: {
        logged: false,
        isSubscribe: false,
        token: localStorage.getItem('token') || ''
    },
}

const actions = {

}

const mutations = {

}

const getters = {
    auth(state) {
        return state.user
    },
    loggedIn(state) {
        return state.token == null
    }
}

export default {
    namespaced: false,
    state,
    actions,
    mutations,
    getters
}
