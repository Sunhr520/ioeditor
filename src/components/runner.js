"use strict";
exports.__esModule = true;
exports.Runner = void 0;
var child_process_1 = require("child_process");
var path = require("path");
var fs = require("fs");
var utils_1 = require("./utils");
var Runner = /** @class */ (function () {
    function Runner() {
    }
    Runner.cprun = function (tab) {
        var lang = tab.getLanguage().getLang();
        //alert(path.join(__dirname, "../../scripts/"+ lang +".bat"))
        var script = path.join(__dirname, "../assets/scripts/" + lang + ".bat");
        //alert(script);
        if (!fs.existsSync(script)) {
            alert("暂时不支持这种类型的文件运行.");
            return;
        }
        tab.save();
        var file = tab.getFile();
        var execFile = path.join(path.dirname(file), path.basename(file, path.extname(file)));
        child_process_1.exec("start " + script + " " + utils_1.Utils.pathWithQuotes(file) + " " + utils_1.Utils.pathWithQuotes(execFile) +
            " " + utils_1.Utils.pathWithQuotes(path.dirname(file)) + " " + path.basename(file).split(".")[0]);
    };
    return Runner;
}());
exports.Runner = Runner;
