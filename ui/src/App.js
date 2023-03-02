import React from 'react';
import { useMeasure } from 'react-use';
import { Layout } from 'antd';
import { v4 as uuid } from 'uuid';

import SideBar from './components/layouts/SideBar';
import Canvas from './components/canvas/Canvas';
import FormDialog from './components/Dialog';
import VerticalTabs from './components/VerticalTabs';

import './App.css';

import _elements from './fake.data/elements';

const { Header, Content } = Layout;

export default function App() {
	const [ref, { width, height }] = useMeasure();
	const canvasRef = React.useRef();
	
	const onSave = () => {
		const data = canvasRef?.current?.toDataURL();
		console.log(data); // link of canvas image
	};
	
	const [selectedElement, setSelectedElement] = React.useState();
	const [elements, setElements] = React.useState(_elements);

	React.useEffect(() => {
		if (selectedElement && !Array.isArray(selectedElement)){
			setElements([...elements, selectedElement]);
		}
		if (selectedElement && Array.isArray(selectedElement)){
			setElements([...elements, ...selectedElement]);
		}

	}, [selectedElement])

	return (
		<Layout>
			<Header
				style={{ padding: 0, minHeight: '50px', maxHeight: '50px' }}
			>
				<FormDialog />
				<button onClick={onSave}>Save</button>
			</Header>

			<Layout className='site-layout' style={{ marginLeft: 450 }}>
				<SideBar className='site-sidebar'>
					<VerticalTabs setSelectedElement={setSelectedElement} />
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
						width={width}
						height={height}
					/>
				</Content>
			</Layout>
		</Layout>
	);
}
