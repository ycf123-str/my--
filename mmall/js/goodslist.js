$(".fscf-content")[0].onmouseover = function(){
	this.style.border = "1px solid #DFAF7D";
	$(".fs-all-first")[0].style.display = "block";
}
$(".fscf-content")[0].onmouseout = function(){
	this.style.border = "1px solid #e8e8e8";
	$(".fs-all-first")[0].style.display = "none";
}


window.onload = function(){
	ajax190502({
		"url":"getGoodsList.php",
		"func":showGoodsList
	})
}

function showGoodsList(str){
	var str = JSON.parse(str);
	console.log(str[0].goodsImg);
	var productList = $(".product-list")[0];
	for(var i=0;i<str.length;i++){
		var aDom = document.createElement("a");
		aDom.style.cssText = `
			width:200px;
			height:326px;
			padding:10px 10px 0;
			border: 1px solid transparent;
			background: #fff;
			margin: 20px 10px 0;
			display: inline-block;
			vertical-align: top;
			position: relative;
		`;
		productList.appendChild(aDom);
		var imgDom = document.createElement("img");
		imgDom.style.cssText = `
			content:url(${str[i].goodsImg});
			width:200px;
			height:200px;
			margin-bottom: 14px;
		`;
		aDom.appendChild(imgDom);
		var divDom = document.createElement("div");
		divDom.style.cssText = `
			font-size: 16px;
			color: #333;
			letter-spacing: 0;
			line-height: 20px;
			margin: 0 auto 8px;
			width: 188px;
			max-height: 42px;
			overflow: hidden;
			text-indent:18px;
			position: relative;
		`;
		var spanDom = document.createElement("span");
		spanDom.style.cssText = `
			width: 16px;
			height: 16px;
			font-size: 12px;
			color: #FFF;
			letter-spacing: 0;
			line-height: 15px;
			background: #FF635E;
			display: inline-block;
			vertical-align: top;
			margin-right: 1px;
			text-align: center;
			margin-top: 2px;
			position: absolute;
			left:0px;top:0px;
			text-indent:0px;
		`;
		spanDom.innerHTML = "限";
		divDom.innerHTML = str[i].goodsName+"-"+str[i].goodsType+"-"+str[i].goodsDesc+"-"+str[i].goodsId;
		divDom.appendChild(spanDom);
		aDom.appendChild(divDom);
		var diDom = document.createElement("div");
		diDom.style.cssText = `
			margin: auto;
			max-width: 188px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 14px;
			color: #999;
			letter-spacing: 0;
			line-height: 18px;
		`;
		diDom.innerHTML = str[i].goodsName;
		aDom.appendChild(diDom);
		var dDom = document.createElement("div");
		dDom.style.cssText = `
		    position: absolute;
			bottom: 18px;
			left: 16px;
			font-size: 0;
			letter-spacing: -6px;
			width: 188px;
		`;
		var spL = document.createElement("span");
		spL.style.cssText = `
			display: inline-block;
			vertical-align: top;
			font-size: 18px;
			color: #DFAF7D;
			letter-spacing: 0;
			line-height: 24px;
			clear: both;
		`;
		spL.innerHTML = "￥"+str[i].goodsPrice;
		dDom.appendChild(spL);
		var spR = document.createElement("span");
		spR.style.cssText = `
			display: inline-block;
			vertical-align: top;
			font-size: 12px;
			color: #999;
			letter-spacing: 0;
			line-height: 24px;
			text-decoration: line-through;
			float: right;
		`;
		spR.innerHTML = `<del>￥${str[i].beiyong1}</del>`;
		dDom.appendChild(spR);
		aDom.appendChild(dDom);
	}
}

function ajax1905(url,method,params,func,isAsync){
	//1、创建对象
	let xhr = new XMLHttpRequest();

	//产生请求参数的字符串：循环把json对象转换为形如这样的格式：key1=value1&key2=value2
	let sendstr = '';
	for(let key in params){
		sendstr += `${key}=${params[key]}&`;
		// sendstr += key+"="+params[key]+"&"
	}
	if(sendstr.length>0){
		sendstr = sendstr.substring(0,sendstr.length-1); //musicname=你
	}
	
	let urlAndParam = url;//getMusic.php
	//如果是get方式，并且有请求参数，那么就把url和请求参数用问号隔开
	if(method.toLowerCase()=="get" && sendstr!=""){
		urlAndParam+= "?"+sendstr;//getMusic.php?musicname=你
	}

	//2、设置请求参数
	xhr.open(method,urlAndParam,isAsync);

	//3、设置回调函数
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			//调用回调函数（如下的 && 表示，逻辑短路，如果func是真，才调用func函数）
			// func&&func(xhr.responseText);
			if(func){
				func(xhr.responseText);
			}
		}
	}
	if(method.toLowerCase()=="post"){
		xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xhr.send(sendstr);
	}else{
		//4、发送请求
		xhr.send();	
	}
}
function ajax190502(obj){

	let defaultObj = {
		"url":"#",
		"method":"get",
		"params":{},
		"func":null,
		"isAsync":true
	};

	var ajaxObj = {};
	for(let key in defaultObj){//key = url
		ajaxObj[key] = obj[key] || defaultObj[key];
	}

	ajax1905(ajaxObj.url,ajaxObj.method,ajaxObj.params,ajaxObj.func,ajaxObj.isAsync);	
}