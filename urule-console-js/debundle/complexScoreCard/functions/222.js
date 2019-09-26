var func222 = function (t, e, n) {
    "use strict";
    urule.SimpleValue = function (t, e) {
        this.container = $("<span>"), this.valueContainer = generateContainer(), this.valueContainer.css({color: "rgb(180,95,4)"}), this.editor = $('<input type=\'text\' class="form-control rule-text-editor" style="height: 22px;">');
        var n = this;
        this.container.append(this.valueContainer).append(this.editor), this.editor.blur(function () {
            n.editor.hide();
            var t = n.editor.prop("value");
            "" != t && URule.setDomContent(n.valueContainer, t), n.valueContainer.show(), $(this).trigger("DOMSubtreeModified"), window._setDirty()
        }).mousedown(function (t) {
            t.stopPropagation()
        }).keydown(function (t) {
            t.stopPropagation()
        }), n.editor.hide(), this.valueContainer.prop("innerText", "请输入值"), this.valueContainer.click(function () {
            n.valueContainer.hide();
            var t = n.container.parent(), e = 120;
            if (t && t.parent() && t.parent().parent()) {
                var r = (t = t.parent().parent()).prop("class");
                r && "htMiddle htDimmed current" == r && (e = t.width() - 20)
            }
            n.editor.css({width: e}), n.editor.css({display: "inline"}), n.editor.focus(), $(this).trigger("DOMSubtreeModified")
        }), this.arithmetic = t, this.container.append(t.getContainer()), this.initData(e)
    }, urule.SimpleValue.prototype.getDisplayContainer = function () {
        var t = $("<span>" + this.editor.prop("value") + "</span>");
        if (this.arithmetic) {
            var e = this.arithmetic.getDisplayContainer();
            e && t.append(e)
        }
        return t
    }, urule.SimpleValue.prototype.initData = function (t) {
        if (t) {
            var e = t.content;
            URule.setDomContent(this.valueContainer, e), this.editor.prop("value", e), this.arithmetic && this.arithmetic.initData(t.arithmetic)
        }
    }, urule.SimpleValue.prototype.getValue = function () {
        var t = this.editor.prop("value");
        return (t = (t = (t = (t = t.replace(new RegExp("&", "gm"), "&amp;")).replace(new RegExp("<", "gm"), "&lt;")).replace(new RegExp(">", "gm"), "&gt;")).replace(new RegExp("'", "gm"), "&apos;")).replace(new RegExp('"', "gm"), "&quot;")
    }, urule.SimpleValue.prototype.getContainer = function () {
        return this.container
    }
}