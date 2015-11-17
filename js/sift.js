var time1, getTimer;
// id = new Array();
name1 = new Array();
avatar = new Array();
content = new Array();

// 页面加载完后触发
$(function(){
    getData();
    $(window).on('blur',function(){
        clearInterval(time1);
        clearInterval(getTimer);
    });
    $(window).on('focus',function(){
        getData();
    });   
})
// 定时获取数据
function getData() {
    // setInterval(Ajax, 3000);
}

// Ajax
function Ajax() {
    $.ajax({ 
        type: "GET",    
        url: "http://115.28.240.51/wechat/push.php",
        // url: "http://2.934067696.sinaapp.com",
        dataType:'json',  
        data:'',  
        // jsonp:'callback',  
        success:function(result) { 
            console.log(result);
            // id.push(result.id);
            name1.push(result.name);
            avatar.push(result.avatar);
            content.push(result.words); 
            console.log(name1);
            console.log(avatar);
            console.log(content);      
        },  
        timeout:3000, //请求超时时间
        error: function(jqXHR){     
            console.log("发生错误：" + jqXHR.status);  
        },     
    });
}

i = -1;
// roll();
// 定时刷新页面，页面滚动	
function roll() {
    i++;
    var page = $(".show-container");
    setTimeout(function(){
        clearInterval(time1);
        $(".show-container").append(
            "<div class='window'>" +
            "<div class='information col-lg-2 col-md-2 col-sm-2 col-xs-2'>" +
            "<img class='img-responsive' src='" + avatar[i] + "'>" +
            "</div>" +
            "<div class='show col-lg-8 col-md-8 col-sm-8 col-xs-8'>" +
            "<h3><strong>" + name1[i] + "</strong></h3>" +
            "<p>" + content[i]  + "</p></div>" +
            "<div class='wall col-lg-2 col-md-2 col-sm-2 col-xs-2'>" +
            "<div title='" + + "' class='btn btn-primary'>上墙</div>"+
            "</div></div>"
            );
        time1 = setInterval(function(){
            page.scrollTop(page.scrollTop()+1);
        },8);  
        roll();
    }, 5000);

}

// 点击按钮，上墙
$(".btn").on("click", function(){
    // alert("1");
    $.ajax({ 
        type: "GET",    
        url: "http://115.28.240.51/?" + $(this).attr("title"),
        dataType:'jsonp',  
        data:'',  
        jsonp:'callback',  
        success:function(result) { 
            alert("上墙成功");    
        },  
        timeout:3000, //请求超时时间
        error: function(jqXHR){     
            console.log("发生错误：" + jqXHR.status);  
        },     
    });
});
// 添加emoji
// twemoji.parse(
//   'I \u2764\uFE0F emoji!',
//   function(icon, options, variant) {
//     return '/emoji/' + options.size + '/' + icon + '.gif';
//   }
// );