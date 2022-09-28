console.log("hello")
const express = require ('express')
const mongoose = require('./config/mongoose');
const bodyParser = require('body-parser')
const cors = require ('cors')
const morgan = require ('morgan')
const config = require ('./config/config')

var db = mongoose();
const app = express()


app.use(morgan("combined"))
app.use(bodyParser.json());
app.use(cors())


require('./app/routes/routes')(app)

app.listen(config.port)