import React from 'react';
import { useMeasure } from 'react-use';

import { Layout, Button, Space } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ViewListIcon from '@mui/icons-material/ViewList';
import InterestsIcon from '@mui/icons-material/Interests';
import ImageIcon from '@mui/icons-material/Image';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';

import SideBar from './components/layouts/SideBar';
import Test from './components/canvas/Test';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

const { Header, Content } = Layout;

export default function App() {
	const [ref, { width, height }] = useMeasure();
	console.log('current size:');
	console.log(width);
	console.log(height);

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
					}}
				>
					<Test width={width} height={height} />
				</Content>
			</Layout>
		</Layout>
	);
}
