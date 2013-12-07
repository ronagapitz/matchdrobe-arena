document.addEventListener("orientationchange", updateLayout);

    var currentPage = 0;
// The wrapperWidth before orientationChange. Used to identify the current page number in updateLayout();
wrapperWidth = 0;
var foot_select = 1;
var myScroll = new iScroll('pageWrapper', {
onScrollEnd: function()
{

    if (wrapperWidth > 0) {
        currentPage = - Math.ceil( $('#pageScroller').position().left / wrapperWidth);
		
		current = currentPage + 1;
		$(".navbar-fixed-bottom div .f_active").show();
   $(".navbar-fixed-bottom .none").hide();
   $('#f'+current+ " .none").show();
      $('#f'+current+ " .f_active").hide();
looksScroll.refresh();
	feedScroll.refresh();
	followersScroll.refresh();
	
	hofScroll.refresh();
   
    }

	//alert(currentPage);



},
	snap: true,
	momentum: false,
	hScrollbar: false,
	vScrollbar: false,
    lockDirection: true,click: true});
	
//	page3Scroll = new iScroll('wrapper', {hScrollbar: false, vScrollbar: false, lockDirection: true });
looksScroll = new iScroll('wrapper_looks', {hScrollbar: false, vScrollbar: false, lockDirection: true });
feedScroll = new iScroll('wrapper_feeds', {hScrollbar: false, vScrollbar: false, lockDirection: true });
hofScroll = new iScroll('wrapper_hof');
followersScroll = new iScroll('wrapper_followers', {hScrollbar: false, vScrollbar: false, lockDirection: true });




updateLayout();

function updateLayout() {


    if (wrapperWidth > 0) {
        currentPage = - Math.ceil( $('#pageScroller').position().left / wrapperWidth);
    }

    wrapperWidth = $('#pageWrapper').width();

    $('#pageScroller').css('width', wrapperWidth * 8);
    $('.page').css('width', wrapperWidth - 40);
    myScroll.refresh();
    myScroll.scrollToPage(currentPage, 0, 0);
	//page3Scroll.refresh();
	looksScroll.refresh();
	feedScroll.refresh();
	followersScroll.refresh();
	
	hofScroll.refresh();
}



$(function()
{
arena_url = "http://matchdrobe.com/app/arena/arena_functions.php";
//feeds
$(document).on("tap","img.heart", function()
{
if($(this).attr("src") == 'img/heart.png')
{
likes = $(this).parent().find("span");
$(this).attr("src","img/heart_fill.png");
likes.text(parseInt(likes.text()) + 1);

$(this).parent().next().find(".unliker").attr("src","img/broken.png");
$.post(arena_url,{feed_id: $(this).attr("data-id"), user_id: localStorage.user_id, feed_liker: 1},function(e)
{
//alert(e);
});

}

/*
else if($(this).attr("src") == 'img/heart_fill.png')
{

$(this).attr("src","img/heart.png");
}*.*/

else if($(this).attr("src") == 'img/broken.png')
{
likes = $(this).parent().find("span");
likes.text(parseInt(likes.text()) + 1);

$.post(arena_url,{feed_id: $(this).attr("data-id"), user_id: localStorage.user_id, feed_unliker: 1},function(e)
{


});


$(this).attr("src","img/broken_fill.png");
$(this).parent().prev().find(".liker").attr("src","img/heart.png");

}
/*
else if($(this).attr("src") == 'img/broken_fill.png')
{

$(this).attr("src","img/broken.png");
}*/

});

$("input").on("tap",function()
{

$(this).focus();
});

$("#f4").on("tap",function()
{


});
function init()
{


$("#wrapper_feeds,#wrapper_looks").css("margin-top",$(".feed_tab").height()+20);
$("#profile_activity .container, .feed_div .container").load("http://matchdrobe.com/app/arena/arena_functions.php?my_activity="+localStorage.user_id,function()
{
updateLayout();
});


	$(".profile_name").text(localStorage.full_name);
				$(".profile_desc").text(localStorage.about);
		$(".profile_pic img").attr("src", localStorage.dp);

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
$(".pair .cont").empty().load("http://matchdrobe.com/app/arena/",function()
{
updateLayout();
});


/* adjust header height */

function adjust_arena()
{

$("#profile_nav img").attr("src","img/profile_nav.jpg");
 //$("#1").attr("src","img/profile_nav_h.jpg");
//$(".looks_div .container").css({"margin-top":$(".looks_tab").height() + 20});
//$(".feed_div .container").css({"margin-top":$(".nav_feed").height() + 20});


$(".adjust_container").css({
"padding-bottom": $("#f1").height()+40

});

$(".pair").css("margin-top",$(".navbar_arena").height() + 10);


}
 var email_width = 	$( window ).width() * .95;
	
	$("div.email").width(email_width);
			$("div.email").height( ($("div.email").width() * (.090))).css({"visibility":"visible","margin-bottom" : $("div.email").height()+'px'});
//alert($("div.email").width());

$(".login_div, .register_div").css( { "padding-bottom":($("div.email").width() * (.17))});

		$(".login_start").on('tap', function(e) {
	//alert();
	

	$(".login_div").show();
	$(".login_div .container").css({"margin-top": $(".nav_log").height()+20});
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
		$(".profile_pic img").attr("src", localStorage.dp);

		$(".profile_name").text(localStorage.full_name);
				$(".profile_desc").text(localStorage.about);
updateLayout();

	//alert("Login Successful");
					//	  document.location.href = 'f_style_tribe.html';

					$(".login_div").hide();
					$(".tribe_div").show("slide");
					//	page3Scroll.refresh();
						$("#wrapper").css("margin-top",$(".navbar_tribe").css("height"));

$("#profile_follow .container").load("http://matchdrobe.com/app/arena/arena_functions.php",{followers: localStorage.user_id },function()
{
updateLayout();
});

						
	 }
	 else
	 {
	 
	 alert("error: please check your username/password !");
	 }
	 }, "json");
	 
	 }
	});
	$(".regtab").on('tap', function(e) {
	
			$(".main_page").show();
			$(".login_div,.register_div").hide();
			
			return false;

	});
	
	//reg 
	
	
	$(".reg_start").on('tap', function(e) {
	//alert();
	

	$(".register_div").show();
		$(".register_div .container").css({"margin-top": $(".nav_reg").height()+20});

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

$(".main_page, .register_div, .login_div").hide();
 $("#f1 img").toggle();

 $(".navbar-fixed-bottom").css("visibility","visible");

 $(".frame").css("visibility","visible");
 adjust_arena();
// $(".tribe_div,.main_page").hide();
$(".pair .cont").empty().load("http://matchdrobe.com/app/arena/",function()
{
updateLayout();

});

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
 $(".frame").css("visibility","visible");
 updateLayout();
adjust_arena();
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


$img = {src: $(this).attr("data-src"),
id : "#"+$(this).attr("id"),
tid : $(this).attr("data-id")


};
$(".big_img").attr("src",$img.src);

//$(".gender, .choose_style").hide("scale");
$("#pop,.big_style").show();
//$(this).css({'opacity': '.6'});

});

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

$("#profile_follow .container").load("http://matchdrobe.com/app/arena/arena_functions.php",{followers: localStorage.user_id },function()
{
updateLayout();
});
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

$("#profile_follow .container").load("http://matchdrobe.com/app/arena/arena_functions.php",{followers: localStorage.user_id },function()
{
updateLayout();
});

});
$(document).on("tap",".pop_back",function()
{
$("#pop").hide();
$(".popup").hide("slide");

});
$(document).on("tap",".skip",function()
{
	$(".pair .cont").empty().load("http://matchdrobe.com/app/arena/",function()
	{
	updateLayout();
	});

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
	user_id : localStorage.user_id, item_like : $id, full_name : localStorage.full_name,img_liked : $img_liked,
	img_user: localStorage.dp},function(e)
	{
	//alert(e);
	$("#profile_activity .container,.feed_div .").load("http://matchdrobe.com/app/arena/arena_functions.php?my_activity="+localStorage.user_id,function()
	{
	updateLayout();
	});

	
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

	$(".pair .cont").empty().load("http://matchdrobe.com/app/arena/",function()
	{
	updateLayout();
	
	});

	});

	
	$(document).on('tap','.top_tags',function()
	{
	 array_tag.push( $(this).text() );
	$(this).css({'background':'#b80941','color': 'white'});

	
	
	
	});


/* footer *********************** //**/



$(".navbar-fixed-bottom div").on("tap",function() {
updateLayout();


url = $(this).attr("data-url");
myScroll.scrollToPage(url, 0, 0);
$( "body" ).scrollTop( 0 );
if(url == '.profile_div')
{
//$("body").css("overflow-x", "hidden");
current = 1;
 $("#profile_nav img").attr("src","img/profile_nav.jpg");
 $("#1").attr("src","img/profile_nav_h.jpg");
$(".setter,#profile_nav").show("slide");
}



updateLayout();

//$(".adjust_container").hide();

 
//$(url).show("slide");
 adjust_arena();
 if(url == '.hof_div')
{

hofScroll.refresh();
}

/*
 if(url == '.looks_div')
{
$(".looks_div .container").css({"margin-top":$(".looks_tab").height() + 20});
looksScroll.refresh();
}
if(url == '.feed_div')
{
$(".feed_div .container").css({"margin-top":$(".nav_feed").height() + 20});

feedScroll.refresh();

}  */
// loaded();
$(".navbar-fixed-bottom div .f_active").show();
   $(".navbar-fixed-bottom .none").hide();
   $(".none", this).show();
      $(".f_active", this).hide();

   
 
 	
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


$(".hof_div .ron").load("http://matchdrobe.com/app/arena/arena_functions.php",{hof: 1},function()
{
updateLayout();

});


/*looks **********************************/
$(".looks_div .gender,.profile_div .looks").load("http://matchdrobe.com/app/arena/arena_functions.php",{looks: 1,user_id: localStorage.user_id},function()

{

updateLayout();
});
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
//localStorage.clear();


$("#logout").on("tap",function()
{

localStorage.clear();
document.location.href = 'intdex.html';

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

