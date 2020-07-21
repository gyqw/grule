package geex.grule.console.exception;

/**
 * @author Jacky.gao
 * 2016年9月1日
 */
public class NoPermissionException extends RuntimeException {
    private static final long serialVersionUID = 441877650698078466L;

    public NoPermissionException() {
        super("Permission denied!");
    }
}
