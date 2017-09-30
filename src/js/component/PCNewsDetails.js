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
import PCNewsBlock from './PCNewsBlock.js';
import PCNewsImageBlock from './PCNewsImageBlock.js';
import PCHeader from './PCHeader.js';
import PCFooter from './PCFooter.js';
export default class PCNewsDetails extends React.Component {
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
		return (
			<div>
				<PCHeader></PCHeader>
				<Row>
					<Col span={2}></Col>
					<Col span={14} className="container">
						<div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
						<hr/>
						<CommonComments uniquekey={this.props.match.params.uniquekey}/>
					</Col>
					<Col span={6}>
						<PCNewsImageBlock  count={6} type="guoji" width="400px" cartTitle="国际头条" imageWidth="112px"/>
					</Col>
					<Col span={2}></Col>
				</Row>
				<PCFooter></PCFooter>
				<BackTop/>
			</div>
		);
	}
}