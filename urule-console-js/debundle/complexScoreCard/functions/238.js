var func238 = function (t, e, n) {
    "use strict";
    $, window.URule || (window.URule = {}), URule.setDomContent = function (t, e) {
        navigator.userAgent.indexOf("Firefox") > 0 ? t.prop("textContent", e) : t.prop("innerText", e)
    }, URule.getDomContent = function (t) {
        return navigator.userAgent.indexOf("Firefox") > 0 ? t.prop("textContent") : t.prop("innerText")
    }
}