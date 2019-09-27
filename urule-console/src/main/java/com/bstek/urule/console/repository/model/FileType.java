package com.bstek.urule.console.repository.model;

import com.bstek.urule.exception.RuleException;
import com.bstek.urule.dsl.Constant;

/**
 * @author Jacky.gao
 * @author fred
 * 2014年12月24日
 */
public enum FileType {
    Ruleset {
        @Override
        public String toString() {
            return "rs.xml";
        }
    }, DecisionTable {
        @Override
        public String toString() {
            return "dt.xml";
        }
    }, ScriptDecisionTable {
        @Override
        public String toString() {
            return "dts.xml";
        }
    }, ActionLibrary {
        @Override
        public String toString() {
            return "al.xml";
        }
    }, VariableLibrary {
        @Override
        public String toString() {
            return "vl.xml";
        }
    }, ParameterLibrary {
        @Override
        public String toString() {
            return "pl.xml";
        }
    }, ConstantLibrary {
        @Override
        public String toString() {
            return "cl.xml";
        }
    }, RuleFlow {
        @Override
        public String toString() {
            return "rl.xml";
        }
    }, UL {
        @Override
        public String toString() {
            return Constant.UL_SUFFIX;
        }
    }, DecisionTree {
        @Override
        public String toString() {
            return "dtree.xml";
        }
    }, ComplexScorecard {
        @Override
        public String toString() {
            return "scc";
        }
    }, Scorecard {
        @Override
        public String toString() {
            return "sc";
        }
    }, DIR {
        @Override
        public String toString() {
            return "DIR";
        }
    },Crosstab {
        @Override
        public String toString() {
            return "ct.xml";
        }
    },;

    public static FileType parse(String type) {
        if (type.equals("rs.xml")) {
            return FileType.Ruleset;
        } else if (type.equals("dt.xml")) {
            return FileType.DecisionTable;
        } else if (type.equals("dts.xml")) {
            return FileType.ScriptDecisionTable;
        } else if (type.equals("al.xml")) {
            return FileType.ActionLibrary;
        } else if (type.equals("vl.xml")) {
            return FileType.VariableLibrary;
        } else if (type.equals("pl.xml")) {
            return FileType.ParameterLibrary;
        } else if (type.equals("cl.xml")) {
            return FileType.ConstantLibrary;
        } else if (type.equals("rl.xml")) {
            return FileType.RuleFlow;
        } else if (type.equals("ul")) {
            return FileType.UL;
        } else if (type.equals("dtree.xml")) {
            return FileType.DecisionTree;
        } else if (type.equals("sc")) {
            return FileType.Scorecard;
        } else if (type.equals("scc")) {
            return ComplexScorecard;
        } else if (type.equals("DIR")) {
            return FileType.DIR;
        } else if (type.equals("ct.xml")) {
            return FileType.Crosstab;
        } else {
            throw new RuleException("Unknow type:" + type);
        }
    }
}
