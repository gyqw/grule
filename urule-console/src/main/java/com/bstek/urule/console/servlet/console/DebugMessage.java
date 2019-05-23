package com.bstek.urule.console.servlet.console;

/**
 * @author Jacky.gao
 * @since 2017年11月28日
 */
public class DebugMessage {
	private String message;
	private long timestamp;
	public DebugMessage(String message) {
		this.message=message;
		this.timestamp=System.currentTimeMillis();
	}
	public String getMessage() {
		return message;
	}
	public long getTimestamp() {
		return timestamp;
	}
}
