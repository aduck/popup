function Ipop(opts){
	var opts=opts || {};
	this.state=0;
	this.content=opts.content || '';
	this.effect=opts.effect || 'zoomIn';
	this.position=opts.position || 'middle';
	this.inited=typeof opts.inited=='function' ? opts.inited : null;
	this.beforeOpen=typeof opts.beforeOpen=='function' ? opts.beforeOpen : null;
	this.closed=typeof opts.closed=='function' ? opts.closed : null;
	this.init.apply(this,arguments);
}
// 工具函数
function setClass(o,cname,m){
	var cnameArr=o.className.split(/\s+/),
		len=cnameArr.length;
	if(m==='add'){
		for(var i=0;i<len;i++){
			if(cnameArr[i]==cname) return;
		}
		cnameArr.push(cname);
	}else if(m==='remove'){
		for(var i=0;i<len;i++){
			if(cnameArr[i]==cname){
				cnameArr.splice(i,1);
			}
		}
	}
	o.className=cnameArr.join(' ');
}
function getStyle(o,attr){
	if(o.currentStyle){
		return o.currentStyle[attr];
	}else{
		return document.defaultView.getComputedStyle(o,null)[attr];
	}
}
function oNum(arr){
	var n=0;
	for(var i=0,len=arr.length;i<len;i++){
		if(arr[i].state==1)	n++;
	}
	return n
}
function mzIndex(o){
	var arr=Ipop.popers,
		_index=0;
	for(var i=0,len=arr.length;i<len;i++){
		_index=parseInt(arr[i].style.zIndex)>_index ? parseInt(arr[i].style.zIndex) : _index;
	}
	o.style.zIndex=(_index+1).toString();
}
function loadCssFile(url){
	var link=document.createElement('link');
	link.rel='stylesheet';
	link.type='text/css';
	link.href=url;
	document.getElementsByTagName('head')[0].appendChild(link);
}
loadCssFile('http://file.easeeyes.com/js/ani.css');
loadCssFile('http://file.easeeyes.com/js/popup.css');
// 弹层管理
Ipop.popers=[];
// 创建背景
Ipop.createLayer=function(){
	if(typeof Ipop.layer!=='undefined') return;
	Ipop.layer=document.createElement('div');
	document.body.appendChild(Ipop.layer);
	Ipop.layer.className='popup-layer';
	Ipop.layer.style.zIndex='999';
}
// 初始化弹层
Ipop.prototype.init=function(){
	Ipop.createLayer();
	var poper=this.poper=document.createElement('div'),
		pos=this.position;
	Ipop.popers.push(poper);
	poper.className='popup-poper';
	document.body.appendChild(poper);
	poper.innerHTML=this.content;
	poper.style.display='block';
	Ipop.fixedPos(poper,pos);
	poper.style.display='none';
	poper.state=0;
	poper.style.zIndex=parseInt(Ipop.layer.style.zIndex)+1;
	if(this.inited) this.inited();
}
// 修正位置
Ipop.fixedPos=function(o,dir){
	var _width=getStyle(o,'width'),
		_height=getStyle(o,'height'),
		width=(_width && (_width !== 'auto')) ? _width : o.offsetWidth,
		height=(_height && (_height !== 'auto')) ? _height : o.offsetHeight;
	o.style.marginLeft=-parseInt(width)/2+'px';
	if(dir=='middle'){
		o.style.marginTop=-parseInt(height)/2+'px';
	}else if(dir=='top'){
		o.style.top='0';
	}else if(dir=='bottom'){
		o.style.top='auto';
		o.style.bottom='0';
	}
}
// 渲染
Ipop.render=function(o){
	var n=oNum(Ipop.popers);
	if(o.state==1){
		if(n<=1){
			Ipop.layer.style.display='block';	
		}else{
			mzIndex(o)
		}
		o.style.display='block';
		o.style.opacity='1';
		o.style.filter='alpha(opacity=100)';
	}else if(o.state==0){
		if(n<=0){
			Ipop.layer.style.display='none';	
		}
		o.style.display='none';
		o.style.opacity='0';
		o.style.filter='alpha(opacity=0)';
	}
}
// 显示
Ipop.prototype.open=function(){
	if(this.beforeOpen) this.beforeOpen();
	var poper=this.poper,
		effect=this.effect;
	poper.state=1;
	Ipop.render(poper);
	setClass(poper,effect,'add');
}
// 隐藏
Ipop.prototype.close=function(){
	var poper=this.poper,
		effect=this.effect;
	poper.state=0;
	Ipop.render(poper);
	setClass(poper,effect,'remove');
	if(this.closed) this.closed();
}
// 关闭全部
Ipop.closeAll=function(){
	for(var i=0,len=Ipop.popers.length;i<len;i++){
		Ipop.popers[i].state=0;
		Ipop.render(Ipop.popers[i]);
		Ipop.popers[i].className='popup-poper';
	}
}

window.Ipop=Ipop;