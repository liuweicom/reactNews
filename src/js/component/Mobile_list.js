import React from 'react';
import {
	Row,
	Col,
	Menu,
	Icon
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
export default class MobileList extends React.Component {
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
	};

	render() {
		console.log('MobileList77777');
		const {
			news
		} = this.state;
		const newsList = news.length ?
			news.map((newsItem, index) => (
				<section key={index} class='m_article list-item special_section clearfix'>
					
						<Link to={`details/${newsItem.uniquekey}`}>
							<div class='m_article_img'>
								<img src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
							</div>
							<div class="m_article_info">
								<div class='m_article_info'>
									<span>{newsItem.title}</span>
								</div>
								<div class='m_article_desc clearfix'>
								<div className="m_article_desc_l">
									<span class='m_article_channel'>{newsItem.realtype}</span>
									<span class='m_article_time'>{newsItem.date}</span>
								</div>
								</div>
							</div>
						</Link>
                    
				</section>
			)) : '没有加载到任何新闻';
		return (
			<div>
				 <Row>
           <Col span={24}>
             {newsList}
           </Col>
         </Row>
			</div>
		);
	};
}