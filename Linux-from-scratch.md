# Linux from Scratch

## Basic tricks
- 在命令行中使用上下键可以快速切换历史命令
- 按tab可以快速补全；比如补全一个文件名
- 连接Linux服务器：mac中直接ssh username@ip，FileZila传文件；Windows推荐MobaXterm；Jetbrains系列（PyCharm/GoLand）可在preference-deployment中添加服务器远程开发，设置好之后从tools-deployment-browse remote directory里面进去
- 连接到服务器时一般都是默认在某个用户的主目录下，比如你用的用户名是username，那你默认进入的目录就是/home/username；如果是超级用户（super user），则是root目录
- 如果在终端启动了某个进程（比如开始运行Python），按下control + c可以强制退出
- 同一个命令想换行输入，在行末加```\```就行
- 多个命令可以用```;```隔开表示紧接着执行；用```&&```隔开，表示前一个执行成功才执行；用```||```隔开，表示前一个执行失败再执行下一个
- 光标移动到行首：```ctrl+a```；光标移动到行尾：```ctrl+e```；光标移动到当前单词的词首：```alt+b```；光标移动到当前单词的词尾：```alt+f```
- ```ctrl + u```：剪切光标位置到行首的文本
- ```ctrl + k```: 剪切光标位置到行尾的文本
- ```ctrl + w```: 从光标向前删除一个单词
- 清除屏幕：```clear all``` == ```ctrl+l```
- 删除光标位置的字符：```ctrl+d```（如果无字符，会退出shell）
- ```man```加上命令名称可以显示该命令的用法，这是一个很好的习惯

## 高频基础命令
- 进入目录：cd dir1/dir2
    - 进入绝对路径：cd /dir1/dir2
    - 相对路径：cd ./dir1/dir2
    - 返回上一级目录：cd ..
    - 返回用户主目录：cd ~ 或者直接 cd
    - 回到前一个工作路径：cd -
- 创建目录：mkdir XXX
- 创建多级目录：mkdir -p dir1/dir2
- 显示当前目录：```pwd```
- 切换为超级用户登录：sudo -i（此时默认的主目录也会变成root目录）
- 显示目录下的所有文件/文件夹：ls
- 删除文件：rm XXX
- 删除目录：rm -rf XXX
- 从链接下载（下载安装包/压缩包...）：wget URL
- 解压zip：```unzip xxx.zip -d dir```
- 解压tar: ```tar -xf XXX.tar.gz```，加上-C解压到指定目录
- 打包目录为tar：```tar -zcvf XXX.tar.gz /path/to/dir```
- 在不解压的情况下查看内容：```tar -tf XXX.tar.gz```
- 复制/剪切：mv/cp src dest；强制执行：sudo mv/cp -f。注意dest也需要指定名字（该文件名或者文件夹名）
- 添加执行权限：```chmod +x file```
- 查看文件大小：```ls -lht```
- 查看文件夹大小：```du -h --max-depth=0```
- 命令后加上```| grep XXX```可以进行匹配搜索
- 查看绝对路径：```realpath XXX```

## 编辑文本文件：vim path/to/file
- 想要以只读模式进入：vim -R path/to/file
- 进入之后默认是阅读模式；输入**:**进入命令模式
- ```:set nu```显示行号
- ```:$```跳到最后一行
- ```:num```跳转到指定行
- control + f：向后翻页；control + b：向前翻页
- 向上 / 向下滚动一行: <Ctrl> + y / <Ctrl> + e
- 向上 / 向下滚动半页: <Ctrl> + d / <Ctrl> + u
- 阅读模式中按下i进入编辑模式，对文件进行编辑
- 编辑完成后按ESC退出编辑模式
- ```:q```直接退出；```:q!```强行退出（放弃更改）
- ```:wq```保存更改并退出；```:wq!```：强行保存并退出
- 检索关键词：输入```/```之后输入想要检索的内容，不过一次只能检索到一个地方，跳到下一处: n，跳到上一处：N
- 光标移到上一行/下一行/左移/右移：H/J/K/L（左下右上）
- 快速跳到行首行尾：0行首；$行尾
- 使用相对行数快速跳到前N行/后N行：输入N，然后按上/下键，比如输入5再按下键，会跳到该行的下面第5行
- w: 跳到下一个单词的首位
- e: 跳到下一个单词的末尾
- b：跳到上一个单词
- 显示目录树：ctrl + N
- 阅读模式下直接进行操作：d：删除；复制一个单词：Y A W；粘贴：P；复制N行：Y N Y；撤销：U
- ```dw```：删除下一个单词
- ```db```: 删除前一个单词
- ```d0```: 删除当前位置到行首的内容；```d$```: 删除当前位置到行尾的内容
- vim配置文件：```.vimrc```放到home目录下
  - 然后安装插件管理器：https://github.com/VundleVim/Vundle.vim
  - 然后进到.vimrc，运行```PluginInstall```（可以按tab补全）
  - 颜色：网上有很多，可以把```molokai.vim```放到```~/.vim/colors/```目录下
  - ```set ignorecase```: 查找时大小写不敏感
  - ```set smartcase```: 如果有一个大写字母，则切换到大小写敏感查找
- 其他有用的高频操作：
  - 跳转定义（权衡性能）
  - 显示git commit
  - 全局搜索/替换
- 替换文本：```:{range}s/{old}/{new}/{flag}```，s代表substitute
  - ```range```为空，则默认当前行；为```%```，则全文；为```a,b```形式，表示第a到b行；为```.,+n```形式，表示当前行到后面n行
  - ```flag```替换模式，为空，则默认只替换光标之后首次出现；为```g```，表示全局替换；为```c```，则每次替换前需要确认
- vim 复制到系统剪切板：普通复制是在visual模式下按y，再按行数，再按y；如果是复制到剪切板，是按”+y，再按行数，再按y
- ```%``` 在匹配的括号之间跳转。需要将光标放在 {}[]() 上，然后按 ```%```。 如果光标所在的位置不是 {}[]()，那么会向右查找第一个 {}[]()

## 实用命令
- 设置别名（比如每次ssh我都要复制服务器IP地址，很麻烦，这时直接用别名把ssh的操作命令存起来）：
    - ```alias 别名='原命令 -选项/参数'```
    - ```alias -p```：查看所有别名
    - ```unalias 别名```：删除别名
- 定时任务（当前用户）：
    - 新建配置文件，比如`my_crontest`，输入`0 * * * * python3 ~/test.py >> output.log`
    - `0 * * * *`这种时间配置可以参考crontab.guru，需要注意的另一点是后面的路径不要理解为相对路径，总是要假设在任何路径下运行这个命令都能跑起来，并且也不要对环境变量有任何的假设，否则很可能导致执行失败
    - 保存配置文件，然后`crontab my_crontest`，这个任务就会定时执行
    - 使用`crontab -l`查看当前的任务列表
    - `crontab -r`删除定时任务
- 设置环境变量：```export PATH=$PATH:dir1/dir2```
- 输出环境变量：```echo $SOME_PATH```
- 查看所有环境变量：```env```
- 查看某个命令的类型：```type -t echo```
- 搜索命令历史：```ctrl+r```
- 查看命令历史：```history```；清除命令历史：```history -c```；不记录命令历史：```export HISTSIZE=0```
- ```curl "XXX.com" -H "Cookie: XXX"```
- 从服务器下载文件到本地: ```scp username@ip_address:/home/username/XX/XX.file /Users/path/to/XX.file```
- 设置启动脚本（比如设置的别名，只在当前命令行有效，那下次重启的时候还要重新设置一次，所以写在启动脚本里面，每当启动命令行的时候就运行）：
    - 不同的命令行的启动脚本的名称不一样，最好上网查一下；Mac中iTerm终端的启动脚本为```~/.zshenv```；Linux默认一般为：```~/.bash_profile```
    - 可以把诸如别名设置、环境变量设置、代理设置等写入这些地方，这样不用每次都设置一遍
    - 也可以写在别的地方，如```~/.bashrc```，然后在自动启动的脚本中加上：```source ~/.bashrc```
    - 设置完之后如果想要立即生效，使用：```source XXX```
- 安装chrome：

```bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
chmod +x google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
```

- 启动局域网服务器，让别人可以下载文件：```python -m CGIHTTPServer```或者```python -m SimpleHTTPServer```或者```python -m http.server 8000```

- Mac/Linux 设置服务器免密SSH登录：
    - ```ssh-keygen -t rsa -C "message"```，然后一路enter
    - 将本地生成的SSH公钥id_ras.pub中的内容添加到服务器的~/.ssh/authorized_keys

- 分解因数：```factor XXX```


## 系统/网络
- ```uptime```或```w```来查看系统已经运行多长时间
- ```netstat```查看网络运行的细节
- ```top```，```iostat```：获取CPU和磁盘的使用状态
- ```free```, ```vmstat```：内存状态
- 查看当前系统：```uname```, ```uname -a```
- ```cal```: 简单的日历

## Python/Golang相关
- [Running a Python Script in the Background](https://janakiev.com/blog/python-background/)
- Python环境：
    - ```sudo apt-get install python3```
    - ```sudo apt-get install python3-pip```
- Python远程开发：
    - 直接在终端用Vim
    - PyCharm远程开发（本地运行）
    - Filezila先把文件下载到本地，开发完再上传
    - Jupyter Notebook：
        - ```pip3 install jupyter```；如果没有安装成功：```pip3 install --upgrade --force-reinstall --no-cache-dir jupyter```
        - ```jupyter notebook --generate-config```；然后进入/.jupyter/jupyter_notebook_config.py文件修改：c.NotebookApp.ip = '0.0.0.0'
        - 开放服务器的8888端口
        - ```jupyter notebook password```
        - ```jupyter notebook --no-browser```
- Mac上安装Go环境：
    - 安装homebrew：官网命令行安装
    - 使用brew安装Go：brew install go；输入go env可以看到go环境变量的一些设置；$GOROOT（Go的安装路径）已经设置好，不用手动设置
    - 设置其他的go环境变量（写在~/.bash_profile文件中，然后```source ~/.bash_profile```）：
    ```sh
    export GOPATH=~/go
    export GOBIN=$GOPATH/bin
    export PATH=$PATH:$GOBIN:$GOROOT/bin
    export GO111MODULE=on
    export GOPROXY="https://goproxy.cn,https://proxy.golang.org,direct"
    export GOSUMDB="sum.golang.google.cn"
    ```
    - 解释一下这些环境变量：
        - $GOPATH表示Go的工作目录，默认是用户目录下的/go目录，这个目录下面存放了所有进行go开发时用的文件，会包含三个子目录：```/pkg```存放一些依赖package, ```/bin```存放编译好的二进制文件, ```/src```里面就是所有的go源文件都在里面，你可能会有很多个项目，所有的项目都在 /src 文件夹下
        - $GOBIN一般设置为上面提到的go/bin/ 这个目录，并且一般会添加到环境变量，这样命令行输入某个install之后的go文件就可以直接运行
        - $GO111MODULE指通过go module管理包依赖，需要开启
        - $GOPROXY, $GOPRIVATE, $GOSUMDB 不用管，是我go get时由于没有设置代理，导致拉取依赖包不成功
- Linux上安装Go环境：
    - 可以先尝试sudo apt-get install go
    - 不成功的话可以用wget手动拉取[archive](https://golang.org/doc/install#tarball)，使用tar命令解压到/usr/local里面
    - 然后设置GOPATH（这时就需要手动设置GOROOT指定Go的安装路径）:
    ```sh
    export GOPATH=~/go
    export GOROOT=/usr/local/go
    export GOBIN=$GOPATH/bin
    export PATH=$PATH:$GOROOT/bin
    export GO111MODULE=on
    ```

## iterm
- command+d：建立分屏；command+shift+d：上下分屏

## 参考
- [Vim入门笔记](https://imageslr.com/2021/vim.html)
- [Bash脚本教程](https://wangdoc.com/bash/variable.html)
- [The art of command line](https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md)
