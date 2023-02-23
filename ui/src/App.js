import React from 'react';
import useImage from 'use-image';
import { useMeasure } from 'react-use';

import { Layout, Button, Space } from 'antd';

import SideBar from './components/layouts/SideBar';
import Canvas from './components/canvas/Canvas';

import products from './fake.data/products';


import './App.css';

const { Header, Content } = Layout;

export default function App() {
	const [ref, { width, height }] = useMeasure();
	const canvasRef = React.useRef();

	const initProduct = products[0]

	const onSave = () => {
		const data = canvasRef?.current?.toDataURL();
		console.log(data); // link of canvas image
	}

	return (
		<Layout>
			<Header
				style={{ padding: 0, minHeight: '50px', maxHeight: '50px' }}
			>
				<button onClick={onSave}>Save</button>
			</Header>

			<Layout className='site-layout' style={{ marginLeft: 450 }}>
				<SideBar className='site-sidebar' />

				<Content
					ref={ref}
					className='site-content'
					style={{
						padding: '24px 16px 0',
						overflow: 'initial',
						height: 'calc(100vh - 50px)',
						overflow: 'hidden',
						position: 'relative'
					}}
				>
					<Canvas ref={canvasRef} width={width} height={height} />
				</Content>
			</Layout>
		</Layout>
	);
}
