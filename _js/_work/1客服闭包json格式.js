// 原文件是dev分支的service-transform.html
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="keywords" content="@SITEKEYWORDS"/>
    <meta name="description" content="@SITEDESCRIPTION"/>
    <meta content="yes" name="apple-mobile-web-app-capable"/>
    <meta content="yes" name="apple-touch-fullscreen"/>
    <meta content="telephone=no,email=no" name="format-detection"/>
    <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"/>
    <title>连接客服……</title>
    <link rel="stylesheet" href="http://assets.mockuai.com/mk/lib-notification/1.0.0/notification.css"/>
    <link rel="stylesheet" href="http://assets.mockuai.com/mk/ctrl-topbar/1.0.0/topbar.css"/>

</head>
<style>
  body {
    display: none;
  }
</style>

<body>
  <div style="display:none;">
    <a href="http:www.kuaishang.cn"></a>
    <a href="http:gytk5.kuaishang.cn/bs/im.htm?cas=64497___770695&fi=73906" id="connect"></a>
  </div>
</body>
<script src="http://g.taojae.com/min?3rd/zepto.min.js"></script>
<script src="http://assets.mockuai.com/min?mk/lib-env/1.0.0/env.js,mk/lib-httpurl/1.0.0/httpurl.js,mk/lib-api/1.4.4/api.debug.js,mk/lib-login/1.3.3/login.js,mk/lib-mask/1.0.0/mask.js,mk/lib-slider/1.0.0/slider.js,mk/lib-storage/1.2.8/storage.js,mk/lib-notification/1.0.0/notification.js,mk/lib-gotop/1.0.2/gotop.js,mk/ctrl-topbar/1.0.0/topbar.js"></script>
<script src="../src/mod/vendor.js"></script>
<script>
    lib.api.init({
        app_key:'@app_key',
        app_pwd:'@app_pwd',
        testApi:'@debugApi'
    });
    var self = this;
    var httpUrl = new lib.httpurl(location.href);
    var params = httpUrl.params;
    self.item_uid = params['item_uid'] ? decodeURIComponent(params['item_uid']) : '';
    self.order_uid = params['order_uid'] ? decodeURIComponent(params['order_uid']) : '';
    self.seller_id = params['seller_id'] ? decodeURIComponent(params['seller_id']) : '';

    if(self.item_uid) {
        var KSECINFO = {};

        KSECINFO.ecv;
        if (lib.login.isLogin()) {
            getUser(function (data) {
                KSECINFO.ecv = data;
            });
        }else {
            KSECINFO.ecv = {
              "vipNo": "",
              "vipName": "访客",
              "regTime": "",
              "lastLoginTime": "",
              "gender": "",
              "birthday": "",
              "phone": "",
              "address": ""
            };
        }

        KSECINFO.ecg;
        getItem(function (data) {
            KSECINFO.ecg = data;
        });
        getUrl();
    }

    if(self.order_uid) {
        var KSECINFO = new Object();
        getUrl(function (order_data) {
            KSECINFO = order_data;
        });
    }

    function getUrl (cbc) {
            var self = this;
            lib.api.get({
                api: 'custom_service/conf/get',
                needLogin: false,
                data: {
                    seller_id: self.seller_id
                },
                success: function (info) {
                    var code = info.data.custom_service.code;
                    var num = code.indexOf('<div');
                    var script = code.substring(0,num);
                    var start = script.indexOf('http');
                    var end = script.indexOf('" charset');
                    var src = script.substring(start,end);
                    if (self.order_uid) {
                        Global.helper.getScript(src);
                        getOrder(function (data) {
                            cbc && cbc(data);
                        });
                        var timer =  setInterval(function(){
                            if (typeof openKSDefinedChatWin == 'function') {
                                clearInterval(timer);
                                KS_EC.newOrder();
                                openKSDefinedChatWin();
                            }else {
                                timer;
                            }
                        },500);
                    }else if (self.item_uid) {
                        var timerone = setInterval(function () {
                            if(KSECINFO.ecv && KSECINFO.ecg) {
                                clearInterval(timerone);
                                Global.helper.getScript(src);
                                var timer =  setInterval(function(){
                                    if (typeof openKSDefinedChatWin == 'function') {
                                        clearInterval(timer);
                                        openKSDefinedChatWin();
                                    }else {
                                        timer;
                                    }
                                },500);
                            } else {
                                timerone;
                            }
                        },500);
                    }
                },
                error: function (data) {
                    lib.notification.simple(data.msg, '', 1000);
                }
            });
        };

        //获取用户信息
    function getUser (cb) {
        var self = this;
        lib.api.get({
            needLogin:true,
            api: 'user/current_user/get',
            data: {
            },
            success: function (data) {
                var data = data.data.user;
                self.name = data.name || '';
                self.user_mobile = data.mobile || '';
                self.user_id = data.id || '';
                lib.storage.set('service_id',self.user_id);
                var ecv = {
                  "vipNo": self.user_id,
                  "vipName": self.name,
                  "regTime": "",
                  "lastLoginTime": "",
                  "gender": "",
                  "birthday": "",
                  "phone": self.mobile,
                  "address": ""
                };
                cb && cb(ecv);
            },
            error: function (data) {
                lib.notification.simple(data.msg, 1000);
            },
        });
    };

        //获取商品信息
    function getItem (cb) {
        var self = this;
        lib.api.get({
           api: 'item/get',
           data: {
               item_uid: self.item_uid
           },
           success: function (data) {
               var data = data.data.item;
               self.item_name = data.item_name || '';
               self.market_price = (data.market_price/100).toFixed(2);
               self.icon_url = data.icon_url || '';
               self.seller_id = data.seller_id || '';
               var list = data.sku_property_list;
               var obj = {};
               if (list.length>0) {
                   for(var i=0;i<list.length; i++){
                       var key = list[i].name;
                       obj[key] = list[i].value;
                   }
               } else {
                   obj = {};
               }
               var attr = JSON.stringify(obj);
               var self_href = 'http://'+location.host + '/detail.html?item_uid='+self.item_uid+'/';
               // <!-- 正在咨询的商品 -->
               var ecg = {
                   "goodsNo": self.item_uid,
                   "goodsName": self.item_name,
                   "goodsPrice": self.market_price,
                   "goodsPhoto": self.icon_url,
                   "goodsLinks": self_href
               };
               ecg.attribute = attr;   //商品属性
               cb && cb(ecg);
           },
           error: function (data) {
               lib.notification.simple(data.msg, 1000);
           }
       });
   };
    function getOrder (cb){
        var self = this;
        lib.api.get({
            api: 'trade/order/get',
            needLogin: false,
            data: {
                order_uid: self.order_uid
            },
            success: function (data) {
                self.service_id = lib.storage.get('service_id');
                var data = data.data.order;
                self.order_time = data.order_time;
                self.address = data.consignee.address;
                self.mobile = data.consignee.mobile;
                self.pay_time = data.pay_time;
                self.totalPrice = data.totalPrice;
                self.seller_id = data.order_item_list[0].seller.seller_id;
                switch (data.order_payment.payment_id) {
                    case 1:
                        self.payWay = "支付宝app支付";
                        break;
                    case 2:
                        self.payWay = "微信app支付";
                        break;
                    case 3:
                        self.payWay = "银联app支付";
                        break;
                    case 4:
                        self.payWay = "支付宝wap支付";
                        break;
                    case 5:
                        self.payWay = "微信wap支付";
                        break;
                    case 6:
                        self.payWay = "银联wap支付";
                        break;
                };
                switch (data.order_status) {
                    case 10:
                        self.status = 1;
                        break;
                    case 20:case 21:
                        self.status = 5;
                        break;
                    case 30:
                        self.status = 2;
                        break;
                    case 40:
                        self.status = 3;
                        break;
                    case 50:case 60:case 90:
                        self.status = 4;
                        break;
                    case 70:case 71:case 72:
                        self.status = 6;
                        break;
                    case 80:
                        self.status = 7;
                        break;
                };
                var self_goods = [];
                var self_goodsNo = [];
                var self_goodsName = [];
                var self_goodsPrice = [];
                var self_goodsPhoto = [];
                var self_goodsNum = [];
                var self_goodsAttr = [];
                for(var i = 0; i < data.order_item_list.length; i++) {
                    self_goodsNo.push(data.order_item_list[i].item_uid);
                    self_goodsName.push(data.order_item_list[i].item_name);
                    self_goodsPrice.push(data.order_item_list[i].price);
                    self_goodsPhoto.push(data.order_item_list[i].icon_url);
                    self_goodsNum.push(data.order_item_list[i].number);
                    self_goodsAttr.push(data.order_item_list[i].sku_snapshot);
                    var goods = {
                      "goodsNo": self_goodsNo[i],
                      "goodsName": self_goodsName[i],
                      "goodsPrice": self_goodsPrice[i]/100,
                      "goodsPhoto": self_goodsPhoto[i],
                      "goodsNum": self_goodsNum[i],
                      "goodsAttr": self_goodsAttr[i]
                    };
                    self_goods.push(goods);
                }
                var INFO = {
                    ecv: {
                        "vipNo": self.service_id || '',
                        "vipName": self.name || ''
                    },
                    eco: {
                        "orderNo": self.order_uid,
                        "addTime": self.order_time,
                        "recName": "",
                        "recAdress": self.address,
                        "recPhone": self.mobile,
                        "payTime": self.pay_time,
                        "payWay": self.payWay,
                        "distributeWay": "",
                        "status": self.status,
                        "remark": "",
                        "goods": self_goods,
                        "terminalType": "",
                        "totalPrice": self.totalPrice/100
                    }
                }
                cb && cb(INFO);
            },
            error: function (data) {
                lib.notification.simple(data.msg, 1000);
            }
        });
    };

</script>

</html>
