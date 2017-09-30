import React from 'react';
import {
	Row,
	Col,
	Menu,
	Icon,
	Card
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

export default class PCNewsImageBlock extends React.Component {
	constructor() {
		super();
		this.state = {
			news: ''
		}
	}
	componentWillMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions).then(response => response.json()).then(json => this.setState({
			news: json
		}));
	}
	render() {
		const styleImage = {
			display: "block",
			width: this.props.imageWidth,
			height: "90px"
		};
		const styeH3 = {
			width: this.props.imageWidth,
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis"
		};
		const news = this.state.news;
		const newList = news.length ? news.map((newsItem, index) =>
			(
				<div key={index} class='imageblock'>
				<BrowserRouter> 
				<Link to={`details/${newsItem.uniquekey}`} target="_blank">
						<div class="custom-image">
							<img alt="" style={styleImage} src={newsItem.thumbnail_pic_s}/>
						</div>
						<div class="custom-card">
							<h3 style={styeH3}>{newsItem.title}</h3>
							<p>{newsItem.author_name}</p>
						</div>
				</Link>
				</BrowserRouter> 
			</div>
			)
		) : '暂时没有数据';
		return (
			<div class='topNewsList'>
				<Card title={this.props.cartTitle} style={{width:this.props.width}} bordered={true}> 
				{newList}
				</Card>
			</div>
		);
	};
}