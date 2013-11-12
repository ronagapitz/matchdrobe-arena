$(function()
{



/* adjust header height */

function adjust_arena()
{
$(".adjust_container").css({"padding-top" :$("#f1").height()+20,
"padding-bottom": $("#f1").height()+30

});


}
 var email_width = 	$( window ).width() * .9;
	
	$("div.email").width(email_width);
			$("div.email").height( ($("div.email").width() * (.090))).css({"visibility":"visible","margin-bottom" : $("div.email").height()+'px'});
//alert($("div.email").width());

$(".login_div, .register_div").css( {"padding-top":($("div.email").width() * (.17)), "padding-bottom":($("div.email").width() * (.17))});

		$(".login_start").on('tap', function(e) {
	//alert();
	

	$(".login_div").show("slide");
		$(".main_page").hide();

	return false;
	});
	
	$("#log-in").on('tap', function()
	{
		
     if($("#username").val() == '' ||  $("#password").val() == '')
	 {
	 //alert("required fields");
	 return false;
	 }
	 else
	 {
	 $.get("http://matchdrobe.com/app/register_app.php",{login:'true',user_name: $("#username").val(),password:  $("#password").val()},function(e)
	 {
	 console.log(e.a);
	 if(e.a == 1)
	 {
	localStorage.user_id = e.a;
	alert("Login Successful");
					//	  document.location.href = 'f_style_tribe.html';

					$(".login_div").hide();
					$(".tribe_div").show("slide");
	 }
	 else
	 {
	 
	 alert("error: please check your username/password !");
	 }
	 }, "json");
	 
	 }
	});
	$(".regtab").on('tap', function(e) {
	
			$(".main_page").show("slide");
			$(".login_div,.register_div").hide();
			
			return false;

	});
	
	//reg 
	
	
	$(".reg_start").on('tap', function(e) {
	//alert();
	

	$(".register_div").show("slide");
		$(".main_page").hide();

	return false;
	});
	
	
	
	
 if(localStorage.user_id != null)


{


					 // document.location.href = 'f_style_tribe.html';

}	



//set style tribe

var $img = '';


 adjust_arena();

if(localStorage.tribe =="full")
{
 $("#f3 img").toggle();

 $(".navbar-fixed-bottom").css("visibility","visible");

 $(".arena_div").show("slide",function()
 {
 adjust_arena();
 
 });
 $(".tribe_div,.main_page").hide();
$(".pair .cont").load("http://matchdrobe.com/app/arena/");

}
//$("body").css({'padding-top':$(".res_head").height(),'margin-top': '10px'});

var tribe = 3;
$(".choose").on("tap", function()
{
$( "body" ).scrollTop( 0 );
$("#pop,.popup").hide("slide");
$($img.id).css({'opacity': '.7'});
//alert($img.tid + 's' + localStorage.user_id);
   $.post("http://matchdrobe.com/app/register_app.php",{'tribe': $img.tid,'user_id':localStorage.user_id});
tribe--;
$("#span3").text(tribe);
if(tribe < 3)
{
$(".more").removeClass("hide");
}
if(tribe == 0)
{
$("#f3").click();
$(".navbar-fixed-bottom").css("visibility","visible");
localStorage.tribe ="full";
$(".arena_div").show("slide",function()
{


});
 $(".tribe_div").hide();
}
return false;
});
$(".back_style").on("tap", function()
{
$("#pop,.popup").hide("slide");


return false;
});
$(".tribe img").on('tap',function()
{
$( "body" ).scrollTop( 0 );

$img = {src: $(this).attr("data-src"),
id : "#"+$(this).attr("id"),
tid : $(this).attr("data-id")


};
//$(".gender, .choose_style").hide("scale");
$("#pop,.big_style").show("slide").removeClass("hide");
$(".big_img").attr("src",$img.src);
//$(this).css({'opacity': '.6'});

})

//end style tribe

$(document).on('backbutton',
     function(e){

         e.preventDefault();

         // do whatever you like here.

});
	
//arena ******************************************************************************************************


$(document).on("tap",".pop_back",function()
{
$("#pop").hide();
$(".popup").hide("slide");

});
$(".skip").on("tap",function()
{
	$(".pair .cont").load("http://matchdrobe.com/app/arena/");


}); 
 
 
 var array_tag = [];
var $id = '';

$("div.cont").on("tap", "a.arena_img", 
	function(){
	
		//$(".like_modal .tag_content").empty();
$(".fb_photo").attr("src",$(this).attr("data-photo"));
$(".username").text($(this).attr("data-name"));
	$(".item_desc").text($(this).attr("data-desc"));
$("#pop").show();
		$(".tag_pop").show("slide");
$id = $(this).attr("data-id");


$("#tagger").load("http://matchdrobe.com/app/arena/arena_popup_tags.php?id="+$id,function(e)
{
$("input#tag").focus().focus();

});
 
	 return false;
	
	});  
	
	
	
	
	$(document).on('tap','.ctag',function()
	{
	$(this).remove();
	
	});
	
	 $( document ).on('keypress','#tag',function(event) {
        if ( event.keyCode == 32 || event.keyCode == 13 || event.keyCode == 188 || event.keyCode == 9 ) {
		if($(this).val() !== "")
		{
		           $('#add_tag').prepend('<div class="ctag">'+$('#tag').val()+' <span>x</span></div>');

		 array_tag.push( $('#tag').val() );
		$('#tag').focus().val('');
		}
		
        }
    });

	$(document).on("tap",".confirm",function()
	{
	
	$("#pop,.popup").hide("slide");
	//alert( + ' ' + $("#h2").val() + ' '+ $id  );
	$.post("http://matchdrobe.com/app/arena/arena_functions.php",{item_1 : $("#h1").val(), item_2: $("#h2").val(),
	user_id : localStorage.user_id, item_like : $id});
	
	if(localStorage.pts == null)


{
localStorage.pts =  parseInt(array_tag.length);

$(".points").text(localStorage.pts);

					//	  document.location.href = 'f_style_tribe.html';

}

else
{
localStorage.pts = parseInt(localStorage.pts) + parseInt(array_tag.length);

$(".points").text(localStorage.pts);


}

array_tag = [];

	$(".pair .cont").load("http://matchdrobe.com/app/arena/");

	});

	
	$(document).on('tap','.top_tags',function()
	{
	 array_tag.push( $(this).text() );
	$(this).css({'background':'#b80941','color': 'white'});

	
	
	
	});


/* footer ****************************/



$(".navbar-fixed-bottom div").on("tap",function() {
url = $(this).attr("data-url");
$(".adjust_container").hide();

 
$(url).show("slide");
 adjust_arena();
//	$(".navbar-fixed-bottom div img").first().show().last().hide();
   $(".navbar-fixed-bottom .none").hide();
   $(".navbar-fixed-bottom .f_active").show();
 
 $(this).find(".none").show();
   $(this).find(".f_active").hide();
	
	
});

/*hof**************************/

$(".hof_div .ron").load("http://matchdrobe.com/app/arena/arena_functions.php",{hof: 1});


/*looks **********************************/
$(".looks_div .gender").load("http://matchdrobe.com/app/arena/arena_functions.php",{looks: 1,user_id: localStorage.user_id});

$(document).on("tap",".looks_div .ron img",function()
{
$(".big_img").attr("src",$(this).attr("src"));
$("#pop,.big_img").show("scale");
$( "body" ).scrollTop( 0 );

})

$(".big_img").on("tap", function()
{
$("#pop,.popup").hide("scale");
});

/*****************settings ******************/

$("#logout").on("tap",function()
{
alert();
localStorage.clear();
document.location.href = 'index.html';

});

/*
$("#change_tribe").on("tap",function()
{
localStorage.tribe = '';
$.post("http://matchdrobe.com/app/register_app.php",{"change_tribe": 'true',"user_id" : localStorage.user_id },function(e)
{
document.location.href = 'f_style_tribe.html';
});

}); */

});

