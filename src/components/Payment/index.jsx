import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from "../../StateProvider"
import CheckoutProduct from "../CartProducts";
import { Link, useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../reducer";
import axios from '../../axios';
import { db } from "../../Firebase";

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const cashfree = new window.Cashfree({
        mode:"sandbox" 
    });

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
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

        let checkoutOptions = {
            paymentSessionId: payment_session_id,
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
                                    
                                    <button disabled={processing || succeeded}>
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
