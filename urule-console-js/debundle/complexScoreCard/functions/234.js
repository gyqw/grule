var func234 = function (t, e, n) {
    "use strict";
    urule.ConstantValue = function (t, e) {
        this.arithmetic = t, this.container = $("<span>"), this.label = generateContainer(), this.container.append(this.label), this.label.css({color: "#0174DF"}), this.label.prop("innerText", "请选择常量"), t && this.container.append(t.getContainer()), e && (this.setValue(e), t.initData(e.arithmetic)), this.initMenu(), window._ConstantValueArray.push(this)
    }, urule.ConstantValue.prototype.setValue = function (t) {
        this.category = t.constantCategory, this.constantName = t.constantName, this.constantLabel = t.constantLabel, URule.setDomContent(this.label, this.category + "." + this.constantLabel), window._setDirty()
    }, urule.ConstantValue.prototype.initMenu = function (t) {
        var e, n, r, i = window._uruleEditorConstantLibraries;
        t && (i = t), i && (e = this, n = function (t) {
            e.setValue({constantCategory: t.parent.parent.label, constantLabel: t.label, constantName: t.name})
        }, r = {menuItems: []}, $.each(i, function (t, e) {
            var i = e.categories;
            $.each(i, function (t, e) {
                var i = {label: e.label}, o = e.constants;
                $.each(o, function (t, e) {
                    i.subMenu || (i.subMenu = {menuItems: []}), i.subMenu.menuItems.push({
                        name: e.name,
                        label: e.label,
                        onClick: n
                    })
                }), r.menuItems.push(i)
            })
        }), e.menu ? e.menu.setConfig(r) : e.menu = new URule.menu.Menu(r), this.label.click(function (t) {
            e.menu.show(t)
        }))
    }, urule.ConstantValue.prototype.getDisplayContainer = function () {
        var t = $("<span>" + this.category + "." + this.constantLabel + "</span>");
        if (this.arithmetic) {
            var e = this.arithmetic.getDisplayContainer();
            e && t.append(e)
        }
        return t
    }, urule.ConstantValue.prototype.toXml = function () {
        if (!this.category) throw"常量不能为空！";
        return 'const-category="' + this.category + '" const="' + this.constantName + '" const-label="' + this.constantLabel + '"'
    }, urule.ConstantValue.prototype.getContainer = function () {
        return this.container
    }
}