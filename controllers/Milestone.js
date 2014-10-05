var db = require('../share/mysql/DB');
var errors = require('../share/errors');
var utils = require('../share/utils');

var Milestone = {
  save: function (req, res, next) {
    var mileStone = req.body;
    var project_id = req.body.project_id;
    var user_id = req.session.user.id;

    if (!project_id || project_id <= 0) {
      throw errors.PARAMETER_REQUIRED("project_id required.");
    }
    utils.checkProjectOwner(project_id, user_id, function () {
      if (mileStone.hasOwnProperty("id") && mileStone.id > 0) {
        mileStone.updator = user_id;
        mileStone.update_date = new Date();
      } else {
        mileStone.creator = user_id;
      }
      db.save("milestone", mileStone, function (err, mileStone2) {
        if (err) return next(err);
        res.send({code: 1, data: mileStone2});
      });
    });
  }

};