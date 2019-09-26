var func226 = function (t, e, n) {
    "use strict";
    urule.MethodValue = function (t, e) {
        this.arithmetic = t, this.container = $("<span>"), this.rightParn = $("<span style='color:blue'>]</span>"), this.label = generateContainer(), this.fetchLength = !1, this.uppercase = !1, this.lowercase = !1, this.fetchSize = !1, this.container.append(this.label), this.label.css({color: "blue"}), this.actionContainer = $("<span></span>"), this.container.append(this.actionContainer), URule.setDomContent(this.label, "请选择方法"), t && this.container.append(t.getContainer()), e && (this.setAction(e), t.initData(e.arithmetic)), window._ActionTypeArray.push(this), this.initMenu()
    }, urule.MethodValue.prototype.initMenu = function (t) {
        var e, n, r, i = window._uruleEditorActionLibraries;
        t && (i = t), e = this, n = function (t) {
            var n = t.parent.parent;
            e.setAction({
                beanLabel: n.label,
                beanId: n.name,
                methodLabel: t.label,
                methodName: t.name,
                parameters: t.parameters
            })
        }, r = {menuItems: []}, $.each(i || [], function (t, e) {
            var i = e.springBeans || [];
            $.each(i, function (t, e) {
                var i = {name: e.id, label: e.name}, o = e.methods || [];
                $.each(o, function (t, e) {
                    i.subMenu || (i.subMenu = {menuItems: []}), i.subMenu.menuItems.push({
                        name: e.methodName,
                        label: e.name,
                        parameters: e.parameters,
                        onClick: n
                    })
                }), r.menuItems.push(i)
            })
        }), e.menu ? e.menu.setConfig(r) : e.menu = new URule.menu.Menu(r), this.label.click(function (t) {
            e.menu.show(t)
        })
    }, urule.MethodValue.prototype.setAction = function (t) {
        window._setDirty(), this.action && this.action.getContainer().remove(), this.action = new urule.MethodAction, URule.setDomContent(this.label, "["), this.actionContainer.append(this.action.getContainer()), this.actionContainer.append(this.rightParn), this.action.initData(t)
    }, urule.MethodValue.prototype.getDisplayContainer = function () {
        var t = "";
        this.action && (this.action.name, t = this.action.methodLabel);
        var e = $("<span>" + t + "</span>");
        if (this.arithmetic) {
            var n = this.arithmetic.getDisplayContainer();
            n && e.append(n)
        }
        return e
    }, urule.MethodValue.prototype.toXml = function () {
        if (!this.action.bean || "" == this.action.name) throw"执行方法不能为空！";
        var t = 'bean-name="' + this.action.bean + '"';
        return t += ' bean-label="' + this.action.name + '"', (t += ' method-name="' + this.action.method + '"') + ' method-label="' + this.action.methodLabel + '"'
    }, urule.MethodValue.prototype.getContainer = function () {
        return this.container
    }
}