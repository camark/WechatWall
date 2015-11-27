var _time;
var data = [];
var curMsg = 1;
var msg = 0;
var a = 0,
    all = 0;

// 页面加载完后触发
$(function() {
    getData();
    wallScroll();
});

// 微信墙滚动
function wallScroll() {
    var page = $(".show-container");
    var wHeight = $(".window").height();
    var iHeight;
    _time = setInterval(function() {
        var cont = document.querySelector('#msg-container');
        var nth = $('#msg-container > div:nth-child(' + curMsg + ')');
        if (nth.length === 0) return;
        var nTop = nth.offset().top;
        var pTop = nth.parent().offset().top;
        var dTop = pTop - nTop;
        console.log(dTop);
        curMsg++;
        cont.style.top = dTop + 'px';
    }, 5400);
}

// 定时获取数据
function getData() {
    $.ajax({
        type: "GET",
        url: "http://115.28.240.51/wechat/wall.php?msgid=" + msg,
        dataType: 'json',
        success: function(result) {
            console.log(result);
            console.log(result.num);
            result.msg.forEach(function(msg) {
                data.push({
                    NickName: msg.NickName,
                    FakeId: msg.FakeId,
                    Content: msg.Content.split('#')[1],
                    MsgId: msg.MsgId,
                    TimeStamp: msg.TimeStamp,
                });
            });
            all += result.num;
            if (result.num > 0) {
                msg = result.msg[result.num - 1].MsgId;
            }
            putElementIn();
        },
        // 若成功，便设置下一次调用时间
        complete: function(jqXHR) {
            setTimeout(getData, 5000);
        },
        error: function(jqXHR) {
            console.log("发生错误：" + jqXHR.status);
        },
    });
}

function putElementIn() {
    for (a; a < all; a++) {
        $(".show-container").append(
            "<div class='window'>" +
            "<div class='information col-lg-3 col-md-3 col-sm-3 col-xs-3'>" +
            "<div class='avatar'>" +
            "<img class='img-responsive' src='http://115.28.240.51/wechat/img/" + data[a].FakeId + ".jpg'>" +
            "</div></div>" +
            "<div class='show col-lg-9 col-md-9 col-sm-9 col-xs-9'>" +
            "<h3><strong>" + data[a].NickName + "</strong></h3>" +
            "<h1>" + data[a].Content + "</h1>" +
            "</div></div>"
        );
    }
}
// 添加emoji
// twemoji.parse(
//   'I \u2764\uFE0F emoji!',
//   function(icon, options, variant) {
//     return '/emoji/' + options.size + '/' + icon + '.gif';
//   }
// );