// 点击抽奖跳转
$(".prize").on('click', function(){
    location.assign("prizeB.html");
});
// 定时刷新页面	
var page = $(".show-container");
var time1;
setInterval(function(){
    // planB
    // 收起
    // $(".window").first().slideUp(700);
	// 添加
    clearInterval(time1);
    $(".show-container").append(
        "<div class='window'>" +
        "<div class='information col-lg-3 col-md-3 col-sm-3 col-xs-3'>" +
        "<div class='avatar'>" +
        "<img class='img-responsive' src='img/2.jpg'>" +
        "</div></div>" +
        "<div class='show col-lg-8 col-md-8 col-sm-8 col-xs-8'>" +
        "<h3><strong>沃德天·维神墨：</strong></h3>" +
        "<h1>柔软舒适，格纹色彩均很满意，前胸后背均有仿羊羔绒保暖</h1>" +
        "</div></div>"
        );
    // $(".window").last().hide();
    // 定时删掉
    // setTimeout(function(){
    //     $('.window').first().remove();
    //     $(".window").last().fadeIn(700);
    // }, 705);

    // planA
    // setTimeout(function(){

    //     $(".window:first-child").remove();
    // },500);
    // $(".window").animate({ 
    //     top: '-25%'
    // },
    // { 
    //     easing: 'easeInOutQuad', 
    //     duration: 500,
    //     complete: function () {
    //         $(".window").css('top','0');
    //         // $(".window").eq(0).remove();
    //     } 
    // });
    
    
        time1 = setInterval(function(){
            // if(page.scrollTop() == page[0].scrollHeight) {
            //     alert('a');
                
            // }
            page.scrollTop(page.scrollTop()+1);
        },1);
        // setTimeout(function(){
        //     $(".window:first-child").remove();
        // },1500);
        
    // });
},4000);



