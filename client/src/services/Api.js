import axios from "axios"
import store from "../store/store"
import router from "../router/index"
import jwt_decode from "jwt-decode"
import dayjs from 'dayjs'

function createAxiosRequest () {
    var axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_BASE_API_URL
    })
    if (store.state.auth.accessToken) {
        axiosInstance.interceptors.request.use(async req => {
            var newAccessToken = null
            const access = jwt_decode(store.state.auth.accessToken)
            const isExpired = dayjs.unix(access.exp).diff(dayjs()) < 1;
            if(!isExpired) return req
            await axios({
                method:'post',
                url:'/getNewToken',
                baseURL: process.env.VUE_APP_BASE_API_URL,
                data: {
                    token: store.state.auth.refreshToken
                }
            }).then((res) => {             
                store.state.auth.accessToken = res.data.accessToken
                store.state.auth.refreshToken = res.data.refreshToken
                newAccessToken = `Bearer ${res.data.accessToken}`
              }, (error) => {
                console.log("couldnt't refresh Token: "+ error)
                store.state.auth.isUserLoggedIn = false
                store.state.auth.refreshToken = null,
                store.state.auth.accessToken = null,
                store.state.auth.user = null,
                store.state.auth.tutorial = true,
                store.state.auth.isExpert = false,
                store.state.auth.testState = false,
                router.push({ name: 'landing' }).catch(error => {
                    if (error.name != "NavigationDuplicated") {
                      throw error;
                    }
                  })
            })
            req.headers['Authorization'] = newAccessToken
            return req
        })
    }
    return  axiosInstance
}

export default {
    createAxiosRequest,
}