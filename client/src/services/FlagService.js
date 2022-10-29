import Api from "@/services/Api"
import store from '../store/store'


export default {
    getFlagged() {
        return Api.createAxiosRequest().get('getFlagged',{
            headers: {
              'Authorization': "Bearer " + store.state.auth.accessToken,
            }
        })
    },
    keepTweet(tweetId) {
        return Api.createAxiosRequest().post('keepTweet',tweetId,{
            headers: {
              'Authorization': "Bearer " + store.state.auth.accessToken,
            }
        })
    },
    deleteTweet(tweetId){
        return Api.createAxiosRequest().delete('deleteTweet',{
            headers: {
              'Authorization': "Bearer " + store.state.auth.accessToken,
            },data: tweetId})
    },
    
}
