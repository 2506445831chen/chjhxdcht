function language() {
    if ($('.lan').attr('class') == 'lan') {
        $('.lan').attr('class', 'lan active')
    } else {
        $('.lan').attr('class', 'lan')
    }
}
function login() {
    var phone = $('#phone').val();
    var password = $('#TextBox2').val();
    if(!phone) {
        alert('请填写正确电话号码!!');
        return false;
    } else if(password==''){
        alert('密码不能为空');
        return ;
    }
    var data = {phone, password};
    $.ajax({
        type: "POST",
        url: utl + "login",
        data: data,
        success: function (result) {
        var data= errAlert(result);
            var a =data;
            console.log(1);
            console.log(a);
            var b=a.user;
            console.log(b);
            if (b) {
                localStorage.setItem('sellerId', b.id);
                localStorage.setItem('username', b.username);
                console.log(b)
            } else {
            }
            if(a.message){
                alert(a.message);
            }else {
                var token = a.token;
                var storage = window.localStorage;
                storage["token"] = token;
                if(b.role==0){
                    location.href = "index2.html";
                }else{
                    location.href = "index.html";
                }
            }
        },
        error: function (e) {
            alert("异常！");
            console.log(e);
        }
    });
}
