# 编写服务端

参考：[django系列](https://www.jianshu.com/nb/30051783)

## 创建Django应用

安装django：

```bash
pip3 install django
pip3 install django-cors-headers
```

从零创建可以参考上面的文章，这里直接用提供好的代码模板就行。进入包含`manage.py`的目录下，运行：

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

### 创建项目后的一些配置项

如果是从零创建项目，要注意`tti/wsgi.py`中要加入下面的代码：

```py
from os.path import join,dirname,abspath
PROJECT_DIR = dirname(dirname(abspath(__file__)))
import sys
sys.path.insert(0,PROJECT_DIR)
```

`tti/settings.py`中的`ALLOWED_HOSTS`需要更改

## 创建path

如果已经在`tti/urls.py`中将path通过

```py
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('zlai/',include('v1.urls')),
    path('admin/', admin.site.urls),
]
```

的方式路由到了`v1/urls.py`，那么我们就可以很方便的通过在`v1/urls.py`中新增path的方式增加path，每个path后面都指定了一个函数进行处理

## 处理请求

handler中解析request和返回json response：
```py
from django.http import JsonResponse

def get_user_session(request):
   # 解析request
    wx_code = request.POST.get("code")
    session_key = request.POST.get("session_key")
    # response
    resp = {
        "data": session_key,
    }
    return JsonResponse(resp)
```

## 新增sql表
首先在`models.py`中新增表结构定义，然后运行：

```
python manage.py makemigrations
python manage.py migrate
```

然后参考`dal/user_dal.py`中的一些操作对表进行增删查改，或者参考[这篇文章](https://www.jianshu.com/p/eb9d5136ee92)

## 其他django技巧

参考：[django实用技巧](https://www.jianshu.com/p/bdb43155513d)