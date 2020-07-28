package com.bstek.urule.model.scorecard.runtime;

import java.util.List;

/**
 * @author Jacky.gao
 * @since 2016年9月27日
 */
public interface Scorecard {
	/**
	 * @return 评分卡名称
	 */
	String getName();
	/**
	 * @return 评分卡表格的所有的行信息
	 */
	List<RowItem> getRowItems();
}
