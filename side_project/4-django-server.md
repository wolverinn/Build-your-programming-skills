# 如何自定义模板服务端代码

获取付费版模板代码：

## 本地安装

安装python包依赖：

```bash
pip3 install -r requirements.txt
```

进入包含`manage.py`的目录下，运行：

```bash
# 如果models.py中定义了sql表结构，要先创建表
python3 manage.py makemigrations
python3 manage.py migrate
# 本地部署
python3 manage.py runserver
```

项目的目录结构如下

```
- manage.py
- db.sqlite3 // sql数据库
- requirements.txt // 指定了项目的python依赖
- default-ssl.conf // 部署到apache服务器上的配置文件
- tti
   |
   |--settings.py
   |--urls.py // 注册一级路由，路由到v1/urls.py
- v1
   |
   |--urls.py // 注册path和对应的handler
   |--handler.py // 存放handler的处理函数
   |--models.py // 存放sql表定义
   |--dal/ // 操作sql表
- util
   |
   |--token_secret.json // 存放token
   |--token_store.py // 加载token
```

## 项目配置

对于模板代码，有一些配置需要自己填上：

- `util/token_secret.json`中的`replicate_key`，这个是[replicate平台](https://replicate.com/account/api-tokens)的api-token；用于去除背景和背景替换的图片生成功能，不填充不影响登录注册功能的运行
- `util/token_secret.json`中的`stripe_sk`，这个是stripe的密钥，用于前端请求`api/web/create_checkout_session/`path之后，获取跳转到stripe收银台的链接，不填充不影响其他功能的运行
- `util/token_secret.json`中的`oss_access_key`和`oss_access_secret`填写阿里云oss对象存储的key和secret，用于图片生成功能中对用户的图片进行上传，不填充不影响其他功能的运行
- `v1/sdk/oss.py`中的`endpoint`, `bucket_name`, 和`image_tpl`，填写阿里云oss注册的bucket就行，用于图片上传，不填充不影响其他功能的运行
- `tti/setttings.py`中的`CACHES`配置里的`LOCATION`，这里先到[console.upstash.com](https://console.upstash.com)注册一个免费的redis，然后填写redis的连接地址就行。redis主要用于接口频控和注册时邮箱验证码的缓存。如果不需要的话，将整个`CACHE`注释掉就行，当然对应的功能也就用不了了。
- `tti/setttings.py`中的`EMAIL_HOST_USER`和`EMAIL_HOST_PASSWORD`填写自己的邮箱账号和密码，用于注册时候发送验证邮件，不填充也不影响其余功能的运行

## 新增path

因为已经在`tti/urls.py`中将path通过

```py
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('zlai/',include('v1.urls')),
    path('admin/', admin.site.urls),
]
```

的方式路由到了`v1/urls.py`，那么我们就可以很方便的通过在`v1/urls.py`中新增path的方式增加path，每个path后面都指定了一个函数进行处理。比如在`v1.urls.py`中已经存在的`path('api/test/', handler.json_test),`，我们的访问路径就是：`localhost/zlai/api/test/`

## 新增sql表
首先在`models.py`中新增表结构定义，比如：

```py
from django.db import models

# Create your models here.
# user
class User(models.Model):
    uid = models.AutoField(primary_key=True)
    wx_openid = models.CharField(max_length=256)
    session_key = models.CharField(max_length=256, db_index=True)
    email = models.EmailField(null=True, db_index=True)
    send_to_mail = models.BooleanField(null=True)
    password = models.CharField(db_index=True, max_length=30)
    credits = models.FloatField(default=10.0)
    credits_updated_at = models.DateTimeField(auto_now=True)
    extra = models.TextField(null=True)
```

然后运行：

```
python manage.py makemigrations
python manage.py migrate
```

然后参考`dal/user_dal.py`中的一些操作对表进行增删查改，或者参考[这篇文章](https://www.jianshu.com/p/eb9d5136ee92)

## 自定义功能

### 超级管理员增加额度

在`v1/core/consts.py`中的`SUPER_SESSION_KEY`中增加自己的session_key就行，如何查看session_key可以通过浏览器抓包或者看控制台输出。

然后手动调用`/zlai/api/test/admin/`接口，用post传参`{session_key: YOUR_SESSION_KEY}`就可以增加20的额度

### 每天赠送额度

在`v1/core/logic.py`中的`renew_gen_times`函数中，更改`FREE_CREDITS`变量，就可以控制每天要给余额不足的用户赠送多少额度

### 接口频控

在`v1/handler.py`中的每个接口处理函数上方的`@ratelimit(key='ip', rate='2/s')`处，调整对应的频控值，比如`2/s`代表这个ip每秒限制最多请求两次

这个频控功能依赖`redis`、`django-ratelimit`库，依赖`settings.py`中设置的`CACHE`

### 查看sql表数据

访问`/admin/`，注册超级管理员的用户名和密码之后，就可以通过django的管理后台查看sql表内容了，要修改管理后台的管理员密码可以参考：[django实用技巧](https://www.jianshu.com/p/bdb43155513d)

### 上传图片、处理prompt的逻辑

上传图片的逻辑在`v1/core/logic.py`中的`get_img_upload_url_from_request`和`upload_img_from_url`；处理用户输入的prompt的逻辑在`v1/core/logic.py`中的`process_request_prompt_en`，如果想对prompt进行翻译可以在这里加逻辑

### 发送验证邮件的文案

用户注册的时候会发送验证邮件，要修改邮件内容，可以到`v1/handler.py`中的`send_email_vercode`函数修改
