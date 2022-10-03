import Api from "@/services/Api"
import store from '../store/store'

export default {
    index () {
        return Api.createAxiosRequest().get('annotation',{
            headers: {
              'Authorization': "Bearer " + store.state.auth.accessToken,
            }
        })
    }
}

