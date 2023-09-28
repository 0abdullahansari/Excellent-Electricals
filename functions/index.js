const functions = require("firebase-functions")
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const  cors = require("cors");
const client_id = "TEST10026894c5d75ec89fb9ed1deaf749862001";
const client_secret = "TEST7f452f358066d1a990743d267cf5b60ad99d15ec";
const axios = require("axios")
const orderid = require('order-id')('excel');
const fs = require('fs')
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// app.post("/payments/create", async (request, response) => {
//   const total = request.query.total;
//   try{
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: total, // subunits of the currency
//     currency: "usd",
//     payment_method_types: ['card'],

//   });

//   // OK - Created
//   response.status(201).send({
//     clientSecret: paymentIntent.client_secret,
//   });    
//   }catch(error){
//     console.log(error);
//   }

// });


app.post("/pretransaction",async (req,res)=>{
  // const baseUrl = "https://sandbox.cashfree.com/pg/orders";
  // const body = req.body;
  // console.log(body)
    console.log(req.body);
    id=orderid.generate();
    const options = {
      url: "https://sandbox.cashfree.com/pg/orders",
      method: "post",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        'x-client-id': client_id,
        'x-client-secret': client_secret,
        'x-api-version': '2022-09-01'
      },
      data: {
        order_id: String(id),
        order_amount: req.body.amount,
        order_currency: "INR",
        customer_details: {
          customer_id: req.body.customerPhone,
          customer_email: req.body.customerId,
          customer_phone: req.body.customerPhone,
        },
        order_meta: {return_url: `http://localhost:5173/orders?order_id=${id}`}
      }
    }
    try{
      const response = await axios(options);
      res.status(200).send(response.data); 
    }catch(error){
      console.log(error);

      res.status(401).json({message:error});

    }
    
    


})

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-4b2b2/us-central1/api


