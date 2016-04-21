# popup
简单弹层组件

新建弹窗并初始化：
var poper=new Ipop(
  {
    content:'',  //必须，可以通过模板引擎渲染
    effect:'',  //可选，弹层效果（默认为zoomIn,其它选项：fadeIn,fromTop,fromBottom）也可以自定义
    position:''  //可选，停靠位置（默认为middle,其它选项：top,bottom）
    inited:function(){
      // 可选，初始化完成后回调函数
    },
    beforeOpen:function(){
      // 可选，弹出前回调函数
    },
    closed:function(){
      // 可选，关闭弹层后回调函数
    }
  }
)

Ipop.popers 返回所有弹层
Ipop.closeAll() 关闭所有弹层

poper.beforeOpen=function(){
  // 传入数据，动态渲染模板
}

<script id="mypop" type="text/html">
// 模板写在这,请结合artemplate使用
<div>{{name}}</div>
</script>
