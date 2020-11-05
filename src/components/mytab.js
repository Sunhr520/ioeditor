"use strict";
exports.__esModule = true;
exports.MyTab = void 0;
var TabGroup = require("electron-tabs");
var dragula = require("dragula");
var utils_1 = require("./utils");
var filehandler_1 = require("./filehandler");
var electron_1 = require("electron");
var path = require("path");
var language_1 = require("./language");
var config_1 = require("./config");
var MyTab = /** @class */ (function () {
    function MyTab(file, untitled) {
        var _this = this;
        if (untitled === void 0) { untitled = false; }
        this.changed = false;
        this.file = file;
        this.untitled = untitled;
        this.tab = MyTab.tabGroup.addTab({
            title: utils_1.Utils.getFileNameByPath(file),
            src: "file://" + __dirname + "/../../views/vscode.html",
            visible: true,
            active: false
        });
        // 处理 HTML 元素
        var container = document.getElementById("container");
        this.element = document.createElement("div");
        this.element.setAttribute("id", "editor" + this.tab.id);
        this.element.setAttribute("class", "editor");
        this.status = document.createElement("div");
        this.status.setAttribute("id", "status" + this.tab.id);
        this.status.setAttribute("class", "status");
        var langEl = document.createElement("div");
        langEl.setAttribute("class", "status-lang");
        langEl.onmouseenter = function () { langEl.style.backgroundColor = "#177ec4"; };
        langEl.onmouseleave = function () { langEl.style.backgroundColor = "#0063a6"; };
        var encodingEl = document.createElement("div");
        encodingEl.setAttribute("class", "status-encoding");
        encodingEl.onmouseenter = function () { encodingEl.style.backgroundColor = "#177ec4"; };
        encodingEl.onmouseleave = function () { encodingEl.style.backgroundColor = "#0063a6"; };
        var lineEl = document.createElement("div");
        lineEl.setAttribute("class", "status-line");
        lineEl.onmouseenter = function () { lineEl.style.backgroundColor = "#177ec4"; };
        lineEl.onmouseleave = function () { lineEl.style.backgroundColor = "#0063a6"; };
        var messageEl = document.createElement("div");
        messageEl.setAttribute("class", "status-message");
        messageEl.onmouseenter = function () { messageEl.style.backgroundColor = "rgb(50, 145, 113)"; };
        messageEl.onmouseleave = function () { messageEl.style.backgroundColor = "rgb(22, 130, 93)"; };
        this.status.appendChild(langEl);
        this.status.appendChild(messageEl);
        this.status.appendChild(encodingEl);
        this.status.appendChild(lineEl);
        container.appendChild(this.element);
        container.appendChild(this.status);
        var content = "";
        if (!this.untitled) {
            content = filehandler_1.FileHandler.readText(file);
        }
        //let b = 
        this.editor = monaco.editor.create(this.element, {
            value: content,
            language: this.getLanguage().getLang(),
            automaticLayout: true,
            theme: config_1.Config.theme,
            fontSize: MyTab.getFontSize(),
            autoClosingBrackets: "always",
            autoIndent: "brackets",
            mouseWheelZoom: config_1.Config.mouseWheelZoom,
            fontFamily: config_1.Config.fontFamily,
            //useTabStops: Config.tabSize
            //useTabStops: false,
            //glyphMargin: true,
            folding: config_1.Config.folding,
            renderIndentGuides: config_1.Config.renderIndentGuides,
            minimap: { enabled: config_1.Config.minimap }
        });
        this.editor.getModel().updateOptions({
            tabSize: config_1.Config.tabSize,
            insertSpaces: config_1.Config.insertSpaces
        });
        //this.editor.trigger('editor','hideSuggestWidget', []);
        this.editor.onDidChangeModelContent(function () {
            _this.changed = true;
            if (_this.isUntitled()) {
                _this.setTitle("untitled*");
            }
        });
        //monaco.editor.on
        this.editor.onDidChangeCursorPosition(function () {
            _this.updateStatus();
        });
        // 获取焦点
        this.editor.focus();
        /*
        var decorations = this.editor.deltaDecorations([], [
            {
                range: new monaco.Range(3, 1, 3, 1),
                options: {
                    isWholeLine: false,
                    className: 'myContentClass',
                    glyphMarginClassName: 'myGlyphMarginClass'
                }
            }
        ]);
        */
        this.editor.onMouseDown(function (e) {
            var data = e.target.detail;
            if (e.target.type !== monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
                return;
            }
            console.log(e);
        });
        this.updateStatus();
    }
    MyTab.init = function () {
        var _this = this;
        this.tabGroup = new TabGroup({
            ready: function (tabGroup) {
                dragula([tabGroup.tabContainer], {
                    direction: "horizontal"
                });
            }
        });
        this.tabGroup.on("tab-active", function (tab, tabGroup) {
            MyTab.getTab(tab.id).show();
            for (var id in MyTab.tabs) {
                if (id != tab.id)
                    MyTab.tabs[id].hide();
            }
            if (MyTab.getTab(tab.id).getFile() == config_1.Config.path) {
                document.getElementById("config-example").hidden = false;
                //document.getElementById("container").style.width = "50vw";
                //MyTab.getTab(tab.id).getElement().style.width = "50vw";
            }
            else {
                document.getElementById("config-example").hidden = true;
                //document.getElementById("container").style.width = "100vw";
                //MyTab.getTab(tab.id).getElement().style.width = "50vw";
            }
            MyTab.getTab(tab.id).getEditor().focus();
        });
        this.tabGroup.on("tab-removed", function (tab, tabGroup) {
            if (_this.tabGroup.getTabs().length == 0) {
                MyTab.createUntitled();
            }
        });
        // 拖拽打开文件
        var holder = document.getElementsByTagName("body")[0];
        holder.ondragover = function () {
            return false;
        };
        holder.ondragleave = holder.ondragend = function () {
            return false;
        };
        holder.ondrop = function (e) {
            e.preventDefault();
            for (var i = 0; i < e.dataTransfer.files.length; i++) {
                var file = e.dataTransfer.files[i];
                MyTab.create(file.path);
            }
            return false;
        };
        // 用于自动保存
        setInterval(MyTab.saveAll, 2000);
    };
    MyTab.setExampleEditor = function (editor) {
        this.jsonExample = editor;
    };
    MyTab.create = function (file) {
        // 防止重复打开
        for (var _i = 0, _a = this.getTabs(); _i < _a.length; _i++) {
            var tab_1 = _a[_i];
            if (tab_1.getFile() == file) {
                tab_1.activate();
                return;
            }
        }
        var untitledTab = undefined;
        if (this.getTabs().length == 1
            && this.getActiveTab().isUntitled()
            && !this.getActiveTab().isChanged()) {
            untitledTab = this.getActiveTab();
        }
        var tab = new MyTab(file);
        this.tabs[tab.getID()] = tab;
        tab.activate();
        tab.bindClose();
        if (untitledTab)
            untitledTab.close();
        if (tab.getFile() == config_1.Config.path) {
            tab.getElement().style.width = "50vw";
        }
    };
    MyTab.createUntitled = function () {
        var tab = new MyTab("untitled", true);
        this.tabs[tab.getID()] = tab;
        tab.activate();
        tab.bindClose();
    };
    MyTab.getTabs = function () {
        var array = [];
        for (var id in MyTab.tabs) {
            array.push(MyTab.tabs[id]);
        }
        return array;
    };
    MyTab.getActiveTab = function () {
        return this.tabs[this.tabGroup.getActiveTab().id];
    };
    MyTab.getTab = function (id) {
        return this.tabs[id];
    };
    MyTab.saveAll = function () {
        if (MyTab.getActiveTab().getEditor().getRawOptions().fontSize != config_1.Config.fontSize) {
            config_1.Config.updateFontSize(this.getActiveTab().getEditor().getRawOptions().fontSize);
        }
        for (var id in MyTab.tabs) {
            var tab = MyTab.tabs[id];
            tab.save();
        }
    };
    MyTab.getFontSize = function () {
        return config_1.Config.fontSize;
    };
    MyTab.setFontSize = function (size) {
        config_1.Config.updateFontSize(size);
        if (size <= 0)
            return;
        for (var _i = 0, _a = MyTab.getTabs(); _i < _a.length; _i++) {
            var tab = _a[_i];
            tab.editor.updateOptions({
                "fontSize": size
            });
        }
        this.jsonExample.updateOptions({
            "fontSize": size
        });
    };
    /**
     * 获取标签页的唯一标识
     */
    MyTab.prototype.getID = function () {
        return this.tab.id;
    };
    MyTab.prototype.close = function () {
        if (this.getFile() == config_1.Config.path) {
            var choice = electron_1.remote.dialog.showMessageBoxSync(electron_1.remote.getCurrentWindow(), {
                title: "修改了配置，是否关闭此程序并重新启动？",
                buttons: ["关闭程序", "稍后重启"],
                message: "修改了配置，是否关闭此程序并重新启动？",
                detail: "如果不重启，您的修改不会生效",
                cancelId: 2
            });
            // 保存
            if (choice == 0) {
                electron_1.ipcRenderer.send("quit");
            }
            else if (choice == 1) {
                this.clear();
            }
        }
        if (this.isUntitled() && this.isChanged()) {
            var choice = electron_1.remote.dialog.showMessageBoxSync(electron_1.remote.getCurrentWindow(), {
                title: "是否保存",
                buttons: ["保存", "放弃"],
                message: "未命名文件被修改，是否保存？",
                detail: "选择放弃，将永久失去里面的信息.",
                cancelId: 2
            });
            // 保存
            if (choice == 0 && this.saveFile()) {
                this.clear();
            }
            else if (choice == 1) {
                this.clear();
            }
        }
        else {
            this.clear();
        }
    };
    MyTab.prototype.saveFile = function () {
        if (!this.isUntitled())
            return false;
        var file = electron_1.remote.dialog.showSaveDialogSync(electron_1.remote.getCurrentWindow(), {
            title: "保存"
        });
        if (file) {
            this.setFile(file);
            this.setUntitled(false);
            //this.updateStatus();
            this.save();
            return true;
        }
        else {
            return false;
        }
    };
    MyTab.prototype.clear = function () {
        this.save();
        delete MyTab.tabs[this.tab.id];
        this.element.remove();
        this.tab.close();
    };
    MyTab.prototype.bindClose = function () {
        var button = document.getElementsByClassName("etabs-tab visible active")[0].getElementsByClassName("etabs-tab-button-close")[0];
        var clone = button.cloneNode(true);
        button.parentNode.replaceChild(clone, button);
        clone.addEventListener("click", this.close.bind(this));
    };
    MyTab.prototype.hide = function () {
        this.element.style.zIndex = "0";
        this.status.style.zIndex = "0";
    };
    MyTab.prototype.show = function () {
        this.element.style.zIndex = "1";
        this.status.style.zIndex = "1";
    };
    MyTab.prototype.activate = function () {
        this.tab.activate();
    };
    MyTab.prototype.getLanguage = function () {
        return language_1.Language.getLanguageBySuffix(path.extname(this.file));
    };
    MyTab.prototype.isUntitled = function () {
        return this.untitled;
    };
    MyTab.prototype.setUntitled = function (untitled) {
        this.untitled = untitled;
    };
    MyTab.prototype.getFile = function () {
        return this.file;
    };
    MyTab.prototype.setFile = function (file) {
        this.file = file;
        this.setTitle(utils_1.Utils.getFileNameByPath(file));
        monaco.editor.setModelLanguage(this.editor.getModel(), this.getLanguage().getLang());
        this.updateStatus();
    };
    MyTab.prototype.isChanged = function () {
        return this.changed;
    };
    MyTab.prototype.setTitle = function (title) {
        this.tab.setTitle(title);
    };
    MyTab.prototype.getElement = function () {
        return this.element;
    };
    MyTab.prototype.getTitle = function () {
        return this.tab.getTitle();
    };
    MyTab.prototype.save = function () {
        if (!this.changed)
            return;
        if (this.isUntitled())
            return;
        filehandler_1.FileHandler.saveText(this.file, this.editor.getModel().getValue());
        this.changed = false;
    };
    MyTab.prototype.updateStatus = function () {
        this.status.getElementsByClassName("status-message")[0].innerHTML
            = "&nbsp;&nbsp;<\\>&nbsp;&nbsp;";
        this.status.getElementsByClassName("status-lang")[0].innerHTML
            = this.getLanguage().getName();
        this.status.getElementsByClassName("status-encoding")[0].innerHTML
            = "UTF-8";
        this.status.getElementsByClassName("status-line")[0].innerHTML
            = "&nbsp;" + "行 " + this.editor.getPosition().lineNumber + ", 列 " + this.editor.getPosition().column + "&nbsp;";
    };
    MyTab.prototype.getEditor = function () {
        return this.editor;
    };
    MyTab.prototype.saveAs = function () {
        if (this.isUntitled()) {
            this.saveFile();
            return;
        }
        var file = electron_1.remote.dialog.showSaveDialogSync(electron_1.remote.getCurrentWindow(), {
            title: "另存为"
        });
        if (file) {
            this.setFile(file);
            this.changed = true;
            this.save();
            this.updateStatus();
        }
    };
    MyTab.tabs = {};
    return MyTab;
}());
exports.MyTab = MyTab;
