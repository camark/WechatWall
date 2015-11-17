var time1, getTimer , count = 0;
// id = new Array();
// nickName = new Array();
// avatar = new Array();
// content = new Array();
// msgId = new Array();
var data = []

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
    
    if(count == 0) {
        $.ajax({ 
            type: "GET",    
            url: "http://115.28.240.51/wechat/msglist.php?Msg=" + count,
            dataType:'json',  
            data:'',    
            success:function(result) { 
                if(!result) {
                    getData();
                    return;
                }
                count ++;
                console.log(result);
                // id.push(result.id);
                data.push({
                    nickName： result.nickName，
                    avatar:    result.avatar,
                    content:   result.words
                })
                // nickName.push(result.nickName);
                // avatar.push(result.avatar);
                // content.push(result.words); 
                Msg = result.msgId;
                msgId.push(result.msgId);
                console.log(data[data.length-1])
                // console.log(name1);
                // console.log(avatar);
                // console.log(content);

            },  
            timeout:3000, //请求超时时间
            error: function(jqXHR){     
                gerData();
                console.log("发生错误：" + jqXHR.status);  
            },     
        });
    } else if(count > 0) {
        setInterval(Ajax(Msg), 3000);
    }
}

// Ajax
function Ajax(Msg) {
    $.ajax({ 
        type: "GET",    
        url: "http://115.28.240.51/wechat/msglist.php?msgid=" + Msg,
        dataType:'json',  
        data:'',  
        success:function(result) { 
            console.log(result);
            // nickName.push(result.name);
            // avatar.push(result.avatar);
            // content.push(result.words);
            // msgId.push(result.msgid);
            data.push({
                nickName: result.name,
                avatar:   result.avatar,
                content:  result.words,
                msgId:    result.msgid
            })
            Msg = result.msgId;
            // console.log(nickName);
            // console.log(avatar);
            // console.log(content); 
            // console.log(msgId);   
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
        // var top = document.getComp
        $(".show-container").append(
            "<div class='window'>" +
            "<div class='information col-lg-2 col-md-2 col-sm-2 col-xs-2'>" +
            "<img class='img-responsive' src='" + data[i].avatar + "'>" +
            "</div>" +
            "<div class='show col-lg-8 col-md-8 col-sm-8 col-xs-8'>" +
            "<h3><strong>" + data[i].nickName + "</strong></h3>" +
            "<p>" + data[i].content  + "</p></div>" +
            "<div class='wall col-lg-2 col-md-2 col-sm-2 col-xs-2'>" +
            "<div title='" + data[i].msgid + "' class='btn btn-primary'>上墙</div>"+
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
        url: "http://115.28.240.51/wechat/push.php?" + $(this).attr("title"),
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