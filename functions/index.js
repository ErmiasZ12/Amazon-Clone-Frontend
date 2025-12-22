
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

app.post("/payment/create", async(req, res)=>{
    const total = parseInt(req.query.total)
    if(total > 0) {

        const paymentIntent = await stripe.paymentIntents.create({
            amount:total,
            currency:"usd"
        })
        res.status(201).json({
            clientSecret: paymentIntent.client_secret
    })
    }else {
        res.status(403).json({
        message:"total must be greater than 0"
    });
    }
});

exports.api = onRequest(app);





// const { onRequest } = require("firebase-functions/https");
// const { defineSecret } = require("firebase-functions/params");
// const stripeLib = require("stripe");
// const express = require("express");
// const cors = require("cors");

// const STRIPE_SECRET = defineSecret("STRIPE_SECRET");

// const app = express();
// app.use(cors({ origin: true }));
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "success!" });
// });

// app.post("/create-payment-intent", async (req, res) => {
//   try {
//     // ⚠ Access secret at runtime
//     const stripe = stripeLib(STRIPE_SECRET.value());
//     const { total } = req.body;

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: total,
//       currency: "usd",
//     });

//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// });

// exports.api = onRequest(app);



