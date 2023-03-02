import React from 'react';
import { v4 as uuid } from 'uuid';

import { Stage, Layer, Image, Text, Rect } from 'react-konva';

import templates from '../../fake.data/templates';

const initTemp = templates[0];

export default function PreviewTemplate({width, previewProps, setSelectedElement}){

	return (
		<Stage>

		</Stage>
	);
}