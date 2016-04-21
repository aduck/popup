# popup
简单弹层组件<br>
<br>
新建弹窗并初始化：<br>
var poper=new Ipop(<br>
  {<br>
    content:'',  //必须，可以通过模板引擎渲染<br>
    effect:'',  //可选，弹层效果（默认为zoomIn,其它选项：fadeIn,fromTop,fromBottom）也可以自定义<br>
    position:''  //可选，停靠位置（默认为middle,其它选项：top,bottom）<br>
    inited:function(){<br>
      // 可选，初始化完成后回调函数<br>
    },<br>
    beforeOpen:function(){<br>
      // 可选，弹出前回调函数<br>
    },<br>
    closed:function(){<br>
      // 可选，关闭弹层后回调函数<br>
    }<br>
  }<br>
)<br>
<br>
Ipop.popers 返回所有弹层<br>
Ipop.closeAll() 关闭所有弹层<br>
<br>
poper.beforeOpen=function(){<br>
  // 传入数据，动态渲染模板<br>
}<br>
<br>
<script id="mypop" type="text/html"><br>
// 模板写在这,请结合artemplate使用<br>
<div>{{name}}</div><br>
</script><br>
