var time1, getTimer , count = 0, msg;
var data = [];

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

setInterval(getData, 1000);
// 定时获取数据
function getData() {
    
    if(count == 0) {
        $.ajax({ 
            type: "GET",    
            url: "http://115.28.240.51/wechat/msglist.php?msgid=" + count,
            dataType:'json',  
            data:'',    
            success:function(result) { 
                if(!result) {
                    getData();
                    return;
                }
                count ++;
                console.log(result);
                result.msg.forEach(function(msg) {
                    data.push({
                        nickName:  msg.NickName,
                        fakeId:    msg.FakeId,
                        content:   msg.Content,
                        msgId:     msg.MsgId,
                    })
                })
                msg = result.msg[0].MsgId;
                // console.log(msg);
                // console.log(data[data.length-1]);
            },  
            timeout:3000, //请求超时时间
            error: function(jqXHR){     
                getData();
                console.log("发生错误：" + jqXHR.status);  
            },     
        });
    } else if(count > 0) {
        // console.log(count);
        Ajax();
    }
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
roll();
// }, 1100);
    
// 定时刷新页面，页面滚动	
function roll() {
    i = 0;
    // console.log(data);
    // console.log(data.length);
    // if(i > data.length) {
    //     return ;
    // }
    // if(data.length == 0) {
    //     i++;
    // }
    // if(data.length > 0) {
    var page = $(".show-container");
    _time = setInterval(function(){
        clearInterval(time1);
        console.log(data);
        console.log(data.num);
        // var top = document.getComp
        $(".show-container").append(
            "<div class='window'>" +
            "<div class='information col-lg-2 col-md-2 col-sm-2 col-xs-2'>" +
            "<img class='img-responsive' src='http://115.28.240.51/wechat/img/" + data[i].fakeId + ".jpg'>" +
            "</div>" +
            "<div class='show col-lg-8 col-md-8 col-sm-8 col-xs-8'>" +
            "<h3><strong>" + data[i].nickName + "</strong></h3>" +
            "<p>" + data[i].content  + "</p></div>" +
            "<div class='wall col-lg-2 col-md-2 col-sm-2 col-xs-2'>" +
            "<div title='" + data[i].msgId + "' class='btn btn-primary'>上墙</div>"+
            "</div></div>"
            );
        time1 = setInterval(function() {
            page.scrollTop(page.scrollTop()+1);
        },8);  
        // roll();
        i++;
        if(i >= data.num) {
            i--;
            console.log(11111);
            clearInterval(_time);
            setTimeout(roll, 6000);
        }
    }, 5000);
    // }
}

// 点击按钮，上墙
$(".btn").on("click", function(){
    alert("1");
    $.ajax({ 
        type: "GET",    
        url: "http://115.28.240.51/wechat/push.php?msgid=" + $(this).attr("title"),
        data:'',  
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