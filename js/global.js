var time1,time2,getTimer;
var curMsg = 1;
var msg = 0; 
// 页面加载完后触发
$(function(){
    getData();
    wallScroll();
//     // $(window).on('blur',function(){
//     //     clearInterval(time1);
//     //     clearInterval(time2);
//     // });
//     // $(window).on('focus',function(){
//     //     wallScroll();
//     // });
})

// 定时获取数据
function getData() {
    getTimer = setInterval(Ajax, 1000);
}

// 微信墙滚动
function wallScroll() {
    var page = $(".show-container");
    var wHeight = $(".window").height();
    var iHeight;
    // 将show的margin-top取出并转换为number
    // var showMargin = parseFloat($(".show").css('margin-top').split("px")[0]);
    time2 = setInterval(function(){
        var cont = document.querySelector('#msg-container')
        var nth  = $('#msg-container > div:nth-child('+curMsg+')')
        if (nth.length === 0) return
        var nTop = nth.offset().top
        var pTop = nth.parent().offset().top
        var dTop = pTop - nTop
        console.log(dTop)
        curMsg++
        cont.style.top = dTop+'px'

        // var sHeight = page.scrollTop();
        // console.log(page.scrollTop());
        // clearInterval(time1);
        // time1 = setInterval(function(){
        //     iHeight = page.scrollTop() + 1;
        //     page.scrollTop(iHeight);
        //     if((iHeight - sHeight) >= wHeight){
        //         clearInterval(time1);
        //     }
        // },8);
    }, 5000);
}

// Ajax
function Ajax() {

    $.ajax({ 
        type: "GET",    
        url: "http://115.28.240.51/wechat/wall.php?msgid=" + msg,
        dataType: 'json',
        data:'',   
        success:function(result) { 
            console.log(result);
            console.log(result.num)
            for(var i = 0; i<result.num; i++) {
                $(".show-container").append(
                "<div class='window'>" +
                "<div class='information col-lg-3 col-md-3 col-sm-3 col-xs-3'>" +
                "<div class='avatar'>" +
                "<img class='img-responsive' src='http://115.28.240.51/wechat/img/" + result.msg[i].FakeId + ".jpg'>" +
                "</div></div>" +
                "<div class='show col-lg-9 col-md-9 col-sm-9 col-xs-9'>" +
                "<h3><strong>" + result.msg[i].NickName + "</strong></h3>" +
                "<h1>" + result.msg[i].Content  + "</h1>" +
                "</div></div>"
                );
            }  
            if(result.num > 0) {
                msg = result.msg[result.num - 1].MsgId;
            }
                    
        },  
        //timeout:3000, //请求超时时间
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