import axios from "axios"
import store from "../store/store"


function createAxiosRequest () {
    var axiosInstance = axios.create({
        baseURL: "http://localhost:8081/"
    })
    axiosInstance.interceptors.response.use(response => {
        return response;
     }, error => {
        if (error.response.status === 401) {
            if (!store.state.auth.refreshToken) return error
            var requestConfig = error.config;
            axios({
                method:'post',
                url:'/getNewToken',
                baseURL: 'http://localhost:8081',
                data: {
                    token: store.state.auth.refreshToken
                }
            }).then((response) => {             
                requestConfig.headers['Authorization'] = 'Bearer ' + response.data.accessToken  
                store.state.auth.accessToken = response.data.accessToken  
                axios.request(requestConfig)
              }, (error) => {
                console.log("couldnt't refresh Token: "+ error);
              });
        }
       return error;
     });
    return  axiosInstance
}

export default {
    createAxiosRequest,
}