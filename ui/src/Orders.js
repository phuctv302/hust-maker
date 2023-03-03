import React from 'react';
import {Link} from '@reach/router';

export default function Orders(props){

	const search = window.location.search;
	const params = new URLSearchParams(search);
	const price = params.get('price');

	return (
		<>
			<div>Orders {props.orderId}:{price} page</div>
			<Link to='/'>Go to Home page</Link>
		</>
	);
}