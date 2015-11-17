var time1, getTimer , count = 0, msg = 0;
var data = [];
var sum = 0;
var all = 0, a = 0;
var isSuc = false;

// 页面加载完后触发
// $(function(){
//     getData();
//     $(window).on('blur',function(){
//         clearInterval(time1);
//         clearInterval(getTimer);
//     });
//     $(window).on('focus',function(){
//         getData();
//     });   
// })

setInterval(getData, 5000);
// 定时获取数据
function getData() {
        $.ajax({ 
            type: "GET",    
            url: "http://115.28.240.51/wechat/msglist.php?msgid=" + msg,
            dataType:'json',  
            data:'',
            // async: false,    
            success:function(result) {
                // isSuc = true;
                if(result.num == 0) {
                    return 0;
                } 
                // console.log(result);
                
                sum += result.num;
                all += result.num;
                // console.log(sum);
                // data = result;
                result.msg.forEach(function(msg) {
                    data.push({
                        NickName:  msg.NickName,
                        FakeId:    msg.FakeId,
                        Content:   msg.Content.split('#')[1],
                        MsgId:     msg.MsgId,
                    })
                })
                msg = result.msg[result.num - 1].MsgId;
                // console.log(msg);
                // console.log(data[data.length-1]);
                putElementIn(); 
                 
            },  
            timeout:3000, //请求超时时间
            error: function(jqXHR){     
                getData();
                console.log("发生错误：" + jqXHR.status);  
            },     
        });
}

// Ajax
function Ajax() {
    $.ajax({ 
        type: "GET",    
        url: "http://115.28.240.51/wechat/msglist.php?msgid=" + msg,
        dataType:'json',  
        data:'',  
        success:function(result) { 
            if(result.num == 0) {
                // Ajax();
                return ;
            }
            // console.log(result);
            result.msg.forEach( function(msg) {
                    data.push({
                        nickName:  msg.NickName,
                        fakeId:    msg.FakeId,
                        content:   msg.Content,
                        msgId:     msg.MsgId,
                    });
                });
            msg = data[result.num - 1].msgId;
            // console.log(msg);
        },  
        //timeout:3000, //请求超时时间
        error: function(jqXHR){     
            console.log("发生错误：" + jqXHR.status);  
        },     
    });
}

// setTimeout(function(){

// }, 1100);
function putElementIn(){
    // alert("1");
    for(a;a < all; a++){
        $(".show-container").append(
            "<div class='window'>" +
            "<div class='information col-lg-2 col-md-2 col-sm-2 col-xs-2'>" +
            "<img class='img-responsive' src='http://115.28.240.51/wechat/img/" + data[a].FakeId + ".jpg'>" +
            "</div>" +
            "<div class='show col-lg-8 col-md-8 col-sm-8 col-xs-8'>" +
            "<h3><strong>" + data[a].NickName + "</strong></h3>" +
            "<p>" + data[a].Content  + "</p></div>" +
            "<div class='wall col-lg-2 col-md-2 col-sm-2 col-xs-2'>" +
            "<div title='" + data[a].MsgId + "' class='btn btn-primary btn0_"+a+"'>上墙</div>"+
            "</div></div>"
            );
        //按钮点击上墙
        $(".btn0_" + a).on("click", function(){
            // alert("1");
            $.ajax({ 
                type: "GET",    
                url: "http://115.28.240.51/wechat/push.php?msgid=" + $(this).attr("title"),
                data:'',
                dataType:"json",
                success:function(result) { 
                    // console.log(result.result);
                    if (result.result == 0) {
                        alert("上墙成功"); 
                    }else if (result.result == 1) {
                        alert("已经上过墙了");
                    }else if (result.result == -1){
                        alert("请求错误");
                    }else if (result.result == 2){
                        alert("不存在Id");
                    }
                },  
                timeout:3000, //请求超时时间
                error: function(jqXHR){     
                    console.log("发生错误：" + jqXHR.status);  
                },     
            });
        });
    }
    roll();
}
// 定时刷新页面，页面滚动
var _time;	
function roll() {
    var page = $(".show-container");
    var wHeight = $(".window").height();
    var iHeight = 0;
    var showMargin = parseFloat($(".window").css('margin-top').split("px")[0]);
    clearInterval(_time);
    _time = setInterval(function(){
        clearInterval(time1);
        // var top = document.getComp
        // time1 = setInterval(function() {
        //     page.scrollTop(page.scrollTop()+1);
        // },8);
        var sHeight = page.scrollTop();  
        time1 = setInterval(function(){
            iHeight = page.scrollTop() + 1;
            page.scrollTop(iHeight);
            if((iHeight - sHeight) >= (wHeight + showMargin)){
                clearInterval(time1);
            }
            // console.log(iHeight);
        },8);
        
        if(sum == 0) {
            console.log(11111);
            alert("信息已到底部，请等待他人发送消息");
            clearInterval(time1);
            // clearInterval(_time);
            // setTimeout(roll, 6000);
        }
        sum--;
    }, 1000);
    // }
}

// 添加emoji
// twemoji.parse(
//   'I \u2764\uFE0F emoji!',
//   function(icon, options, variant) {
//     return '/emoji/' + options.size + '/' + icon + '.gif';
//   }
// );