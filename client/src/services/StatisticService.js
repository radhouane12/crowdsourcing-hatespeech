import Api from "@/services/Api"
import store from '../store/store'


export default {
  getUsers() {
    return Api.createAxiosRequest().get('getUsers', {
      headers: {
        'Authorization': "Bearer " + store.state.auth.accessToken,
        'user': store.state.auth.user._id
      }
    })
  },
  getAnnotated(categories) {
    return Api.createAxiosRequest().get('getAnnotated', {
      headers: {
        'Authorization': "Bearer " + store.state.auth.accessToken,
        'user': store.state.auth.user._id,
        'categories': categories
      },
    })
  },
  getTrends(categories,monthly) {
    return Api.createAxiosRequest().get('getTrends', {
      headers: {
        'Authorization': "Bearer " + store.state.auth.accessToken,
        'user': store.state.auth.user._id,
        'categories': categories,
        'monthly': monthly
      },
    })
  },
}
