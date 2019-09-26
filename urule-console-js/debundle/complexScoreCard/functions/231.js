var func231 = function (t, e, n) {
    "use strict";
    urule.InputType = function (t, e, n, r) {
        this.container = $("<span>"), this.label = generateContainer(), this.rule = r, this.container.append(this.label), e ? (URule.setDomContent(this.label, e), this.label.css({color: "gray"})) : (URule.setDomContent(this.label, "选择值类型"), this.label.css({color: "blue"})), this.functionProperty = n, this.variableValue = null, this.dataContainer = $("<span>"), this.container.append(this.dataContainer), this.type = "";
        var i = this, o = function (t) {
            i.setValueType(t.name)
        };
        if (i.menu = new URule.menu.Menu({
            menuItems: [{label: "输入值", name: "Input", onClick: o}, {
                label: "选择变量",
                name: "Variable",
                onClick: o
            }, {label: "选择常量", name: "Constant", onClick: o}, {label: "选择参数", name: "Parameter", onClick: o}]
        }), i.menu.menuItems.push({label: "选择方法", name: "Method", onClick: o}, {
            label: "选择函数",
            name: "CommonFunction",
            onClick: o
        }), this.label.click(function (t) {
            i.menu.show(t)
        }), t) {
            var a = $("<span style='color:red;font-size:11pt'><strong>" + t + "</strong></span>");
            this.container.append(a)
        }
    }, urule.InputType.prototype.getDisplayContainer = function () {
        var t = $("<span>");
        return "Input" == this.type ? t.append(this.simpleValue.getDisplayContainer()) : "Variable" == this.type || "VariableCategory" == this.type ? t.append(this.variableValue.getDisplayContainer()) : "Constant" == this.type ? t.append(this.constantValue.getDisplayContainer()) : "Method" == this.type ? t.append(this.methodValue.getDisplayContainer()) : "Parameter" == this.type ? t.append(this.parameterValue.getDisplayContainer()) : "CommonFunction" == this.type && t.append(this.functionValue.getDisplayContainer()), t
    }, urule.InputType.prototype.setValueType = function (t, e) {
        switch (window._setDirty(), this.type = t, this.variableValue && this.variableValue.getContainer().hide(), this.constantValue && this.constantValue.getContainer().hide(), this.simpleValue && this.simpleValue.getContainer().hide(), this.methodValue && this.methodValue.getContainer().hide(), this.parameterValue && this.parameterValue.getContainer().hide(), this.functionValue && this.functionValue.getContainer().hide(), URule.setDomContent(this.label, "."), this.label.css({color: "#FDFDFD"}), t) {
            case"Input":
                this.simpleValue || (this.arithmetic = new urule.ComplexArithmetic(this.rule), this.simpleValue = new urule.SimpleValue(this.arithmetic, e), this.dataContainer.append(this.simpleValue.getContainer())), this.simpleValue.getContainer().show(), this.type = "Input";
                break;
            case"Constant":
                this.constantValue || (this.arithmetic = new urule.ComplexArithmetic(this.rule), this.constantValue = new urule.ConstantValue(this.arithmetic, e), this.dataContainer.append(this.constantValue.getContainer())), this.constantValue.getContainer().show(), this.type = "Constant";
                break;
            case"Method":
                this.methodValue || (this.arithmetic = new urule.ComplexArithmetic(this.rule), this.methodValue = new urule.MethodValue(this.arithmetic, e, this.dataContainer), this.dataContainer.append(this.methodValue.getContainer())), this.methodValue.getContainer().show(), this.type = "Method";
                break;
            case"Parameter":
                this.parameterValue || (this.arithmetic = new urule.ComplexArithmetic(this.rule), this.parameterValue = new urule.ParameterValue(this.arithmetic, e, "In"), this.dataContainer.append(this.parameterValue.getContainer())), this.parameterValue.getContainer().show(), this.type = "Parameter";
                break;
            case"CommonFunction":
                this.functionValue || (this.arithmetic = new urule.ComplexArithmetic(this.rule), this.functionValue = new urule.FunctionValue(this.arithmetic, e, "In"), this.dataContainer.append(this.functionValue.getContainer())), this.functionValue.getContainer().show(), this.type = "CommonFunction";
                break;
            default:
                this.variableValue || (this.arithmetic = new urule.ComplexArithmetic(this.rule), this.variableValue = new urule.VariableValue(this.arithmetic, e, "In", this.functionProperty), this.dataContainer.append(this.variableValue.getContainer())), this.variableValue.getContainer().show(), this.type = "Variable"
        }
    }, urule.InputType.prototype.toXml = function () {
        if ("" == this.type) return "";
        var t = "<value ";
        if ("Input" == this.type) {
            var e = this.simpleValue.getValue();
            if (!e || "" == e) throw"输入值不能为空!";
            t += ' content="' + e + '"'
        } else if ("Variable" == this.type || "VariableCategory" == this.type) t += this.variableValue.toXml(), this.type = this.variableValue.getType(); else if ("Method" == this.type) t += this.methodValue.toXml(); else if ("Parameter" == this.type) t += this.parameterValue.toXml(); else if ("CommonFunction" == this.type) t += this.functionValue.toXml(); else {
            if ("Constant" !== this.type) throw"请选择条件右边具体值！";
            t += this.constantValue.toXml()
        }
        if (t += ' type="' + this.type + '" ', t += ">", t += this.arithmetic.toXml(), "Method" == this.type) for (var n = this.methodValue.action.parameters, r = 0; r < n.length; r++) t += n[r].toXml(); else "CommonFunction" == this.type && (t += this.functionValue.getParameter().toXml());
        return t + "</value>"
    }, urule.InputType.prototype.getContainer = function () {
        return this.container
    }
}