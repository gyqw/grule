package com.bstek.urule.model.flow;


import com.bstek.urule.model.rule.lhs.Lhs;

/**
 * @author Jacky.gao
 * 2015年4月20日
 */
public class DecisionItem {
    public static final String RETURN_VALUE_KEY = "return_to__";
    private String conditionType = "script";
    private String script;
    private Lhs lhs;
    private String lhsXml;
    private int percent;
    private String to;

    public DecisionItem() {
    }

    public String getScript() {
        return this.script;
    }

    public void setScript(String script) {
        this.script = script;
    }

    public String getTo() {
        return this.to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public int getPercent() {
        return this.percent;
    }

    public void setPercent(int percent) {
        this.percent = percent;
    }

    public String getConditionType() {
        return this.conditionType;
    }

    public void setConditionType(String conditionType) {
        this.conditionType = conditionType;
    }

    public void setLhs(Lhs lhs) {
        this.lhs = lhs;
    }

    public Lhs getLhs() {
        return this.lhs;
    }

    public String getLhsXml() {
        return this.lhsXml;
    }

    public void setLhsXml(String lhsXml) {
        this.lhsXml = lhsXml;
    }

    public String buildDSLScript(int index, boolean debug, String flowId, String nodeName) {
        StringBuffer sb = new StringBuffer();
        sb.append("rule \"" + flowId + "-" + nodeName + "-decision" + index + "\"");
        if (debug) {
            sb.append(" debug=true ");
        }

        sb.append(" ");
        sb.append("if");
        sb.append(" ");
        sb.append(this.script);
        sb.append(" ");
        sb.append("then");
        sb.append(" ");
        sb.append("parameter.return_to__=\"" + this.to + "\"");
        sb.append(" ");
        sb.append("end");
        return sb.toString();
    }
}
