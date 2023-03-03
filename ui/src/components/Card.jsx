import React from 'react';

import { Card } from 'antd';

import image from '../fake.data/image';

import './Card.css';

export default function OrderCard() {
	return (
		<Card className='order-card' style={{width: 400}}>
			<div className='product-img'>
				<img src={image} alt='product' />
			</div>

			<div className='content'>
				<div className='user'>
					<div className='fullname'>Tran van phuc</div>
					<div className='phone'>0984801847</div>
					<div className='address'>Hoang Mai, Ha Noi</div>
				</div>

				<div className='more'>
					<div className='quantity'>Quantity: 2</div>
					<div className='price'>98000</div>
				</div>
			</div>
		</Card>
	);
}
