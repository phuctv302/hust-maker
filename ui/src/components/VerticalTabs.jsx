import React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ViewListIcon from '@mui/icons-material/ViewList';
import InterestsIcon from '@mui/icons-material/Interests';
import ImageIcon from '@mui/icons-material/Image';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';

import TabContent from './TabContent';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			{...other}
			style={{width: '100%'}}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<div>{children}</div>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

export default function VerticalTabs({setSelectedElement}){
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box
			sx={{
				flexGrow: 1,
				bgcolor: 'background.paper',
				display: 'flex',
				height: 'inherit'
			}}
		>
			<Tabs
				orientation='vertical'
				variant='scrollable'
				value={value}
				onChange={handleChange}
				aria-label='Vertical tabs example'
				sx={{ borderRight: 1, borderColor: 'divider', width: '100px' }}
			>
				<Tab label='TEMPLATES' {...a11yProps(0)} icon={<ViewListIcon />}/>
				<Tab label='ELEMENTS' {...a11yProps(1)} icon={<InterestsIcon />}/>
				<Tab label='IMAGES' {...a11yProps(2)} icon={<ImageIcon />} />
				<Tab label='TEXT' {...a11yProps(3)} icon={<FormatColorTextIcon />} />
			</Tabs>

			<TabPanel value={value} index={0}>
				Item One
			</TabPanel>
			<TabPanel value={value} index={1}>
				<TabContent type='rectangle' setSelectedElement={setSelectedElement}/>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<TabContent type='image' setSelectedElement={setSelectedElement}/>
			</TabPanel>
			<TabPanel value={value} index={3}>
				<TabContent type='text' setSelectedElement={setSelectedElement}/>
			</TabPanel>
		</Box>
	);
}

export { TabPanel };