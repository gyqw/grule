package com.bstek.urule.console.servlet;

import com.bstek.urule.Utils;
import org.apache.commons.lang.StringUtils;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.RuntimeConstants;
import org.apache.velocity.runtime.log.NullLogChute;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;


/**
 * @author Jacky.gao
 * 2016年6月6日
 */
public abstract class RenderPageServletHandler extends WriteJsonServletHandler implements ApplicationContextAware {
    protected VelocityEngine ve;
    protected ApplicationContext applicationContext;

    protected String buildProjectNameFromFile(String file) {
        String project = null;
        if (StringUtils.isNotBlank(file)) {
            file = Utils.decodeURL(file);
            if (file.startsWith("/")) {
                file = file.substring(1);
                int pos = file.indexOf("/");
                project = file.substring(0, pos);
            }
        }
        return project;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
        ve = new VelocityEngine();
        ve.setProperty(Velocity.RESOURCE_LOADER, "class");
        ve.setProperty("class.resource.loader.class", "org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");
        ve.setProperty(RuntimeConstants.RUNTIME_LOG_LOGSYSTEM, new NullLogChute());
        ve.init();
    }
}
