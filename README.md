minjet
======

Agile Project Management 敏捷项目管理


Start: bin/www


###Simple ORM 

习惯优于配置
以下习惯需要遵守：
* 数据库设计使用自增的 “id” 做为主键。
* 不要使用关键字 “__table”


####Sample

```javascript
DB.save({__table: 'account',  email: 'cloudbeer@gmail.com'});

DB.existsWhere('account', "email='cloudbeer@gmail.com1'", function(isOk){
  console.log(isOk);
});

DB.existsExact('account',{email:'cloudbeer@gmail.com', account_status:1}, function(isOk){
  console.log(isOk);
});
DB.load('account',1, function(res){
  console.log(res);
});
DB.loadWhere('account',"id=1", function(res){
  console.log(res);
});
DB.listWhere('account',"id=1", function(res){
  console.log(res);
}, 20, 0);

DB.countWhere('account',"1=1", function(res){
  console.log(res);
});
```

###TODO
* register.jade 没有做前端校验。