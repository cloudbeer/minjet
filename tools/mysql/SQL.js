/**
This can write sql string in mysql dialect.
*/
var SQL = {
  /**
  Model sample:
  {__table: 'account', id: 1, email: 'cloudbeer@gmail.com'}
  __table is a reserved keyword.
  */
	save: function(model){
    var keyCond = "", setArr = "", sql = "insert into ";
    var table = model['__table'];
    if (table===undefined){
      throw new Error('You must prefer [__table] parameter in your model');
    }
    if (model['id']!==undefined){
        keyCond = " where id=" + model['id'];
        sql = "update "      
    }
    for (var key in model){
      if (key != '__table' && key != "id"){
        setArr += key + "=";
        var val = model[key]
        if (typeof val == "string"){
          setArr += "'" + val + "',";
        }else{
          setArr += val + ",";
        }
      }
    }
    setArr = setArr.substr(0, setArr.length-1);
    return sql + table + " set " + setArr + keyCond;
	},
  existsWhere: function(__table, where){
    return "select count(*) as count from " + __table + " where " + where;
  },
  existsExact: function(__table, condition){
    var sql = "select count(*) as count from " + __table + " where ";
    for (var key in condition){
      var val = condition[key]
      sql += key + "="
      if (typeof val == "string"){
        sql += "'" + val + "' and ";
      }else{
        sql += val + " and ";
      }
    }
    sql = sql.substr(0, sql.length-5);
    return sql;
  },
  load: function(__table, id){
    return "select * from " + __table + " where id=" + id;
  },
  loadWhere: function(__table, where){
    return "select * from " + __table + " where " + where;
  },
  listWhere: function (__table, where, pageSize, page) {
    var limitStr = "";
    if (pageSize!=null && pageSize>0){
      if (!page) page = 1;
      var start = (page - 1) * pageSize;
      limitStr = " limit " + start + ", " + pageSize;
    }
    return "select * from " + __table + " where " + where + limitStr;
  },
  countWhere: function (__table, where) {
    return "select count(*) as count from " + __table + " where " + where;
  },

}

module.exports = SQL;

