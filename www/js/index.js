
$(function()
{





$("#f4").on("tap",function()
{


});
function init()
{


$("#profile_activity .container, .feed_div .container").load("http://matchdrobe.com/app/arena/arena_functions.php?my_activity="+localStorage.user_id);


	$(".profile_name").text(localStorage.full_name);
				$(".profile_desc").text(localStorage.about);
		$("#dp").attr("src", localStorage.dp);

}
init();
/****profile ******************/
$(".profile_desc").click(function()
{

});
$( ".edit_p" ).click(
  function() {
   if($(this).text() == 'edit profile')
   {
   $(".profile_name").attr('contenteditable','true');
   
   $(this).text('save');
   }
   else
   {
   $(this).text('edit profile');
   }
  }
);
current = 1;
 $(".profile_pages").width($(window).width()).swipe( { swipeLeft:function()
 {
 if(current < 5)
 {
  current +=1;

 $("#profile_nav img").attr("src","img/profile_nav.jpg");
 $("#"+current).attr("src","img/profile_nav_h.jpg");
 $("#profile_nav span").text($("#"+current).attr("data-text"));
 }
 
 $('html, body').animate({scrollLeft: $(this).next().offset().left});
 }, 
 swipeRight:function()
 {
  if(current > 1)
{
  current -=1;
   $("#profile_nav img").attr("src","img/profile_nav.jpg");
   

   $("#"+current).attr("src","img/profile_nav_h.jpg");
 $("#profile_nav span").text($("#"+current).attr("data-text"));

   }


 
 $('html, body').animate({scrollLeft: $(this).prev().offset().left});

 }, allowPageScroll:"auto"} );
$("#reg_form").submit(function()
{



if($("#rusername").val() == '' ||  $("#rpassword").val() == ''   ||  $("#email").val() == '')
	 {
	 //alert("required fields");
	return false;
	 }   
	    else
   {
   $.post("http://matchdrobe.com/app/register_app.php",{'registration':'true','email':$("#email").val(),'full_name': $("#name").val(),
   "user_name": $("#rusername").val(),"password" : $("#rpassword").val()}, function(e)
   {
      
 
  console.log(e.num);
   if(e.num != 0)
   {
      alert("User already exists!");
					  
   }
 else
  {
   localStorage.user_id = e.uid;
   
   
   $(".reg_pop").show("slide");
   $("#pop").show();
     // alert("Registration Successful");

   					//$(".register_div").hide();
					//$(".tribe_div").show("slide");
}
   

  
  // return false;
  // return false;
   }, "json");
   }
   return false;
  
});

$(".setter").on("tap",function()
{

$(".profile_setings,.main_profile").toggle();
})
$(".pair .cont").empty().load("http://matchdrobe.com/app/arena/");


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
	$(".submit").effect('slide', { direction: 'left', mode: 'show' });
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
		localStorage.full_name = e.full_name;
				localStorage.about = e.about;
				localStorage.dp = e.dp;
		$("#dp").attr("src", localStorage.dp);

		$(".profile_name").text(localStorage.full_name);
				$(".profile_desc").text(localStorage.about);


	//alert("Login Successful");
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
$(".pair .cont").empty().load("http://matchdrobe.com/app/arena/");

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
	
/***************register *****************************/

$(".reg_con").on("tap",function()
{
	$(".register_div").hide();
					$(".tribe_div").show("slide");
					$(".reg_pop,#pop").hide();

});
$("#reg_btn").on('tap',function()
	{
	

		// $(".f2").slideDown();
		 		// $("#reg1")[0].scrollIntoView();

	 	// $(".f1").slideUp();
  

  }

 // return false;
   );
//arena ******************************************************************************************************

$("#profile_follow .container").load("http://matchdrobe.com/app/arena/arena_functions.php",{followers: localStorage.user_id });
$(".follow").on("tap",function()
{
if($(this).attr("src") == "img/unfollow.jpg")
{
$(this).attr("src","img/follow.jpg");
$.post("http://matchdrobe.com/app/arena/arena_functions.php",{user:$(this).attr("data-id"), unfollower: localStorage.user_id },function(e)
{

});
}
else
{
$(this).attr("src","img/unfollow.jpg");

$.post("http://matchdrobe.com/app/arena/arena_functions.php",{user:$(this).attr("data-id"),follower: localStorage.user_id },function(e)
{

});
}

$("#profile_follow .container").load("http://matchdrobe.com/app/arena/arena_functions.php",{followers: localStorage.user_id });

});
$(document).on("tap",".pop_back",function()
{
$("#pop").hide();
$(".popup").hide("slide");

});
$(document).on("tap",".skip",function()
{
	$(".pair .cont").empty().load("http://matchdrobe.com/app/arena/");

$(".tapper").hide();
}); 
 
 
 var array_tag = [];
var $id = '';
var $img_liked = '';

/* arena to profile */
$(".name_plate").on("tap",function()
{
$("#f3").trigger("tap");
});

$(document).on("tap","img.fb_photo", function()
{
$("#profile_nav").show();
current = 1;
 $("#profile_nav img").attr("src","img/profile_nav.jpg");
 $("#1").attr("src","img/profile_nav_h.jpg");

$(".popup,#pop,.arena_div").hide("slide");
$(".profile_div2").show("slide");
$("#dp_big").attr("src",$(".fb_photo").attr('src'));
$(".name_plate").text($(this).attr("data-user"));
});

$("div.cont").on("tap", "a.arena_img", 
	function(){
$(".follow").attr('data-id',$(this).attr("data-userid"));
		//$(".like_modal .tag_content").empty();
$(".fb_photo").attr({"src": $(this).attr("data-photo"),"data-user":$(this).attr("data-name"),
"data-full":$(this).attr("data-full")} );

$(".profile_div2 .profile_name").text($(this).attr("data-full"));
$(".profile_div2 .profile_desc").text($(this).attr("data-about"));


$(".username").text($(this).attr("data-name"));
	$(".item_desc").text($(this).attr("data-desc"));
$("#pop").show();
		$(".tag_pop").show("slide");
$id = $(this).attr("data-id");
$img_liked = $(this).attr("data-image");

$("#tagger").html($(this).next().html());
/*

$("#tagger").load("http://matchdrobe.com/app/arena/arena_popup_tags.php?id="+$id,function(e)
{
$("input#tag").focus().focus();

}); */
 
	 return false;
	
	});  
	
	
	
	
	$(document).on('tap','.ctag',function()
	{
	$(this).remove();
	
	});
	
	 $( document ).on('keypress','.tagg',function(event) {
        if ( event.keyCode == 32 || event.keyCode == 13 || event.keyCode == 188 || event.keyCode == 9 ) {
		if($(this).val() !== "")
		{
		           $('#add_tag').prepend('<div class="ctag">'+$('.tagg').val()+' <span>x</span></div>');

		 array_tag.push( $('.tagg').val() );
		$('.tagg').focus().val('');
		}
		
        }
    });

	$(document).on("tap",".confirm",function()
	{
	$(".tapper").hide();
	
	$("#pop,.popup").hide("slide");
	sec =$("#fuck").val();
	//alert( + ' ' + $("#h2").val() + ' '+ $id  );
	$.get("http://matchdrobe.com/app/arena/arena_functions.php",{img_1: $("#h1").attr("data-image"), img_3: sec,item_1 : $("#h1").val(), item_2: $("#h2").val(),
	user_id : localStorage.user_id, item_like : $id, full_name : localStorage.full_name,img_liked : $img_liked},function(e)
	{
	//alert(e);
	$("#profile_activity .container,.feed_div .container").load("http://matchdrobe.com/app/arena/arena_functions.php?my_activity="+localStorage.user_id);

	
	});
	
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

	$(".pair .cont").empty().load("http://matchdrobe.com/app/arena/");

	});

	
	$(document).on('tap','.top_tags',function()
	{
	 array_tag.push( $(this).text() );
	$(this).css({'background':'#b80941','color': 'white'});

	
	
	
	});


/* footer ****************************/



$(".navbar-fixed-bottom div").on("tap",function() {
url = $(this).attr("data-url");
$( "body" ).scrollTop( 0 );
if(url == '.profile_div')
{
$("body").css("overflow-x", "hidden");
current = 1;
 $("#profile_nav img").attr("src","img/profile_nav.jpg");
 $("#1").attr("src","img/profile_nav_h.jpg");
$(".setter,#profile_nav").show("slide");
}
else
{
$("body").css("overflow-x", "auto");

$(".setter,#profile_nav").hide("slide");
//$("#profile_nav").hide("slide");

}
if(url == '.hof_div')
{


$("body").addClass("horizontal-slide")
}
else
{
$("body").removeClass("horizontal-slide")


}
$(".adjust_container").hide();

 
$(url).show("slide");
 adjust_arena();
 
 loaded();
//	$(".navbar-fixed-bottom div img").first().show().last().hide();
   $(".navbar-fixed-bottom .none").hide();
   $(".navbar-fixed-bottom .f_active").show();
 
 $(this).find(".none").show();
   $(this).find(".f_active").hide();
	
	
});

/*hof**************************/
$(document).on("tap",".big_img2",function()
{

$("#pop").hide();
$(this).hide();
});



$(document).on("tap",".hof_div .img-ron",function()
{
//alert($(this).attr("src"))
$(".big_img2").attr("src",$(this).attr("src")).show().center();
$("#pop").show();
});
$(".hof_toggle").on("tap",function()
{



	$(".hof_pop").effect('slide', { direction: 'right', mode: 'show' });


});
$(".hof_pop").on("tap",function()
{
	$(this).effect('slide', { direction: 'right', mode: 'hide' });

});


$(".hof_div .ron").load("http://matchdrobe.com/app/arena/arena_functions.php",{hof: 1});


/*looks **********************************/
$(".looks_div .gender,.profile_div .looks").load("http://matchdrobe.com/app/arena/arena_functions.php",{looks: 1,user_id: localStorage.user_id});
jQuery.fn.center = function () {
    this.css("position","fixed");
	//Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
      //                                          $(window).scrollTop()) +  center height
    this.css("top", "0px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}

$(document).on("tap",".looks .img-ron",function()
{
//alert($(this).attr("src"))
$(".img_looks2").attr("src",$(this).attr("src")).show().center();

});
$(document).on("tap",".looks_div .ron img ",function()
{
$(".big_img2").attr("src",$(this).attr("src")).css('display', 'inline-block').center();
$("#pop").show();
$( "body" ).scrollTop( 0 );

})

$(".big_img2").on("tap", function()
{

$("#pop").hide();

$(".popup").hide();
});

/*****************settings ******************/

$("#logout").on("tap",function()
{

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

