import React from 'react';

import { Stage, Layer } from 'react-konva';

import Rectangle from './Rectangle';
import Image from './HmImage';
import Text from './HmText';

import elements from '../../fake.data/elements';

export default function Canvas({ width, height }) {
	let initRect = elements[0];
	let initImg = elements[1];
	let initText = elements[2];

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
			onMouseDown={checkDeselect}
			onTouchStart={checkDeselect}
			className='site-stage'
			width={width}
			height={height}
		>
			<Layer>
				<Text
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
