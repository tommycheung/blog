/*!
* Feedback JavaScript Library v0.1
* http://Taobao.com/
*
* Copyright 2011, Taobao
* Date: 2011/10/24
*/
(function (window, undefined) {
    var 
    // 建立正确的相应窗口（沙箱
  	document = window.document,
    // BODY对象的兼容处理
	doBody = !'0'[0] ? document.body : document.documentElement,
    // IE6、IE7兼容状态
	isIE76 = !'0'[0],
    // IE6兼容状态
	isIE6 = isIE76 && !window.XMLHttpRequest;

    // 创建Feedback对象
    var Feedback = function () { },
    // 默认配置
	defaultConfig = {
	    popWidth: 975,
	    popHeight: 388,
	    useClient: false,
	    dataUrl: '',
	    closeButtonImage: '',
	    floatImage: '',
	    floatPosition: 'left:auto',
	    bindId: '', 
		appURL: false
	};

    Feedback.prototype.run = function (options) {
        Feedback.fn.init();
    };
	
	Feedback.prototype.show = function (options) {
        Feedback.fn.showbox();
    };

    Feedback.prototype.config = function (options) {
        for (k in options) defaultConfig[k] = options[k];
        return this;
    };

    Feedback.fn = {
        //初始化 
        init: function () {
            if (!defaultConfig.useClient) return;
			//判断HOST请求协议
			var _gaJsHost = (("https:" == document.location.protocol) ? "https://uservoice.alibaba-inc.com" : "http://uservoice.alibaba-inc.com");
            //反馈接口地址
            var appURL = defaultConfig.appURL || _gaJsHost + '/Feedback/Submit?appId=' + defaultConfig.useClient + '&referUrl=' + encodeURIComponent(location.href) + '&Cache=';
            // 创建弹出层外框
            var oDiv = document.createElement('div');
            with (oDiv.style) {
                width = parseInt(defaultConfig.popWidth) + 'px';
                height = parseInt(defaultConfig.popHeight) + 'px';
                border = '#C5C5C5 1px solid';
                background = 'url(' + defaultConfig.closeButtonImage.replace(/\w+\.\w{3}$/ig, '') + 'loading_big.gif) no-repeat center center #f0f0f0';
                position = 'absolute';
                top = parseInt(parseInt(document.body.scrollTop+document.documentElement.scrollTop) + (document.documentElement.clientHeight/2) - parseInt(defaultConfig.popHeight)/2) + 'px';
                left = parseInt(document.documentElement.offsetWidth * 0.5 - parseInt(defaultConfig.popWidth) * 0.5) + 'px';
                overflow = 'hidden';
                display = 'none';
                zIndex = '998';
            }

            // 创建弹出层关闭按钮
            var oSpan = document.createElement('span');
            with (oSpan.style) {
                position = 'absolute';
                top = '5px';
                right = '5px';
                cursor = 'pointer';
            }
            oSpan.innerHTML = '<img src="' + defaultConfig.closeButtonImage + '">';

            // 创建遮罩层
            var MaskDiv = document.createElement('div');
            with (MaskDiv.style) {
                width = '100%';
                height = (!isIE6 ? '100%' : document.documentElement.offsetHeight);
                position = (!isIE6 ? 'fixed' : 'absolute');
                top = '0px';
                left = '0px';
                bottom = '0px';
                right = '0px';
                background = '#000';
                filter = 'alpha(opacity:50)';
                opacity = '0.5';
                zIndex = '996';
                display = 'none';
            }
            doBody.appendChild(MaskDiv);

            var openDivfn = function () {
                if (oDiv.style.display !== 'none') return;

                oDiv.style.display = 'block';
				oDiv.style.top = parseInt(parseInt(document.body.scrollTop + document.documentElement.scrollTop) + (document.documentElement.clientHeight / 2 - parseInt(defaultConfig.popHeight) * 0.5)) + 'px';

                if (oDiv.getAttribute('isScroll') !== 'yes') {
                    Feedback.fn.addEvent(window, 'scroll', function () {
                        Feedback.effect.run(oDiv, { top: parseInt(parseInt(document.body.scrollTop + document.documentElement.scrollTop) + (document.documentElement.clientHeight / 2 - parseInt(defaultConfig.popHeight) * 0.5)) });
                    });
                    oDiv.setAttribute('isScroll', 'yes');
                }

                if (oDiv.getAttribute('isIframe') !== 'yes') {
                    var iFrame = document.createElement('iframe');
                    with (iFrame) {
                        src = appURL;
                        marginHeight = marginWidth = frameBorder = 0;
                        scrolling = 'no';
                        width = parseInt(defaultConfig.popWidth);
                        height = parseInt(defaultConfig.popHeight);
                    }
                    oDiv.appendChild(iFrame);
                    oDiv.setAttribute('isIframe', 'yes');
                }

                // 打开遮罩层
                MaskDiv.style.display = 'block';
            };

            if (defaultConfig.floatImage || typeof defaultConfig.qa == typeof undefined) {
                var oDiv2 = document.createElement('div');
                var oDiv2Top = 150;

                if (defaultConfig.floatImage) {
                    var subDiv = document.createElement('div');
                    subDiv.style.cursor = 'pointer';
                    subDiv.innerHTML = '<img src="' + defaultConfig.floatImage + '">';
                    oDiv2.appendChild(subDiv);

                    this.addEvent(subDiv, 'click', openDivfn);
                }

                if (typeof defaultConfig.qa !== typeof undefined && defaultConfig.qa.text !== '' && defaultConfig.qa.URL !== '') {
                    var subDiv2 = document.createElement('div');
                    with (subDiv2.style) {
                        border = '#C5C5C5 1px solid';
                        background = '#FFF';
                        fontSize = '12px';
                        textAlign = 'center';
                        padding = '5px 0';
                    }

                    for (var i = 0, textPu = []; i < defaultConfig.qa.text.length; i++) {
                        textPu.push(defaultConfig.qa.text.charAt(i));
                    }
                    subDiv2.innerHTML = '<span style="display:block;">问<br>卷</span><a href="' + defaultConfig.qa.URL + '" target="_blank" style="display:none; border-top:#C5C5C5 1px solid; padding-top:5px;">' + textPu.join('<br>') + '</a>';
                    oDiv2.appendChild(subDiv2);

                    this.addEvent(subDiv2, 'mouseover', function () {
                        subDiv2.getElementsByTagName('a')[0].style.display = 'block';
                    });

                    this.addEvent(subDiv2, 'mouseout', function () {
                        subDiv2.getElementsByTagName('a')[0].style.display = 'none';
                    });
                }

                //if (oDiv2.innerHTML == '') return;

                // 给BODY追加悬浮缩略图
                doBody.appendChild(oDiv2);

                if (defaultConfig.floatPosition) {
                    var posSplit = (defaultConfig.floatPosition + '').split(':');
                    posSplit[0] = posSplit[0].toLowerCase();
                    if (posSplit[0] == 'left' || posSplit[0] == 'right') {
						oDiv2.style[posSplit[0]] = posSplit[1] == 'auto' ? '0px' : parseInt(posSplit[1]) + 'px';
						
						//处理侧边悬浮层左右定位兼容问题
						if(isIE6){
							this.addEvent(window, 'resize', function () {
								switch(posSplit[0]){
									case 'left':
										oDiv2.style.left = '0px';
										oDiv2.style.right = 'auto';
										break;
									case 'right':
										oDiv2.style.left = 'auto';
										oDiv2.style.right = '0px';
										break;
								}
							});
							this.addEvent(window, 'scroll', function () {
								var scrollLeft = (document.body.scrollLeft + document.documentElement.scrollLeft);
								switch(posSplit[0]){
									case 'left':
										oDiv2.style.left = scrollLeft+'px';
										break;
									case 'right':
										oDiv2.style.left = scrollLeft + document.documentElement.clientWidth - oDiv2.offsetWidth + 'px';
										break;
								}
								Feedback.effect.run(oDiv2, { top: parseInt(parseInt(document.body.scrollTop + document.documentElement.scrollTop) + oDiv2Top) });
							});
						}
                    }
                    if (posSplit[0] == 'top') {
                        oDiv2Top = posSplit[1] == 'auto' ? 0 : parseInt(posSplit[1]);
                    }
                    if (posSplit[0] == 'bottom') {
                        oDiv2Top = posSplit[1] == 'auto' ? (document.documentElement.clientHeight - oDiv2.offsetHeight) : (document.documentElement.clientHeight - oDiv2.offsetHeight - parseInt(posSplit[1]));
                    }
                }

                with (oDiv2.style) {
                    position = (!isIE6 ? 'fixed' : 'absolute');
                    top = (document.body.scrollTop + document.documentElement.scrollTop) + oDiv2Top + 'px';
                    zIndex = '999';
                }
            }

            //绑定自定义样式ID
            if (defaultConfig.bindId) {
                var bindBtn = this.get(defaultConfig.bindId);
                this.addEvent(bindBtn, 'click', openDivfn);
            }
			
			//指令弹出窗口
			this.showbox = function(){
				openDivfn();
			};

            this.addEvent(oSpan, 'click', function () {
                oDiv.style.display = 'none';
                MaskDiv.style.display = 'none';
                oDiv.getElementsByTagName('iframe')[0].src = oDiv.getElementsByTagName('iframe')[0].src + Math.random();
            });

            // 给弹出层追加关闭按钮
            oDiv.appendChild(oSpan);
            // 给BODY追加弹出层框Demo
            doBody.appendChild(oDiv);
        },	
        get: function (selector) {
            return (typeof selector == 'string' ? document.getElementById(selector) : selector);
        },
        contains: function (A, B) {
            return (A.indexOf(B) >= 0);
        },
        capitalize: function (str) {
            return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
        },
        camelize: function (str) {
            return str.replace(/\-(\w)/ig, function (B, A) { return A.toUpperCase(); });
        },
        // 获取CSS属性值
        getStyle: function (obj, attr) {
            var ret;

            if (attr == "float") document.defaultView ? attr = 'float' : attr = 'styleFloat';

            ret = obj.style[attr] || obj.style[this.camelize(attr)];

            if (!ret) {
                if (document.defaultView && document.defaultView.getComputedStyle) {
                    var _css = document.defaultView.getComputedStyle(obj, null);
                    ret = _css ? _css.getPropertyValue(attr) : null;
                } else {
                    if (obj.currentStyle) ret = obj.currentStyle[this.camelize(attr)];
                }
            }
            if (ret == "auto" && this.contains(["width", "height"], attr) && obj.style.display != "none") {
                ret = obj["offset" + this.capitalize(attr)] + "px";
            }
            if (attr == "opacity") {
                try {
                    ret = obj.filters['DXImageTransform.Microsoft.Alpha'].opacity;
                    ret = ret / 100;
                } catch (e) {
                    try {
                        ret = obj.filters('alpha').opacity;
                    } catch (err) { }
                }
            }
            return (ret == "auto" ? null : ret);
        },
        // 添加元素事件 
        addEvent: function (obj, EventType, fun) {
            if (obj.addEventListener) {
                obj.addEventListener(EventType, fun, false);
            } else if (obj.attachEvent) {
                obj.attachEvent("on" + EventType, fun);
            } else {
                obj["on" + EventType] = fun;
            }
        },
        // 删除元素事件 
        removeEvent: function (obj, EventType, fun) {
            if (obj.removeEventListener) {
                obj.removeEventListener(EventType, fun, false);
            } else if (obj.detachEvent) {
                obj.detachEvent("on" + EventType, fun);
            } else {
                obj["on" + EventType] = null;
            }
        }, 
		//指令弹出窗口
		showbox: function(){
			alert('\u8BF7\u60A8\u5148\u6FC0\u6D3B\u63D2\u4EF6\uFF0C\u65B9\u6CD5:Feedback.run()');
		}
    };

    Feedback.effect = {
        run: function (obj, json, fnEnd) {
            if (typeof obj !== 'object') return;
            var doc = this;
            if (obj.timer) {
                clearInterval(obj.timer);
            }
            obj.timer = setInterval(function () {
                doc.move(obj, json, fnEnd);
            }, 30);

            var oDate = new Date();

            if (oDate.getTime() - obj.lastMove > 30) {
                doc.move(obj, json, fnEnd);
            }
        },
        move: function (obj, json, fnEnd) {
            if (typeof obj !== 'object') return;
            var iCur = 0, attr = '', bStop = true;

            for (attr in json) {
                if (attr == 'opacity') {
                    iCur = parseInt(100 * parseFloat(Feedback.fn.getStyle(obj, 'opacity')));
                } else {
                    iCur = parseInt(Feedback.fn.getStyle(obj, attr));
                }

                if (isNaN(iCur)) iCur = 0;

                var iSpeed = (json[attr] - iCur) / 8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

                if (parseInt(json[attr]) != iCur) bStop = false;

                if (attr == 'opacity') {
                    obj.style.filter = "alpha(opacity:" + (iCur + iSpeed) + ")";
                    obj.style.opacity = (iCur + iSpeed) / 100;
                } else {
                    obj.style[attr] = iCur + iSpeed + 'px';
                }
            }

            if (bStop) {
                clearInterval(obj.timer);
                obj.timer = null;

                if (fnEnd) fnEnd();
            }

            obj.lastMove = (new Date()).getTime();
        }
    };

    window.Feedback = new Feedback();
})(window);