# 部署项目代码

- 服务端模板代码免费版：[rpbg-server](./rpbg-server-free)
- 前端模板代码免费版：[web-starter-template-free](./web-starter-template-free)
- 获取付费版模板代码：[文章](https://mp.weixin.qq.com/s/eP4XJgjKzbeHZBrXG1os7w)

## 服务端模板代码部署

### 前置准备
首先，需要按照[自定义服务端代码](./4-django-server.md)中的[#项目配置]部分配置好需要的token。

其次，需要到阿里云租一个普通的ECS服务器（Ubuntu），并且开放服务器的http、https、ssh端口，也就是80、443、22端口；如果想要通过域名访问的话，需要申请好域名、备案通过，并且申请好域名的SSL证书，这些都可以通过阿里云完成。

### 服务器依赖安装

SSH到Ubuntu服务器上，首先安装一些基本的依赖：

```bash
sudo apt-get update
sudo apt-get install -y python3-pip apache2 libapache2-mod-wsgi-py3
```

然后，使用git/wget/sftp或其他方式将服务端项目代码传输到服务器上，并且放到`/var/www/`目录下面；确保项目文件夹命名为`rpbg-server`(因为和`.conf`文件中指定的目录有关联)。进入项目目录`/var/www/rpbg-server`，运行：

```
pip3 install -r requirements.txt
```

安装python包依赖。然后运行：

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

创建本地sqlite3数据库.

之后进入`/var/www`目录下，设置文件和目录的权限，运行：

```bash
sudo cp rpbg-server/tti.conf /etc/apache2/sites-available/tti.conf
sudo chgrp -R www-data rpbg-server
sudo chmod -R 644 rpbg-server
sudo find rpbg-server -type d | xargs chmod 755
sudo chmod g+w rpbg-server
sudo chmod g+w rpbg-server/db.sqlite3
```

### 激活网站

```bash
sudo service apache2 reload 
sudo a2dissite 000-default && sudo a2ensite tti
sudo service apache2 restart
```

就可以通过服务器的公网IP地址，对服务端发起请求了。需要访问我们之前定义好的path，否则是404.比如可以访问`http://{SERVER_IP}/zlai/api/test/`

### 启动https

上面的步骤执行完之后，我们可以通过http协议访问网站了，但依然不能使用域名访问。要想使用域名访问的话，首先需要配置域名解析，将域名解析到服务器的IP

然后SSH到服务器，需要将项目代码中提供的`default-ssl.conf`移动到`/etc/apache2/sites-available/`目录下，然后对其中的内容进行修改：

- 将所有出现`stable-ai.tech`的地方改为自己的域名

之后将https证书的相关文件放到`/etc/apache2/ssl/`路径下：

```conf
SSLCertificateFile	/etc/apache2/ssl/stable-ai.tech_public.crt
SSLCertificateKeyFile /etc/apache2/ssl/stable-ai.tech.key
SSLCertificateChainFile /etc/apache2/ssl/stable-ai.tech_chain.crt
```

可以参考：[install-ssl-certificates-on-apache-servers](https://help.aliyun.com/zh/ssl-certificate/user-guide/install-ssl-certificates-on-apache-servers)

然后重启apache:

```
a2ensite default-ssl
sudo a2enmod ssl
sudo service apache2 reload && sudo service apache2 restart
```

此时应该就可以使用域名访问服务端接口了，可以到[https://www.myssl.cn/tools/check-server-cert.html](https://www.myssl.cn/tools/check-server-cert.html)检查https证书是否正确配置。

有了自己的域名之后，别忘了到前端项目代码的`util/session.tsx`中，更改`HOST`变量使其访问到自己的服务端接口。

### 服务端扩容

如果需要对服务端进行扩容，首选的扩容方式是使用CPU大一点的服务器。如果想要扩容到多台服务器的话，可以考虑使用阿里云的负载均衡，或者函数计算；此时需要将项目中使用的数据库配置为远程数据库而不是本地数据库；需要到项目中的`tti/settings.py`中对`DATABASES`进行配置，参考：[django databases](https://docs.djangoproject.com/en/4.1/ref/settings/#databases)

## 前端代码部署

首先，需要阅读[自定义模板中的前端代码](./5-nextjs-frontend.md)将代码配置好。

建立一个GitHub仓库（公有或者私有仓库都行），将前端的项目代码同步到这个仓库，也就是一级目录下包含`app/`, `package.json`等文件。

然后到[vercel](https://vercel.com/)绑定并授权自己的GitHub后，通过vercel部署一个新的项目，导入自己刚刚建立的仓库，然后等待vercel部署完成就行了。部署完之后可以通过vercel看到网页的访问URL

还可以到vercel的项目中的"settings-domains"中，添加自己的域名解析，自定义网站的URL

使用vercel部署无需关心扩容的问题，是自动扩缩容的。
