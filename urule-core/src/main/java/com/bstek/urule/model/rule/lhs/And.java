package com.bstek.urule.model.rule.lhs;

public class And extends Junction {
	@Override
	public String getJunctionType() {
		return JunctionType.and.name();
	}
}
