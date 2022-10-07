import Api from "@/services/Api"
import store from '../store/store'

export default {
    index (length,user) {
        return Api.createAxiosRequest().get('annotation',{
            headers: {
              'Authorization': "Bearer " + store.state.auth.accessToken,
              'indexLength': length,
              'user': user,
            }
        })
    },
    getOne (user,i,filters) {
        return Api.createAxiosRequest().post('getOne',filters,{
            headers: {
              'Authorization': "Bearer " + store.state.auth.accessToken,
              'user': user,
              'skipnumber' : i,
            }
        })
    },
    skipTweet(tweetInfo){
        return Api.createAxiosRequest().post('skipTweet',tweetInfo,{
            headers: {
              'Authorization': "Bearer " + store.state.auth.accessToken,
            }
        })
    },
    getFiltered (filters) {
        return Api.createAxiosRequest().post('getFiltered',filters,{
            headers: {
              'Authorization': "Bearer " + store.state.auth.accessToken,
            }
        })
    }
}

