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
            "category": "Disability"
        },
        {
            "created_at": "2022-09-21",
            "tweet": "I hope you listen to this interview recorded outside B.O. Fish Wagon in Key West, Florida.  The great Barry Cuda, ladies and gentlemen. You don't even have to leave Twitter to hear it.   https://t.co/sih2jDVr0A",
            "category": "Disability"
        },
        {
            "created_at": "2022-09-20",
            "tweet": "Serving fat game that you couldn\u2019t imagine Boy I can talk a cat off a fish wagon Or sell an Eskimo ice at a high price and get him twice Mayne, I\u2019m nuttin' nice and games my merchandise So get ya scrilla, ya fetti, ya scratch, and yo' mail Holla at me folks, I got game for sale",
            "category": "Disability"
        },
        {
            "created_at": "2022-09-19",
            "tweet": "fortunately or unfortunately (still haven't made up my mind...) for you i got dq in 20' but despite that i was born w this shit in my blood \ud83e\udd76\u2665\ufe0frip  serving fat game that you'll never imagine boy i can talk a cat off a fish wagon  https://t.co/3LMgI3R0Zb",
            "category": "Disability"
        },
        {
            "created_at": "2022-10-04",
            "tweet": "where can an ancient chinese transmigrant find some cup noodle? i am sick of lotus SOUP",
            "category": "Ethnicity"
        },
        {
            "created_at": "2022-09-23",
            "tweet": "@JuliaDavisNews And those who failed to reject the evidence, they go to Room 101, to experience torture with illegal transmigrant antifa black Muslim snipers from NATO base in Estonia!",
            "category": "Ethnicity"
        },
        {
            "created_at": "2022-10-04",
            "tweet": "Daniella couldn\u2019t even understand her confidence like this bush girl? Calling people street? Like such a bush onitsha street girl!! Because London not don give you eye then her foolish family called him a stain Okague\u2019s are mad!",
            "category": "Gender"
        },
        {
            "created_at": "2022-10-04",
            "tweet": "@Pickinmyfro @Nomak7777 @theArtistGrimm0 @ThembaRumbu You aren't replying fast, or are you busy with your night clients? am sorry i am leaving you here in this street where you belong  because you are a street girl...my wife need my attention now.\ud83e\udd23\ud83e\udd23\ud83e\udd23",
            "category": "Gender"
        },
        {
            "created_at": "2022-10-04",
            "tweet": "@ayomidesxn Street girl she is, u can't tell me otherwise.",
            "category": "Gender"
        },
        {
            "created_at": "2022-10-02",
            "tweet": "@BBNaija Finally the street girl has made it. Queen Phyna is now a super star. Congrats darling. @Tokemakinwa. @beautyetukura @TheChomzy @OfficialDoyin_ and others, have u all seen that, What God cannot do, does not exist. Hahahaha. I know u all are hiding ur faces in shame now.",
            "category": "Gender"
        },
        {
            "created_at": "2022-10-02",
            "tweet": "@BBNaija How God made a street girl as she was called a winner this is an example of never look down on anyone congrats @unusualphyna",
            "category": "Gender"
        },
        {
            "created_at": "2022-10-02",
            "tweet": "@bella_okagbue I'm happy the person you called a street girl won...",
            "category": "Gender"
        },
        {
            "created_at": "2022-10-02",
            "tweet": "Who deyyyyyyyyyyy. Finally the street girl has made it. PHYNATIONS no dey dull at all.  @tokstarr and others, hope u re watching. \ud83d\ude02\ud83d\ude02\ud83d\ude02\ud83d\ude02",
            "category": "Gender"
        },
        {
            "created_at": "2022-10-02",
            "tweet": "Congratulations \ud83c\udf8a to my very own street girl with the vibe @unusualphyna @PereEgbi @LadyB13266611  https://t.co/GRQgUMC29Y",
            "category": "Gender"
        },
        {
            "created_at": "2022-10-01",
            "tweet": "He beheaded Romina with a sickle,and proudly announced it afterwards.  The standing girl is the Enghelab street girls movement,in 2019,a girl put her white shaal on a stick,and waved it like peace flag in Inghelab street And it quickly spread Guess how the government handled them",
            "category": "Gender"
        },
        {
            "created_at": "2022-10-01",
            "tweet": "That posh idiot Cricket Badger and The Lying Friar have used each other like a 20 quid street girl. Expect the fur to fly when they both test positive for something they can\u2019t get rid of. It\u2019ll end in tears between them",
            "category": "Gender"
        },
        {
            "created_at": "2022-09-30",
            "tweet": "when i was 11 i read a book series called the beacon street girls and let me just say THAT is a netflix adaptation i need",
            "category": "Gender"
        },
        {
            "created_at": "2022-09-28",
            "tweet": "@Jeffery_0011 @BBNaija @AirtelNigeria If Phyna the street girl is \"dull\" then what is Bryan the Sleeping Beauty?",
            "category": "Gender"
        },
        {
            "created_at": "2022-09-28",
            "tweet": "@adeewunmi Street girl don drop quote",
            "category": "Gender"
        },
        {
            "created_at": "2022-09-28",
            "tweet": "@SigmaMemes_69 where tf are these poor street girls (please i am so lonely)",
            "category": "Gender"
        },
        {
            "created_at": "2022-09-28",
            "tweet": "Now playing Gun Street Girl by Tom Waits on WKNC.",
            "category": "Gender"
        },
        {
            "created_at": "2022-09-15",
            "tweet": "Bella needs to dash that street girl some bikinis and nice clothes\ud83d\ude02\ud83d\ude02 it's  not fair now.  #BBNaija\u00a0 #BBNaijaSeason7 #Bbnaija\u00a0 #BBNaijaLevelUp #BBNajia",
            "category": "Gender"
        },
        {
            "created_at": "2022-09-14",
            "tweet": "@unusualphyna street girl for life",
            "category": "Gender"
        },
        {
            "created_at": "2022-09-14",
            "tweet": "@CastenCrew @SeanCasten @VoteCasten School after school are coming in with terrible numbers. A good representative would be talking about this and our kids, not some clown dressed like a street girl, dancing in front of children. #voteseancastenout  https://t.co/yyGfHU8YoM",
            "category": "Gender"
        },
        {
            "created_at": "2022-09-14",
            "tweet": "@kingalexos Yes oooo the street girl is smart",
            "category": "Gender"
        },
        {
            "created_at": "2022-09-14",
            "tweet": "@drcherryb E dey pain you? \ud83d\ude02 Sorry ooo,  Phyna can't be HOH and be stressing herself naw, abi street girl no dey rest? \ud83d\ude02 Sorry to remind you; your fav is sleeping alone today ooo \ud83e\udd2a\ud83e\udd2a",
            "category": "Gender"
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


require('./app/routes/routes')(app)

mySeeder()
app.listen(process.env.PORT)