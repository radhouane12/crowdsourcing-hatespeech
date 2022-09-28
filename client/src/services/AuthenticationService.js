import Api from "@/services/Api"

export default {
    register (credentials) {
        return Api().post("register", credentials)
    }
}

/*AthenticationService.register({
    email: "asba@asba.com",
    password: "asba"
})*/