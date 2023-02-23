import React from 'react';

import { Stage, Layer } from 'react-konva';

import Rectangle from './Rectangle';
import Image from './HmImage';
import Text from './HmText';

import './Canvas.css';

import elements from '../../fake.data/elements';

const Canvas = React.forwardRef(({ width, height }, ref) => {
	let initRect = elements[0];
	let initImg = elements[1];
	let initText = elements[2];
	const product = {
		x: 0,
		y: 0,
		width: ref?.current?.width(),
		height: ref.current?.height(),
		src: '/products/mug.png',
		listening: false
	}

	const [rect, setRect] = React.useState(initRect);
	const [image, setImage] = React.useState(initImg);
	const [text, setText] = React.useState(initText);
	const [selectedId, selectShape] = React.useState(null);

	// deselect when clicked on empty area
	const checkDeselect = (e) => {
		const clickedOnEmpty = e.target === e.target.getStage();
		if (clickedOnEmpty) {
			selectShape(null);
		}
	};

	return (
		<Stage
			ref={ref}
			onMouseDown={checkDeselect}
			onTouchStart={checkDeselect}
			className='site-stage'
			width={width}
			height={height}
		>
			<Layer>
				<Image imageProps={product} />
				<Text
					stage={ref?.current}
					textProps={text}
					isSelected={text.id === selectedId}
					onSelect={() => {
						selectShape(text.id);
					}}
					onChange={(newAttrs) => {
						setText(newAttrs);
					}}
				/>

				<Rectangle
					key={0}
					shapeProps={rect}
					isSelected={rect.id === selectedId}
					onSelect={() => {
						selectShape(rect.id);
					}}
					onChange={(newAttrs) => {
						setRect(newAttrs);
					}}
				/>

				<Image
					imageProps={image}
					isSelected={image.id === selectedId}
					onSelect={() => {
						selectShape(image.id);
					}}
					onChange={(newAttrs) => {
						setImage(newAttrs);
					}}
				/>
			</Layer>
		</Stage>
	);
})

export default Canvas