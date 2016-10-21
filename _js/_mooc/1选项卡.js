<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>实践题 - 选项卡</title>
    <style type="text/css">
     /*
     标签和文本结合区域效果制作：
     1.用ul做分类标签
     2.把ul的display定义为block使ul区域和下面div区域结合在一起
     3.给ul定义一个下边框或者给div内容区域定义一个上边框
     4.所有li标签默认样式不设下边框，作为激活显示的li标签加宽其#fff（白色）
     区域的下边框，覆盖。
     */
     li {
         display:inline-block;
         border: 1px solid #ccc;
         border-bottom: none;
         padding: 5px 6px;
         margin-right:5px;
         cursor:pointer;
         color:#fff;
         background:#ccc;
     }
      .active {
          color: red;
      }
     .content {
         border: 2px solid red;
         width: 200px;
         min-height:200px;
         margin-top: -18px;
         padding: 20px 10px;
         position:relative;
     }
     .hide {
         display:none;
     }
     .show {
         display:block;
     }
     #div1,#div2,#div3 {
         position:absolute;
     }
    </style>
    <script type="text/javascript">

    window.onload=function(){
        // var oTab = document.getElementById("tabs")
        var li = document.getElementsByTagName("li");
        var div = document.getElementsByClassName("mydiv");//oTabs.get...是为了定义className作用对象为id为tabs下的所有文本div
        for(var i=0;i<li.length;i++){//获取所有i编号的元素
            li[i].index = i;  //定义一个index属性对li进行编号
            li[i].onclick = function(){//再注册一个点击事件，当点击的时候所有标签都恢复最初状态
            for(var n=0;n<li.length;n++){//这步是相对于未被点击部分的样式
                li[n].className = "";
                div[n].className = "mydiv hide";
            }
            this.className = "active";
            div[this.index].className = "show mydiv";
            }
        }
    }

    </script>

</head>
<body>
<!-- HTML页面布局 -->
<ul>
    <li class="active">房产</li>
    <li>家居</li>
    <li>二手房</li>
</ul>
<div class="content">

<div class="show mydiv">
275万购昌平邻铁三居 总价20万买一居<br>
200万内购五环三居 140万安家东三环<br>
北京首现零首付楼盘 53万购东5环50平<br>
京楼盘直降5000 中信府 公园楼王现房<br>
</div>
<div class="hide mydiv">
 40平出租屋大改造 美少女的混搭小窝<br>
 经典清新简欧爱家 90平老房焕发新生<br>
 新中式的酷色温情 66平撞色活泼家居<br>
 瓷砖就像选好老婆 卫生间烟道的设计<br>
</div>
<div class="hide mydiv">
 通州豪华3居260万 二环稀缺2居250w甩<br>
 西3环通透2居290万 130万2居限量抢购<br>
 黄城根小学学区仅260万 121平70万抛!<br>
 独家别墅280万 苏州桥2居优惠价248万<br>
</div>
</div>


</body>
</html>
