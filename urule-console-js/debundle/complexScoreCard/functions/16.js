var func16 = function (t, e, n) {
    "use strict";

    function r() {
        return window.__u_id_++, "_u_r_id__" + window.__u_id_
    }

    function i(t) {
        if (t && 401 === t.status) bootbox.alert("权限不足，不能进行此操作."); else if (t && t.responseText) {
            var e = t.responseText, n = JSON.parse(e);
            bootbox.dialog({
                title: "服务端错误",
                message: "<span style='color: red'>" + n.errorMsg + "</span>",
                buttons: [{
                    label: "查看错误堆栈", callback: function () {
                        var t = window.open("error-stack.html", "_blank");
                        $(t).load(function () {
                            var t = $(this.document.body);
                            t.css({"font-size": "13px"}), t.empty(), t.append(n.stack)
                        })
                    }
                }]
            })
        } else bootbox.alert("<span style='color: red'>服务端出错</span>")
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.generateId = r, e.pathId = function (t) {
        if (_fullpath_map.has(t)) return _fullpath_map.get(t);
        var e = r();
        return _fullpath_map.set(t, e), e
    }, e.copyCellData = function (t, e) {
        $.ajax({url: window._server + "/common/parseCellData", type: "POST", data: {type: t, xml: e}})
    }, e.pasteCellData = function (t, e) {
        $.ajax({
            url: window._server + "/common/loadCellData", type: "POST", data: {type: t}, success: function (t) {
                t ? e(t) : bootbox.alert("当前没有数据可供粘贴！")
            }, error: function (t) {
                i(t)
            }
        })
    }, e.handleError = i, e.nextIFrameId = function () {
        return window.iframe_id_++, "_iframe" + window.iframe_id_
    }, e.getParameter = function (t) {
        var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), n = window.location.search.substr(1).match(e);
        return null != n ? n[2] : null
    }, e.ajaxSave = function (t, e, n) {
        $.ajax({
            type: "POST", url: t, data: e, success: function (t) {
                n(t)
            }, error: function (t) {
                i(t)
            }
        })
    }, e.formatDate = function (t, e) {
        if ("number" == typeof t && (t = new Date(t)), "string" == typeof t) return t;
        var n = {
            "M+": t.getMonth() + 1,
            "d+": t.getDate(),
            "H+": t.getHours(),
            "m+": t.getMinutes(),
            "s+": t.getSeconds()
        };
        for (var r in /(y+)/.test(e) && (e = e.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length))), n) new RegExp("(" + r + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? n[r] : ("00" + n[r]).substr(("" + n[r]).length)));
        return e
    }, e.escapeXml = function (t) {
        return t.replace(/[<>&"]/g, function (t) {
            return {"<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;"}[t]
        })
    }, window.iframe_id_ = 1, window.__u_id_ = 0, window._fullpath_map = new Map
}