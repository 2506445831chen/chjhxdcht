var ws = "ws://vtoo36c.hn3.mofasuidao.cn/websocket/";
var sellerId = localStorage.getItem('sellerId');
// var sellerId = "b49e2b923097477897b9128f7327b971";
alert(sellerId);
var orderlist = '';
var orderEvery;
var orderListPage = '';
var orderSuccessId;
if ('WebSocket' in window) {
    websocket = new WebSocket(ws + `${sellerId}`);
}
else {
    alert('Not support websocket')
}
var order = [];
var number = -1;
var leng = 1;
var pagasize = 10;

//接收到消息的回调方法
websocket.onmessage = function (event) {
    var data = event.data;
    console.log(data);
    number += 1;
    localStorage.setItem('order', data);
    data = JSON.parse(data);
    if (data.connect) {
        alert('连接成功');
    }
    order.push(data);
    $('.label-warning').html(`${number}`);
    orderData();
    orderArray();
};

//连接关闭的回调方法
websocket.onclose = function () {
};
//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    websocket.close();
};

function getLocalTime(nS) {
    var time = new Date(nS);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    // var s = time.getSeconds();
    return y + '-' + m + '-' + d + ' ' + h + ':' + mm;
}

//order数据处理
function orderData() {
    $('.menu li').remove();
    console.log(order);
    for (var i = 1; i < order.length; i++) {
        var time = order[i].orderCreatTime;
        time = getLocalTime(time);
        $('.menu').append(`
               <li>
                  <a href="#" style="display: flex; justify-content: space-around; ">
                    <b>${order[i].productInfos[0].orderId.slice(-4)}</b> <b style="color: red"> ￥${order[i].totalAmount}</b> ${time}
                   </a>
               </li>                              
`)
    }
}

//打印
function preview(oper) {
    if (oper < 10) {
        bdhtml = window.document.getElementById('screen').innerHTML;//获取当前页的html代码
        sprnstr = "<!--startprint" + oper + "-->";//设置打印开始区域
        eprnstr = "<!--endprint" + oper + "-->";//设置打印结束区域
        prnhtml = bdhtml.substring(bdhtml.indexOf(sprnstr) + 18); //从开始代码向后取html
        prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));//从结束代码向前取html
        window.document.getElementById('screen').innerHTML = prnhtml;
        window.print();
        window.document.getElementById('screen').innerHTML = bdhtml;
    } else {
        window.print();
    }
}

//订单的展示数据获取
function orderArray() {
    $.ajax({
        type: "POST",
        url: utl + "queryOrderBySellerId",
        dateType: 'json',
        headers: {
            token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            sellerId: sellerId
        },
        success: function (result) {
           var data=errAlert(result);
            if (data) {
                orderlist = data;
            }
            pageSize();
            orderListPage = orderlist.slice(0, pagasize);
            orderBox();
        },
        error: function () {
            alert("异常！");
        }
    });
}

//加载订单
function orderBox() {
    var time = '';
    $('#orderFor tr').remove();
    for (var i = 0; i < orderListPage.length; i++) {
        var orderStatus = '';
        var color = '';
        var paycolor = '';
        var pay = '';
        var show = 'display:none';
        var showremark='display:none';
        switch (orderListPage[i].orderStatus) {
            case 9:
                orderStatus = 'Returned order';
                color = 'badge label-danger';
                break;
            case 0:
                showremark='';
                orderStatus = 'Missed order';
                color = 'badge bg-light-blue';
                break;
            case 1:
                orderStatus = 'Received orders';
                color = 'badge bg-green';
                break;
        };
        switch (orderListPage[i].payStatus) {
            case 0:
                pay = 'Unpaid';
                paycolor = 'badge bg-light-blue';
                break;
            case 1:
                pay = 'Paid';
                paycolor = 'badge bg-green';
                break;
        };
        if (orderListPage[i].orderStatus == 1 && orderListPage[i].payStatus == 0) {
            show = ''
        }

        time = getLocalTime(orderListPage[i].createTime);
        $('#orderFor').append(`<tr>
             
                    <td class="mailbox-star">${orderListPage[i].orderId.slice(-4)}</td>
                    <td class="mailbox-subject"> ${orderListPage[i].orderAmount}</td>
                    <td class="mailbox-date"><trans>${time}</trans></td>
                    <td class="mailbox-date">
                    <span class="${color}">
                    <trans class="i18n" name="${orderStatus}">${orderStatus} </trans>
                    </span>
                    
                    </td>
                     <td class="mailbox-date">
                    <span class="${paycolor}">
                    <trans class="i18n" name="${pay}">${pay} </trans>
                    </span>
                    </td>
                    <td class="mailbox-star">
                    <b style="${showremark}"><a class="i18n" name="details" onclick="orderDetails('${orderListPage[i].orderId}')">详情</a></b>
     
                    <b style="${show}"><a class="i18n" name="Offline payment" onclick="payOnline('${orderListPage[i].orderId}')"> 线下支付</a></b>
                    </td>
                </tr>`);
    }
    execI18n();
}

//打开详情页
function orderDetails(e) {
    orderSuccessId = e;
    $.ajax({
        type: "POST",
        url: utl + "queryOrderDetialByOrderId",
        dateType: 'json',
        headers: {
            token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            orderId: orderSuccessId
        },
        success: function (result) {
            orderEvery=errAlert(result);
            orderEvery1(orderEvery);
            $('#orderStart').attr('style', 'display:none');
            $('#orderMore').attr('style', '');
        },
        error: function () {
            alert("异常！");
        }
    });
}

// 每单的展示
function orderEvery1(orderId) {
    orderEvery = orderId;
    $.get("orderTable.html", function (data) {
        $("#screen").html(data);
    });
}

function pageSize() {
    var count = orderlist.length;
    if (count > pagasize) {
        leng = Math.ceil(count / pagasize);
    }
}

//分页
$('.pageTest').page({
    leng: leng,//分页总数
    activeClass: 'activP', //active 类样式定义
    clickBack: function (page) {
        orderListPage = orderlist.slice((page - 1) * pagasize, page * pagasize)
        orderBox();
    }
});

//打印时候确认的
function orderSuccess() {

    $.ajax({
        type: "POST",
        url: utl + "updateOrderStatusByOrderId",
        dateType: 'json',
        headers: {
            token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            orderId: orderSuccessId
        },
        success: function (result) {
            errAlert(result);
            backOrder();
            preview(1);
        },
        error: function () {
            alert("异常！");
        }
    });

}

//退单
function cancelOrder() {
    $.ajax({
        type: "POST",
        url: utl + "CancelOrder",
        dateType: 'json',
        headers: {
            token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            orderId: orderSuccessId
        },
        success: function (result) {
            errAlert(result);
            alert(result);
            backOrder();
        },
        error: function () {
            alert("异常！");
        }
    });
}

//打印页返回订单页
function backOrder() {

    $(document).ready(function () {
        $.get(`ordertest1.html`, function (data) {
            $("#screen").html(data);
        });

        $('.treeview-menu li').click(function () {
            // alert(1)
            $('.treeview-menu li ').attr('class', '');
            $(this).attr('class', 'active')
            // 找出 li 中的超链接 href(#id)
            var $this = $(this),
                _clickTab = $this.find('a').attr('index');// 找到链接a中的targer的值


            $.get(_clickTab, function (data) {
                $("#screen").html(data);
            })
        });
    });
}

//显示已接单
function receivedOrder(e) {
    token1();
    $.ajax({
        type: "POST",
        url: utl + "queryOrderBySellerIdOrderStatus",
        dateType: 'json',
        headers: {
            token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            sellerId: sellerId,
            orderStatus: e
        },
        success: function (result) {
            errAlert(result);
            pageSize();
            orderBox();
        },
        error: function () {
            alert("异常！");
        }
    });

}

//显示是否付款
function payOrder(e) {
    token1();
    $.ajax({
        type: "POST",
        url: utl + "queryOrderBySellerIdPayStatus",
        dateType: 'json',
        headers: {
            token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            sellerId: sellerId,
            payStatus: e
        },
        success: function (result) {
           var data=errAlert(result);
            orderListPage = data;
            orderBox();

        },
        error: function () {
            alert("异常！");
        }
    });
}

    //线下支付
    function payOnline(orderId) {
        token1();
        $.ajax({
            type: "POST",
            url: utl + "updatePayStatusByOrderId",
            dateType: 'json',
            headers: {
                token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
                orderId: orderId
            },
            success: function (result) {
               errAlert(result);
                orderArray();
            },
            error: function () {
                alert("异常！");
            }
        });
    }
