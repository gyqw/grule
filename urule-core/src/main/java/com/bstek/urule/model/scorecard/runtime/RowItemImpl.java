package com.bstek.urule.model.scorecard.runtime;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Jacky.gao
 * @since 2016年9月26日
 */
public class RowItemImpl implements RowItem {
    private int rowNumber;
    private Object score;
    private Object actualScore;
    private String weight;
    private List<CellItem> cellItems;

    /* (non-Javadoc)
     * @see com.bstek.urule.model.scorecard.runtime.RowItemI#getRowNumber()
     */
    @Override
    public int getRowNumber() {
        return rowNumber;
    }

    public void setRowNumber(int rowNumber) {
        this.rowNumber = rowNumber;
    }

    /* (non-Javadoc)
     * @see com.bstek.urule.model.scorecard.runtime.RowItemI#getScore()
     */
    @Override
    public Object getScore() {
        return score;
    }

    public void setScore(Object score) {
        this.score = score;
    }

    /* (non-Javadoc)
     * @see com.bstek.urule.model.scorecard.runtime.RowItemI#getActualScore()
     */
    @Override
    public Object getActualScore() {
        return actualScore;
    }

    /* (non-Javadoc)
     * @see com.bstek.urule.model.scorecard.runtime.RowItem#setActualScore(java.lang.Object)
     */
    @Override
    public void setActualScore(Object actualScore) {
        this.actualScore = actualScore;
    }

    /* (non-Javadoc)
     * @see com.bstek.urule.model.scorecard.runtime.RowItemI#getWeight()
     */
    @Override
    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    /* (non-Javadoc)
     * @see com.bstek.urule.model.scorecard.runtime.RowItemI#getCellItems()
     */
    @Override
    public List<CellItem> getCellItems() {
        return cellItems;
    }

    public void setCellItems(List<CellItem> cellItems) {
        this.cellItems = cellItems;
    }

    public void addCellItem(CellItem cellItem) {
        if (this.cellItems == null) {
            this.cellItems = new ArrayList<CellItem>();
        }
        this.cellItems.add(cellItem);
    }
}
