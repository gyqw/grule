package com.bstek.urule.springboot.action.bean;

import com.bstek.urule.model.library.action.annotation.ActionBean;
import com.bstek.urule.model.library.action.annotation.ActionMethod;
import com.bstek.urule.model.library.action.annotation.ActionMethodParameter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * @author fred
 * @since 2020/08/06 4:49 PM
 */
@Slf4j
@Component("adjustmentAction")
@ActionBean(name = "调额计算")
public class AdjustmentAction {

    /**
     * 数值相减百位数五舍六入
     *
     * @param totalLimit
     * @param principal
     * @param loans
     * @return
     */
    @ActionMethod(name = "四舍五入")
    @ActionMethodParameter(names = {"总限额", "剩余未还总本金", "审批通过未放款总本金"})
    public String rounding(Object totalLimit, Object principal, Object loans) {
        BigDecimal totalLimit1 = new BigDecimal(totalLimit.toString());
        BigDecimal principal2 = new BigDecimal(principal.toString());
        BigDecimal totalLimit3 = new BigDecimal(loans.toString());
        log.info(String.format("总限额(%s)剩余未还总本金(%s)审批通过未放款总本金(%s)", totalLimit1, principal2, totalLimit3));
        BigDecimal b = totalLimit1.subtract(principal2).subtract(totalLimit3);
        BigDecimal total = b.divide(BigDecimal.valueOf(1000), 1, BigDecimal.ROUND_DOWN);
        total = total.setScale(0, BigDecimal.ROUND_HALF_DOWN);
        String str = String.valueOf(total.multiply(BigDecimal.valueOf(1000)));
        log.info(String.format("调额计算结果：%s", str));
        return str;
    }
}
