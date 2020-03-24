package geex.grule.console;

/**
 * @author fred
 * @since 2019-12-27 3:46 PM
 */
public interface ExternalProcessService {
    String start(String project, String version, String explain) throws Exception;
}
