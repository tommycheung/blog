/* 
 * 7N: 
 *
 * New Reply Editor
 */
var editObj = null;
$(function(){
	var plugins={
		Code:{c:'btnCode',t:'插入代码',h:1,e:function(){
			var _this=this;
			var htmlCode='<div><select id="xheCodeType"><option value="as3">ActionScript3</option><option value="bash">Bash/Shell</option><option value="cpp">C/C++</option><option value="css">Css</option><option value="cf">CodeFunction</option><option value="c#">C#</option><option value="delphi">Delphi</option><option value="diff">Diff</option><option value="erlang">Erlang</option><option value="groovy">Groovy</option><option value="html">Html</option><option value="java">Java</option><option value="jfx">JavaFx</option><option value="js">Javascript</option><option value="pl">Perl</option><option value="php">Php</option><option value="plain">Plain Text</option><option value="ps">PowerShell</option><option value="python">Python</option><option value="ruby">Ruby</option><option value="scala">Scala</option><option value="sql">Sql</option><option value="vb">Vb</option><option value="xml">Xml</option></select></div><div><textarea id="xheCodeValue" wrap="soft" spellcheck="false" style="width:300px;height:100px;" /></div><div style="text-align:right;"><input type="button" id="xheSave" value="确定" /></div>';			
			var jCode=$(htmlCode),jType=$('#xheCodeType',jCode),jValue=$('#xheCodeValue',jCode),jSave=$('#xheSave',jCode);
			jSave.click(function(){
				_this.loadBookmark();
				_this.pasteHTML('<pre class="brush:'+jType.val()+';toolbar:false; prettyprint">'+_this.domEncode(jValue.val())+'</pre>');
				_this.hidePanel();
				return false;	
			});
			_this.saveBookmark();
			_this.showDialog(jCode);
		}}
	};
	
	 (function () {
        KISSY.use("editor/full, sizzle", function (S, Editor) {

            var cfg = {
                autoRender: true,
                attachForm: true,
                baseZIndex: 10000,
                srcNode: "#html-edit-box",
                customStyle: "p {font-family: tahoma, Arial, '微软雅黑';}",
                height: "400px",
                width:"785px"
            };

            var plugins = (
                    "source-area" +
                            ",code" +
                            ",separator" +
                            ",bold" +
                            ",italic," +
                            //"font-family," +
                            "font-size," +
                            "strike-through," +
                            "underline," +
                            "separator" +
                            ",image" +
                            ",link" +
                            ",fore-color" +
                            //",back-color" +
                            // ",resize" +
                            // ",draft" +
                            ",undo" +
                            // ",indent" +
                            // ",outdent" +
                            // ",unordered-list" +
                            // ",ordered-list" +
                            //",element-path" +
                            //",page-break" +
                            //",preview" +
                            //",maximize" +
                            ",remove-format" +
                            //",heading" +
                            ",justify-left" +
                            ",justify-center" +
                            ",justify-right" +
                            ",table" +
                            //",smiley" +
                            //",flash" +
                           // ",xiami-music" +
                            (KISSY.UA.gecko?"":",multiple-upload") +
                           // ",video" +
                            ",drag-upload"
                    ).split(",");

            var fullPlugins = [];

            S.each(plugins, function (p, i) {
                fullPlugins[i] = "editor/plugin/" + p + "/";
            });

            var pluginConfig = {
                "link": {
                    target: "_blank"
                },
                "image": {
                    upload: {
                        serverUrl: "/upload/do",
                        suffix: "png,jpg,jpeg,gif",
                        fileInput: "filedata"
                    }
                },
                "multiple-upload": {
                    serverUrl: "http://"+location.host+"/upload/do",
                    "previewWidth": "80px",
                    fileInput: "filedata"
                },
                "draft": {
                    interval: 5,
                    limit: 10,
                    "helpHtml": "<div " +
                            "style='width:200px;'>" +
                            "<div style='padding:5px;'>草稿箱能够自动保存您最新编辑的内容，" +
                            "如果发现内容丢失，" +
                            "请选择恢复编辑历史</div></div>"
                },
                "resize": {
                },
                "drag-upload": {
                    suffix: "png,jpg,jpeg,gif",
                    fileInput: "filedata",
                    serverUrl: "/upload/do"
                }
            };

            KISSY.use(fullPlugins, function (S) {
                var args = S.makeArray(arguments),
                    washArea = S.all(".J-wash-area");
                args.shift();

                S.each(args, function (arg, i) {
                    var argStr = plugins[i], cfg;
                    if (cfg = pluginConfig[argStr]) {
                        args[i] = new arg(cfg);
                    }
                });

                cfg.plugins = args;
                editObj = new Editor(cfg);
                S.all(editObj.get("statusBarEl")[0]).style("line-height", "20px").html("<span style='margin: 0px 5px;'>提示:评论支持@哦，被@者会及时收到邮件&站内提醒，与后面内容用空格隔开</span>");
           
                editObj.on("paste", function (e) {
                    washArea.html(e.html);
                    S.all(".J-wash-area *").css("font-family", "tahoma, Arial, '微软雅黑'").css("font-size", "14px").css("line-height", "20px");
                    return washArea.html();
                });
            });

        });
    })();
});