var windowWidthWra = $(window).width();

//头部
function widthsize(){
    
    var windowWidth = $(window).width();
    var windowheight = $(window).height();
    


    

    //搜索框
    $('.header .Search input[type="text"]').focus(function(){
        $(this).parents('.Search').addClass('active');
    });
    $('.header .Search input[type="text"]').blur(function(){
        $(this).parents('.Search').removeClass('active');
    });

     $('.Search-Top .Search-Topinput .text').focus(function(){
        $(this).parents('.Search-Topinput').addClass('active');
    });
    $('.Search-Top .Search-Topinput .text').blur(function(){
        $(this).parents('.Search-Topinput').removeClass('active');
    });


    if(windowWidth >= 1200){
        //导航滑动条
        // var Nav_width = $('.header .navbar-nav > li').width()+1;
        var Nav_width = 114;
        var Nav_active = $('.header .navbar-nav > li.active').index();
        $('.header .Nav-Wra .huadong').css({'left':(Nav_active*Nav_width)+'px'});

        $('.header .navbar-nav > li > a').hover(function(){
            var Nav_left = $(this).parents().index();
            $('.header .Nav-Wra .huadong').css({'left':(Nav_left*Nav_width)+'px'});
        },function(){
            $('.header .Nav-Wra .huadong').css({'left':(Nav_active*Nav_width)+'px'});
        });
    };
    if(windowWidth > 991 && windowWidth < 1200){
        //导航滑动条
        // var Nav_width = $('.header .navbar-nav > li').width()+1;
        var Nav_width = 94;
        var Nav_active = $('.header .navbar-nav > li.active').index();
        $('.header .Nav-Wra .huadong').css({'left':(Nav_active*Nav_width)+'px'});

        $('.header .navbar-nav > li > a').hover(function(){
            var Nav_left = $(this).parents().index();
            $('.header .Nav-Wra .huadong').css({'left':(Nav_left*Nav_width)+'px'});
        },function(){
            $('.header .Nav-Wra .huadong').css({'left':(Nav_active*Nav_width)+'px'});
        });
    };
    if(windowWidth >= 992){
       //开润业务内容导航
       var BusinessNavBg = 220;
       var BusinessNav = $('.Business-content-Nav ul li.active').index();
       $('.Business-content-Nav .Bg').css({'left':BusinessNav*BusinessNavBg+'px'});
       $('.Business-content-Nav ul li').hover(function(){
         $('.Business-content-Nav ul li').removeClass('active');
         $(this).addClass('active');
         var BusinessThis = $(this).index();
        $('.Business-content-Nav .Bg').css({'left':BusinessThis*BusinessNavBg+'px'});
     },function(){
         $('.Business-content-Nav ul li').removeClass('active');
         $('.Business-content-Nav ul li').eq(BusinessNav).addClass('active');
         $('.Business-content-Nav .Bg').css({'left':BusinessNav*BusinessNavBg+'px'});
       });

       //联系我们
       var Contact_Us_Width = $('.Contact_Us .Contact_Us_Hover .Top ul li').width();
       $('.Contact_Us .Contact_Us_Hover .Top ul li').hover(function(){
          $('.Contact_Us .Contact_Us_Hover .Top ul li').removeClass('active');
          $(this).addClass('active');
          var Contact_Us_Index = $(this).index();
          $('.Contact_Us .Contact_Us_Hover .Top .Bg').css({'left':Contact_Us_Index*Contact_Us_Width+'px','width':+Contact_Us_Width+'px'});
          $('.Contact_Us .Contact_Us_Hover .Bottom ul li').removeClass('active');
          $('.Contact_Us .Contact_Us_Hover .Bottom ul li').eq(Contact_Us_Index).addClass('active');
       }); 
    };
    if(windowWidth < 992){
        $('.Map-address').click(function(){
            $('.Map-Fd').hide();
            $(this).find('.Map-Fd').show();
        });
        //联系我们
       var Contact_Us_Width = $('.Contact_Us .Contact_Us_Hover .Top ul li').width();
       $('.Contact_Us .Contact_Us_Hover .Top ul li').click(function(){
          $('.Contact_Us .Contact_Us_Hover .Top ul li').removeClass('active');
          $(this).addClass('active');
          var Contact_Us_Index = $(this).index();
          $('.Contact_Us .Contact_Us_Hover .Top .Bg').css({'left':Contact_Us_Index*Contact_Us_Width+'px','width':+Contact_Us_Width+'px'});
          $('.Contact_Us .Contact_Us_Hover .Bottom ul li').removeClass('active');
          $('.Contact_Us .Contact_Us_Hover .Bottom ul li').eq(Contact_Us_Index).addClass('active');
       }); 
	   /*底部二维码*/
	   $('.footer-A-Nei a.erwei').click(function(){
		   $(this).toggleClass('show');
		   $(this).siblings('.erwei').removeClass('show');
	   });
    };
    //新闻特别摘要  截取字符
    var hide_txt1_top = 120;
    var hide_txt1 = 75;
    if(windowWidth >= 1200 ){
        var hide_txt1_top = 120;
    };
    if(windowWidth < 1200 && windowWidth >= 992){
        var hide_txt1_top = 80;
    };
    if(windowWidth < 992 && windowWidth >= 768) {
        var hide_txt1_top = 50;
        var hide_txt1 = 100;
    };
    if(windowWidth < 768){
        var hide_txt1_top = 1500;
        var hide_txt1 = 1500;
    };
    $(".News-content .News-content-A .text p").each(function() {
        if ($(this).text().length > hide_txt1_top) {
            $(this).html($(this).text().replace(/\s+/g, "").substr(0, hide_txt1_top) + "...")
        }
     });
    //新闻列表文字截取
    $(".News-Div-Wra .row > a p").each(function() {
        if ($(this).text().length > hide_txt1) {
            $(this).html($(this).text().replace(/\s+/g, "").substr(0, hide_txt1) + "...")
        };
     });

    //开润业务
    var Business_w = 600;
    var Business_h = 244;
    var gfwid = $('.Business-B .Business-B-Nei div a img').width();

    var Business_s = Business_h / Business_w * gfwid ;
    $('.Business-B .Business-B-Nei').height(Business_s);

    
   

    //首页栏目的视频
    // var arr_video = [];
    // for(var i=0; i<$('.Home-content .News-Div-Wra .row > div').length; i++){
    //     var asd_videohei = $('.Home-content .News-Div-Wra .row > div').eq(i).height();
    //     arr_video[i] = asd_videohei;
    // };
    // var _Style_video = Math.max.apply(null, arr_video);
    // $('.Home-content .video').height(_Style_video);



/*返回顶部 开始*/
    function myEvent(obj,ev,fn){
    if(obj.attachEvent){
        obj.attachEvent('on'+ev,fn);
    }else{
        obj.addEventListener(ev,fn,false);
    }
}
myEvent(window,'load',function(){

    var oRTT=document.getElementById('rtt');
    var sho=document.getElementById('sho');
    // var pH=document.documentElement.clientHeight;
    var pH=windowheight;
    var timer=null;
    var scrollTop;
    window.onscroll=function(){
        scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        if(scrollTop>=pH){
            $('#sho').show();
            $('#rtt').show();
        }else{
            $('#sho').hide();
            $('#rtt').hide();
        }
        return scrollTop;
    };
    $('#rtt').click(function(){
        clearInterval(timer);
        timer=setInterval(function(){
            var now=scrollTop;
            var speed=(0-now)/10;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            if(scrollTop==0){
                clearInterval(timer);
            }
            document.documentElement.scrollTop=scrollTop+speed;
            document.body.scrollTop=scrollTop+speed;
        }, 30);
    });
});
/*返回顶部 结束*/




};


    




/*浏览器动态*/
widthsize();
$(window).resize(function(){
  widthsize();
});




//加入我们 校园招聘  下拉显示
$('.Join_Us_C_ClickDiv .onclick_A').click(function(){
    $(this).parents('.Join_Us_C_ClickDiv').siblings('.Join_Us_C_ClickDiv').find('.Join_Us_C_hide').slideUp();
    $(this).siblings('.Join_Us_C_hide').slideToggle();
    $(this).parents('.Join_Us_C_ClickDiv').siblings('.Join_Us_C_ClickDiv').find('.onclick_A').removeClass('active');
    $(this).toggleClass('active');
});








/*移动端导航显示 开始*/
var navToggle = 1; //nav-toggle是否点击控制器
$(".header .container-fluid .navbar-toggle").click(function(event) {
    $('.find-nav-height').hide();
    if (navToggle) {
        $(this).removeClass("active-toggle");
        $('#example-navbar-collapse').show();
        navToggle = 0
    } else {
        $(this).addClass("active-toggle");
        $('#example-navbar-collapse').hide();
        navToggle = 1
    };
    
    
    $(this).toggleClass("active-toggle");
});
/*移动端导航显示 结束*/

//首页二级导航菜单
$('.header-Nei').hover(function(){
    $('.header').removeClass('active');
});

$('.find_nav_fu').click(function(){
    $('.find_nav_fu ul').hide();
    $(this).find('ul').show();
    $('.find-nav-height').show();
    $('.find-nav-height').removeClass('this');
    
});

$(window).scroll(function(){
    var windowscrollT = $(window).scrollTop();
    if(windowscrollT>=5){
        $('.header .navbar-nav > li ul,.find-nav-height').hide();
    };
});

//搜索
$('.sousuo-click').click(function(){
    $('.find-nav-height').show();
    $('.find-nav-height').addClass('this');
    if(windowWidthWra<768){
        $('#example-navbar-collapse').hide();
    };
    $('.header .navbar-nav > li ul').hide();
    $(".header .container-fluid .navbar-toggle").removeClass("active-toggle");
    navToggle = 1
});
//关闭搜索
$('.header .Search_Wra div.f-r').click(function(){
    $('.find-nav-height').hide();
});

//阻止二级菜单采用一级菜单的事件
$('.header .navbar-nav > li > ul li').hover(function(e){
     e.stopPropagation();//阻止冒泡
});


/*移动端导航搜索框*/
$('.headerLogo .headerInput .headerInput-A input[type="text"]').focus(function(){
    $(this).parent().addClass('focus1');
});
$('.headerLogo .headerInput .headerInput-A input[type="text"]').blur(function(){
    $(this).parent().removeClass('focus1');
});
/*移动端 关于我们导航*/
$('.content_Nav_Toggle').click(function(){
    $('.content_Nav').stop(false,true).stop().slideToggle();
});



//页面动画
function animation(obj, animate) {//两个参数 第一个是时间 第二个是动画方式
    var sh = $(document).scrollTop(); //滚动条高度
    var wh = $(window).height(); //浏览器下窗口可视区域高度
    $(obj).each(function(index, el) {
        var tt = $(this).offset().top;  //偏移头部的距离
        var delay = "delay" + parseInt(index + 1);
        if (tt < sh + wh) {
            $(this).addClass(animate + " " + delay);
        }
    });

    $(window).scroll(function() {
        sh = $(document).scrollTop(); //滚动条高度
        wh = $(window).height(); //浏览器时下窗口可视区域高度
        $(obj).each(function() {
            var tt = $(this).offset().top;
            if (tt < sh + wh) {
                $(this).addClass('delay1 ' + animate);
            }
        });
    })
}



