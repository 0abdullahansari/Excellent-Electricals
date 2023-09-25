const functions = require("firebase-functions")
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const  cors = require("cors");
const stripe = require("stripe")(
    'sk_test_51NrCkySHYBUIxPcUqcQ4Yxypee91ujeoxZKFrhoajdbXSUSUbt0yMLJgJCZxWq26Yq04f0Y6zWmMPPCzKE1jbobk00C1FL3hfF'
)


const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-4b2b2/us-central1/api


