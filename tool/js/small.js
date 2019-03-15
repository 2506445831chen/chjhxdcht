//路径的引入是接口路径也是图片路径 当图片量大的时候需要修改增加路径名称
var utl="http://vtoo36c.hn3.mofasuidao.cn/";



//字体的引入语言的转换
document.write(`<title class="i18n" name="title"></title>
          <meta id="i18n_pagename" content="index">
        <meta name="viewport" content="width=device-width">
        `);
//jquery的引入
document.write('<script src="bower_components/jquery/dist/jquery.min.js"></script>');
//语言转换的引入
document.write('<script  type="text/javascript" src="tool/js/form.js"></script>\n'+
    '<script  type="text/javascript" src="tool/js/jquery.i18n.properties-min.js"></script>\n' +
    '<script  type="text/javascript" src="tool/js/language.js"></script>');
//服务器返回值的判断是否token过期。


//各个服务器的各种返回值
function errAlert(result) {
    console.log(result);
    var alertdata=JSON.parse(result);
    console.log(alertdata);
    var msg = alertdata.msg;
    var status = alertdata.retStatus;
    switch (status){
        case '0':
            return msg;
            break;
        case "err3":
            alertWarning(msg);
            return;
            break;
        case "err4":
            alertWarningLogin(msg);
            return;
            break;
        case "err5":
            alertWarningLogin(msg);
            return;
            break;
        case 'err6':
            alertWarning(msg);
            return;
            break;
        case'err8':
            alertWarning(msg);
            return;
            break;
    }
    alertdanger(msg);
}
//弹出框的的书写
function alertWarningLogin(msg) {
    $('#alert').remove();
    $(' body').append(`
         <div id="alert" style="width: 100%;height: 100%;position: fixed;top: 0;left: 0;  z-index: 999;display: flex;align-items: center;justify-content: center; flex-direction: column;">
           
        <div class="alert" style="width: 500px;height: 350px;display: flex;flex-direction: column;align-items: center;justify-content: space-around; background:url('img/alert.jpg') no-repeat center center ;background-size: 100% 100%;">
             <div style="height: 166px;display: flex;flex-direction: column;align-items: center;">
             <div style="height:50%;width: 50%;display: flex;align-items: center;justify-content: center">
              <img src="img/tishi.png" alt="" style="height: 80%;">
             </div>
             <p style="font-size: 18px;color: white;"> ${msg}</p>
               </div> 
              <button  class="btn btn-primary i18n" onclick="toLogin()" name="Sure"></button>
       
            
        </div>
       
          </div>       
      `);
    execI18n();
}

function alertdanger(msg) {
    $('#alert').remove();
    $(' body').append(`
         <div id="alert" style="width: 100%;height: 100%;position: fixed;top: 0;left: 0; z-index: 999;display: flex;align-items: center;justify-content: center; flex-direction: column;">
           
        <div class="alert" style="width: 500px;height: 350px;display: flex;flex-direction: column;align-items: center;justify-content: space-around; background:url('img/danger.jpg') no-repeat center center ;background-size: 100% 100%;">
             <div style="height: 166px;display: flex;flex-direction: column;align-items: center;">
             <div style="height:50%;width: 50%;display: flex;align-items: center;justify-content: center">
              <img src="img/tishi.png" alt="" style="height: 80%;">
             </div>
             <p style="font-size: 18px;color: white;"> ${msg}</p>
               </div> 
              <button  class="btn btn-google pull-right i18n" onclick="toHidden()" name="Sure"></button>
       
            
        </div>
       
          </div>       
      `);
    execI18n();
}
//去登陆
function alertWarning(msg) {
    $('#alert').remove();
    $(' body').append(`
         <div id="alert" style="width: 100%;height: 100%;position: fixed;top: 0;left: 0;  z-index: 999;display: flex;align-items: center;justify-content: center; flex-direction: column;">
           
        <div class="alert" style="width: 500px;height: 350px;display: flex;flex-direction: column;align-items: center;justify-content: space-around; background:url('img/alert.jpg') no-repeat center center ;background-size: 100% 100%;">
             <div style="height: 166px;display: flex;flex-direction: column;align-items: center;">
             <div style="height:50%;width: 50%;display: flex;align-items: center;justify-content: center">
              <img src="img/tishi.png" alt="" style="height: 80%;">
             </div>
             <p style="font-size: 18px;color: white;"> ${msg}</p>
               </div> 
              <button  class="btn btn-primary i18n" onclick="toHidden()" name="Sure"></button>
       
            
        </div>
       
          </div>       
      `);
    execI18n();
}
function toLogin() {
    location.href='login.html';
    $('#alert').remove();
}
function toHidden() {
    $('#alert').remove();
}