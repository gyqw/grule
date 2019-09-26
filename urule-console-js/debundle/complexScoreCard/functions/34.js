var func34 = function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0}), e.uniqueID = function () {
        return "_ui_" + o++
    }, e.refactorContent = function (t, e) {
        var n = window._server + "/common/refactorContent";
        $.ajax({
            url: n, type: "POST", data: t, success: function () {
                e.call(this)
            }, error: function (t) {
                401 === t.status ? bootbox.alert("权限不足，不能进行此操作.") : t && t.responseText ? bootbox.alert("<span style='color: red'>服务端错误：" + t.responseText + "</span>") : bootbox.alert("<span style='color: red'>服务端出错</span>")
            }
        })
    }, e.loadFileVersions = function (t, e) {
        var n = window._server + "/frame/loadFileVersions";
        $.ajax({
            url: n, data: {file: t}, type: "POST", success: function (t) {
                a(t), e(t)
            }, error: function () {
                alert("加载文件[" + t + "]的版本信息失败.")
            }
        })
    }, e.loadResourceTreeData = function (t, e) {
        var n = window._server + "/common/loadResourceTreeData";
        $.ajax({
            url: n, data: t, type: "POST", success: function (t) {
                a(t), e(t)
            }, error: function () {
                alert("加载资源失败.")
            }
        })
    };
    var r, i = (r = n(85)) && r.__esModule ? r : {default: r}, o = 1;

    function a(t) {
        switch (t.type) {
            case"root":
                t._icon = i.default.frameStyle.getRootIcon(), t._style = i.default.frameStyle.getRootIconStyle();
                break;
            case"folder":
                t._icon = i.default.frameStyle.getFolderIcon(), t._style = i.default.frameStyle.getFolderIconStyle();
                break;
            case"rule":
                t._icon = i.default.frameStyle.getRuleIcon(), t._style = i.default.frameStyle.getRuleIconStyle(), t.editorPath = "/ruleeditor";
                break;
            case"project":
                t._icon = i.default.frameStyle.getProjectIcon(), t._style = i.default.frameStyle.getProjectIconStyle();
                break;
            case"resource":
                t._icon = i.default.frameStyle.getResourceIcon(), t._style = i.default.frameStyle.getResourceIconStyle();
                break;
            case"resourcePackage":
                t._icon = i.default.frameStyle.getResourcePackageIcon(), t._style = i.default.frameStyle.getResourcePackageIconStyle(), t.editorPath = "/packageeditor";
                break;
            case"lib":
                t._icon = i.default.frameStyle.getLibIcon(), t._style = i.default.frameStyle.getLibIconStyle();
                break;
            case"action":
                t._icon = i.default.frameStyle.getActionIcon(), t._style = i.default.frameStyle.getActionIconStyle(), t.editorPath = "/actioneditor";
                break;
            case"parameter":
                t._icon = i.default.frameStyle.getParameterIcon(), t._style = i.default.frameStyle.getParameterIconStyle(), t.editorPath = "/parametereditor";
                break;
            case"constant":
                t._icon = i.default.frameStyle.getConstantIcon(), t._style = i.default.frameStyle.getConstantIconStyle(), t.editorPath = "/constanteditor";
                break;
            case"variable":
                t._icon = i.default.frameStyle.getVariableIcon(), t._style = i.default.frameStyle.getVariableIconStyle(), t.editorPath = "/variableeditor";
                break;
            case"ruleLib":
                t._icon = i.default.frameStyle.getRuleLibIcon(), t._style = i.default.frameStyle.getRuleLibIconStyle();
                break;
            case"decisionTableLib":
                t._icon = i.default.frameStyle.getDecisionTableLibIcon(), t._style = i.default.frameStyle.getDecisionTableLibIconStyle();
                break;
            case"decisionTreeLib":
                t._icon = i.default.frameStyle.getDecisionTreeLibIcon(), t._style = i.default.frameStyle.getDecisionTreeLibIconStyle();
                break;
            case"flowLib":
                t._icon = i.default.frameStyle.getFlowLibIcon(), t._style = i.default.frameStyle.getFlowLibIconStyle();
                break;
            case"ul":
                t._icon = i.default.frameStyle.getUlIcon(), t._style = i.default.frameStyle.getUlIconStyle(), t.editorPath = "/uleditor";
                break;
            case"decisionTable":
                t._icon = i.default.frameStyle.getDecisionTableIcon(), t._style = i.default.frameStyle.getDecisionTableIconStyle(), t.editorPath = "/decisiontableeditor";
                break;
            case"crosstab":
                t._icon = i.default.frameStyle.getCrossDecisionTableIcon(), t._style = i.default.frameStyle.getCrossDecisionTableIconStyle(), t.editorPath = "/crosstabeditor";
                break;
            case"scriptDecisionTable":
                t._icon = i.default.frameStyle.getScriptDecisionTableIcon(), t._style = i.default.frameStyle.getScriptDecisionTableIconStyle(), t.editorPath = "/scriptdecisiontableeditor";
                break;
            case"decisionTree":
                t._icon = i.default.frameStyle.getDecisionTreeIcon(), t._style = i.default.frameStyle.getDecisionTreeIconStyle(), t.editorPath = "/decisiontreeditor";
                break;
            case"flow":
                t._icon = i.default.frameStyle.getFlowIcon(), t._style = i.default.frameStyle.getFlowIconStyle(), t.editorPath = "/floweditor";
                break;
            case"scorecard":
                t._icon = i.default.frameStyle.getScorecardIcon(), t._style = i.default.frameStyle.getScorecardIconStyle(), t.editorPath = "/scorecardeditor";
                break;
            case"complexscorecard":
                t._icon = i.default.frameStyle.getComplexScorecardIcon(), t._style = i.default.frameStyle.getComplexScorecardIconStyle(), t.editorPath = "/complexscorecardeditor"
        }
        var e = t.children;
        e && e.forEach(function (t, e) {
            a(t)
        })
    }
}