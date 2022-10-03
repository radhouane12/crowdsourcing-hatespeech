

export const auth ={
    strict: true,
    state: {
        refreshToken: null,
        accessToken: null,
        user: null,
        isUserLoggedIn: false
    },
    mutations: {
        setRefreshToken (state, refreshToken) {
            state.refreshToken = refreshToken
        },
        setAccessToken (state, accessToken) {
            state.accessToken = accessToken
            if (accessToken) {
                state.isUserLoggedIn = true
            } else {
                state.isUserLoggedIn = false
            }
        },
        setUser (state, user) {
            state.user = user
        }
    },
    actions: {
        setRefreshToken ({commit}, refreshToken) {
            commit('setRefreshToken', refreshToken)
        },
        setAccessToken ({commit}, accessToken) {
            commit('setAccessToken', accessToken)
        },
        setUser ({commit}, user) {
            commit('setUser', user)
        }
    }
}