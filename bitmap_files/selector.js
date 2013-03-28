/// <reference path="jquery-1.4.1-vsdoc.js" />

String.prototype.trim = function () {
    /// <summary> 去除首尾空白字符返回新值 </summary>
    ///	<returns type="String" />
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.leftTrim = function () {
    /// <summary> 去除首部空白字符返回新值 </summary>
    ///	<returns type="String" />
    return this.replace(/(^\s*)/g, "");
}

String.prototype.rightTrim = function () {
    /// <summary> 去除尾部空白字符返回新值 </summary>
    ///	<returns type="String" />
    return this.replace(/(\s*$)/g, "");
}

String.prototype.filterHtml = function () {
    /// <summary> 过滤HTML标签返回新值 </summary>
    ///	<returns type="String" />
    return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt").replace(/"/g, "&#34;").replace(/'/g, "&#39;");
}

String.prototype.replaceAll = function (oldStr, newStr) {
    /// <summary> 替换所有匹配字符返回新值 </summary>
    ///	<returns type="String" />
    return this.replace(new RegExp(oldStr, "g"), newStr);
}

String.prototype.realLength = function () {
    /// <summary> 判断字符串长度-区分全角中文 </summary>
    ///	<returns type="Number" />
    return this.replace(/[^\x00-\xff]/g, "**").length;
}

String.prototype.toNumber = function (def) {
    /// <summary> 整数转换 </summary>
    ///	<param name="def" type="Number"> 默认数值[可选] </param>
    ///	<returns type="Number" />
    return isNaN(parseInt(this, 10)) ? def : parseInt(this, 10);
}

String.prototype.toFloat = function (def) {
    /// <summary> 小数转换 </summary>
    ///	<param name="def" type="Number"> 默认数值[可选] </param>
    ///	<returns type="Number" />
    return isNaN(parseFloat(this)) ? def : parseFloat(this);
}

String.prototype.newGuid = function () {
    /// <summary> 创建一个新Guid </summary>
    ///	<returns type="String" />
    return "00000000-0000-0000-0000-000000000000".replace(/0+/g, function (o) { return Math.random().toString(16).substr(2, o.length).toUpperCase() });
}
/*
firefox兼容(原生态方法属性)
1.获取触发当前事件的元素{ie:event.toElement, firefox:event.relatedTarget}
2.元素包含关系(ie:contains(), firefox:compareDocumentPosition())
*/

/*
Bits 	Number 	Meaning
000000 	 0 	    元素一致
000001 	 1 	    节点在不同的文档（或者一个在文档之外）
000010 	 2 	    节点 B 在节点 A 之前
000100 	 4 	    节点 A 在节点 B 之前
001000 	 8 	    节点 B 包含节点 A
010000 	 16 	节点 A 包含节点 B
100000 	 32 	浏览器的私有使用
*/

//obj.contains ? obj.contains(event.toElement) : obj.compareDocumentPosition(event.relatedTarget)
/*window.onload = function () {
var A = document.getElementById('parent'),
B = document.getElementById('child');
alert(A.compareDocumentPosition(B)); //B与A不相连，B在A的后面，A包含B 4+16 = 20
alert(B.compareDocumentPosition(A)); //A与B不相连，A在B的前面，A包含B 2+8 = 10
}*/

if (typeof (HTMLElement) != "undefined") {
    HTMLElement.prototype.contains = function (o) {
        /// <summary> 检查对象中是否包含给定元素。 </summary>
        ///	<returns type="Boolean" />
        return this.compareDocumentPosition(o) == 20 ? true : false;
    }
}
/*
firefox兼容End
*/

Date.prototype.format = function (formatStr) {
    /// <summary> 日期格式化 </summary>
    ///	<param name="formatStr" type="String">
    ///     格式模版:
    ///		年份(YYYY/yyyy/YY/yy)
    ///     月份(MM/M)
    ///     星期(W/w)
    ///     日期(dd/DD/d/D)
    ///     时间(hh/HH/h/H)
    ///     分钟(mm/m)
    ///     秒(ss/SS/s/S)
    ///	</param>
    ///	<returns type="String" />
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, this.getMonth() + 1);
    str = str.replace(/w|W/g, Week[this.getDay()]);
    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());
    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());
    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str;
}

Number.prototype.prettyDate = function (_time) {
    /// <summary> 发布时间new Date().getTime() </summary>
    ///	<param name="_time" type="Date"> 国际标准时间(1321453870000) </param>
    ///	<returns type="String" />
    var _date = new Date(this),
            diff = (((new Date()).getTime() - _date.getTime()) / 1000),
            day_diff = Math.floor(diff / 86400);
    if (!_date) { return "很久远" };
    if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31)
        return;

    return day_diff === 0 && (
                diff < 60 && "刚刚发表" ||
                diff < 120 && "1分钟前" ||
                diff < 3600 && Math.floor(diff / 60) + " 分钟前" ||
                diff < 7200 && "1 小时前" ||
                diff < 86400 && Math.floor(diff / 3600) + " 小时前") ||
                day_diff === 1 && "昨天" ||
                day_diff < 7 && day_diff + " 天前" ||
                day_diff < 31 && Math.ceil(day_diff / 7) + " 周前";
}

; (function ($) {
    if (!$) return;
    $.fn.extend({
        GetSelectorVal: function () {
            return this.find("input[type='hidden']").val();
        },
        Selector: function (o) {
            var selector = {
                id: "selector",
                data: [{ id: "1", name: "龙地" }, { id: "2", name: "飞天" }, { id: "3", name: "蹲地" }, { id: "4", name: "出入" }, { id: "5", name: "平安"}],
                input: "",
                value: "",
                inputMaxWidth: 100,
                required: true,
                dropListUrl: "FindUsers.json",
                dataFormat: "string",
                timeOut: 200,
                maxToken: 0,
                initData: {},
                callBack: function (data) { },
                compart: "/",
                maxDrop: 12,
                tips: "",
                ifSelect: false,
                ifRepeat: false,
                templet: {
                    dropWrapDefault: '<li class="default"><span>{$tips}</span></li>',
                    dropWrapList: '<li class="{$class}" friendid="{$id}">{$name}</li>',
                    addToken: '<li friendname="{$name}" friendid="{$id}"><a href="javascript:;"><span>{$name}<em class="x addx" ></em></span></a></li>'
                },
                init: function () {
                    //this.find(".tokenList").bind("click", selector.showInput);
                    selector.input = $(selector.id + ".tokenList input[type='text']");
                    selector.value = $(selector.id + ".tokenList input[type='hidden']");
                    $(selector.id + ".tokenList").unbind("click").bind("click", selector.showInput);
                    //$(".tokenList a").bind("click", this.selectToken);

                    selector.input.unbind().bind("blur", (!selector.required ? function () { setTimeout(selector.addToken, 200) } : function () { setTimeout(selector.dropListClose, 200); }))
                    /*.bind($.browser.msie?"propertychange":"input", selector.inputMonitor)*/
					.bind("keyup", selector.inputMonitor)
                    .bind("keydown", selector.inputBackspace);
                    if (selector && selector.initData) { selector.loadData(selector.initData) }
                    if (selector.ifSelect) {
                        selector.showInput();
                    }
                },
                loadData: function (d) {
                    if (d) { selector.clearToken(); }
                    for (var n = 0; n < d.length; n++) {
                        if (d[n]["name"] && (n < selector.maxToken || selector.maxToken == 0)) selector.addToken(d[n]["name"], d[n]["id"]);
                    }
                    $(selector.id + ".dropWrap>.popLayer").hide();
                },
                showInput: function (e) {
                    //console.debug(this);
                    //console.debug(selector.id);

                    //console.debug($(selector.id + ".dropWrap>.popLayer"));
                    if (!selector.ifSelect) {
                        var _tokenLength = $(selector.id + ".tokenList>li").length;
                        if (_tokenLength <= selector.maxToken || selector.maxToken == 0) {
                            selector.input.width(25).show().focus();
                            $(selector.id + ".dropWrap>.popLayer .dropList").html(selector.templet.dropWrapDefault.replace("{$tips}", selector.tips));
                            $(selector.id + ".dropWrap>.popLayer").show();
                        } else {
                            selector.input.hide();
                        }
                    } else {
                        selector.input.parent('li').css('width', '90%');
                        selector.input.css('width', '100%').show();
                    }
                },
                selectToken: function () {
                    return false;
                },
                delToken: function () {
                    $(this).parents(".tokenList>li").remove();
                    selector.setTokenVal();
                    return false;
                },
                addToken: function (val, id) {
                    var _word = typeof (val) == "string" ? val : selector.input.val();
                    id = id || _word;
                    if (_word) {
                        if (selector.ifSelect) {
                            selector.input.val(_word.split(selector.compart)[0]);
                            selector.dropListClose();
                            selector.setTokenVal();
                            //selector.input.focus();
                        } else {
                            //console.time("addToken"); //console.profile("addToken");
                            _word = _word.split(selector.compart)[0];
                            var _templet = $(selector.templet.addToken.replace(/{\$name}/g, _word).replace(/{\$id}/g, id)); //'<li friendname="' + this.value.trim() + '" friendid="{1}"><a href="javascript:;"><span>' + this.value.trim() + '<em class="x addx" onclick="selector.delToken.call(this);" ></em></span></a></li>';
                            _templet.find("em.x").bind("click", selector.delToken);
                            //console.debug(_templet);
                            var _tokenList = $(selector.id + ".tokenList>li");
                            if (_tokenList.length == 1) { _tokenList.before(_templet); } else { _tokenList.eq(_tokenList.length - 2).after(_templet); }
                            selector.dropListClose();
                            selector.setTokenVal();
                            $(this.id + ".tokenList").trigger("click");
                            //console.timeEnd("addToken"); //console.profileEnd("addToken");
                        }
                    }
                },
                inputBackspace: function (e) {
                    switch (e.which) {
                        case 8: if (this.value == "") { $(this).parent().prev().remove(); selector.dropListClose(); selector.setTokenVal(); } break;
                    }
                },
                inputMonitor: function (e) {
                    if (!selector.ifSelect) {
                        var _inputWidth = parseInt(this.value.length + "0", 10) * 2;
                        this.style.width = _inputWidth > selector.inputMaxWidth ? selector.inputMaxWidth : (_inputWidth < 25 ? 25 : _inputWidth) + "px";
                    }
                    switch (e.which) {
                        case 40:
                            if (window.event) { e.returnValue = false; } else { e.preventDefault(); }
                            selector.upAndDown('down');
                            return false;
                            break;
                        case 38:
                            if (window.event) { e.returnValue = false; } else { e.preventDefault(); }
                            selector.upAndDown('up');
                            return false;
                            break;
                        case 13:
                            if (window.event) { e.returnValue = false; } else { e.preventDefault(); }
                            window.event ? event.cancelBubble = true : e.stopPropagation();
                            selector.dropListSelecte.call($(selector.id + ".dropWrap>.popLayer li.on").get(0));
                            return false;
                            break;
                    }

                    //selector.dropListInit(selector.data);        
                    if (this.value && this.value.trim() != "") {
                        if (selector._timeOut) clearTimeout(selector._timeOut);
                        selector._timeOut = setTimeout(selector.getDropList, selector.timeOut);
                    } else {
                        selector.dropListClose();
                    }
                    //console.debug("自定义调试信息：%s", this.value);
                    //console.log(e.which);
                    //console.dir(this);
                    //console.dirxml(this);
                    //console.error(this);
                },
                setTokenVal: function () {
                    var _tokenList = $(selector.id + ".tokenList>li");
                    var allVal = "", allName = "", allValJson = [];
                    _tokenList.each(function () {
                        var _o = $(this);
                        allVal += _o.attr("friendid") ? (_o.attr("friendid") + "||") : "";
                        allName += _o.attr("friendname") ? (_o.attr("friendname") + "||") : "";
                        _o.attr("friendid") && allValJson.push('{ id:\'' + _o.attr("friendid") + '\', name:\'' + _o.attr("friendname") + '\' }');
                    });
                    allVal = allVal.substring(0, allVal.length - 2);
                    allName = allName.substring(0, allName.length - 2);
                    selector.value.val(selector.dataFormat == "json" ? selector.arrayToJson(allVal.split("||"), "id") : allVal);
                    selector.value.attr("friendname", allName);
                    selector.value.attr("data-val", allValJson.toString());
                },
                clearToken: function () {
                    //selector.setTokenVal();
                    var _tokenList = $(selector.id + ".tokenList>li");
                    _tokenList.each(function () {
                        $(this).attr("friendid") && $(this).remove();
                    });

                },
                getDropList: function () {
                    $(selector.id + ">.tokenList").addClass("t-loading");
                    $.getJSON(selector.dropListUrl, { name: encodeURIComponent(selector.input.val()) }, selector.dropListInit);
                },
                dropListInit: function (data) {
                    var _templet = selector.templet.dropWrapList;
                    var _searchList = "";
                    for (var n = 0; n < data.length; n++) {
                        //console.debug(n);
                        if (selector.ifRepeat && selector.value.val().indexOf(data[n]["id"]) != -1) continue;
                        if (n == selector.maxDrop) break;
                        _searchList += n != 0 ? _templet.replace(/{\$name}/g, data[n]["name"]).replace(/{\$id}/g, data[n]["id"]) : _templet.replace(/{\$name}/g, data[n]["name"]).replace(/{\$id}/g, data[n]["id"]).replace(/{\$class}/g, "on");
                    }
                    selector.selectData = data;
                    $(selector.id + ".dropList").html(_searchList);
                    $(selector.id + ".dropList>li").mouseover(selector.dropListFocus).click(selector.dropListSelecte);
                    $(selector.id + ".dropWrap>.popLayer").show();
                    $(selector.id + ">.tokenList").removeClass("t-loading");
                },
                dropListFocus: function () {
                    $(selector.id + ".dropList .on").removeClass("on");
                    $(this).addClass("on");
                },
                dropListSelecte: function () {
                    selector.selectData = selector.selectData && selector.selectData[$(this).index()];
                    selector.addToken($(this).text(), $(this).attr("friendid"));
                    selector.dropListClose();
                    if ($.isFunction(selector.callBack)) {
                        selector.callBack(selector.selectData);
                    }
                    return false;
                },
                dropListClose: function () {
                    $(selector.id + ".dropWrap>.popLayer").hide();
                    $(selector.id + ".dropWrap>.popLayer .dropList").html(selector.templet.dropWrapDefault);
                    if (!selector.ifSelect) {
                        selector.input.val("");
                    }
                },
                arrayToJson: function (obj, name) {
                    var a = new Array();
                    for (i in obj) {
                        if (obj[i]) { a[i] = "{" + name + ":'" + obj[i].replace(/\"/g, "\\\"") + "'}"; }
                    }
                    return a.length > 0 ? "[" + a.join(",") + "]" : "";
                },
                upAndDown: function (type) {
                    var lis = $(selector.id + ".dropWrap>.popLayer").get(0).getElementsByTagName("li");
                    var liLength = lis.length;
                    //var height = lis[0].offsetHeight;
                    //var scrollDiv = $(topic).find("div.autoCmt");
                    for (var i = 0; i < liLength; i++) {

                        if (lis[i].className.indexOf("on") >= 0) {
                            if ("up" == type) {
                                lis[i].className = '{$class}';
                                if (i - 1 < 0) {
                                    lis[liLength - 1].className = '{$class} on';
                                    //scrollDiv.scrollTop(liLength*height);
                                } else {
                                    lis[i - 1].className = '{$class} on';
                                }
                            } else if ("down" == type) {

                                lis[i].className = '{$class}';
                                if (i == (liLength - 1)) {
                                    lis[0].className = '{$class} on';
                                    //scrollDiv.scrollTop(0);
                                } else {
                                    lis[i + 1].className = '{$class} on';
                                }
                            }
                            /*if((i+1)>3){
                            scrollDiv.scrollTop((i-2)*height);
                            }else{
                            scrollDiv.scrollTop(0);
                            }*/
                            break;
                        }
                    }
                }
            }

            o && $.extend(selector, o);

            selector.id = "#" + this.attr("id") + " ";

            selector.init();

            //return this.attr("id") + " "+ selector.id;
        }
    });

})(jQuery);

var jsCore = {
    date: "2010-05-18",
    versions: 1.0,
    tools: {
        ajaxLock: function (url, pars, callback, obj, opts) {
            /// <summary> ajax提交锁定按钮(防止重复点击) </summary>
            /// <param name="url" type="String">服务端地址</param>
            /// <param name="pars" type="Object">参数</param>
            /// <param name="callback" type="Function">回调函数(data,object)</param>
            /// <param name="obj" type="Object">被点击按钮</param>
            /// <param name="opts" type="Object">{dataType:"json", type:"POST"}</param>
            ///	<returns type="Object" />
            if ($.isFunction(pars)) {
                opts = opts || obj;
                obj = obj || callback;
                callback = pars;
                pars = {}
            }
            $(obj).attr("disabled", true);
            $.ajax({
                data: pars,
                url: url,
                cache: false,
                dataType: (opts && opts.dataType) ? opts.dataType : "json",
                type: (opts && opts.type) ? opts.type : "POST",
                success: function (data) {
                    $(obj).attr("disabled", false);
                    callback(data, obj);
                },
                error: function (xml, status, t) {
                    $(obj).attr("disabled", false);
                    if (status == 'error') {
                        try {
                            jsCore.ui.msgBox("发生错误:" + xml.responseText);
                        } catch (e) { jsCore.ui.msgBox("发生错误：" + e); }
                    } else {
                        (console && console.debug) && console.debug(xml);
                        jsCore.ui.msgBox(xml ? xml.responseText : status);
                    }
                }
            });
            return this;
        },
        cookie: function (name, value, options) {
            /// <summary> 设置获取删除三位一体(以后肢解)
            ///	@example cookie('the_cookie', 'the_value').
            /// @desc Set the value of a cookie.

            /// @example cookie('the_cookie', 'the_value', {expires: 7, path: '/', domain: 'jquery.com', secure: true}).
            /// @desc Create a cookie with all available options.

            /// @example cookie('the_cookie', 'the_value');
            /// @desc Create a session cookie.

            /// @example cookie('the_cookie', null);
            /// @desc Delete a cookie by passing null as value.

            /// @example cookie('the_cookie');
            /// @desc Get the value of a cookie.
            /// </summary>
            /// <param name="name" type="String">key</param>
            /// <param name="value" type="String">value</param>
            /// <param name="options" type="Object"> {expires: 7, path: '/', domain: 'jquery.com', secure: true}</param>
            /// <returns type="String">Get有返回值[没有返回null]</returns>
            if (typeof value != 'undefined') { // name and value given, set cookie
                options = options || {};
                if (value === null) {
                    value = '';
                    options.expires = -1;
                }
                var expires = '';
                if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                    var date;
                    if (typeof options.expires == 'number') {
                        date = new Date();
                        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                    } else {
                        date = options.expires;
                    }
                    expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
                }
                var path = options.path ? '; path=' + options.path : '';
                var domain = options.domain ? '; domain=' + options.domain : '';
                var secure = options.secure ? '; secure' : '';
                document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
            } else { // only name given, get cookie
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = cookies[i].replace(/(^\s*)|(\s*$)/g, "");
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
        },
        sbc2dbc: function (str) {    /// <summary> 半角转全角 </summary>
            var ret = [], i = 0, len = str.length, code, chr, hash = { '32': '\u3000' };
            for (; i < len; ++i) {
                code = str.charCodeAt(i);
                chr = hash[code];
                if (!chr && code > 31 && code < 127) {
                    chr = hash[code] = String.fromCharCode(code + 65248);
                }
                ret[i] = chr ? chr : str.charAt(i);
            }
            return ret.join('');
        },
        dbc2sbc: function (str) {/// <summary> 全角转半角 </summary>
            var ret = [], i = 0, len = str.length, code, chr, hash = { '12288': ' ' };
            for (; i < len; ++i) {
                code = str.charCodeAt(i);
                chr = hash[code];
                if (!chr && code > 65280 && code < 65375) {
                    chr = hash[code] = String.fromCharCode(code - 65248);
                }
                ret[i] = chr ? chr : str.charAt(i);
            }
            return ret.join('');
        },
        sbc2dbc_w: function (str) {/// <summary> 半角转全角(转换 [0-9a-zA-Z]) </summary>
            var ret = [], i = 0, len = str.length, code, chr, hash = {};
            for (; i < len; ++i) {
                code = str.charCodeAt(i);
                chr = hash[code];
                if (!chr &&
			(47 < code && code < 58 ||
				64 < code && code < 91 ||
				96 < code && code < 123)) {
                    chr = hash[code] = String.fromCharCode(code + 65248);
                }
                ret[i] = chr ? chr : str.charAt(i);
            }
            return ret.join('');
        },
        preventEvent: function (e) {    /// <summary> 防止默认事件执行 </summary>
            if (window.event) { event.returnValue = false; } else { e.preventDefault(); }
        },
        cancelBubble: function (e) {    /// <summary> 取消事件冒泡 </summary>
            window.event ? event.cancelBubble = true : e.stopPropagation();
        },
        windowClose: function () {    /// <summary> 关闭当前页面 </summary>
            window.opener = null; window.open('', '_self'); window.close();
        },
        refreshList: function (f, isClose) {  //刷新列表页(来源页面)
            opener && (opener.jsCore && opener.jsCore.tools.submitList(f));
            isClose && jsCore.tools.windowClose();
        },
        submitList: function (f, p, fn) { //提交当前页
            if ($.isFunction(f)) {
                fn = f;
                f = "";
            }
            if ($.isFunction(p)) {
                fn = p;
                p = "";
            }
            $("#sys_IsResetPage").val(p || 0);
            $.isFunction(fn) && fn();
            $("#" + (f ? f : "search-form")).submit();
            return false;
        },
        newGuid: function () {
            return "00000000-0000-0000-0000-000000000000".replace(/0+/g, function (o) { return Math.random().toString(16).substr(2, o.length).toUpperCase() });
        },
        random: function (under, over) {
            /// <summary> 随机数 </summary>
            switch (arguments.length) {
                case 1: return parseInt(Math.random() * under + 1);
                case 2: return parseInt(Math.random() * (over - under + 1) + under);
                default: return Math.random() * Math.random();
            }
        },
        serialize: function (obj) {
            var returnVal;
            if (obj != undefined) {
                switch (obj.constructor) {
                    case Array:
                        var vArr = "[";
                        for (var i = 0; i < obj.length; i++) {
                            if (i > 0) vArr += ",";
                            vArr += this.serialize(obj[i]);
                        }
                        returnVal = vArr + "]";
                        break;
                    case String:
                        returnVal = "\"" + obj + "\""; //escape("'" + obj + "'");
                        break;
                    case Number:
                        returnVal = isFinite(obj) ? obj.toString() : null;
                        break;
                    case Date: returnVal = "#" + obj + "#";
                        break;
                    default:
                        if (typeof obj == "object") {
                            var vobj = []; for (attr in obj) {
                                if (typeof obj[attr] != "function") {
                                    vobj.push('"' + attr + '":' + this.serialize(obj[attr]));
                                }
                            }
                            if (vobj.length > 0) {
                                returnVal = "{" + vobj.join(",") + "}";
                            }
                            else { returnVal = "{}"; }
                        }
                        else {
                            returnVal = obj.toString();
                        }
                        break;
                }
                return returnVal;
            }
            return null;
        },
        arrayToJson: function (obj) {
            var opts = {};
            for (var n = 0; n < obj.length; n++) {
                opts[obj[n]["name"]] = obj[n]["value"];
            }
            return opts;
        },
        htmlEncode: function (val) {
            return $('<div/>').text(val).html();
        },
        htmlDecode: function (val) {
            return $('<div/>').html(val).text();
        }
    },
    ui: {
        msgBox: function (msg, fnClose) {
            /// <summary> 信息提示框 </summary>
            ///	<param name="msg" type="String"> 信息内容 </param>
            ///	<param name="fnClose" type="Funtion"> 关闭回调方法 </param>
            ///	<returns />
            $("#msgError-jscore").dialog("close").remove();
            msg && $('<div id="msgError-jscore" style="padding:10px">' + msg + '</div>').dialog({ title: "友情提示", resizable: false, modal: true, close: function () { if (fnClose) fnClose(); }, buttons: { "关闭": function () { $(this).dialog("close"); } } });
        },
        confirm: function (msg, fn) {
            $("#msgConfirm-jscore").dialog("close").remove();
            fn && $('<div id="msgConfirm-jscore" style="padding:10px">' + (msg || "是否确定?") + '</div>').dialog({ title: "是否确定", resizable: false, modal: true, buttons: { "确定": function () { $(this).dialog("close"); fn(); }, "取消": function () { $(this).dialog("close"); } } });
        },
        dialog: function (obj, buttons, opts) {
            obj && function () {
                $("#msgDialog-jscore").dialog("close").remove();
                obj = typeof (obj) == "string" ? $('<div id="msgDialog-jscore" style="padding:10px">' + obj + '</div>') : $(obj);
                var defaultOpts = {
                    title: "信息操作框",
                    zIndex: 1000,
                    width: "50%",
                    height: "auto",
                    close: function () { },
                    resizable: true
                }
                //opts = opts || {};
                $.extend(defaultOpts, opts);
                return obj.dialog({ zIndex: defaultOpts.zIndex, width: defaultOpts.width, height: defaultOpts.height, resizable: defaultOpts.resizable, title: defaultOpts.title, modal: true, close: function () { if (opts && opts.close && $.isFunction(opts.close)) opts.close(); }, buttons: buttons || {} });
            } ();
            this.dialog.close = function () { $("#msgDialog-jscore").dialog("close").remove(); }
        },
        window: function (title, src, width, height) {
            /// <summary> iframe 弹窗 </summary>
            ///	<param name="title" type="String"> 标题 </param>
            ///	<param name="src" type="String"> iframeURL </param>
            ///	<param name="width" type="Number"> 宽度 </param>
            ///	<param name="height" type="Number"> 高度 </param>
            $("#msgDialog-jscore").dialog("close").children().remove();
            src && this.dialog("<iframe width='100%' height='98%' frameborder='no' border='0' marginwidth='0' marginheight='0' style='overflow-y: auto; overflow-x:hidden;' src='" + src + "'></iframe>", null, { title: title || "信息操作框", width: width, height: height });

            this.window.close = function () { $("#msgDialog-jscore").dialog("close").children().remove(); }
        },
        msgbox: function (msg, type, time) {
            /// <summary> 弱信息提示层 </summary>
            ///	<param name="msg" type="String"> 要提示的文本信息 </param>
            ///	<param name="type" type="String"> [可选]枚举类型(“error”,“succeed”)，默认“succeed” </param>
            ///	<param name="time" type="Number"> [可选]提示层停留时间(默认"1200/毫秒") </param>
            ///	<returns />
            clearTimeout(this.timeOut); $("#msgBox-jscore").remove();
            var typeClass = (type == "error") ? "pob-msg-box-error" : "";
            time = time || 1200;
            var msgObj = $('<div id="msgBox-jscore" class="pob-msg-box ' + typeClass + '"><div class="msg-right-box">' + msg + '</div></div>');
            msgObj.appendTo('body');
            var left = ($(window).width() - msgObj.width()) / 2 + $(document).scrollLeft();
            var top = ($(window).height() - msgObj.height()) / 2 + $(document).scrollTop();
            msgObj.css({ top: top + 'px', left: left + 'px' });
            this.timeOut = setTimeout(function () { msgObj.animate({ opacity: 100 }, 1500).remove(); }, time);
        },
        loading: function (bSwitch, opt) {
            /// <summary> 全屏居中Loading效果 </summary>
            ///	<param name="bSwitch" type="String"> [可选]枚举类型(“show”,“hide”)，默认“show” </param>
            ///	<returns />
            $("#jsCore-loadding").remove();
            if (!bSwitch) {
                var msgObj = $('<s id="jsCore-loadding"></s>').appendTo('body');
                var left = ($(window).width() - msgObj.width()) / 2 + $(document).scrollLeft();
                var top = ($(window).height() - msgObj.height()) / 2 + $(document).scrollTop();
                msgObj.css({ top: top + 'px', left: left + 'px' });
            }
            //console.log(bSwitch);
        },
        ajaxLoading: function (time) {
            /// <summary> 开启ajaxLoading效果(ajax请求时,默认等待1秒后>出现loading>请求成功后>loading自动隐藏) </summary>
            ///	<param name="time" type="Number"> [可选]loading显示延迟时间(默认:1000/毫秒) </param>
            ///	<returns />
            $(function () {
                jsCore.ui.loading.time = time || 1000;
                $("<s>").ajaxStart(function () {
                    jsCore.ui.loading.timeOut = setTimeout("jsCore.ui.loading()", jsCore.ui.loading.time);
                });
                $("<s>").ajaxComplete(function (evt, request, settings) {
                    clearTimeout(jsCore.ui.loading.timeOut);
                    jsCore.ui.loading("hide");
                });
            });
        }
    }
};