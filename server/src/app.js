const express = require('express')
const mongoose = require('./DB/mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')


dotenv.config()

var db = mongoose(process.env.DB_CONNECT);
const app = express()



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



require('./DB/dictSeeder')();
require('./cron/DailyDataFetcher')();
app.listen(process.env.PORT)