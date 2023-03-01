import React from 'react';
import {useMeasure} from 'react-use';

import PreviewElement from './canvas/PreviewElement';

import './TabContent.css';

import previews from '../fake.data/previews';

export default function TabContent({type, setSelectedElement}){

	const [ref, {width, height}] = useMeasure();

	// const handleSelectElement 

	return (
		<div ref={ref} className='tab-content'>
			{previews.filter((el) => el.metatype === type).map((el, ind) => {
				return <PreviewElement type={type} setSelectedElement={setSelectedElement} key={ind} width={width} height={height} previewProps={el} />
			})}
		</div>
	);
}