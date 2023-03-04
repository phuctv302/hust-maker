import React from 'react';

import { Stage, Layer } from 'react-konva';

import Rectangle from './Rectangle';
import Image from './HmImage';
import Text from './HmText';

import './Canvas.css';

const Canvas = React.forwardRef(({ width, height, elements }, ref) => {
	const product = {
		x: 0,
		y: 0,
		width: ref?.current?.width(),
		height: ref.current?.height(),
		src: '/products/mug.png',
		listening: false,
	};

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

				{elements.map((el, ind) => {
					if (el.metatype === 'rectangle') {
						return (
							<Rectangle
								key={ind}
								shapeProps={el}
								isSelected={el.id === selectedId}
								onSelect={() => {
									selectShape(el.id);
								}}
							/>
						);
					}

					if (el.metatype === 'image') {
						return (
							<Image
								key={ind}
								imageProps={el}
								isSelected={el.id === selectedId}
								onSelect={() => {
									selectShape(el.id);
								}}
							/>
						);
					}

					if (el.metatype === 'text') {
						return (
							<Text
								key={ind}
								stage={ref?.current}
								textProps={el}
								isSelected={el.id === selectedId}
								onSelect={() => {
									selectShape(el.id);
								}}
							/>
						);
					}

					return null;
				})}
			</Layer>
		</Stage>
	);
});

export default Canvas;
