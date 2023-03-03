import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LocalMallIcon from '@mui/icons-material/LocalMall';

import axios from 'axios';

export default function FormDialog({stripePromise, canvasRef}) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// to get input value
	const nameRef = React.useRef('');
	const emailRef = React.useRef('');
	const addressRef = React.useRef('');
	const contactRef = React.useRef('');

	const handleContinue = async () => {
		console.log(nameRef.current.value)
		console.log(emailRef.current.value)
		console.log(addressRef.current.value)
		console.log(contactRef.current.value);
		const stripe = await stripePromise;

		const session = await axios(`http://127.0.0.1:4354/api/v1/checkout-session/1`);
		await stripe.redirectToCheckout({
			sessionId: session.data.session.id
		});

		setOpen(false)
	}

	return (
		<div>
			<Button size='small' startIcon={<LocalMallIcon />} variant='contained' onClick={handleClickOpen}>
				Print product
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Shipping details</DialogTitle>
				<DialogContent>
					<img src={canvasRef?.current?.toDataURL()} style={{width: '50%'}} alt='product preview' />
					<DialogContentText>
						Please enter exact your information so that we can deliver product quickly to you.
					</DialogContentText>
					<TextField
						required
						autoFocus
						margin='dense'
						id='name'
						label='Full name'
						type='text'
						fullWidth
						variant='standard'
						inputRef={nameRef}
					/>
					<TextField
						margin='dense'
						id='email'
						label='Email Address'
						type='email'
						fullWidth
						variant='standard'
						inputRef={emailRef}
					/>
					<TextField
						required
						margin='dense'
						id='contact'
						label='Contact number'
						type='text'
						fullWidth
						variant='standard'
						inputRef={contactRef}
					/>
					<TextField
						required
						margin='dense'
						id='address'
						label='Receive Address'
						type='text'
						fullWidth
						variant='standard'
						inputRef={addressRef}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleContinue}>Continue</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
