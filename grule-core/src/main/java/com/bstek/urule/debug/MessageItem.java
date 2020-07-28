package com.bstek.urule.debug;

import java.util.Date;

public class MessageItem {
    private String msg;
    private MsgType type;
    private String leftVariable;
    private String leftVariableValue;
    private String rightVariable;
    private String rightVariableValue;
    /**
     * 执行时间
     */
    private Date execTime;

    public MessageItem(String msg, MsgType type) {
        this.msg = msg;
        this.type = type;
        this.execTime = new Date();
    }

    public MessageItem(String msg, MsgType type, String leftVariable, String leftVariableValue, String rightVariable, String rightVariableValue) {
        this.msg = msg;
        this.type = type;
        this.leftVariable = leftVariable;
        this.leftVariableValue = leftVariableValue;
        this.rightVariable = rightVariable;
        this.rightVariableValue = rightVariableValue;
        this.execTime = new Date();
    }

    public String toHtml() {
        String color = "#000";
        switch (type) {
            case Condition:
                color = "#6495ED";
                break;
            case ConsoleOutput:
                color = "#000";
                break;
            case ExecuteBeanMethod:
                color = "#8A2BE2";
                break;
            case ExecuteFunction:
                color = "#008B8B";
                break;
            case RuleFlow:
                color = "#9932CC";
                break;
            case VarAssign:
                color = "#FF7F50";
                break;
            case ScoreCard:
                color = "#40E0D0";
                break;
            case RuleMatch:
                color = "#666600";
                break;
        }
        return "<div style=\"color:" + color + ";margin:2px\">" + msg + "</div>";
    }

    public String getMsg() {
        return msg;
    }

    public MsgType getType() {
        return type;
    }

    public String getLeftVariable() {
        return leftVariable;
    }

    public String getLeftVariableValue() {
        return leftVariableValue;
    }

    public String getRightVariable() {
        return rightVariable;
    }

    public String getRightVariableValue() {
        return rightVariableValue;
    }

    public Date getExecTime() {
        return execTime;
    }

    @Override
    public String toString() {
        return "MessageItem{" +
                "msg='" + msg + '\'' +
                ", type=" + type +
                ", leftVariable='" + leftVariable + '\'' +
                ", leftVariableValue='" + leftVariableValue + '\'' +
                ", rightVariable='" + rightVariable + '\'' +
                ", rightVariableValue='" + rightVariableValue + '\'' +
                ", execTime=" + execTime +
                '}';
    }
}
