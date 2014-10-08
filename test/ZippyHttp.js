var http = require('http');
var url = require('url');
var fs = require('fs');


var setCookie = function (headers) {
  var cookieInStore = fs.readFileSync('./cookie-temp', 'utf-8');
  //console.log('old cookie: ' + cookieInStore);
  headers.Cookie = cookieInStore;
};
var saveCookie = function (headers) {
  var sessionCookie = headers['set-cookie'];
  if (sessionCookie && sessionCookie.length > 0) {
    for (var i in sessionCookie) {
      var xs = sessionCookie[i];
      if (xs.indexOf("connect.sid") >= 0) {
        //console.log('new cookie:', xs);
        var cookieSet = xs.substr(0, xs.indexOf(';'));
        fs.writeFileSync('./cookie-temp', cookieSet);
        break;
      }
    }
  }
};

var get = module.exports.get = function (urlStr, callback) {
  var pUrl = url.parse(urlStr);
  var options = {
    hostname: pUrl.hostname,
    port: pUrl.port,
    path: pUrl.path,
    method: 'GET'
  };
  var headers = {};
  setCookie(headers);
  options.headers = headers;

  var req = http.request(options, function (res) {
    //console.log('STATUS: ' + res.statusCode);
    var xheaders = res.headers;
    saveCookie(xheaders);
    res.setEncoding('utf8');
    res.on('data', callback);
  });

  req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
  });
  req.end();
};


var post = module.exports.post = function (urlStr, params, callback) {
  var pUrl = url.parse(urlStr);
  var options = {
    hostname: pUrl.hostname,
    port: pUrl.port,
    path: pUrl.path,
    method: 'POST'
  };

  var kvStr = "";
  for (var k in params) {
    kvStr += k + "=" + encodeURIComponent(params[k]) + "&";
  }
  kvStr = kvStr.substr(0, kvStr.length - 1);

  console.log(kvStr, Buffer.byteLength(kvStr));

  var headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Content-Length': Buffer.byteLength(kvStr)
  };
  //setCookie(headers);
  options.headers = headers;

  var req = http.request(options, function (res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log(res.headers);
    saveCookie(res.headers);
    res.setEncoding('utf8');
    res.on('data',callback);
  });

  req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
  });

  req.write(kvStr);

  req.end();
};
var login = module.exports.login = function(email, password){
  post("http://localhost:3000/account/login", {email: email, password: password}, function (result) {
    console.log('登录结果', result);
  });
};

var afterLoginGet = module.exports.afterLoginGet = function (email, password, urlGet, callback) {
  post("http://localhost:3000/account/login", {email: email, password: password}, function (result) {
    //console.log(chunk);
    console.log('登录结果', result);
    get(urlGet, callback);
  });
};

var afterLoginPost = module.exports.afterLoginPost = function (email, password, urlPost, params, callback) {
  post("http://localhost:3000/account/login", {email: email, password: password}, function (result) {
    console.log('登录结果', result);
    post(urlPost, params, callback);
  });
};

//get("http://localhost:3000/");

