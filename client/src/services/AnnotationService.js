import Api from "@/services/Api"
import store from '../store/store'

export default {
    index (filters) {
        const query = encodeURIComponent(JSON.stringify(filters))
        return Api.createAxiosRequest().get(`index?query=${query}`,{
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

