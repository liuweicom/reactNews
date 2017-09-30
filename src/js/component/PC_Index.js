import React from 'react';
import PCHeader from './PCHeader.js';
import PCFooter from './PCFooter.js';
import PCNewsContainer from './PCNewsContainer.js';
import MobileIndex from './Mobile_Index.js';
import {
	BrowserRouter,
	Router,
	HashRouter,
	Match,
	Link,
	Route,
	hashHistory,
	IndexLink
} from 'react-router-dom';
export default class PCIndex extends React.Component {
	render() {
		console.log('PCINdex88888888888888');
		return (
			<div>
				<PCHeader> </PCHeader>
				<PCNewsContainer/>
				<PCFooter></PCFooter>
			</div>
		);
	}
}