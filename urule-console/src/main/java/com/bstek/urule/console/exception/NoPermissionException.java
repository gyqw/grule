package com.bstek.urule.console.exception;

public class NoPermissionException extends RuntimeException {
    private static final long serialVersionUID = 441877650698078466L;

    public NoPermissionException() {
        super("Permission denied!");
    }
}
