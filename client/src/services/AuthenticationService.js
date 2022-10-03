import Api from "@/services/Api"


export default {
    register (credentials) {
        return Api.createAxiosRequest().post("register", credentials)
    },
    login (credentials) {
        return Api.createAxiosRequest().post("login", credentials)
    },
    logout (refreshToken) {
        return Api.createAxiosRequest().post("logout",{
            token:refreshToken
        })
    }
}

