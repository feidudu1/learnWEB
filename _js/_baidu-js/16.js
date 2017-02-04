(function () {
    /**
     * aqiData，存储用户输入的空气指数数据
     * 示例格式：
     * aqiData = {
     *    "北京": 90,
     *    "上海": 40
     * };
     */
    var aqiData = {};
    var $ = function (id) {
        return document.getElementById(id);
    };
    var deleteBtn = document.getElementsByClassName('delete-btn');
    /**
     * 从用户输入中获取数据，向aqiData中增加一条数据
     * 然后渲染aqi-list列表，增加新增的数据
     */

    function addAqiData() {
        var city = $('aqi-city-input').value.trim();
        var score = $('aqi-value-input').value.trim();
        // todo:对city和score格式
        if (city == '' && score == '') {
            alert('请输入城市名称和空气质量指数');
            return;
        }
        var regexCity = /^[\u4e00-\u9fa5a-zA-Z/]*$/;   //这里如果没有加＊，那么就不对了
        if (!regexCity.test(city)) {
            alert('城市名请用中英文字符表示');
            return;
        }
        if(!score.match(/\d/)) {
            alert('空气质量请用整数表示');
            return;
        }
        aqiData[city]=score;
    };

    /**
     * 渲染aqi-table表格
     */
    function renderAqiList() {
        var content = ["<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>"];
        var newData = [];
        for (var key in aqiData) {
            newData.push([key,aqiData[key]]);  //这里如果用aqiData.key则为undefined
        };
        newData.forEach(function (item) {
            content.push('<tr><td>' + item[0] + '</td><td>' + item[1] + '</td><td><button class="delete-btn">删除</button></td></tr>');  //这里的delete-btn不能用id，否则只有第一个生效
        });
        $('aqi-table').innerHTML = content.join('');
        if( deleteBtn != null){  //以下要对deleteBtn遍历，只用deleteBtn.onclick = delBtnHandle;是不行的
            for(var i = 0; i < deleteBtn.length; i++) {    //获取的dom节点的数组都不能用forEach
                deleteBtn[i].onclick = delBtnHandle;
            }
        };
        // 清除input里输入的字
        $('aqi-city-input').value = '';
        $('aqi-value-input').value = '';
    };

    /**
     * 点击add-btn时的处理逻辑
     * 获取用户输入，更新数据，并进行页面呈现的更新
     */
    function addBtnHandle() {
      addAqiData();
      renderAqiList();
  };

    /**
     * 点击各个删除按钮的时候的处理逻辑
     * 获取哪个城市数据被删，删除数据，更新表格显示
     */
    function delBtnHandle() {
      var delCity = this.parentNode.parentNode.firstChild.innerHTML;
      delete aqiData[delCity];
      renderAqiList();
  };

    function init() {
      // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    $("add-btn").onclick = addBtnHandle;
      // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  };

    init();
})();
