package geex.grule.console.exception;

import com.bstek.urule.exception.RuleException;

/**
 * @author Jacky.gao
 * @author fred
 * @since 2017年11月22日
 */
public class NodeLockException extends RuleException {
    private static final long serialVersionUID = 5117384355737392800L;

    public NodeLockException(String msg) {
        super(msg);
    }
}
