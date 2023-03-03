import React from 'react';
import { Router } from '@reach/router';

import Home from './Home';
import Orders from './Orders';
import NotFound from './NotFound';

import './App.css';

export default function App() {
	return (
		<Router>
			<Home path='/' />
			<Orders path='/orders/:orderId' />
			<NotFound default />
		</Router>
	);
}
