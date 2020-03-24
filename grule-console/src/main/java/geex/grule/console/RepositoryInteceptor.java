package geex.grule.console;


/**
 * @author Jacky.gao
 * @author fred
 * @since 2016年8月30日
 */
public interface RepositoryInteceptor {
    void readFile(String file);

    void saveFile(String file, String content);

    void createFile(String file, String content);

    void deleteFile(String file);

    void renameFile(String oldFileName, String newFileName);

    void createDir(String dir);

    void createProject(String project);
}
