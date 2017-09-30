import React from 'react';
import MobileHeader from './MobileHeader.js';
import MobileFooter from './MobileFooter.js';
import MobileList from './Mobile_list.js';
import {
	Tabs,
	Carousel
} from 'antd';
const TabPane=Tabs.TabPane;
export default class MobileIndex extends React.Component {
	render() {
		console.log('mobileIndex0000000');
		const setting = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			autoplay: true
		};
		return (
			<div>
			<MobileHeader></MobileHeader>
			<Tabs>
				<TabPane key='1' tab='头条'>
					<div class='carousel'>
						<Carousel {...setting}>
							        <div><img src={require('../../images/carousel_1.jpg')} /></div>
									<div><img src={require('../../images/carousel_2.jpg')} /></div>
									<div><img src={require('../../images/carousel_3.jpg')} /></div>
									<div><img src={require('../../images/carousel_4.jpg')} /></div>
						</Carousel>
					</div>
					<MobileList type='top' count={20}/>
				</TabPane>
				<TabPane key='2' tab='社会'>
					<MobileList type='shehui' count={20}/>
				</TabPane>
				<TabPane key='3' tab='国内'>
					<MobileList type='guonei' count={20}/>
				</TabPane>
				<TabPane key='4' tab='国际'>
					<MobileList type='guoji' count={20}/>
				</TabPane>
				<TabPane key='5' tab='娱乐'>
					<MobileList type='yule' count={20}/>
				</TabPane>
			</Tabs>
			<MobileFooter/>
			</div>
		);
	}
}