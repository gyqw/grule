var func291 = function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0});
    var r = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
        }
    }(), i = function () {
        function t(e, n) {
            !function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.scoringType = "sum", this.notWeight = n, this.container = e, this.initScoringSetting(), this.initAssignSetting()
        }

        return r(t, [{
            key: "initData", value: function (t) {
                var e = t.scoringType;
                e && (this.scoringSettingSelect.val(e), this.scoringType = e, "custom" === e && (this.customContainer.show(), this.customScoringBean = t.scoringBean, this.customBeanEditor.val(this.customScoringBean)));
                var n = t.assignTargetType;
                n && (this.assignTargetType = n, "variable" === n ? (this.variableTarget.getContainer().show(), this.variableTarget.setValue(t), URule.setDomContent(this.assignTargetContainer, "."), this.assignTargetContainer.css({color: "white"})) : "parameter" === n ? (this.parameterTarget.getContainer().show(), this.parameterTarget.setValue(t), URule.setDomContent(this.assignTargetContainer, "."), this.assignTargetContainer.css({color: "white"})) : (URule.setDomContent(this.assignTargetContainer, "不赋值"), this.assignTargetContainer.css({color: "#999"})))
            }
        }, {
            key: "initScoringSetting", value: function () {
                var t = $('<div style="margin: 5px;">得分计算方式：</div>');
                this.container.append(t), this.scoringSettingSelect = $('<select class="form-control" style="display: inline-block;width:120px;height:30px;padding: 3px;"></select>'), t.append(this.scoringSettingSelect), this.scoringSettingSelect.append('<option value="sum" selected>求和</option>'), this.notWeight || this.scoringSettingSelect.append('<option value="weightsum">加权求和</option>'), this.scoringSettingSelect.append('<option value="custom">自定义</option>'), this.customContainer = $('<span style="margin: 15px;">自定义计算得分的Bean ID：</span>'), t.append(this.customContainer), this.customContainer.hide(), this.customBeanEditor = $('<input type="text" class="form-control" style="width: 200px;display: inline-block">'), this.customContainer.append(this.customBeanEditor);
                var e = this;
                this.customBeanEditor.change(function () {
                    e.customScoringBean = $(this).val()
                }), this.scoringSettingSelect.change(function () {
                    e.scoringType = $(this).val(), "custom" === e.scoringType ? e.customContainer.show() : e.customContainer.hide()
                })
            }
        }, {
            key: "initAssignSetting", value: function () {
                var t = $('<div style="margin: 15px 5px">将得分值赋给：</div>');
                this.container.append(t), this.assignTargetContainer = generateContainer(), t.append(this.assignTargetContainer), URule.setDomContent(this.assignTargetContainer, "请选择值类型"), this.assignTargetContainer.css({color: "blue"}), this.variableTarget = new urule.VariableValue(null, null, "Out"), this.parameterTarget = new urule.ParameterValue(null, null, "Out"), this.variableTarget.getContainer().hide(), this.parameterTarget.getContainer().hide(), t.append(this.variableTarget.getContainer()), t.append(this.parameterTarget.getContainer());
                var e = this;
                e.menu = new URule.menu.Menu({
                    menuItems: [{
                        label: "选择变量", onClick: function () {
                            e.parameterTarget.getContainer().hide(), e.variableTarget.getContainer().show(), e.assignTargetType = "variable", URule.setDomContent(e.assignTargetContainer, "."), e.assignTargetContainer.css({color: "white"})
                        }
                    }, {
                        label: "选择参数", onClick: function () {
                            e.variableTarget.getContainer().hide(), e.parameterTarget.getContainer().show(), e.assignTargetType = "parameter", URule.setDomContent(e.assignTargetContainer, "."), e.assignTargetContainer.css({color: "white"})
                        }
                    }, {
                        label: "不赋值", onClick: function () {
                            e.variableTarget.getContainer().hide(), e.parameterTarget.getContainer().hide(), e.assignTargetType = "none", URule.setDomContent(e.assignTargetContainer, "不赋值"), e.assignTargetContainer.css({color: "#999"})
                        }
                    }]
                }), this.assignTargetContainer.click(function (t) {
                    e.menu.show(t)
                })
            }
        }, {
            key: "toXml", value: function () {
                if (!this.scoringType) throw"请选择得分计算方式";
                if (!this.assignTargetType) throw"请选择得分赋值对象";
                if ("custom" === this.scoringType && (!this.customScoringBean || this.customScoringBean.length < 1)) throw"请输入自定义计算得分的Bean ID";
                var t = ' scoring-type="' + this.scoringType + '" assign-target-type="' + this.assignTargetType + '" ';
                return "variable" === this.assignTargetType ? t += this.variableTarget.toXml() : "parameter" === this.assignTargetType && (t += this.parameterTarget.toXml()), "custom" === this.scoringType && (t += ' custom-scoring-bean="' + this.customScoringBean + '"'), t
            }
        }]), t
    }();
    e.default = i
}