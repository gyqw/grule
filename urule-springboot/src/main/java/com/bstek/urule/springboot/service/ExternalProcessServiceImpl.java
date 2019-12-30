package com.bstek.urule.springboot.service;

import com.bstek.urule.console.ExternalProcessService;
import org.springframework.stereotype.Service;

/**
 * @author fred
 * 2019-12-27 3:50 PM
 */
@Service
public class ExternalProcessServiceImpl implements ExternalProcessService {
    @Override
    public String start(String project, String version) {
        return "processId01";
    }
}
