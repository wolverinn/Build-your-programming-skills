# 如何自定义模板前端代码

获取付费版模板代码：

## 本地安装

首先需要安装最新版本的nodejs和npm包管理工具，然后将项目代码下载到本地，进入目录中运行：

```
npm install
```

就会将项目所需要的依赖安装好，然后本地运行：

```
npm run dev
```

就能通过命令行输出的url访问网页了

## 更改访问的服务端host

在`utils/session.tsx`中更改`HOST`就行

想要修改访问的具体path，可以通过`utils/session.tsx`中的`GetHost()`函数检索对应使用的地方。

## 修改页面title

在`app/`目录下每个页面的`page.tsx`中的`metadata`中修改`title`就行了。主页的`metadata`在`app/head.tsx`中进行修改。

修改网站的图标favicon只需要替换`app/icon.ico`就行

## 更新网站logo

对`public/images/logo/zlai.png`和`zlai-dark.png`进行替换就行

## 修改顶部菜单栏

修改样式在`components/Header/index.tsx`中修改，可控制登录前后展示不同内容（如登录前展示登录按钮，登录后展示个人中心），修改菜单栏内容在`components/Header/menuData.tsx`中修改，可以增加一级子菜单

## 修改首页内容

首页第一屏的文案，在`components/Hero/index.tsx`中搜索对应的文案进行修改就行

## 修改Footer内容

在`components/Footer/index.tsx`中进行修改

## 其他页面内容修改

从`app/`根据各自页面的path进入对应的文件夹修改就行，比如FAQ页面、about页面、登录注册、案例展示、联系我们页面

## 登录流程简介

我们使用的是用cookie保持用户登录态的方法，而不是使用的服务端session，因为前后端分离之后，django无法保持session

每次请求前端页面，我们都去服务端请求`get_web_user_session`接口

如果前端有cookie，存了session_key，就带着这个session_key去请求，如果没存，就不带session_key

服务端会判断如果没有session_key，就返回未登录；如果有session_key，就会去DB里查找这个session_key对应的user，找到说明已登录，没找到则还是返回未登录。

如果服务端返回未登录，则前端展示未登录下的内容。当用户登录的时候，前端请求登录接口发送用户名密码，若登录成功，服务端返回用户的session_key，前端存到cookie中。之后访问其他页面都用cookie中的session_key请求服务端验证登录状态

如果用户注册，此时需要先请求服务端发送验证码的接口，服务端生成一个随机的session_key，并且在缓存中记录这个session_key对应的邮箱验证码；之后，前端发送注册请求，注册请求中需要带上这个随机的session_key和验证码，服务端校验验证码是否匹配，若注册成功，服务端通过注册接口再重新下发一个这个用户的新的session_key，前端将这个session_key存到cookie当中。

之后请求服务端的功能接口，前端都从cookie中带上session_key进行用户身份验证。
