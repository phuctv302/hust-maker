import React from 'react';
import { v4 as uuid } from 'uuid';

import { Stage, Layer, Image } from 'react-konva';

import './PreviewElement.css';

export default function PreviewElement({width, previewProps, setSelectedElement}){
	const stageRef = React.useRef(null);
	const imageRef = React.useRef(null);

	let image = new window.Image();
	image.crossOrigin = 'Anonymous';
	image.src = previewProps.src;

	const handleElementDbClick = (type) => {
		let element = {...previewProps, id: `${type}_${uuid().slice(0, 8)}`};
		setSelectedElement(element)
	}

	return (
		<Stage className='preview-canvas' ref={stageRef} width={width/2} height={width/2}>
			<Layer>
				<Image
					ref={imageRef}
					onDblClick={() => {
						handleElementDbClick('image')
					}}
					{ ...previewProps }
					image={image}
					width={stageRef.current?.width()}
					height={stageRef.current?.height()}
				/>
			</Layer>
		</Stage>
	);
}