import Api from "@/services/Api"
import store from '../store/store'


export default {
    makeExpert () {
        return Api.createAxiosRequest().post("makeExpert",null,{
            headers: {
              'Authorization': "Bearer " + store.state.auth.accessToken,
              'user': store.state.auth.user._id
            }
        })
    }
}
