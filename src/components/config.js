"use strict";
exports.__esModule = true;
exports.Config = void 0;
var fs = require("fs");
var path = require("path");
var jsonc_1 = require("jsonc");
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.init = function () {
        this.load(this.examplePath);
        this.json = this.load(this.path);
    };
    Config.updateFontSize = function (size) {
        if (size <= 0)
            return;
        this.fontSize = size;
        this.json["fontSize"] = size;
        this.save();
    };
    Config.save = function () {
        fs.writeFileSync(path.join(__dirname, "../assets/config/config.json"), jsonc_1.jsonc.stringify(this.json, null, 4));
    };
    Config.load = function (file) {
        var json = jsonc_1.jsonc.parse(fs.readFileSync(file).toString());
        if (json.theme)
            Config.theme = json.theme;
        if (json.fontFamily)
            Config.fontFamily = json.fontFamily;
        if (json.fontSize)
            Config.fontSize = json.fontSize;
        if (json.tabSize)
            Config.tabSize = json.tabSize;
        if (json.insertSpaces)
            Config.insertSpaces = json.insertSpaces;
        if (json.autoClosingBrackets)
            Config.autoClosingBrackets = json.autoClosingBrackets;
        if (json.autoClosingQuotes)
            Config.autoClosingQuotes = json.autoClosingQuotes;
        if (json.autoIndent)
            Config.autoIndent = json.autoIndent;
        if (json.folding)
            Config.folding = json.folding;
        if (json.lineNumbers)
            Config.lineNumbers = json.lineNumbers;
        if (json.mouseWheelZoom)
            Config.mouseWheelZoom = json.mouseWheelZoom;
        if (json.renderIndentGuides)
            Config.renderIndentGuides = json.renderIndentGuides;
        if (json.miniMap)
            Config.minimap = json.miniMap;
        if (json.autoComplete)
            Config.autoComplete = json.autoComplete;
        return json;
    };
    Config.path = path.join(__dirname, "../assets/config/config.json");
    Config.examplePath = path.join(__dirname, "../assets/config/config-example.jsonc");
    return Config;
}());
exports.Config = Config;
