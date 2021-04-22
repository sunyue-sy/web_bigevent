$(function() {
    // 调用getUserInfo 获取用户的信息
    getUserInfo()

    var layer = layui.layer
        // 点击按钮 实现退出功能
    $('#btnLogout').on('click', function() {
        // alert(123)
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            // console.log('ok');
            // do something
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
                // 2.重新跳转到登录页
            location.href = '/login.html'
                // 关闭confirm询问框
            layer.close(index)
        });

    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        // headers: {
        //     // headers 就是请求头配置对象
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用renderAvatar 渲染用户头像
            renderAvatar(res.data)
        },
        // 不论成功还是失败 都会调用 complete() 回调函数
        // 不登陆无法进入index页面 自动跳转login页面
        // complete: function(res) {
        //     console.log('执行了complete回调');
        //     console.log(res);
        //     // 在complete回调函数中，可以使用responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败！') {
        //         // 1.强制清空token
        //         localStorage.removeItem('token')
        //             // 2.强制跳转登陆页面
        //         return location.href = '/login.html'
        //     }
        // }


    })
}
// 渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户名称
    var name = user.nickname || user.username

    // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    // 3.按需渲染用户头像
    if (user.pic !== null) {
        // 3.1.渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text.avatar').hide()
    } else {
        // 3.2.渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase() // toUpperCase()转成大写
        $('.text.avatar').html(first).show()
    }
}