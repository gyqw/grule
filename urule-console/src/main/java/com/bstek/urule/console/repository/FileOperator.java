package com.bstek.urule.console.repository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * @author fred
 * 2019-09-11 9:36 AM
 */
public class FileOperator {
    private static Logger logger = LoggerFactory.getLogger(FileOperator.class);

    public static boolean createDir(String path) {
        return createDir(new File(path));
    }

    public static boolean createDir(File dir) {
        try {
            if (!dir.exists()) {
                //创建目录
                return dir.mkdirs();
            } else {
                return false;
            }
        } catch (Exception e) {
            logger.error("buildVersioningConfig error", e);
            return false;
        }
    }

    public static boolean hasFile(String filePath) {
        File file = new File(filePath);
        return file.exists();
    }

    public static boolean createFile(String filePath, String content) {
        createFile(filePath);

        try {
            File writename = new File(filePath);
            BufferedWriter out = new BufferedWriter(new FileWriter(writename));
            out.write(content);
            out.flush();
            out.close();
            return true;
        } catch (Exception e) {
            logger.error("createFile error", e);
            return false;
        }
    }

    public static String readFileContent(String filePath) {
        String content = "";

        try {
            content = new String(Files.readAllBytes(Paths.get(filePath)));
        } catch (IOException e) {
            logger.error("readFileContent error", e);
        }

        return content;

    }

    public static boolean createFile(String filePath) {
        return createFile(new File(filePath));
    }

    public static boolean createFile(File file) {
        String path = file.getAbsolutePath();
        if (file.exists()) {
            logger.info("创建单个文件{}失败，目标文件已存在！", path);
            return false;
        }
        if (file.getAbsolutePath().endsWith(File.separator)) {
            logger.info("创建单个文件{}失败，目标文件不能为目录！", path);
            return false;
        }
        if (!file.getParentFile().exists()) {
            if (!file.getParentFile().mkdirs()) {
                logger.info("创建目标文件所在目录失败！");
                return false;
            }
        }

        //创建目标文件
        try {
            return file.createNewFile();
        } catch (IOException e) {
            logger.error(String.format("创建单个文件%s失败！", path), e);
            return false;
        }
    }
}
