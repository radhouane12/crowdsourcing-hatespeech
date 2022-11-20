

export const auth ={
    strict: true,
    state: {
        tutorial: true,
        refreshToken: null,
        accessToken: null,
        user: null,
        isUserLoggedIn: false,
        isExpert: false,
        testState: false,
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
            state.isExpert = user.isExpert
        },
        removeUser (state) {
            state.user = null
            state.isExpert = false
        },
        testState (state, testState) {
            state.testState = testState
        },
        makeExpert(state) {
            state.isExpert = true
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
        },
        removeUser ({commit}) {
            commit('removeUser')
        },
        testState ({commit}, testState) {
            commit('testState', testState)
        },
        makeExpert({commit}) {
            commit('makeExpert')
        }
    }
}