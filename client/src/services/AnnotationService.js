import Api from "@/services/Api"
import store from '../store/store'

export default {
    index (filters) {
        const query = encodeURIComponent(JSON.stringify(filters))
        return Api.createAxiosRequest().get(`tweet/index?query=${query}`,{
            headers: {
              'Authorization': "Bearer " + store.state.auth.accessToken,
            }
        })
    },
    editTweet(action,id,data){
        return Api.createAxiosRequest().post(`tweet/${id}/${action}`,data,{
            headers: {
              'Authorization': "Bearer " + store.state.auth.accessToken,
            }
        })
    },
}

