//头部城市部分
let liDoms = $("#ulCityId").children;
let citys = $(".citys");
	for(let i=0;i<liDoms.length;i++){
		liDoms[i].setAttribute("index",i);
		liDoms[i].onmouseover = function(){
			for(let j=0;j<liDoms.length;j++){
				liDoms[j].style.color = "#000";
				liDoms[j].lastElementChild.style.display = "none";
				citys[j].style.display = "none";
			}
			this.style.color = "#dfaf7d";
			this.lastElementChild.style.display = "block";
			citys[i].style.display = "block";
		}
	}
	let city_top = $("#city_top");
	let city_bottom = $("#city_bottom");
city_top.onmouseover = function(){
	city_bottom.style.display = "block";
}
city_bottom.onmouseover = function(){
	city_bottom.style.display = "block";
}
city_bottom.onmouseout = function(){
	city_bottom.style.display = "none";
}
city_top.onmouseout = function(){
	city_bottom.style.display = "none";
}

//头部right
 let appMaId = $("#appMaId");
 let imgAppId = $("#imgAppId");
appMaId.onmouseover = function(){
	imgAppId.style.display = "block";
	this.style.color = "black";
}
appMaId.onmouseout = function(){
	imgAppId.style.display = "none";
	this.style.color = "#999999";
}

//登录框
let login_a = $("#login_a");
let dengLuDiv1 = $("#dengLuDiv1");
let dengLuDiv2 = $(".dengLuDiv2");
let close_login = $(".close_login");
login_a.onclick = function(){
	dengLuDiv1.style.display = "block";
	move02(dengLuDiv2[0],"bottom",80,200);
}
close_login[0].onclick = function(){
	dengLuDiv1.style.display = "none";
	dengLuDiv2[0].style.bottom = -500+"px";
}

let n_a_v = $("#n_a_v");
window.onscroll = function(){
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	if(scrollTop>1){
		move02(n_a_v,"top",-40,300);
	}else if(scrollTop<1){
		move02(n_a_v,"top",0,300);
	}
}

let bannerTu = $("#bannerTu");
window.onload = function(){
	new BannerPlayer({
			imgs:["../image/ban1.png","../image/ban2.png"],
			timeSpace:2000,
		},bannerTu);
}

let login_title_left = $(".login_title_left");
let zhdl_i = login_title_left[0].lastElementChild;
let login_title_right = $(".login_title_right");
let kjdl_i = login_title_right[0].lastElementChild;
let zh_login = $("#zh_login");
let kj_login = $("#kj_login");
login_title_left[0].onclick = function(){
	zhdl_i.style.display = "block";
	zh_login.style.display = "block";
	kjdl_i.style.display = "none";
	kj_login.style.display = "none";
	this.style.color = "#000";
	login_title_right[0].style.color = "#7e7e7e";
}
login_title_right[0].onclick = function(){
	zhdl_i.style.display = "none";
	zh_login.style.display = "none";
	kjdl_i.style.display = "block";
	kj_login.style.display = "block";
	this.style.color = "#000";
	login_title_left[0].style.color = "#7e7e7e";
}


function $(str){
	if(str.charAt(0)=="#"){
		return document.getElementById(str.substring(1));
	}else if(str.charAt(0)=="."){
		return document.getElementsByClassName(str.substring(1));
	}else{
		return document.getElementsByTagName(str);
	}
}

//属性运动的封装
function move02(domObj,attr,endValue,timeLong){
	var starValue = parseFloat(getStyle(domObj,attr));
	var direction = endValue>starValue?1:-1;
	var timeSpace = 10;
	var step = Math.abs((endValue-starValue)/(timeLong/timeSpace));
	move01(domObj,attr,starValue,endValue,step,direction,timeSpace);
}
function move01(domObj,attr,starValue,endValue,step,direction,timeSpace){
	var currValue = starValue;
	var myTimer = setInterval(function(){
		currValue = currValue+direction*step;
		if(direction==1?currValue>=endValue:currValue<=endValue){
			currValue=endValue;
			window.clearInterval(myTimer);
		}
		if(attr=="opacity"){
			domObj.style[attr] = currValue;
		}else{
			domObj.style[attr] = currValue+"px";
		}		
	},timeSpace)
	return myTimer;
}
function getStyle(domObj,attr) {
	if(domObj.currentStyle){//IE
		return domObj.currentStyle[attr];
	}else{//其它主流浏览器
		var cssObj = window.getComputedStyle(domObj);
		return cssObj[attr];
	}
}
//（轮播图）
class BannerPlayer{
	//构造函数
	constructor(obj,boxDom){
		//1、属性（数据）
		this.boxDom = boxDom;
		this.imgDoms = [];//存储所有的图片标签
		this.liDoms = [];//存储所有的li标签（豆豆）
		this.arrowBoxDom = null;//存储左右箭头的容器
		let defaultObj = {
			width:400,
			height:300,
			imgs:["img/01.jpg","img/02.jpg","img/03.jpg","img/04.jpg"],
			timeSpace:1000,
			douColor:"gray",
			douHighColor:"#DFAF7D",
			douSize:10,
			douWidth:24,
			douHeight:2,
			douPos:"下",
			myTimer:null,
			ord:0			
		}

		for(let key in defaultObj){
			if(obj[key]){
				this[key] = obj[key];
			}else{
				this[key] = defaultObj[key];
			}
		}
		//2、创建外观（把数据应用在外观上）
		this.render();
		this.addEvent();
		this.autoPlay();
	}

	//外观（html和css代码）
	render(){
		this.boxDom.style.position = "relative";
		//1、创建图片
		for(let i=0;i<this.imgs.length;i++){
			let imgDom = document.createElement("div");
			imgDom.style.cssText = `
				background-image:url(${this.imgs[i]});
				background-size:cover;
				background-position:center;
				position: absolute;
				left:0px;
				top:0px;
				width: 100%;
				height: 100%;	
				z-index: 1;`;
			if(i==0){
				imgDom.style.zIndex = 2;
			}
			this.boxDom.appendChild(imgDom);
			this.imgDoms.push(imgDom);
		}
		//2、创建豆豆
		//1)、豆豆的容器ul
		let doudouBox = document.createElement("ul");
		doudouBox.style.cssText = `
				position: absolute;
				list-style: none;
				z-index: 3;`;
		if(this.douPos=="上"){
			doudouBox.style.left = `${(this.width-(this.douSize*(this.imgs.length*2-1)))/2}px`;
			doudouBox.style.top = "20px";			
		}else if(this.douPos=="下"){
			// doudouBox.style.right = "20px";//
			doudouBox.style.left = `${(this.boxDom.offsetWidth)/2}px`;
			doudouBox.style.bottom = "20px";
		}	
		this.boxDom.appendChild(doudouBox);
		//2)、豆豆 li
		for(let i=0;i<this.imgs.length;i++){
			let liDom = document.createElement("li");
			liDom.setAttribute("index",i);
			liDom.style.cssText = `
				float:left;
				width:${this.douWidth}px;
				height: ${this.douHeight}px;
				margin-right: ${this.douSize}px;
				background-color: ${this.douColor};
			`;
			if(i==0){
				liDom.style.backgroundColor=this.douHighColor;
			}
			doudouBox.appendChild(liDom);
			this.liDoms.push(liDom);//放在数组里，方便其它函数使用
		}

		//3、创建左右按钮
		//1)、创建左右箭头的容器
		this.arrowBoxDom = document.createElement("div");
		this.arrowBoxDom.style.cssText = `
				position: absolute;
				left:0px;
				top:${(this.height+90)/2}px;
				width: 100%;
				height: 60px;
				z-index: 4;
				display:none;`;
		this.boxDom.appendChild(this.arrowBoxDom);

		//2)、创建左右箭头
		let leftDivDom = document.createElement("div");
		leftDivDom.style.cssText = `
				float:left;
				margin-left:100px;
				height: 100%;
				width: 60px;
				background-image:url(../image/lunbotu.png);
				background-size:cover;`;
		this.arrowBoxDom.appendChild(leftDivDom);


		let rightDivDom = document.createElement("div");
		rightDivDom.style.cssText = `
				float:right;
				margin-right:100px;
				height: 100%;
				width: 60px;
				background-image:url(../image/lunbotu.png);
				background-size:cover;
				background-position:60px 0;`;
		this.arrowBoxDom.appendChild(rightDivDom);
	}

	//添加事件
	addEvent(){
		//2、鼠标放在轮播图上会停止
		this.boxDom.onmouseover = ()=>{
			this.stopPlay();
			this.showArrowBox();	
		}

		//3、鼠标离开轮播图会继续播放
		this.boxDom.onmouseout = ()=>{
			this.autoPlay();	
			this.cangArrowBox();
		}

		let obj = this;
		//4、点击豆豆，跳转到对应的图片
		for(var i=0;i<this.liDoms.length;i++){
			this.liDoms[i].onclick = function(){
				obj.goImg(parseInt(this.getAttribute("index")));
			};
		}

		//5、左右按钮
		let leftBtn = this.arrowBoxDom.firstElementChild;
		leftBtn.onclick = ()=>{
			this.preImg();
		}
		let rightBtn = this.arrowBoxDom.lastElementChild;
		rightBtn.onclick = ()=>{
			this.nextImg();
		}
	}
	cangArrowBox(){
		this.arrowBoxDom.style.display="none";
	}
	showArrowBox(){
		this.arrowBoxDom.style.display="block";
	}
	//自动播放
	autoPlay(){
		if(this.myTimer!=null){//如果有定时器，就不再启动新的定时器了
			return;//
		}

		this.myTimer = setInterval(()=>{
			//一、改变数据
			//1、计算数据（改变图片的下标）
			var preOrd = this.ord;//上一张的序号 4
			this.ord++;//5

			//2、边界
			if(this.ord>this.imgs.length-1){
				this.ord = 0;
			}

			//二、改变外观
			this.reRender(preOrd,this.ord);
		},this.timeSpace)

	}
	
	//停止播放
	stopPlay(){
		window.clearInterval(this.myTimer);//根据定时器编号，找到定时器对象，进行清除
		this.myTimer = null;//把定时器编号清除掉
	}

	//跳转到对应的图片上
	//参数：图片的下标
	// goImg(3);
	goImg(transOrd){
		//一、改变数据
		//1、计算数据（改变图片的下标）
		var preOrd = this.ord;//上一张的序号 
		this.ord = transOrd;//5

		//2、边界
		if(this.ord>this.imgs.length-1){
			this.ord = 0;
		}else if(this.ord<0){
			this.ord = this.imgs.length-1;
		}

		//二、改变外观
		this.reRender(preOrd,this.ord);
	}

	//改变外观的函数(重新渲染)
	reRender(preOrd,ord){
		//1)、改图片
		this.imgDoms[preOrd].style.zIndex = 1;
		this.imgDoms[ord].style.zIndex = 2;
		//2)、改豆豆的颜色
		
		this.liDoms[preOrd].style.backgroundColor=this.douColor;
		this.liDoms[ord].style.backgroundColor= this.douHighColor;
	}

	preImg(){
		this.goImg(this.ord-1);
	}

	nextImg(){
		this.goImg(this.ord+1);
	}
}