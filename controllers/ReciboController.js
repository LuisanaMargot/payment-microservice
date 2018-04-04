var Recibo = require("../models").Recibo
var Pago = require("../models").Pago

module.exports = {
    create: (userId, codigo, monto) => {
        if (!userId || !codigo || !monto) return null

        return new Promise((resolve, reject) => {
            Pago.findOne({ where: { idUsuario: userId } }).then(pago => {
                Recibo.create({ codigo, monto, estatus: 'aprobado'}).then(recibo => {
                    recibo.setPago(pago).then(() => {
                        resolve(pago.get());
                        console.log(pago)
                    })
                    let totalCredit = Number.parseFloat(pago.saldo) + Number.parseFloat(monto)

                    pago.saldo = totalCredit

                    pago.save({ fields: ['saldo'] }).then((pagoUpdated) => {
                        console.log(pagoUpdated.get({ plain: true }))
                    })
                })
            })
        })
    },

    read: (userId = null) => {
        return new Promise((resolve, reject) => {

            /* (userId ?
                Pago.findOne({ where: { idUsuario: userId } }).then(pago => {
                    let idPago = pago.id
                    Recibo.findOne({where: {idPago: idPago}}).then(recibo => {
                        resolve(recibo.get({ plain: true }))
                    })
                })
                : */
                Pago.findOne({ where: { idUsuario: userId } }).then(pago => {
                    let idPago = pago.id
                    Recibo.findAll({ where: { idPago: idPago } }).then(recibos => {
                        resolve(recibos.map(recibo => {
                            return recibo.toJSON() 
                        }))
                    })
                })
            // )
        });
    },

    /*
    update: (userId, newAmount) => {
        return new Promise((resolve, reject) => {
            Pago.findOne({
                where: { idUsuario: userId }
            }).then(pago => {
                if (!pago) {
                    reject("No existe usuario")
                }
                pago.saldo = newAmount

                pago.save({ fields: ['saldo'] }).then((pagoUpdated) => {
                    resolve(pagoUpdated.get({ plain: true }));
                })
            })
        });
    }, */
}