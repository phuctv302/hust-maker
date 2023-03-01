import React from 'react';

import { Rect, Transformer } from 'react-konva';

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
	const shapeRef = React.useRef();
	const trRef = React.useRef();

	const [rect, setRect] = React.useState(shapeProps);
	const handleOnChange = (newAttr) => {
		setRect(newAttr);
	} 

	React.useEffect(() => {
		if (isSelected) {
			// attach transformer to current node manually
			trRef.current.nodes([shapeRef.current]);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	return (
		<React.Fragment>
			<Rect
				onClick={onSelect}
				onTap={onSelect}
				ref={shapeRef}
				{...rect}
				draggable
				onDragEnd={(e) => {
					// only x and y are mutated onDrag
					handleOnChange({
						...rect,
						x: e.target.x(),
						y: e.target.y(),
					});
				}}
				onTransformEnd={(e) => {
					/* 
						transformer will change scale of the node (not width & height)
						to match data better (only store width & height)
						reset scale to 1 and set width & height
					*/
					const node = shapeRef.current;
					const scaleX = node.scaleX();
					const scaleY = node.scaleY();

					// reset scale back to 1
					node.scaleX(1);
					node.scaleY(1);

					handleOnChange({
						...rect,
						x: node.x(),
						y: node.y(),

						// set width & height and its minimal value
						width: Math.max(5, node.width() * scaleX),
						height: Math.max(node.height() * scaleY),
					});
				}}
			/>

			{isSelected && (
				<Transformer
					ref={trRef}
					boundBoxFunc={(oldBox, newBox) => {
						// limit resize
						if (newBox.width < 5 || newBox.height < 5) {
							return oldBox;
						}

						return newBox;
					}}
				/>
			)}
		</React.Fragment>
	);
};

export default Rectangle;