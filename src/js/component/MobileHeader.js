import React from 'react';
import {
	Menu,
	Icon,
	Tabs,
	Form,
	Input,
	Button,
	CheckBox,
	Modal,
	Row,
	Col,
	message
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
const InputGroup = Input.Group;
import {
	Router,
	Route,
	Link,
	browserHistory
} from 'react-router';
class MobileHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 'top',
			modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: 'xiaojianren',
			userId: 0
		}
	}
	componentWillMount() {
		if (localStorage.userid != '') {
			this.setState({
				hasLogined: true
			});
			this.setState({
				userNickName: localStorage.userNickName,
				userId: localStorage.userid
			});
		}

	}
	handleOk() {
		let me = this;
		me.setState({
			modalVisible: false
		});
	}
	handleCancel(e) {
		let me = this;
		me.setState({
			modalVisible: false
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		var formData = this.props.form.getFieldsValue();
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.l_userName + "&password=" + formData.l_password + "&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				this.setState({
					userNickName: json.NickUserName,
					userId: json.UserId
				});
				localStorage.userid = json.UserId;
				localStorage.userNickName = json.NickUserName;
			});
		if (this.state.action == 'login') {
			this.setState({
				hasLogined: true
			});
		}
		console.log(this.state.action);
		message.success('请求成功');
		this.setState({
			modalVisible: false
		});
	}
	callback(key) {
		console.log(key);
		if (key == 1) {
			this.setState({
				action: 'login'
			});
		} else if (key == 2) {
			this.setState({
				action: 'register'
			});
		}
	};
	login() {
		console.log('onclick222222222222');
		let me = this;
		me.setState({
			modalVisible: true
		});
	}
	logout() {
		localStorage.userid = '';
		localStorage.userNickName = '';
		this.setState({
			hasLogined: false,
			modalVisible: false
		});
	}
	render() {
		console.log('Mobileheader777777777777');
		let {
			getFieldDecorator
		} = this.props.form;
		console.log(this.state.hasLogined);
		const userShow = this.state.hasLogined ?
			<Icon type="inbox"  /> :
			<Icon type="setting" onClick={this.login.bind(this)}/>

		return (
			<div id='MediaHeader'>
				<header>
					<img src='../../images/news.png' alt='logo'/>
					<span>ReactNews</span>
					{userShow}
				</header>
				<Modal title="用户中心" wrapClassName="vertical-center-modal"  visible={this.state.modalVisible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} >
          			<Tabs defaultActiveKey="1" type="card" onChange={this.callback.bind(this)} >
    				 	<TabPane tab="登入" key="1">
						<Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
       				    <FormItem>
          				 <InputGroup size="large">
                         <Col span={5}>
                          用户名：
                          </Col>
                          <Col span={7}>
                             {getFieldDecorator('l_userName')(
           						<Input  placeholder="请输入用户名" />
          					)}
                          </Col>
                         </InputGroup>
                         </FormItem>
		    			 <FormItem>
		     				<InputGroup size="large">
		      				<Col span={5}>
		       				 密码：
		      				</Col>
		      				<Col span={7}>
		       				 {getFieldDecorator('l_password')(
           						<Input  type="password" placeholder="请输入密码" />
          					)}
		     				 </Col>
		    				</InputGroup>

		   				</FormItem>
        				<FormItem>
          				    <Button type="primary" htmlType="submit" className="login-form-button">
          					 登录
          					</Button>
        				</FormItem>
      					</Form>
    				</TabPane>
    				<TabPane tab="注册" key="2" >
						<Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
						<FormItem>
      					<InputGroup size="large">
          				<Col span={5}>
           				 用户名：
          				</Col>
          				<Col span={7}>
            					{getFieldDecorator('r_userName')(
           						<Input  placeholder="请输入用户名"/>
          					)}
         				 </Col>
        				</InputGroup>
        				</FormItem>
        				<FormItem>
      					<InputGroup size="large">
          				<Col span={5}>
            				密码：
         				 </Col>
          				<Col span={7}>
            					{getFieldDecorator('r_password')(
           						<Input  type="password" placeholder="请输入密码"/>
          					)}
          				</Col>
        				</InputGroup>
        				</FormItem>
        				<FormItem>
      	 				<InputGroup size="large">
          				<Col span={5}>
           						 密码：
          				</Col>
         				 <Col span={7}>
           						 {getFieldDecorator('r_confirmPassword')(
           						<Input  type="password" placeholder="请再次确认密码"/>
          					)}
         				 </Col>
        				</InputGroup>
        				</FormItem>
        				<Button type="primary" htmlType="submit" className="login-form-button">
        				注册
          				</Button>
						</Form>
    				</TabPane>
  				</Tabs>
        </Modal>
			</div>
		);
	}
}
export default MobileHeader = Form.create({})(MobileHeader);