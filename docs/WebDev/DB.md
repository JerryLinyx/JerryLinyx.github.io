---
sidebar_position: 1
---

# PostgreSQL
https://www.postgresql.org/

全球数据库排行
https://db-engines.com/en/ranking
国产数据库排行
https://www.modb.pro/dbRank

## Draw DB Diagrams
https://dbdiagram.io/home

## Use Docker
```
docker ps
docker images
```

Go to https://hub.docker.com/ to search for image
```
# Pull a image
docker pull <image>:<tag>

# Start a image
docker run --name <container_name> -p <port>:<port> -e <environment> -d <image>:<tag>
e.g <environment>: POSTGRES_USER=, POSTGRES_PASSWORD=

# Run command in container
docker exec -it <container_name_or_id> <command> [args] 
e.g -U root

# View container logs
docker logs <container_name_or_id>
```

Or use [TablePlus](http://tableplus.com/)

## DB Migrate
https://github.com/golang-migrate/migrate