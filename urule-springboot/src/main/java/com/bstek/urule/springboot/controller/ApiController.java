package com.bstek.urule.springboot.controller;

import com.bstek.urule.Utils;
import com.bstek.urule.runtime.KnowledgePackage;
import com.bstek.urule.runtime.KnowledgeSession;
import com.bstek.urule.runtime.KnowledgeSessionFactory;
import com.bstek.urule.runtime.response.RuleExecutionResponse;
import com.bstek.urule.runtime.service.KnowledgeService;
import com.bstek.urule.springboot.model.ItemModel;
import com.bstek.urule.springboot.model.OrderModel;
import com.bstek.urule.springboot.model.OutputModel;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author fred 2019-09-25 10:10 AM
 */
@RestController
@RequestMapping("api")
public class ApiController {

    private Logger logger = LoggerFactory.getLogger(ApiController.class);

    @RequestMapping("test")
    public void test() {
        try {
            KnowledgeService service = (KnowledgeService) Utils.getApplicationContext()
                .getBean(KnowledgeService.BEAN_ID);
            KnowledgePackage knowledgePackage = service.getKnowledge("test/t1");
            KnowledgeSession session = KnowledgeSessionFactory.newKnowledgeSession(knowledgePackage);

            OrderModel orderModel = new OrderModel();
            orderModel.setAppStatus(1);
            orderModel.setDdgStatus(1);
            orderModel.setStoreTag("fhp");

            ItemModel itemModel = new ItemModel();
            itemModel.setDeviceId("a");
            List<ItemModel> itemModelList = new ArrayList<>();
            itemModelList.add(itemModel);
            orderModel.setStringList(itemModelList);

            session.insert(orderModel);
            OutputModel outputModel = new OutputModel();
            session.insert(outputModel);

            // 执行所有满足条件的规则
            RuleExecutionResponse ruleExecutionResponse = session.fireRules();
            logger.info("orderModel: {}, outputModel: {}", orderModel, outputModel);
            logger.info("flow execution response: {}", ruleExecutionResponse);
        } catch (Exception e) {
            logger.error("test error", e);
        }
    }

    @RequestMapping("test1")
    public String test1() {
        return "test1";
    }
}
