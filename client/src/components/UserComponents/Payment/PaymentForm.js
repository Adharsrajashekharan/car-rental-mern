// import React from 'react'
// import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
// import axios  from 'axios';
// import { useState } from 'react';

// const PaymentForm = () => {
//     const [success, setSuccess] = useState(false)
//     const stripe = useStripe();
//     const elements = useElements();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
    
//         const {error, paymentMethod} = await stripe.createPaymentMethod({
//             type: 'card',
//             card: elements.getElement(CardElement),
//           });
        

//         if (!error) {
//             try {
//                 const {id}=paymentMethod
//                 const response =await axios.post('/api/v1/user/payment',{
//                     amount:1000,
//                     id,
//                 })
//             if(response.data.success){
//                 console.log("successful payment")
//                 setSuccess(true)
//             }



//             } catch (error) {
//                 console.log("Error",error)
//             }
//           }else{
//             console.log(error.message)
//           }
      
//   return (
// <>
// {!success?
// <form onSubmit={handleSubmit}>
// <fieldset className='FormGroup'>
//     <div className='FormRow'>
//         <CardElement options={CARD_OPTIONS} />
//     </div>
// </fieldset>
// <button>pay</button>
// </form>
// :
// <div>
//     <h2>you just bought it</h2>
// </div>
// }

// </>
//   )
// }
// }
// export default PaymentForm


import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm({token}) {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()

// console.log("pronav",token.onToken?.totalAmount)
console.log("aromalzzz",token)

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("/api/v1/user/payment", {
                amount:token.reqObj.totalAmount,
                id,
                token
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button>Pay</button>
        </form>
        :
       <div>
           <h2>Thank you for your booking please collect the car on the allocated date</h2>
       </div> 
        }
            
        </>
    )
}



// const response =await axios.post('/api/v1/user/payment',{
