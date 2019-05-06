package com.bstek.urule.runtime.agenda;

public interface AgendaFilter {
    boolean accept(Activation activation);
}
