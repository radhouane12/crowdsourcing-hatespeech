import Api from "@/services/Api"
import store from '../store/store'


export default {
    getFlagged() {
        return Api.createAxiosRequest().get('flags/index',{
            headers: {
              'Authorization': "Bearer " + store.state.auth.accessToken,
            }
        })
    },
    removeFlag(id,action) {
        return Api.createAxiosRequest().post(`flags/${id}/${action}`,null,{
            headers: {
              'Authorization': "Bearer " + store.state.auth.accessToken,
            }
        })
    },  
}
