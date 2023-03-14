// import React from 'react'
// import PaymentForm from './PaymentForm';
// import {loadStripe} from '@stripe/stripe-js';


// const stripeTestPromise = loadStripe('pk_test_51MecxESI2ynGCKECkwE6v1yAnK7Kpg47SvO2KIkNoslBDn09QKUMnMC3i8wASJH8Ob0Rb1di1ejeym0o2QTEcvpM00aLc6BcaX');
// const StripeContainer = () => {
//   return (
// <Elements stripe={stripeTestPromise}>
// <PaymentForm/>
// </Elements>
//     )
// }

// export default StripeContainer

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51MecxESI2ynGCKECkwE6v1yAnK7Kpg47SvO2KIkNoslBDn09QKUMnMC3i8wASJH8Ob0Rb1di1ejeym0o2QTEcvpM00aLc6BcaX"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({reqObj}) {
	return (
		<Elements stripe={stripeTestPromise}>
            <PaymentForm  token={reqObj}/>
		</Elements>
	)
}