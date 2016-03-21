$(document).ready(function() {
    //alert($(this).width() +"width and height"+$(this).height());
	var var_left = 0;
	var var_left2 = 0;
	var banner_width = $("#banner1").width();
	//$(".list-item").eq(0).attr("style","background:#cc0");//css中已设置
	
	//加载json中的内容
	for(a=0;a<contentfs.length;a++)
	{
		$(".section-banner>h2").eq(a).html(contentfs[a][0]);
		$(".section-banner>p").eq(a).html(contentfs[a][1]);
	}
	
	
	var container_offsetx = $("#container").offset().left;
	var wrapper_offsetx = 0;
	//Click left&right button to control the panel
	$("[class$=button]").click(function(){
		//alert($(this).index());
		var direction = $(this).index()-$("#container").index();
		wrapper_offsetx = $("#wrapper").offset().left;
		var_left = wrapper_offsetx - container_offsetx;
		var current_position = var_left + direction * banner_width;
		
		//ol按钮弹跳函数
		function upFunction(){
			$(".list-item").eq(item_which).animate({top: "-10px"}, "fast");
			$(".list-item").attr("style","background:#cc0");
			$(".list-item").eq(item_which).attr("style","background:#ff0");
		}
		if(current_position<-5*banner_width){
			//console.log("有判断");
			current_position = 0;
			var item_which = Math.abs(current_position/banner_width);
			$(".list-item").eq(5).animate({top: "0px"}, "fast",upFunction);
			var_left = current_position;
			//console.log("var_left="+var_left);
			$("#wrapper").animate({left: var_left + "px"}, "fast");
			return;
		}
		else if(current_position>0){
			current_position = -5*banner_width;
			var item_which = Math.abs(current_position/banner_width);
			$(".list-item").eq(0).animate({top: "0px"}, "fast",upFunction);
			var_left = current_position;
			$("#wrapper").animate({left: var_left + "px"},"fast");
			return;
		}
		var item_which = Math.abs(current_position/banner_width);
		
		//exploror can use console.log? if false,do nothing! if true log item_which!
		if(!window.console){window.console = {log : function(){}};}
		console.log(item_which);
		
		$(".list-item").eq(item_which+direction).animate({top: "0px"}, "fast",upFunction);
		var_left = current_position;
		//alert(wrapper_offsetx + "前是left后是宽度" + banner_width + this.index());
		$("#wrapper").animate({left: var_left + "px"}, "slow");
		//console.log("when "+direction+"=1 and 0="+var_left+" should not show!!!");
    });
	
	//Click number button to control the panel
	$(".list-item").click(function(){
		var ol_item_index = $(this).index();
		var_left2 = -banner_width*ol_item_index;
		$(".list-item[top!='0px']").animate({top: "0px"}, "fast",upFunction);
		//this function is better than former one (in former click event)
		function upFunction(){
			if($(".list-item").index($(this))<5) return;
			$(".list-item").eq(ol_item_index).animate({top: "-10px"}, "fast");
			$(".list-item").attr("style","background:#cc0");
			$(".list-item").eq(ol_item_index).attr("style","background:#ff0");
		}
		$("#wrapper").animate({left:var_left2 + "px"},"slow")
	})
	
	//Mousemove event to control the panel
	//show mousemove axis
	$("#container").mousemove(function(e){
		$("#test").html(e.pageX + ", " + e.pageY);
	});
	
	//mouse enter&leave p-paragraph
	$(".section-banner p").mouseenter(function(){
		$(".section-banner p").css("cursor","text");
	});
	$(".section-banner p").mouseleave(function(){
		$(".section-banner p").css("cursor","auto")
	});
	
	var former = 0;
	$("#container").mousedown(function(e){
		former = e.pageX;
		console.log("鼠标按下啦");
		if($(".section-banner p:eq(0)").css("cursor")=="text"){
			former = 0;
			console.log("改变former为0，不滑动");
		}
	});
	$("#container").mouseup(function(e){
		if(former != 0){
			var after = e.pageX;
			if (former-after>30) {
				console.log(former+"FA"+after+"left"); 
				$("#left-button").trigger("click");
			}
			else if (after-former>30) {
				console.log(former+"FA"+after+"right"); 
				$("#right-button").trigger("click");
			}
		}
		
	});
	//$(".section-banner>p").mousedown(function(){console.log("no slide down");});
	//$(".section-banner>p").mouseup(function(){console.log("no slide up");});
	function intervalFunction(){
		$("#left-button").trigger("click");
		console.log("时钟");
	}
	var interValue = setInterval(intervalFunction,1500);
	$("#test").click(function(){
		clearInterval(interValue);
	});
});
