/*
 * dom元素序列化成对象
 */
$.fn.serializeObject = function() {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [ o[this.name] ];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
}




/*封装模态框：信息提示框
confirmMsg(
	{						//可以为object，也可以为string,为string时title、ico为默认值
	title:"系统提示",  		//提示框标题，可为空默认值为"系统提示"
	mess:"确定提交数据吗？",	//提示的信息，可为空默认值为"确定要执行操作吗？"
	ico:"primary"   			//提示图标，success：绿色勾，primary：蓝色勾， warn：橙色感叹号，error：红色叉，可为空默认值为primary
	},
	callback 				//回调函数
)*/
function confirmMsg(data, callback){
	var title, mess, ico;
	if(typeof(data) === 'object'){
		if(data.title == null || data.title == undefined){
			title = "系统提示";
		}else{
			title = data.title;
		}
		if(data.mess == null || data.mess == undefined){
			mess="确定要执行操作吗？";
		}else{
			mess = data.mess;
		}
		if(data.ico == null || data.ico == undefined){
			ico = "primary";
		}else{
			ico = data.ico;
		}
	}else if(typeof(data) === 'function'){
		title = "系统提示";
		mess = "confirm参数设置错误！";
		ico = "error";
	}else{
		title = "系统提示";
		mess = data;
		ico = "primary";
	}
	$("#alertPop").remove();
	var alertModal = "<div id='alertPop' class='modal fade' tabindex='-1' role='dialog' style='display:none; z-index:1050;' aria-hidden='false' data-backdrop='static' data-keyboard='false' >";	
	alertModal += "<div class='modal-dialog'>";
	alertModal += "<div class='modal-content'>";
	alertModal += "<div class='modal-header'>";
	alertModal += "<button class='close' type='button' data-dismiss='modal' aria-hidden='true'>x</button>";
	alertModal += "<h4 class='modal-title'>" + title + "</h4>";
	alertModal += "</div><div class='modal-body'>";
	alertModal += "<div class='text-center'>";
	switch(ico) {
		case "success": alertModal += "<div class='i-circle success'><i class='fa fa-check'></i></div>";break;
		case "primary": alertModal += "<div class='i-circle primary'><i class='fa fa-check'></i></div>";break;
		case "warning": alertModal += "<div class='i-circle warning'><i class='fa fa-warning'></i></div>";break;
		case "error": alertModal += "<div class='i-circle danger'><i class='fa fa-times'></i></div>";break;
	}
	alertModal += "<p>" + mess + "</p></div></div>";
	alertModal += "<div class='modal-footer'>";
	alertModal += "<button class='btn btn-secondary' type='button' data-dismiss='modal'>取消</button>";
	switch(ico) {
		case "success": alertModal += "<button class='btn btn-success' type='button' onclick='doOk();'>确定</button>";break;
		case "primary": alertModal += "<button class='btn btn-primary' type='button' onclick='doOk();'>确定</button>";break;
		case "warning": alertModal += "<button class='btn btn-warning' type='button' onclick='doOk();'>确定</button>";break;
		case "error": alertModal += "<button class='btn btn-danger' type='button' onclick='doOk();'>确定</button>";break;
	}	
	alertModal += "</div></div></div></div>";
	$("body").after(alertModal);
	$("#alertPop").modal("show");
	document.body.onselectstart = function() {
		return false;
	};
	this.doOk = function() {
		$("#alertPop").modal("hide");
		if (callback) {
			callback();
		}
		document.body.onselectstart = function() {
		};
	}
	$('#alertPop').on('hidden.bs.modal', function () {
		$('#alertPop').remove();
		})
}
