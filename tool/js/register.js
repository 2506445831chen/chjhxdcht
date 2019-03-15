function Register() {
    var phone = $('#PhoneName').val();
    var password = $('#surePassword').val();
    var username = $('#userName').val();
    var RetypePassword = $('#Retype').val();
    if (RetypePassword !== password) {
        alert('两次输入密码不一致');
        return
    } else if (phone == '') {
        alert('请输入你的号码');
        return
    } else if (username == '') {
        alert('请输入你的名字');
        return
    }
    var role = 1;
    var openid = 122;
    var data = {phone, password, username, role, openid};
    $.ajax({
        type: "POST",
        url: utl + "register",
        data: data,
        success: function (result) {
            var data= errAlert(result);
            if (data == 1) {
                alert('注册成功');

            } else {
                alert('注册失败')
            }
            if (result.resultCode == 200) {
                alert("SUCCESS");
            }
            ;
            location.href = 'login.html'
        },
        error: function () {
            alert("账号已被注册。");
        }
    });
}