/*
 <!-- These are the notifications that are displayed to the user through pop-ups if the above JS files does not exist in the same directory-->
            if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
            if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
            if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
            
            FB.Event.subscribe('auth.login', function(response) {
                               alert('auth.login event');
                               });
            
            FB.Event.subscribe('auth.logout', function(response) {
                               alert('auth.logout event');
                               });
            
            FB.Event.subscribe('auth.sessionChange', function(response) {
                               alert('auth.sessionChange event');
                               });
            
            FB.Event.subscribe('auth.statusChange', function(response) {
                               alert('auth.statusChange event');
                               });
            
           function getSession() {
                alert("session: " + JSON.stringify(FB.getSession()));
            }
            
            function getLoginStatus() {
                FB.getLoginStatus(function(response) {
                                  if (response.status == 'connected') {
                                  alert('logged in');
                                  } else {
                                  alert('not logged in');
                                  }
                                  });
            }
            var friendIDs = [];
                        var fdata;
            function me() {
                FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
                       if (response.error) {
                       alert(JSON.stringify(response.error));
                       } else {
                       var data = document.getElementById('data');
                                           fdata=response.data;
                                           console.log("fdata: "+fdata);
                       response.data.forEach(function(item) {
                                             var d = document.createElement('div');
                                             d.innerHTML = "<img src="+item.picture+"/>"+item.name;
                                             data.appendChild(d);
                                             });
                       }
                                        var friends = response.data;
                                        console.log(friends.length); 
                                        for (var k = 0; k < friends.length && k < 200; k++) {
                                        var friend = friends[k];
                                        var index = 1;

                                        friendIDs[k] = friend.id;
                                        //friendsInfo[k] = friend;
                                        }
                                        console.log("friendId's: "+friendIDs);
                       });
            }
            
            function logout() {
                FB.logout(function(response) {
                          alert('logged out');
                          });
            }
            
            function login() {
                FB.login(
                         function(response) {
                         if (response.session) {
                         alert('logged in');
                         } else {
                         alert('not logged in');
                         }
                         },
                         { scope: "email" }
                         );
            }
                        
                        
                        function facebookWallPost() {
                            console.log('Debug 1');
                                var params = {
                                    method: 'feed',
                                    name: 'Facebook Dialogs',
                                    link: 'https://developers.facebook.com/docs/reference/dialogs/',
                                    picture: 'http://fbrell.com/f8.jpg',
                                    caption: 'Reference Documentation',
                                    description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
                                  };
                                console.log(params);
                            FB.ui(params, function(obj) { console.log(obj);});
                        }
            
                        function publishStoryFriend() {
                                randNum = Math.floor ( Math.random() * friendIDs.length ); 

                                var friendID = friendIDs[randNum];
                                if (friendID == undefined){
                                        alert('please click the me button to get a list of friends first');
                                }else{
                                    console.log("friend id: " + friendID );
                                console.log('Opening a dialog for friendID: ', friendID);
                                var params = {
                                        method: 'feed',
                                    to: friendID.toString(),
                                    name: 'Facebook Dialogs',
                                    link: 'https://developers.facebook.com/docs/reference/dialogs/',
                                    picture: 'http://fbrell.com/f8.jpg',
                                    caption: 'Reference Documentation',
                                    description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
                                     };
                                        FB.ui(params, function(obj) { console.log(obj);});
                            }
                        } 
						
					*/
						 
document.addEventListener("orientationchange", updateLayout);
  document.addEventListener('deviceready', function() {
                                      try {
                                     // alert('Device is ready! Make sure you set your app_id below this alert.');
                                      FB.init({ appId: 408729362586583, nativeInterface: CDV.FB, useCachedDialogs: false });
                                      document.getElementById('data').innerHTML = "";
                                      } catch (e) {
                                     // alert(e);
                                      }
                                      }, false);
									 

    var currentPage = 0;
// The wrapperWidth before orientationChange. Used to identify the current page number in updateLayout();
wrapperWidth = 0;
var foot_select = 1;

//sharer
$("img#sharer").on("tap",function()
{
$src = $("img.big_img2").attr("data-url");
window.plugins.socialsharing.share(null, null, $src, null);

});


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
looksScroll = new iScroll('wrapper_looks', {hScrollbar: false, vScrollbar: false, lockDirection: true,
onScrollEnd: function () {
   // $('#wrapper_feeds').trigger('scroll');
	//alert(feedScroll.y);

	if((looksScroll.y) * (-1) >= ( ($('#wrapper_looks .scroller').height() -1500)))
	{
			$.post("http://matchdrobe.com/app/arena/arena_functions.php",{looks:localStorage.user_id,user_id: localStorage.user_id,offset:off_looks},function(e)
			{
			$('#wrapper_looks div.gender').append(e);
			looksScroll.refresh();
off_looks+=9;
			});

	}
	}
	
 });
 	off= 6;
	off_looks = 9;
add = 1500;
feedScroll = new iScroll('wrapper_feeds', {hScrollbar: false, vScrollbar: false, lockDirection: true,onScrollEnd: function () {
   // $('#wrapper_feeds').trigger('scroll');
	//alert(feedScroll.y);
//alert($('#wrapper_feeds .scroller').height());
	if((feedScroll.y) * (-1) >= ( ($('#wrapper_feeds .scroller').height() - add)))
	{
			$.get("http://matchdrobe.com/app/arena/arena_functions.php",{my_activity:1,offset:off},function(e)
			{
			
			$('#wrapper_feeds .scroller .container').append(e);
			feedScroll.refresh();
off+=6;
			});

			//add +=100;
	}
	}



});
hofScroll = new iScroll('wrapper_hof', {hScrollbar: false, vScrollbar: false, lockDirection: true,
onScrollEnd: function () {
    $('#wrapper_hof').trigger('scroll');
}
 });
followersScroll = new iScroll('wrapper_followers', {hScrollbar: false, vScrollbar: false, lockDirection: true });



updateLayout();

function updateLayout() {


    if (wrapperWidth > 0) {
        currentPage = - Math.ceil( $('#pageScroller').position().left / wrapperWidth);
    }

    wrapperWidth = $('#pageWrapper').width();

    $('#pageScroller').css('width', wrapperWidth * 8);
    $('.page').css('width', wrapperWidth);
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

//localStorage.clear(); 

arena_url = "http://matchdrobe.com/app/arena/arena_functions.php";
//feeds
function profile(name)
{
myScroll.scrollToPage(4, 0, 0);
$.post(arena_url,{full_name: name,profile: 1},function(e)
{
$("div.profile_name").text(e.name);
$("div.profile_pic img").attr("src",e.pic);
$("div.profile_desc").text(e.about);
$("div.followers span").text(e.followers);

$("div.following span").text(e.following);

},"json");
 $(".popup,#pop").hide();
}

//followers to profile


//feed to profile
$(document).on("tap","img.feed_user, .f_pic img",function()
{
profile($(this).attr("data-name"));
});
$(document).on("tap","img.heart", function()
{
if($(this).attr("src") == 'img/heart.png')
{
likes = $(this).parent().find("span");
$(this).attr("src","img/heart_fill.png");
likes.text(parseInt(likes.text()) + 1);
likes2 = $(this).parent().next().find("span");
if(parseInt(likes2.text()) >0)
{
likes2.text(parseInt(likes2.text()) - 1);

}

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
likes2 = $(this).parent().prev().find("span");
if(parseInt(likes2.text()) >0)
{
likes2.text(parseInt(likes2.text()) - 1);

}


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


$("#wrapper_feeds,#wrapper_looks,#wrapper_hof,div.pair").css({"margin-top":$(".feed_tab").height()+40,"margin-bottom":$(".feed_tab").height()+100});
$("#profile_activity .container, .feed_div .container").load("http://matchdrobe.com/app/arena/arena_functions.php?offset=0&my_activity="+localStorage.user_id,function()
{

updateLayout();

//lazy_feed = $("div.activity_item img.lazy");

//lazy_feed.height(lazy_feed.width()*2.1);
});


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

load_arena();


/* adjust header height */

 $.adjust = function adjust_arena()
{
$(".page").height($(window).height());

$("#profile_nav img").attr("src","img/profile_nav.jpg");
 //$("#1").attr("src","img/profile_nav_h.jpg");
//$(".looks_div .container").css({"margin-top":$(".looks_tab").height() + 20});
//$(".feed_div .container").css({"margin-top":$(".nav_feed").height() + 20});


$(".adjust_container").css({
"padding-bottom": $("#f1").height()+40,
"padding-top": $("#f1").height()


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

$.post(arena_url,{full_name: localStorage.full_name,profile: 1},function(e)
{
$("div.profile_name").text(e.name);
$("div.profile_pic img").attr("src",e.pic);
$("div.profile_desc").text(e.about);
$("div.followers span").text(e.followers);

$("div.following span").text(e.following);

},"json");
 $(".popup,#pop").hide();
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



if(localStorage.tribe =="full")
{
profile(localStorage.full_name);
myScroll.scrollToPage(2, 0, 0);

$(".main_page, .register_div, .login_div").hide();
 $("#f1 img").toggle();

 $(".navbar-fixed-bottom").css("visibility","visible");

 $(".frame").css("visibility","visible");
 $.adjust();
// $(".tribe_div,.main_page").hide();

load_arena();

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
	
load_arena();

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
profile($(this).attr("data-user"));
});

$("div.cont").on("tap", "a.arena_img", 
	function(){
$(".follow").attr('data-id',$(this).attr("data-userid"));
		//$(".like_modal .tag_content").empty();
$(".fb_photo").attr({"src": $(this).attr("data-photo"),"data-user":$(this).attr("data-name"),
"data-user":$(this).attr("data-full")} );

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
        if ( event.keyCode == 32 ) {
		  //  alert($(this).val());
	
		if($(this).val() !== "")
		{
			 		var str = $(this).val();

if(str.indexOf("#") == 0 || str.indexOf("#") == 1)
{
		 array_tag.push( $('.tagg').val() );
		 		         $('#tag_area').append('<span class="ctag pink" >'+$('.tagg').val()+' </span>');

		 }
		 else
		 {
		 		         $('#tag_area').append('<span class="ctag" >'+$('.tagg').val()+' </span>');

						  
		 }
		 						;
								

		
		//$('.tagg').focus().val('');
		}
	$(this).val("");

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
	img_user: localStorage.dp,img1_id: $("#h1").val(),img2_id: $("#h3").val()},function(e)
	{
	//alert(e);
	$("#profile_activity .container,.feed_div .").load("http://matchdrobe.com/app/arena/arena_functions.php?offset=0&my_activity="+localStorage.user_id,function()
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

load_arena();

	});

	
	$(document).on('tap','.top_tags',function()
	{
	 array_tag.push( $(this).text() );
	//$(this).css({'background':'#b80941','color': 'white'});
		 		         $('#tag_area').append('<span class="ctag pink" >'+$(this).text()+' </span>');

	
	
	
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
$.adjust();
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



$(document).on("tap",".f_items img",function()
{
//alert($(this).attr("src"))

$(".big_img2").attr({"src":$(this).attr("src"),"data-url":$(this).attr("data-url")}).css('display', 'inline-block').center();
$("#pop").show();
$("#popup").show().center();
zoom = new iScroll('popup', { zoom:true });
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
$(".looks_div .gender,.profile_div .looks").load("http://matchdrobe.com/app/arena/arena_functions.php",{looks: 1,user_id: localStorage.user_id,offset:0},function()

{

updateLayout();
});
jQuery.fn.center = function () {
  //  this.css("position","fixed");
	//Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
      //                                          $(window).scrollTop()) +  center height
    this.css("top", "0px");
   // this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
   //                                             $(window).scrollLeft()) + "px");
    return this;
}


$(document).on("tap",".looks_div .ronz img, div.activity_item img,.hof_div .img-ron",function()
{
zoom = new iScroll('popup', { zoom:true,hScrollbar: false, vScrollbar: false });

$("#pop_con").load(arena_url,{single: $(this).attr('data-id')},function()
{
zoom.refresh();

});

$(".big_img2").attr({"src":$(this).attr("data-big"),"data-url":$(this).attr("data-url")}).css('display', 'block');
$("#pop").show();
$("#popup").show();

});

$(".big_img2").on("tap", function()
{

$("#pop").hide();

$("#popup").hide();


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


   function takePicture()
   {
      navigator.camera.getPicture( function( imageURI ) {
        alert( imageURI );
      });
	  
	  }
	  
	  
	  
	  function load_arena()
	  {
	  $(".pair .cont").empty().load("http://matchdrobe.com/app/arena/",function()
	{
	$("a.arena_img img").delay( 1000 ).fadeIn();
	updateLayout();
$.adjust();

	});
	  
	  }
