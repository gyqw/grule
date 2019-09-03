package com.bstek.urule.model.rule;

import com.bstek.urule.model.rule.lhs.Lhs;
import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Date;

public class Rule implements RuleInfo {
    private String id;
    private String name;
    private RuleType ruleType;
    private String file;
    private Integer salience;
    private Date effectiveDate;
    private Date expiresDate;
    private Boolean enabled;
    private Boolean debug;
    private String activationGroup;
    private String agendaGroup;
    private Boolean autoFocus;
    private String ruleflowGroup;
    private Lhs lhs;
    private Rhs rhs;
    private Other other;
    private Boolean loop;
    private Boolean loopRule = false;
    private String remark;
    private boolean withElse;
    @JsonIgnore
    private Rule elseRule;

    public Rule() {
        this.debug = true;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFile() {
        return this.file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public Date getEffectiveDate() {
        return this.effectiveDate;
    }

    public Integer getSalience() {
        return this.salience;
    }

    public void setSalience(Integer salience) {
        this.salience = salience;
    }

    public Boolean getEnabled() {
        return this.enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public Boolean getDebug() {
        return this.debug;
    }

    public void setDebug(Boolean debug) {
        this.debug = debug;
    }

    public Boolean getAutoFocus() {
        return this.autoFocus;
    }

    public void setAutoFocus(Boolean autoFocus) {
        this.autoFocus = autoFocus;
    }

    public void setEffectiveDate(Date effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public Date getExpiresDate() {
        return this.expiresDate;
    }

    public void setExpiresDate(Date expiresDate) {
        this.expiresDate = expiresDate;
    }

    public String getActivationGroup() {
        return this.activationGroup;
    }

    public void setActivationGroup(String activationGroup) {
        this.activationGroup = activationGroup;
    }

    public String getAgendaGroup() {
        return this.agendaGroup;
    }

    public void setAgendaGroup(String agendaGroup) {
        this.agendaGroup = agendaGroup;
    }

    public String getRuleflowGroup() {
        return this.ruleflowGroup;
    }

    public void setRuleflowGroup(String ruleflowGroup) {
        this.ruleflowGroup = ruleflowGroup;
    }

    public String getRemark() {
        return this.remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Lhs getLhs() {
        return this.lhs;
    }

    public void setLhs(Lhs lhs) {
        this.lhs = lhs;
    }

    public Rhs getRhs() {
        return this.rhs;
    }

    public void setRhs(Rhs rhs) {
        this.rhs = rhs;
    }

    public Other getOther() {
        return this.other;
    }

    public void setOther(Other other) {
        this.other = other;
    }

    public Boolean getLoop() {
        return this.loop;
    }

    public void setLoop(Boolean loop) {
        this.loop = loop;
    }

    public Boolean isLoopRule() {
        return this.loopRule;
    }

    public void setLoopRule(Boolean loopRule) {
        this.loopRule = loopRule;
    }

    public boolean isWithElse() {
        return this.withElse;
    }

    public void setWithElse(boolean withElse) {
        this.withElse = withElse;
    }

    public Rule getElseRule() {
        return this.elseRule;
    }

    public void setElseRule(Rule elseRule) {
        this.elseRule = elseRule;
    }

    public RuleType getRuleType() {
        return ruleType;
    }

    public void setRuleType(RuleType ruleType) {
        this.ruleType = ruleType;
    }

    @Override
    public String toString() {
        return "Rule{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", ruleType=" + ruleType +
                ", file='" + file + '\'' +
                ", salience=" + salience +
                ", effectiveDate=" + effectiveDate +
                ", expiresDate=" + expiresDate +
                ", enabled=" + enabled +
                ", debug=" + debug +
                ", activationGroup='" + activationGroup + '\'' +
                ", agendaGroup='" + agendaGroup + '\'' +
                ", autoFocus=" + autoFocus +
                ", ruleflowGroup='" + ruleflowGroup + '\'' +
                ", lhs=" + lhs +
                ", rhs=" + rhs +
                ", other=" + other +
                ", loop=" + loop +
                ", loopRule=" + loopRule +
                ", remark='" + remark + '\'' +
                ", withElse=" + withElse +
                ", elseRule=" + elseRule +
                '}';
    }
}
