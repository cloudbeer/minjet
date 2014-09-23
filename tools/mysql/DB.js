var mysql = require("mysql");
var SQL = require("./SQL");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "zhwell",
  database: "minjet"
});


var DB = {
  save: function(model){
    var sql = SQL.save(model);
    pool.query(sql, function(err, rows, fields, callback){
      if (err) throw err;
      console.log(rows);
    });
  },
  existsWhere: function(__table, where, callback){
    var sql = SQL.existsWhere(__table, where);
    pool.query(sql, function(err, rows, fields){
      if (err) throw err;
      callback(rows[0].count>0);
    });
  },
  existsExact: function(__table, where, callback){
    var sql = SQL.existsExact(__table, where);
    
    pool.query(sql, function(err, rows, fields){
      if (err) throw err;
      callback(rows[0].count>0);
    });
  },
  load: function(__table, id, callback){
    var sql = SQL.load(__table, id);    
    pool.query(sql, function(err, rows, fields){
      if (err) throw err;
      callback(rows[0]);
    });
  },
  loadWhere: function(__table, where, callback){
    var sql = SQL.loadWhere(__table, where);    
    pool.query(sql, function(err, rows, fields){
      if (err) throw err;
      callback(rows[0]);
    });
  },
  listWhere: function(__table, where, callback, pageSize, page){
    var sql = SQL.listWhere(__table, where, pageSize, page);
    pool.query(sql, function(err, rows, fields){
      if (err) throw err;
      callback(rows);
    });
  },
  countWhere: function(__table, where, callback){
    var sql = SQL.countWhere(__table, where);
    pool.query(sql, function(err, rows, fields){
      if (err) throw err;
      callback(rows[0].count);
    });
  },
  query: function(sql, callback){
    pool.query(sql, function(err, rows, fields){
      if (err) throw err;
      callback(rows, fields);
    });    
  }
}

module.exports = DB;
