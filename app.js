var express = require('express')
var bodyParser = require('body-parser')

var app = express()

const models = require('./models');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.get('/payments/:userId', function (req, res) {
    res.jsonp({
        userId: req.params.userId,
        amount: 1000
    })
})

app.post('/payments', function (req, res) {
    res.send(req.body)
})

app.put('/payments/:userId', function (req, res) {
    res.jsonp({
        userId: req.params.userId,
        amount: req.body.newAmount
    })
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
