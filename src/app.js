const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const routes = require('./routes/')
const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(routes)

module.exports = app
