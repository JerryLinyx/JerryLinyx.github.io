---
title: "Go Web 工程资料"
slug: /notes/engineering/go-web-resources
topic: "Engineering"
description: "Go、Gin、JWT、PostgreSQL 与 Redis 的工程参考资料，整理自原站的分散记录。"
---

这是工程实践中的参考索引，保留原有链接和命令记录，按使用场景集中整理。

## Go 学习与项目

### Go Tutorial

- [8 小时转职 Golang 工程师](https://www.yuque.com/aceld/mo95lb)

### Go Project

- [Golang全栈编程实况](https://space.bilibili.com/10/lists)
- [7 天用 Go 从零实现 Web 框架 Gee 教程 | 极客兔兔](https://geektutu.com/post/gee.html)
- [avelino/awesome-go](https://github.com/avelino/awesome-go)
- [uhub/awesome-go](https://github.com/uhub/awesome-go)
- [filebrowser/filebrowser](https://github.com/filebrowser/filebrowser)
- [blevesearch/bleve](https://github.com/tannerryan/ring)：文本索引库
- [VictoriaMetrics/fastcache](https://github.com/VictoriaMetrics/fastcache)：线程安全的内存缓存
- [tidwall/buntdb](https://github.com/tidwall/buntdb)：可嵌入的内存 KV 数据库，支持索引与地理空间特性
- [woodpecker-ci/woodpecker](https://github.com/woodpecker-ci/woodpecker)：带前端的可扩展 CI 引擎

## Gin Web 框架

[Gin Web Framework 中文文档](https://gin-gonic.com/zh-cn/docs/)
[Gin框架介绍及使用 - 李文周](https://www.liwenzhou.com/posts/Go/gin/)

## 身份认证与 JWT

### JWT

https://jwt.io/introduction
https://jwt.io/libraries

```bash
go get github.com/golang-jwt/jwt/v5
```

- Header

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- Payload
- Signature

## PostgreSQL 与容器

https://www.postgresql.org/

全球数据库排行
https://db-engines.com/en/ranking
国产数据库排行
https://www.modb.pro/dbRank

### Draw DB Diagrams

https://dbdiagram.io/home

### Use Docker

```
docker ps
docker images
```

Go to https://hub.docker.com/ to search for image

```
docker pull <image>:<tag>

docker run --name <container_name> -p <port>:<port> -e <environment> -d <image>:<tag>
e.g <environment>: POSTGRES_USER=, POSTGRES_PASSWORD=

docker exec -it <container_name_or_id> <command> [args]
e.g -U root

docker logs <container_name_or_id>
```

Or use [TablePlus](http://tableplus.com/)

### DB Migrate

https://github.com/golang-migrate/migrate

## Redis

https://redis.io/ Redis 官网
