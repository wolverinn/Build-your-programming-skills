# Git Basic

对于 git，我认为只需要掌握平时工作中够用的就行，没必要深入地掌握非常高阶的东西，这些基本用法可以覆盖工作中的绝大多数场景，一些更高级的用法则可以遇到问题时再查。

所以，在 git 入门了之后，这部分也不用去看什么东西，慢慢在工作中就掌握了，或者让一个有工作经验的人来总结一下常用的，就够了。

## Git 最高频命令
- ```git add .```，```git add fileName```：会将本地文件作的改动存在**暂存区**
- ```git commit -m "message"```：将改动提交到**工作区**
- ```git push```：将改动提交到**远程仓库**
- ```git pull```：拉取远程分支的内容

## 其他基本命令
- ```git init```：在本地创建一个git仓库
- ```git clone XXX.git```：clone 一个远程git仓库
- ```git status```：查看本地文件当前的改动状态
- ```git diff```，```git diff fileName```：git add 之前，查看每个文件具体的改动
- ```git log```，```git log --graph --pretty=oneline --abbrev-commit```：查看提交记录
- ~~标签管理```git tag```，还没有用到过~~

## 分支管理
- 基于当前分支创建并切换到一个新的分支：```git checkout -b NEW_BRANCH```
- 查看本地所有分支：```git branch```
- 切换到其他分支：```git checkout BRANCH_NAME```
- 删除分支：```git branch -d BRANCH_NAME```
- 拉取远程指定分支：先```git fetch origin BRANCH_NAME```，再```git checkout -b BRANCH_NAME origin/BRANCH_NAME```

## 查看记录
- 查看当前分支的所有commit：```git log```，```git log --graph --pretty=oneline --abbrev-commit```
- 查看某个commitID的具体更改内容：```git show commitID```
- 查看某个文件的更改记录：```git log -p fileName```；也可以在VS Code里使用Gitlens插件

## 提交更改
- 在上一次commit的基础上进行了一个小改动，又不想为这次commit单独写一个 commit message，可以用：```git commit --amend --no-edit```，直接将改动添加到上一次的commit中。注意，这种方式有可能需要解决冲突（resolve conflict）
- ```.gitignore```里可以添加不想提交的文件或者文件名匹配格式，比如```output/*```可以忽略output文件夹下的所有文件
- 本地开发时，还不想把改动进行提交，但又必须切换到其他分支上，可以用：```git stash```，会将所有处于**暂存区**的文件先储藏起来，然后就可以切换到其他分支；查看stash的列表：```git stash list```；将stash中的文件恢复到当前分支并删除stash的内容：```git stash pop```
- 如果在其它分支上做了一个修改（比如修复了一个bug，这次修改有一个commitID），想要将这次修改应用到当前分支上，可以先切到特定分支上，使用```git log```找到commitID，然后切换到当前分支，使用：```git cherry-pick commitID```，可以复制一个特定的提交到当前分支
- 压缩commit信息：如果自己的分支上有太多commit，希望能将多个commit合并到一起，可以先```git log```看想要合并到哪一个commitID，选择这个commit的**上一个**commitID（比如叫commit_0），然后使用：```git rebase -i commit_0```，这时会出来一个文件，列出了在commit_0之后的所有commit，每个commit前的标志默认都是**pick**，即保留这次commit。如果想要合并某个commit，只需要把这个commit前的pick改成s（即squash，压缩的意思），然后保存退出文件，commit就被压缩了。最后再```git push -f```推送到远程仓库

### 分支合并
- 分支合并，比如想将```master```分支合并到```dev```分支（一般来说，这是将代码merge到master的必做操作，先将master合到自己的开发分支上），有两种方式：
    - 先切到```master```分支，```git pull```保证```master```分支是最新状态，然后切到```dev```分支，执行```git merge master```
    - 直接在```dev```分支上，执行```git pull origin master```，会将远程的master分支和本地的dev分支进行合并
- 合并分支的时候，如果有冲突，需要进到每个文件中分别解决冲突，确认是保留自己的版本还是合并分支的版本，解决完之后可以直接```git add .```，```git commit```提交

## 撤销与回滚
### 作了修改，还没 git add
想要撤销这些修改，可以使用```git checkout -f -- .```，```git checkout -f -- filename```

但是上面这些命令只能撤销modified files，对于untracked files还是没法撤销。想要撤销untracked files，可以用：```git clean -f```

### git add了，还没 git commit
使用```git reset HEAD```，```git reset HEAD fileName```，此时修改只存在于工作区，变为了 "unstaged changes"；再使用```git checkout -f -- .```撤销工作区的修改

### git commit 之后
- ```git revert commitID```. 其实，```git revert```可以用来撤销任意一次的修改，不一定要是最近一次
- ```git reset --hard commitID```/```git reset --hard HEAD^```（HEAD表示当前版本，几个^表示倒数第几个版本，倒数第100个版本可以用HEAD~100）；参数```--hard```：强制将暂存区和工作区都同步到指定的版本
- ```git reset```和```git revert```的区别是：reset是用来回滚的，将HEAD的指针指向了想要回滚的版本，作为最新的版本，而后面的版本也都没有了；而revert只是用来撤销某一次更改，对之后的更改并没有影响
- 然后再用```git push -f```提交到远程仓库