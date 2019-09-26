var func251 = function (t, e, n) {
    "use strict";
    var r = n(16);
    urule.RuleProperty = function (t, e, n, i) {
        this.parent = t, this.value = n, this.editorType = i, this.container = $("<span class='rule-property'>");
        var o = $("<span>");
        this.name = e;
        var a = this.getLabel();
        URule.setDomContent(o, a + "："), this.container.append(o);
        var s = $("<span>"), c = generateContainer();
        "" == n && (n = "无"), c.css({color: "#000"}), URule.setDomContent(c, n), s.append(c), this.container.append(s);
        var f = null;
        this.radioName = (0, r.generateId)(), this.yesRadio = null, this.noRadio = null, 1 == i ? f = $("<input type='text' size='30' class='form-control rule-text-editor'>") : 2 == i ? f = $("<input type='datetime' size='30' class='form-control rule-text-editor' title='日期格式为:yyyy-MM-dd HH:mm:ss，如2016-10-11 12:50:06'>") : 3 == i && (this.yesRadio = $("<input type='radio' value='是' name='" + this.radioName + "'> 是 </input>"), this.noRadio = $("<input type='radio' value='否' name='" + this.radioName + "'> 否</input>"));
        var u = this;
        3 != i ? (f.blur(function () {
            u.value = f.prop("value"), f.hide(), "" == u.value ? URule.setDomContent(c, "无") : URule.setDomContent(c, u.value), c.show(), window._setDirty()
        }), c.click(function () {
            c.hide(), f.prop("value", u.value), f.show(), f.focus()
        }), this.container.append(f), f.hide(), 2 == i && "无" !== n && (new Date(n), this.value = n, URule.setDomContent(c, this.value))) : (1 == n ? this.yesRadio.prop("checked", !0) : this.noRadio.prop("checked", !0), this.yesRadio.change(function () {
            window._setDirty()
        }), this.noRadio.change(function () {
            window._setDirty()
        }), c.hide(), this.container.append(this.yesRadio), this.container.append(this.noRadio));
        var l = $('<i class="glyphicon glyphicon-remove rule-property-del">');
        l.click(function () {
            u.container.remove();
            var t = u.parent.properties.indexOf(u);
            u.parent.properties.splice(t, 1), window._setDirty()
        }), this.container.append(l)
    }, urule.RuleProperty.prototype.getLabel = function () {
        var t = "";
        return "salience" == this.name ? t = "优先级" : "loop" == this.name ? t = "允许循环触发" : "effective-date" == this.name ? t = "生效日期" : "expires-date" == this.name ? t = "失效日期" : "enabled" == this.name ? t = "是否启用" : "debug" == this.name ? t = "允许调试信息输出" : "activation-group" == this.name ? t = "互斥组" : "agenda-group" == this.name ? t = "执行组" : "auto-focus" == this.name ? t = "自动获取焦点" : "ruleflow-group" == this.name && (t = "规则流组"), t
    }, urule.RuleProperty.prototype.toXml = function () {
        var t = this.name;
        if (3 == this.editorType) this.yesRadio.prop("checked") ? t += '="true"' : t += '="false"'; else {
            if (!this.value || "" == this.value) throw"请输入属性" + this.name + "的具体值!";
            t += '="' + this.value + '"'
        }
        return t
    }, urule.RuleProperty.prototype.getContainer = function () {
        return this.container
    }
}