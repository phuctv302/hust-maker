import React from 'react';
import { Link } from '@reach/router';
import { Layout } from 'antd';
import { Col, Row } from 'antd';
import ShapeLineIcon from '@mui/icons-material/ShapeLine'; // app logo
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';

import Card from './components/Card';

import orders from './fake.data/orders';

const { Header, Content } = Layout;

export default function Orders(props) {
	const search = window.location.search;
	const params = new URLSearchParams(search);
	const price = params.get('price');

	return (
		<Layout>
			<Header
				className='site-header'
				style={{
					position: 'sticky',
					top: 0,
					zIndex: 1,
					width: '100%',
					minHeight: '50px',
					maxHeight: '50px',
				}}
			>
				<div
					className='header-section left'
					style={{ height: 'inherit' }}
				>
					<ShapeLineIcon
						color='primary'
						fontSize='large'
						className='logo'
					/>
					<Button
						size='small'
						startIcon={<HomeIcon />}
						variant='contained'
						href='/'
					>
						Home
					</Button>
				</div>
			</Header>

			<Content className='site-layout' style={{ padding: '0 50px' }}>
				<div
					style={{
						padding: 24,
						background: '#fff',
						minHeight: 'calc(100vh - 50px)',
						maxHeight: 'calc(100vh - 50px)',
						overflow: 'auto',
					}}
				>
					<div style={{
						display: 'grid',
					gridTemplateColumns: 'auto auto auto' 
					}}>
						{orders.map((el) => (
							<Card />
						))}
					</div>
				</div>
			</Content>
		</Layout>
	);
}
