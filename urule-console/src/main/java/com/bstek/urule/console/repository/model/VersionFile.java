package com.bstek.urule.console.repository.model;

import java.util.Date;

/**
 * @author Jacky.gao
 * @author fred
 * 2015年3月25日
 */
public class VersionFile {
    private String path;
    private String createUser;
    private String name;
    private String comment;
    private String beforeComment;
    private String afterComment;
    private Date createDate;

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getBeforeComment() {
        return beforeComment;
    }

    public void setBeforeComment(String beforeComment) {
        this.beforeComment = beforeComment;
    }

    public String getAfterComment() {
        return afterComment;
    }

    public void setAfterComment(String afterComment) {
        this.afterComment = afterComment;
    }

    @Override
    public String toString() {
        return "VersionFile{" +
                "path='" + path + '\'' +
                ", createUser='" + createUser + '\'' +
                ", name='" + name + '\'' +
                ", comment='" + comment + '\'' +
                ", beforeComment='" + beforeComment + '\'' +
                ", afterComment='" + afterComment + '\'' +
                ", createDate=" + createDate +
                '}';
    }
}
