var func249 = function (t, e, n) {
    "use strict";
    var r = n(27), i = function (t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e.default = t, e
    }(n(19));
    urule.ConfigActionDialog = function (t) {
        this.parent = t, this.init()
    }, urule.ConfigActionDialog.prototype.open = function () {
        var t = this;
        r.MsgBox.showDialog("动作库配置", this.dialogContent, [{
            name: "添加", holdDialog: !0, click: function () {
                i.eventEmitter.emit(i.OPEN_KNOWLEDGE_TREE_DIALOG, {
                    project: window._project,
                    fileType: "ActionLibrary",
                    callback: function (e, n) {
                        var i = "jcr:" + e;
                        "LATEST" !== n && (i += ":" + n), -1 === window.actionLibraries.indexOf(i) ? (t.tbody.append(t.newLibRow(i)), window.actionLibraries.push(i), window.refreshActionLibraries(), window._setDirty()) : r.MsgBox.alert("动作库文件已存在")
                    }
                })
            }
        }])
    }, urule.ConfigActionDialog.prototype.init = function () {
        var t = $('<table class="table table-bordered">\n\t\t<thead><tr>\n\t\t\t<td>动作库文件</td><td style="width: 70px">操作</td>\n\t\t</tr></thead>\n\t</table>');
        this.tbody = $("<tbody></tbody>"), t.append(this.tbody), this.dialogContent = $("<div>"), this.dialogContent.append(t);
        for (var e = 0; e < window.actionLibraries.length; e++) {
            var n = window.actionLibraries[e];
            this.tbody.append(this.newLibRow(n))
        }
    }, urule.ConfigActionDialog.prototype.newLibRow = function (t) {
        var e = $("<tr>\n\t\t\t<td>" + t + "</td>\n\t\t</tr>"), n = $("<td></td>"),
            r = $('<button type="button" class="btn btn-link">删除</button>');
        return n.append(r), r.click(function () {
            var n = window.actionLibraries.indexOf(t);
            window.actionLibraries.splice(n, 1), e.remove(), window.refreshActionLibraries(), window._setDirty()
        }), e.append(n), e
    }
}