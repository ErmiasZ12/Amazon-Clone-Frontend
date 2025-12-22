
const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

setGlobalOptions({ maxInstances: 10 });


const express = require("express")
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

// const stripe = require("stripe")(functions.config().stripe.secret);

const app = express()

app.use(cors({origin:true}))

app.use(express.json());

app.get("/",(req,res) =>{
    res.status(200).json({
        message:"success !"
    })
})








// app.post("/payment/create", async(req, res)=>{
//     const total = parseInt(req.query.total)
//     if(total > 0) {

//         const paymentIntent = await stripe.paymentIntents.create({
//             amount:total,
//             currency:"usd"
//         })
//         res.status(201).json({
//             clientSecret: paymentIntent.client_secret
//     })
//     }else {
//         res.status(403).json({
//         message:"total must be greater than 0"
//     });
//     }
// });

// exports.api = onRequest(app);


// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// admin.initializeApp();

// const stripe = require("stripe")(functions.config().stripe.secret);

// exports.api = functions.https.onRequest((req, res) => {
//   res.send("API is working!");
// });

// exports.payment = functions.https.onRequest(async (req, res) => {
//   const total = req.query.total;

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: total,
//     currency: "usd",
//   });

//   res.status(201).send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });
// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const { defineSecret } = require("firebase-functions/params");

// admin.initializeApp();

// // 🔐 Define Stripe secret
// const STRIPE_SECRET = defineSecret("STRIPE_SECRET");

// // 💳 Stripe initialization (v7 compatible)

// const stripe = require("stripe")(STRIPE_SECRET.value());
// exports.payment = functions.https.onRequest(async (req, res) => {
//   try {
//     const total = Number(req.query.total);

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: total,
//       currency: "usd",
//     });

//     res.status(201).send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });


// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const { defineSecret } = require("firebase-functions/params");
// const stripeLib = require("stripe");

// admin.initializeApp();

// // 🔐 Define secret (NO .value() here)
// const STRIPE_SECRET = defineSecret("STRIPE_SECRET");

// exports.payment = functions.https.onRequest(
//   { secrets: [STRIPE_SECRET] },
//   async (req, res) => {
//     try {
//       // ✅ Secret accessed at runtime
//       const stripe = stripeLib(STRIPE_SECRET.value());

//       const total = Number(req.query.total);

//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: total,
//         currency: "usd",
//       });

//       res.status(201).send({
//         clientSecret: paymentIntent.client_secret,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send(error.message);
//     }
//   }
// );
