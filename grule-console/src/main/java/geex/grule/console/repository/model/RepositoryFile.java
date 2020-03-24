package geex.grule.console.repository.model;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * @author Jacky.gao
 * @author fred
 * @since 2014年12月24日
 */
public class RepositoryFile {
    private String id;
    private String name;
    private String comment;
    private String fullPath;
    private Type type;
    private Type folderType;
    private boolean lock;
    private String lockInfo;
    @JsonIgnore
    private LibType libType;
    @JsonIgnore
    private RepositoryFile parentFile;
    private List<RepositoryFile> children;

    public RepositoryFile() {
        this.id = UUID.randomUUID().toString();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public RepositoryFile getParentFile() {
        return parentFile;
    }

    public void setParentFile(RepositoryFile parentFile) {
        this.parentFile = parentFile;
    }

    public LibType getLibType() {
        return libType;
    }

    public void setLibType(LibType libType) {
        this.libType = libType;
    }

    public List<RepositoryFile> getChildren() {
        return children;
    }

    public void addChild(RepositoryFile fileInfo, boolean isdir) {
        if (this.children == null) {
            this.children = new ArrayList<RepositoryFile>();
        }
        fileInfo.setParentFile(this);
        if (isdir) {
            this.children.add(0, fileInfo);
        } else {
            this.children.add(fileInfo);
        }
    }

    public void setChildren(List<RepositoryFile> children) {
        this.children = children;
    }

    public String getFullPath() {
        if (fullPath == null) {
            if (parentFile != null) {
                fullPath = parentFile.getFullPath();
            } else {
                fullPath = "";
            }
            if (fullPath.equals("/")) {
                fullPath = "";
            }
            fullPath += "/" + name;
        }
        return fullPath;
    }

    public void setFullPath(String fullPath) {
        this.fullPath = fullPath;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Type getFolderType() {
        return folderType;
    }

    public void setFolderType(Type folderType) {
        this.folderType = folderType;
    }

    public boolean isLock() {
        return lock;
    }

    public void setLock(boolean lock) {
        this.lock = lock;
    }

    public String getLockInfo() {
        return lockInfo;
    }

    public void setLockInfo(String lockInfo) {
        this.lockInfo = lockInfo;
    }

    public String getComment() {
        return this.comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public String toString() {
        return "RepositoryFile{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", comment='" + comment + '\'' +
                ", fullPath='" + fullPath + '\'' +
                ", type=" + type +
                ", folderType=" + folderType +
                ", lock=" + lock +
                ", lockInfo='" + lockInfo + '\'' +
                ", libType=" + libType +
                ", parentFile=" + parentFile +
                ", children=" + children +
                '}';
    }
}
