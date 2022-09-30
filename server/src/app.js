console.log("hello")
const express = require ('express')
const mongoose = require('./DB/mongoose');
const bodyParser = require('body-parser')
const cors = require ('cors')
const morgan = require ('morgan')
const dotenv = require ('dotenv')

dotenv.config()

var db = mongoose(process.env.DB_CONNECT);
const app = express()


app.use(morgan("combined"))
app.use(bodyParser.json());
app.use(cors())


require('./app/routes/routes')(app)

app.listen(process.env.PORT)