package com.bstek.urule.console.servlet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author Jacky.gao
 * @since 2016年9月1日
 */
public class RequestHolder {
    private static ThreadLocal<HttpServletRequest> request = new ThreadLocal<HttpServletRequest>();
    private static ThreadLocal<HttpServletResponse> response = new ThreadLocal<HttpServletResponse>();

    public static void set(HttpServletRequest request, HttpServletResponse response) {
        RequestHolder.request.set(request);
        RequestHolder.response.set(response);
    }

    public static RequestContext newRequestContext() {
        return new RequestContext(request.get(), response.get());
    }

    public static void reset() {
        request.remove();
        response.remove();
    }

    public static HttpServletRequest getRequest() {
        return request.get();
    }

    public static HttpServletResponse getResponse() {
        return response.get();
    }
}
