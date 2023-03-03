const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(
	'sk_test_51JwyYkJ8FJNSI7ayUrJoF2N7oNBCoAcjwGNowRBKh5PQXMCFdLVCn5bmmL95SKM6GOKPUr2kiGZzWqvYlI9rURHt00rxLJ6Zqa'
);

const app = express();
app.use(cors());
app.use(express.json());

const router = express.Router();

router.get('/checkout-session/:designId', async (req, res, next) => {
	// create checkout session
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		success_url: `${req.protocol}://${req.get('host')}/`,
		cancel_url: `${req.protocol}://${req.get('host')}/`,
		customer_email: 'phuctanki323232@gmail.com',
		client_reference_id: req.params.designId,

		line_items: [
			{
				name: '{{Design}}',
				description: '{{Description}}',
				images: ['https://konvajs.org/assets/lion.png'],
				amount: 100000,
				currency: 'usd',
				quantity: 1
			},
		],
	});

	res.status(200).json({
		status: 'success',
		session
	})
});

app.use('/api/v1/', router);

app.listen(4354, () => {
	console.log('App is listening on port 4354');
});
