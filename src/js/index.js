var React = require('react');
var ReactDOM = require('react-dom');
import PCHeader from './component/PCHeader.js';
import MediaQuery from 'react-responsive';
import {
	Button
} from 'antd';
import 'antd/dist/antd.css';
import '../css/pc.css';
import '../css/mobile.css';
import PCIndex from './component/PC_Index.js';
import MobileIndex from './component/Mobile_Index.js';
import PCNewsDetails from './component/PCNewsDetails.js';
import MobileNewsDetails from './component/Mobile_news_details.js';
import PCNewsBlock from './component/PCNewsBlock.js';
import PCUserCenter from './component/PCUserCenter.js';
import {
	BrowserRouter,
	HashRouter,
	Router,
	Match,
	Link,
	Route,
	hashHistory,
	IndexLink
} from 'react-router-dom';
export default class Root extends React.Component {
	render() {
		return (
			<div>
				<MediaQuery query='(min-device-width:1224px)'>
				<HashRouter history={hashHistory}>
				<div>
				 <Route path="/" component={PCIndex} exact={true}></Route>
		            <Route path="/details/:uniquekey" component={PCNewsDetails}></Route> 
					<Route path="/usercenter" component={PCUserCenter}></Route>
				</div>    
				</HashRouter>
				</MediaQuery>
				<MediaQuery query='(max-device-width:1224px)'>
				<BrowserRouter>
				<div>
					<Route path="/" component={MobileIndex} exact={true}></Route>
		            <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
				</div>
				</BrowserRouter>
				</MediaQuery>
			</div>
		);
	};
}
ReactDOM.render(
	<Root/>,
	document.getElementById('app')
);