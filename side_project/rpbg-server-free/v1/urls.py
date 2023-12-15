from django.urls import path
from . import handler

urlpatterns = [
    # web替换背景
    path('api/web/rpbg/', handler.web_rpbg),
    # web去除背景
    path('api/web/rembg/', handler.web_rembg),
    # web获取登录状态
    path('api/web/get_session/', handler.get_web_user_session),
    # web登录
    path('api/web/sign_in/', handler.sign_in),
    # web注册
    # path('api/web/sign_up/', handler.sign_up),
    # web发送邮箱验证码
    # path('api/web/send_code/', handler.send_email_vercode),
    # web忘记密码
    # path('api/web/reset_pass/', handler.forget_password),
    # web更换密码
    # path('api/web/change_pass/', handler.change_password),
    # web 创建反馈记录
    path('api/web/feedback/', handler.create_feedback_v2),
    # web stripe
    # path('api/web/create_checkout_session/', handler.create_checkout_session),
    # test paths
    path('', handler.temp_home),
    path('api/test/', handler.json_test),
    # 超级管理员增加额度
    # path('api/test/admin/', handler.super_session),

    # rmbg test
    path('rmbg/home', handler.rmbg_home),
    # path('rmbg/exec', handler.rmbg_exec),
    # path('rmbg/exec', handler.rpbg_exec)
]
