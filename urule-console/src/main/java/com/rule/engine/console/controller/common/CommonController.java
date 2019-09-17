package com.rule.engine.console.controller.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author fred
 * 2019-09-03 2:20 PM
 */
@Slf4j
@RestController
@RequestMapping("common")
public class CommonController {

    @RequestMapping("saveFile")
    public String saveFile() {
        return "aaa";
    }
}
