import React from 'react';

import { Image, Transformer } from 'react-konva';

const HmImage = ({ imageProps, isSelected, onSelect, onChange }) => {
	const imageRef = React.useRef();
	const trRef = React.useRef();

	const [img, setImg] = React.useState(imageProps);
	const handleOnChange = (newAttr) => {
		setImg(newAttr);
	} 

	React.useEffect(() => {
		if (isSelected) {
			// attach transformer to current node manually
			trRef.current.nodes([imageRef.current]);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	let image = new window.Image();
	image.crossOrigin = 'Anonymous';
	image.src = imageProps.src;

	return (
		<React.Fragment>
			<Image
				onClick={onSelect}
				onTap={onSelect}
				{...img}
				image={image}
				ref={imageRef}
				draggable
				onDragEnd={(e) => {
					// only x and y are mutated onDrag
					handleOnChange({
						...img,
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
					const node = imageRef.current;
					const scaleX = node.scaleX();
					const scaleY = node.scaleY();

					// reset scale back to 1
					node.scaleX(1);
					node.scaleY(1);

					handleOnChange({
						...img,
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

export default HmImage;
