import React from 'react';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal,
	Card,
	notification,
	Row,
	Col
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
const FormItem = Form.Item;
class CommonComments extends React.Component {
	constructor() {
		super();
		this.state = {
			comments: ''
		};
	};
	componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({
				comments: json
			});
			console.log(json);
		});
	};

	handleSubmit(e) {
		e.preventDefault();
		var myFetchOption = {
			method: 'GET'
		}
		let formData = this.props.form.getFieldsValue();
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + '&uniquekey=' +
			this.props.uniquekey + '&commnet=' + formData.remark, myFetchOption).then(response => response.json()).then(json => {	
			this.componentDidMount();
		});
	}
	addUserCollection(e) {
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		}
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			notification['success']({
				message: 'ReactNew提醒',
				description: '收藏文章成功'
			});
		});
	}
	render() {
		let {
			getFieldDecorator
		} = this.props.form;
		const {
			comments
		} = this.state;
		const commentLists = comments.length ? comments.map((comment, index) => {
			// console.log(comment.UserName, comment.datetime, comment, index, 'commentList555555555555');
			return (<Card key={index} title={comment.UserName} extra={< a href = "#" > 发布于 {comment.datetime} </a>}>
				<p>{comment.Comments}</p>
			</Card>)
		}) : '没有加载到任何评论';
		return (
			<div class="comment">
				<Row>
					<Col span={24}>
						{commentLists}
						<Form onSubmit ={this.handleSubmit.bind(this)} >
							<FormItem label="您的评论">
							 {getFieldDecorator('remark')(
           						<Input type="textarea" placeholder="随便写"/>
          					)}
								
							</FormItem>
							<Button type="primary" htmlType="submit">提交评论</Button>
							&nbsp;&nbsp;
							<Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
						</Form>
					</Col>
				</Row>
			</div>
		);
	}
}
export default CommonComments = Form.create({})(CommonComments);