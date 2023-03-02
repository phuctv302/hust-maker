import React from 'react';
import { v4 as uuid } from 'uuid';
import { useMeasure } from 'react-use';

import { Stage, Layer, Image, Text, Rect, Group } from 'react-konva';

import './PreviewElement.css';

function getElement(previewProps, ref, other) {
	const { stageRef, ind } = other;

	if (previewProps.metatype === 'image') {
		let image = new window.Image();
		image.crossOrigin = 'Anonymous';
		image.src = previewProps.src;
		return (
			<Image
				key={ind}
				ref={ref}
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
				{...previewProps}
				width={stageRef?.current?.width()}
				height={stageRef?.current?.height()}
			/>
		);
	}

	return '';
}

function getTemplate(elements, stageRef) {
	return (
		<Group>
			{elements.map((el, ind) => {
				if (el.metatype === 'image') {
					let image = new window.Image();
					image.crossOrigin = 'Anonymous';
					image.src = el.src;
					return <Image key={ind} {...el} image={image} />;
				}
				if (el.metatype === 'text') {
					return <Text key={ind} {...el} height={el.fontSize} />;
				}
				if (el.metatype === 'rectangle') {
					return <Rect key={ind} {...el} />;
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
	canvasWidth,
	canvasHeight,
}) {
	const stageRef = React.useRef(null);
	const ref = React.useRef(null);

	let handlePreviewDbClick = () => {
		let element = {
			...previewProps,
			id: `${previewProps.metatype}_${uuid().slice(0, 8)}`,
		};
		setSelectedElement(element);
	};

	let elHtml = getElement(previewProps, ref, {
		stageRef,
	});
	if (previewProps.metatype === 'template') {
		let elements = previewProps.elements;
		let _elements = JSON.parse(JSON.stringify(elements));

		elHtml = getTemplate(_elements, stageRef);

		handlePreviewDbClick = () => {
			const offsetX = canvasWidth / 2 - 50 * 2;
			const offsetY = canvasHeight / 2 - 100 * 2;
			elements = elements.map((el, ind) => {
				return {
					...el,
					id: `${el.metatype}_${uuid().slice(0, 8)}`,
					x: el.x * 2 + offsetX,
					y: el.y * 2 + offsetY,
					width: el.width * 2,
					height: el.height * 2,
				};
			});

			setSelectedElement(elements);
		};
	}

	return (
		<Stage
			onDblClick={handlePreviewDbClick}
			className='preview-canvas'
			ref={stageRef}
			width={previewProps.metatype === 'text' ? width-10 : width / 2 - 10}
			height={
				previewProps.metatype === 'text'
					? previewProps.fontSize
					: width / 2 - 10
			}
		>
			<Layer>{elHtml}</Layer>
		</Stage>
	);
}
