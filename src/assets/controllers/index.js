"use strict";
exports.__esModule = true;

var path = require("path");
var electron_1 = require("electron");
var mytab_1 = require("../../components/mytab");
var filehandler_1 = require("../../components/filehandler");
var language_1 = require("../../components/language");
var runner_1 = require("../../components/runner");
var config_1 = require("../../components/config");
var fs = require("fs");
mytab_1.MyTab.init();
language_1.Language.init();
try {
    config_1.Config.init();
}
catch (e) {
}
loadComponents(function () {
    /*
    fetch(path.join(__dirname, '../../themes/Monokai.json'))
    .then(data => data.json())
    .then(data => {
        monaco.editor.defineTheme('monokai', data);
        monaco.editor.setTheme('monokai');
    })
    */

    monaco.editor.defineTheme('vs-dark-plus', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'yuhangq.key.if', foreground: 'c586c0' },
            { token: 'yuhangq.key.return', foreground: 'c586c0' },
            { token: 'yuhangq.key.while', foreground: 'c586c0' },
            { token: 'yuhangq.key.else', foreground: 'c586c0' },
            { token: 'yuhangq.key.continue', foreground: 'c586c0' },
            { token: 'keyword.directive.include', foreground: 'c586c0' },
            { token: 'yuhangq.key.define', foreground: 'c586c0' },
            { token: 'yuhangq.key.public', foreground: 'c586c0' },
            { token: 'yuhangq.key.private', foreground: 'c586c0' },
            { token: 'yuhangq.key.protected', foreground: 'c586c0' },
            { token: 'yuhangq.key.inline', foreground: 'c586c0' },
            { token: 'yuhangq.key.const', foreground: 'c586c0' },
            { token: 'yuhangq.key.using', foreground: 'c586c0' },
            { token: 'yuhangq.key.break', foreground: 'c586c0' },
            { token: 'yuhangq.key.case', foreground: 'c586c0' },
            { token: 'yuhangq.key.register', foreground: 'c586c0' },
            { token: 'yuhangq.key.for', foreground: 'c586c0' },
            { token: 'yuhangq.key.operator', foreground: 'c586c0' },
            { token: 'yuhangq.key.switch', foreground: 'c586c0' },
            { token: 'yuhangq.key.do', foreground: 'c586c0' },
            { token: 'yuhangq.key.new', foreground: 'c586c0' },
            { token: 'yuhangq.key.true', foreground: 'c586c0' },
            { token: 'yuhangq.key.false', foreground: 'c586c0' },
            { token: 'yuhangq.key.sizeof', foreground: 'c586c0' },
            { token: 'yuhangq.key.friend', foreground: 'c586c0' },
            { token: 'yuhangq.key.operator', foreground: 'c586c0' },
            { token: 'yuhangq.function', foreground: 'dcdcaa' },
        ],
        colors: {}
    });
    mytab_1.MyTab.createUntitled();
    mytab_1.MyTab.setExampleEditor(monaco.editor.create(document.getElementById("config-example"), {
        value: filehandler_1.FileHandler.readText(config_1.Config.examplePath),
        language: "json",
        automaticLayout: true,
        theme: config_1.Config.theme,
        fontSize: mytab_1.MyTab.getFontSize(),
        autoClosingBrackets: "always",
        autoIndent: "brackets",
        mouseWheelZoom: config_1.Config.mouseWheelZoom,
        fontFamily: config_1.Config.fontFamily,
        //useTabStops: Config.tabSize
        //useTabStops: false,
        //glyphMargin: true,
        readOnly: true,
        folding: config_1.Config.folding,
        renderIndentGuides: config_1.Config.renderIndentGuides,
        minimap: { enabled: false },
        autoComplete: config_1.Config.autoComplete
    }));
    document.getElementById("config-example").hidden = true;
});
electron_1.ipcRenderer.on("action", function (event, arg) {
    switch (arg) {
        case "new":
            mytab_1.MyTab.createUntitled();
            break;
        case "open":
            filehandler_1.FileHandler.openFile();
            break;
        case "save":
            mytab_1.MyTab.getActiveTab().saveFile();
            break;
        case "saveas":
            mytab_1.MyTab.getActiveTab().saveAs();
            break;
        case "closetag":
            mytab_1.MyTab.getActiveTab().close();
            break;
        case "cprun":
            runner_1.Runner.cprun(mytab_1.MyTab.getActiveTab());
            break;
        case "font-larger":
            mytab_1.MyTab.setFontSize(mytab_1.MyTab.getFontSize() + 1);
            break;
        case "font-smaller":
            mytab_1.MyTab.setFontSize(mytab_1.MyTab.getFontSize() - 1);
            break;
        case "remove-settings":
            fs.writeFileSync(config_1.Config.path, "{}");
            alert("重置设置成功，程序将关闭。");
            electron_1.ipcRenderer.send("quit");
            break;
        //case "devtools": console.log(require("../background").win);break;
        case "settings":
            mytab_1.MyTab.create(config_1.Config.path);
            break;
        case "newSnippets": electron_1.ipcRenderer.send("snippets"); break;
        case "quit":
            var tabs = mytab_1.MyTab.getTabs();
            var cnt = 0;
            for (var _i = 0, tabs_1 = tabs; _i < tabs_1.length; _i++) {
                var tab = tabs_1[_i];
                if (tab.isUntitled() && tab.isChanged())
                    cnt++;
            }
            if (cnt > 0) {
                var choice = electron_1.remote.dialog.showMessageBoxSync(electron_1.remote.getCurrentWindow(), {
                    title: "退出程序？",
                    buttons: ["取消", "退出"],
                    message: "还有未保存文件，是否退出程序？",
                    detail: "退出程序，将永久失去未保存的信息.",
                    cancelId: 2
                });
                if (choice == 1) {
                    mytab_1.MyTab.saveAll();
                    electron_1.ipcRenderer.send("quit");
                }
            }
            else {
                mytab_1.MyTab.saveAll();
                electron_1.ipcRenderer.send("quit");
            }
            break;
    }
});
/**
 * 初始化 monaco 编辑器
 * @param func
 */
function loadComponents(func) {
    var amdLoader = require('../monaco-editor/dev/vs/loader.js');
    var amdRequire = amdLoader.require;
    function uriFromPath(_path) {
        var pathName = path.resolve(_path).replace(/\\/g, '/');
        if (pathName.length > 0 && pathName.charAt(0) !== '/') {
            pathName = '/' + pathName;
        }
        return encodeURI('file://' + pathName);
    }
    amdRequire.config({
        baseUrl: uriFromPath(path.join(__dirname, '../monaco-editor/dev'))
    });
    // workaround monaco-css not understanding the environment
    self.module = undefined;
    amdRequire(['vs/editor/editor.main'], func);
}
