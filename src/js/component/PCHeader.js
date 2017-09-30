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
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
const InputGroup = Input.Group;
class PCHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 'top',
			modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: '',
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
		// componentDidMount() {
		// 	console.log(this.props.form.getFieldsValue(), 'getFieldsValue3333333');
		// }
	handleClick(e) {
		let me = this;
		if (e.key == 'register') {
			me.setState({
				current: e.key,
				modalVisible: true
			});
		} else {
			me.setState({
				current: e.key
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
		console.log(formData.l_userName, formData.l_password, formData.r_userName, formData.r_password, formData.r_confirmPassword, 'date5555555555555555555');
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.l_userName + "&password=" + formData.l_password + "&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				this.setState({
					userNickName: json.NickUserName,
					userId: json.UserId
				});
				localStorage.userid = json.UserId;
				localStorage.userNickName = json.NickUserName;
				console.log(localStorage.userid,localStorage.userNickName,33333333333333);
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
	// login() {
	// 	let me = this;
	// 	me.setState({
	// 		modalVisible: false
	// 	});
	// }

	logout() {
		localStorage.userid = '';
		localStorage.userNickName = '';
		this.setState({
			hasLogined: false,
			modalVisible: false
		});
	}
	render() {
		let {
			getFieldDecorator
		} = this.props.form;
		const userShow = this.state.hasLogined ?
			<Menu.Item key="logout" class="register">
					<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
					&nbsp;&nbsp;
					
					<Link target="_blank" to={`/usercenter`}>
					<Button type="dashed" htmlType="button">个人中心</Button>
					</Link>
					
					&nbsp;&nbsp;
					<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
			</Menu.Item> :
			<Menu.Item key="register" class="register">
					<Icon type="appstore" />登入\注册
			</Menu.Item>;
		return (
			<header>
				<Row>
					<Col span={2}></Col>
					<Col span={4}>
						<a href="/" className="logo"><img src="../../images/news.png"/><span> ReactNews</span></a></Col>
					<Col span={16}>
						<Menu mode='horizontal' selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)} >
							<Menu.Item key="top">
								<Icon type="appstore"/>头条
							</Menu.Item>
							<Menu.Item key="second">
								<Icon type="appstore"/>社会
							</Menu.Item>
							<Menu.Item key="third">
								<Icon type="appstore"/>国内
							</Menu.Item>
							<Menu.Item key="fourth">
								<Icon type="appstore"/>国际
							</Menu.Item>
							<Menu.Item key="fifth">
								<Icon type="appstore"/>娱乐
							</Menu.Item>
							<Menu.Item key="sixth">
								<Icon type="appstore"/>体育
							</Menu.Item>
							<Menu.Item key="seventh">
								<Icon type="appstore"/>科技
							</Menu.Item>
							{userShow}
						</Menu>
					</Col>
					<Col span={2}></Col>
				</Row>
				<Modal title="用户中心" wrapClassName="vertical-center-modal"  visible={this.state.modalVisible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} >
          			<Tabs defaultActiveKey="1" type="card" onChange={this.callback.bind(this)} >
    				 	<TabPane tab="登入" key="1">
						<Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
       				    <FormItem>
          				 <InputGroup size="large">
                         <Col span={4}>
                          用户名：
                          </Col>
                          <Col span={8}>
                          {getFieldDecorator('l_userName')(
           						<Input  placeholder="请输入用户名" />
          					)}
                          
                          </Col>
                         </InputGroup>
                         </FormItem>
		    			 <FormItem>
		     				<InputGroup size="large">
		      				<Col span={4}>
		       				 密码：
		      				</Col>
		      				<Col span={8}>
		      				 {getFieldDecorator('l_password')(
           						<Input  type="password" placeholder="请输入密码" />
          					)}
		     				 </Col>
		    				</InputGroup>

		   				</FormItem>
        				<FormItem>
          					<a className="login-form-forgot" href="">Forgot password</a>
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
          				<Col span={4}>
           				 用户名：
          				</Col>
          				<Col span={8}>
          				{getFieldDecorator('r_userName')(
           						<Input  placeholder="请输入用户名"/>
          					)}
         				 </Col>
        				</InputGroup>
        				</FormItem>
        				<FormItem>
      					<InputGroup size="large">
          				<Col span={4}>
            				密码：
         				 </Col>
          				<Col span={8}>
          				{getFieldDecorator('r_password')(
           						<Input  type="password" placeholder="请输入密码"/>
          					)}
            				
          				</Col>
        				</InputGroup>
        				</FormItem>
        				<FormItem>
      	 				<InputGroup size="large">
          				<Col span={4}>
           						 密码：
          				</Col>
         				 <Col span={8}>
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
			</header>
		);
	};
}

export default PCHeader = Form.create({})(PCHeader);