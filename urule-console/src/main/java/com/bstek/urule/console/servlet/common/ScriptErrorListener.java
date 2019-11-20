package com.bstek.urule.console.servlet.common;

import org.antlr.v4.runtime.BaseErrorListener;
import org.antlr.v4.runtime.RecognitionException;
import org.antlr.v4.runtime.Recognizer;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Jacky.gao
 * 2016年7月26日
 */
public class ScriptErrorListener extends BaseErrorListener {
    private List<ErrorInfo> infos = new ArrayList<>();

    @Override
    public void syntaxError(Recognizer<?, ?> recognizer, Object offendingSymbol, int line, int charPositionInLine, String msg, RecognitionException e) {
        infos.add(new ErrorInfo(line, charPositionInLine, msg));
    }

    public List<ErrorInfo> getInfos() {
        return infos;
    }
}
