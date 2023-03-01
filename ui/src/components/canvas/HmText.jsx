import React from 'react';

import { Text, Transformer } from 'react-konva';

export default function HmText({
	stage,
	textProps,
	isSelected,
	onSelect,
}) {
	const textRef = React.useRef();
	const trRef = React.useRef();

	const [text, setText] = React.useState(textProps);
	const handleOnChange = (newAttr) => {
		setText(newAttr);
	} 

	React.useEffect(() => {
		if (isSelected) {
			// attach transformer to current node manually
			trRef.current.nodes([textRef.current]);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	const onEdit = () => {
		const textNode = textRef.current;
		const tr = trRef.current;

		textNode.hide();
		tr.hide();

		// textarea over canvas with absolute position
		const textPosition = textNode.absolutePosition();

		// position of textarea
		const stageBox = stage.container().getBoundingClientRect();
		console.log(stageBox.left);
		console.log(stageBox.right);
		const areaPosition = {
			x: textPosition.x,
			y: textPosition.y,
		};

		// create textarea
		const textarea = document.createElement('textarea');
		document.querySelector('.site-stage').appendChild(textarea);

		// apply style to textarea
		textarea.value = textNode.text();
		textarea.style.position = 'absolute';
		textarea.style.top = areaPosition.y + 'px';
		textarea.style.left = areaPosition.x + 'px';
		textarea.style.width = textNode.width();

		textarea.focus();

		// update value for Text on canvas
		textarea.addEventListener('keydown', function (e) {
			// hide on enter
			if (e.keyCode === 13) {
				textNode.text(textarea.value);
				document.querySelector('.site-stage').removeChild(textarea);
				textNode.show();
				tr.show();
			}
		});

		textarea.addEventListener('blur', (event) => {
			textNode.text(textarea.value);
			document.querySelector('.site-stage').removeChild(textarea);
			textNode.show();
			tr.show();
		});
	};

	return (
		<React.Fragment>
			<Text
				onClick={onSelect}
				onTap={onSelect}
				ref={textRef}
				{...text}
				draggable
				onDragEnd={(e) => {
					// only x and y are mutated onDrag
					handleOnChange({
						...text,
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
					const node = textRef.current;
					const scaleX = node.scaleX();
					const scaleY = node.scaleY();

					// reset scale back to 1
					node.scaleX(1);
					node.scaleY(1);

					handleOnChange({
						...text,
						x: node.x(),
						y: node.y(),

						// set width & height and its minimal value
						width: Math.max(5, node.width() * scaleX),
						height: Math.max(node.height() * scaleY),
					});
				}}
				onDblClick={onEdit}
				onDblTap={onEdit}
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
}
