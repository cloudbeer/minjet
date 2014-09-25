minjet
======

Agile Project Management 敏捷项目管理


Start: bin/www


###Simple ORM 

习惯优于配置
以下习惯需要遵守：
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

###TODO
* register.jade 没有做前端校验。