var func355 = function (t, e, n) {
    "use strict";
    n(47);
    n(243);
    n(232);
    n(252), n(238), n(239), n(240), n(250), n(272), n(271), n(270), n(269), n(237), n(236), n(235), n(234), n(233), n(231),
        n(230), n(229), n(228), n(227), n(226), n(225), n(224), n(223), n(222), n(249), n(248), n(247), n(246), n(251);
    a = s(n(354));

    function s(t) {
        return t && t.__esModule ? t : {default: t}
    }

    window._setDirty = function () {
        window._dirty || (window._dirty = !0, $("#saveButton").html("<i class='rf rf-save'></i> *保存"), $("#saveButton").prop("disabled", !1), $("#saveButtonNewVersion").html("<i class='rf rf-savenewversion'></i> *保存新版本"), $("#saveButtonNewVersion").prop("disabled", !1))
    };
    window.cancelDirty = function () {
        window._dirty && (window._dirty = !1, $("#saveButton").html("<i class='rf rf-save'></i> 保存"), $("#saveButton").prop("disabled", !0), $("#saveButtonNewVersion").html("<i class='rf rf-savenewversion'></i> 保存新版本"), $("#saveButtonNewVersion").prop("disabled", !0))
    };

    $(document).ready(function () {
        i.default.render(r.default.createElement(o.default, null), document.getElementById("dialogContainer")), new a.default($("#container"))
    })
};