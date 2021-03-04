const express = require('express');
const cors = require('cors');
const path = require('path');
const stripe = require('stripe')('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')
// const stripe = require('stripe')('sk_test_51ILjckLMD5HkGN95IB5Sj2hOH76m3xvhePr6x8c4d1QSkmvYnc2epNB2JPcNlExbxDpUZlZ9vaNb9VxQJbJf21N600WILeNcSZ')

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.post('/payments/create', async (req, res) => {
    try {
        
        const { amount, shipping } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            shipping,
            amount,
            currency: 'inr'
        })

        res.status(200).send(paymentIntent.client_secret);

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
})

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})


app.listen(PORT, () => {
    console.log("server is up and running");
})
