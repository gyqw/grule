var func239 = function (t, e, n) {
    "use strict";
    var r = n(27);
    window._ConstantValueArray = [], window._ActionTypeArray = [], window._VariableValueArray = [], window._ParameterValueArray = [], window._FunctionValueArray = [], window.actionLibraries = [], window.variableLibraries = [], window.constantLibraries = [], window.parameterLibraries = [], window.urule = {}, window.knowledgePackages = null, window.loadKnowledgePackages = function (t) {
        window.knowledgePackages ? t(window.knowledgePackages) : $.ajax({
            url: window._server + "/ruleflowdesigner/loadPackages?project=" + window._project,
            type: "POST",
            success: function (e) {
                window.knowledgePackages = e, t(e)
            },
            error: function () {
                alert("加载知识包出错！")
            }
        })
    }, window.generateContainer = function () {
        var t = $("<span>.</span>");
        return t.css({
            height: "20px",
            cursor: "pointer",
            margin: "0px",
            color: "white",
            border: "dashed transparent 1px"
        }), t.mouseover(function () {
            t.css({border: "dashed gray 1px"})
        }), t.mouseout(function () {
            t.css({border: "dashed transparent 1px"})
        }), t
    }, window.refreshParameterLibraries = function () {
        for (var t = "", e = 0; e < parameterLibraries.length; e++) {
            var n = parameterLibraries[e];
            0 == e ? t = n : t += ";" + n
        }
        if (!("" == t || t.length < 2)) {
            var i = window._server + "/common/loadXml";
            $.ajax({
                type: "POST", data: {files: t}, url: i, error: function (t, e) {
                    r.MsgBox.alert("加载文件失败！")
                }, success: function (t) {
                    window._uruleEditorParameterLibraries = t, $.each(window._ParameterValueArray, function (e, n) {
                        n.initMenu(t, 1)
                    })
                }
            })
        }
    }, window.refreshVariableLibraries = function () {
        for (var t = "", e = 0; e < variableLibraries.length; e++) {
            var n = variableLibraries[e];
            0 == e ? t = n : t += ";" + n
        }
        if (!("" == t || t.length < 2)) {
            var i = window._server + "/common/loadXml";
            $.ajax({
                type: "POST", data: {files: t}, url: i, error: function (t, e) {
                    r.MsgBox.alert("加载文件失败！")
                }, success: function (t) {
                    window._uruleEditorVariableLibraries = t, $.each(window._VariableValueArray, function (e, n) {
                        n.initMenu(t)
                    })
                }
            })
        }
    }, window.refreshActionLibraries = function () {
        for (var t = "", e = 0; e < actionLibraries.length; e++) {
            var n = actionLibraries[e];
            0 == e ? t = n : t += ";" + n
        }
        ("" == t || t.length < 2) && (t = "builtinactions");
        var i = window._server + "/common/loadXml";
        $.ajax({
            type: "POST", data: {files: t}, url: i, error: function (t, e) {
                r.MsgBox.alert("加载文件失败！")
            }, success: function (t) {
                window._uruleEditorActionLibraries = t, $.each(window._ActionTypeArray, function (e, n) {
                    n.initMenu(t)
                })
            }
        })
    }, window.refreshFunctionLibraries = function () {
        var t = window._server + "/common/loadFunctions";
        $.ajax({
            url: t, error: function (t, e) {
                r.MsgBox.alert("加载函数失败！")
            }, success: function (t) {
                window._uruleEditorFunctionLibraries = t, $.each(window._FunctionValueArray, function (e, n) {
                    n.initMenu(t)
                })
            }
        })
    }, window.refreshConstantLibraries = function () {
        for (var t = "", e = 0; e < constantLibraries.length; e++) {
            var n = constantLibraries[e];
            0 == e ? t = n : t += ";" + n
        }
        if (!("" == t || t.length < 2)) {
            var i = window._server + "/common/loadXml";
            $.ajax({
                data: {files: t}, url: i, type: "POST", error: function (t, e) {
                    r.MsgBox.alert("加载文件失败！")
                }, success: function (t) {
                    window._uruleEditorConstantLibraries = t, $.each(window._ConstantValueArray, function (e, n) {
                        n.initMenu(t)
                    })
                }
            })
        }
    }
}