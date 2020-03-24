package geex.grule.console.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author Jacky.gao
 * @author fred
 * @since 2016年5月25日
 */
public class RequestContext {
    private HttpServletRequest req;
    private HttpServletResponse resp;

    public RequestContext(HttpServletRequest req, HttpServletResponse resp) {
        this.req = req;
        this.resp = resp;
    }

    public HttpServletRequest getRequest() {
        return req;
    }

    public HttpServletResponse getResponse() {
        return resp;
    }
}
