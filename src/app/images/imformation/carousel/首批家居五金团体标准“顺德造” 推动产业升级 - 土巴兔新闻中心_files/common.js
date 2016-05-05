;
(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define('Common', factory);
    } else {
        root.Common = factory();
    }
})(window, function (require, exports, module) {

    var Common = {};

    var $ = window.$ || require && require('jquery');

    Common.setCookie = function (name, value, expire, pre) {
        if (!expire) {
            expire = 5000;
        }

        if (pre) {
            name = 'to8to_' + name;
        }

        var expiry = new Date();
        expiry.setTime(expiry.getTime() + expire);
        document.cookie = name + '=' + value + ';expires=' + expiry.toGMTString() + ';path=/;domain=.to8to.com';
    }

    Common.getCookie = function (name, pre) {
        if (pre)
            name = 'to8to_' + name;
        var r = new RegExp("(\\b)" + name + "=([^;]*)(;|$)");
        var m = document.cookie.match(r);
        var res = !m ? "" : decodeURIComponent(m[2]);
        var result = Common.stripscript(res);
        return result;
    }

    Common.stripscript = function (s) {
        var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
        //格式 RegExp("[在中间定义特殊过滤字符]")
        var rs = "";
        for (var i = 0; i < s.length; i++) {
            rs = rs + s.substr(i, 1).replace(pattern, '');

        }
        return rs;
    }

    Common.isIE = navigator.userAgent.indexOf("compatible") > -1 && navigator.userAgent.indexOf("MSIE") > -1 && (navigator.appName !== "Oprea");
    Common.isIE7 = (Common.isIE && window.XMLHttpRequest) ? true : false;
    Common.isIE6 = (Common.isIE && !window.XMLHttpRequest && window.ActiveXObject) ? true : false;
    Common.isFirefox = navigator.userAgent.indexOf('Firefox') == -1 ? false : true;
    var userAgent = navigator.userAgent.toLowerCase();
    Common.is_opera = userAgent.indexOf('opera') != -1;
    Common.is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
    Common.is_ie = (userAgent.indexOf('msie') != -1 && !Common.is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
    Common.isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    Common.to8to_uid = Common.getCookie('uid', 1);
    Common.to8to_ind = Common.getCookie('ind', 1);
    Common.to8to_username = Common.getCookie('to8to_username');

    String.prototype.trim = function () {
        var res = /^\s*/;
        var value = this;
        value = value.replace(res, '');
        res = /\s*$/;
        return value.replace(res, '');
    };

    Common.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    };

    Common.toShare = function (shareBd, shareConfig) {
        var config = $.extend({
                title: document.title,
                descr: document.title,
                summary: document.title,
                pic: $('img')[0].src,
                url: location.href
            }, shareConfig),
            wrap = $('#' + shareBd);

        wrap.find('.share_qqwb_define').attr('href', 'http://v.t.qq.com/share/share.php?title=' + config.descr + '&url=' + config.url + '&pic=' + config.pic);
        wrap.find('.share_qzone_define').attr('href', 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + config.url + '&desc=' + config.descr + '&summary=' + config.summary + '&title=' + config.title + '&site=&pics=' + config.pic);
        wrap.find('.share_qq_define').attr('href', 'http://connect.qq.com/widget/shareqq/index.html?url=' + config.url + '&desc=' + config.descr + '&summary=' + config.summary + '&title=' + config.title + '&site=&pics=' + config.pic);
        wrap.find('.share_weibo_define').attr('href', 'http://service.weibo.com/share/share.php?url=' + config.url + '&appkey=&title=' + config.descr + '&pic=' + config.pic + '&language=zh_cn&searchPic=false')
        var wechatBtn = wrap.find('.share_wechat');
        var wechatView = $('#bdshare_weixin_qrcode_dialog');

        if (wechatBtn.length && !wechatView.length) {
            wechatView = $('<div id="bdshare_weixin_qrcode_dialog" class="bd_weixin_popup" style="width: 240px; height: 275px;display: none;"><div class="bd_weixin_popup_head"><span>分享到微信朋友圈</span><a href="javascript:;" class="bd_weixin_popup_close">×</a></div><div id="bdshare_weixin_qrcode_dialog_qr" class="bd_weixin_popup_main"><img style="margin: 0 auto;" /></div><div class="bd_weixin_popup_foot">打开微信，点击底部的“发现”，<br>使用“扫一扫”即可将网页分享至朋友圈。</div></div>');
            $('body').append(wechatView);
            setPosition(wechatBtn, wechatView);
            $('#bdshare_weixin_qrcode_dialog_qr img').attr('src', Common.createQrcodeUrl(location.href));
            $('#bdshare_weixin_qrcode_dialog .bd_weixin_popup_close').click(function() {
                wechatView.hide();
            });
        }
        wechatBtn.click(function() {
            setPosition(wechatBtn, wechatView);
			wechatView.show();
        });

        function setPosition(wechatBtn, wechatView) {
            wechatView.css({
                left: (wechatBtn.offset().left + wechatBtn.width() + 10) + 'px',
                top: (wechatBtn.offset().top) + 'px'
            });
        }
    };

    // 模拟PlaceHolder
    Common.initPlaceHolder = function (textArea, placeWrap, defaultVal) {
        var val = !defaultVal ? placeWrap.text() : defaultVal,
            textVal = '';
        textArea.keydown(function () {
            placeWrap.hide();
        }).blur(function () {
            textVal = textArea.val();
            if (textVal == '' || textVal == val) {
                textArea.val('');
                placeWrap.show();
            }
        });
    };

    // 初始化登录导航
    Common.initLoginNav = function () {
        // 顶部显示二维码提示
        new Common.showTips({
            trigger: $('#showT8tQrcode'),
            layer: $('#qcode_wech_img')
        });

        // 获取登录用户信息
        if (Common.to8to_uid && Common.to8to_username) {
            createUserNav();
        }

        function createUserNav() {
            var str_havel = '';

            //用户身份
            var ind = Common.getCookie('to8to_ind');
            var uid = Common.getCookie('to8to_uid');
            var to8to_username = Common.getCookie('to8to_username');

            str_havel = '<div rel="nofollow" class="col_l htr_username_box">' +
                '<a href="javascript:;" class="htr_username">' +
                '<p class="ect">' + to8to_username + '</p>' +
                '<i class="triangle_down"></i></a>' +
                '<ul class="user_memu" style="display:none">' +
                '<li><a href="http://www.to8to.com/my/">个人中心</a></li>';

            if (ind == 'yz') {
                str_havel += '<li><a href="http://www.to8to.com/my/yz_administration_self.php?act=1" id="userbar-myinfo" class="">帐号设置</a></li>';
            } else if (ind == 'zs') {
                str_havel += '<li><a href="http://www.to8to.com/zs/' + uid + '">公司主页</a></li>';
                str_havel += '<li><a href="http://www.to8to.com/my/gs_data.php" >帐号设置</a></li>';
            }
            ;
            str_havel += '<li><a href="http://www.to8to.com/logout.php?uid=' + uid + '">退出</a></li></ul></div>';

            $.ajax({
                async: true,
                type: "GET",
                dataType: 'jsonp',
                url: "http://www.to8to.com/api/get_message_count.php",
                data: {ind: ind, uid: uid},
                async: false,
                success: function (data) {
                    if (data.status == "1") {
                        str_havel += data.message;
                    }
                    var labelObj = $('#nav_user_data');
                    labelObj.html(str_havel);
                    labelObj.children('div').hover(function () {
                        $(this).toggleClass('on');
                        $(this).children('ul').toggle();
                        $(this).children('a').find('i.triangle_down').toggleClass('triangle_up');
                    });
                }
            });
        }
    };

    /**
     * 浏览器检测
     * @returns {{name: *, version: Number}}
     */
    Common.checkBrowser = function(){
        var u = window.navigator.userAgent.toLocaleLowerCase(),
            msie = /(msie) ([\d.]+)/,
            chrome = /(chrome)\/([\d.]+)/,
            firefox = /(firefox)\/([\d.]+)/,
            safari = /(safari)\/([\d.]+)/,
            opera = /(opera)\/([\d.]+)/,
            ie11 = /(trident)\/([\d.]+)/,
            b = u.match(msie)||u.match(chrome)||u.match(firefox)||u.match(safari)||u.match(opera)||u.match(ie11);
        return {name: b[1], version: parseInt(b[2])};

    };

    Common.createQrcodeUrl = function(url) {
        return 'http://s.jiathis.com/qrcode.php?url=' + encodeURIComponent(url);
    };

    /**
     * 简易的显示隐藏组件
     * @param options
     */
    Common.showTips = function(options) {
        var _this = this;
        this.trigger = options.trigger;
        this.layer = options.layer.hide();
        this.speed = options.speed || 200;
        this.onTrigger = options.onTrigger || null;
        this.onHide = options.onHide || null;
        this.timer = 0;
        this.trigger.mouseover(function() {
            clearTimeout(_this.timer);
            _this.layer.show();
            _this.callTriger();
        }).mouseout(function() {
            _this.timer = setTimeout(function() {
                _this.layer.hide();
                _this.callHide();
            }, _this.speed);
        });
        _this.layer.mouseover(function() {
            clearTimeout(_this.timer);
        }).mouseout(function() {
            _this.timer = setTimeout(function() {
                _this.layer.hide();
                _this.callHide();
            }, _this.speed);
        });

        this.callHide = function() {
            if (typeof this.onHide === 'function') {
                this.onHide.call(this);
            }
        }

        this.callTriger = function() {
            if (typeof this.onTrigger === 'function') {
                this.onTrigger.call(this);
            }
        }
    }

    return Common;
});

// 老版slider 插件代码
!function (jq) {
    $.fn.slider = function (settings) {
        settings = $.extend({}, $.slider.defaults, settings);
        var obj = this;
        var scroller = {};
        scroller.fn = {};
        scroller.ulObj = jq(this);
        scroller.li = scroller.ulObj.find('li');
        scroller.len = scroller.orgLen+2*settings.visibleNum;
        scroller.w = scroller.li.width() + settings.itemMargin;
        scroller.itemSum = scroller.li.length;
        scroller.bLeftBtn = obj.parents(settings.rowWrap).find('a.ps1_sec_l');
        scroller.bRightBtn = obj.parents(settings.rowWrap).find('a.ps1_sec_r');
        
        scroller.fn.initHtml = function() {
            var str = '';
            
            scroller.ulObj.css({'left': '-'+(scroller.w + settings.originLeft)+'px', 'width': '99999px'});
            scroller.li.filter(':lt(2)').clone().appendTo(scroller.ulObj);
            scroller.li.filter(':gt('+(scroller.itemSum-3)+')').clone().prependTo(scroller.ulObj);
            scroller.li.eq(0).addClass(settings.play);
            scroller.li = scroller.ulObj.find('li');
            scroller.itemSum = scroller.li.length;
        };

        // 方法：开始
        scroller.fn.on = function () {
            scroller.fn.off();
            scroller.fn.removeControl();
            scroller.fn.addControl();

            if (!settings.auto) {
                return;
            };
            scroller.run = setTimeout(function () {
                scroller.fn.goto(settings.direction);
            }, settings.time);
        };
        // 方法：停止
        scroller.fn.off = function () {
            if (typeof(scroller.run) !== "undefined") {
                clearTimeout(scroller.run);
            };
        };
        // 方法：增加控制
        scroller.fn.addControl = function () {
            if (scroller.bLeftBtn.length != 0) {
                scroller.bLeftBtn.bind("click", function () {
                    scroller.fn.goto("bLeft");
                });
            };
            if (scroller.bRightBtn.length != 0) {
                scroller.bRightBtn.bind("click", function () {
                    scroller.fn.goto("bRight");
                });
            };
        };
        // 方法：解除控制
        scroller.fn.removeControl = function () {
            if (scroller.bLeftBtn.length) {
                scroller.bLeftBtn.unbind("click");
            };
            if (scroller.bRightBtn.length) {
                scroller.bRightBtn.unbind("click");
            };
        };
        
        scroller.li.hover(function () {
            scroller.fn.off();
        }, function () {
            scroller.fn.on();
        });
        // 方法：滚动
        scroller.fn.goto = function (d) {
            var nextNum = 0;
            scroller.fn.off();
            if (settings.bLeft && settings.bRight) {
                scroller.fn.removeControl();
            };

            obj.stop(true);
            scroller.onCurNum = scroller.li.index(obj.find('li.' + settings.play));
            switch (d) {
                case "bRight":
                    nextNum = scroller.onCurNum + 1;
                    if (scroller.onCurNum == scroller.itemSum - 3) {//5
                        obj.css('left', -settings.originLeft+'px');
                        nextNum = 2;
                    }
                    obj.animate({left: '-=' + scroller.w + 'px'});
                    scroller.li.removeClass('' + settings.play + '');
                    scroller.li.eq(nextNum).addClass('' + settings.play + '');
                    break;
                case "bLeft":
                    nextNum = scroller.onCurNum - 1;
                    if (scroller.onCurNum == 2) {//0
                        obj.css('left', '-' + ((scroller.itemSum - 3) * scroller.w + settings.originLeft) + 'px');
                        nextNum = scroller.itemSum - 3;
                    }
                    obj.animate({left: '+=' + scroller.w + 'px'});
                    scroller.li.removeClass('' + settings.play + '');
                    scroller.li.eq(nextNum).addClass('' + settings.play + '');
                    break;
            }
            if(settings.callback) {
                settings.callback.call(obj);
            }
            obj.queue(function () {
                if (settings.bLeft && settings.bRight) {
                    scroller.fn.removeControl();
                    scroller.fn.addControl();
                };
                if (settings.auto) {
                    scroller.run = setTimeout(function () {
                        scroller.fn.goto(settings.direction);
                    }, settings.time);
                };


                $(this).dequeue();
            });
        };
        scroller.fn.initHtml();
        scroller.fn.on();
    };

    // 默认值
    $.slider = {defaults: {
        speed: 800,      // 滚动速度
        time: 4000,      // 自动滚动间隔时间
        play: "on",         //选中样式
        auto: true,
        bLeft: true,                 //左控
        bRight: true,            //右控
        direction: "bRight",  // 顺序
        itemMargin: 0,
        originLeft: 0,
        rowWrap: 'div',
        callback: false
    }};
}(jQuery);


//设置初始UL宽度
(function(jq) {
    jq.fn.setWidth = function(margin) {
        var ul = jq(this),
            len = ul.find("li").length,
            w = ul.find("li").width() + margin,
            wAll = len*w;
                
        ul.css("width",wAll+"px");
    };
})(jQuery);

//图片切换
(function(jq) {
    jq.fn.slideTxq = function(settings) {
        var defaults = {
            derect:"left",//默认方向
            margin:13,
            leftBtn:".ps1_sec_l",
            rightBtn:".ps1_sec_r",
            time:500,//滑动一张时间
            num:5,//大于这个数滑动
            btnWrap:false//btn位置
        };
        settings = jq.extend(defaults,settings);
        var par = jq(this).parent(),
            ul = par.find("ul:eq(0)"),
            len = ul.find("li").length,
            w = ul.find("li").width() + settings.margin,
            btnL = par.nextAll(settings.leftBtn),
            btnR = par.nextAll(settings.rightBtn),
            that = jq(this),
            on_index = 0;
            
            
        if(settings.btnWrap) {
            btnL = jq(this).parents(settings.btnWrap).find(settings.leftBtn);
            btnR = jq(this).parents(settings.btnWrap).find(settings.rightBtn); 
        };

        jq(this).setWidth(settings.margin);
        if(settings.num < len) {
            jq(btnR).click(function() {
                if(!jq(that).is(":animated")) {
                    ul.animate({"margin-left":"-"+w+"px"},settings.time,function() {
                        ul.find("li:first").appendTo(ul);
                        ul.css("margin-left",0);
                    });
                };
            });
            jq(btnL).click(function() {
                if(!jq(that).is(":animated")) {
                    ul.find("li:last").prependTo(ul).parent().css("margin-left",-w+"px");   
                    ul.animate({"margin-left":"+="+w+"px"},settings.time);  
                };
            }); 
        };
    };
})(jQuery);
//老板回到顶部
(function(jq) {
    var scrollTop = {init:function(qqArr,qqShow,editShow) {
            gotoTop(qqArr,qqShow,editShow);
            ctrolGotop();
            ctrlLeft();//初始化置顶的LEFT值
        }};
    
    function gotoTop(qqArr,qqShow,editShow) {
        var str = '<div class="nav_top"><ul class="qq_list">',
            obj = {};
            
        if(qqShow && qqArr.length != 0) {   
            for(var i=0,len=qqArr.length;i < len;i++) {
                str += '<li><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin='+qqArr[i].qq+'&site=qq&menu=yes"><em></em><span>'+qqArr[i].manname+'</span></a></li>';
            }
        }
        str += '</ul><div class="nav_top_list"><a href="javascript:;" class="ico_qq ico_qq_act"><i></i>'+editShow+'</a><a href="javascript:;" class="ico_server"><i></i><span>在线咨询</span></a><a target="_blank" href="http://www.to8to.com/about/feedback.php" rel="nofollow" class="ico_feedback"><i></i><span>意见反馈</span></a><a href="javascript:;" class="ico_top"><i></i><span>回到顶部</span></a></div></div>';
        
        jq("body").append(jq(str));
        
        if(qqShow) {
            jq(".nav_top > .nav_top_list > .ico_qq").css("display","block");
            jq(".nav_top > ul.qq_list").css("display","block");
            jq(".nav_top > .nav_top_list > .ico_server").hide();    
        };
        jq(".nav_top > .nav_top_list > .ico_server").bind("click",function() {
            window.open('http://dzt.twos.net.cn/LR/Chatpre.aspx?id=DZT39460052&lng=cn', '_blank',"height=500,width=750");   
        });
        obj = getBodyType();
        jq(".nav_top").css({"left":obj.left+"px","margin-right":0});
        if(jq(".nav_top").find("ul.qq_list > li").length == 1) {
            jq(this).find("ul.qq_list > li").addClass("one");   
        };
        /*jq(".nav_top").find(".nav_top_list > .ico_qq").hover(function() {
            jq(this).addClass("ico_qq_act").parent().prev().show(); 
        },function() {
            jq(this).removeClass("ico_qq_act").parent().prev().hide();
        });
        
        jq(".nav_top").find(".qq_list").hover(function() {
            jq(this).next().find(".ico_qq").addClass("ico_qq_act");
            jq(this).show();    
        },function() {
            jq(this).next().find(".ico_qq").removeClass("ico_qq_act");
            jq(this).hide();    
        });*/
        jq(".nav_top").find(".nav_top_list > .ico_server").hover(function() {
            jq(this).find("i").hide().end().find("span").css("display","block");    
        },function() {
            jq(this).find("span").hide().end().find("i").css("display","block");
        });
        jq(".nav_top").find(".nav_top_list > .ico_feedback").hover(function() {
            jq(this).find("i").hide().end().find("span").css("display","block");    
        },function() {
            jq(this).find("span").hide().end().find("i").css("display","block");
        });
        jq(".nav_top").find(".nav_top_list > .ico_top").hover(function() {
            jq(this).find("i").hide().end().find("span").css("display","block");    
        },function() {
            jq(this).find("span").hide().end().find("i").css("display","block");
        }).click(function() {
            jq(window).scrollTop("0");  
        });     
    };
    function getBodyType() {
        var type = "wide";
        if(jq("body").hasClass("narrow_980")) {
            left = (jq("body").width() - 980)/2 + 1000;
            type = "narrow";    
        } else {
            left = (jq("body").width() - 1220)/2 + 1240;    
        }
        return {"left":left,"type":type};   
    };
    
    function ctrPositionForIe6() {
        var bwObj = Common.checkBrowser();
        if(bwObj.name == "msie" && bwObj.version == 6) { //IE6下控制TOP值
            var sH = document.documentElement.scrollTop || document.body.scrollTop,
                cH = document.documentElement.clientHeight || document.body.clientHeight,
                topForIe6 = sH + cH - jq(".nav_top").height() - 100;
            //jq("body").css("position","relative");     
            jq(".nav_top").css("top",topForIe6+"px");   
        }   
    };
    
    function ctrolGotop() {
        var h = jq(window).height()/2,
            obj = jq(".nav_top > .nav_top_list > .ico_top");
        ctrPositionForIe6();    
        if(jq(window).scrollTop() >= h) {
            obj.css("display","block"); 
        } else {
            obj.hide();     
        }   
    };
    
    function ctrlLeft() {
        var obj = getBodyType(),
            w = jq(window).width();

        if((obj.type == "wide" && w <= 1363) || (obj.type == "narrow" && w <= 1050)) {
            jq(".nav_top").css({"left":"auto","right":"0"});    
        } else {
            jq(".nav_top").css({"left":obj.left+"px","margin-right":0});    
        }   
    };
    
    jq(window).bind("scroll",function() {
        ctrolGotop();   
    }); 
    
    jq(window).bind("resize",function() {
        ctrlLeft();
        ctrPositionForIe6();
    });
    
    
    window.scrollTop = scrollTop;
})(jQuery,window);
(function(jq) {
    var goTopInit = function(settings) {
        jq(".nav_top").remove();
        var defaults = {
            topShow:true,//true显示置顶 false不显示
            editShow:"",//<em>编辑</em>显示编辑 为空不显示
            qqShow:false,//true显示企鹅 false不显示
            //wxShow:false,//true显示微信  false不显示
            qqArr:[]//QQ号数组
        };
        settings = jq.extend(defaults,settings);
        if(settings.topShow) {
            jq(function() {
                scrollTop.init(settings.qqArr,settings.qqShow,settings.editShow);   
            });
        } else {
            jq(".nav_top").remove();    
        }
    };  
    window.goTopInit = goTopInit;
})(jQuery,window);
//END 老板回到顶部

(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define('switchTab', factory);
    } else {
        root.switchTab = factory();
    }
})(window, function (require, exports, module) {

    var $ = window.$ || require && require('jquery');

    function in_array(item, arr){
        if(Array.prototype.indexOf){
            return arr.indexOf(item);
        }else{
            for(var i = 0; i < arr.length; i++){
                if(item === arr[i]){
                    return i;
                }
            }
            return -1;
        }  
    }

    /**
     * 选项卡切换,用于多个选项卡之间显示，隐藏的切换动作
     * @param  postger triggerObject 用于触发动作的对象
     * @param  postger showLayer    显示层
     */
    var switchTab = function( parameter ) {

        //触发器列表, 支持直接传入选择器，也可以是包含元素id的数组。
        this.trigger      = {};

        //面板列表，支持直接传入选择器，也可以是元素id的数组。
        this.layer        = {};

        //触发类型，默认click
        this.event        = 'click';

        //可选触发类型
        this.allowEvent   = ['click', 'mouseover'];

        //当前选中的面板序号，默认为0
        this.selectItem   = 0;

        //触发器被选中时的class,默认为空
        this.selectClass  = '';

        //默认为100， 触发器延迟时间，单位为毫秒。
        this.delayed      = 100;

        //触发后执行的回调函数
        this.onTrigger    = null;

        //初始化的时候默认选中项
        this.defaultIndex = 0;

        this.timer        = 0;

        this.maxItem      = 0;

        /**
         * 用于初始化对象和显示层
         */
        this.init = function()
        {

            this.event        = typeof parameter.event !== 'undefined' ? parameter.event : this.event;
            this.selectClass  = typeof parameter.className !== 'undefined' ? 　parameter.className : this.selectClass;
            this.delayed      = typeof parameter.delayed !== 'undefined' ? parseInt( parameter.delayed ) : this.delayed;
            this.defaultIndex = typeof parameter.defaultIndex !== 'undefined' ? parseInt( parameter.defaultIndex ) : this.defaultIndex;

            //验证事件类型是否合法
            if ( in_array( this.event, this.allowEvent ) < 0 )
            {
                throw new Error('not allow event type');
            }

            //验证触发器和显示面板参数类型以及做不同的处理
            var triggerType = typeof parameter.triggerObject,
                layerType = typeof parameter.showLayer;


            if ( Object.prototype.toString.apply(parameter.triggerObject) === '[object Array]' || Object.prototype.toString.apply(parameter.showLayer) === '[object Array]' )
            {
                //如果参数triggerObject是一个数组，那么默认传过来的是DOM对象的id
                if ( Object.prototype.toString.apply(parameter.triggerObject) === '[object Array]' )
                {
                    this.trigger = $( _join( parameter.triggerObject ) );
                }

                if ( Object.prototype.toString.apply(parameter.showLayer) === '[object Array]' )
                {
                    this.layer = $( _join( parameter.showLayer ) );
                }
            }

            if ( triggerType === 'string' || layerType === 'string' )
            {
                //jquery选择器或class属性
                if ( triggerType === 'string' )
                {
                    this.trigger = $( parameter.triggerObject ).length ? $( parameter.triggerObject ) : $( '.' + parameter.triggerObject );
                }

                if ( layerType === 'string' )
                {
                    this.layer   = $( parameter.showLayer ).length ? $( parameter.showLayer ) : $( '.' + parameter.showLayer );
                }

            }

            if ( Object.prototype.toString.apply(parameter.triggerObject) === '[object Object]' || Object.prototype.toString.apply(parameter.showLayer) === '[object Object]' )
            {
                //对象集合
                if ( Object.prototype.toString.apply(parameter.triggerObject) === '[object Object]' )
                {
                    this.trigger = parameter.triggerObject;
                }

                if ( Object.prototype.toString.apply(parameter.showLayer) === '[object Object]' )
                {
                    this.layer = parameter.showLayer;
                }
            }

            //初始化最大值
            this.maxItem = this.trigger.length ? this.trigger.length - 1 : 0;

            //显示默认面板
            this.switchTo( this.defaultIndex );

            //绑定事件
            this.bind();
        };

        //初始化绑定事件
        this.bind = function()
        {
            var _this = this;
            this.trigger.bind( this.event, function() {

                _this.selectItem = _this.trigger.index( $( this ) );
                _this.switchTo( _this.selectItem );

                //执行触发后的回调函数
                if ( typeof parameter.onTrigger === 'function' )
                {
                    //返回给回调函数的参数有三个，分别为触发事件的元素对象集合，显示层对象集合以及当前选中的面板序号
                    parameter.onTrigger( _this.trigger, _this.layer, _this.selectItem );
                }
            });
        };

        this.switchTo = function( selectItem )
        {
            selectItem = parseInt ( selectItem );

            //参数不合法
            if ( selectItem > this.maxItem || selectItem < 0 )
            {
                return false;
            }

            this.selectItem = selectItem;

            //是否有自定义className
            if ( this.selectClass )
            {
                this.trigger.removeClass( this.selectClass );
                this.trigger.eq( selectItem ).addClass( this.selectClass );
            }

            this.clear().delayedShow();
        }

        /**
         * 延迟显示面板
         */
        this.delayedShow = function()
        {
            var _this    = this;
            this.delayed = parseInt( this.delayed );
            this.timer   = setTimeout( function() {
                _this.layer.hide();
                _this.layer.eq( _this.selectItem ).show();
                $(window).trigger('resize');
            }, this.delayed );
        }

        this.clear = function()
        {
            clearTimeout( this.timer );
            return this;
        }

        this.init();
    };

    return switchTab;
});

// 新版轮播图组件，还未完善，建议先用上面老版本的
(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define('Slider', factory);
    } else {
        root.Slider = factory();
    }
})(window, function (require, exports, module) {

    var $ = window.$ || require && require('jquery');

    var Slider = function (element, options) {
        this.$element = element;

        this.options = $.extend({
            event: "mouseover",
            animate: 'fadeIn',     //动画默认是滚动
            item_wrap: '',         //栏目容器class
            nav_class: 'nav',      //导航class
            nav_hover_class: 'on', //导航激活之后的颜色
            prevBtn: '',           //上一张按钮
            nextBtn: '',           //下一张按钮
            duration: 3000,        //播放频率
            speed: 500,            //动画时间
            auto: true             //是否自动播放
        }, options);
        this.index = 0;
    }

    Slider.prototype = {
        init: function () {
            var that = this;//储存slider对象
            this.item_wrap = this.$element.find('.' + this.options.item_wrap);
            this.item = this.item_wrap.children();
            this.number = this.item.length;
            this.width = this.$element.outerWidth();
            this.$nav = this.$element.find('.' + this.options.nav_class).children();

            if (this.options.animate == 'fadeIn') {
                this.item.filter(':gt(' + this.index + ')').hide();
            }

            /*绑定事件*/
            this.bind(this.options.event);
            /*是否自动播放*/
            if (this.options.auto) this.play();
        },
        /*上一张下一张*/
        prev_or_next: function (type) {
            var that = this;
            if (type == 'prev') {
                that.index--;
            } else if (type == 'next') {
                that.index++;
            }

            if (that.index < 0 && type == 'prev') that.index = that.number - 1;
            if (that.index >= that.number && type == 'next') that.index = 0;
            that.$nav.removeClass(that.options.nav_hover_class);
            that.$nav.eq(that.index).addClass(that.options.nav_hover_class);
            that.animate();//图片动画
        },
        bind: function (type) {
            var that = this;
            this.$nav.bind(type, function (e) {
                that.index = that.$nav.index(this);
                that.$nav.removeClass(that.options.nav_hover_class);
                that.$nav.eq(that.index).addClass(that.options.nav_hover_class);
                that.animate();//图片动画
                clearInterval(that.$element.timer);
                e.preventDefault();
            });

            this.$nav.bind('mouseout', function () {
                if (that.options.auto) {
                    that.play();
                }
            });

            if (this.options.prevBtn) {
                this.$element.find('.' + this.options.prevBtn).bind('click', function (e) {
                    e.preventDefault();
                    that.prev_or_next('prev');
                })
            }

            if (this.options.nextBtn) {
                this.$element.find('.' + this.options.nextBtn).bind('click', function (e) {
                    e.preventDefault();
                    that.prev_or_next('next');
                })
            }

            this.item.bind({
                mouseover: function () {
                    clearInterval(that.$element.timer);
                },
                mouseout: function () {
                    if (that.options.auto) that.play();
                }
            });
        },
        play: function () {
            var that = this;//setInterval中的this是指向window对象，所以也要储存起来，以便在setInterval中使用
            if (this.$element.timer) clearInterval(that.$element.timer);
            this.$element.timer = setInterval(function () {
                that.prev_or_next('next');
            }, that.options.duration);
        },
        animate: function () {
            var that = this;

            if (that.options.animate == 'slide') {
                $(that.item_wrap).stop(true, true).animate({
                    marginLeft: -(that.width * that.index) + 'px'
                }, that.options.speed, function () {
                });
            } else if (that.options.animate == 'fadeIn' && that.item.filter(':visible').index() != that.index) {
                that.item.filter(':visible').stop(true, true).fadeOut(200, function () {
                    that.item.hide().eq(that.index).stop(true, true).fadeIn(that.options.speed);
                })
            }
        }
    }

    return Slider;

});

/**
 * 新闻中心大图轮播组件
 * 调用方法：
 * var actIndexSliderView = new newsSlider({
 *       speed: 500,
 *       timer: 0,
 *       prevBtn: $('#img_view .arrow_wrap_l'),
 *       nextBtn: $('#img_view .arrow_wrap_r'),
 *       nav: $('#img_nav').children(),
 *       item_wrap: $('#img_wrap'),
 *       duration: 5000,
 *       nav_hover_class: 'on',
 *       onAnimateEnd: function(index, nextIndex) {
 *           var selectUl = $('.banner_position_ul').filter('[index=' + index + ']').eq(0);
 *           $('.banner_position_ul').hide();
 *           selectUl.fadeIn(1000);
 *       }
 *   });
 *   actIndexSliderView.init();
 */
(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define('newsSlider', factory);
    } else {
        root.newsSlider = factory();
    }
})(window, function (require, exports, module) {

    var $ = window.$ || require && require('jquery');

    var newsSlider = function (options) {
        this.options = $.extend({
            currentIndex: 0,  // 当前选中项
            nextIndex: 0,
            speed: 500,  // 动画完成速度
            timer: 0,
            prevBtn: null,  // 点击左移动按钮
            nextBtn: null,  // 点击右移动按钮
            nav: null,  // 导航节点
            item_wrap: null, // 图片容器
            duration: 5000,  // 动画间隔时长
            nav_hover_class: 'on', // 导航节点选中样式
            currentMargin: 0,
            event: 'mouseenter',
            running: false,
            onAnimateEnd: null // 动画结束后的回调
        }, options);

        this.options.item = this.options.item_wrap.children() || 0;
        this.options.number = this.options.item.length || 0;
        this.options.itemWidth = this.options.item[0].clientWidth || 0;
        this.options.currentMargin = -this.options.itemWidth || 0;
    }

    newsSlider.prototype = {
        init: function () {
            if (this.options.number <= 1) {
                return false;
            }
            this.initPostion();
            this.play();
            this.bind();
        },

        bind: function () {
            var _this = this;
            this.options.nav.bind('mouseenter', function (e) {
                e.preventDefault();
                if (_this.options.currentIndex == _this.options.nav.index(this)) return;
                _this.options.nextIndex = _this.options.nav.index(this);
                clearInterval(_this.options.timer);
                _this.animate();
            });

            this.options.nav.bind('mouseleave', function () {
                _this.play();
            });

            this.options.prevBtn.bind('click', function (e) {
                _this.options.nextIndex = _this.options.currentIndex - 1;
                clearInterval(_this.options.timer);
                _this.animate(function () {
                    _this.play();
                });
                return false;
            })

            this.options.nextBtn.bind('click', function (e) {
                _this.options.nextIndex = _this.options.currentIndex + 1;
                clearInterval(_this.options.timer);
                _this.animate(function () {
                    _this.play();
                });
                return false;
            })

            this.options.item.bind({
                mouseover: function () {
                    clearInterval(_this.options.timer);
                },
                mouseout: function () {
                    _this.play();
                }
            });
        },

        animate: function (callback) {
            var _this = this;
            if (_this.options.running) {
                return false;
            }
            _this.options.item_wrap.stop(true, true);

            var cloneNodes = _this.options.item_wrap.children().clone().removeClass('on');
            var item = _this.options.item_wrap.children();

            if (_this.options.nextIndex > _this.options.currentIndex) { //向左移
                _this.options.item_wrap.append(cloneNodes);
                _this.options.currentMargin = _this.options.currentMargin - _this.options.itemWidth * Math.abs(_this.options.nextIndex - _this.options.currentIndex);

            } else { //向右移
                _this.options.item_wrap.prepend(cloneNodes);
                _this.options.currentMargin = _this.options.currentMargin - _this.options.itemWidth * _this.options.number;
                $(_this.options.item_wrap).css('marginLeft', _this.options.currentMargin);
                _this.options.currentMargin = _this.options.currentMargin + _this.options.itemWidth * Math.abs(_this.options.nextIndex - _this.options.currentIndex);
            }

            if (_this.options.nextIndex < 0) _this.options.nextIndex = _this.options.number - 1;
            if (_this.options.nextIndex > _this.options.number - 1) _this.options.nextIndex = 0;

            // 运动中按钮无效
            _this.options.running = true;
            _this.options.item_wrap.stop(true, true).animate({
                marginLeft: _this.options.currentMargin + 'px'
            }, _this.options.speed, function () {
                item = _this.options.item_wrap.children();
                if (item.length > _this.options.number) {
                    var selectItem = item.filter('[index=' + _this.options.nextIndex + ']').eq(0);
                    var selectIndex = selectItem.index();
                    if (selectIndex < 1) {
                        selectIndex += _this.options.number;
                    }
                    var deleteStart = item.filter(':lt(' + (selectIndex - 1) + ')');
                    var deleteEnd = item.filter(':gt(' + (selectIndex + _this.options.number - 2) + ')');

                    deleteStart.remove();
                    deleteEnd.remove();
                    _this.options.currentMargin = -_this.options.itemWidth;
                    _this.options.item_wrap.css('marginLeft', _this.options.currentMargin);

                    if (callback) callback();
                }

                _this.options.running = false;
                _this.options.currentIndex = _this.options.nextIndex;
                _this.options.nav.removeClass(_this.options.nav_hover_class);
                _this.options.nav.eq(_this.options.currentIndex).addClass(_this.options.nav_hover_class);

                // 执行回调函数
                if (typeof _this.options.onAnimateEnd === 'function') {
                    _this.options.onAnimateEnd.call(_this, _this.options.currentIndex, _this.options.nextIndex);
                }
            });

            item.unbind().bind({
                mouseover: function () {
                    clearInterval(_this.options.timer);
                },
                mouseout: function () {
                    _this.play();
                }
            });
        },

        play: function () {
            var _this = this;
            if (_this.options.timer) clearInterval(_this.options.timer);
            this.options.timer = setInterval(function () {
                _this.options.nextIndex = _this.options.currentIndex + 1;
                _this.animate();
            }, this.options.duration);
        },

        stop: function() {
            clearInterval(this.options.timer);
            this.options.item_wrap.stop(true, true);
        },

        initPostion: function () {
            var curW = (this.options.item.length * 2 * 100);
            this.options.item_wrap.css({
                'width': curW + '%',
                'margin-left': -this.options.itemWidth + 'px'
            });
        }
    }

    return newsSlider;
});


(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define('MultiItemSlide', factory);
    } else {
        root.MultiItemSlide = factory();
    }
})(window, function (require, exports, module) {

    var defaults = {
            derect:"left",//默认方向
            margin:20,
            prevBtn: null,  // 点击左移动按钮
            nextBtn: null,  // 点击右移动按钮
            item_wrap: null, // 图片容器
            speed:500,//滑动一张时间
            timer:0,
            num:4,//大于这个数滑动
            duration: 5000  // 动画间隔时长
        };

    var $ = window.$ || require && require('jquery');

    var MultiItemSlide = function (options) {
        this.options = $.extend({},defaults, options);
        this.options.items = this.options.item_wrap;
        this.options.itemsnum = this.options.items.children().length;
    }

    MultiItemSlide.prototype.init = function(){
        //this.play();
        var options = this.options,
            space = options.items.children()[0].clientWidth + options.margin;
        options.items.width(space * options.itemsnum); 
        this.bind();
    }

    MultiItemSlide.prototype.animate = function(step){
        var options = this.options,
            items = options.items,
            derect = options.derect,
            distance = items.children()[0].clientWidth + options.margin;
        if(!items.is(":animated")) {
            if(step <0){
                items.find("li:last").prependTo(items).parent().css("margin-left",-distance + "px");
                items.animate({"margin-left": "+=" + distance + "px"},options.speed); 
            }else{
                items.animate({"margin-left":-distance + "px"}, options.speed, function() {
                    items.find("li:first").appendTo(items);
                    items.css("margin-left",0);
                });
            }
        };
    }

    MultiItemSlide.prototype.play = function(which){
        var _this = this,
            derect = this.options.derect;
        if(this.options.num >= this.options.itemsnum){
            return;
        }
        if(!which){
            if (_this.options.timer){
                clearInterval(_this.options.timer);
            }
            this.options.timer = setInterval(function () {
                _this.animate(derect==='left' ? 1 : -1);
            }, this.options.duration);
        }else{
            this.animate(which);
        }
    }

    MultiItemSlide.prototype.bind = function(option){
        var _this = this;
        this.options.prevBtn.bind('click', function (e) {
            _this.play(-1);
        });
        this.options.nextBtn.bind('click', function (e) {
            _this.play(1);
        });
    }

    return MultiItemSlide;
});

(function(root, factory){
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define('ActivityCalendar', factory);
    } else {
        root.ActivityCalendar = factory();
    }
})(window, function (require, exports, module){

    var defaults = {
        container : null,              //日历容器对象
        activeCl:"act",               //活动初始样式
        activehoverCl : "act_hover",   //活动选中样式
        timer:0,
        scheduleCl: 'schedule_act'     //活动介绍样式
    };

    var $ = window.$ || require && require('jquery');

    var ActivityCalendar = function (options) {
        this.options = $.extend({},defaults, options);
    }

    ActivityCalendar.prototype.init = function(){
        var options = this.options;
        this.bind();
    }

    ActivityCalendar.prototype.bind = function(){
        var _this = this,
            options = this.options,
            container = options.container;
        
        container.find('td.' + options.activeCl).mouseenter(function(){
            $(this).removeClass(options.activeCl).addClass(options.activehoverCl);
            _this.showActivity($(this));
        }).mouseleave(function(){
            var elem = $(this);
            elem.removeClass(options.activehoverCl).addClass(options.activeCl);
            if (_this.options.timer){
                clearTimeout(_this.options.timer);
            }
            _this.options.timer = setTimeout(function () {
                _this.hideActivity(elem);
            }, 100);
        });


        container.find('tr.'+ options.scheduleCl).mouseenter(function(){
            if (_this.options.timer){
                clearTimeout(_this.options.timer);
            }
            $(this).show();
        }).mouseleave(function(){
            $(this).hide();
        });
    }

    ActivityCalendar.prototype.showActivity = function(dateObj){
        var date = dateObj.attr("date");
            container = this.options.container ;
        var activityIntroduce = container.find("tr[date="+ date +"]");
        var dist = getDistance(this.options.container, dateObj)
        activityIntroduce.css("top",dist -1).show();
        //不显示TD上边框
        activityIntroduce.find('td').css("borderTopWidth","0");
    }

    ActivityCalendar.prototype.hideActivity = function(dateObj){
        var date = dateObj.attr("date"),
            container = this.options.container ;
        var activityIntroduce = container.find("tr[date="+ date +"]");
        activityIntroduce.css("top",0).hide();
    }

    function getDistance(calendar , dateObj){
        var selectTrIndex = dateObj.parent().index(),
            lineSpace = 0;
        calendar.find('tr').each(function(i){
            if(i > selectTrIndex ){
                return false;
            }
            lineSpace += $(this).height();
        });
        return  lineSpace;
    }

    return ActivityCalendar;
});


// 全局公用的一些代码
;(function($, window) {
    $(function () {
        Common.initLoginNav();
    });
})(jQuery, window)

