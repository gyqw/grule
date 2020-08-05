package com.bstek.urule.springboot.service;

import com.bstek.urule.console.ExternalProcessService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * @author fred
 * @since 2019-12-27 3:50 PM
 */
@Service
public class ExternalProcessServiceImpl implements ExternalProcessService {
    private final Logger logger = LoggerFactory.getLogger(ExternalProcessServiceImpl.class);

    @Override
    public String start(String project, String version, String explain) throws Exception {
        logger.info(explain);
//        throw new Exception();
        return "aaa";
    }
}
