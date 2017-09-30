import React from 'react';
import {
	Row,
	Col,
	BackTop
} from 'antd';
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
import CommonComments from './common_comment.js';
import MobileHeader from './MobileHeader.js';
import MobileFooter from './MobileFooter.js';
export default class MobileNewsDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			newsItem: ''
		};
		this.news = null;
	};
	createMarkup() {
		if (!this.state.newsItem) {
			return;
		}
		return {
			__html: this.state.newsItem.pagecontent
		};
	}
	componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		}
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({
				newsItem: json
			});
			document.title = json.title + '-React News |React 驱动的新闻平台';
		});
	}
	render() {
		console.log('mobilenewsDetail77777777');
		return (
			<div id="mobileDetailsContainer">
				<MobileHeader></MobileHeader>
				<div class="ucmobileList">
					<Row>
						<Col span={24} className="container">
							<div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
							<hr/>
							<CommonComments uniquekey={this.props.match.params.uniquekey}/>
						</Col>
					</Row>
					<MobileFooter></MobileFooter>
					<BackTop/></div>
			</div>
		);
	}
}