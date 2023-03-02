import React from 'react';
import { v4 as uuid } from 'uuid';

import { Stage, Layer, Image, Text, Rect, Group } from 'react-konva';

import './PreviewElement.css';

function getElement(previewProps, ref, setSelectedElement, other) {
	const handleElementDbClick = (type) => {
		let element = { ...previewProps, id: `${type}_${uuid().slice(0, 8)}` };
		setSelectedElement(element);
	};
	const { stageRef, ind } = other;

	if (previewProps.metatype === 'image') {
		let image = new window.Image();
		image.crossOrigin = 'Anonymous';
		image.src = previewProps.src;
		return (
			<Image
				key={ind}
				ref={ref}
				onDblClick={() => {
					handleElementDbClick('image');
				}}
				{...previewProps}
				image={image}
				width={stageRef?.current?.width()}
				height={stageRef?.current?.height()}
			/>
		);
	}
	if (previewProps.metatype === 'text') {
		return (
			<Text
				key={ind}
				ref={ref}
				onDblClick={() => {
					handleElementDbClick('image');
				}}
				{...previewProps}
				align='center'
				width={stageRef?.current?.width()}
			/>
		);
	}
	if (previewProps.metatype === 'rectangle') {
		return (
			<Rect
				key={ind}
				ref={ref}
				onDblClick={() => {
					handleElementDbClick('rectangle');
				}}
				{...previewProps}
				width={stageRef?.current?.width()}
				height={stageRef?.current?.height()}
			/>
		);
	}

	return '';
}

function getTemplate(elements, setSelectedElement, stageRef) {
	const handleTemplateDbClick = () => {
		elements = elements.map((el, ind) => {
			return { ...el, id: `${el.metatype}_${uuid().slice(0, 8)}` };
		});

		setSelectedElement(elements);
	};

	return (
		<Group onDblClick={handleTemplateDbClick}>
			{elements.map((el, ind) => {
				if (el.metatype === 'image') {
					let image = new window.Image();
					image.crossOrigin = 'Anonymous';
					image.src = el.src;
					return (
						<Image
							key={ind}
							{...el}
							image={image}
						/>
					);
				}
				if (el.metatype === 'text') {
					return (
						<Text
							key={ind}
							{...el}
							height={el.fontSize}
						/>
					);
				}
				if (el.metatype === 'rectangle') {
					return (
						<Rect
							key={ind}
							{...el}
						/>
					);
				}

				return '';
			})}
		</Group>
	);
}

export default function PreviewElement({
	width,
	previewProps,
	setSelectedElement,
}) {
	const stageRef = React.useRef(null);
	const ref = React.useRef(null);

	let elHtml = getElement(previewProps, ref, setSelectedElement, {
		stageRef,
	});
	if (previewProps.metatype === 'template') {
		const elements = previewProps.elements;

		elHtml = getTemplate(elements, setSelectedElement, stageRef);
	}

	return (
		<Stage
			className='preview-canvas'
			ref={stageRef}
			width={previewProps.metatype === 'text' ? width : width / 2}
			height={
				previewProps.metatype === 'text'
					? previewProps.fontSize
					: width / 2
			}
		>
			<Layer>{elHtml}</Layer>
		</Stage>
	);
}
