package com.bstek.urule.model.flow;

/**
 * @author Jacky.gao
 * 2015年5月27日
 */
public class PercentItem {
    private String name;
    private long percent;
    private long total;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getPercent() {
        return percent;
    }

    public void setPercent(long percent) {
        this.percent = percent;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }
}
