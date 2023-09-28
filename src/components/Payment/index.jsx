import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from "../../StateProvider"
import CheckoutProduct from "../CartProducts";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../reducer";
import axios from '../../axios';
import { db } from "../../Firebase";

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const cashfree = new window.Cashfree({
        mode:"sandbox" //or production
    });

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [clientSecret, setClientSecret] = useState(true);


    // useEffect(() => {
    //     // generate the special stripe secret which allows us to charge a customer
    //     const getClientSecret = async () => {
    //         const response = await axios({
    //             method: 'post',
    //             // Stripe expects the total in a currencies subunits
    //             url: `/payments/create?total=${getBasketTotal(basket) * 100}`
    //         });
    //         console.log("Hello",response.data)
    //         setClientSecret(response.data.clientSecret)
    //     }

    //     getClientSecret();
    // }, [basket])

    const handleSubmit = async (event) => {
        event.preventDefault();
        // setProcessing(true);

        const body = JSON.stringify({
            amount:getBasketTotal(basket),
            customerId:user.email,
            customerPhone:"9871887737"
        })
        const options = {
            url:"/pretransaction",
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                amount:getBasketTotal(basket),
                customerId:user.email,
                customerPhone:"9871887737"
            }
        };
        const response = await axios(options);
        console.log(response);

        const payment_session_id = response?.data?.payment_session_id;
        const orderid=response?.data?.order_id;
        // console.log(window.Cashfree);
        // const cashfree = new window.Cashfree(payment_session_id);
        // cashfree.redirect();

        let checkoutOptions = {
            paymentSessionId: payment_session_id,
            // returnUrl: `http://localhost:5173/orders?order_id=${order_id}`,
            
        }
        cashfree.checkout(checkoutOptions).then(function(result){

            db
              .collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(orderid.id)
              .set({
                  basket: basket,
                  amount: orderid.amount,
                  created: orderid.created
              })
              for (let i = 1; i <= 1000; i++) {
                console.log(i);
            }
            

            if(result.error){
                alert(result.error.message)
            }
            else{
                console.log("Redirection")
                result.redirect
            }
        });



        // const dropinConfig = 
        // {
        //     paymentSessionId:payment_session_id,
        //     components: 
        //     [
        //         "order-details",
        //         "card",
        //         "netbanking",
        //         "app",
        //         "upi",
        //     ],
        //     onSuccess: function(data){
        //        //on success
        //     },
        //     onFailure: function(data){
        //        //on success
        //     },
        //     style: 
        //     {
        //         //to be replaced by the desired values
        //         backgroundColor: "#ffffff",
        //         color: "#11385b", 
        //         fontFamily: "Lato",
        //         fontSize: "14px",
        //         errorColor: "#ff0000",
        //         theme: "light"
        //     }
        // }
        // console.log("B4 drop");
        // const element = document.getElementsByClassName('payment')[0]
        // console.log(element);
        
        // cashfree.drop(element,dropinConfig);
        
        // console.log("aftr drop");
    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>

            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                </h1>


                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
            

                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                            {/* Stripe magic will go */}
                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>
                                {/* Errors */}
                                {error && <div>{error}</div>}

                                <div className='payment__priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"₹ "}
                                    />
                                    
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                                </div>

                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
