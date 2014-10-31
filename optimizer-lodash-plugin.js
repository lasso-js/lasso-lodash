var fs = require('fs');
var lodash = require('lodash');

function compileFile(path, callback) {
    fs.readFile(path, 'utf8', function(err, src) {
        if (err) {
            return callback(err);
        }
        callback(null, 'module.exports=function(_) { return ' + lodash.template(src).source + '\n};');
    });
}

module.exports = function(optimizer, config) {
    var ext = config.ext || 'lodash';

    [ext].forEach(function(ext) {
         optimizer.dependencies.registerRequireType(
             ext,
             {
                 properties: {
                     'path': 'string'
                 },

                 init: function(optimizerContext, callback) {
                     if (!this.path) {
                         return callback(new Error('"path" is required for a Lodash dependency'));
                     }

                     this.path = this.resolvePath(this.path);
                     callback();
                 },

                 read: function(optimizerContext, callback) {
                     compileFile(this.path, callback);
                 },

                 getSourceFile: function() {
                     return this.path;
                 },

                 getLastModified: function(optimizerContext, callback) {
                     optimizerContext.getFileLastModified(this.path, callback);
                 }
             });
    });
};
