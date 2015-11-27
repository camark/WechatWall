    // msgid
var msg = 0,
    // 存放数据的数组
    data = [],
    // 数组遍历时用的
    sum = 0,
    all = 0,
    a = 0;

// 页面加载完后触发
$(function() {
    getData();
});

// 定时获取数据
function getData() {
    $.ajax({
        type: "GET",
        url: "http://115.28.240.51/wechat/msglist.php?msgid=" + msg,
        dataType: 'json',
        success: function(result) {
            console.log(result);
            if (result.num == 0) {
                return 0;
            }
            sum += result.num;
            all += result.num;
            result.msg.forEach(function(msg) {
                data.push({
                    NickName: msg.NickName,
                    FakeId: msg.FakeId,
                    Content: msg.Content.split('#')[1],
                    MsgId: msg.MsgId,
                });
            });
            if (result.num > 0) {
                msg = result.msg[result.num - 1].MsgId;
            }
            putElementIn();
        },
        // 若成功，便设置下一次调用时间
        complete: function(jqXHR) {
            setTimeout(getData, 1000);
        },
        error: function(jqXHR) {
            console.log(jqXHR);
            getData();
            console.log("发生错误：" + jqXHR.status);
        },
    });
}

// 先将获得的数据添加到后面
function putElementIn() {
    for (a; a < all; a++) {
        $(".show-container").append(
            "<div class='window' id='window" + data[a].MsgId + "'>" +
            "<div class='information col-lg-2 col-md-2 col-sm-2 col-xs-2'>" +
            "<img class='img-responsive' src='http://115.28.240.51/wechat/img/" + data[a].FakeId + ".jpg'>" +
            "</div>" +
            "<div class='show col-lg-8 col-md-8 col-sm-8 col-xs-8'>" +
            "<h3><strong>" + data[a].NickName + "</strong></h3>" +
            "<p>" + data[a].Content + "</p></div>" +
            "<div class='wall col-lg-2 col-md-2 col-sm-2 col-xs-2'>" +
            "<div title='" + data[a].MsgId + "' id='btn0_" + a + "' class='btn btn-primary'>上墙</div>" +
            "</div></div>"
        );
        // 给按钮绑定一个点击事件，每个按钮都是唯一的，按钮点击后上墙
        $("#btn0_" + a).on("click", function() {
            var msgid = $(this).attr("title");
            $.ajax({
                type: "GET",
                url: "http://115.28.240.51/wechat/push.php?msgid=" + msgid,
                dataType: "json",
                success: function(result) {
                    if (result.result == 0) {
                        // 上墙的消息被移除
                        $("#window" + msgid).remove();
                        alert("上墙成功");
                    } else if (result.result == 1) {
                        alert("已经上过墙了");
                    } else if (result.result == '-1') {
                        alert("请求错误");
                    } else if (result.result == 2) {
                        alert("不存在Id");
                    }
                },
                error: function(jqXHR) {
                    console.log("发生错误：" + jqXHR.status);
                },
            });
        });
    }
}

// 添加emoji
// twemoji.parse(
//   'I \u2764\uFE0F emoji!',
//   function(icon, options, variant) {
//     return '/emoji/' + options.size + '/' + icon + '.gif';
//   }
// );