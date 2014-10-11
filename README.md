Minjet
======

Agile Project Management 敏捷项目管理

* 服务器端代码库：npm install
* 客户端代码库： bower install
* 启动: bin/www

## 一些技术

* This is a Express web app
* Server side Template engine is Jade
* Client side 使用 Angular
* Orm .... 自己写的简单的ORM，参考下面


###Simple ORM 

习惯优于配置, 以下习惯需要遵守：
* 数据库设计使用自增的 “id” 做为主键。


####Sample

```javascript
DB.save("account", {email: 'cloudbeer@gmail.com', nick: 'cloudbeer', password: '1111'}, function(err, account){
  //...
});

DB.load('account', "email=:email", {email: 'cloudbeer@gmail.com'}, function(err, account){
  //...
});

DB.exists('account', "email=?", ['cloudbeer@gmail.com'], function(err, exists){
  //...
});

```

##API for front-end

#### POST /account/login

 登录 email, password

#### POST /account/register

 注册 email, password, nick

#### GET /api/account/find-nick/:nick

精确找到 nick 的用户

#### GET /api/account/list-nick/:nick

模糊匹配 nick 的用户列表

#### GET /api/project/mine

我创建的项目，需要先登录才能访问

#### POST /api/project/save

传入 title content 等，保存项目，如果数据里有id字段，则是更新，否则是插入

#### POST /api/project/delete

传入 "project_id"，强制删除项目，同时会删除相关内容。

#### GET /api/project/:id/milestones

指定项目下的里程碑列表

#### GET /api/project/:id/backlogs

指定项目下的堆积任务列表

#### POST /api/project/add-member

为项目增加用户

#### POST /api/milestone/save

保存里程碑（冲刺）

#### GET /api/milestone/mine

我创建的里程碑列表

#### GET /api/milestone/mine/p/:project_id

指定项目里我创建的里程碑列表

#### GET /api/milestone/:id/tasks

指定里程碑下的任务列表

#### POST /api/task/save

保存任务

#### GET /api/task/mine

我的任务列表

#### GET /api/task/mine/p/:project_id

指定项目中我的任务列表

#### GET /api/task/mine/m/:milestone_id

指定里程碑中我的任务列表

#### POST /api/task/assign

为任务分配责任人/所有者

#### POST /api/task/assign-milestone

为任务分配里程碑


#### 更多api尽在文件/routes/rest.js，更多数据结构参考数据库设计文档，数据库字段设计可直接映射到前端。

