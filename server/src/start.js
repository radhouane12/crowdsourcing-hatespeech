const app = require('./app.js')
console.log ("running on port ",process.env.PORT)
app.listen(process.env.PORT)