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
    getFiltered (filters) {
        return Api.createAxiosRequest().post('getFiltered',filters,{
            headers: {
              'Authorization': "Bearer " + store.state.auth.accessToken,
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
    flagTweet(tweetInfo){
        return Api.createAxiosRequest().post('flagTweet',tweetInfo,{
            headers: {
              'Authorization': "Bearer " + store.state.auth.accessToken,
            }
        })
    },
    addCategory(tweetInfo){
        return Api.createAxiosRequest().post('addCategory',tweetInfo,{
            headers: {
              'Authorization': "Bearer " + store.state.auth.accessToken,
            }
        })
    },
    labelTweet(tweetInfo){
        return Api.createAxiosRequest().post('labelTweet',tweetInfo,{
            headers: {
              'Authorization': "Bearer " + store.state.auth.accessToken,
              'isexpert': store.state.auth.isExpert
            }
        })
    },
}

