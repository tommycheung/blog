   var oBlog = {};
    oBlog.create = function(type){
        $("#which").val(type);
		if(type == 'draft'){
			var buttonObj = $(this);
			var titleObj = $("#title");
			if($.trim(titleObj.val())==''){
				titleObj.focus();
				page.msg('���ⲻ��Ϊ�գ�','error');
				/*titleObj.blur(function(){
					if($.trim(this.value)!=''){
						titleObj.next('span').hide();
					}
				})*/
				return false;
			}
			if(page.getLength($.trim(titleObj.val()))>30){
				titleObj.focus();
				page.msg('���ⲻ�ܳ���30�ַ���','error');
				return false;
			}
			$.ajax({
				url:$("#sendblog_form").attr("action"),
				dataType: 'json',
				type:'POST',
				data:$("#sendblog_form").serialize(),
				beforeSend: function(formData) {
	
				 },
				 error: function () {
					//buttonObj.attr("disabled",false);
					page.msg("ϵͳ��ʱ�����Ժ����ԣ�",'error');
				},
				success: function(data) {
					if($.trim(data)!=''){
						if(data){
							if(data.state){
								page.msg("����ɹ���",'ok',function(){
									//location.href = data.msg;
								});
							}else{
								page.msg(data.msg,'error');
							}
						}
					}
					//buttonObj.attr("disabled",false);
				}
			});
		}else{
			$("#sendblog_form").submit();
		}
		
    }
    oBlog.deletedraft = function(id){
        jQuery.getJSON('/article/delete/'+id+'/y', function(o){ if(o.state){
			$("#li_"+id).hide("slow").remove();
		} });
    }
	/*window.onunload = function(){
		if(confirm("��ѡ���˹رմ��ڣ��Ƿ񽫲��ͱ���Ϊ�ݸ壿")){
			oBlog.create('draft');
		}else{
			window.close();
		}
	}*/