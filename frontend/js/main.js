$(document).ready(() => {
    $('#add-payment').click(e => showPaymentForm($('#content-panel')))
    $('#account-status').click(e => showAccountStatus($('#content-panel')))
})

const defaultUser = 2

const showPaymentForm = ($target) => {
    $target.html(`
        <div id="payment-add-form" class="row">
            <div class="input-group col-xs-6 col-xs-offset-3">
                <span class="input-group-addon">Codigo</span>
                <input type="text" class="form-control" id="code-input">
            </div>
            <div class="input-group col-xs-6 col-xs-offset-3" style="margin-top:25px;">
                <span class="input-group-addon">Monto  </span>
                <input type="text" class="form-control" id="amount-input">
            </div>
            <div class="input-group col-xs-4 col-xs-offset-4" style="margin-top:25px;">
                <button id="send-payment-btn" class="btn btn-primary btn-lg" style="width: 100%"> Enviar </button>                
            </div>
        </div>
    `)

    $('#send-payment-btn').click(e => sendPaymentRequest())
}

const showAccountStatus = async ($target) => {
    let accountStatus = await getAccountStatusRequest()
    let paymentList = await getPaymentListRequest()

    let html = ''

    $target.html(`
        <div id="account-status" class="row" style="text-align: center">
            <div class="col-xs-6 col-xs-offset-3"> <h3> Saldo: Bs. ${accountStatus.amount}</h3></div>
            <div class="col-xs-12">
                <table class="table table-hover">
                    <thead>
                        <th style="text-align:center">Codigo</th>
                        <th style="text-align:center">Monto</th>
                        <th style="text-align:center">Estatus</th>
                    </thead>
                    <tbody>
                        ${paymentList.map(payment => {
                            return `
                                <tr>
                                    <td> ${payment.codigo} </td>
                                    <td> Bs. ${payment.monto} </td>
                                    <td> ${payment.estatus} </td>
                                </tr>`
                            }).join(' ')}
                    </tbody>
                </table>
            </div>
        </div>
    `)
}

const showMessage = (message) => {
    $.toast({
        heading: 'Información',
        text: message,
        hideAfter: 2000,
        icon: 'info'
    })
}

const sendPaymentRequest = () => {
    let code = $('#code-input').val()
    let amount = $('#amount-input').val()

    if (!code || !amount) return

    $('#code-input').attr('disabled', true)
    $('#amount-input').attr('disabled', true)
    $('#send-payment-btn').attr('disabled', true)

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/payments/voucher/create',
        data: { userId: defaultUser, code: $('#code-input').val(), amount: $('#amount-input').val() },
        dataType: 'json',
        success: function (response) {
            showMessage(response.message)
        },
        error: function () {
            showMessage('Error')
        },
        complete: function () {
            $('#code-input').attr('disabled', false)
            $('#amount-input').attr('disabled', false)
            $('#send-payment-btn').attr('disabled', false)

            $('#code-input').val('')
            $('#amount-input').val('')
        }
    })
}

const getAccountStatusRequest = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/payments/${defaultUser}`,
            dataType: 'json',
            success: function (response) {
                resolve(response)
            },
            error: function () {
                showMessage('Error')
                reject(new Error('error'))
            }
        })
    })
}

const getPaymentListRequest = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/payments/voucher/${defaultUser}`,
            dataType: 'json',
            success: function (response) {
                resolve(response)
                showMessage('Estado de cuenta obtenido correctamente')
            },
            error: function () {
                showMessage('Error')
                reject(new Error('error'))
            }
        })
    })
}
