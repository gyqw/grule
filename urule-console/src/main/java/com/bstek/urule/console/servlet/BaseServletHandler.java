package com.bstek.urule.console.servlet;

import com.bstek.urule.exception.RuleException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;


/**
 * @author Jacky.gao
 * @since 2016年6月3日
 */
public abstract class BaseServletHandler implements ServletHandler {

    protected void invokeMethod(String methodName, HttpServletRequest req, HttpServletResponse resp) {
        Method method;
        try {
            method = this.getClass().getMethod(methodName, new Class<?>[]{HttpServletRequest.class, HttpServletResponse.class});
            method.invoke(this, new Object[]{req, resp});
        } catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
            throw new RuleException(e);
        }
    }

    protected String retriveMethod(HttpServletRequest req) throws ServletException {
        String path = req.getContextPath() + URuleServlet.URL;
        String uri = req.getRequestURI();
        String targetUrl = uri.substring(path.length());
        int slashPos = targetUrl.indexOf("/", 1);
        if (slashPos > -1) {
            String methodName = targetUrl.substring(slashPos + 1).trim();
            return methodName.length() > 0 ? methodName : null;
        }
        return null;
    }
}
