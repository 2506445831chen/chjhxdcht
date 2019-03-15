let index = null;
let token='';
var produce=[];
var username='';
var sellid='';

//加载页面
// getarry();

//  获取token值
function token1() {
    var storage = window.localStorage;
    token = storage["token"];
    sellid=localStorage.getItem('sellerId')
}
//获取数据功能
function data(e) {
    token1();
    $.ajax({
        type: "POST",
        url: utl+ "queryCategoryBySellerId",
        dateType: 'json',
        headers: {
            token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            sellerId: sellid
        },
        success: function (result) {
            produce = errAlert(result);
            console.log(produce)
            getarry();
        },
        error: function () {
            alert("异常！");
        }
    })
};
//数据整理
function getarry() {
    $('table #category tr').remove();
    for (var i = 0; i < produce.length; i++) {
        $(' #category ').append(`<tr>
            <td>${produce[i].categoryName}</td>
            
            <td><img src="${utl+'image/'+produce[i].productIcon}" class="avatarPreview" width="50"></td>
            <td>
            <span class="label label-primary i18n" name="edit" onclick="change(${i})">编辑</span>
            <span onclick="del(${i})" class="label label-danger i18n" name="delete">删除</span>
            </td>
            </tr>`)
    };
}

//确认提交
function submitClick() {
    token1();
    $('#categoryForm').ajaxSubmit({
        url : utl+ "updateCategoryById",
        type : 'post',
        dataType : 'json',
        headers:
            {
                "token": token
            },
        success:function (result) {
            errAlert(result);
            data();
            $('.box-info').attr('class', 'box box-info active');
            $('.box-list').attr('class','box box-list');
        }
    });
}
//取消编辑
function closesBox() {
    $('.box-info').attr('class', 'box box-info active')
    $('.box-list').attr('class','box box-list');
}
//编辑选中按钮
function change(index) {
    index=index;
    $('.box-info').attr('class', 'box box-info');
    $('.box-list').attr('class','box box-list active');
    $('#categoryType ').val(produce[index].categoryType);
    $('#createTime ').val(produce[index].createTime);
    $('#sellerId ').val(produce[index].sellerId);
    $('#updateTime ').val(produce[index].updateTime);
    $('#createTime ').val(produce[index].createTime);
    $('#categoryName').val(produce[index].categoryName);
    $('#categoryId ').val(produce[index].categoryId);
    $('#photo').val(produce[index].productIcon)
}

//删除分类功能
function del(e) {
    token1();
    var index = e;
    var id = produce[e].categoryId;
    $.ajax({
        type: "POST",
        url: utl+ "removeCategoryById",
        dateType: 'json',
        headers: {
            token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            categoryId: id
        },
        success: function (result) {
            errAlert(result);
            produce.splice(index, 1);
           alert('删除成功');
            data();
        },
        error:function () {

        }
    });
}

//搜索功能
function searchCategory() {
    var content = $('.input-group input').val();
    data(content);
    $.ajax({
        type: "POST",
        url:utl+ "removeCategoryById",
        dateType: 'json',
        headers: {
            token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            categoryId: id
        },
        success: function (result) {
            errAlert(result);
            produce.splice(index, 1);
            if(result!==0){
                $('.content-header').append('<div class="alert alert-success">成功删除信息！</div>');
                setTimeout(function () {
                    $('.content-header .alert').remove()
                },2000);
            }else {
                $('.content-header').append('<div class="alert alert-warning">删除失败！</div>');
                setTimeout(function () {
                    $('.content-header .alert').remove()
                },2000);
            }
            // save();
            getarry();
        },
        error:function () {

        }
    });
}
//添加

