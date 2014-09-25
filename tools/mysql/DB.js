var mysql = require("mysql");
/*
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "skyrds01.mysql.rds.aliyuncs.com",
  user: "minjet",
  password: "CoKHLUPcRT4c3hpgTDVTJddf",
  database: "minjet"
});
*/
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "zhwell",
  database: "minjet"
});



var DB = {
  save: function(table, model, callback){
    var keyCond = "", sql = "insert into ";
    var isInsert = true;
    if (model['id']!==undefined){
        keyCond = "where id=" + model['id'];
        sql = "update ";
        isInsert = false;    
    }
    sql += table + " set ? " + keyCond;
    delete model.id;
    pool.query(sql, model, function(err, result){
      if (isInsert) model.id = result.insertId;
      if (callback){
        callback(err, model);
      } else{
        throw err;
      }
    });
  },
  exists: function(table, where, params, callback){
    var sql = "select count(*) as count from " + table + " where " + where;
    pool.query(sql, params, function(err, rows, fields){
      if (err) throw err;
      callback(rows[0].count>0);
    });
  },
  loadById: function(table, id, callback){
    load(table, "id=?", [id], callback);
  },
  load: function(table, where, params, callback){
    var sql = "select * from " + table + " " + where;   
    pool.query(sql, params, function(err, rows, fields){
      if (err) throw err;
      callback(rows[0]);
    });
  },
  list: function(table, where, params, callback, pageSize, page){
    var limitStr = "";
    if (pageSize!=null && pageSize>0){
      if (!page) page = 1;
      var start = (page - 1) * pageSize;
      limitStr = " limit " + start + ", " + pageSize;
    }
    var sql ="select * from " + __table + " where " + where + limitStr;
    pool.query(sql, params, function(err, rows, fields){
      if (err) throw err;
      callback(rows);
    });
  },
  count: function(table, where, params, callback){
    var sql ="select count(*) as count from " + table + " where " + where;
    pool.query(sql, params, function(err, rows, fields){
      if (err) throw err;
      callback(rows[0].count);
    });
  },
  query: function(sql, params, callback){
    pool.query(sql, params, function(err, rows, fields){
      if (err) throw err;
      callback(rows, fields);
    });    
  }
}

module.exports = DB;
