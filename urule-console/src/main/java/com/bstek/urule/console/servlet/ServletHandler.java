package com.bstek.urule.console.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Jacky.gao
 * 2016年5月23日
 */
public interface ServletHandler {
    void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException;

    String url();
}
