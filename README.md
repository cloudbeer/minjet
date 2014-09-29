Minjet
======

Agile Project Management 敏捷项目管理

* 服务器端代码库：npm install
* 客户端代码库： bower install
* 启动: bin/www

## 一些技术

* This is a Express web app
* Server side Template engine is Jade
* Client side Template engine is doT
* Orm .... 自己写的简单的ORM，参考下面


###一些约定

web json 数据交互的格式：

成功的请求

{code: 1}

失败的请求

{code: 0, message:'登录失败'} 


###Simple ORM 

习惯优于配置, 以下习惯需要遵守：
* 数据库设计使用自增的 “id” 做为主键。


####Sample

```javascript
DB.save("account", {email: 'cloudbeer@gmail.com', nick: 'cloudbeer', password: '1111'}, function(err, account){
  //...
});

DB.load('account', "email=:email", {email: 'cloudbeer@gmail.com'} function(error, account){
  //...
});

DB.exists('account', "email=?", ['cloudbeer@gmail.com'], function(err, exists){
  console.log(exists);
});

```

##API for front-end
#### POST /api/login

 email, password

#### POST /api/register

 email, password, nick

#### GET /api/account/find_nick/:nick

精确找到 nick 的用户

#### GET /api/account/list_nick/:nick

模糊匹配 nick 的用户列表

#### GET /api/project/mine

我创建的项目，需要先登录才能访问

#### /api/project/save

POST title content 等

#### 更多api尽在文件/routes/rest.js，更多数据结构参考数据库设计文档


###TODO
* register.jade 没有做前端校验。