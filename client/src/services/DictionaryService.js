import Api from "@/services/Api"
import store from '../store/store'


export default {
  getDicts() {
    return Api.createAxiosRequest().get('getDicts', {
      headers: {
        'Authorization': "Bearer " + store.state.auth.accessToken,
      }
    })
  },
  getSuggs() {
    return Api.createAxiosRequest().get('getSuggs', {
      headers: {
        'Authorization': "Bearer " + store.state.auth.accessToken,
      }
    })
  },
  addTerm(newTerm) {
    return Api.createAxiosRequest().post('addTerm', newTerm, {
      headers: {
        'Authorization': "Bearer " + store.state.auth.accessToken,
      }
    })
  },
  addSuggestion(suggestion) {
    return Api.createAxiosRequest().post('addSuggestion', suggestion, {
      headers: {
        'Authorization': "Bearer " + store.state.auth.accessToken,
      }
    })
  },
  addSuggToDict(suggestion) {
    return Api.createAxiosRequest().post('addSuggToDict', suggestion, {
      headers: {
        'Authorization': "Bearer " + store.state.auth.accessToken,
      }
    })
  },
  deleteSugg(suggestion) {
    return Api.createAxiosRequest().delete('deleteSugg',{
      headers: {
        'Authorization': "Bearer " + store.state.auth.accessToken,
      },data: suggestion})
  },
}
