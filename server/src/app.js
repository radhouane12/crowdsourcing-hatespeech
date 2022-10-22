const express = require('express')
const mongoose = require('./DB/mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')


dotenv.config()

var db = mongoose(process.env.DB_CONNECT);
const app = express()



//adding initial Dictionaries
const Dictionary = require('mongoose').model('Dictionary')
async function initialDictionary() {
    const dicts = await Dictionary.find()
    if (dicts.length !== 0) {
        return
    }
    const dict = [
        {
            "category": "Disability",
            "term": "fish wagon"
        },
        {
            "category": "Disability",
            "term": "gimp"
        },
        {
            "category": "Disability",
            "term": "gimps"
        },
        {
            "category": "Gender",
            "term": "street girl"
        },
        {
            "category": "Gender",
            "term": "loose woman"
        },
        {
            "category": "Race",
            "term": "arabic"
        },
        {
            "category": "Race",
            "term": "african"
        },
        {
            "category": "Religion",
            "term": "brain damage"
        },
        {
            "category": "Religion",
            "term": "fumbler"
        },
        {
            "category": "Sexuality",
            "term": "feminazi"
        },
        {
            "category": "Sexuality",
            "term": "dykes"
        },
        {
            "category": "Sexuality",
            "term": "dyke"
        },
        {
            "category": "Ethnicity",
            "term": "refugee"
        },
        {
            "category": "Ethnicity",
            "term": "expatriate"
        },
        {
            "category": "Ethnicity",
            "term": "transmigrant"
        }
    ]
    dict.forEach(async function (item) {
        var dictionary = new Dictionary(item)
        await dictionary.save()
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

var DictionaryRoutes = require('./app/routes/dictionary.routes')
DictionaryRoutes(app)

var flagRoutes = require('./app/routes/flag.routes')
flagRoutes(app)

var StatisticRoutes = require('./app/routes/statistic.routes')
StatisticRoutes(app)



initialDictionary()
require('./cron/DailyDataFetcher')();
app.listen(process.env.PORT)