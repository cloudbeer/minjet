var ZippyHttp = require('./ZippyHttp');

var get = function (url, callback) {
  //http.afterLoginGet('cloudbeer@gmail.com', '111', url, callback);
  ZippyHttp.get("http://localhost:3000" + url, callback);
};
var post = function (url, params, callback) {
  ZippyHttp.post("http://localhost:3000" + url, params, callback);
};

/*
 get( "http://localhost:3000/api/account/list-nick/cloudbeer", function(chunck){
 console.log("这个是我希望的结果：" + chunck);
 });
 */


//ZippyHttp.login('cloudbeer@gmail.com', '111');
//return;

//get("/api/project/mine", function(chunck){
//  console.log("这个是我希望的结果：" + chunck);
//});

//get("/api/project/4/milestones", function(chunck){
//  console.log("这个是我希望的结果：" + chunck);
//});

post("/api/milestone/save",
  {
    title: 'sprint1',
    content: 'it is a sprint',
    project_id: 4,
    start_date: '2014-10-1',
    end_date: '2014-11-11'
  },
  function (chunk) {
    console.log(chunk);
  });
