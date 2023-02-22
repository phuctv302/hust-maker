import React from 'react';
import useImage from 'use-image';
import { useMeasure } from 'react-use';

import { Layout, Button, Space } from 'antd';

import SideBar from './components/layouts/SideBar';
import Canvas from './components/canvas/Canvas';
import { Stage, Layer, Image } from 'react-konva';
import HmImage from './components/canvas/HmImage';

import products from './fake.data/products';

import './App.css';

const { Header, Content } = Layout;

export default function App() {
	const [ref, { width, height }] = useMeasure();

	const initProduct = products[0]

	return (
		<Layout>
			<Header
				style={{ padding: 0, minHeight: '50px', maxHeight: '50px' }}
			>
				Header
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
					<div className='bg-canvas' style={{  
						backgroundImage: "url(" + initProduct.image + ")",
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						position: 'absolute',
						top: 0,
						left: 0,
						width: initProduct.width,
						height: initProduct.height
					}}>

					</div>
					<Canvas width={width} height={height} />
				</Content>
			</Layout>
		</Layout>
	);
}
