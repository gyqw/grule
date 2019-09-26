var func225 = function (t, e, n) {
    "use strict";
    urule.FunctionProperty = function () {
        this.container = $("<span>"), this.label = generateContainer(), this.container.append(this.label), URule.setDomContent(this.label, "选择属性"), this.label.css({color: "#004C85"})
    }, urule.FunctionProperty.prototype.toXml = function () {
        if (!this.variableName) throw"请选择函数属性";
        return 'property-name="' + this.variableName + '"' + ' property-label="' + this.variableLabel + '"'
    }, urule.FunctionProperty.prototype.initMenu = function (t) {
        if (t) {
            var e = this, n = function (t) {
                e.setProperty({name: t.name, label: t.label, datatype: t.type})
            }, r = {menuItems: []};
            $.each(t, function (t, e) {
                r.menuItems.push({name: e.name, label: e.label, datatype: e.type, onClick: n})
            }), this.menu = new URule.menu.Menu(r), this.label.click(function (t) {
                e.menu.show(t)
            })
        }
    }, urule.FunctionProperty.prototype.setProperty = function (t) {
        window._setDirty(), this.variableName = t.name, this.variableLabel = t.label, URule.setDomContent(this.label, this.variableLabel)
    }, urule.FunctionProperty.prototype.getContainer = function () {
        return this.container
    }
}