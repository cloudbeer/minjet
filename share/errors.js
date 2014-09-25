module.exports.NotFound = NotFound = function(message) {
    this.name = "NotFound";
    this.message = (message || "Not found.");
}
NotFound.prototype = Error.prototype;

module.exports.Duplicated = Duplicated = function(message) {
    this.name = "Duplicate";
    this.message = (message || "Duplicated.");
}
Duplicated.prototype = Error.prototype;




