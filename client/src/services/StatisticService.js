import Api from "@/services/Api"
import store from '../store/store'


export default {
  getStats(stats) {
    const query = encodeURIComponent(JSON.stringify(stats))
    return Api.createAxiosRequest().get(`getStats?query=${query}`, {
      headers: {
        'Authorization': "Bearer " + store.state.auth.accessToken
      }
    })
  },
}
