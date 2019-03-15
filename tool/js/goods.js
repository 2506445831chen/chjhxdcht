var goods ='';

datagoods();

function goodsSubmit() {
    token1();
    $('#goodsFrom').ajaxSubmit({
        url : utl+"updateProductById",
        type : 'post',
        dataType : 'json',
        headers:
            {
                "token": token
            },
        success: function(result) {
            errAlert(result);
            alert('提交成功！');
            datagoods();
            $('.box-info').attr('class', 'box box-info active');
            $('.box-list').attr('class','box box-list');
        }
    });

}



// //获取数据功能
function datagoods() {
    token1();
    $.ajax({
        type: "POST",
        url: utl+"showAllProductBySellerId",
        dateType: 'json',
        headers: {
            token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            sellerId: sellid
        },
        success: function (result) {
           var data =errAlert(result);
            goods=data;
            console.log(goods);
          getarry1();
        },
        error: function () {
            alert("异常！");
        }
    })

};

//
function getarry1(e) {
    $('table tbody tr').remove();
    for (var i = 0; i < goods.length; i++) {
        $(' tbody ').append(`
                  <tr>
                    <td>${goods[i].productName}</td>
                    <td>${goods[i].productPrice}</td>
                    <td>${goods[i].productDescription}</td>
                    <td><img src="${utl}image/${goods[i].productIcon}" width="50"></td>
                    <td>
                        <span class="label label-primary i18n" name="edit" onclick="changeGoods(${i})">编辑</span>
                        <span onclick="delGoods(${i})" class="label label-danger i18n" name="delete">删除</span>
                    </td>
                </tr>`)
    };

}


//编辑选中按钮

function changeGoods(index) {
    $('.box-info').attr('class', 'box box-info');
    $('.box-list').attr('class','box box-list active');
    $('#productIcon').val(goods[index].productIcon);
    $('#productId ').val(goods[index].productId);
    $('#productPrice').val(goods[index].productPrice);
    $('#productName ').val(goods[index].productName);
    $('#productStock ').val(goods[index].productStock);
    $('#productDescription ').val(goods[index].productDescription);
    $('#productStatus   ').val(goods[index].productStatus  );
       $('#categoryType ').val(goods[index].categoryType);

}

//商品种类的获取
function select() {
    $('#categoryType option').remove();
    for(let i=0;i<produce.length;i++){
        $('#categoryType').append(`
            <option value="${produce[i].categoryType}">${produce[i].categoryName}</option>
            `)
    }
}
//
// //弹出内容

//删除商品功能
function delGoods(e) {
    token1();
    var index = e;
    var id = goods[e].productId;
    $.ajax({
        type: "POST",
        url: utl+"removeProductById",
        dateType: 'json',
        headers: {
            token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            productId: id
        },
        success: function (result) {
            errAlert(result);
            goods.splice(index, 1);
            // localStorage.setItem('goods', result);
            getarry1();
        }
    });

}
// //搜索功能

document.onkeydown =cdk;
function cdk() {
    if(event.keyCode == 13){
        searchGoods()
    }
}

function searchGoods() {
    var content = $('#goodsSearch input').val()
    $.ajax({
        type: "POST",
        url:utl+ "queryByName",
        dateType: 'json',
        headers: {
            token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            name: content
        },
        success: function (result) {
          var data=errAlert(result);
            goods=data;
            // localStorage.setItem('goods', result)
            getarry1();
        },
        error:function () {

        }
    });
}
