const functions = require("firebase-functions")
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const  cors = require("cors");
const stripe = require("stripe")(
    'sk_test_51NrCkySHYBUIxPcUqcQ4Yxypee91ujeoxZKFrhoajdbXSUSUbt0yMLJgJCZxWq26Yq04f0Y6zWmMPPCzKE1jbobk00C1FL3hfF'
)
const client_id = "TEST10026894c5d75ec89fb9ed1deaf749862001";
const client_secret = "TEST7f452f358066d1a990743d267cf5b60ad99d15ec";
const axios = require("axios")

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  try{
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
    payment_method_types: ['card'],

  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });    
  }catch(error){
    console.log(error);
  }

});
app.post("/pretransaction",async (req,res)=>{
  const baseUrl = "https://sandbox.cashfree.com/pg/orders";
  const body = req.body;
  console.log(body)
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
        order_id: ""+"order_"+Math.ceil(Math.random()*10000),
        order_amount: 200,
        order_currency: "INR",
        customer_details: {
          customer_id:"blahs23",
          customer_phone: "9871887737",
        },
      }
    }
    const response = await axios(options)
    console.log(response.data);
    res.status(200).send(response.data); 


})

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-4b2b2/us-central1/api


