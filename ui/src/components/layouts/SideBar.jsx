import React from 'react';
import { Layout } from 'antd';


const { Sider } = Layout;

export default function SideBar(props) {
	return (
		<Sider
			className={props.className}
			width={450}
			style={{
				overflow: 'auto',
				height: 'calc(100vh - 50px)',
				position: 'fixed',
				left: 0,
				top: '50px',
				bottom: 0,
			}}
		>
			{props.children}
		</Sider>
	);
}
