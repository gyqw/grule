package com.bstek.urule.console.repository.permission;

/**
 * @author Jacky.gao
 * 2016年9月1日
 */
public interface PermissionService {
    boolean isAdmin();

    boolean projectHasPermission(String path);

    boolean projectPackageHasReadPermission(String path);

    boolean projectPackageHasWritePermission(String path);

    boolean fileHasWritePermission(String path);

    boolean fileHasReadPermission(String path);
}
