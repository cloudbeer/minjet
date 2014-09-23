minjet
======

Agile Project Management 敏捷项目管理


Start: bin/www


###Simple ORM Sample
----------

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

