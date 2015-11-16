// 点击抽奖跳转
$(".prize").on('click', function(){
    location.assign("prizeB.html");
});

getData();
// 定时获取数据
function getData() {
    setInterval(Ajax, 3000);
}
var time1;
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
            var page = $(".show-container");
            setTimeout(function(){
                clearInterval(time1);
                $(".show-container").append(
                    "<div class='window'>" +
                    "<div class='information col-lg-3 col-md-3 col-sm-3 col-xs-3'>" +
                    "<div class='avatar'>" +
                    "<img class='img-responsive' src='" + result.avatar + "'>" +
                    "</div></div>" +
                    "<div class='show col-lg-9 col-md-9 col-sm-9 col-xs-9'>" +
                    "<h3><strong>" + result.name + "</strong></h3>" +
                    "<h1>" + result.words  + "</h1>" +
                    "<div class='btn btn-primary'>上墙</div>" +
                    "</div></div>"
                    );
                    time1 = setInterval(function(){
                        page.scrollTop(page.scrollTop()+1);
                    },8);
            },3000);
        },  
        timeout:3000, //请求超时时间
        error: function(jqXHR){     
            console.log("发生错误：" + jqXHR.status);  
        },     
    });
}

// roll();
// 定时刷新页面，页面滚动	
function roll() {
    var page = $(".show-container");
    var time1;
    setInterval(function(){
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
            time1 = setInterval(function(){
                page.scrollTop(page.scrollTop()+1);
            },8);
    },6000);
}
// 添加emoji
// twemoji.parse(
//   'I \u2764\uFE0F emoji!',
//   function(icon, options, variant) {
//     return '/emoji/' + options.size + '/' + icon + '.gif';
//   }
// );

// 没有用的代码
// timeer();
// function timeer() {
//     var page = $(".show-container");
//     var time1;
//     clearInterval(time1);
//     setTimeout(function(){
//         clearInterval(time1);
//         $(".show-container").append(
//             "<div class='window'>" +
//             "<div class='information col-lg-3 col-md-3 col-sm-3 col-xs-3'>" +
//             "<div class='avatar'>" +
//             "<img class='img-responsive' src='img/2.jpg'>" +
//             "</div></div>" +
//             "<div class='show col-lg-8 col-md-8 col-sm-8 col-xs-8'>" +
//             "<h3><strong>沃德天·维神墨：</strong></h3>" +
//             "<h1>柔软舒适，格纹色彩均很满意，前胸后背均有仿羊羔绒保暖</h1>" +
//             "</div></div>"
//             );
//             time1 = setInterval(function(){
//                 page.scrollTop(page.scrollTop()+1);
//             },8);
//         timeer();
//     },4000);
// }