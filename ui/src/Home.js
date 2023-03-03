import React from 'react';
import { useMeasure } from 'react-use';
import { Layout } from 'antd';
import ShapeLineIcon from '@mui/icons-material/ShapeLine';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import SideBar from './components/layouts/SideBar';
import Canvas from './components/canvas/Canvas';
import FormDialog from './components/Dialog';
import VerticalTabs from './components/VerticalTabs';

import './Home.css';

import _elements from './fake.data/elements';

const { Header, Content } = Layout;

// for undo, redo

// payment with stripe
const stripePromise = loadStripe(
	'pk_test_51JwyYkJ8FJNSI7ayLW0i2AeN1MCFPWcbnAmGrlYD4pXcAxNQhCv8cMoipLit6h6WWV4k9yImZmq9NyPqSEONLSXa00VUPxOQ2B'
);

export default function Home() {
	const [ref, { width, height }] = useMeasure();
	const canvasRef = React.useRef();

	const [selectedElement, setSelectedElement] = React.useState();
	const [elements, setElements] = React.useState(_elements);

	React.useEffect(() => {
		if (selectedElement && !Array.isArray(selectedElement)) {
			setElements([...elements, selectedElement]);
		}
		if (selectedElement && Array.isArray(selectedElement)) {
			setElements([...elements, ...selectedElement]);
		}
	}, [selectedElement]);

	return (
		<Layout>
			<Header
				className='site-header'
				style={{ minHeight: '50px', maxHeight: '50px' }}
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
					<div
						className='header-section'
						style={{ columnGap: '10px' }}
					>
						<UndoIcon
							className='header-button'
							style={{ color: '#fff' }}
						/>
						<RedoIcon
							className='header-button'
							style={{ color: '#fff' }}
						/>
					</div>
					<CloudDoneIcon style={{ color: '#fff' }} />
				</div>
				<div style={{ color: '#fff' }}>
					&#123;&#123;Project name&#125;&#125;
				</div>
				<div className='header-section right'>
					<FormDialog stripePromise={stripePromise} canvasRef={canvasRef} />
				</div>
			</Header>

			<Layout className='site-layout' style={{ marginLeft: 450 }}>
				<SideBar className='site-sidebar'>
					<VerticalTabs
						setSelectedElement={setSelectedElement}
						canvasWidth={width}
						canvasHeight={height}
					/>
				</SideBar>

				<Content
					ref={ref}
					className='site-content'
					style={{
						padding: '24px 16px 0',
						overflow: 'initial',
						height: 'calc(100vh - 50px)',
						overflow: 'hidden',
						position: 'relative',
					}}
				>
					<Canvas
						elements={elements}
						ref={canvasRef}
						width={width || 100}
						height={height || 100}
					/>
				</Content>
			</Layout>
		</Layout>
	);
}
