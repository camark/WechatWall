// 点击抽奖跳转
$(".prize").on('click', function(){
    location.assign("prizeB.html");
});
var time1,time2,getTimer;
// 页面加载完后触发
$(function(){
    getData();
    wallScroll();
    $(window).on('blur',function(){
        clearInterval(time1);
        clearInterval(time2);
    });
    $(window).on('focus',function(){
        wallScroll();
    });
})

// 定时获取数据
function getData() {
    getTimer = setInterval(Ajax, 3000);
}

// 微信墙滚动
function wallScroll() {
    var page = $(".show-container");
    var wHeight = $(".window").height();
    var iHeight;
    // 将show的margin-top取出并转换为number
    // var showMargin = parseFloat($(".show").css('margin-top').split("px")[0]);
    time2 = setInterval(function(){
        var sHeight = page.scrollTop();
        console.log(page.scrollTop());
        clearInterval(time1);
        time1 = setInterval(function(){
            iHeight = page.scrollTop() + 1;
            page.scrollTop(iHeight);
            if((iHeight - sHeight) >= wHeight){
                clearInterval(time1);
            }
        },8);
    },6000);
}

// Ajax
function Ajax() {

    $.ajax({ 
        type: "GET",    
        url: "http://2.934067696.sinaapp.com/index.php",
        dataType:'jsonp',  
        data:'',  
        jsonp:'callback',  
        success:function(result) { 
            console.log(result);
            $(".show-container").append(
                "<div class='window'>" +
                "<div class='information col-lg-3 col-md-3 col-sm-3 col-xs-3'>" +
                "<div class='avatar'>" +
                "<img class='img-responsive' src='" + result.avatar + "'>" +
                "</div></div>" +
                "<div class='show col-lg-9 col-md-9 col-sm-9 col-xs-9'>" +
                "<h3><strong>" + result.name + "</strong></h3>" +
                "<h1>" + result.words  + "</h1>" +
                "</div></div>"
            );
                    
        },  
        timeout:3000, //请求超时时间
        error: function(jqXHR){     
            console.log("发生错误：" + jqXHR.status);  
        },     
    });
}

// 添加emoji
// twemoji.parse(
//   'I \u2764\uFE0F emoji!',
//   function(icon, options, variant) {
//     return '/emoji/' + options.size + '/' + icon + '.gif';
//   }
// );