const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const clientId = "TEST10026894c5d75ec89fb9ed1deaf749862001";
const clientSecret = "TEST7f452f358066d1a990743d267cf5b60ad99d15ec";
const axios = require("axios");
const orderid = require("order-id")("excel");
const app = express();
import {db} from "../src/Firebase"

app.use(cors({origin: true}));

app.post("/pretransaction", async (req, res)=>{
  const id=orderid.generate();
  const options = {
    url: "https://sandbox.cashfree.com/pg/orders",
    method: "post",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "x-client-id": clientId,
      "x-client-secret": clientSecret,
      "x-api-version": "2022-09-01",
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
      order_meta: {return_url: `https://excellent-electical.vercel.app`},
    },
  };
  try {
    console.log("Trying");
    const response = await axios(options);          
    res.status(200).send(response.data);
  } catch (error) {
    console.log(error);
    res.status(401).json({message: error});
  }
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-4b2b2/us-central1/api


