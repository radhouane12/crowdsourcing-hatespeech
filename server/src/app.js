const express = require('express')
const mongoose = require('./DB/mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')


dotenv.config()

var db = mongoose(process.env.DB_CONNECT);
const app = express()

//adding initial data
const Tweet = require('mongoose').model('Tweet')
async function mySeeder() {
    const data = await Tweet.find()
    if (data.length !== 0) {
        return
    }
    const items = [
        {
            "created_at": "2022-09-30",
            "tweet": "Boy I can talk a cat off a fish wagon \ud83d\ude38",
            "category": [
                "Disability"
            ]
        },
        {
            "created_at": "2022-09-21",
            "tweet": "I hope you listen to this interview recorded outside B.O. Fish Wagon in Key West, Florida.  The great Barry Cuda, ladies and gentlemen. You don't even have to leave Twitter to hear it.   https://t.co/sih2jDVr0A",
            "category": [
                "Disability"
            ]
        },
        {
            "created_at": "2022-09-20",
            "tweet": "Serving fat game that you couldn\u2019t imagine Boy I can talk a cat off a fish wagon Or sell an Eskimo ice at a high price and get him twice Mayne, I\u2019m nuttin' nice and games my merchandise So get ya scrilla, ya fetti, ya scratch, and yo' mail Holla at me folks, I got game for sale",
            "category": [
                "Disability"
            ]
        },
        {
            "created_at": "2022-09-19",
            "tweet": "fortunately or unfortunately (still haven't made up my mind...) for you i got dq in 20' but despite that i was born w this shit in my blood \ud83e\udd76\u2665\ufe0frip  serving fat game that you'll never imagine boy i can talk a cat off a fish wagon  https://t.co/3LMgI3R0Zb",
            "category": [
                "Disability"
            ]
        },
        {
            "created_at": "2022-10-04",
            "tweet": "@lilygrutcher Russians threatening Mexicans in race to expatriate!",
            "category": [
             "Ethnicity"
            ]
           },
           {
            "created_at": "2022-10-04",
            "tweet": "Expatriate Group To Revolutionise Health Insurance with a New Cashless Offering  https://t.co/0cOQm6VOmd",
            "category": [
             "Ethnicity"
            ]
           },
           {
            "created_at": "2022-10-04",
            "tweet": "The line between being an expatriate and an immigrant is finer than we imagine. Speaking from personal experiencesz Poem by Edwin Alanis Garcia #poem #expatriate #immigrant  https://t.co/gf8x40f2i2",
            "category": [
             "Ethnicity"
            ]
           },
           {
            "created_at": "2022-10-04",
            "tweet": "Ahem. As I was saying, I remain Snezhnaya\u2019s greatest expatriate toy seller, currently attached to the Liyue Branch of our Institute for Toy Research!",
            "category": [
             "Ethnicity"
            ]
           },
           {
            "created_at": "2022-10-04",
            "tweet": "One group is called herders. Another is called ranchers. They are doing the exact same thing - livestock farming.  (this reminds me of immigrant vs expatriate)",
            "category": [
             "Ethnicity"
            ]
           },
           {
            "created_at": "2022-10-04",
            "tweet": "I want diana vickers as a loose woman essentially",
            "category": [
             "Gender"
            ]
           },
           {
            "created_at": "2022-10-04",
            "tweet": "I started a Substack called \"Myth and Marvelous\" inspired by a line in \"Loose Woman\" by Sandra Cisneros and Rene Menil's writings on the marvelous (give me a follow - still trying to figure out how this works):  https://t.co/uilw9q9ZPn",
            "category": [
             "Gender"
            ]
           },
           {
            "created_at": "2022-10-03",
            "tweet": "@WesMillerLaw @spicyrocks69 Doesn\u2019t matter what core they are. Woman showing her body and/or expressing her sexuality = loose woman, to they eyes of the beholding Vatnik",
            "category": [
             "Gender"
            ]
           },
           {
            "created_at": "2022-10-03",
            "tweet": "@PrincessPinocch I thought it's  a pic of that loose woman ..Denise Welch",
            "category": [
             "Gender"
            ]
           },
           {
            "created_at": "2022-10-04",
            "tweet": "@hungryayo Professional bad bitch fumbler",
            "category": [
             "Religion"
            ]
           },
           {
            "created_at": "2022-10-04",
            "tweet": "i\u2019m either the biggest bag fumbler of all time or the biggest bag grabber",
            "category": [
             "Religion"
            ]
           },
           {
            "created_at": "2022-10-04",
            "tweet": "@Emohjify @WannaBeReece bro a bag fumbler",
            "category": [
             "Religion"
            ]
           },
           {
            "created_at": "2022-10-04",
            "tweet": "@wydccalamity not gon argue buh i\u2019m a certified bad bitch fumbler",
            "category": [
             "Religion"
            ]
           },
           {
            "created_at": "2022-10-04",
            "tweet": "@LoftforWords Seny: 7 (Not challenged much) Paal: 8 Dunne: 7.5 Balogun: 8.5 Laird: 6.5, Poor-ish first half Field: 9 Dozzell: 5 Amos: 6 Willock: 7.5 Chair: 8, weapon all day Roberts: 6 Dykes: 5, Mostly just had it thumped at him w/ no support Iroegbunam: 6 JCS: 7 Albert: NA, not enough action",
            "category": [
             "Sexuality"
            ]
           },
           {
            "created_at": "2022-10-02",
            "tweet": "Bruv it\u2019s funny asf dykes in SA be dry hating like a mf. \ud83e\udd71",
            "category": [
             "Sexuality"
            ]
           },
           {
            "created_at": "2022-10-01",
            "tweet": "the first two dykes and a mic \ud83d\udeac\ud83d\udeac\ud83d\udeac  https://t.co/lxtB2v187d",
            "category": [
             "Sexuality"
            ]
           }
    ]
    items.forEach(async function (item) {
        var tweet = new Tweet(item)
        await tweet.save()
    })
}


app.use(morgan("combined"))
app.use(bodyParser.json());
app.use(cors())

var authenticationRoutes = require('./app/routes/authentication.routes')
authenticationRoutes(app)

var annotationRoutes = require('./app/routes/annotation.routes')
annotationRoutes(app)

var testRoutes = require('./app/routes/test.routes')
testRoutes(app)

mySeeder()
app.listen(process.env.PORT)