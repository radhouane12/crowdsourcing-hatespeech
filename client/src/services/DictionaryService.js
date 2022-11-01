import Api from "@/services/Api"
import store from '../store/store'


export default {
  getDicts() {
    return Api.createAxiosRequest().get('dicts', {
      headers: {
        'Authorization': "Bearer " + store.state.auth.accessToken,
      }
    })
  },
  getSuggs() {
    return Api.createAxiosRequest().get('suggs', {
      headers: {
        'Authorization': "Bearer " + store.state.auth.accessToken,
      }
    })
  },
  addTerm(newTerm) {
    return Api.createAxiosRequest().post('dicts', newTerm, {
      headers: {
        'Authorization': "Bearer " + store.state.auth.accessToken,
      }
    })
  },
  addSuggestion(suggestion) {
    return Api.createAxiosRequest().post('suggs', suggestion, {
      headers: {
        'Authorization': "Bearer " + store.state.auth.accessToken,
      }
    })
  },
  addSuggToDict(suggestion) {
    return Api.createAxiosRequest().post('suggs/add', suggestion, {
      headers: {
        'Authorization': "Bearer " + store.state.auth.accessToken,
      }
    })
  },
  deleteSugg(suggestion) {
    return Api.createAxiosRequest().delete('suggs/delete',{
      headers: {
        'Authorization': "Bearer " + store.state.auth.accessToken,
      },data: suggestion})
  },
}
