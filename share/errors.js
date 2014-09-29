module.exports.NotFound = NotFound = function(message) {
    this.name = "NotFound";
    this.message = (message || "Not found.");
};
NotFound.prototype = Error.prototype;

module.exports.Duplicated = Duplicated = function(message) {
    this.name = "Duplicate";
    this.message = (message || "Duplicated.");
};
Duplicated.prototype = Error.prototype;

module.exports.PasswordWrong = PasswordWrong = function(message) {
    this.name = "PasswordWrong";
    this.message = (message || "Password is wrong.");
};
PasswordWrong.prototype = Error.prototype;


module.exports.CanNotDelete = CanNotDelete = function(message) {
  this.name = "CanNotDelete";
  this.message = (message || "有外键关联，无法删除");
};
CanNotDelete.prototype = Error.prototype;





