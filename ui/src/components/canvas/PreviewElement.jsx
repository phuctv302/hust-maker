import React from 'react';
import { v4 as uuid } from 'uuid';

import { Stage, Layer, Image, Text, Rect } from 'react-konva';

import './PreviewElement.css';

export default function PreviewElement({
	width,
	previewProps,
	setSelectedElement,
}) {
	const stageRef = React.useRef(null);
	const ref = React.useRef(null);

	let image = new window.Image();
	image.crossOrigin = 'Anonymous';
	image.src = previewProps.src;

	const handleElementDbClick = (type) => {
		let element = { ...previewProps, id: `${type}_${uuid().slice(0, 8)}` };
		setSelectedElement(element);
	};

	let elHtml = '';
	let stageHeight = width / 2;
	if (previewProps.metatype === 'image') {
		elHtml = (
			<Image
				ref={ref}
				onDblClick={() => {
					handleElementDbClick('image');
				}}
				{...previewProps}
				image={image}
				width={stageRef.current?.width()}
				height={stageRef.current?.height()}
			/>
		);
	}
	if (previewProps.metatype === 'text') {
		elHtml = (
			<Text
				ref={ref}
				onDblClick={() => {
					handleElementDbClick('image');
				}}
				{...previewProps}
				align='center'
				width={stageRef.current?.width()}
			/>
			);
		stageHeight = previewProps.fontSize;
	}
	if (previewProps.metatype === 'rectangle') {
		elHtml = (
			<Rect 
				ref={ref}
				onDblClick={() => {
					handleElementDbClick('rectangle');
				}}
				{...previewProps}
				width={stageRef.current?.width()}
				height={stageRef.current?.height()}
			/>
		)
	}

	return (
		<Stage
			className='preview-canvas'
			ref={stageRef}
			width={previewProps.metatype === 'text' ? width : width / 2}
			height={stageHeight}
		>
			<Layer>{elHtml}</Layer>
		</Stage>
	);
}
