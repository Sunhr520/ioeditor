"use strict";
exports.__esModule = true;
exports.Language = void 0;
var Language = /** @class */ (function () {
    function Language(name, lang, suffixs) {
        this.name = name;
        this.lang = lang;
        this.suffixs = suffixs;
    }
    Language.prototype.getSuffixs = function () {
        return this.suffixs;
    };
    Language.prototype.getName = function () {
        return this.name;
    };
    Language.prototype.getLang = function () {
        return this.lang;
    };
    Language.getLanguageBySuffix = function (suffix) {
        //alert(suffix);
        for (var _i = 0, _a = this.array; _i < _a.length; _i++) {
            var lang = _a[_i];
            for (var _b = 0, _c = lang.getSuffixs(); _b < _c.length; _b++) {
                var suf = _c[_b];
                if (suffix.toLowerCase() == ("." + suf))
                    return lang;
            }
        }
        return this["default"];
    };
    Language.init = function () {
        this.array.push(new Language("C++", "cpp", ["cpp", "cc", "hpp", "h", "cxx", "c++"]));
        this.array.push(new Language("Batch", "bat", ["bat", "cmd"]));
        this.array.push(new Language("C#", "csharp", ["cs"]));
        this.array.push(new Language("C", "c", ["c"]));
        this.array.push(new Language("CSS", "css", ["css"]));
        this.array.push(new Language("Go", "go", ["go"]));
        this.array.push(new Language("HTML", "html", ["html", "htm"]));
        this.array.push(new Language("JSON", "json", ["json"]));
        this.array.push(new Language("INI", "ini", ["ini"]));
        this.array.push(new Language("Java", "java", ["java"]));
        this.array.push(new Language("JavaScript", "javascript", ["js"]));
        this.array.push(new Language("Lua", "lua", ["lua"]));
        this.array.push(new Language("Markdown", "markdown", ["md"]));
        this.array.push(new Language("PHP", "php", ["php"]));
        this.array.push(new Language("Python", "python", ["py"]));
        this.array.push(new Language("Shell", "shell", ["sh"]));
        this.array.push(new Language("TypeScript", "typescript", ["ts"]));
        this.array.push(new Language("XML", "xml", ["xml"]));
        this.array.push(new Language("YAML", "yaml", ["yml", "yaml"]));
        this["default"] = new Language("Plain", "plaintext", []);
    };
    Language.array = [];
    return Language;
}());
exports.Language = Language;
