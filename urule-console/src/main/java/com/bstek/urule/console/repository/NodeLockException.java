package com.bstek.urule.console.repository;

import com.bstek.urule.exception.RuleException;

public class NodeLockException extends RuleException {
    private static final long serialVersionUID = 5117384355737392800L;

    public NodeLockException(String msg) {
        super(msg);
    }
}
