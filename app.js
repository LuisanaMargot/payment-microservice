var express = require('express')
var bodyParser = require('body-parser')

var app = express()

const models = require('./models');

const PagoController = require('./controllers').PagoController;

const ReciboController = require('./controllers').ReciboController;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.get('/payments/:userId', function (req, res) {
    PagoController.read(req.params.userId).then(pago => {
        res.jsonp({
            userId: pago.idUsuario,
            amount: pago.saldo
        })
    }).catch(error => {
        res.status(404).send({
            message: 'Error: ' + error
        })
    })
})

app.post('/payments/create', function (req, res) {
    PagoController.create(req.body.userId, req.body.startingAmount).then(pago => {
        res.send({message: 'Pago creado'})
    })
})

app.put('/payments/:userId', function (req, res) {
    PagoController.update(req.params.userId, req.body.newAmount).then(pago => {
        res.send({ message: 'Pago Editado' })
    })
})

app.post('/payments/voucher/create', function (req, res) {
    ReciboController.create(req.body.userId, req.body.code, req.body.amount).then(recibo => {
        res.send({ message: 'Recibo creado' })
    })
})

app.get('/payments/voucher/:userId', function (req, res) {
    ReciboController.read(req.params.userId).then(recibos => {
        res.send(recibos)
    })
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
