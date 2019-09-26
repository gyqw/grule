var func252 = function (t, e, n) {
    "use strict";
    window.Remark = function (t) {
        this.remark = "", this.defaultRemark = "请输入备注内容", this.init(t)
    }, Remark.prototype.init = function (t) {
        var e = $("<div style='cursor:pointer;color:#777;font-size:12px'>备注</div>");
        t.append(e);
        var n = $("<i class='glyphicon glyphicon-circle-arrow-down'></i>");
        e.append(n);
        var r = $("<div class='collapse in'></div>");
        t.append(r), this.remarkLabel = $("<div style='color:#999;background: #fdfdfd;padding:5px;border:solid 1px #ddd;border-radius: 5px;font-size: 12px'>" + this.defaultRemark + "</div>"), r.append(this.remarkLabel), this.remarkEditor = $("<textarea class='form-control' rows='4'>" + this.defaultRemark + "</textarea>"), r.append(this.remarkEditor), this.remarkEditor.hide();
        var i = this;
        this.remarkLabel.click(function () {
            i.remarkEditor.show(), i.remarkEditor.focus(), i.remarkLabel.hide()
        }), this.remarkEditor.change(function () {
            i.remark = $(this).val(), "" === i.remark ? i.remarkLabel.text(i.defaultRemark) : i.remarkLabel.html(i.parseBreak(i.remark)), window.setDirty && window.setDirty(), window._setDirty && window._setDirty()
        }), this.remarkEditor.blur(function () {
            i.remarkEditor.hide(), i.remarkLabel.show()
        }), e.click(function () {
            r.collapse("toggle")
        }), r.on("show.bs.collapse", function () {
            n.removeClass("glyphicon-circle-arrow-right"), n.addClass("glyphicon-circle-arrow-down")
        }), r.on("hide.bs.collapse", function () {
            n.removeClass("glyphicon-circle-arrow-down"), n.addClass("glyphicon-circle-arrow-right")
        }), r.collapse("hide")
    }, Remark.prototype.setData = function (t) {
        t && "" !== t && (this.remark = t, this.remarkEditor.val(t), this.remarkLabel.html(this.parseBreak(t)))
    }, Remark.prototype.toXml = function () {
        return "<remark><![CDATA[" + this.remark + "]]></remark>"
    }, Remark.prototype.parseBreak = function (t) {
        return (t = (t = t.replace(new RegExp("<", "gm"), "&lt;")).replace(new RegExp(">", "gm"), "&gt;")).replace(new RegExp("\n", "gm"), "</br>")
    }
}