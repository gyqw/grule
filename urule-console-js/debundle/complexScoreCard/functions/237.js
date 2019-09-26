var func237 = function (t, e, n) {
    "use strict";
    urule.ComparisonOperator = function (t) {
        this.inputType = null, this.operator = "", this.container = generateContainer(), URule.setDomContent(this.container, "请选择比较操作符"), this.container.css({
            "font-size": "12px",
            color: "red",
            fontWeight: "bold",
            "margin-right": "1px"
        });
        var e = this, n = function (t) {
            e.setOperator(t.name)
        };
        e.menu = new URule.menu.Menu({
            onHide: function () {
                t()
            },
            menuItems: [{label: "大于", name: "GreaterThen", onClick: n}, {
                label: "大于或等于",
                name: "GreaterThenEquals",
                onClick: n
            }, {label: "小于", name: "LessThen", onClick: n}, {
                label: "小于或等于",
                name: "LessThenEquals",
                onClick: n
            }, {label: "等于", name: "Equals", onClick: n}, {
                label: "等于(不分大小写)",
                name: "EqualsIgnoreCase",
                onClick: n
            }, {label: "开始于", name: "StartWith", onClick: n}, {
                label: "不开始于",
                name: "NotStartWith",
                onClick: n
            }, {label: "结束于", name: "EndWith", onClick: n}, {
                label: "不结束于",
                name: "NotEndWith",
                onClick: n
            }, {label: "不等于", name: "NotEquals", onClick: n}, {
                label: "不等于(不分大小写)",
                name: "NotEqualsIgnoreCase",
                onClick: n
            }, {label: "在集合", name: "In", onClick: n}, {label: "不在集合", name: "NotIn", onClick: n}, {
                label: "为空",
                name: "Null",
                onClick: n
            }, {label: "不为空", name: "NotNull", onClick: n}, {
                label: "匹配正则表达式",
                name: "Match",
                onClick: n
            }, {label: "不匹配正则表达式", name: "NotMatch", onClick: n}, {
                label: "包含",
                name: "Contain",
                onClick: n
            }, {label: "不包含", name: "NotContain", onClick: n}]
        }), this.container.click(function (t) {
            e.menu.show(t)
        })
    }, urule.ComparisonOperator.prototype.initRightValue = function (t) {
        this.inputType && t && this.inputType.setValueType(t.valueType, t)
    }, urule.ComparisonOperator.prototype.setOperator = function (t) {
        switch (t) {
            case"GreaterThen":
                this.operator = "GreaterThen", URule.setDomContent(this.container, "大于"), this.inputType && this.inputType.getContainer().remove(), this.inputType = new urule.InputType;
                break;
            case"GreaterThenEquals":
                this.operator = "GreaterThenEquals", URule.setDomContent(this.container, "大于或等于"), this.inputType && this.inputType.getContainer().remove(), this.inputType = new urule.InputType;
                break;
            case"LessThen":
                this.operator = "LessThen", URule.setDomContent(this.container, "小于"), this.inputType && this.inputType.getContainer().remove(), this.inputType = new urule.InputType;
                break;
            case"LessThenEquals":
                this.operator = "LessThenEquals", URule.setDomContent(this.container, "小于或等于"), this.inputType && this.inputType.getContainer().remove(), this.inputType = new urule.InputType;
                break;
            case"StartWith":
                this.operator = "StartWith", URule.setDomContent(this.container, "开始于"), this.inputType && this.inputType.getContainer().remove(), this.inputType = new urule.InputType;
                break;
            case"Equals":
                this.operator = "Equals", URule.setDomContent(this.container, "等于"), this.inputType && this.inputType.getContainer().remove(), this.inputType = new urule.InputType;
                break;
            case"EqualsIgnoreCase":
                this.operator = "EqualsIgnoreCase", URule.setDomContent(this.container, "等于(不分大小写)"), this.inputType && this.inputType.getContainer().remove(), this.inputType = new urule.InputType;
                break;
            case"NotStartWith":
                this.operator = "NotStartWith", URule.setDomContent(this.container, "不开始于"), this.inputType && this.inputType.getContainer().remove(), this.inputType = new urule.InputType;
                break;
            case"EndWith":
                this.operator = "EndWith", URule.setDomContent(this.container, "结束于"), this.inputType && this.inputType.getContainer().remove(), this.inputType = new urule.InputType;
                break;
            case"NotEndWith":
                this.operator = "NotEndWith", URule.setDomContent(this.container, "不结束于"), this.inputType && this.inputType.getContainer().remove(), this.inputType = new urule.InputType;
                break;
            case"NotEquals":
                this.operator = "NotEquals", URule.setDomContent(this.container, "不等于"), this.inputType && this.inputType.getContainer().remove(), this.inputType = new urule.InputType;
                break;
            case"NotEqualsIgnoreCase":
                this.operator = "NotEqualsIgnoreCase", URule.setDomContent(this.container, "不等于(不分大小写)"), this.inputType && this.inputType.getContainer().remove(), this.inputType = new urule.InputType;
                break;
            case"In":
                this.operator = "In", URule.setDomContent(this.container, "在集合"), this.inputType && this.inputType.getContainer().remove(), this.inputType = new urule.InputType("之中");
                break;
            case"NotIn":
                this.operator = "NotIn", URule.setDomContent(this.container, "不在集合"), this.inputType && this.inputType.getContainer().remove(), this.inputType = new urule.InputType("之中");
                break;
            case"Null":
                this.operator = "Null", URule.setDomContent(this.container, "为空"), this.inputType && (this.inputType.getContainer().remove(), this.inputType = null);
                break;
            case"NotNull":
                this.operator = "NotNull", URule.setDomContent(this.container, "不为空"), this.inputType && (this.inputType.getContainer().remove(), this.inputType = null);
                break;
            case"Match":
                this.operator = "Match", URule.setDomContent(this.container, "匹配正则表达式"), this.inputType && this.inputType.getContainer().remove(), this.inputType = new urule.InputType;
                break;
            case"NotMatch":
                this.operator = "NotMatch", URule.setDomContent(this.container, "不匹配正则表达式"), this.inputType && this.inputType.getContainer().remove(), this.inputType = new urule.InputType;
                break;
            case"Contain":
                this.operator = "Contain", URule.setDomContent(this.container, "包含"), this.inputType && this.inputType.getContainer().remove(), this.inputType = new urule.InputType;
                break;
            case"NotContain":
                this.operator = "NotContain", URule.setDomContent(this.container, "不包含"), this.inputType && this.inputType.getContainer().remove(), this.inputType = new urule.InputType
        }
        window._setDirty()
    }, urule.ComparisonOperator.prototype.getOperator = function () {
        if ("" == this.operator) throw"请选择比较操作符！";
        return this.operator
    }, urule.ComparisonOperator.prototype.getInputType = function () {
        return this.inputType
    }, urule.ComparisonOperator.prototype.getContainer = function () {
        return this.container
    }
}