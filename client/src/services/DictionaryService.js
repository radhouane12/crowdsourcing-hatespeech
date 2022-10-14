import Api from "@/services/Api"
import store from '../store/store'


export default {
  getDicts() {
        return Api.createAxiosRequest().get('getDicts',{
            headers: {
              'Authorization': "Bearer " + store.state.auth.accessToken,
              'user': store.state.auth.user._id
            }
        })
    },
}
