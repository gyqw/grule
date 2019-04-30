package com.bstek.urule.springboot;

import com.bstek.urule.Utils;
import com.bstek.urule.runtime.KnowledgePackage;
import com.bstek.urule.runtime.KnowledgeSession;
import com.bstek.urule.runtime.KnowledgeSessionFactory;
import com.bstek.urule.runtime.response.FlowExecutionResponse;
import com.bstek.urule.runtime.response.RuleExecutionResponse;
import com.bstek.urule.runtime.service.KnowledgeService;
import com.bstek.urule.springboot.model.OrderModel;
import com.bstek.urule.springboot.model.OutputModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;


@SpringBootApplication
@ImportResource({"classpath:urule-console-context.xml"})
public class GeexRuleApplication implements CommandLineRunner {
    private Logger logger = LoggerFactory.getLogger(GeexRuleApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(GeexRuleApplication.class, args);
    }

    @Override
    public void run(String... strings) throws Exception {
        try {
            KnowledgeService service = (KnowledgeService) Utils.getApplicationContext().getBean(KnowledgeService.BEAN_ID);
            KnowledgePackage knowledgePackage = service.getKnowledge("test/test01");
            KnowledgeSession session = KnowledgeSessionFactory.newKnowledgeSession(knowledgePackage);

            OrderModel orderModel = new OrderModel();
            orderModel.setAppStatus(1);
            orderModel.setDdgStatus(1);
            session.insert(orderModel);
            OutputModel outputModel = new OutputModel();
            session.insert(outputModel);

            // 执行所有满足条件的规则
            FlowExecutionResponse flowExecutionResponse = session.startProcess("jueceliu01");

            logger.info("orderModel: {}, outputModel: {}", orderModel, outputModel);
        } catch (Exception e) {
            logger.error("test error", e);
        }

    }
}
