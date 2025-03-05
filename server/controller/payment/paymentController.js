// routes/payment.js

const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);
const User = require('../../models/Auth/userModel'); // Assuming User model is defined in models/User.js
const Contact = require("../../models/contact/contactModel");


const pricingPlans = [
  {
    id: 'basic',
    title: 'Basic',
    price: 500,
    features: [
      'Up to 50 Complaints per Month',
      'Basic Complaint Tracking',
      'Email Support',
    ],
  },
  {
    id: 'pro',
    title: 'Pro',
    price: 1200,
    features: [
      'Up to 200 Complaints per Month',
      'Advanced Complaint Tracking',
      'Priority Email Support',
      'Analytics Dashboard',
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    price: 2500,
    features: [
      'Unlimited Complaints',
      'Advanced Analytics & Reporting',
      'Dedicated Account Manager',
      '24/7 Priority Support',
      'Custom Workflows',
    ],
  },
];


const pricing = (req,res) =>{
    res.json(pricingPlans);
}


const payment = async (req, res) => {
    const { subscription, userId} = req.body;
    console.log(subscription);

    
    // const plan = pricingPlans.find((p) => p.id === planId);
    // if (!plan) {
    //     return res.status(404).json({ error: 'Plan not found' });
    // }


    const lineItems = subscription.map(() => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: sub.name
            },
            unit_amount: sub.price * 100, // assuming price is in lowest currency unit (e.g., paisa for INR)
        },
        quantity: 1
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.Base_URI}payment_success`,
            cancel_url: `${process.env.Base_URI}payment_failed`,
        });

        // Update user's subscription status in the database
       
        // Send session ID to client
        res.json({ id: session.id });
        

    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ error: "Failed to initiate payment" });
    }
};



module.exports = {payment, pricing};
