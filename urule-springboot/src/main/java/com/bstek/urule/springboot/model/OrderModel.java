package com.bstek.urule.springboot.model;

import java.io.Serializable;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author fred 2018-11-02 2:13 PM
 */
public class OrderModel implements Serializable {

    private Logger logger = LoggerFactory.getLogger(OrderModel.class);

    private String appId;
    private Integer appStatus;
    private Integer ddgStatus;
    private String storeTag;
    private Integer customAge;
    private Integer loanPeriods;
    private List<ItemModel> stringList;

    public Integer getLoanPeriods() {
        return loanPeriods;
    }

    public void setLoanPeriods(Integer loanPeriods) {
        this.loanPeriods = loanPeriods;
    }

    public Integer getCustomAge() {
        return customAge;
    }

    public void setCustomAge(Integer customAge) {
        this.customAge = customAge;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public Integer getAppStatus() {
        logger.info("get app status");
        return appStatus;
    }

    public void setAppStatus(Integer appStatus) {
        this.appStatus = appStatus;
    }

    public Integer getDdgStatus() {
        logger.info("get ddg status");
        return ddgStatus;
    }

    public void setDdgStatus(Integer ddgStatus) {
        this.ddgStatus = ddgStatus;
    }

    public String getStoreTag() {
        return storeTag;
    }

    public void setStoreTag(String storeTag) {
        this.storeTag = storeTag;
    }

    public void setStringList(List<ItemModel> stringList) {
        this.stringList = stringList;
    }

    public List<ItemModel> getStringList() {
        return stringList;
    }

    @Override
    public String toString() {
        return "OrderModel{" +
            "appId='" + appId + '\'' +
            ", appStatus=" + appStatus +
            ", ddgStatus=" + ddgStatus +
            ", storeTag='" + storeTag + '\'' +
            ", customAge=" + customAge +
            ", loanPeriods=" + loanPeriods +
            ", stringList=" + stringList +
            '}';
    }
}
