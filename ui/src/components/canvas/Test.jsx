import React from 'react';

import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

export default function Test({width, height}){
	console.log(width, height);

	return (
		<Stage width={width} height={height}>
			<Layer>
				<Text text='Some text on canvas' fontSize={15} />

				<Rect x={20} y={50} width={100} height={100} fill='red' shadowBlur={10} />

				<Circle x={200} y={100} radius={50} fill='green' />
			</Layer>
		</Stage>
	);
}