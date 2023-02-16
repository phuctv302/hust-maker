import React from 'react';

import { Stage, Layer, Text } from 'react-konva';

import Rectangle from './Rectangle';
import Image from './HmImage';

export default function Canvas({width, height}) {
	let initRect = {
		x: 100,
		y: 10,
		width: 100,
		height: 100,
		fill: 'red',
		id: 'rect1',
		rotation: 90,
	};
	let initImg = {
		x: 200,
		y: 100,
		width: 100,
		height: 100,
		id: 'image1',
		rotation: 111,
	};

	const [rect, setRect] = React.useState(initRect);
	const [image, setImage] = React.useState(initImg);
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
			onMouseDown={checkDeselect}
			onTouchStart={checkDeselect}
			className='site-stage'
			width={width}
			height={height}
		>
			<Layer>
				<Text text='Some text on canvas' fontSize={15} />

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
					src='https://konvajs.org/assets/lion.png'
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
}
