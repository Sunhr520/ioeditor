"use strict";
exports.__esModule = true;
exports.FileHandler = void 0;
var electron_1 = require("electron");
var mytab_1 = require("./mytab");
var fs = require("fs");
var FileHandler = /** @class */ (function () {
    function FileHandler() {
    }
    FileHandler.openFile = function () {
        electron_1.remote.dialog.showOpenDialog(electron_1.remote.getCurrentWindow(), {
            filters: [
                { name: 'All Files', extensions: ['*'] }
            ],
            properties: ['openFile', 'multiSelections']
        }).then(function (result) {
            for (var _i = 0, _a = result.filePaths; _i < _a.length; _i++) {
                var file = _a[_i];
                mytab_1.MyTab.create(file);
            }
        });
    };
    FileHandler.readText = function (file) {
        return fs.readFileSync(file).toString();
    };
    FileHandler.saveText = function (file, content) {
        fs.writeFileSync(file, content);
    };
    FileHandler.getFileType = function (file) {
    };
    return FileHandler;
}());
exports.FileHandler = FileHandler;
