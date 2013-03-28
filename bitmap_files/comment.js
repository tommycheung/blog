// JavaScript Document
var page = {
	ifIe6:function(){
		var browser=navigator.appName 
		var b_version=navigator.appVersion 
		var version=b_version.split(";"); 
		var trim_Version=version[1].replace(/[ ]/g,""); 
		if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0") 
		{ 
			return true;
		} 
		return false;
	},
	selectTag:function(selectId,toId,hiddenId){
		//初始值 
		if($.trim($("#"+hiddenId).val())!=''){
			var tagArr = $.trim($("#"+hiddenId).val()).split(' ');	
			if(tagArr&&tagArr.length>0){
				for(var i= 0,l=tagArr.length;i<l;i++){
					var htmlObj = $('<span>'+tagArr[i]+'<em class="tb-close">x</em></span>');
					if($("#"+toId).find("i").length>0){
						$("#"+toId).find("i").hide();
					}
					$("#"+toId).append(htmlObj);
					if(page.ifIe6){
						htmlObj.hover(function(){
							this.className = 'hover';					   
						},function(){
							this.className = '';	
						});	
					}
					htmlObj.find("em").click(function(){
						page.deleteTag($(this).parent(),hiddenId);
					});
				}	
			}
		}
		if($("#"+selectId).length>0){
			$("#"+selectId).find("span").click(function(){
				var text =  $.trim($(this).html());	
				if(page.addHidden(text,hiddenId)){
					var htmlObj = $('<span>'+text+'<em class="tb-close">x</em></span>');
					if($("#"+toId).find("i").length>0){
						$("#"+toId).find("i").hide();
					}
					$("#"+toId).append(htmlObj);
					if(page.ifIe6){
						htmlObj.hover(function(){
							this.className = 'hover';					   
						},function(){
							this.className = '';	
						});	
					}
					htmlObj.find("em").click(function(){
						page.deleteTag(htmlObj,hiddenId);
					});
				}else{
					page.msg("该标签已选择","error");	
				}
			
			});	
		}
	},
	addTag:function(inputId,toId,hiddenId){
		var inputObj = $('#'+inputId);
		var inputVal = inputObj.val();
		if(inputObj.attr("max-tag")&&inputObj.attr("max-tag")>0){
			var tagStatus = page.cheachTag(inputObj,$("#"+hiddenId));
			if(tagStatus==false){
				page.msg('最多只能添加3个标签！','error');	
				return false;
			}
		}else{
			var tagStatus = page.cheachTag(inputObj);
		}
		if($.trim(inputVal) == ''){
			page.msg('请输入标签！','error');	
			inputObj.focus();
			return false;
		}
		if(tagStatus==-1){
			page.msg('每个标签不能超过10个字符！','error');	
			return false;
		}
		
		var tagArr = inputVal.split(' ');
		var htmlObj = null;
		for(var i=0,l=tagArr.length;i<l;i++){
			if($.trim(tagArr[i])!=''&&page.addHidden(tagArr[i],hiddenId)){
				tagArr[i] = tagArr[i].toString().replace(/</g,"&lt;").replace(/>/g,"&gt;");
				htmlObj = $('<span>'+$.trim(tagArr[i])+'<em class="tb-close">x</em></span>');
				if($("#"+toId).find("i").length>0){
					$("#"+toId).find("i").hide();
				}
				$("#"+toId).append(htmlObj);
				if(page.ifIe6){
					htmlObj.hover(function(){
						this.className = 'hover';					   
					},function(){
						this.className = '';	
					});	
				}
				htmlObj.find("em").click(function(){
					page.deleteTag($(this).parent(),hiddenId);
				});
				htmlObj = null;
			}
		}
		inputObj.val('');
	},
	addHidden:function(text,hiddenId){
		var getAll = $("#"+hiddenId).val();
		var getAllArr = getAll.split(' ');
		if(getAllArr&&page.inArray(getAllArr,$.trim(text))){
			page.msg($.trim(text)+"已存在","error");
			return false;	
		}else{
			text=text.replace(/\&amp;/g,"&");
			$("#"+hiddenId).val($.trim(getAll)+" "+$.trim(text));
			return true;
		}
	},
	inArray:function (array, e) {
		e = e.replace(/\&amp;/g,"&");
        for (i = 0; i < array.length; i++) {
			array[i] = array[i].replace(/\&amp;/g,"&");
            if ($.trim(array[i]) == $.trim(e))
                return true;
        }
        return false;
    },
	deleteTag:function(obj,hiddenId){
		var value = $("#"+hiddenId).val();
		var text = $.trim(obj.text().replace("x",""));
		var parentObj = obj.parent();
		var getAllArr = $.trim(value).split(' ');
		text = text.replace(/&amp;/,"&");
		if(getAllArr.length>0){//alert(text);
			for(var i=0,l=getAllArr.length;i<l;i++){
				getAllArr[i] = getAllArr[i].replace(/\&amp;/g,"&");
				if($.trim(getAllArr[i])!=''){
					if($.trim(getAllArr[i])==$.trim(text)){
						obj.remove();
						delete 	getAllArr[i];
					}
				}else{
					delete 	getAllArr[i];	
				}	
			}
		}
		/*value = value.replace(/\s?(\S+)\s?/g,function($1,$2){
			if($.trim(arguments[1])==text){
				obj.remove();
				return "";	
			}else{
				return arguments[0];
			}
		});*/
		value = getAllArr.join(" ");
		if($.trim(value)==''){
			parentObj.find("i").show();
		}
		$("#"+hiddenId).val($.trim(value));
		
	},
	msg:function(msg,type,callBack, oTtime){
		if("您是游客无法进行此操作，请先去我的ATA补充资料"==$.trim(msg)){
			window.page.pobBox({id:"topic-activation",okCallBack:function(obj){
				window.open('/profile/0?return_url='+type);													   
			}});
			return false;
		}
        var typeClass = '';
        var callBack = typeof arguments[2] == "function" ? arguments[2] : false;
		msg = msg.toString().replace(/</g,"&lt;").replace(/>/g,"&gt;");
        if (arguments[3] == undefined) {
            oTtime = 1200;
        }
        if (arguments[1] != undefined) {
            if (type == "error") {
                typeClass = 'pob-msg-box-error';
            }
        }
		if($("div.pob-msg-box").length>0){
			return false;
		}
        var msgObj = $('<div class="pob-msg-box ' + typeClass + '"><div class="msg-right-box">' + msg + '</div></div>');
        msgObj.appendTo('body');
        var page = {clientWidth: $(window).width(), clientHeight: $(window).height()};
        var getScroll = [$(window).scrollLeft(), $(window).scrollTop()];
        var left = (page.clientWidth - msgObj.width()) / 2 + parseInt(getScroll[0]);
        var top = (page.clientHeight - msgObj.height()) / 2 + parseInt(getScroll[1]);
        msgObj.css({top: top + 'px', left: left + 'px'});
        setTimeout(function () {msgObj.animate({opacity: 100}, 1500).remove();if (callBack) callBack();}, oTtime);
	},
	cheachTag:function(obj){
		var tagText = $.trim(obj.val());
		var obj2 = arguments[1];
		if(obj2&&$.trim(obj2.val())!=''){
			tagText = tagText +" "+	$.trim(obj2.val());
		}
		if(tagText!=''){
			
			var tagArr = tagText.split(' ');
			
			var ifFalse = true;
			var j = 0;
			for(var i=0,l=tagArr.length;i<l;i++){
			   if($.trim(tagArr[i])!=''){
				   j++;
			   }
			   if(page.getLength($.trim(tagArr[i]))>10){
				  ifFalse = -1;
				  break;
			   }
			};
			if(j>3){
			   return false;
			}
			return ifFalse;
		 }	
		 return true;
	},
	getLength:function(str) {
		var len = $.trim(str).length;
		if (len > 0) {
			var min = 41,
			max = 140,
			tmp = str;
			var urls = [];
			var urlCount = 0;
			for (var i = 0,len = urls.length; i < len; i++) {
				var count = page.byteLength(urls[i]);
				if (count > min) {
					urlCount += count <= max ? 21 : (21 + (count - max) / 2);

				}
				tmp = tmp.replace(urls[i], "");
			}
			return Math.ceil(urlCount + page.byteLength(tmp) / 2)
		} else {
			return 0
		}
	},
	byteLength:function(str) {
		if (typeof str == "undefined") {
			return 0
		}
		var aMatch = str.match(/[^\x00-\x80]/g);
		return (str.length + (!aMatch ? 0 : aMatch.length))
	},
	showAddMore:function(){
		var parent = $(this).closest("div.text-right");
		parent.children("div").show();
		$(this).parent().hide();
	},
	addOne:function(){
		var parent = $(this).closest("div.text-right");
		var newObj = parent.children("div.add-more-box").eq(0).clone(true);
		newObj.find("input,textarea").val('');
		newObj.find("select").val('0');
		parent.children("div.add-more-box").last().after(newObj);		
	},
	deleteOne:function(){
		var parent = $(this).closest("div.text-right");
		if(parent.children("div.add-more-box").length>1){
			$(this).closest("div.add-more-box").remove();
		}else{
			$(this).closest("div.add-more-box").hide();	
			$(this).closest("div.add-more-box").find("input,textarea").val('');
			$(this).closest("div.add-more-box").find("select").val('');
			parent.find("a.add-one").parent().hide();
			parent.find("a.add-my").parent().show();
		}
	},
	commentInputTopic:function () {
		var message = '请输入关键字！';
		var offect = $(this).offset();
		var heights = $(this).height();
		var intpObj = this;
		var id;
		var ifhuati = false;
		var reg = /^#.+?#$/;
		var parentObj = $(this).parent();
		if ("" != $.trim($(this).attr("topic"))) {
			message = $.trim($(this).attr("topic"));
		}
		if(this.id==''){
			id = Math.random();
			id = id.toString().substr(id.toString().indexOf(".")+1);
			this.id = id;
			id = id+'_span';
		}else{
			id = this.id+"_span";
		}
	
		if($("#"+id).length<1){
			var topicObj = $("<i id='"+id+"' style='position: absolute;color: #737373;' class='search-topic'>" + message + "</i>");
			topicObj.appendTo('body');
		}else{
			topicObj = 	$("#"+id);
		}
	
		topicObj.css({left: parseInt(offect.left + 10), top: offect.top+7});
	
		if ('' != $.trim(this.value)) {
			topicObj.hide();
		}else{
			topicObj.show();
		}
		if(ifhuati&&reg.test(this.value)){
			topicObj.show();
		}
		topicObj.click(function () {
			$(intpObj).focus();
			$(this).hide();
		});
		$(this).focus(function () {
			topicObj.hide();
		});
		$(this).blur(function () {
			if ('' == $.trim(this.value)) {
				topicObj.show();
			}
			if(ifhuati){
				var obj = this;
				var ids = setTimeout(function(){if(reg.test(obj.value)){topicObj.show();clearTimeout(ids);}},500);
			}
		});
	},
	checkAjax:function(url,data,async){
		var ifOk = true;
		$.ajax({
			type:'GET',
			dataType: 'json',
			url:url+'?time='+Math.random(),
			data:data,
			async:async,
			success:function(data){
				if(data.state=='0'){
					ifOk = false;	
				}	
			}
		});
		return ifOk;
	},
	commentFunction:function(formId,addBoxId,callBack){
		var formObj = $("#"+formId);
		var commentObj = formObj.find("textarea");
		//qiaozhou 2012-9-21 edit
		var mark = $('#content');
		var wmd = $('#wmd-input');
		var buttonObj = formObj.find("button");
		formObj.submit(function(event){
		    if(window.editObj){
				editObj.sync();
			}
			if(window.event){
				window.event.returnValue = false;
			}else{
				event.preventDefault();
			}					
			//qiaozhou 2012-9-21 edit
			var elArr = $('.fm-titile>.ft-org');
			var container = mark;
			if (elArr.length>0&&elArr.get(0).id == 'mark-edit'){
				container = wmd;
			}
			if($.trim(container.val()) == ''){
				container.focus();
				page.msg("内容不能为空！","error");
				buttonObj.attr("disabled",false);
				return false;	
			}
			buttonObj.attr("disabled",true);
			$.ajax({
				url:formObj.attr("action"),
				dataType: 'json',
				type:'POST',
				data:formObj.serialize(),
				error: function () {
					buttonObj.attr("disabled",false);
					page.msg("系统超时，请稍后重试！",'error');
				},
				success: function(data) {
					if($.trim(data)!=''){
						if(data){
							if(data.state){
								if (data.state != "repeat") {
									//page.msg("评论成功！",'ok',function(){
                                                                        page.msg("回复成功，感谢你的参与！",'ok',function(){
										//$("#"+commentObj).prepend();
										//location.href = data.msg;
										commentObj.val('');
										if(typeof editObj!= "undefined"){
											editObj.set('data',"");
										}
										if(typeof callBack == 'function'){
											callBack(data);
										}
									});
								}else{
									callBack(data);
								};
							}else{
								page.msg(data.msg,'error');
							}
						}
					}
	//				buttonObj.attr("disabled",false);	//暂时注释，因为现在提交后直接刷新
				}
			});	
			return false;
		});
	},
	qaUp:function(event){
		if(window.event){
			window.event.returnValue = false;
		}else{
			event.preventDefault();
		}
 		page.qafunction(this);		
	},
	qaDown:function(event){
		if(window.event){
			window.event.returnValue = false;
		}else{
			event.preventDefault();
		}
		page.qafunction(this);		
	},
	qafunction:function(obj){
		
		var url = obj.href;
		var countObj = $(obj).find('.count');
		$.get(url,{time:Math.random()},function(data){
			if($.trim(data)!=''){
				if(data){
					data = eval('('+data+')');
					if(data.state){
						if(!isNaN(countObj.text())&&countObj.text()>=0){
							countObj.text(parseInt(countObj.text())+1);
						}
						page.msg("操作成功！",'ok');
					}else{
						page.msg(data.msg[0],data.msg[1]);
						//page.msg(data.msg,'error');
					}
				}
			}										
		})
	},
	store:function(event){
		if(window.event){
			window.event.returnValue = false;
		}else{
			event.preventDefault();
		}
		page.qafunction(this);	
	},
	storefunction:function(obj){
		var url = obj.href;
		var countObj = $(obj).find('.count');
		$.get(url,{time:Math.random()},function(data){
			if($.trim(data)!=''){
				if(data){
					data = eval('('+data+')');
					if(data.state){
						if(!isNaN(countObj.text())&&countObj.text()>=0){
							countObj.text(parseInt(countObj.text())+1);
						}
						if (data.msg=='"true"') {$(".store").css({dispaly:"none"});
						$(".cancelStore").css({dispaly:""})}
						
						page.msg("操作成功！",'ok');
					}else{
						page.msg(data.msg,'error');
					}
				}
			}										
		})
	},
	showComment:function(){
		
	},
	pobBox:function(){
		var defaults = {
			id:'pobBox',
			width:400,
			height:'auto',
			content:null,
			okCallBack:function(){},
			cancleCallBack:function(){},
			loadFunction:function(){},
			title:null
		};	
		if(arguments[0]&&typeof arguments[0]=="object"){
			defaults = $.extend(defaults, arguments[0]);
		}
		if($("#"+defaults.id).length>0){
			var pobObj = $("#"+defaults.id);
			var ifTmpBox = false;
			
			if(defaults.content!=null){
				if($.trim(pobObj.find("div.min-content").html())!=''){
					pobObj = pobObj.clone();
					pobObj.find("div.min-content").html('');
					pobObj.attr("id","tmpbox_"+Math.random().toString().replace(".",""));
					pobObj.appendTo("body");
					ifTmpBox = true;
				}
				if($("#"+defaults.content).length>0){
					pobObj.find("div.min-content").html($("#"+defaults.content).html());	
				}else{
					if(typeof defaults.content == "string"){
						pobObj.find("div.min-content").html(defaults.content);	
					}
				}
			}
			if(defaults.title!=null){
				pobObj.find("span.title-top").text(defaults.title);
			}
			pobObj.css({width:defaults.width,height:defaults.height}).show();
			var offectHeight = pobObj.height();
			var top = $(window).scrollTop()+($(window).height()/2-offectHeight/2);
			var left = $(window).scrollLeft()+($(window).width()/2-defaults.width/2);
			pobObj.css({top:top,left:left});
			if(typeof defaults.loadFunction == "function"){
				defaults.loadFunction(pobObj);
			}
			pobObj.find("button[okbutton=1]").unbind().click(function(){
				if(typeof defaults.okCallBack == 'function'){
					defaults.okCallBack(pobObj);
				}									  
			});
			pobObj.find("button[close=1],a.pb-close").unbind().click(function(){
				if(typeof defaults.cancleCallBack == 'function'){
					defaults.cancleCallBack(pobObj);
					if(ifTmpBox){
						pobObj.remove();
					}else{
						pobObj.hide();
					}
				}												  
			});
		}
	},
	copyUrl:function(obj){
		if(typeof obj == 'object'){
			var url = obj.attr("rel");
		}else{
			url = $('#'+obj).val();
			obj = $('#'+obj);
		}
		if(navigator.userAgent.toLowerCase().indexOf('ie') > -1) {
			obj.click(function(){
				clipboardData.setData('Text',url);
				page.msg("复制成功！");
			});
		}else{
			/*obj.click(function(){
				prompt("请复制网站地址:",url);
			});*/
			obj.zclip(
				{
					path:'/images/ZeroClipboard.swf',
					copy:function(){
						page.msg("复制成功！");
						return url;
					}
				}
			);
		}
	},
	delConfirm:function(event){
		if(window.event){
			window.event.returnValue = false;
		}else{
			event.preventDefault();
		}
		var objA = this;
		page.pobBox({id:'conFirmBox',okCallBack:function(obj){
			var buttonObj = obj.find("button");
			var url = objA.href;
			buttonObj.attr("disabled",true);
			$.ajax({
				url:url,
				dataType: 'json',
				type:'GET',
				data:{},
				error: function () {
					buttonObj.attr("disabled",false);
					page.msg("系统超时，请稍后重试！",'error');
				},
				success: function(data) {
					if($.trim(data)!=''){
						if(data){
							if(data.state){
								page.msg("删除成功！",'ok',function(){
									$(objA).closest("li").hide();
									obj.hide();
								});
							}else{
								page.msg(data.msg,'error');
							}
						}
					}
					buttonObj.attr("disabled",false);
				}
			});
	 	}});	
	},
	attention:function(event){
		if(window.event){
			window.event.returnValue = false;
		}else{
			event.preventDefault();
		}
		var objA = this;
		var msg = "添加关注成功！";
		var attentionType = true;
		if(this.id.indexOf("cancle")>-1){
			msg = "取消关注成功！";	
			attentionType = false;
		}
		if($(objA).attr("rel")!='1'){
			$(objA).attr("rel",'1');
			$.ajax({
				url:objA.href,
				dataType: 'json',
				type:'GET',
				data:{},
				error: function () {
					$(objA).attr("rel",'0');
					page.msg("系统超时，请稍后重试！",'error');
				},
				success: function(data) {
					if($.trim(data)!=''){
						if(data){
							if(data.state){
								page.msg(msg,'ok',function(){
									if(attentionType){
										$("#addBox").hide();
										$("#cancleBox").show();
									}else{
										$("#addBox").show();
										$("#cancleBox").hide();	
									}
								});
							}else{
								page.msg(data.msg,'error');
							}
						}
					}
					$(objA).attr("rel",'0');
				}
			});
		}
	},
	showMessage:function(){
		var floatObj = $("#showMessage");
		var this0 = this;
		$("#showNew").hover(function(){
			var thisObj = $(this);
			floatObj.show();
			floatObj.css({left:thisObj.offset().left-floatObj.parent().offset().left-floatObj.width()+thisObj.width()});
			floatObj.unbind().hover(function(){
				floatObj.show();					
			},function(){
				floatObj.hide();
			});
		},function(){
			floatObj.hide();			
		})	
	},
	examine:function(event){
		if(window.event){
			window.event.returnValue = false;
		}else{
			event.preventDefault();
		}
		var objA = this;	
		if($(objA).attr("rel")!='1'){
			$(objA).attr("rel",'1');
			$.ajax({
				url:objA.href,
				dataType: 'json',
				type:'GET',
				data:{},
				error: function () {
					$(objA).attr("rel",'0');
					page.msg("系统超时，请稍后重试！",'error');
				},
				success: function(data) {
				//	if($.trim(data)!=''){
					if(data!=''){
						if(data){
							if(data.state){
								page.msg('审核成功！','ok',function(){
									if(objA.href.lastIndexOf("\/y")>-1){
										$(objA).parent().html('<span class="ok-msg">已通过</span>');	
									}else{
										$(objA).parent().html('<span class="error-msg">已拒绝</span>');	
									}
								});
							}else{
								page.msg(data.msg,'error');
							}
						}
					}
					$(objA).attr("rel",'0');
				}
			});
		}
	},
	cancleEnterSubmit:function(event){
		if (window.event) //停止事件冒泡
			window.event.cancelBubble = true;
		else
			event.stopPropagation();
		if(event.keyCode == 13){		
			$(this).prev("a").trigger('click');
		}
	},
	hisback:function(){
		if(document.referrer){
			location.href = document.referrer;
		}else{
			location.href = "/";	
		}
	},
	registrationf:function(){
		var browser=navigator.appName;
		var b_version=navigator.appVersion;
		var version=b_version.split(";");
		var left = $(window).width()/2+500;
		var top  = '50%';
		if(version[1]!=undefined){
			var trim_Version=version[1].replace(/[ ]/g,"");
			if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0")
			{
				var top  = $(window).scrollTop()+$(window).height()/2-45;
			}
		}
		
		$("a#registration").css({top:top, left:left});
	},
	cheackEdit:function(e){
		var curObj = e.target;
		var id = curObj.id;
		if(curObj.tagName.toUpperCase()=="A"){
			if(curObj.className.indexOf("ft-org")>-1){
				return false;	
			}	
			var cheackFun = function(){
				$(curObj).parent().find("a").removeClass("ft-org");
				$(curObj).addClass("ft-org");
				$("#edit-show-box").children("div").hide();
				$("#edit-show-box").find("textarea").attr("name","");
				$("#"+id+"-box").show();
				$("#"+id+"-box").find("textarea").attr("name","content")
				if($.trim(id)=="mark-edit"){
					$("#ismarkdown").val("1");
					//$('#content').xheditor(false);	
				}else{
					$("#ismarkdown").val("0");	
				}
			}
			if(!isNaN(e.clientX)&&confirm("您确认要切换编辑器吗，这样可能会导致现有编辑器中数据丢失！")){
				cheackFun();
			}else{
				cheackFun();
			}
		}
		
	},
	scrollTop:function(clickType){
		var left = 0;
		if($(window).width()<=1000){
			left = 	$(window).width()-30;
		}else{
			left = ($(window).width()-1000)/2+1000;
		}
		if($(window).scrollTop()>0){
			$('.scroll-top').css({left:left+'px'});
			var browser=navigator.appName
			var b_version=navigator.appVersion
			var version=b_version.split(";");
			if(version[1]!=undefined){
				var trim_Version=version[1].replace(/[ ]/g,"");
				if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0")
				{
					$('.scroll-top').css({top:($(window).scrollTop()+$(window).height()-100)+'px'});
				}
			}
			$('.scroll-top').show();
		}else{
			$('.scroll-top').hide();
		}
		if(clickType){
			$('.scroll-top').click(function(){
				$(window).scrollTop(0);
				$(this).hide();
			});
			$(window).scroll(function(){
				page.scrollTop(false);
			})
			$(window).resize(function(){
				page.scrollTop(false);
			})
		}
 },
    

    //添加回复框
    huifu1: function (obj) {
        var name = $(obj).attr("t");
        var tid = $(obj).attr("tid");
        var uid = $(obj).attr("uid");
    //    if ($(obj).parent().parent().find("div.hfbox").length == 0) {
        if ($(".com-list-content").find("div.hfbox").length == 0) {
	        var hfbox = "<div class='hfbox'><textarea id='text"+tid+"' ></textarea></br><input type='button' class='btn btn-mini Secondary' value='发表' com_id='" + $(obj).attr('com_id') + "'  uid='"+ uid +"' /> <input type='button' class='btn btn-mini' value='取消' com_id='" + $(obj).attr('com_id') + "'  onclick=\"page.cancel(this,'" + tid + "')\"/></div>";
	    //    $("#com"+$(obj).attr('com_id')).append(hfbox);
	  		  $("#hf"+$(obj).attr('com_id')).html(hfbox);
       		  $('#text'+tid).focus();
	  		  $("#text"+tid).html("@" + name + " ");
        }
        $("html,body").animate({scrollTop:$("#hf"+$(obj).attr('com_id')).offset().top},500);
    },
    huifu2: function (obj, box) {
        var txt = $(obj).parent().find("textarea").val();
        var article_id = $("input[name='article_id']").val();
        var group_id = $("input[name='group_id']").val();
        var com_id = $(obj).attr('com_id');
        var uid = $(obj).attr('uid');
        var token = $("input[name='token']").val();
        $.post("/article/replay",{content:txt,article_id:article_id,group_id:group_id,com_id:com_id,token:token,uid:uid},function(json){
        	var data=eval("("+json+")");
    	   if(data.state){
		    	repeat = data.msg.repeat;
		        msg = data.msg;
		        content = data.msg.data;
		        if (repeat != null) {
		            $('#checkRepeat').modal({
		                backdrop:true,
		                keyboard:true,
		                show:true
		            });
		            if (repeat.length == 1) {
		              $(".next").html("完成");
		              $(".next").addClass("finish");
		              $(".next").removeClass('next');
		            };
		            $(".next").attr('allnum',repeat.length);
		            var html = "";
		            for (var i in repeat[0]){
		              if(i == 'name'){break}
		              html += "<input name='repeatname' type='radio' value='"+repeat[0][i]['id']+"' mail='"+repeat[0][i]['mail']+"'>"+ repeat[0][i]['nickname']+"<br>";
		            }
		            $(".repeat-name").html(html);
		            $(".repeat-text").html(data.msg.data.replace(repeat[0]['name'],"<span style='background:#ff7f26;'>"+repeat[0]['name']+"</span>")+"<br>");
		        }else{
		          location.reload();return;
		        };
		        return false;
    	   }else{
    		   page.msg(data.msg,'error');
    	   }
    	   buttonObj.attr("disabled",false);

             $("#" + box).prepend(html);
             $(obj).parent().remove();
        }),"json";


    },
    edittxt: function (obj) {
    	var com_id = $(obj).attr('com_id');
        var htm = $("#com" + com_id).html();
        editObj.set("data",htm);
        $(".orag-button").find("span").replaceWith("<span>提交修改</span>");
        $("#replea").append("<input type='hidden' value=" + com_id + " name='editflag'>");
        $("html,body").animate({scrollTop:$("#replea").offset().top},500);
    },
    deltxt: function (obj,event) {

		 var replay_id = $(obj).attr('rid');
		 var flag = $(obj).attr('flag');
		 var article_id = $("input[name='article_id']").val();
		 var group_id = $("input[name='group_id']").val();
		 var com_id = $("input[name='com_id']").val();
		 var token = $("input[name='token']").val();
		 
		page.pobBox({id:'conFirmBox',okCallBack:function(objs){
			var buttonObj = objs.find("button");


 			buttonObj.attr("disabled",false);
		 $.post("/article/delcom",
				 { id:replay_id,
			 		article_id:article_id,
			 		group_id:group_id,
			 		com_id:com_id,
			 		token:token,
			 		flag:flag},
				 function(){
				 	location.reload();return;
			 			if(flag!=1){
			 				$(obj).parent().parent().remove();
			 			}else{
			 				$("#"+replay_id ).parent().remove();
			 				$("#countNum").html($("#countNum").html()-1);
			 			}
						objs.hide();
		 });
		 
		}
		})
    },
    openmore: function (obj) {
 		var c = ".hide"+$(obj).attr("value");
        var val = $(obj).text();
        if (val.indexOf("↑")>-1) {
        	$(obj).parents().find(c).hide();
        	$(obj).text("展开查看更多信息↓");
            //收起
	}
 	else {
 		$(obj).parents().parents().find(c).show();
 		$(obj).text("收起评论↑");
            //展开
        }
    },
    cancel:function(obj){
    	$(obj).parent().remove();
 },
    // add new
    
    delans: function (obj,event) {

		 var replay_id = $(obj).attr('rid');
		 var flag = $(obj).attr('flag');
		 var qa_id = $("input[name='qa_id']").val();
		 var group_id = $("input[name='group_id']").val();
		 
		page.pobBox({id:'conFirmBox',okCallBack:function(objs){
			var buttonObj = objs.find("button");


			buttonObj.attr("disabled",false);
		 $.post("/qa/delans",
				 { id:replay_id,
			 		qa_id:qa_id,
			 		group_id:group_id,
			 		flag:flag},
				 function(){
			 			
			 			if(flag!=1){
			 				$(obj).parent().parent().remove();
			 			}else{
			 				$("#"+replay_id ).parent().remove();
			 				$("#countNum").html($("#countNum").html()-1);
    					}
						objs.hide();
		 });
		 
		}
		})
   },
   //添加回复框
   huifu3: function (obj) {
       var name = $(obj).attr("t");
       var tid = $(obj).attr("tid");
       var uid = $(obj).attr("uid");
   //    if ($(obj).parent().parent().find("div.hfbox").length == 0) {
       if ($(".com-list-content").find("div.hfbox").length == 0) {
	        var hfbox = "<div class='hfbox'><textarea id='text"+tid+"'></textarea></br><input class='btn btn-mini Secondary' type='button' value='回复' com_id='" + $(obj).attr('com_id') + "'  uid='"+ uid +"' /> <input type='button' class='btn btn-mini' value='取消' com_id='" + $(obj).attr('com_id') + "'  onclick=\"page.cancel(this,'" + tid + "')\"/></div>";
	        $("#hf"+$(obj).attr('com_id')).append(hfbox);
       		  $('#text'+tid).focus();
	  		  $("#text"+tid).html("@" + name + " ");
       }
       $("html,body").animate({scrollTop:$("#com"+$(obj).attr('com_id')).offset().top},500);
   },
    
  huifu4: function (obj, box) {
       var txt = $(obj).parent().find("textarea").val();
       var qa_id = $("input[name='qa_id']").val();
       var group_id = $("input[name='group_id']").val();
       var com_id = $(obj).attr('com_id');
       var uid = $(obj).attr('uid');
       $.post("/qa/answer",{answer:txt,qa_id:qa_id,group_id:group_id,com_id:com_id,uid:uid},function(json){
    	   
    	
    	   var data=eval("("+json+")");
    	   if(data.state){
    		   location.reload();return;
    	   }else{
    	   	   page.msg(data.msg[0],data.msg[1]);
    		   //page.msg(data.msg,'error');
    	   }
    	   buttonObj.attr("disabled",false);
    		
       }),"json";

   },
   //添加回复框(评论编辑)
   huifu5: function (obj) {
       var name = $(obj).attr("t");
       var tid = $(obj).attr("tid");
       var uid = $(obj).attr("uid");
       var editcom = $(obj).attr("rid");
       var content = $(obj).attr("content");
       if ($(".com-list-content").find("div.hfbox").length == 0) {
	        var hfbox = "<div class='hfbox'><textarea>"+content+"</textarea></br><input class='Secondary btn btn-mini' type='button' value='修改' editcom='"+ editcom + "' com_id='" + $(obj).attr('com_id') + "'  uid='"+ uid +"' /> <input class='btn btn-mini' type='button' value='取消' com_id='" + $(obj).attr('com_id') + "'  onclick=\"page.cancel(this,'" + tid + "')\"/></div>";
	        $("#com"+$(obj).attr('com_id')).append(hfbox);
       }
       $("html,body").animate({scrollTop:$("#com"+$(obj).attr('com_id')).offset().top},500);
   },
  huifu6: function (obj, box) {
       var txt = $(obj).parent().find("textarea").val();
       var qa_id = $("input[name='qa_id']").val();
       var group_id = $("input[name='group_id']").val();
       var com_id = $(obj).attr('com_id');
       var uid = $(obj).attr('uid');
       var editcom = $(obj).attr('editcom');
       $.post("/qa/answer",{answer:txt,qa_id:qa_id,group_id:group_id,com_id:com_id,uid:uid,editcom:editcom},function(json){
    	   
    	   var data=eval("("+json+")");
    	   if(data.state){
    		   location.reload();return;
    	   }else{
    		   page.msg(data.msg,'error');
    	   }
    	   buttonObj.attr("disabled",false);
    	   
       }),"json";

   },    
   //添加回复框 文章二级回复编辑
    huifu7: function (obj) {
        var name = $(obj).attr("t");
        var tid = $(obj).attr("tid");
        var uid = $(obj).attr("uid");
        var rid = $(obj).attr('rid');
        var content = $(obj).attr("content");
    //    if ($(obj).parent().parent().find("div.hfbox").length == 0) {
        if ($(".com-list-content").find("div.hfbox").length == 0) {
	        var hfbox = "<div class='hfbox'><textarea id='text"+tid+"' >"+content+"</textarea></br><input type='button' class='btn btn-mini Secondary' value='修改' com_id='" + $(obj).attr('com_id') + "'  rid="+ rid +" uid='"+ uid +"' /> <input type='button' class='btn btn-mini' value='取消' com_id='" + $(obj).attr('com_id') + "'  onclick=\"page.cancel(this,'" + tid + "')\"/></div>";
	        $("#hf"+$(obj).attr('com_id')).prepend(hfbox);
	  		  //$("#hf"+$(obj).attr('com_id')).html(hfbox);
        }
        $("html,body").animate({scrollTop:$("#hf"+$(obj).attr('com_id')).offset().top},500);
    },huifu8: function (obj, box) {
      	var txt = $(obj).parent().find("textarea").val();
        var article_id = $("input[name='article_id']").val();
        var group_id = $("input[name='group_id']").val();
        var com_id = $(obj).attr('com_id');
        var uid = $(obj).attr('uid');
        var token = $("input[name='token']").val();
        var rid = $(obj).attr('rid');
        $.post("/article/replay",{content:txt,article_id:article_id,group_id:group_id,com_id:com_id,token:token,uid:uid,editflag:rid},function(json){
        	var data=eval("("+json+")");
    	   if(data.state){
    		   location.reload();return;
    	   }else{
    		   page.msg(data.msg,'error');
    	   }
    	   buttonObj.attr("disabled",false);

             $("#" + box).prepend(html);
             $(obj).parent().remove();
        }),"json";

   },
   
   delQaConfirm:function(event){
		if(window.event){
			window.event.returnValue = false;
		}else{
			event.preventDefault();
		}
		var objA = this;
		page.pobBox({id:'conFirmBox',okCallBack:function(obj){
			var buttonObj = obj.find("button");
			var url = objA.href;
			buttonObj.attr("disabled",true);
			$.ajax({
				url:url,
				dataType: 'json',
				type:'GET',
				data:{},
				error: function () {
					buttonObj.attr("disabled",false);
					page.msg("系统超时，请稍后重试！",'error');
				},
				success: function(data) {
					if($.trim(data)!=''){
						if(data){
							if(data.state){
									page.msg("删除成功！",'ok',function(){location.href = data.msg;});
							}else{
								page.msg(data.msg,'error');
							}
						}
					}
					buttonObj.attr("disabled",false);
				}
			});
	 	}});	
	},
	
	delanscom: function (obj,event) {

		 var replay_id = $(obj).attr('rid');
		 var flag = $(obj).attr('flag');
		 var qa_id = $(obj).attr('qa_id');
		 var ans_id = $(obj).attr('ans_id');
		 var content = $(obj).attr('content');
		 
		page.pobBox({id:'conFirmBox',okCallBack:function(objs){
			var buttonObj = objs.find("button");


			buttonObj.attr("disabled",false);
			$.post("/qa/delanscom",
				 {  id:replay_id,
			 		qa_id:qa_id,
			 		ans_id:ans_id,
			 		content:content,
			 		flag:flag},
				 function(){
			 			
			 			
			 			location.reload();return;
		 });
		 
		}
		})
  }
};

function contains(parentNode,childNode){
     return parentNode.contains ? parentNode != childNode && parentNode.contains(childNode) : !!(parentNode.compareDocumentPosition(childNode) & 16);
}
function checkhover(e,target){
    if(getEvent(e).type=="mouseover")
        return !contains(target,getEvent(e).relatedTarget||getEvent(e).fromElement) && !((getEvent(e).relatedTarget||getEvent(e).fromElement)===target);
    else
    {
        return !contains(target,getEvent(e).relatedTarget||getEvent(e).toElement) && !((getEvent(e).relatedTarget||getEvent(e).toElement)===target);
    }
}

 function getEvent(e){
     return e||window.event;
}