---
title: 快速搭建个人博客：Github部署Hexo (MacOS)
date: '2024-04-18T17:24:51'
authors:
- jerry
tags:
- Frontend
- Hexo
---

### 安装 Brew
[brew](https://brew.sh)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
<!-- truncate -->

### 安装 Git, Node.js
```bash
brew install git
brew install node
```

### 查看安装情况
```bash
npm -v
node -v
git --version
```

### 安装 Hexo
```bash
npm install -g hexo-cli
hexo init blog
cd blog
hexo g
hexo s
```

### 部署到GitHub
```bash
git config --global user.name "username"
git config --global user.email "example@example.com"
ssh-keygen -t rsa -C "example@example.com"
```
最后一行在 ~/.ssh/id_rsa.pub 目录下，生成需要使用的公钥
进入账户主文件夹，按 Command+Shift+. 显示隐藏文件，找到.ssh文件夹，打开id_rsa.pub，复制全部
打开 [GitHub->Settings->SSH keys](https://github.com/settings/keys)，新建 New SSH Key，使用我们复制的公钥，点击 Add SSH key

在Github上新建一个仓库，Repository Name 为 用户名.github.io，仓库状态设为 Public，点击 Create Repository 创建新的网站仓库。

#### 在blog文件夹下

```bash
npm install hexo-deployer-git --save
```
编辑blog文件夹下的_config.yml文件，在底部修改deploy部分为：
```bash
deploy:
  type: git
  repo: git@github.com:你的用户名/你的用户名.github.io.git
  branch: master
```
完成后：
```bash
#生成blog
hexo g
#将blog推送到指定位置，即Github
hexo d
```

#### 打开 Repository 的 Pages 功能
打开repository的Settings -> Pages -> Branch 选择 master，点击 Save
此时blog已经成功部署在 用户名.github.io，通常需要等待几分钟

### Hexo常用命令
```bash
# 生成一篇名为title的新文章
hexo new title

# 在blog文件夹下执行
hexo n "文章名称"  => hexo new "文章名称"  #这两个都是创建新文章，前者是简写模式，下同，new后面加一个draft可以生成草稿
hexo p  => hexo publish  #发布草稿
hexo g  => hexo generate  #生成
hexo s  => hexo server  #启动服务预览
hexo d  => hexo deploy  #部署

hexo server   #Hexo 会监视文件变动并自动更新，无须重启服务器。
hexo server -s   #静态模式
hexo server -p 5000   #更改端口
hexo server -i 192.168.1.1   #自定义IP
hexo clean   #清除缓存，网页正常情况下可以忽略此条命令
```

### Reference：
[Mac OS环境下使用Hexo搭建个人博客](https://blog.l3zc.com/2022/05/mac环境下使用hexo搭建个人博客/)
[GitHub Pages + Hexo免费搭建个人博客_Mac](https://zhuanlan.zhihu.com/p/114195340)
[听说创客们都有这样一个自己的博客听说创客们都有这样一个自己的博客](https://mp.weixin.qq.com/s/jVEv9jHV3WS5nAkVOmAcng)
[Butterfly 安裝文檔(一) 快速開始](https://butterfly.js.org/posts/21cfbf15/#安裝) -->
