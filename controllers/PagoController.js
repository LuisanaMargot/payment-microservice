var Pago = require("../models").Pago

module.exports = {
    create: (userId, startingAmmount) => {
        if (!userId || !startingAmmount) return null
        return Pago.create({idUsuario: userId, saldo: startingAmmount})
    },

    read: (userId = null) => {
        return new Promise((resolve, reject) => {
            Pago.findOne({
                where: { idUsuario: userId }
            }).then(pago => {
                if (!pago) reject("No existe usuario")
                else resolve(pago.get({ plain: true }));
            })
        });
    },

    update: (userId, newAmount) => {
        return new Promise((resolve, reject) => {
            Pago.findOne({
                where: { idUsuario: userId }
            }).then(pago => {
                if (!pago) {
                    reject("No existe usuario")
                }
                pago.saldo = newAmount

                pago.save({fields: ['saldo']}).then((pagoUpdated) => {
                    resolve(pagoUpdated.get({ plain: true }));
                })
            })
        });
    },
}