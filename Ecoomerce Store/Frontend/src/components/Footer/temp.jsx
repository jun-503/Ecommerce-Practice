

const Payment = () => {


const supportedInstruments = [{supportedMethods:'basic-card'}]
const paymentDetails = {total:{label:'total',amount:{currency:'USD',value:'10.00'}}}

const PaymentPromise = new PaymentRequest(supportedInstruments,paymentDetails)
PaymentPromise.show().then(paymentResponse => {
    paymentResponse.complete('success')
})

}


export default Payment